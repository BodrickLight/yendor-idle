import { Component } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  // eslint-disable-next-line no-empty-function
  constructor(private storage: LocalStorageService) {}

  hardReset() {
    this.storage.reset();
    window.location.reload();
  }
}
