import { Injectable } from '@angular/core';
import { LogType } from './logType';
import { LogMessage } from './logMessage';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor() {
    this.messages = [];
  }

  messages: LogMessage[];

  log(message: string, type: LogType) {
    this.messages.push ({
      message,
      type
    })
  }
}
