import { Component, OnInit } from '@angular/core';
import { DonHang } from '../../../models/don-hang.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { DonHangService } from '../../../services/DonHang/don-hang.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sua-tiep-nhan-don-hang',
  templateUrl: './sua-tiep-nhan-don-hang.component.html',
  styleUrl: './sua-tiep-nhan-don-hang.component.css'
})
export class SuaTiepNhanDonHangComponent implements OnInit{
  
  donHang: FormGroup = new FormGroup({
    maDonHang: new FormControl(''),
    maKhachHang: new FormControl(''),
    thoiGianDatHang: new FormControl(new Date()),
    tongTien: new FormControl(''),
    diaChiGiaoHang: new FormControl(''),
    thongTinThanhToan: new FormControl(''),
    tinhTrang: new FormControl(''),
  });
  constructor( private router: Router,private route: ActivatedRoute, private donHangService: DonHangService, private toastr: ToastrService,){}



  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.donHangService.getDonHangById(id).subscribe((data: DonHang) => {
        this.donHang.setValue({
          maDonHang: data.maDonHang,
          maKhachHang: data.maKhachHang,
          thoiGianDatHang: data.thoiGianDatHang,
          tongTien: data.tongTien,
          diaChiGiaoHang: data.diaChiGiaoHang,
          thongTinThanhToan: data.thongTinThanhToan,
          tinhTrang: data.tinhTrang,
        });
      });
    }
  }
  onSubmit() {
    if (this.donHang.valid) {
      const id = this.donHang.get('maDonHang')?.value;
      this.donHangService.suaDonHang(id, this.donHang.value).subscribe(response => {
        // console.log('Đơn hàng đã được cập nhật:', response);
        this.toastr.success('Đơn hàng đã được cập nhật', 'Thông báo', {
          timeOut: 2000,
        });
        this.router.navigateByUrl('/admin/tiep-nhan-don-hang')
      });
    }
  }
}
