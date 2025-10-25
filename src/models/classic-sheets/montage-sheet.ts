export interface MontageSheet {
	id: string;
	name?: string;
	outcomes: {
		totalSuccess: string;
		partialSuccess: string;
		totalFailure: string;
	};
	hazards: string;
	eventsNotes: string;
};
