import { Component } from '@angular/core';
import { HelperService } from './util/HelperService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'proyectoInicial';

  constructor
    (
      public helperService: HelperService
    ) { }
}
