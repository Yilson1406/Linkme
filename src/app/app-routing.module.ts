import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'User',loadChildren:()=>import("./content/user/user.module").then(m=>m.UserModule)},
  {path:'**',redirectTo:'User'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
