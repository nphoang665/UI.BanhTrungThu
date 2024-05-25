import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';import {MatTableModule} from '@angular/material/table';
import { AdminComponent } from './ADMIN/admin/admin.component';
import { MainNavbarComponent } from './ADMIN/Main/main-navbar/main-navbar.component';
import { MainSidebarComponent } from './ADMIN/Main/main-sidebar/main-sidebar.component';
import { LoaiSanPhamComponent } from './ADMIN/QuanLy/loai-san-pham/loai-san-pham.component';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HomeComponent } from './USER/home/home.component';
import { ThemLoaiSanPhamComponent } from './ADMIN/QuanLy/loai-san-pham/them-loai-san-pham/them-loai-san-pham.component';
import { SuaLoaiSanPhamComponent } from './ADMIN/QuanLy/loai-san-pham/sua-loai-san-pham/sua-loai-san-pham.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { SanPhamComponent } from './ADMIN/QuanLy/san-pham/san-pham.component';
import { ThemSanPhamComponent } from './ADMIN/QuanLy/san-pham/them-san-pham/them-san-pham.component';
import { SuaSanPhamComponent } from './ADMIN/QuanLy/san-pham/sua-san-pham/sua-san-pham.component';
import { SanPhamHomeComponent } from './USER/san-pham-home/san-pham-home.component';
import { HeaderComponent } from './USER/Header/header/header.component';
import { FooterComponent } from './USER/Header/footer/footer.component';
import { BanhTrungThuComponent } from './USER/banh-trung-thu/banh-trung-thu.component';
import { ChiTietBanhTrungThuComponent } from './USER/chi-tiet-banh-trung-thu/chi-tiet-banh-trung-thu.component';
import { TongQuanComponent } from './ADMIN/QuanLy/tong-quan/tong-quan.component';
import { KhachHangComponent } from './ADMIN/QuanLy/khach-hang/khach-hang.component';
import { SanPhamBanhTrungThuComponent } from './USER/san-pham-banh-trung-thu/san-pham-banh-trung-thu.component';
import { GioHangComponent } from './USER/gio-hang/gio-hang.component';
import { ThemKhachHangComponent } from './ADMIN/QuanLy/khach-hang/them-khach-hang/them-khach-hang.component';
import { SuaKhachHangComponent } from './ADMIN/QuanLy/khach-hang/sua-khach-hang/sua-khach-hang.component';
import { ThanhToanComponent } from './USER/ThanhToan/thanh-toan/thanh-toan.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    MainNavbarComponent,
    MainSidebarComponent,
    LoaiSanPhamComponent,
    HomeComponent,
    ThemLoaiSanPhamComponent,
    SuaLoaiSanPhamComponent,
    SanPhamComponent,
    ThemSanPhamComponent,
    SuaSanPhamComponent,
    SanPhamHomeComponent,
    HeaderComponent,
    FooterComponent,
    BanhTrungThuComponent,
    ChiTietBanhTrungThuComponent,
    TongQuanComponent,
    KhachHangComponent,
    SanPhamBanhTrungThuComponent,
    GioHangComponent,
    ThemKhachHangComponent,
    SuaKhachHangComponent,
    ThanhToanComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterOutlet,
    RouterLink,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
