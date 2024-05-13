import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './ADMIN/admin/admin.component';
import { LoaiSanPhamComponent } from './ADMIN/QuanLy/loai-san-pham/loai-san-pham.component';
import { HomeComponent } from './USER/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/admin/LoaiSanPham', pathMatch: 'full' },
  { 
    path: 'admin',
    component: AdminComponent,
    children: [
        { path: 'LoaiSanPham', component: LoaiSanPhamComponent },
    ]
},
  {path:'home',component:HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
