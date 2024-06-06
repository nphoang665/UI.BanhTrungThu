import { Component, OnInit } from '@angular/core';
import { DonHangService } from '../../ADMIN/services/DonHang/don-hang.service';

@Component({
  selector: 'app-lich-su-dat-hang',
  templateUrl: './lich-su-dat-hang.component.html',
  styleUrl: './lich-su-dat-hang.component.css'
})
export class LichSuDatHangComponent implements OnInit{
  hangDaMua: any[] = [];

  constructor(private donHangService: DonHangService) { }

  ngOnInit(): void {
    const nguoiDungString = localStorage.getItem('NguoiDung');
    if (nguoiDungString) {
      const nguoiDung = JSON.parse(nguoiDungString); // Chuyển chuỗi JSON thành đối tượng JavaScript
      const maKhachHang = nguoiDung.maKhachHang;
  
      this.donHangService.getLichSuMuaHang(maKhachHang).subscribe(
        data => {
          this.hangDaMua = data;
          console.log('Lịch sử mua hàng:', this.hangDaMua); // Đảm bảo dữ liệu được nhận
        },
        error => {
          console.error('Lỗi khi lấy lịch sử mua hàng:', error);
        }
      );
    }
  }
}