import { ConditionEndType, ConditionType } from '../enums/condition-type';
import { PDFCheckBox, PDFDocument, PDFTextField, StandardFonts } from 'pdf-lib';
import { Ability } from '../models/ability';
import { AbilityData } from '../data/ability-data';
import { AbilityDistanceType } from '../enums/abiity-distance-type';
import { AbilityKeyword } from '../enums/ability-keyword';
import { AbilityLogic } from '../logic/ability-logic';
import { AbilityUsage } from '../enums/ability-usage';
import { Characteristic } from '../enums/characteristic';
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
				.replaceAll(String.fromCodePoint(127925), '·')// musical note emoji?
				.replaceAll('\u266a', '·')// musical note character
				.replace(/−/g, '-')
				.replace(/ź/g, 'z')
				.replace(/ń/g, 'n')
				.replace(/č/g, 'c');
		};

		const heroicResources = HeroLogic.getHeroicResources(hero);
		const texts: { [key: string]: string | number | null } = {
			CharacterName: hero.name,
			AncestryTop: hero.ancestry && hero.ancestry.name,
			CareerTop: hero.career && hero.career.name,
			ClassTop: hero.class && hero.class.name,
			SubclassTop: (hero.class && (hero.class.subclassName !== '') && (hero.class.subclasses.filter(s => s.selected).length > 0) && hero.class.subclassName + ': ' + hero.class.subclasses.filter(s => s.selected)[0].name) || null,
			Level: hero.class && hero.class.level,
			Wealth: hero.state.wealth,
			Renown: hero.state.renown,
			XP: hero.state.xp,
			Speed: FormatLogic.getSpeed(HeroLogic.getSpeed(hero)),
			Stability: HeroLogic.getStability(hero),
			Size: FormatLogic.getSize(HeroLogic.getSize(hero)),
			Disengage: HeroLogic.getDisengage(hero),
			Stamina: HeroLogic.getStamina(hero) - hero.state.staminaDamage,
			MaxStamina: HeroLogic.getStamina(hero),
			RecoveryValue: HeroLogic.getRecoveryValue(hero),
			MaxRecoveries: HeroLogic.getRecoveries(hero),
			Recoveries: HeroLogic.getRecoveries(hero) - hero.state.recoveriesUsed,
			HeroicResource: heroicResources.length > 0 ? heroicResources[0].value : 0,
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

		if (hero.class) {
			// might/agility/reason/intuition/presence
			let surgeDamage = 0;
			[ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ].forEach(ch => {
				const value = HeroLogic.getCharacteristic(hero, ch);
				surgeDamage = Math.max(surgeDamage, value);
				texts[ch] = value;
				autoResizingFields.push(ch);
			});
			texts['SurgeDamage'] = surgeDamage;
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
				.replace(/≤ 11\t/g, '11 or less')
				.replace(/17 \+/g, '17+\t')
				.replace(/≤\s*(\d+)\t?/g, '$1 or less')
				.replace(/≥\s*(\d+)/g, '$1+\t')
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
			if (heroicResources.length > 0) {
				const hr = heroicResources[0];
				texts['HeroicResourcesPerTurn'] = hr.gains[0].value;
				ignoredFeatures[hr.id] = true;
				let resourceGainText = 'Your resource is ' + hr.name.toLowerCase() + '.\n\n';
				hr.gains.forEach(g => {
					resourceGainText += g.trigger + ': +' + g.value + '\n';
				});
				if (hr.details) {
					resourceGainText += '\n\n' + hr.details;
				}
				texts['HeroicResourceGains'] = CleanupOutput(resourceGainText);
			} else {
				const resource = heroicResources.length > 0 ? heroicResources[0].name.toLowerCase() : 'XXX';
				const startup = new RegExp(String.raw`\s*At the start of each of your turns during combat, you gain (.+?) ${resource}\.\s*`);
				const heroicResourceFeature = features.find(f => f.description.match(startup));
				if (heroicResourceFeature) {
					const startupAmount = heroicResourceFeature.description.match(startup);
					if (startupAmount) {
						texts['HeroicResourcesPerTurn'] = startupAmount[1];
					}
					ignoredFeatures[heroicResourceFeature.id] = true;
					const resourceGainText = 'Your resource is ' + resource + '.\n\n' + heroicResourceFeature.description.replace(startup, '');
					texts['HeroicResourceGains'] = CleanupOutput(resourceGainText);
				}
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
						const melee = AbilityLogic.getDistance(a.distance[0], a, hero).replace('Melee', 'M');
						const ranged = AbilityLogic.getDistance(a.distance[1], a, hero).replace('Ranged', 'R');
						texts[prefix + 'Distance' + i] = `${melee} or ${ranged}`;
					} else if (a.distance.length > 0) {
						texts[prefix + 'Distance' + i] = AbilityLogic.getDistance(a.distance[0], a, hero);
					}
					texts[prefix + 'Keywords' + i] = a.keywords.join(', ');
					texts[prefix + 'Type' + i] = a.type.free ? `Free ${a.type.usage}` : a.type.usage;

					const details = [ ...a.type.qualifiers || [] ];
					if (a.type.trigger !== '') {
						details.push('Trigger:\n' + CleanupOutput(a.type.trigger));
					}
					a.sections.forEach(section => {
						switch (section.type) {
							case 'text':
								details.push(CleanupOutput(section.text.replace(/^\s+/, '')));
								break;
							case 'field':
								if (section.value !== 0) {
									details.push(section.name + ' ' + section.value + (section.repeatable ? '+' : '') + ':\n' + CleanupOutput(section.effect));
								} else {
									details.push(section.name + ':\n' + CleanupOutput(section.effect));
								}
								break;
							case 'roll': {
								let powerRollText = '';
								powerRollText = powerRollText + 'Power Roll: 2d10 + ' + Math.max(...section.roll.characteristic
									.map(
										c => hero.class && hero.class.characteristics.find(d => d.characteristic === c)
									)
									.map(c => (c && c.value) || 0)
								);
								powerRollText = powerRollText + '\n   • 11 or less\t' + AbilityLogic.getTierEffect(
									section.roll.tier1,
									1,
									a,
									undefined,
									hero
								);
								powerRollText = powerRollText + '\n   • 12 - 16\t\t' + AbilityLogic.getTierEffect(
									section.roll.tier2,
									2,
									a,
									undefined,
									hero
								);
								powerRollText = powerRollText + '\n   • 17 or more\t\t\t' + AbilityLogic.getTierEffect(
									section.roll.tier3,
									3,
									a,
									undefined,
									hero
								);

								const hasMelee = a.keywords.includes(AbilityKeyword.Melee) && a.keywords.includes(AbilityKeyword.Weapon);
								const hasRanged = a.keywords.includes(AbilityKeyword.Ranged) && a.keywords.includes(AbilityKeyword.Weapon);

								const dmgKits = HeroLogic
									.getKitDamageBonuses(hero)
									.filter(dmg => {
										switch (dmg.type) {
											case 'melee':
												return hasMelee;
											case 'ranged':
												return hasRanged;
										}
									});

								// Show bonuses from kits if:
								// * we have more than 1 bonus
								// * the ability has melee and ranged distances
								// ... because otherwise it should have already been applied
								const showKitBonuses = (dmgKits.length > 1) || (hasMelee && hasRanged);
								if (showKitBonuses) {
									dmgKits.forEach(bonus => {
										powerRollText = powerRollText + '\n   ' + bonus.kit + ': ' + AddSign(bonus.tier1) + ' / ' + AddSign(bonus.tier2) + ' / ' + AddSign(bonus.tier3) + ' ' + bonus.type + ' damage';
									});
								}

								details.push(powerRollText);
								break;
							}
						}
					});
					texts[prefix + 'Text' + i] = details.join('\n\n');

					if (typeof a.cost === 'number' && a.cost > 0) {
						texts[prefix + 'Tag' + i] = a.cost;
					} else if (a.cost === 'signature') {
						texts[prefix + 'Tag' + i] = 'S';
					} else if (a.type.usage === AbilityUsage.Trigger) {
						texts[prefix + 'Tag' + i] = a.type.free ? 'FT' : 'T';
					} else if (a.type.usage === AbilityUsage.Maneuver) {
						texts[prefix + 'Tag' + i] = a.type.free ? 'FM' : 'M';
					} else if (a.type.usage === AbilityUsage.MainAction) {
						texts[prefix + 'Tag' + i] = a.type.free ? 'FA' : 'A';
					} else if (a.type.usage === AbilityUsage.FreeStrike) {
						texts[prefix + 'Tag' + i] = 'FS';
					}
				});
			};
			const abilities = HeroLogic.getAbilities(hero, sourcebooks, false).map(a => a.ability);
			abilities.push(AbilityData.freeStrikeMelee);
			abilities.push(AbilityData.freeStrikeRanged);
			texts['RegularActions'] = abilities.filter(a => a.type.usage === AbilityUsage.MainAction).map(a => ' • ' + a.name + ((typeof (a.cost) === 'number' && a.cost > 0 && ' (' + a.cost + ')') || '')).join('\n');
			texts['Maneuvers'] = abilities.filter(a => a.type.usage === AbilityUsage.Maneuver).map(a => ' • ' + a.name + ((typeof (a.cost) === 'number' && a.cost > 0 && ' (' + a.cost + ')') || '')).join('\n');
			texts['TriggeredActions'] = abilities.filter(a => a.type.usage === AbilityUsage.Trigger).map(a => ' • ' + a.name + ((typeof (a.cost) === 'number' && a.cost > 0 && ' (' + a.cost + ')') || '')).join('\n');

			ApplyGroup(
				abilities.filter(a => !ignoredFeatures[a.id]),
				'Ability',
				(format === 'portrait') ? 18 : 16
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

		const DoesTextFitFieldRectangle = (t: string, rect: { x: number, y: number, width: number, height: number }, size: number, multiline: boolean) => {
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

		const data = await pdfDoc.save();
		const part = [ data ] as BlobPart[];
		const url = window.URL.createObjectURL(new Blob(part, { type: 'application/pdf' }));

		const downloader = document.createElement('a');
		downloader.download = `${CleanupOutput(hero.name || 'Unnamed Hero')}.pdf`;
		downloader.href = url;
		downloader.click();

		window.URL.revokeObjectURL(url);
	};
}
