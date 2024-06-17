import { Component, OnInit } from '@angular/core';
import { DanhGiaService } from '../../ADMIN/services/DanhGia/danh-gia.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../Auth/services/auth.service';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-danh-gia-san-pham',
  templateUrl: './danh-gia-san-pham.component.html',
  styleUrl: './danh-gia-san-pham.component.css'
})
export class DanhGiaSanPhamComponent implements OnInit {
  danhGias: any[] = [];
  noiDung: string = '';
  diemDanhGia: number = 0;
  maSanPham: string = '';
  currentUser: any;
  daMuaHang: boolean = false;
  daDanhGia: boolean = false;

  constructor(private danhGiaService: DanhGiaService,private route: ActivatedRoute, private authService: AuthService,private http:HttpClient,private toastr:ToastrService) { }

  ngOnInit(): void {
    // this.getDanhGia();
    this.route.params.subscribe(params => {
      this.maSanPham = params['id'];
      this.getDanhGia();
    });
    this.currentUser = this.authService.getUser();
    // console.log(123);
    this.checkMuaHang();
    this.checkReviewed();
    // console.log(1111);
    
    
  }

  checkMuaHang(): void {
    if (this.currentUser) {
      this.http.get<boolean>(`${environment.apiBaseUrl}/api/DanhGia/checkMuaHang?maKhachHang=${this.currentUser.maKhachHang}&maSanPham=${this.maSanPham}`)
        .subscribe(hasPurchased => {
          this.daMuaHang = hasPurchased;
          // console.log('dacheckmua');
          
        }, error => {
          console.error('Lỗi khi kiểm tra mua hàng:', error);
        });
    }
  }
  checkReviewed(): void {
    if (this.currentUser) {
      this.http.get<boolean>(`${environment.apiBaseUrl}/api/DanhGia/checkReviewed?maKhachHang=${this.currentUser.maKhachHang}&maSanPham=${this.maSanPham}`)
        .subscribe(hasReviewed => {
          this.daDanhGia = hasReviewed;
          // console.log('dacheckdanhgia');
          
        }, error => {
          console.error('Lỗi khi kiểm tra đã đánh giá:', error);
        });
    }
  }
  
  getDanhGia(): void {
    this.danhGiaService.getDanhGiaBySanPham(this.maSanPham).subscribe(data => {
      this.danhGias = data;
    }, error => {
      console.error('Lỗi khi lấy đánh giá:', error);
    });
  }

  addDanhGia(): void {
    const danhGia = {
      maKhachHang: this.currentUser.maKhachHang, 
      maSanPham: this.maSanPham,
      diemDanhGia: this.diemDanhGia,
      binhLuan: this.noiDung
    };

    this.danhGiaService.addDanhGia(danhGia).subscribe(data => {
      this.danhGias.push(data);
      this.noiDung = '';
      this.diemDanhGia = 0;
      this.daDanhGia = true;
      this.toastr.success('Đánh giá thành công!', 'Thông báo', {
        timeOut: 2000,
      });
    }, error => {
      this.toastr.error('Lỗi khi thêm đánh giá, Vui lòng tải lại trang', 'Thông báo', {
        timeOut: 2000,
      });
      console.error('Lỗi khi thêm đánh giá:', error);
    });
  }
  setRating(rating: number): void {
    this.diemDanhGia = rating;
  }
}