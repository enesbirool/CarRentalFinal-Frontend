import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl = "https://localhost:44304/api/"

  constructor(private httpClient:HttpClient) { }

  getCustomerDetails(customerId:number):Observable<SingleResponseModel<Customer>>{
    let newPath = this.apiUrl + "customers/getcustomerdetails?customerId=" + customerId
    return this.httpClient.get<SingleResponseModel<Customer>>(newPath)
  }

  getUserByMail(email:string):Observable<SingleResponseModel<User>>{
    return this.httpClient.get<SingleResponseModel<User>>(this.apiUrl + "users/getbyemail?email=" + email)
  }

  getCustomerFindeksScore(customerId:number){
    let newPath = this.apiUrl + "customers/getfindeksscore?customerId=" + customerId
    return this.httpClient.get(newPath)
  }
  
  update(customer:Customer):Observable<ResponseModel>{
    let newPath=this.apiUrl + "customers/update"
    return this.httpClient.post<ResponseModel>(newPath, customer)
  }
}