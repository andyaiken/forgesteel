import { EnvironmentData, OrganizationData, UpbringingData } from './culture-data';
import { CampaignSetting } from '../models/campaign-setting';
import { SkillList } from '../enums/skill-list';

export class CampaignSettingData {
	static orden: CampaignSetting = {
		id: 'orden',
		name: 'Orden',
		description: 'The default setting for Draw Steel.',
		languages: [
			'Anjal',
			'Caelian',
			'Higaran',
			'Hyrallic',
			'Kalliak',
			'Khemharic',
			'Khoursirian',
			'Oaxuatl',
			'Phaedran',
			'Riojan',
			'Uvalic',
			'Vaniric',
			'Vaslorian',
			'Yllyric',
			'Zaliac'
		],
		defaultLanguages: [
			'Caelian'
		],
		cultures: [
			{
				id: 'orden-capital',
				name: 'Capital',
				description: 'The greatest city in this or any age.',
				environment: EnvironmentData.urban,
				organization: OrganizationData.bureaucratic,
				upbringing: UpbringingData.martial
			}
		],
		skills: [
			{
				list: SkillList.Lore,
				name: 'Timescape',
				description: 'Knowing about the various planets of the timescape'
			}
		]
	};

	static getCampaignSettings = () => {
		return [
			this.orden
		];
	};
}
