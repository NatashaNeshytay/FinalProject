import { APP_EVENTS } from '../constants/appEvents';
import { eventEmmiter } from '../core/EventEmmiter';

class StorageService {
  constructor() {
    this.storage = window.localStorage;
  }

  setItem(key, value) {
    try {
      this.storage.setItem(key, JSON.stringify(value));
      eventEmmiter.emit(APP_EVENTS.storage, { data: this.getItem(key) });
    } catch (error) {
      console.error(error);
    }
  }

  getItem(key) {
    try {
      return JSON.parse(this.storage.getItem(key));
    } catch (error) {
      console.error(error);
    }
  }

  removeItem(key) {
    this.storage.removeItem(key);
    eventEmmiter.emit(APP_EVENTS.storage, { data: this.getItem(key) });
  }

  clear() {
    this.storage.clear();
    eventEmmiter.emit(APP_EVENTS.storage, { data: null });
  }
}

export const storageService = new StorageService();
