import { Feature, FeatureSummonFormationData } from '@/models/feature';
import { Hero } from '@/models/hero';
import { Sourcebook } from '@/models/sourcebook';

interface InfoProps {
	data: FeatureSummonFormationData;
	feature: Feature;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const InfoSummonFormation = (_props: InfoProps) => {
	return null;
};

interface EditProps {
	data: FeatureSummonFormationData;
	sourcebooks: Sourcebook[];
	setData: (data: FeatureSummonFormationData) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const EditSummonFormation = (_props: EditProps) => {
	return null;
};
