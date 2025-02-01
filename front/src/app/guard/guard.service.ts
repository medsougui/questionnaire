import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate{
user: string = localStorage.getItem('user') || '';
constructor(private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.user!='') { 
      return true; 
    } else {
      this.router.navigate(['/forbidden']); 
      return false; 
    }
  }
}
