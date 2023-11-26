import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarImage } from '../models/carImage';
import { Customer } from '../models/customer';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl = "https://localhost:44304/api/"

  constructor(private httpClient:HttpClient) { }

  getRentals():Observable<ListResponseModel<Rental>>{
    let newPath = this.apiUrl + "rentals/getrentaldetails"
    return this.httpClient.get<ListResponseModel<Rental>>(newPath)
  }

  getRentalsByCarId(carId:number):Observable<ListResponseModel<Rental>>{
    let newPath = this.apiUrl + "rentals/getrentalsbycarid?carId=" + carId
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

  isRentable(rental:Rental):Observable<ResponseModel>{
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(rental);
    let newPath = this.apiUrl + "rentals/isrentable"
    return this.httpClient.post<ResponseModel>(newPath, body, {'headers': headers})
  }

  addRental(rental:Rental):Observable<ResponseModel>{
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(rental);
    let newPath = this.apiUrl + "rentals/add"
    console.log("ok")
    return this.httpClient.post<ResponseModel>(newPath, body, {'headers': headers})
  }

  getCarFindeksScore(carId:number){
    return this.httpClient.get(this.apiUrl + "cars/getfindeksscore?carId=" + carId);
  }

  getCustomerFindeksScore(customerId:number){
    return this.httpClient.get(this.apiUrl + "customers/getfindeksscore?customerId=" + customerId);
  }

  isFindeksScoreEnough(carId:number, customerId:number){
    let carFindeks = this.getCarFindeksScore(carId);
    let customerFindeks = this.getCustomerFindeksScore(customerId);
    if(customerFindeks>=carFindeks){
      return true;
    }
    else{
      return false;
    }
  }

  getCustomerDetails(customerId:number):Observable<ListResponseModel<Customer>>{
    let newPath = this.apiUrl + "/customers/getcustomerdetails?customerId=" + customerId;
    return this.httpClient.get<ListResponseModel<Customer>>(newPath)
  }
}
