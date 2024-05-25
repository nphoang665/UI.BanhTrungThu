import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './ADMIN/admin/admin.component';
import { LoaiSanPhamComponent } from './ADMIN/QuanLy/loai-san-pham/loai-san-pham.component';
import { HomeComponent } from './USER/home/home.component';
import { SanPhamComponent } from './ADMIN/QuanLy/san-pham/san-pham.component';
import { BanhTrungThuComponent } from './USER/banh-trung-thu/banh-trung-thu.component';
import { ChiTietBanhTrungThuComponent } from './USER/chi-tiet-banh-trung-thu/chi-tiet-banh-trung-thu.component';
import { TongQuanComponent } from './ADMIN/QuanLy/tong-quan/tong-quan.component';
import { KhachHangComponent } from './ADMIN/QuanLy/khach-hang/khach-hang.component';
import { SanPhamBanhTrungThuComponent } from './USER/san-pham-banh-trung-thu/san-pham-banh-trung-thu.component';
import { GioHangComponent } from './USER/gio-hang/gio-hang.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { 
    path: 'admin',
    component: AdminComponent,
    children: [
        { path: 'LoaiSanPham', component: LoaiSanPhamComponent },
        { path: 'SanPham', component: SanPhamComponent },
        { path: 'TongQuan', component: TongQuanComponent },
        { path: 'KhachHang', component: KhachHangComponent },
    ]
},
  {path:'home',component:HomeComponent},
  {path:'banh-trung-thu',component:BanhTrungThuComponent},
  {path:'chi-tiet-banh-trung-thu/:id',component:ChiTietBanhTrungThuComponent},
  // {path:'san-pham-banh-trung-thu',component:SanPhamBanhTrungThuComponent},
  {path:'gio-hang',component:GioHangComponent},
  { path: 'san-pham/:idLoaiSanPham', component: SanPhamBanhTrungThuComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
