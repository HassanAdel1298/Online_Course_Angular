import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './Home/home/home.component';
import { ErrorComponent } from './error/error.component';

import { AllCoursesComponent } from './Instructor/all-courses/all-courses.component';

import { CourseselectedComponent } from './Student/courseselected/courseselected/courseselected.component';
//import { ExamPageComponent } from './Student/showExam/exam-page/exam-page.component';
import { choosegradeComponent } from './Student/grades/ChooseGrade/ChooseGrade.component';
import { ChooseinstructorComponent } from './Student/grades/ChooseGroup/ChooseGroup.component';
import { ProfileComponent } from './Instructor/Profile/profile/profile.component';
import { InstgroupsComponent } from './Instructor/instgroups/instgroups.component';
import { CreateexamComponent } from './Instructor/create/createExam/createexam/createexam.component';
import { AddGroupComponent } from './Instructor/create/creategroup/add-group/add-group.component';
import { DashBoardGradeOneComponent } from './Instructor/create/creategroup/dash-board-grade/dash-board-grade.component';
//import { DashBoardGradeTwoComponent } from './Instructor/creategroup/dash-board-grade-two/dash-board-grade-two.component';
//import { DashBoardGradeThreeComponent } from './Instructor/creategroup/dash-board-grade-three/dash-board-grade-three.component';
import { GradeComponent } from './Student/grades/grade/grade.component';
import { ExamPageComponent } from './Student/showExam/std-exam/exam-page/exam-page.component';
import { StdExamComponent } from './Student/showExam/std-exam/std-exam/std-exam.component';
import { SesstionAndVidosComponent } from './Student/courseselected/sesstion-and-vidos/sesstion-and-vidos.component';
import { InstructordashboardComponent } from './Instructor/instructorfinalDashboard/instructordashboard/instructordashboard.component';
import { TermsAndAdvicesComponent } from './Instructor/Profile/Terms and Advices/terms-and-advices/terms-and-advices.component';
import { InstructorDataComponent } from './Instructor/Profile/instructor-data/instructor-data.component';
import { InstructordatatwoComponent } from './Instructor/Profile/instructor-data/instructordatatwo/instructordatatwo.component';
import { InstructorDateHeaderComponent } from './Instructor/Profile/instructor-data/instructor-date-header/instructor-date-header.component';
import { SendComponent } from './Student/showExam/std-exam/send/send.component';
import { PaymentComponent } from './payment/payment.component';
import { CoursesComponent } from './Student/courseselected/courses/courses.component';
import { MainComponent } from './Student/courseselected/main/main.component';
import { NgModule } from '@angular/core';
import { MainUComponent } from './Student/courseselected/main-u/main-u.component';

import { CreatesessionComponent } from './Instructor/create/createsession/createsession.component';

import { MygroupsComponent } from './mygroups/mygroups.component';
import { ShowsessionsComponent } from './showsessions/showsessions.component';
import { UpdateGroupComponent } from './Instructor/Update/update-sesstion/update-sesstion.component';
import { AboutComponent } from './about/about.component';
import { studentGuard } from './student.guard';
import { instructorGuard } from './instructor.guard';
//import { StdExamComponent } from './Student/showExam/std-exam/std-exam.component';

export const routes: Routes = [
    {path:"",redirectTo:"Home",pathMatch:"full"},
    {path:"Home",component:HomeComponent},
    {path:"Login",component:LoginComponent},
    {path:"Register",component:RegisterComponent},
    {path:"About",component:AboutComponent},


    {path:"grade/:id",component:GradeComponent,canActivate:[studentGuard]},//canActivate:[studentGuard]

    {path:"choocegrade",component:choosegradeComponent,canActivate:[studentGuard]},//canActivate:[studentGuard]
    {path:"chooseinstructor/:id",component:ChooseinstructorComponent,canActivate:[studentGuard]},//canActivate:[studentGuard]
    {path:"courseselected/:id",component:CourseselectedComponent,canActivate:[studentGuard]},
    {path:"courses", component:CoursesComponent,canActivate:[studentGuard]},
    {path:"main", component:MainComponent,canActivate:[studentGuard]},
    {path:"Exam/:id",component:ExamPageComponent,canActivate:[studentGuard]},

    {path:"StdExam/:id",component:StdExamComponent,canActivate:[studentGuard]},//canActivate:[studentGuard]
    {path:"SesstionAndVidos/:id",component:SesstionAndVidosComponent,canActivate:[studentGuard]},//canActivate:[studentGuard]
    {path:"Send/:id",component:SendComponent,canActivate:[studentGuard]},//canActivate:[studentGuard]


    {path:"Instructordashboard",component : InstructordashboardComponent,canActivate:[instructorGuard]},//canActivate:[instructorGuard]
    {path:"profile",component:ProfileComponent,canActivate:[instructorGuard]},//canActivate:[instructorGuard]
    {path:"stepscreate",component:InstructorDateHeaderComponent,canActivate:[instructorGuard]},//canActivate:[instructorGuard]
    {path:"step1",component:InstructorDataComponent,canActivate:[instructorGuard]},//canActivate:[instructorGuard]
    {path:"step2",component:InstructordatatwoComponent,canActivate:[instructorGuard]},//canActivate:[instructorGuard]
    {path:"step3",component:TermsAndAdvicesComponent,canActivate:[instructorGuard]},//canActivate:[instructorGuard]
    {path:"MYGroup",component:InstgroupsComponent,canActivate:[instructorGuard]},//canActivate:[instructorGuard]
    {path:"createExam/:id",component:CreateexamComponent,canActivate:[instructorGuard]},//canActivate:[instructorGuard]
    {path:"createGroup",component:AddGroupComponent,canActivate:[instructorGuard]},//canActivate:[instructorGuard]
    {path:"Createsession/:id",component:CreatesessionComponent,canActivate:[instructorGuard]},//canActivate:[instructorGuard]
    {path:"First",component:DashBoardGradeOneComponent,canActivate:[instructorGuard]},//canActivate:[instructorGuard]
    {path:"Payment/:id",component:PaymentComponent,canActivate:[studentGuard]},//canActivate:[studentGuard]
    {path:"Instructordashboard",component : InstructordashboardComponent,canActivate:[instructorGuard]},
    {path:"profile",component:ProfileComponent,canActivate:[instructorGuard]},
    {path:"stepscreate",component:InstructorDateHeaderComponent,canActivate:[instructorGuard]},
    {path:"step1",component:InstructorDataComponent,canActivate:[instructorGuard]},
    {path:"step2",component:InstructordatatwoComponent,canActivate:[instructorGuard]},
    {path:"step3",component:TermsAndAdvicesComponent,canActivate:[instructorGuard]},
    {path:"MYGroup",component:InstgroupsComponent,canActivate:[studentGuard]},
    {path:"mygroups",component:MygroupsComponent,canActivate:[studentGuard]},

    {path:"createExam",component:CreateexamComponent ,canActivate:[instructorGuard]},
    {path:"createGroup",component:AddGroupComponent ,canActivate:[instructorGuard]},
    {path:"First",component:DashBoardGradeOneComponent,canActivate:[instructorGuard]},

    {path:"Showsessions/:id",component:ShowsessionsComponent,canActivate:[studentGuard]},
    {path:"UpdateSesstion/:id",component:UpdateGroupComponent,canActivate:[instructorGuard]},
    
   

    {path:"**",component:ErrorComponent}

];

    // {path:"**",component:ErrorComponent}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
