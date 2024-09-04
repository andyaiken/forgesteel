import { SkillList } from '../enums/skill-list';
import { CampaignSetting } from '../models/campaign-setting';

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
		cultures: [],
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
	}
}
