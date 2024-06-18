import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { DonHang, SuaDonHang } from '../../models/don-hang.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { DonHangService } from '../../services/DonHang/don-hang.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-tiep-nhan-don-hang',
  templateUrl: './tiep-nhan-don-hang.component.html',
  styleUrl: './tiep-nhan-don-hang.component.css',
})
export class TiepNhanDonHangComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [
    'maDonHang',
    'maKhachHang',
    'thoiGianDatHang',
    'tinhTrang',
    'action',
  ];
  dataSource: MatTableDataSource<DonHang>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private donHangService: DonHangService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private cdred:ChangeDetectorRef
  ) {
    this.dataSource = new MatTableDataSource<DonHang>([]);
    this.getDonHangData();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.sort.sort({ id: 'thoiGianDatHang', start: 'desc', disableClear: true });
    this.cdred.detectChanges();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  donHang: any;
  ngOnInit(): void {
    this.getDonHangData();
  }

  getDonHangData() {
    this.donHangService.getAllDonHang().subscribe(
      (data: any) => {
        data = data.filter((s: any) => s.tinhTrang != 'Đã thanh toán' && s.tinhTrang != 'Đã hoàn thành' && s.tinhTrang!='Thanh toán thất bại');
        // console.log(data);

        this.dataSource.data = data;
        this.donHang = data;
      },
      (error) => {
        console.error('Error fetching donHang data: ', error);
      }
    );
  }

  chapNhanDonHang(id: string): void {
    console.log(id);

    // Tìm đơn hàng với id được chọn
    const selectedDonHang = this.dataSource.data.find(dh => dh.maDonHang === id);

    if (!selectedDonHang) {
      console.error('Không tìm thấy đơn hàng với mã đơn hàng:', id);
      return;
    }

    const updatedData: SuaDonHang = {
      maKhachHang: selectedDonHang.maKhachHang,
      thoiGianDatHang: selectedDonHang.thoiGianDatHang,
      tongTien: selectedDonHang.tongTien,
      diaChiGiaoHang: selectedDonHang.diaChiGiaoHang,
      thongTinThanhToan: selectedDonHang.thongTinThanhToan,
      tinhTrang: 'Đang giao hàng',
    };

    this.donHangService.suaDonHang(id, updatedData).subscribe({
      next: (response) => {
        selectedDonHang.tinhTrang = 'Đang giao hàng';
        this.dataSource.data = [...this.dataSource.data];
        console.log(response);
        this.toastr.success('Đơn hàng đang được giao!', 'Thông báo', {
          timeOut: 2000,
        });
      },
      error: (error) => {
        console.error('Có lỗi xảy ra khi cập nhật đơn hàng:', error);
        this.toastr.error('Có lỗi xảy ra khi cập nhật đơn hàng.');
      },
    });
  }
  huyDonHang(id:string):void{
    console.log(id);

    // Tìm đơn hàng với id được chọn
    const selectedDonHang = this.dataSource.data.find(dh => dh.maDonHang === id);

    if (!selectedDonHang) {
      console.error('Không tìm thấy đơn hàng với mã đơn hàng:', id);
      return;
    }

    const updatedData: SuaDonHang = {
      maKhachHang: selectedDonHang.maKhachHang,
      thoiGianDatHang: selectedDonHang.thoiGianDatHang,
      tongTien: selectedDonHang.tongTien,
      diaChiGiaoHang: selectedDonHang.diaChiGiaoHang,
      thongTinThanhToan: selectedDonHang.thongTinThanhToan,
      tinhTrang: 'Đã hủy đơn hàng',
    };

    this.donHangService.suaDonHang(id, updatedData).subscribe({
      next: (response) => {
        selectedDonHang.tinhTrang = 'Đã hủy đơn hàng';
        this.dataSource.data = [...this.dataSource.data];
        console.log(response);
        this.toastr.success('Đã hủy đơn hàng thành công!', 'Thông báo', {
          timeOut: 2000,
        });
      },
      error: (error) => {
        console.error('Có lỗi xảy ra khi cập nhật đơn hàng:', error);
        this.toastr.error('Có lỗi xảy ra khi cập nhật đơn hàng.');
      },
    }); 
  }
}
