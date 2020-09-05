import { Component, OnInit } from '@angular/core';

import { LoginService } from "src/app/services/login.service";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor
    (
      public loginService: LoginService,
      public translateService: TranslateService
    ) { }

  ngOnInit(): void {
    this.translateService.setDefaultLang('es');
  }

  selectLang(lang: string) {
    this.translateService.use(lang);
  }

  logOut() {
    this.loginService.logOut();
  }
}
