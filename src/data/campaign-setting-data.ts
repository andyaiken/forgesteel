import { EnvironmentData, OrganizationData, UpbringingData } from './culture-data';
import { CampaignSetting } from '../models/campaign-setting';
import { SkillList } from '../enums/skill-list';

export class CampaignSettingData {
	static orden: CampaignSetting = {
		id: 'orden',
		name: 'Orden',
		description: 'The default setting for Draw Steel.',
		languages: [
			{
				name: 'Anjal',
				description: 'Spoken in the Hells and used in legal documents.'
			},
			{
				name: 'Caelian',
				description: 'The language of the ancient Caelian Empire.'
			},
			{
				name: 'Higaran',
				description: 'Spoken in Higara.'
			},
			{
				name: 'Hyrallic',
				description: 'The primary language of the high elves in Orden.'
			},
			{
				name: 'Kalliak',
				description: 'Spoken by orcs; an offshoot of Zaliac.'
			},
			{
				name: 'Khemharic',
				description: 'Spoken in Khemhara.'
			},
			{
				name: 'Khoursirian',
				description: 'Spoken in Koursir.'
			},
			{
				name: 'Oaxuatl',
				description: 'Spoken in Ix.'
			},
			{
				name: 'Phaedran',
				description: 'Spoken in Phaedros.'
			},
			{
				name: 'Riojan',
				description: 'Spoken in Rioja.'
			},
			{
				name: 'Uvalic',
				description: 'Spoken by the Gol.'
			},
			{
				name: 'Vaniric',
				description: 'Spoken in Vanigar.'
			},
			{
				name: 'Vaslorian',
				description: 'Spoken in Vasloria.'
			},
			{
				name: 'Yllyric',
				description: 'The cultural language of wode elves, and also the common language among those who defend and protect the natural forests of Orden.'
			},
			{
				name: 'Zaliac',
				description: 'Spoken by dwarves and used in engineering.'
			}
		],
		defaultLanguages: [
			'Caelian'
		],
		cultures: [
			{
				id: 'orden-capital',
				name: 'Capital Aristocrat',
				description: 'A member of the upper classes from the greatest city in this, or any, age.',
				languages: [ 'Riojan' ],
				environment: EnvironmentData.urban,
				organization: OrganizationData.bureaucratic,
				upbringing: UpbringingData.noble
			}
		],
		skills: [
			{
				name: 'Timescape',
				description: 'Knowing about the various planets of the timescape',
				list: SkillList.Lore
			}
		]
	};

	static getCampaignSettings = () => {
		return [
			this.orden
		];
	};
}
