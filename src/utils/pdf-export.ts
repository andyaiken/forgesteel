import { ConditionEndType, ConditionType } from '../enums/condition-type';
import { PDFCheckBox, PDFDocument, PDFTextField, StandardFonts } from 'pdf-lib';
import { Ability } from '../models/ability';
import { AbilityDistanceType } from '../enums/abiity-distance-type';
import { AbilityLogic } from '../logic/ability-logic';
import { AbilityUsage } from '../enums/ability-usage';
import { ClassData } from '../data/class-data';
import { DamageModifierType } from '../enums/damage-modifier-type';
import { Domain } from '../models/domain';
import { Feature } from '../models/feature';
import { FeatureType } from '../enums/feature-type';
import { FormatLogic } from '../logic/format-logic';
import { Hero } from '../models/hero';
import { HeroLogic } from '../logic/hero-logic';
import { Sourcebook } from '../models/sourcebook';

import pdfLandscape from '../assets/character-sheet-landscape.pdf';
import pdfPortrait from '../assets/character-sheet-portrait.pdf';

export class PDFExport {
	static startExport = async (hero: Hero, sourcebooks: Sourcebook[], format: 'portrait' | 'landscape') => {
		let file: string;
		switch (format) {
			case 'portrait':
				file = pdfPortrait;
				break;
			case 'landscape':
				file = pdfLandscape;
				break;
		}

		const pdfAsBytes = await fetch(file).then(res => res.arrayBuffer());
		const pdfDoc = await PDFDocument.load(pdfAsBytes);

		const font = await pdfDoc.embedFont(StandardFonts.TimesRoman);
		const fontSize = 9;

		const autoResizingFields: string[] = [];

		const sanitize = (str: string) => {
			// This replaces characters the PDF doesn't support
			return str
				.toString()
				.replace(/ź/g, 'z')
				.replace(/ń/g, 'n')
				.replace(/č/g, 'c');
		};

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
			Disengage: HeroLogic.getDisengage(hero),
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

		const features = HeroLogic.getFeatures(hero).map(f => f.feature);

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

		const domains = features.find(f => f.type === FeatureType.Domain)?.data?.selected as Domain[];
		if (domains) {
			texts['SubclassTop'] = domains.map(d => d.name).join(', ');
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

		const GetTitle = (text: string) => text + '\n' + ('¯'.repeat(Math.ceil(font.widthOfTextAtSize(text, fontSize) / font.widthOfTextAtSize('¯', fontSize))));

		const CleanupOutput = (text: string) => {
			text = text
				.replace(/(\|:-+)+\|\n/g, '')
				.replace(/\|\s+(.+?)\s+\| (.+?)\s+\|/g, '$1\t\t$2')
				.replace(/11 -\t/g, '11 or less')
				.replace(/17 \+/g, '17+\t')
				.replace(/\n\* \*\*(.*?)\*\*(:) /g, '\n   • $1$2\t')
				.replace(/\n\* /g, '\n   • ');
			// substitutions are for cleaning up lists to look better in the form
			return text;
		};

		const ConvertFeatures = (features: Feature[]) => {
			features = features.filter(f => !ignoredFeatures[f.id]);
			features.forEach(f => (ignoredFeatures[f.id] = true));
			let all = '';
			for (const feature of features) {
				if (all !== '') {
					all = all + '\n\n';
				}
				let text = GetTitle(feature.name) + '\n' + feature.description.replace(/^\s+/, '');
				// substitution is to convert any tables into text that presents
				// better in the PDF form
				text = CleanupOutput(text);
				if (feature.description !== '') {
					all = all + text;
				}
			}
			return all;
		};

		{
			const resource = hero.class && hero.class.heroicResource.toLowerCase() || 'XXX';
			const startup = new RegExp(String.raw`\s*At the start of each of your turns during combat, you gain (.+?) ${resource}\.\s*`);
			const heroicResourceFeature = features.find(f => f.description.match(startup));
			if (heroicResourceFeature) {
				const startupAmount = heroicResourceFeature.description.match(startup);
				if (startupAmount) {
					texts['HeroicResourcesPerTurn'] = startupAmount[1];
				}
				ignoredFeatures[heroicResourceFeature.id] = true;
				let resourceGainText = 'Your resource is ' + resource + '.\n\n' + heroicResourceFeature.description.replace(startup, '');
				if (hero.class && (hero.class.id === ClassData.conduit.id) && domains) {
					resourceGainText = resourceGainText + '\n' + domains.map(d => d.piety).join('');
				}
				texts['HeroicResourceGains'] = CleanupOutput(resourceGainText);
			}
		}

		{
			const kits = HeroLogic.getKits(hero);
			const modifiers = [
				features.filter(f => f.name.match(' Augmentation') && f.type !== FeatureType.Choice).map(f => f.name),
				features.filter(f => f.name.match('Enchantment of') && f.type !== FeatureType.Choice).map(f => f.name),
				kits.map(f => f.name + ' Kit'),
				features.filter(f => f.name.match('Prayer of') && f.type !== FeatureType.Choice).map(f => f.name),
				features.filter(f => f.name.match('Ward') && f.type !== FeatureType.Choice).map(f => f.name)
			];
			const names: string[] = [];
			modifiers.forEach(fs => names.push(...fs));
			texts['ModifiersDetails'] = names.map(n => '• ' + n).join('\n');

			texts['Weapon'] = kits.map(k => k.weapon[0]).filter(v => v).join(', ');
			texts['Armor'] = [ ...new Set(kits.map(k => k.armor[0]).filter(v => v)) ].join(', ');

			if (hero.complication) {
				texts['ComplicationName'] = hero.complication.name;
				const benefit = hero.complication.features.find(f =>
					f.name.match(/Benefit/)
				);
				if (benefit) {
					ignoredFeatures[benefit.id] = true;
					texts['ComplicationBenefit'] = benefit.description;
				}
				const drawback = hero.complication.features.find(f =>
					f.name.match(/Drawback/)
				);
				if (drawback) {
					ignoredFeatures[drawback.id] = true;
					texts['ComplicationDrawback'] = drawback.description;
				}
			}
		}

		texts['Features'] = ConvertFeatures(features.filter(f => !ignoredFeatures[f.id] && f.type === 'Text'));

		{
			for (const c of hero.state.conditions) {
				if ((c.type !== ConditionType.Custom) && (c.type !== ConditionType.Quick)) {
					if (c.ends === ConditionEndType.EndOfTurn) {
						toggles[c.type + 'EoT'] = true;
					} else if (c.ends === ConditionEndType.SaveEnds) {
						toggles[c.type + 'Save'] = true;
					}
				}
			}
		}

		{
			texts['Skills'] = HeroLogic.getSkills(hero, sourcebooks).map(s => '• ' + s.name).join('\n');

			if (hero.career) {
				texts['CareerName'] = hero.career.name;
				const incident = hero.career.incitingIncidents.options.find(
					o => o.id === (hero.career && hero.career.incitingIncidents.selectedID)
				);
				if (incident) {
					texts['CareerIncident'] =
						GetTitle(incident.name) + '\n' + incident.description;
				}
			}
			if (hero.culture) {
				const cultureUpbringingTexts = [];
				if (hero.culture.environment) {
					cultureUpbringingTexts.push(GetTitle(hero.culture.environment.name) + '\n' + hero.culture.environment.description);
				}
				if (hero.culture.organization) {
					cultureUpbringingTexts.push(GetTitle(hero.culture.organization.name) + '\n' + hero.culture.organization.description);
				}
				if (hero.culture.upbringing) {
					cultureUpbringingTexts.push(GetTitle(hero.culture.upbringing.name) + '\n' + hero.culture.upbringing.description);
				}
				texts['CultureFull'] = cultureUpbringingTexts.join('\n\n');
			}
			const languages = HeroLogic.getLanguages(hero, sourcebooks);
			texts['Languages'] = languages.map(l => '• ' + l.name).join('\n');

			texts['Titles'] = features
				.filter(f => f.type === FeatureType.TitleChoice)
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
			const AddSign = (n: number) => n >= 0 ? '+' + n : n.toString();
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
					if ((a.distance.length > 1) && (a.distance[0].type === AbilityDistanceType.Melee) && (a.distance[1].type === AbilityDistanceType.Ranged)) {
						const melee = AbilityLogic.getDistance(a.distance[0], hero, a).replace('Melee', 'M');
						const ranged = AbilityLogic.getDistance(a.distance[1], hero, a).replace('Ranged', 'R');
						texts[prefix + 'Distance' + i] = `${melee} or ${ranged}`;
					} else if (a.distance.length > 0) {
						texts[prefix + 'Distance' + i] = AbilityLogic.getDistance(a.distance[0], hero, a);
					}
					texts[prefix + 'Keywords' + i] = a.keywords.join(', ');
					texts[prefix + 'Type' + i] = a.type.usage;
					const details = [];

					if (a.preEffect) {
						details.push(CleanupOutput(a.preEffect.replace(/^\s+/, '')));
					}
					if (a.powerRoll) {
						let powerRollText = '';
						powerRollText = powerRollText + 'Power Roll: 2d10 + ' + Math.max(...a.powerRoll.characteristic
							.map(
								c =>
									hero.class &&
									hero.class.characteristics.find(d => d.characteristic === c)
							)
							.map(c => (c && c.value) || 0)
						);
						powerRollText = powerRollText + '\n   • 11 or less\t' + AbilityLogic.getTierEffect(
							a.powerRoll.tier1,
							1,
							a,
							hero
						);
						powerRollText = powerRollText + '\n   • 12 - 16\t\t' + AbilityLogic.getTierEffect(
							a.powerRoll.tier2,
							2,
							a,
							hero
						);
						powerRollText = powerRollText + '\n   • 17 +\t\t\t' + AbilityLogic.getTierEffect(
							a.powerRoll.tier3,
							3,
							a,
							hero
						);

						const dmgMelee = HeroLogic.getMeleeDamageBonus(hero, a);
						const dmgRanged = HeroLogic.getRangedDamageBonus(hero, a);
						if (dmgMelee && dmgRanged && ((dmgMelee.tier1 !== dmgRanged.tier1) || (dmgMelee.tier2 !== dmgRanged.tier2) || (dmgMelee.tier3 !== dmgRanged.tier3))) {
							powerRollText = powerRollText + '\n   Bonus Melee Damage: ' + AddSign(dmgMelee.tier1) + ' / ' + AddSign(dmgMelee.tier2) + ' / ' + AddSign(dmgMelee.tier3);
							powerRollText = powerRollText + '\n   Bonus Ranged Damage: ' + AddSign(dmgRanged.tier1) + ' / ' + AddSign(dmgRanged.tier2) + ' / ' + AddSign(dmgRanged.tier3);
						}

						details.push(powerRollText);
					}
					if (a.type.trigger !== '') {
						details.push('Trigger:\n' + CleanupOutput(a.type.trigger));
					}
					if (a.effect && details.length === 0)
						details.push(CleanupOutput(a.effect.replace(/^\s+/, '')));
					else if (a.effect) {
						details.push('Effect:\n' + CleanupOutput(a.effect.replace(/^\s+/, '')));
					}
					if (a.alternateEffects.length > 0) {
						details.push(
							...a.alternateEffects.map(e => 'Alternate Effect:\n' + CleanupOutput(e))
						);
					}
					if (a.spend.length > 0) {
						details.push(
							...a.spend.map(s => 'Spend ' + s.value + ':\n' + CleanupOutput(s.effect))
						);
					}
					if (a.persistence.length > 0) {
						details.push(
							...a.persistence.map(p => 'Persistent ' + p.value + ':\n' + CleanupOutput(p.effect))
						);
					}
					if (a.strained !== '') {
						details.push('Strained:\n' + CleanupOutput(a.strained));
					}
					texts[prefix + 'Text' + i] = details.join('\n\n');

					if (typeof a.cost === 'number' && a.cost > 0) {
						texts[prefix + 'Tag' + i] = a.cost;
					} else if (a.cost === 'signature') {
						texts[prefix + 'Tag' + i] = 'S';
					} else if (a.type.usage === AbilityUsage.Trigger) {
						texts[prefix + 'Tag' + i] = 'T';
					} else if (a.type.usage === AbilityUsage.Maneuver) {
						texts[prefix + 'Tag' + i] = 'M';
					} else if (a.type.usage === AbilityUsage.Action) {
						texts[prefix + 'Tag' + i] = 'A';
					}
				});
			};
			const abilities = HeroLogic.getAbilities(hero, false).map(a => a.ability);
			texts['RegularActions'] = abilities.filter(a => a.type.usage === AbilityUsage.Action).map(a => ' • ' + a.name + (typeof (a.cost) === 'number' && a.cost > 0 && ' (' + a.cost + ')' || '')).join('\n');
			texts['Maneuvers'] = abilities.filter(a => a.type.usage === AbilityUsage.Maneuver).map(a => ' • ' + a.name + (typeof (a.cost) === 'number' && a.cost > 0 && ' (' + a.cost + ')' || '')).join('\n');
			texts['TriggeredActions'] = abilities.filter(a => a.type.usage === AbilityUsage.Trigger).map(a => ' • ' + a.name + (typeof (a.cost) === 'number' && a.cost > 0 && ' (' + a.cost + ')' || '')).join('\n');

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

		for (const [ key, value ] of Object.entries(texts)) {
			const field = form.getField(key) as PDFTextField;
			if (value !== null && value !== undefined) {
				field.setText(sanitize(value.toString()));
			}
		}

		const DoesTextFitFieldRectangle = (t: string, rect: { x: number; y: number; width: number; height: number }, size: number, multiline: boolean) => {
			t = t.replace(/\t/g, '    ');
			t = sanitize(t);
			if (multiline) {
				// offset of 20 for multiline and 5 for single found by testing different values
				const widthOffset = 20;
				const heightOffset = 20;
				const width = rect.width - widthOffset;
				const height = rect.height - heightOffset;
				let area = width * height;
				// eliminate tabstops as the text width calculator can't process it
				const lines = t.split('\n');
				// lineHeight multiplier found by testing different values
				const lineHeight = font.heightAtSize(size) * 1.2;
				lines.forEach(l => {
					area = area - Math.max(1, Math.ceil(font.widthOfTextAtSize(l, size) / width)) * lineHeight * width;
				});
				return area > 0;
			} else {
				return font.widthOfTextAtSize(t, size) < rect.width - 5 && font.heightAtSize(size) < rect.height;
			}

		};

		form.getFields().forEach(field => {
			if (field instanceof PDFTextField) {
				field.defaultUpdateAppearances(font);
				const widget = field.acroField.getWidgets()[0];
				const t = texts[field.getName()];
				// Get the text to fit inside the field, done manually because some of
				// the characters used mess up the auto-sizing done by the pdf library
				if (widget && t && !DoesTextFitFieldRectangle(t.toString(), widget.getRectangle(), fontSize, field.isMultiline())) {
					let altFontSize = fontSize - 0.5;
					while (altFontSize > 1 && !DoesTextFitFieldRectangle(t.toString(), widget.getRectangle(), altFontSize, field.isMultiline())) {
						altFontSize = altFontSize - 0.5;
					}
					field.setFontSize(altFontSize);
				} else {
					field.setFontSize(fontSize);
				}
				field.defaultUpdateAppearances(font);
			}
		});

		{
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

		const data = await pdfDoc.save();;
		const url = window.URL.createObjectURL(new Blob([ data ], { type: 'application/pdf' }));

		const downloader = document.createElement('a');
		downloader.download = `${CleanupOutput(hero.name || 'Unnamed Hero')}.pdf`;
		downloader.href = url;
		downloader.click();

		window.URL.revokeObjectURL(url);
	};
}
