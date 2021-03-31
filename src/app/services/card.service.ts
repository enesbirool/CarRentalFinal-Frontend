import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../models/card';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private httpClient: HttpClient) { }

  apiUrl = "https://localhost:44304/api/"

  doesCardExist(card:Card):Observable<ResponseModel>{
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(card);
    let newPath = this.apiUrl + "cards/doescardexist"
    return this.httpClient.post<ResponseModel>(newPath, body, {'headers': headers});
  }

  getByCardNumber(cardNumber:number):Observable<ListResponseModel<Card>>{
    let newPath = this.apiUrl + "cards/getbycardnumber?cardNumber=" + cardNumber
    return this.httpClient.get<ListResponseModel<Card>>(newPath);
  }
}
