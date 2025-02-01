import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { LoginComponent } from './login/login.component';
import { QuestionsComponent } from './questions/questions.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AnswerComponent } from './answer/answer.component';
import { UserloginComponent } from './userlogin/userlogin.component';
import { FormsModule } from '@angular/forms';
import { ModifquestComponent } from './modifquest/modifquest.component';
import { AddquestComponent } from './addquest/addquest.component';
import { ResultComponent } from './result/result.component';
import { ParticipatorComponent } from './participator/participator.component';
import { QuestdetComponent } from './questdet/questdet.component';
import { DashComponent } from './dash/dash.component';
import { HighchartsChartModule } from 'highcharts-angular';
@NgModule({
  declarations: [
    AppComponent,
    AdminpageComponent,
    LoginComponent,
    QuestionsComponent,
    ForbiddenComponent,
    AnswerComponent,
    UserloginComponent,
    ModifquestComponent,
    AddquestComponent,
    ResultComponent,
    ParticipatorComponent,
    QuestdetComponent,
    DashComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxPaginationModule,
    HighchartsChartModule
    
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
