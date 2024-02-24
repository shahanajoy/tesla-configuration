import { CommonModule } from '@angular/common';
import {Component} from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavigationService } from './services/navigation.service';
import { MessageService } from './shared/services/message.service';
import { ComponentActionEnum } from './shared/enums/component-action.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
})
export class AppComponent {
  name = 'Angular';
  disableNavigationTwo :boolean=true;
  disableNavigationThree :boolean=true;

  constructor(private navigationService:NavigationService,
    private messageService: MessageService){
    this.messageService.getMessage().subscribe(message => {
      if (message.text == ComponentActionEnum.NavigateStepTwo) {
        this.disableNavigationTwo = false
      } else if(message.text == ComponentActionEnum.NavigateStepThree) {
        this.disableNavigationThree = false
      } else if(message.text == ComponentActionEnum.DisableNavigation) {
        this.disableNavigationThree = true;
      }
    })
  }

  goToSteps(navigateTo:number){

    switch (navigateTo) {
      case 1:
        this.navigationService.tryNavigatation(ComponentActionEnum.NavigateStepOne);
          break;
      case 2:
        if(!this.disableNavigationTwo) {
          this.navigationService.tryNavigatation(ComponentActionEnum.NavigateStepTwo);
        }
          break;
      case 3:
        if(!this.disableNavigationThree) {
          this.navigationService.tryNavigatation(ComponentActionEnum.NavigateStepThree);
        }  
          break;      
      default:
        this.navigationService.tryNavigatation(ComponentActionEnum.NavigateStepOne);
          break;
  }
    
     
  }
}
