import { Component, OnInit } from '@angular/core';
import { SanPham } from '../../../ADMIN/models/san-pham.model';
import { GioHangService } from '../../../ADMIN/services/GioHang/gio-hang.service';
import { environment } from '../../../../environments/environment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DonHangService } from '../../../ADMIN/services/DonHang/don-hang.service';
import { ThemDonHang } from '../../../ADMIN/models/don-hang.model';
import { ThemChiTietDonhang } from '../../../ADMIN/models/chi-tiet-don-hang.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thanh-toan',
  templateUrl: './thanh-toan.component.html',
  styleUrl: './thanh-toan.component.css'
})
export class ThanhToanComponent implements OnInit {
  myForm: FormGroup;
  cartItems: { sanPham: SanPham, quantity: number, maKhachHang: string }[] = [];
  apiBaseUrl: string = environment.apiBaseUrl;

  constructor(private gioHangService: GioHangService, private donHangService: DonHangService,private toastr: ToastrService,private router:Router) {
    this.myForm = new FormGroup({
      tenKhachHang: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      soDienThoai: new FormControl('', Validators.required),
      diaChi: new FormControl('', Validators.required),
      thongTinThanhToan: new FormControl('COD', Validators.required)
    });
  }

  ngOnInit(): void {
    this.cartItems = this.gioHangService.getCartItems();

    const userLogin = localStorage.getItem('NguoiDung');
    if (userLogin) {
    const user = JSON.parse(userLogin);
    this.myForm.patchValue({
      tenKhachHang: user.tenKhachHang,
      email: user.email,
      soDienThoai: user.soDienThoai,
      diaChi: user.diaChi
    });
  }
  }

  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + ((item.sanPham?.gia ?? 0) * item.quantity), 0);
  }

  thanhToan(): void {
    if (this.myForm.valid) {
      const userLogin = localStorage.getItem('NguoiDung');
      if (!userLogin) {
        alert('Vui lòng đăng nhập');
        return;
      }

      const user = JSON.parse(userLogin);
      const orderData: ThemDonHang = {
        maKhachHang: user.maKhachHang,
        thoiGianDatHang: new Date(),
        tongTien: this.getTotal().toString(),
        diaChiGiaoHang: this.myForm.value.diaChi,
        thongTinThanhToan: this.myForm.value.thongTinThanhToan,
        tinhTrang: 'Chưa xử lý',
      };

      this.donHangService.themDonHang(orderData).subscribe({
        next: (response) => {
          const maDonHang = response.maDonHang;
          const chiTietDonHang: ThemChiTietDonhang[] = this.cartItems.map(item => ({
            maDonHang,
            maSanPham: item.sanPham.maSanPham,
            soLuong: item.quantity,
            gia: item.sanPham.gia
          }));

          chiTietDonHang.forEach(chiTiet => {
            this.donHangService.themChiTietDonHang(chiTiet).subscribe({
              next: () => {
                // Xử lý thành công chi tiết đơn hàng
              },
              error: (error) => {
                console.error('Lỗi khi thêm chi tiết đơn hàng:', error);
              }
            });
          });

          if (this.myForm.value.thongTinThanhToan === 'Bank') {
            this.donHangService.getVnPayPaymentUrl(maDonHang, orderData.tongTien).subscribe({
              next: (data) => {
                window.location.href = data.paymentUrl;
              },
              error: (error) => {
                console.error('Lỗi khi lấy URL thanh toán VNPay:', error);
                this.toastr.error('Lỗi khi lấy URL thanh toán VNPay', 'Thông báo', { timeOut: 1000 });
              }
            });
          } else {
            // Hiển thị thông báo thành công
            this.donHangService.guiEmailThanhToan(maDonHang).subscribe((response)=>{
              this.toastr.success('Đặt hàng thành công', 'Thông báo', { timeOut: 1000 });
              this.toastr.success('Vui lòng kiểm tra email để xem chi tiết', 'Thông báo', { timeOut: 2000 });             
            });
            
            // Xóa giỏ hàng
            this.gioHangService.clearCart();
            // Chuyển hướng người dùng về trang home
            this.router.navigateByUrl('/home');
          }
        },
        error: (error) => {
          console.error('Lỗi khi đặt hàng:', error);
        }
      });
    } else {
      // Hiển thị thông báo lỗi nếu form không hợp lệ
      this.toastr.error('Vui lòng điền đầy đủ thông tin giao hàng', 'Thông báo', { timeOut: 1000 });
    }
  }
}