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
import { ThanhToanComponent } from './USER/ThanhToan/thanh-toan/thanh-toan.component';
import { XemNhanhSanPhamComponent } from './USER/xem-nhanh-san-pham/xem-nhanh-san-pham.component';
import { LoginComponent } from './Auth/login/login.component';
import { RegisterComponent } from './Auth/register/register.component';
import { QuenMatKhauComponent } from './Auth/QuenMatKhau/quen-mat-khau/quen-mat-khau.component';
import { PaymentResultComponent } from './USER/ThanhToan/payment-result/payment-result.component';
import { ThongTinCaNhanComponent } from './USER/thong-tin-ca-nhan/thong-tin-ca-nhan.component';
import { LichSuDatHangComponent } from './USER/lich-su-dat-hang/lich-su-dat-hang.component';
import { adminGuard, guestOrCustomerGuard } from './Auth/Guard/auth.guard';
import { HoaDonComponent } from './ADMIN/QuanLy/hoa-don/hoa-don.component';
import { TiepNhanDonHangComponent } from './ADMIN/QuanLy/tiep-nhan-don-hang/tiep-nhan-don-hang.component';
import { SuaTiepNhanDonHangComponent } from './ADMIN/QuanLy/tiep-nhan-don-hang/sua-tiep-nhan-don-hang/sua-tiep-nhan-don-hang.component';
import { DemoComponent } from './USER/demo/demo.component';
import { DanhGiaSanPhamComponent } from './USER/danh-gia-san-pham/danh-gia-san-pham.component';
import { XemHoaDonComponent } from './ADMIN/QuanLy/hoa-don/xem-hoa-don/xem-hoa-don.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { 
    path: 'admin',
    component: AdminComponent, canActivate: [adminGuard],
    children: [
        { path: 'LoaiSanPham', component: LoaiSanPhamComponent },
        { path: 'SanPham', component: SanPhamComponent },
        { path: 'TongQuan', component: TongQuanComponent },
        { path: 'KhachHang', component: KhachHangComponent },
        { path: 'hoa-don', component: HoaDonComponent },
        { path: 'tiep-nhan-don-hang', component: TiepNhanDonHangComponent },
        { path: 'sua-tiep-nhan-don-hang/:id', component: SuaTiepNhanDonHangComponent },
    ]
},
  {path:'home',component:HomeComponent},
  {path:'banh-trung-thu',component:BanhTrungThuComponent},
  {path:'chi-tiet-banh-trung-thu/:id',component:ChiTietBanhTrungThuComponent},
  // {path:'san-pham-banh-trung-thu',component:SanPhamBanhTrungThuComponent},
  {path:'gio-hang',component:GioHangComponent, canActivate:[guestOrCustomerGuard]},
  {path:'thanh-toan',component:ThanhToanComponent, canActivate:[guestOrCustomerGuard]},
  { path: 'san-pham/:idLoaiSanPham', component: SanPhamBanhTrungThuComponent },
  { path: 'a', component: XemNhanhSanPhamComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgotpassword', component: QuenMatKhauComponent },
  { path: 'payment-result', component: PaymentResultComponent },
  { path: 'thong-tin', component: ThongTinCaNhanComponent, canActivate:[guestOrCustomerGuard] },
  { path: 'lich-su', component: LichSuDatHangComponent, canActivate:[guestOrCustomerGuard] },
  { path: 'xem-hoa-don', component: XemHoaDonComponent },
  { path: 'demo', component: DemoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
