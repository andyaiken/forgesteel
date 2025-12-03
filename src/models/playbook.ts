import { Adventure } from '@/models/adventure';
import { Encounter } from '@/models/encounter';
import { Montage } from '@/models/montage';
import { Negotiation } from '@/models/negotiation';
import { TacticalMap } from '@/models/tactical-map';

export interface Playbook {
	adventures: Adventure[];
	encounters: Encounter[];
	montages: Montage[];
	negotiations: Negotiation[];
	tacticalMaps: TacticalMap[];
}
