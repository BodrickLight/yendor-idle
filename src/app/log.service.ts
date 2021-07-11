import { Injectable } from '@angular/core';
import { LogType } from './logType';
import { LogMessage } from './logMessage';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  messages: LogMessage[];

  constructor() {
    this.messages = [];
  }

  log(message: string, type: LogType) {
    this.messages.push({
      message,
      type,
    });
    const toDelete = this.messages.length - 100;
    if (toDelete > 0) {
      this.messages.splice(0, toDelete);
    }
  }
}
