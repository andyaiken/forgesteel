import { ResourceGainFrequency } from '@/enums/resource-gain-frequency';

export interface ResourceGain {
	tag: string;
	trigger: string;
	value: string;
	frequency: ResourceGainFrequency;
	used: boolean;
}
