import { Component, OnInit } from '@angular/core';
import { DonHangService } from '../../ADMIN/services/DonHang/don-hang.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { XemHoaDonComponent } from '../../ADMIN/QuanLy/hoa-don/xem-hoa-don/xem-hoa-don.component';
import { DonHang } from '../../ADMIN/models/don-hang.model';
const icon_eye = `
<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--noto" preserveAspectRatio="xMidYMid meet" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M64.32 103.32c-34.03 0-53.56-33.13-56.94-39.38c3.07-6.27 20.91-39.26 56.94-39.26s53.87 32.98 56.94 39.26c-3.38 6.25-22.92 39.38-56.94 39.38z" fill="#fafafa"> </path> <path d="M64.32 27.12c15.81 0 29.84 6.42 41.7 19.09c6.63 7.08 10.73 14.26 12.49 17.67c-4.51 7.99-23.05 36.99-54.19 36.99c-14.88 0-28.63-6.45-40.89-19.17c-6.89-7.15-11.37-14.41-13.3-17.82c1.75-3.41 5.86-10.6 12.49-17.67c11.86-12.67 25.89-19.09 41.7-19.09m0-4.88C22.56 22.24 4.66 64 4.66 64s20.25 41.76 59.66 41.76S123.97 64 123.97 64s-17.9-41.76-59.65-41.76z" fill="#b0bec5"> </path> <path d="M64.32 37c26.97 0 45.47 16.51 53.66 27.71c.96 1.31 1.99-4.99 1.12-6.36c-7.84-12.26-25.41-32.91-54.77-32.91S17.38 46.1 9.54 58.36c-.88 1.37.3 6.83 1.41 5.64c8.54-9.17 26.39-27 53.37-27z" fill="#b0bec5"> </path> <circle cx="64.32" cy="60.79" r="33.15" fill="#9c7a63"> </circle> <path d="M64.32 37c10.87 0 20.36 2.68 28.36 6.62c-5.81-9.58-16.34-15.97-28.36-15.97c-12.28 0-23 6.69-28.72 16.61C43.61 40.04 53.18 37 64.32 37z" fill="#806451"> </path> <circle cx="64.32" cy="60.79" r="15.43" fill="#212121"> </circle> <circle cx="88.86" cy="59.37" r="7.72" fill="#d9baa5"> </circle> <g> <path d="M7.21 67.21c-.52 0-1.05-.13-1.54-.4a3.207 3.207 0 0 1-1.27-4.35c.85-1.55 21.28-40.21 59.92-40.21s58.47 37.89 59.29 39.41c.84 1.56.27 3.5-1.29 4.35c-1.56.84-3.5.27-4.35-1.29c-.18-.34-18.88-33.86-53.66-33.86c-34.79 0-54.11 34.34-54.3 34.69a3.185 3.185 0 0 1-2.8 1.66z" fill="#616161"> </path> </g> </g></svg>
`;
const icon_close = `
<svg height="200px" width="200px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 507.2 507.2" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle style="fill:#F15249;" cx="253.6" cy="253.6" r="253.6"></circle> <path style="fill:#AD0E0E;" d="M147.2,368L284,504.8c115.2-13.6,206.4-104,220.8-219.2L367.2,148L147.2,368z"></path> <path style="fill:#FFFFFF;" d="M373.6,309.6c11.2,11.2,11.2,30.4,0,41.6l-22.4,22.4c-11.2,11.2-30.4,11.2-41.6,0l-176-176 c-11.2-11.2-11.2-30.4,0-41.6l23.2-23.2c11.2-11.2,30.4-11.2,41.6,0L373.6,309.6z"></path> <path style="fill:#D6D6D6;" d="M280.8,216L216,280.8l93.6,92.8c11.2,11.2,30.4,11.2,41.6,0l23.2-23.2c11.2-11.2,11.2-30.4,0-41.6 L280.8,216z"></path> <path style="fill:#FFFFFF;" d="M309.6,133.6c11.2-11.2,30.4-11.2,41.6,0l23.2,23.2c11.2,11.2,11.2,30.4,0,41.6L197.6,373.6 c-11.2,11.2-30.4,11.2-41.6,0l-22.4-22.4c-11.2-11.2-11.2-30.4,0-41.6L309.6,133.6z"></path> </g></svg>
`;
@Component({
  selector: 'app-lich-su-dat-hang',
  templateUrl: './lich-su-dat-hang.component.html',
  styleUrl: './lich-su-dat-hang.component.css'
})
export class LichSuDatHangComponent implements OnInit{
  hangDaMua: any[] = [];
  donHang:any[]=[];
  page: number = 1;

  constructor(private donHangService: DonHangService, private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer,private dialog: MatDialog,private toastr:ToastrService) {
    this.iconRegistry.addSvgIconLiteral('icon_eye', this.sanitizer.bypassSecurityTrustHtml(icon_eye));
    this.iconRegistry.addSvgIconLiteral('icon_close', this.sanitizer.bypassSecurityTrustHtml(icon_close));
   }

   getStatusClass(tinhTrang: string): string {
    switch (tinhTrang) {
      case 'Đang xử lý':
        return 'text-yellow-500';
      case 'Đang giao hàng':
        return 'text-green-500';
      case 'Đã hoàn thành':
        return 'text-blue-500';
        case 'Đã hủy đơn hàng':
        return 'text-red-500';
        case 'Thanh toán thất bại':
          return 'text-red-500';
          case 'Đã thanh toán':
          return 'text-yellow-500';
          
      default:
        return '';
    }
  }

  ngOnInit(): void {
    const nguoiDungString = localStorage.getItem('NguoiDung');
    if (nguoiDungString) {
      const nguoiDung = JSON.parse(nguoiDungString); // Chuyển chuỗi JSON thành đối tượng JavaScript
      const maKhachHang = nguoiDung.maKhachHang;
  
      this.donHangService.getLichSuMuaHang(maKhachHang).subscribe(
        data => {
          this.hangDaMua = data;
          this.hangDaMua.sort((a, b) => new Date(b.thoiGianDatHang).getTime() - new Date(a.thoiGianDatHang).getTime());
          // console.log('Lịch sử mua hàng:', this.hangDaMua); 
        },
        error => {
          console.error('Lỗi khi lấy lịch sử mua hàng:', error);
        }
      );
    }
    this.getDonHangData();
  }

  OpenPopup(id: any, title: any): void {
    const _popup = this.dialog.open(XemHoaDonComponent, {
      width: '40%',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
      data: {
        title: title,
        maDonHang: id 
      },
    });
    _popup.afterClosed().subscribe((item) => {
      this.getDonHangData();
      
    });
  }
  xemHoaDon(id:string):void{
    this.OpenPopup(id, 'Xem hóa đơn');
    // console.log('kaskdaksd:'+id);
    
  }
  getDonHangData() {
    this.donHangService.getAllDonHang().subscribe(
      (data: DonHang[]) => {
        // this.dataSource.data = data.filter(donHang => donHang.tinhTrang === 'Đã thanh toán');
        this.donHang = data
        // console.log(data);
        
      },
      (error) => {
        console.error('Error fetching don hang data: ', error);
      }
    );
  }
  

  huyDatHang(maDonHang: string): void {
    this.donHangService.getDonHangById(maDonHang).subscribe({
      next: (resultDatHang: any) => {
        // resultDatHang.ghiChu = `Khách hàng ${resultDatHang.idKhachHang} đã hủy đơn hàng`;
        resultDatHang.tinhTrang = 'Đã hủy đơn hàng';
        this.donHangService.suaDonHang(maDonHang,resultDatHang ).subscribe({
          next: (responseSuaTour: any) => {
            this.donHangService.getLichSuMuaHang(resultDatHang.maKhachHang).subscribe(
              data => {
                this.hangDaMua = data;
                this.hangDaMua.sort((a, b) => new Date(b.thoiGianDatHang).getTime() - new Date(a.thoiGianDatHang).getTime());
                console.log('Lịch sử mua hàng:', this.hangDaMua); // Đảm bảo dữ liệu được nhận
              },
              error => {
                console.error('Lỗi khi lấy lịch sử mua hàng:', error);
              }
            );
            this.toastr.success('Hủy đơn hàng thành công', 'Thông báo', {
              timeOut: 1000,
            });
          },
          error: () => {
            this.toastr.error('Hủy đơn hàng thất bại', 'Thông báo', {
              timeOut: 1000,
            });
          }
        });
      },
      error: () => {
        this.toastr.error('Lấy đơn hàng theo mã thất bại', 'Thông báo', {
          timeOut: 1000,
        });
      }
    });
  }
  
}