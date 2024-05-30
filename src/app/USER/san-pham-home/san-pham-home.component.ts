import { Component, OnInit } from '@angular/core';
import { SanPhamService } from '../../ADMIN/services/SanPham/san-pham.service';
import { Observable } from 'rxjs';
import { SanPham } from '../../ADMIN/models/san-pham.model';
import { environment } from '../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { XemNhanhSanPhamComponent } from '../xem-nhanh-san-pham/xem-nhanh-san-pham.component';

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
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.sanPhamBanhTrungThu$ = this.sanPhamServices.getAllSanPham();
    this.sanPhamMoi$ = this.sanPhamServices.getSanPhamMoi(); 
    // console.log(this.sanPhamMoi$);
    
    // this.sanPhamNoiBat$ = this.sanPhamServices.getSanPhamNoiBat(); 
  }

  OpenPopup(id: any, title: any): void {
    const _popup = this.dialog.open(XemNhanhSanPhamComponent, {
      width: '80%',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
      data: {
        title: title,
        idSanPham: id 
      },
    });
    _popup.afterClosed().subscribe((item) => {
      // console.log(item);
      this.sanPhamBanhTrungThu$ = this.sanPhamServices.getAllSanPham();
    });
  }
  xemNhanhSP(id:string):void{
    this.OpenPopup(id, 'Xem nhanh sản phẩm');
    // console.log('kaskdaksd:'+id);
    
  }

}
