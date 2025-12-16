/*
  Lightweight Google Drive client using Google Identity Services (GIS)
  for client-side OAuth (no backend) and Drive v3 REST via fetch.


  FYI you will need to set up your OAuth consent screen and OAuth client ID
  in Google Cloud Console:
  https://console.cloud.google.com/apis/credentials

  You'll need to grantee the "Drive App Data" scope to your OAuth client.
*/

/* eslint-disable @typescript-eslint/no-explicit-any */

export type GoogleDriveScopes = 'https://www.googleapis.com/auth/drive.appdata';

interface StoredToken {
  access_token: string;
  expires_at: number; // epoch ms
}

export class GoogleDriveClient {
  private clientId: string;
  private scope: GoogleDriveScopes;
  private tokenClient: any | null = null;
  private accessToken: string | null = null;
  private expiresAt: number = 0;

  private static GIS_SRC = 'https://accounts.google.com/gsi/client';
  private static TOKEN_STORAGE_KEY = 'gdrive_token_v1';

  constructor(clientId: string, scope: GoogleDriveScopes = 'https://www.googleapis.com/auth/drive.appdata') {
    this.clientId = clientId;
    this.scope = scope;

    const stored = this.readStoredToken();
    if (stored) {
      this.accessToken = stored.access_token;
      this.expiresAt = stored.expires_at;
    }
  }

  isAuthorized(): boolean {
    return this.tokenValid();
  }

  private readStoredToken(): StoredToken | null {
    try {
      const raw = localStorage.getItem(GoogleDriveClient.TOKEN_STORAGE_KEY);
      if (!raw) return null;
      const obj = JSON.parse(raw) as StoredToken;
      if (!obj.access_token || !obj.expires_at) return null;
      return obj;
    } catch {
      return null;
    }
  }

  private storeToken(token: string, expiresInSeconds: number) {
    this.accessToken = token;
    // Set expiry slightly earlier (skew) to be safe
    const skewMs = 30 * 1000;
    this.expiresAt = Date.now() + expiresInSeconds * 1000 - skewMs;
    const payload: StoredToken = { access_token: token, expires_at: this.expiresAt };
    localStorage.setItem(GoogleDriveClient.TOKEN_STORAGE_KEY, JSON.stringify(payload));
  }

  private clearStoredToken() {
    localStorage.removeItem(GoogleDriveClient.TOKEN_STORAGE_KEY);
    this.accessToken = null;
    this.expiresAt = 0;
  }

  private loadGis(): Promise<void> {
    return new Promise((resolve, reject) => {
      if ((window as any).google && (window as any).google.accounts && (window as any).google.accounts.oauth2) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = GoogleDriveClient.GIS_SRC;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Google Identity Services script'));
      document.head.appendChild(script);
    });
  }

  private ensureTokenClient(): Promise<void> {
    return this.loadGis().then(() => {
      if (!this.tokenClient) {
        this.tokenClient = (window as any).google.accounts.oauth2.initTokenClient({
          client_id: this.clientId,
          scope: this.scope,
          // callback is supplied per-request in requestAccessToken
        });
      }
    });
  }

  private tokenValid(): boolean {
    return !!this.accessToken && Date.now() < this.expiresAt - 5_000;
  }

  async getAccessToken(interactive = false): Promise<string> {
    if (this.tokenValid()) {
      return this.accessToken as string;
    }

    await this.ensureTokenClient();

    const token = await new Promise<string>((resolve, reject) => {
      const client = this.tokenClient;
      let settled = false;
      const timeoutMs = interactive ? 15000 : 7000;
      const timeoutId = window.setTimeout(() => {
        if (!settled) {
          settled = true;
          reject(new Error('popup_blocked_or_prevented'));
        }
      }, timeoutMs);

      client.callback = (resp: any) => {
        if (resp.error) {
          if (!settled) {
            settled = true;
            window.clearTimeout(timeoutId);
            reject(new Error(resp.error));
          }
          return;
        }
        try {
          const accessToken = resp.access_token as string;
          const expiresIn = resp.expires_in as number | undefined;
          this.storeToken(accessToken, (expiresIn ?? 3600));
          if (!settled) {
            settled = true;
            window.clearTimeout(timeoutId);
            resolve(accessToken);
          }
        } catch (e) {
          if (!settled) {
            settled = true;
            window.clearTimeout(timeoutId);
            reject(e);
          }
        }
      };

      // Attempt silent first if not interactive
      try {
        if (!interactive) {
          client.requestAccessToken({ prompt: '' });
        } else {
          client.requestAccessToken();
        }
      } catch (err) {
        // Synchronous failure to open popup or SDK error
        if (!settled) {
          settled = true;
          window.clearTimeout(timeoutId);
          reject(err as Error);
        }
      }
    });

    return token;
  }

  revoke(): void {
    try {
      const token = this.accessToken;
      this.clearStoredToken();
      if (token && (window as any).google?.accounts?.oauth2?.revoke) {
        (window as any).google.accounts.oauth2.revoke(token, () => {});
      }
    } catch {
      // ignore
    }
  }

  // --- Drive REST helpers ---
  private async driveFetch(path: string, init?: RequestInit): Promise<Response> {
    const token = await this.getAccessToken(false).catch(async () => {
      // Fallback to interactive prompt
      return this.getAccessToken(true);
    });

    const headers = new Headers(init?.headers || {});
    headers.set('Authorization', `Bearer ${token}`);

    return fetch(`https://www.googleapis.com${path}`, {
      ...init,
      headers
    });
  }

  async listAppDataFiles(): Promise<Array<{ id: string; name: string }>> {
    const url = `/drive/v3/files?spaces=appDataFolder&fields=files(id,name)&pageSize=100`;
    const resp = await this.driveFetch(url, { method: 'GET' });
    if (!resp.ok) {
      throw new Error(`Drive list failed: ${resp.status}`);
    }
    const data = await resp.json();
    return (data.files as Array<{ id: string; name: string }>) || [];
  }

  async getAppDataFileMetadata(name: string): Promise<{ id: string; name: string; modifiedTime: string } | null> {
    const url = `/drive/v3/files?spaces=appDataFolder&fields=files(id,name,modifiedTime)&pageSize=100`;
    const resp = await this.driveFetch(url, { method: 'GET' });
    if (!resp.ok) {
      throw new Error(`Drive list failed: ${resp.status}`);
    }
    const data = await resp.json();
    const files = (data.files as Array<{ id: string; name: string; modifiedTime: string }>) || [];
    const file = files.find(f => f.name === name);
    return file || null;
  }

  async downloadFile(fileId: string): Promise<string> {
    const resp = await this.driveFetch(`/drive/v3/files/${fileId}?alt=media`, { method: 'GET' });
    if (!resp.ok) {
      throw new Error(`Drive download failed: ${resp.status}`);
    }
    return resp.text();
  }

  async downloadJsonFromAppData(name: string): Promise<unknown | null> {
    try {
      // List files in appDataFolder to find the file by name
      const files = await this.listAppDataFiles();
      const file = files.find(f => f.name === name);
      
      if (!file) {
        // File doesn't exist yet
        return null;
      }

      // Download the file content
      const content = await this.downloadFile(file.id);
      return JSON.parse(content);
    } catch (e: any) {
      if (e.message?.includes('404')) {
        return null;
      }
      throw e;
    }
  }

  async uploadJsonToAppData(name: string, json: unknown): Promise<void> {
    // Create new file in appDataFolder
    const boundary = '-------314159265358979323846';
    const delimiter = `\r\n--${boundary}\r\n`;
    const closeDelim = `\r\n--${boundary}--`;

    const metadata = {
    name,
    parents: ['appDataFolder']
    };

    const body =
    delimiter +
    'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
    JSON.stringify(metadata) +
    delimiter +
    'Content-Type: application/json\r\n\r\n' +
    JSON.stringify(json) +
    closeDelim;

    const resp = await this.driveFetch(`/upload/drive/v3/files?uploadType=multipart`, {
    method: 'POST',
    headers: {
        'Content-Type': `multipart/related; boundary=${boundary}`
    },
    body
    });

    console.log('Upload response:');
    console.log(resp);

    if (!resp.ok) {
    throw new Error(`Drive create failed: ${resp.status}`);
    }
  }
}
