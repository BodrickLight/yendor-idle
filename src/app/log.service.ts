import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor() {
    this.messages = [];
  }

  messages: string[];

  log(message: string) {
    this.messages.push (message)
  }
}
