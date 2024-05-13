import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';import {MatTableModule} from '@angular/material/table';
import { AdminComponent } from './ADMIN/admin/admin.component';
import { MainNavbarComponent } from './ADMIN/Main/main-navbar/main-navbar.component';
import { MainSidebarComponent } from './ADMIN/Main/main-sidebar/main-sidebar.component';
import { LoaiSanPhamComponent } from './ADMIN/QuanLy/loai-san-pham/loai-san-pham.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HomeComponent } from './USER/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    MainNavbarComponent,
    MainSidebarComponent,
    LoaiSanPhamComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterOutlet,
    RouterLink,
    HttpClientModule,
    MaterialModule,
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
