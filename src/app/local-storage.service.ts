import { Injectable } from '@angular/core';
import { Save } from './save';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  load(): Save {
    var saved = localStorage.getItem(SAVEKEY);
    if (!saved) {
      return {};
    }
    return JSON.parse(saved);
  }

  save(state: Save) {
    localStorage.setItem(SAVEKEY, JSON.stringify(state));
  }

  reset() {
    localStorage.clear();
  }
}

const SAVEKEY: string = 'save';
