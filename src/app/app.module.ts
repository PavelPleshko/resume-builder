import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import {MainModule} from './main';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SharedModule} from './common/shared.module';
import {DataManagerService} from './common/services/data-manager.service';
import {RouterModule,Routes} from '@angular/router';

import { AppComponent } from './app.component';

const Routes:Routes = [{
	path:'',pathMatch:'full',loadChildren:'./main/main.module#MainModule'
}];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,MainModule,NgbModule.forRoot(),SharedModule,BrowserAnimationsModule,RouterModule.forRoot(Routes)
  ],
  providers: [DataManagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
