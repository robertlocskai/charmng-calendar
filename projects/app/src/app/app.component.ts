import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CharmngCalendarModule } from '../../../charmng-calendar/src/public-api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CharmngCalendarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'app';
}
