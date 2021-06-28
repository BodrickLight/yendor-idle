import { Component, OnInit } from '@angular/core';
import { LogService } from '../log.service';
import { LogMessage } from '../logMessage';
import { LogType } from '../logType';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {

  constructor(public logService: LogService) { }

  ngOnInit(): void {
  }

  getColor(message: LogMessage): string {
    switch (message.type) {
      case LogType.HeroDeath:
        return "red";
      case LogType.HeroAttackHit:
      case LogType.MonsterAttackHit:
        return "white";
      case LogType.HeroAttackMiss:
      case LogType.MonsterAttackMiss:
        return "grey";
      case LogType.Generic:
      default:
        return "white";
    }
  }
}
