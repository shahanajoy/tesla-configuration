import { Component } from '@angular/core';
import { CarDataService } from '../shared/services/car-data.service';
import { CarModel } from '../models/car-model.model';
import { CarConfig } from '../models/car-config.model';
import { ComponentActionEnum } from '../shared/enums/component-action.enum';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step-three',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './step-three.component.html',
  styleUrl: './step-three.component.scss'
})
export class StepThreeComponent {

  selectedCarModel:CarModel;
  selectedCarConfig:CarConfig;
  totalCost:number;

  constructor(private _carData:CarDataService,) {
    this.selectedCarModel = this._carData.getSelectedCarModel();
    this.selectedCarConfig = this._carData.getSelectedCarConfig();
    this.getTotalCost()

  }

  getTotalCost(){
    let standYokeTowCost =Number(ComponentActionEnum.yokeTowCost)
    let yokeTowCost = (this.selectedCarConfig.yoke && this.selectedCarConfig.towHitch ) ? 2 * standYokeTowCost :
                      (this.selectedCarConfig.yoke || this.selectedCarConfig.towHitch)  ? standYokeTowCost : 0;
                      
    this.totalCost = this.selectedCarConfig.selConfig.price+ 
                      this.selectedCarModel.selColors.price + yokeTowCost;

  }

}
