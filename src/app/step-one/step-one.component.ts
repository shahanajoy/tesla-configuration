import { Component, OnDestroy } from '@angular/core';
import { CarService } from '../services/car.service';
import { CarModel, Colors } from '../models/car-model.model';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CarDataService } from '../shared/services/car-data.service';
import { ComponentActionEnum } from '../shared/enums/component-action.enum';
import { MessageService } from '../shared/services/message.service';

@Component({
  selector: 'app-step-one',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './step-one.component.html',
  styleUrl: './step-one.component.scss'
})
export class StepOneComponent implements  OnDestroy{
  modelDto$: CarModel[];
  private subscription: Subscription;
  colorArray:Colors[];
  showColor:boolean=false;
  carModelColor = new CarModel();
  isBack:boolean = false;
  constructor(private _carData:CarDataService,
    private _car:CarService,private messageService: MessageService){
      if(this._carData.getSelectedCarModel()) {
        this.modelDto$ = this._carData.getCarModelResp();          
        this.carModelColor = this._carData.getSelectedCarModel(); 
        const colorArr = this.modelDto$.filter((item) => item.code == this.carModelColor.code);      
        this.colorArray = colorArr[0].colors
        this.showColor =true;
        this.isBack = true;
      } 
    }


  ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit() {  
    if(!this._carData.getSelectedCarModel()) {
      this.getCarModels();
    }
    
  }


  getCarModels() {
   this.subscription= this._car.getCarModels().subscribe(resp =>{
      this.modelDto$=resp;
      this._carData.setCarModelResp(this.modelDto$);
    })
  }


  onfilterColorByCode(_modelArray: CarModel){
    this.showColor = true;
    this.colorArray= _modelArray.colors;
    this.carModelColor.selColors = _modelArray.colors[0];
    this.carModelColor.imageUrl = "assets/images/"+_modelArray.code+"/"+_modelArray.colors[0].code+".jpg";
    this._carData.setSelectedCarModel(this.carModelColor);
    
    if(this.isBack) {
      this._carData.resetCarConfig();
      this.messageService.sendMessage(ComponentActionEnum.DisableNavigation);
    } else {
      this.messageService.sendMessage(ComponentActionEnum.NavigateStepTwo);
    }
  }
  
  onSelectColor(_colorArray:Colors) {
    this.carModelColor.imageUrl = "assets/images/"+this.carModelColor.code+"/"+_colorArray.code+".jpg"; 
    this._carData.setSelectedCarModel(this.carModelColor)
  }

}
