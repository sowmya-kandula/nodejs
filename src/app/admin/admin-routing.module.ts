import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from '../add-product/add-product.component';
import { ViewProductsComponent } from '../view-products/view-products.component';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  
  { path: '', component: AdminComponent,children:[
    {path:"add-product",component:AddProductComponent},
    {path:"view-products",component:ViewProductsComponent}
    
  ] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
