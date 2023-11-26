import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginModel } from 'src/app/models/loginModel';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userEmail:string;
  firstName:string;
  lastName:string;

  constructor(private activatedRoute:ActivatedRoute, 
    private authService:AuthService,
    private customerService:CustomerService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["email"]){
        this.userEmail = params['email'];
        this.getUserByMail(this.userEmail);
      }
    })
  }

  getUserByMail(email:string){
    this.customerService.getUserByMail(email).subscribe(response=>{
      this.firstName = response.data.firstName,
      this.lastName = response.data.lastName
    })
  }
}
