import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DonHang } from '../../models/don-hang.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { DonHangService } from '../../services/DonHang/don-hang.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-tiep-nhan-don-hang',
  templateUrl: './tiep-nhan-don-hang.component.html',
  styleUrl: './tiep-nhan-don-hang.component.css'
})
export class TiepNhanDonHangComponent implements AfterViewInit, OnInit{
  displayedColumns: string[] = ['maDonHang', 'maKhachHang', 'thoiGianDatHang', 'tinhTrang', 'action'];
  dataSource: MatTableDataSource<DonHang>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private donHangService: DonHangService,
    private toastr: ToastrService,
    private dialog: MatDialog,) {
    this.dataSource = new MatTableDataSource<DonHang>([])
    this.getDonHangData();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  datTour: any;
  ngOnInit(): void {

  }

  getDonHangData(){
    this.donHangService.getAllDonHang().subscribe(
      (data: any) => {
        data = data.filter((s: any) => s.tinhTrang != 'Đã thanh toán');
        console.log(data);

        this.dataSource.data = data;
        this.datTour = data;
      },
      (error) => {
        console.error('Error fetching donHang data: ', error);
      }
    )
  }
}
