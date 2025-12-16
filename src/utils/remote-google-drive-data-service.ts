import { ConnectionSettings } from '@/models/connection-settings';
import { DataService } from '@/utils/data-service';
import { Hero } from '@/models/hero';
import { Options } from '@/models/options';
import { Playbook } from '@/models/playbook';
import { Session } from '@/models/session';
import { Sourcebook } from '@/models/sourcebook';
import { GoogleDriveClient } from '@/utils/google-drive-client';

interface DriveJsonBlob {
  [key: string]: unknown;
}

export class RemoteGoogleDriveDataService extends DataService {
  private static FILE_NAME = 'forgesteel-data.json';

  private client: GoogleDriveClient | null = null;

  private readonly HEROES_DOC_ID = 'forgesteel-heroes';
  private readonly HOMEBREW_DOC_ID = 'forgesteel-homebrew-settings';
  private readonly OPTIONS_DOC_ID = 'forgesteel-options';
  private readonly PLAYBOOK_DOC_ID = 'forgesteel-playbook';
  private readonly SESSION_DOC_ID = 'forgesteel-session';
  private readonly HIDDEN_SETTINGS_DOC_ID = 'forgesteel-hidden-setting-ids';

  constructor(settings: ConnectionSettings) {
    super(settings);
    if (!(settings.googleClientId || (import.meta as any).env?.VITE_GDRIVE_CLIENT_ID)) {
      console.warn('RemoteGoogleDriveDataService: googleClientId is not configured');
    }
  }

  private ensureClient(): GoogleDriveClient {
    if (!this.client) {
      const envId = (import.meta as any).env?.VITE_GDRIVE_CLIENT_ID as string | undefined;
      this.client = new GoogleDriveClient(this.settings.googleClientId || envId || '');
    }
    return this.client;
  }

  override async initialize(): Promise<boolean> {
    if (!this.settings.useGoogleDrive) {
      return false;
    }

    const client = this.ensureClient();
    try {
      await client.getAccessToken(false).catch(async () => {
        return client.getAccessToken(true);
      });

      return true;
    } catch (e) {
      console.error('Error initializing Google Drive client', e);
      return false;
    }
  }

  private async getBaseData(): Promise<DriveJsonBlob> {
    const client = this.ensureClient();
    try {
      const data = await client.downloadJsonFromAppData(RemoteGoogleDriveDataService.FILE_NAME);
      return (data as DriveJsonBlob) || ({} as DriveJsonBlob);
    } catch (e: any) {
      console.error('Error reading from Google Drive', e);
      return {} as DriveJsonBlob;
    }
  }

  private async saveBaseData(base: DriveJsonBlob): Promise<void> {
    const client = this.ensureClient();
    
    await client.uploadJsonToAppData(
      RemoteGoogleDriveDataService.FILE_NAME,
      base
    );
  }

  private async getDocument<T>(docId: string): Promise<T | null> {
    const base = await this.getBaseData();
    return (base[docId] as T) ?? null;
  }

  private async setDocument<T>(docId: string, data: T): Promise<T> {
    const base = await this.getBaseData();
    base[docId] = data as unknown as never;
    await this.saveBaseData(base);
    return data;
  }

  override async getOptions(): Promise<Options | null> {
    return this.getDocument<Options>(this.OPTIONS_DOC_ID);
  }

  override async saveOptions(options: Options): Promise<Options> {
    return this.setDocument<Options>(this.OPTIONS_DOC_ID, options);
  }

  override async getHeroes(): Promise<Hero[] | null> {
    return this.getDocument<Hero[]>(this.HEROES_DOC_ID);
  }

  override async saveHeroes(heroes: Hero[]): Promise<Hero[]> {
    return this.setDocument<Hero[]>(this.HEROES_DOC_ID, heroes);
  }

  override async getHomebrew(): Promise<Sourcebook[] | null> {
    return this.getDocument<Sourcebook[]>(this.HOMEBREW_DOC_ID);
  }

  override async saveHomebrew(sourcebooks: Sourcebook[]): Promise<Sourcebook[]> {
    return this.setDocument<Sourcebook[]>(this.HOMEBREW_DOC_ID, sourcebooks);
  }

  override async getPlaybook(): Promise<Playbook | null> {
    return this.getDocument<Playbook>(this.PLAYBOOK_DOC_ID);
  }

  override async savePlaybook(playbook: Playbook): Promise<Playbook> {
    return this.setDocument<Playbook>(this.PLAYBOOK_DOC_ID, playbook);
  }

  override async getSession(): Promise<Session | null> {
    return this.getDocument<Session>(this.SESSION_DOC_ID);
  }

  override async saveSession(session: Session): Promise<Session> {
    return this.setDocument<Session>(this.SESSION_DOC_ID, session);
  }

  override async getHiddenSettingIds(): Promise<string[] | null> {
    return this.getDocument<string[]>(this.HIDDEN_SETTINGS_DOC_ID);
  }

  override async saveHiddenSettingIds(ids: string[]): Promise<string[]> {
    return this.setDocument<string[]>(this.HIDDEN_SETTINGS_DOC_ID, ids);
  }

  async getRemoteFileModifiedTime(): Promise<Date | null> {
    const client = this.ensureClient();
    try {
      const metadata = await client.getAppDataFileMetadata(RemoteGoogleDriveDataService.FILE_NAME);
      if (!metadata || !metadata.modifiedTime) {
        return null;
      }
      return new Date(metadata.modifiedTime);
    } catch (e) {
      console.error('Error getting file metadata', e);
      return null;
    }
  }
}
