import { Component } from '@angular/core';
import { GameService } from './game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Yendor Idle';

  // eslint-disable-next-line no-empty-function
  constructor(public game: GameService) {}
}
