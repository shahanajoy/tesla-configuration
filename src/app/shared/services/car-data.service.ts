import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { CarService } from '../../services/car.service';
import { CarModel } from '../../models/car-model.model';
import { CarConfig, Configs } from '../../models/car-config.model';

@Injectable({
  providedIn: 'root'
})
export class CarDataService {
  selectedCarModel:CarModel;
  carModelresp:CarModel[]
  carConfigResp:CarConfig;
  selectedCarConfig:CarConfig;
  constructor() { }

  getSelectedCarModel(){
    return this.selectedCarModel
  }

  setSelectedCarModel(value:CarModel){
    this.selectedCarModel =  value;
  }

  getCarModelResp(){
    return this.carModelresp;

  }

  setCarModelResp(value:CarModel[]){
    this.carModelresp = value;
  }

  getCarConfigResp(){
    return this.carConfigResp;

  }

  setCarConfigResp(value:CarConfig){
    this.carConfigResp = value;
  }

  getSelectedCarConfig(){
    return this.selectedCarConfig
  }

  setSelectedCarConfig(value:CarConfig){
    this.selectedCarConfig =  value;
 }

 resetCarConfig() {
  this.selectedCarConfig = new CarConfig();
}

}
