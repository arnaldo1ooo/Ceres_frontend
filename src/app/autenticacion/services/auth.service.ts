import { HelpersService } from '../../compartido/services/helpers.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private helpersService: HelpersService
  ) { }

  logout() {
    this.helpersService.removerItemDelStorage('currentUser');
  }
}
