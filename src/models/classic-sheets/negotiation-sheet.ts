export interface NegotiationSheet {
	id: string;
	name: string;
	attitude: string;
	impression: number;
	interest: number;
	patience: number;

	outcomes: string[];

	languages: string[];
	motivations: { trait: string, description: string }[];
	pitfalls: { trait: string, description: string }[];
};
