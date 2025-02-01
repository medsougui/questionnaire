import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AnswerComponent } from './answer/answer.component';
import { QuestionsComponent } from './questions/questions.component';
import { UserloginComponent } from './userlogin/userlogin.component';
import { AddquestComponent } from './addquest/addquest.component';
import { ResultComponent } from './result/result.component';
import { ParticipatorComponent } from './participator/participator.component';
import { QuestdetComponent } from './questdet/questdet.component';
import { DashComponent } from './dash/dash.component';
import { GuardService } from './guard/guard.service';
const routes: Routes = [
  {path:"det/:id",component:QuestdetComponent,canActivate:[GuardService]},
  {path:"dash",component:DashComponent,canActivate:[GuardService]},
  {path:"part",component:ParticipatorComponent,canActivate:[GuardService]},
  {path:"add",component:AddquestComponent,canActivate:[GuardService]},
  {path:"result",component:ResultComponent},
  {path:"login",component:LoginComponent},
  {path:"admin",component:AdminpageComponent,canActivate:[GuardService]},
  {path:"forbidden",component:ForbiddenComponent},
  {path:'', pathMatch: 'full', redirectTo: 'userlog'},
  {path:"answer",component:AnswerComponent},
  {path:"quest",component:QuestionsComponent,canActivate:[GuardService]},
  {path:"userlog",component:UserloginComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
