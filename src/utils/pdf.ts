import { ConditionEndType, ConditionType } from '../enums/condition-type';
import { Feature, FeatureBonusData, FeatureChoiceData } from '../models/feature';
import { PDFCheckBox, PDFDocument, PDFTextField, StandardFonts } from 'pdf-lib';
import { Ability } from '../models/ability';
import { AbilityLogic } from '../logic/ability-logic';
import { AbilityUsage } from '../enums/ability-usage';
import { FeatureField } from '../enums/feature-field';
import { FeatureLogic } from '../logic/feature-logic';
import { FeatureType } from '../enums/feature-type';
import { FormatLogic } from '../logic/format-logic';
import { Hero } from '../models/hero';
import { HeroLogic } from '../logic/hero-logic';
import { Sourcebook } from '../models/sourcebook';
import { SourcebookData } from '../data/sourcebook-data';
import localforage from 'localforage';

import pdfFile from '../assets/character-sheet-backer-packet-2-modified.pdf';

export class PDFExport {
	static startExport = async (hero: Hero) => {
		const pdfAsBytes = await fetch(pdfFile).then(res => res.arrayBuffer());
		const pdfDoc = await PDFDocument.load(pdfAsBytes);

		const autoResizingFields: string[] = [];
		const markMultiline: string[] = [];

		const texts: { [key: string]: string | number | null } = {
			CharacterName: hero.name,
			AncestryTop: hero.ancestry && hero.ancestry.name,
			CareerTop: hero.career && hero.career.name,
			ClassTop: hero.class && hero.class.name,
			SubclassTop: hero.class && hero.class.subclassName + ': ' + hero.class.subclasses.filter(s => s.selected)[0].name,
			Level: hero.class && hero.class.level,
			Wealth: hero.state.wealth,
			Renown: hero.state.renown,
			XP: hero.state.xp,
			Speed: HeroLogic.getSpeed(hero),
			Stability: HeroLogic.getStability(hero),
			Size: FormatLogic.getSize(HeroLogic.getSize(hero)),
			CurrentStamina: HeroLogic.getStamina(hero) - hero.state.staminaDamage,
			MaxStamina: HeroLogic.getStamina(hero),
			WindedValue: Math.floor(HeroLogic.getStamina(hero) / 2),
			DeadValue: -Math.floor(HeroLogic.getStamina(hero) / 2),
			RecoveryValue: HeroLogic.getRecoveryValue(hero),
			MaxRecoveries: HeroLogic.getRecoveries(hero),
			Recoveries: HeroLogic.getRecoveries(hero) - hero.state.recoveriesUsed,
			HeroicResourceName: hero.class && hero.class.heroicResource,
			HeroicResource: hero.state.heroicResource,
			Surges: hero.state.surges
		};

		const toggles: { [key: string]: boolean } = {};
		const ignoredFeatures: { [key: string]: boolean } = {};

		{
			for (let i = 0; i < hero.state.victories && i < 15; ++i) {
				toggles['Victories' + (i + 1)] = true;
			}

			if (hero.class) {
				// might/agility/reason/intuition/presence
				for (const details of hero.class.characteristics) {
					texts['SurgeDamage'] = Math.max(
						Number(texts['SurgeDamage'] || 0),
						details.value
					);
					texts[details.characteristic] = details.value;
					autoResizingFields.push(details.characteristic);
				}
				autoResizingFields.push('SurgeDamage');
			}
		}

		autoResizingFields.push(
			...[
				'CharacterName',
				'Wealth',
				'Renown',
				'XP',
				'CurrentStamina',
				'Recoveries',
				'HeroicResource',
				'Surges',
				'Level'
			]
		);

		const features = HeroLogic.getFeatures(hero) as Feature[];

		{
			const kits = HeroLogic.getKits(hero);
			const modifiers = [
				kits,
				features.filter(f => f.name.match('Enchantment of')),
				features.filter(f => f.name.match('Prayer of')),
				features.filter(f => f.name.match(' Augmentation')),
				features.filter(f => f.name.match('Ward of'))
			];
			texts['ModifierName'] = modifiers
				.filter(f => f.length > 0)
				.map(n => n[0].name)
				.join(', ');
			autoResizingFields.push('ModifierName');
			const modifierFields = [
				'ModifierKit',
				'ModifierEnchantment',
				'ModifierPrayer',
				'ModifierAugmentation',
				'ModifierWard'
			];
			let fullDescription = '';
			let [ speed, area, stability, stamina ] = [ 0, 0, 0, 0 ];

			for (let i = 0; i < modifiers.length; ++i) {
				if (modifiers[i].length > 0) {
					toggles[modifierFields[i]] = true;
					for (const feature of modifiers[i]) {
						if (feature.type == FeatureType.Text) {
							ignoredFeatures[feature.id] = true;
							if (fullDescription != '') {
								fullDescription = fullDescription + '\n\n';
							}
							fullDescription =
								fullDescription +
								'==' +
								feature.name +
								'==' +
								'\n' +
								feature.description;
						} else if (feature.type == FeatureType.Multiple) {
							ignoredFeatures[feature.id] = true;
							feature.data.features
								.map(data => data.data as FeatureBonusData)
								.filter(data => data.field == FeatureField.Speed)
								.forEach(data => (speed = speed + data.value));
							feature.data.features
								.map(data => data.data as FeatureBonusData)
								.filter(data => data.field == FeatureField.Disengage)
								.forEach(data => (area = area + data.value));
							feature.data.features
								.map(data => data.data as FeatureBonusData)
								.filter(data => data.field == FeatureField.Stability)
								.forEach(data => (stability = stability + data.value));
							feature.data.features
								.map(data => data.data as FeatureBonusData)
								.filter(data => data.field == FeatureField.Stamina)
								.forEach(data => (stamina = stamina + data.value));
						}
					}
				}
			}
			texts['ModifierBenefits'] = fullDescription;
			autoResizingFields.push('ModifierBenefits');

			if (kits.length > 0) {
				texts['ModifierWeapon'] = kits[0].weapon.join('/');
				texts['ModifierArmor'] = kits[0].armor.join('/');
				speed = speed + kits[0].speed;
				stability = stability + kits[0].stability;
				stamina = stamina + kits[0].stamina;
				area = area + kits[0].disengage;
				if (kits[0].meleeDistance !== null) {
					texts['ModifierMeleeRange'] = '+' + kits[0].meleeDistance;
				}
				if (kits[0].meleeDamage !== null) {
					texts['ModifierMeleeTier1'] = '+' + kits[0].meleeDamage.tier1;
					texts['ModifierMeleeTier2'] = '+' + kits[0].meleeDamage.tier2;
					texts['ModifierMeleeTier3'] = '+' + kits[0].meleeDamage.tier3;
				}
				if (kits[0].rangedDistance !== null) {
					texts['ModifierRangedRange'] = '+' + kits[0].rangedDistance;
				}
				if (kits[0].rangedDamage !== null) {
					texts['ModifierRangedTier1'] = '+' + kits[0].rangedDamage.tier1;
					texts['ModifierRangedTier2'] = '+' + kits[0].rangedDamage.tier2;
					texts['ModifierRangedTier3'] = '+' + kits[0].rangedDamage.tier3;
				}
			}
			if (texts['ModifierArmor'] == '' || texts['ModifierArmor'] == undefined) {
				texts['ModifierArmor'] = 'None';
			}
			if (speed > 0) {
				texts['ModifierSpeed'] = '+' + speed;
			}
			if (area > 0) {
				texts['ModifierAreaRange'] = '+' + area;
			}
			if (stability > 0) {
				texts['ModifierStability'] = '+' + stability;
			}
			if (stamina > 0) {
				texts['ModifierStamina'] = '+' + stamina;
			}
		}

		const ConvertFeatures = (features: Feature[]) => {
			features = features.filter(f => !ignoredFeatures[f.id]);
			features.forEach(f => (ignoredFeatures[f.id] = true));
			let all = '';
			for (const feature of features) {
				if (all != '') {
					all = all + '\n\n';
				}
				let text = '==' + feature.name + '==' + '\n\n' + feature.description;
				// substitution is to convert any tables into text that presents
				// better in the PDF form
				text = text
					.replace(/(\|:-+)+\|\n/g, '')
					.replace(/\|\s+(.+?)\s+\| (.+?)\s+\|/g, '$1 | $2');
				// substitutions are for cleaning up lists to look better in the form
				text = text.replace(/\* \*\*(.*?)\*\*/g, '[[$1]]');
				if (feature.description !== '') {
					all = all + text;
				}
			}
			return all;
		};

		if (hero.class) {
			// Roughly split the features between the boxes, with a bias for the
			// first box, no abilities, only description-only features
			const classFeatures = FeatureLogic.getFeaturesFromClass(hero.class, hero);
			const all = ConvertFeatures(
				classFeatures.filter(f => f.type == FeatureType.Text)
			);
			const lines = all.split(/\n+/);
			let splitPoint = 0;
			let runningTotal = 0;
			for (const l of lines) {
				runningTotal = runningTotal + l.length;
				if (runningTotal < all.length / 2) {
					splitPoint = splitPoint + 1;
				} else {
					break;
				}
			}
			// Ensure headers remain on the same line
			if (lines[Math.max(splitPoint - 1, 0)].match(/^==/)) {
				splitPoint = splitPoint - 1;
			}
			texts['ClassFeatures1'] = lines
				.slice(0, splitPoint)
				.join('\n\n')
				.replace(/\n\n\[\[/g, '\n[[');
			autoResizingFields.push('ClassFeatures1');
			texts['ClassFeatures2'] = lines
				.slice(splitPoint)
				.join('\n\n')
				.replace(/\n\n\[\[/g, '\n[[');
			if (texts['ClassFeatures2'] != '') {
				autoResizingFields.push('ClassFeatures2');
			}
		}

		if (hero.ancestry) {
			const ancestryTextFeatures = FeatureLogic.getFeaturesFromAncestry(
				hero.ancestry,
				hero
			);
			texts['AncestryTraits'] = ConvertFeatures(
				ancestryTextFeatures.filter(
					f =>
						f.type == FeatureType.Text || f.type == FeatureType.DamageModifier
				)
			);
		}

		{
			for (const c of hero.state.conditions) {
				if (c.type !== ConditionType.Custom) {
					if (c.ends == ConditionEndType.EndOfTurn) {
						toggles[c.type + 'EoT'] = true;
					} else if (c.ends == ConditionEndType.SaveEnds) {
						toggles[c.type + 'Save'] = true;
					}
				}
			}
		}

		{
			const homebrew = (await localforage.getItem<Sourcebook[]>(
				'forgesteel-homebrew-settings'
			)) as Sourcebook[];
			const books = [ SourcebookData.core, SourcebookData.orden ];
			if (homebrew) books.push(...homebrew);
			const skills = HeroLogic.getSkills(hero, books);
			skills.forEach(s => (toggles['Skill' + s.name.replace(' ', '')] = true));

			if (hero.career) {
				texts['CareerName'] = hero.career.name;
				const incident = hero.career.incitingIncidents.options.find(
					o => o.id == (hero.career && hero.career.incitingIncidents.selectedID)
				);
				if (incident) {
					texts['CareerIncident'] =
						'==' + incident.name + '==\n\n' + incident.description;
					autoResizingFields.push('CareerIncident');
				}
			}
			if (hero.complication) {
				texts['ComplicationName'] = hero.complication.name;
				const benefit = hero.complication.features.find(f =>
					f.name.match(/Benefit/)
				);
				if (benefit) {
					texts['ComplicationBenefit'] = benefit.description;
					autoResizingFields.push('ComplicationBenefit');
				}
				const drawback = hero.complication.features.find(f =>
					f.name.match(/Drawback/)
				);
				if (drawback) {
					texts['ComplicationDrawback'] = drawback.description;
					autoResizingFields.push('ComplicationDrawback');
				}
			}
			if (hero.culture) {
				if (hero.culture.environment) {
					texts['Environment'] = hero.culture.environment.name;
					texts['EnvironmentDescription'] =
						hero.culture.environment.description;
					autoResizingFields.push('EnvironmentDescription');
				}
				if (hero.culture.organization) {
					texts['Organization'] = hero.culture.organization.name;
					texts['OrganizationDescription'] =
						hero.culture.organization.description;
					autoResizingFields.push('OrganizationDescription');
				}
				if (hero.culture.upbringing) {
					texts['Upbringing'] = hero.culture.upbringing.name;
					texts['UpbringingDescription'] = hero.culture.upbringing.description;
					autoResizingFields.push('UpbringingDescription');
				}
			}
			const languages = HeroLogic.getLanguages(hero, books);
			texts['Languages'] = languages.map(l => l.name).join('\n');

			const perks = features
				.filter(
					f =>
						f.type == FeatureType.Perk && f.data && f.data.selected.length > 0
				)
				.map(f => f.data && (f.data as FeatureChoiceData).selected[0])
				.filter(f => !!f);
			const all = ConvertFeatures(perks);
			const lines = all.split(/\n+/);
			let splitPoint = 0;
			let runningTotal = 0;
			for (const l of lines) {
				runningTotal = runningTotal + l.length;
				if (runningTotal < all.length / 2) {
					splitPoint = splitPoint + 1;
				} else {
					break;
				}
			}
			// Ensure headers remain on the same line
			if (lines[Math.max(splitPoint - 1, 0)].match(/^==/)) {
				splitPoint = splitPoint - 1;
			}
			texts['Perks1'] = lines
				.slice(0, splitPoint)
				.join('\n\n')
				.replace(/\n\n\[\[/g, '\n[[');
			autoResizingFields.push('Perks1');
			texts['Perks2'] = lines
				.slice(splitPoint)
				.join('\n\n')
				.replace(/\n\n\[\[/g, '\n[[');
			if (texts['Perks2'] != '') {
				autoResizingFields.push('Perks2');
			}

			texts['Titles'] = features
				.filter(f => f.type == FeatureType.TitleChoice)
				.map(f => f.data.selected[0])
				.map(f => {
					let text = '==' + f.name + ', ';
					const selected = f.features.find(
						subF => subF.id == f.selectedFeatureID
					);
					if (selected) {
						text = text + selected.name + '==\n' + selected.description;
						return text;
					}
					return text + 'choice needed==';
				})
				.join('\n\n');
			if (texts['Titles'] != '') {
				autoResizingFields.push('Titles');
			}

			hero.state.projects.forEach((p, i) => {
				texts['Project' + (i + 1)] = p.name;
				if (p.progress && p.progress.prerequisites && p.progress.source) {
					texts['Project' + (i + 1) + 'Required'] = p.goal;
					autoResizingFields.push('Project' + (i + 1) + 'Required');
					texts['Project' + (i + 1) + 'Current'] = p.progress.points;
					autoResizingFields.push('Project' + (i + 1) + 'Current');
					texts['Project' + (i + 1) + 'Assigned'] = 'Yes';
				} else if (p.progress) {
					texts['Project' + (i + 1) + 'Assigned'] =
						'Pending (' +
						[
							!p.progress.prerequisites && 'Prerequisites',
							!p.progress.source && 'Source'
						]
							.filter(a => a)
							.join(', ') +
						')';
				}
				texts['Project' + (i + 1) + 'Roll'] = p.characteristic
					.map(c => c[0])
					.join('/');
			});
		}

		{
			const SetTiers = (ability: Ability, prefix: string) => {
				if (ability.powerRoll) {
					texts[prefix + 'Tier1'] = AbilityLogic.getTierEffect(
						ability.powerRoll.tier1,
						1,
						ability,
						hero
					);
					texts[prefix + 'Tier2'] = AbilityLogic.getTierEffect(
						ability.powerRoll.tier2,
						2,
						ability,
						hero
					);
					texts[prefix + 'Tier3'] = AbilityLogic.getTierEffect(
						ability.powerRoll.tier3,
						3,
						ability,
						hero
					);
					texts[prefix + 'PowerRoll'] = Math.max(
						...ability.powerRoll.characteristic
							.map(
								c =>
									hero.class &&
									hero.class.characteristics.find(d => d.characteristic == c)
							)
							.map(c => (c && c.value) || 0)
					);
				}
				texts[prefix + 'Distance'] = AbilityLogic.getDistance(
					ability.distance[0],
					hero,
					ability
				);
			};
			const CleanMelee = (ability: Ability, prefix: string) => {
				if (ability.powerRoll) {
					texts[prefix + 'Tier1'] = AbilityLogic.getTierEffect(
						ability.powerRoll.tier1,
						1,
						ability,
						hero
					).replace(' damage', '');
					texts[prefix + 'Tier2'] = AbilityLogic.getTierEffect(
						ability.powerRoll.tier2,
						2,
						ability,
						hero
					).replace(' damage', '');
					texts[prefix + 'Tier3'] = AbilityLogic.getTierEffect(
						ability.powerRoll.tier3,
						3,
						ability,
						hero
					).replace(' damage', '');
					texts[prefix + 'PowerRoll'] = Math.max(
						...ability.powerRoll.characteristic
							.map(
								c =>
									hero.class &&
									hero.class.characteristics.find(d => d.characteristic == c)
							)
							.map(c => (c && c.value) || 0)
					);
				}
				texts[prefix + 'Distance'] = AbilityLogic.getDistance(
					ability.distance[0],
					hero,
					ability
				).replace('Ranged ', '');
			};
			const ApplyGroup = (
				abilities: Ability[],
				groupPrefix: string,
				limit: number
			) => {
				abilities.forEach((a, i) => {
					ignoredFeatures[a.id] = true;
					if (i >= limit) {
						return;
					}
					const prefix = groupPrefix + (i + 1);
					SetTiers(a, prefix);
					texts[prefix + 'Name'] = a.name;
					texts[prefix + 'Target'] = a.target;
					texts[prefix + 'Keywords'] = a.keywords.join(', ');
					texts[prefix + 'Type'] = a.type.usage;
					if (a.type.trigger !== '') {
						texts[prefix + 'Trigger'] = a.type.trigger;
						if (a.type.trigger.length > 90) {
							autoResizingFields.push(prefix + 'Trigger');
						}
					}
					let effect = a.effect;
					if (a.spend.length > 0) {
						if (a.effect.length > 0)
							effect =
								a.effect +
								'\n\n[[Spend ' +
								a.spend[0].value +
								']] ' +
								a.spend[0].effect;
						else
							effect =
								'[[Spend ' + a.spend[0].value + ']] ' + a.spend[0].effect;
					}
					texts[prefix + 'Effect'] = effect;

					if (typeof a.cost == 'number' && a.cost > 0) {
						texts[prefix + 'Cost'] = a.cost;
					}
					if (effect.length > 145) {
						autoResizingFields.push(prefix + 'Effect');
					}
					autoResizingFields.push(prefix + 'Type');
					autoResizingFields.push(prefix + 'Keywords');
					autoResizingFields.push(prefix + 'Target');
					autoResizingFields.push(
						...[ 'Tier1', 'Tier2', 'Tier3' ]
							.map(t => prefix + t)
							.filter(t => texts[t])
					);
					markMultiline.push(
						...[ 'Tier1', 'Tier2', 'Tier3' ]
							.map(t => prefix + t)
							.filter(
								t =>
									texts[t] &&
									typeof texts[t] == 'string' &&
									texts[t].length > 30
							)
					);
				});
			};
			const abilities = HeroLogic.getAbilities(hero, true, true, false);
			const freeMelee = abilities.find(a => a.id == 'free-melee');
			if (freeMelee) {
				ignoredFeatures[freeMelee.id] = true;
				CleanMelee(freeMelee, 'MeleeFreeStrike');
			}
			const freeRanged = abilities.find(a => a.id == 'free-ranged');
			if (freeRanged) {
				ignoredFeatures[freeRanged.id] = true;
				CleanMelee(freeRanged, 'RangedFreeStrike');
			}

			ApplyGroup(
				abilities.filter(a => a.cost == 'signature'),
				'Signature',
				2
			);

			ApplyGroup(
				abilities.filter(
					a =>
						typeof a.cost == 'number' &&
						a.cost > 0 &&
						a.type.usage == AbilityUsage.Trigger
				),
				'TriggeredHeroic',
				1
			);
			ApplyGroup(
				abilities.filter(
					a => typeof a.cost == 'number' && a.cost > 0 && !ignoredFeatures[a.id]
				),
				'Heroic',
				5
			);
			ApplyGroup(
				abilities.filter(
					a => a.type.usage == AbilityUsage.Trigger && !ignoredFeatures[a.id]
				),
				'Triggered',
				2
			);
			ApplyGroup(
				abilities.filter(a => !ignoredFeatures[a.id]),
				'Ability',
				6
			);
		}

		const form = pdfDoc.getForm();
		for (const field of form.getFields()) {
			if (field instanceof PDFTextField) {
				field.disableRichFormatting();
			}
		}

		const font = await pdfDoc.embedFont(StandardFonts.TimesRoman);

		for (const [ key, value ] of Object.entries(texts)) {
			const field = form.getField(key) as PDFTextField;
			if (value !== null && value !== undefined) {
				field.setText(value.toString());
			}
		}

		form.getFields().forEach(field => {
			if (field instanceof PDFTextField) {
				field.defaultUpdateAppearances(font);
				field.setFontSize(8);
				field.defaultUpdateAppearances(font);
			}
		});

		{
			markMultiline.forEach(f => {
				const field = form.getField(f) as PDFTextField;
				field.enableMultiline();
				field.defaultUpdateAppearances(font);
			});
			autoResizingFields.forEach(f => {
				const field = form.getField(f) as PDFTextField;
				field.setFontSize(0);
				field.defaultUpdateAppearances(font);
			});
		}

		for (const [ key, value ] of Object.entries(toggles)) {
			if (value) {
				const field = form.getField(key) as PDFCheckBox;
				field.check();
			}
		}

		const data = await pdfDoc.saveAsBase64({ dataUri: true });

		const downloader = document.createElement('a');
		downloader.download = `${hero.name || 'Unnamed Hero'}.pdf`;
		downloader.href = data;
		downloader.click();
	};
}
