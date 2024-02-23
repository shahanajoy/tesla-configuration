import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarModel } from '../models/car-model.model';
import { CarConfig } from '../models/car-config.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http:HttpClient) { }

  getCarModels(){
    return this.http.get<CarModel[]>('models');
  }

  getCarConfigurations(modelVal:string){ 
    return this.http.get<CarConfig>('/options/'+modelVal);
  }
}
