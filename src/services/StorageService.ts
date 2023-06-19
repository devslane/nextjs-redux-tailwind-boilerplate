import Cookies, { CookieSetOptions } from 'universal-cookie';

export const AUTH_TOKEN = 'authToken';

class StorageService {
  private static _instance: StorageService;

  private _cookies: Cookies;

  private constructor() {
    this._cookies = new Cookies();
  }

  static getInstance(): StorageService {
    if (!this._instance) {
      this._instance = new StorageService();
    }

    return this._instance;
  }

  setLocalStorageValue(key: string, value: string): void {
    if (typeof localStorage !== 'undefined') {
      localStorage?.setItem(key, value);
    }
  }

  getLocalStorageValue(key: string): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage?.getItem(key);
    }
    return null;
  }

  removeLocalStorageValue(key: string): void {
    if (typeof localStorage !== 'undefined') {
      localStorage?.removeItem(key);
    }
  }

  setSessionStorageValue(key: string, value: string): void {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage?.setItem(key, value);
    }
  }

  getSessionStorageValue(key: string): string | null {
    if (typeof sessionStorage !== 'undefined') {
      return sessionStorage?.getItem(key);
    }
    return null;
  }

  removeSessionStorageValue(key: string): void {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage?.removeItem(key);
    }
  }

  setAuthToken(token: string): void {
    this.setCookie(AUTH_TOKEN, token);
  }

  getAuthToken() {
    return this.getCookie(AUTH_TOKEN);
  }

  removeAuthToken(): void {
    this.deleteCookie(AUTH_TOKEN);
  }

  setCookies(cookies: any): void {
    this._cookies = new Cookies(cookies);
  }

  setCookie(key: string, value: string, options?: CookieSetOptions): void {
    this._cookies.set(key, value, options);
  }

  getCookie(key: string) {
    return this._cookies.get(key);
  }

  getCookies() {
    return this._cookies.getAll();
  }

  deleteCookie(key: string) {
    this._cookies.remove(key);
  }
}

const storageService = StorageService.getInstance();

export default storageService;
