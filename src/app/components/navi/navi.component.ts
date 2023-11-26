import { Component, OnInit } from '@angular/core';
import { LoginModel } from 'src/app/models/loginModel';
import { RegisterModel } from 'src/app/models/registerModel';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  fullName:string;
  email:any;

  constructor(private authService:AuthService,
    private localStorageService:LocalStorageService) { }

  ngOnInit(): void {
  }
  
  ifLoggedIn(): boolean {
    var user = this.localStorageService.getItem('fullName');
    var email = this.localStorageService.getItem('email');
    if (user == null) {
      return false;
    } else {
      this.fullName = user;
      this.email = email;
      return true;
    }
  }

  clearLocalStorage(){
    localStorage.clear()
  }
}
