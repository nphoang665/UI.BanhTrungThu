import { Component, Inject, OnInit } from '@angular/core';
import { DonHang, DonHangDto } from '../../../models/don-hang.model';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DonHangService } from '../../../services/DonHang/don-hang.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { KhachHang } from '../../../models/khach-hang.model';
import { ChiTietDonhang, ChiTietDonhangDto } from '../../../models/chi-tiet-don-hang.model';
import { SanPhamService } from '../../../services/SanPham/san-pham.service';

@Component({
  selector: 'app-xem-hoa-don',
  templateUrl: './xem-hoa-don.component.html',
  styleUrl: './xem-hoa-don.component.css'
})
export class XemHoaDonComponent implements OnInit{
  // id: string | null = null;
  // model?: DonHang;
  // datDonHang?: any;
  // donHangDto$?: DonHangDto;
  // donHang$?: Observable<DonHang[]>;
  email:string='@';
  id: string | null = null;
  donHang: DonHang | undefined;
  khachHang: KhachHang | undefined;
  chiTietDonHangs: ChiTietDonhangDto[] = [];

  constructor(
    private route: ActivatedRoute,
    private donHangService: DonHangService,
    private sanPhamService: SanPhamService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) {

  }

  ngOnInit(): void {
    this.id = this.data.maDonHang;
    if (this.id) {
      this.loadData(this.id);
    }
  }

  loadData(id: string): void {
    this.donHangService.getDonHangById(id).subscribe(donHang => {
      this.donHang = donHang;
      this.donHangService.getKhachHangById(donHang.maKhachHang).subscribe(khachHang => {
        this.khachHang = khachHang;
      });
      this.donHangService.getChiTietDonHang(donHang.maDonHang).subscribe(chiTietDonHangs => {
        this.chiTietDonHangs = chiTietDonHangs;
        this.loadProductNames();
      });
    });
  }
  loadProductNames(): void {
    this.chiTietDonHangs.forEach(item => {
      this.sanPhamService.getSanPhamById(item.maSanPham).subscribe(sanPham => {
        item.sanPham = sanPham.tenSanPham; 
      });
    });
  }
}
