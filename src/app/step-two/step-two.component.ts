import { Component, OnDestroy } from '@angular/core';
import { CarDataService } from '../shared/services/car-data.service';
import { CarModel } from '../models/car-model.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { CarService } from '../services/car.service';
import { MessageService } from '../shared/services/message.service';
import { CarConfig, Configs } from '../models/car-config.model';
import { ComponentActionEnum } from '../shared/enums/component-action.enum';

@Component({
  selector: 'app-step-two',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './step-two.component.html',
  styleUrl: './step-two.component.scss'
})
export class StepTwoComponent implements  OnDestroy{  
  private subscription: Subscription;
  carConfigDto$: CarConfig;
  configDto$:Configs[];
  selectedCarModel:CarModel;
  isTowHitch:boolean = false;
  isYoke:boolean = false;
  carConfigSelected:CarConfig = new CarConfig();
  showRangePriceTag:boolean = false;
  constructor(private _carData:CarDataService,private _car:CarService,private messageService: MessageService) {
    this.selectedCarModel = this._carData.getSelectedCarModel();
    if(this._carData.getSelectedCarConfig()) {
      const carConfigResp =this._carData.getCarConfigResp()
      this.formCarConfiguration(carConfigResp);
      const selectedCarConfig = this._carData.getSelectedCarConfig();
      this.carConfigSelected =selectedCarConfig;
    } 
  }

  ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit() {    
    if(!this._carData.getSelectedCarConfig()) {     
      this.getCarModels();
    }
  }

  getCarModels() {
      let modelVal=this.selectedCarModel?.code
      this.subscription = this._car.getCarConfigurations(modelVal).subscribe(res => {
       this._carData.setCarConfigResp(res);
       this.formCarConfiguration(res)
     })
   }

   formCarConfiguration(response:CarConfig) {
       this.carConfigDto$=response;
       this.configDto$ = this.carConfigDto$.configs;
       this.isTowHitch = this.carConfigDto$.towHitch;
       this.isYoke = this.carConfigDto$.yoke;
   }

  onConfigChange(selConfig:Configs){
    this.showRangePriceTag = true;
    this._carData.setSelectedCarConfig(this.carConfigSelected);
    this.messageService.sendMessage(ComponentActionEnum.NavigateStepThree);
    
  }
  
}
