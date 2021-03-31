import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarDetailService {

  apiUrl = "https://localhost:44304/api/"

  constructor(private httpClient:HttpClient) { }
  
  getCarDetails(carId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl+"cars/getcardetailsbyid?carId=" + carId
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }

  getCarImages():Observable<ListResponseModel<CarImage>>{
    let newPath=this.apiUrl+"carImages/getall"
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath)
  }

  getCarImagesByCarId(carId:number):Observable<ListResponseModel<CarImage>>{
    let newPath=this.apiUrl+"carImages/getbycarid?carId="+carId
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath)
  }

  update(car:Car):Observable<ResponseModel>{
    let newPath=this.apiUrl+"cars/update"
    return this.httpClient.post<ResponseModel>(newPath, car)
  }
  
}
