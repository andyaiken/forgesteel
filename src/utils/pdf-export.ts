import { ConditionEndType, ConditionType } from '../enums/condition-type';
import { PDFCheckBox, PDFDocument, PDFTextField, StandardFonts } from 'pdf-lib';
import { Ability } from '../models/ability';
import { AbilityDistanceType } from '../enums/abiity-distance-type';
import { AbilityLogic } from '../logic/ability-logic';
import { AbilityUsage } from '../enums/ability-usage';
import { DamageModifierType } from '../enums/damage-modifier-type';
import { Feature } from '../models/feature';
import { FeatureType } from '../enums/feature-type';
import { FormatLogic } from '../logic/format-logic';
import { Hero } from '../models/hero';
import { HeroLogic } from '../logic/hero-logic';
import { Sourcebook } from '../models/sourcebook';
import { SourcebookData } from '../data/sourcebook-data';
import localforage from 'localforage';
import pdfFile from '../assets/custom-character-sheet-plusmouse.pdf';

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
			SubclassTop: hero.class && hero.class.subclassName !== '' && hero.class.subclassName + ': ' + hero.class.subclasses.filter(s => s.selected)[0].name || null,
			Level: hero.class && hero.class.level,
			Wealth: hero.state.wealth,
			Renown: hero.state.renown,
			XP: hero.state.xp,
			Speed: HeroLogic.getSpeed(hero),
			Stability: HeroLogic.getStability(hero),
			Size: FormatLogic.getSize(HeroLogic.getSize(hero)),
			Stamina: HeroLogic.getStamina(hero) - hero.state.staminaDamage,
			MaxStamina: HeroLogic.getStamina(hero),
			RecoveryValue: HeroLogic.getRecoveryValue(hero),
			MaxRecoveries: HeroLogic.getRecoveries(hero),
			Recoveries: HeroLogic.getRecoveries(hero) - hero.state.recoveriesUsed,
			HeroicResource: hero.state.heroicResource,
			Surges: hero.state.surges,
			Victories: hero.state.victories,
			AncestryFull: hero.ancestry && hero.ancestry.description,
			EnvironmentName: hero.culture && hero.culture.environment && hero.culture.environment.name,
			OrganizationName: hero.culture && hero.culture.organization && hero.culture.organization.name,
			UpbringingName: hero.culture && hero.culture.upbringing && hero.culture.upbringing.name,
			TempStamina: hero.state.staminaTemp
		};

		const toggles: { [key: string]: boolean } = {};
		const ignoredFeatures: { [key: string]: boolean } = {};

		{
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
			}
		}

		autoResizingFields.push(
			...[
				'CharacterName',
				'Wealth',
				'Renown',
				'XP',
				'Stamina',
				'Recoveries',
				'HeroicResource',
				'Surges',
				'Level',
				'ClassTop',
				'SubclassTop',
				'AncestryTop',
				'CareerTop'
			]
		);

		const features = HeroLogic.getFeatures(hero) as Feature[];

		{
			const heroicResourceFeature = features.find(f => hero.class && f.name == hero.class.heroicResource);
			if(heroicResourceFeature) {
				const startup = /\s*At the start of each of your turns during combat, you gain (.+?) \w+?\.\s+/;
				const startupAmount = heroicResourceFeature.description.match(startup);
				if(startupAmount) {
					texts['HeroicResourcesPerTurn'] = startupAmount[1];
				}
				ignoredFeatures[heroicResourceFeature.id] = true;
				texts['HeroicResourceGains'] = heroicResourceFeature.description.replace(startup, '');
				autoResizingFields.push('HeroicResourceGains');
			}
		}

		{
			const kits = HeroLogic.getKits(hero);
			const modifiers = [
				features.filter(f => f.name.match(' Augmentation')),
				features.filter(f => f.name.match('Enchantment of')),
				kits,
				features.filter(f => f.name.match('Prayer of')),
				features.filter(f => f.name.match('Ward'))
			];
			texts['ModifiersDetails'] = modifiers
				.filter(f => f.length > 0)
				.map(n => n[n.length - 1].name)
				.join(',\n');
			const modifierFields = [
				'ModifiersAugmentation',
				'ModifiersEnchantment',
				'ModifiersKit',
				'ModifiersPrayer',
				'ModifiersWard'
			];

			for (let i = 0; i < modifiers.length; ++i) {
				if (modifiers[i].length > 0) {
					toggles[modifierFields[i]] = true;
				}
			}

			if (hero.complication) {
				texts['ComplicationName'] = hero.complication.name;
				const benefit = hero.complication.features.find(f =>
					f.name.match(/Benefit/)
				);
				if (benefit) {
					ignoredFeatures[benefit.id] = true;
					texts['ComplicationBenefit'] = benefit.description;
					autoResizingFields.push('ComplicationBenefit');
				}
				const drawback = hero.complication.features.find(f =>
					f.name.match(/Drawback/)
				);
				if (drawback) {
					ignoredFeatures[drawback.id] = true;
					texts['ComplicationDrawback'] = drawback.description;
					autoResizingFields.push('ComplicationDrawback');
				}
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

		texts['Features'] = ConvertFeatures(features.filter(f => !ignoredFeatures[f.id] && f.type == 'Text'));
		autoResizingFields.push('Features');

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
			texts['Skills'] = HeroLogic.getSkills(hero, books).map(s => s.name).join('\n');

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
			if (hero.culture) {
				const cultureUpbringingTexts = [];
				if (hero.culture.environment) {
					cultureUpbringingTexts.push('==' +hero.culture.environment.name + '==\n' + hero.culture.environment.description);
				}
				if (hero.culture.organization) {
					cultureUpbringingTexts.push('==' +hero.culture.organization.name + '==\n' + hero.culture.organization.description);
				}
				if (hero.culture.upbringing) {
					cultureUpbringingTexts.push('==' +hero.culture.upbringing.name + '==\n' + hero.culture.upbringing.description);
				}
				texts['CultureFull'] = cultureUpbringingTexts.join('\n\n');
				autoResizingFields.push('CultureFull');
			}
			const languages = HeroLogic.getLanguages(hero, books);
			texts['Languages'] = languages.map(l => l.name).join('\n');

			texts['Titles'] = features
				.filter(f => f.type == FeatureType.TitleChoice)
				.map(f => f.data.selected[0])
				.map(f => f.name)
				.join('\n\n');

			hero.state.projects.forEach((p, i) => {
				texts['Project' + (i + 1) + 'Name'] = p.name;
				if (p.progress && p.progress.prerequisites && p.progress.source) {
					texts['Project' + (i + 1) + 'Progress'] = p.goal + '/' + p.progress.points;
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
			const immunities = HeroLogic.getDamageModifiers(hero, DamageModifierType.Immunity);
			const weaknesses = HeroLogic.getDamageModifiers(hero, DamageModifierType.Weakness);
			texts['Immunities'] = immunities.map(i => i.damageType + ' ' + i.value).join('\n');
			texts['Weaknesses'] = weaknesses.map(i => i.damageType + ' ' + i.value).join('\n');
		}

		{
			const ApplyGroup = (
				abilities: Ability[],
				prefix: string,
				limit: number
			) => {
				abilities.forEach((a, i) => {
					ignoredFeatures[a.id] = true;
					if (i >= limit) {
						return;
					}
					texts[prefix + 'Name' + i] = a.name;
					texts[prefix + 'Target' + i] = a.target;
					if(a.distance.length > 1 && a.distance[0].type == AbilityDistanceType.Melee && a.distance[1].type == AbilityDistanceType.Ranged) {
						texts[prefix + 'Distance' + i] = AbilityLogic.getDistance(a.distance[0], hero, a).replace('Melee', 'M') + ' or ' + AbilityLogic.getDistance(a.distance[1], hero, a).replace('Ranged', 'R');
					} else {
						texts[prefix + 'Distance' + i] = AbilityLogic.getDistance(a.distance[0], hero, a);
					}
					texts[prefix + 'Keywords' + i] = a.keywords.join(', ');
					texts[prefix + 'Type' + i] = a.type.usage;
					const details = [];

					if(a.powerRoll) {
						let powerRollText = '';
					  powerRollText = powerRollText + 'Power Roll: 2d10 + ' + Math.max(...a.powerRoll.characteristic
							.map(
								c =>
									hero.class &&
									hero.class.characteristics.find(d => d.characteristic == c)
							)
							.map(c => (c && c.value) || 0)
						);
						powerRollText = powerRollText + '\n    <= 11: ' + AbilityLogic.getTierEffect(
							a.powerRoll.tier1,
							1,
							a,
							hero
						);
						powerRollText = powerRollText + '\n    12-16: ' + AbilityLogic.getTierEffect(
							a.powerRoll.tier2,
							2,
							a,
							hero
						);
						powerRollText = powerRollText + '\n    17+: ' + AbilityLogic.getTierEffect(
							a.powerRoll.tier3,
							3,
							a,
							hero
						);
						details.push(powerRollText);
					}
					if (a.type.trigger !== '') {
						details.push('Trigger:\n' + a.type.trigger);
					}
					if(a.effect && !a.powerRoll && !a.type.trigger)
						details.push(a.effect);
					else if(a.effect) {
						details.push('Effect:\n' + a.effect);
					}
					if (a.spend.length > 0) {
						details.push(
							'Spend ' +
              a.spend[0].value +
              ':\n' +
              a.spend[0].effect
						);
					}
					texts[prefix + 'Text' + i] = details.join('\n\n');

					if (typeof a.cost == 'number' && a.cost > 0) {
						texts[prefix + 'Tag' + i] = a.cost;
					} else if(a.cost == 'signature') {
						texts[prefix + 'Tag' + i] = 'S';
					} else if(a.type.usage == AbilityUsage.Trigger) {
						texts[prefix + 'Tag' + i] = 'T';
					} else if(a.type.usage == AbilityUsage.Maneuver) {
						texts[prefix + 'Tag' + i] = 'M';
					} else if(a.type.usage == AbilityUsage.Action) {
						texts[prefix + 'Tag' + i] = 'A';
					}
					autoResizingFields.push(prefix + 'Name' + i);
					autoResizingFields.push(prefix + 'Type' + i);
					autoResizingFields.push(prefix + 'Keywords' + i);
					autoResizingFields.push(prefix + 'Target' + i);
					autoResizingFields.push(prefix + 'Tag' + i);
					const abilityText = texts[prefix + 'Text' + i];
					if(typeof(abilityText) == 'string' && abilityText.length > 500) {
						autoResizingFields.push(prefix + 'Text' + i);
					}
					const distanceText = texts[prefix + 'Distance' + i];
					if(typeof(distanceText) == 'string' && distanceText.length > 27) {
						autoResizingFields.push(prefix + 'Distance' + i);
					}
					const targetText = texts[prefix + 'Target' + i];
					if(typeof(targetText) == 'string' && targetText.length > 27) {
						autoResizingFields.push(prefix + 'Target' + i);
					}
				});
			};
			const abilities = HeroLogic.getAbilities(hero, true, true, false);
			texts['RegularActions'] = abilities.filter(a => a.type.usage == AbilityUsage.Action && a.id !== 'free-melee' && a.id !== 'free-ranged').map(a => a.name + (typeof(a.cost) == 'number' && a.cost > 0 && ' (' + a.cost + ')' || '')).join('\n\n');
			texts['Manoeuvres'] = abilities.filter(a => a.type.usage == AbilityUsage.Maneuver).map(a => a.name + (typeof(a.cost) == 'number' && a.cost > 0 && ' (' + a.cost + ')' || '')).join('\n\n');
			texts['TriggeredActions'] = abilities.filter(a => a.type.usage == AbilityUsage.Trigger).map(a => a.name + (typeof(a.cost) == 'number' && a.cost > 0 && ' (' + a.cost + ')' || '')).join('\n\n');

			ApplyGroup(
				abilities.filter(a => !ignoredFeatures[a.id]),
				'Ability',
				18
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
