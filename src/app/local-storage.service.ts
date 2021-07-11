import { Injectable } from '@angular/core';
import { Save } from './save';

const SAVEKEY = 'save';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  load(): Save {
    const saved = localStorage.getItem(SAVEKEY);
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
