import { Component, OnInit } from '@angular/core';
import { SanPhamService } from '../../ADMIN/services/SanPham/san-pham.service';
import { Observable } from 'rxjs';
import { SanPham } from '../../ADMIN/models/san-pham.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-san-pham-home',
  templateUrl: './san-pham-home.component.html',
  styleUrl: './san-pham-home.component.css'
})
export class SanPhamHomeComponent implements OnInit {
  
  sanPhamBanhTrungThu$?:Observable<SanPham[]>
  sanPhamMoi$?: Observable<SanPham[]>; 
  sanPhamNoiBat$?: Observable<SanPham[]>; 
  apiBaseUrl: string = environment.apiBaseUrl;

  constructor(
    private sanPhamServices: SanPhamService,
  ) {
  }

  ngOnInit(): void {
    this.sanPhamBanhTrungThu$ = this.sanPhamServices.getAllSanPham();
    this.sanPhamMoi$ = this.sanPhamServices.getSanPhamMoi(); 
    console.log(this.sanPhamMoi$);
    
    // this.sanPhamNoiBat$ = this.sanPhamServices.getSanPhamNoiBat(); 
  }

}
