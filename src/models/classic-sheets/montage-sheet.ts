export interface MontageSheet {
	id: string;
	name?: string;
	difficulty?: string;
	successLimit?: number;
	failureLimit?: number;
	numHeroes?: number;
	outcomes: {
		totalSuccess: string;
		partialSuccess: string;
		totalFailure: string;
	};
	hazards: string;
	eventsNotes: string;
};
