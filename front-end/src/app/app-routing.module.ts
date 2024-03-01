import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AddTutorialComponent} from "./components/add-tutorial/add-tutorial.component";
import {TutorialsComponent} from "./components/tutorials/tutorials.component";




const routes: Routes = [
  { path: '', redirectTo: '/tutorials', pathMatch: 'full' },
  { path: 'tutorials', component: TutorialsComponent },
  { path: 'add-tutorial', component:AddTutorialComponent  }, // Define route for add tutorial component
  // Add more routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
