import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { ColorService } from './color.service';



@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = "https://localhost:44304/api/"

  constructor(private httpClient:HttpClient) { }
  
  getCars():Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getcardetails"
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }

  getCarsById(carId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getcardetailsbyid?carId=" + carId
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }

  getCarsByBrand(brandId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getcarsbybrandid?brandId=" + brandId
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }

  getCarsByColor(colorId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getcarsbycolorid?colorId=" + colorId
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }

  add(car:Car):Observable<ResponseModel>{
    let newPath=this.apiUrl + "cars/add" 
    return this.httpClient.post<ResponseModel>(newPath, car)
  }

  update(car:Car):Observable<ResponseModel>{
    let newPath=this.apiUrl + "cars/update"
    return this.httpClient.post<ResponseModel>(newPath, car)
  }

  getCarFindeksScore(carId:number){
    let newPath=this.apiUrl+"cars/getfindeksscore?carId=" + carId;
    return this.httpClient.get(newPath)
  }
}
