import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HelperService } from '../util/HelperService';

@Injectable({
  providedIn: 'root'
})
export class BlockAccessGuard implements CanActivate {


  constructor(public helperService: HelperService, public router: Router) {}

  canActivate(): boolean {
    if (
      this.helperService.isValidValue(this.helperService.getLocalData("user"))
    ) {
      return true;
    } else {
      this.router.navigateByUrl("/login");
      return false;
    }
  }

  
}
