export interface StorageService {
	initialize(): Promise<boolean>;

	get<T>(key: string): Promise<T | null>;
	put<T>(key: string, value: T): Promise<T>
};
