import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';import {MatTableModule} from '@angular/material/table';
import { AdminComponent } from './ADMIN/admin/admin.component';
import { MainNavbarComponent } from './ADMIN/Main/main-navbar/main-navbar.component';
import { MainSidebarComponent } from './ADMIN/Main/main-sidebar/main-sidebar.component';
import { LoaiSanPhamComponent } from './ADMIN/QuanLy/loai-san-pham/loai-san-pham.component';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
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
import { XemNhanhSanPhamComponent } from './USER/xem-nhanh-san-pham/xem-nhanh-san-pham.component';
import { LoginComponent } from './Auth/login/login.component';
import { RegisterComponent } from './Auth/register/register.component';
import { GoogleLoginProvider, GoogleSigninButtonModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { AuthInterceptor } from './Auth/interceptors/auth.interceptor';
import { QuenMatKhauComponent } from './Auth/QuenMatKhau/quen-mat-khau/quen-mat-khau.component';
import { PaymentResultComponent } from './USER/ThanhToan/payment-result/payment-result.component';
import { ThongTinCaNhanComponent } from './USER/thong-tin-ca-nhan/thong-tin-ca-nhan.component';
import { LichSuDatHangComponent } from './USER/lich-su-dat-hang/lich-su-dat-hang.component';
import { HoaDonComponent } from './ADMIN/QuanLy/hoa-don/hoa-don.component';
import { XemHoaDonComponent } from './ADMIN/QuanLy/hoa-don/xem-hoa-don/xem-hoa-don.component';
import { TiepNhanDonHangComponent } from './ADMIN/QuanLy/tiep-nhan-don-hang/tiep-nhan-don-hang.component';
import { SuaTiepNhanDonHangComponent } from './ADMIN/QuanLy/tiep-nhan-don-hang/sua-tiep-nhan-don-hang/sua-tiep-nhan-don-hang.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { HighchartsChartModule } from 'highcharts-angular';

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
    ThanhToanComponent,
    XemNhanhSanPhamComponent,
    LoginComponent,
    RegisterComponent,
    QuenMatKhauComponent,
    PaymentResultComponent,
    ThongTinCaNhanComponent,
    LichSuDatHangComponent,
    XemHoaDonComponent,
    HoaDonComponent,
    TiepNhanDonHangComponent,
    SuaTiepNhanDonHangComponent
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
    GoogleSigninButtonModule,
    ToastrModule.forRoot(),
    NgxPaginationModule,
    HighchartsChartModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideClientHydration(),
    provideAnimationsAsync(),
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '101863175272-n460ifjdvtb6gevl0sa64md26bt0r22v.apps.googleusercontent.com', {
              oneTapEnabled: false,
              prompt: 'consent'
            }
            )
          },
          // {
          //   id: FacebookLoginProvider.PROVIDER_ID,
          //   provider: new FacebookLoginProvider('clientId')
          // }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
