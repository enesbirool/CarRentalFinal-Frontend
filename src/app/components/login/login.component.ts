import { LocalResolver } from '@angular/compiler/src/compiler_util/expression_converter';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginModel } from 'src/app/models/loginModel';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup
  currentLoginModel:LoginModel;

  constructor(
    private toastrService:ToastrService, 
    private authService:AuthService, 
    private formBuilder:FormBuilder,
    private router:Router,
    private localStorageService:LocalStorageService,
    private customerService:CustomerService) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email:["", Validators.required],
      password:["", Validators.required]
    })
  }

  login(){
    if(this.loginForm.valid){
      let loginModel=Object.assign({}, this.loginForm.value)

      this.authService.login(loginModel).subscribe(response=>{
        this.toastrService.info(response.message)
        this.localStorageService.setItem("token",response.data.token)
        this.customerService.getUserByMail(loginModel.email).subscribe(response=>{
          console.log(loginModel.email);
          this.localStorageService.setItem('fullName', response.data.firstName +" "+ response.data.lastName);
          this.localStorageService.setItem('firstName', response.data.firstName);
          this.localStorageService.setItem('lastName', response.data.lastName);
          this.localStorageService.setItem('email', response.data.email);
        });
        this.router.navigate(['/']);
      },responseError=>{
        this.toastrService.error(responseError.error)
      })
    }
  }


}
