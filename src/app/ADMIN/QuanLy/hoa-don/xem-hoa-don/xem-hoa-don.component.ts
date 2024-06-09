import { Component, Inject, OnInit } from '@angular/core';
import { DonHang, DonHangDto } from '../../../models/don-hang.model';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DonHangService } from '../../../services/DonHang/don-hang.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-xem-hoa-don',
  templateUrl: './xem-hoa-don.component.html',
  styleUrl: './xem-hoa-don.component.css'
})
export class XemHoaDonComponent implements OnInit{
  id: string | null = null;
  model?: DonHang;
  datDonHang?: any;
  donHangDto$?: DonHangDto;
  donHang$?: Observable<DonHang[]>;

  constructor(
    private route: ActivatedRoute,
    private donHangService: DonHangService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) {

  }

  ngOnInit(): void {
    this.id = this.data.maDonHang
  }
}
