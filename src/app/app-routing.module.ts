import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './ADMIN/admin/admin.component';
import { LoaiSanPhamComponent } from './ADMIN/QuanLy/loai-san-pham/loai-san-pham.component';
import { HomeComponent } from './USER/home/home.component';
import { SanPhamComponent } from './ADMIN/QuanLy/san-pham/san-pham.component';
import { BanhTrungThuComponent } from './USER/banh-trung-thu/banh-trung-thu.component';
import { ChiTietBanhTrungThuComponent } from './USER/chi-tiet-banh-trung-thu/chi-tiet-banh-trung-thu.component';

const routes: Routes = [
  { path: '', redirectTo: '/admin/LoaiSanPham', pathMatch: 'full' },
  { 
    path: 'admin',
    component: AdminComponent,
    children: [
        { path: 'LoaiSanPham', component: LoaiSanPhamComponent },
        { path: 'SanPham', component: SanPhamComponent },
    ]
},
  {path:'home',component:HomeComponent},
  {path:'banh-trung-thu',component:BanhTrungThuComponent},
  {path:'chi-tiet-banh-trung-thu/:id',component:ChiTietBanhTrungThuComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
