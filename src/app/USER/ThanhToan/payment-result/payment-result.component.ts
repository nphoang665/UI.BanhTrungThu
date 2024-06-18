import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DonHangService } from '../../../ADMIN/services/DonHang/don-hang.service';
import { KhachHangService } from '../../../ADMIN/services/KhachHang/khach-hang.service';
import { GioHangService } from '../../../ADMIN/services/GioHang/gio-hang.service';
import { SuaKhachHangDto } from '../../../ADMIN/models/khach-hang.model';

@Component({
  selector: 'app-payment-result',
  template: `
  <div class="payment-result" *ngIf="paymentStatus">
    <div class="message-box" [ngClass]="paymentStatus">
      <h1>{{ paymentStatus === 'success' ? 'Thanh toán thành công!' : 'Thanh toán thất bại' }}</h1>
      <p>{{ paymentMessage }}</p>
      <p>Bạn sẽ được chuyển về trang chủ trong 5 giây...</p>
    </div>
  </div>
  `,
  styleUrls: ['./payment-result.component.css']
})
export class PaymentResultComponent implements OnInit {
  paymentStatus: string | null = null;
  paymentMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private donHangService: DonHangService,
    private khachHangService: KhachHangService,
    private gioHangService: GioHangService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.donHangService.handleVnPayReturn(params).subscribe({
        next: (response) => {
          this.paymentStatus = response.status;
          this.paymentMessage = response.message;
          console.log('zzzzz');
          console.log(response);

          if (response.status === 'success') {
            this.handlePostPaymentSuccess(response.maDonHang);
            this.toastr.success(response.message, 'Thông báo', { timeOut: 3000 });
          } else {
            this.toastr.error(response.message, 'Thông báo', { timeOut: 3000 });
          }

          setTimeout(() => {
            this.router.navigateByUrl('/home');
          }, 5000);
        },
        error: (error) => {
          console.error('Lỗi khi xử lý thanh toán:', error);
          this.paymentStatus = 'error';
          this.paymentMessage = 'Lỗi khi xử lý thanh toán';
          this.toastr.error('Lỗi khi xử lý thanh toán', 'Thông báo', { timeOut: 3000 });
          setTimeout(() => {
            this.router.navigateByUrl('/home');
          }, 5000);
        }
      });
    });
  }

  handlePostPaymentSuccess(maDonHang: string): void {
    console.log(123444);
    console.log(maDonHang);
    
    
    // Send invoice email
    this.donHangService.guiEmailThanhToan(maDonHang).subscribe({
      next: () => {
        this.toastr.success('Đã gửi hóa đơn qua email', 'Thông báo', { timeOut: 3000 });
      },
      error: (error) => {
        console.error('Lỗi khi gửi email thanh toán:', error);
        this.toastr.error('Lỗi khi gửi email thanh toán', 'Thông báo', { timeOut: 3000 });
      }
    });

    // Update customer information
    const userLogin = localStorage.getItem('NguoiDung');
    if (userLogin) {
      const user = JSON.parse(userLogin);
      const updatedUser: SuaKhachHangDto = {
        maKhachHang: user.maKhachHang,
        tenKhachHang: user.tenKhachHang,
        email: user.email,
        soDienThoai: user.soDienThoai,
        diaChi: user.diaChi,
        tinhTrang: user.tinhTrang,
        ngayDangKy: user.ngayDangKy
      };

      this.khachHangService.suaKhachHang(user.maKhachHang, updatedUser).subscribe({
        next: () => {
          const updatedUserWithId = { ...updatedUser, maKhachHang: user.maKhachHang };
          localStorage.setItem('NguoiDung', JSON.stringify(updatedUserWithId));
        },
        error: (error) => {
          console.error('Lỗi khi cập nhật thông tin khách hàng:', error);
          this.toastr.error('Lỗi khi cập nhật thông tin khách hàng', 'Thông báo', { timeOut: 3000 });
        }
      });
    }

    // Clear cart
    this.gioHangService.clearCart();
  }
}
