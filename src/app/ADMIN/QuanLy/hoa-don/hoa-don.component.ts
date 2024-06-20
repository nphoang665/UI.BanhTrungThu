import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DonHang } from '../../models/don-hang.model';
import { MatTableDataSource } from '@angular/material/table';
import { DonHangService } from '../../services/DonHang/don-hang.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { XemHoaDonComponent } from './xem-hoa-don/xem-hoa-don.component';

@Component({
  selector: 'app-hoa-don',
  templateUrl: './hoa-don.component.html',
  styleUrl: './hoa-don.component.css'
})
export class HoaDonComponent implements AfterViewInit, OnInit{

  displayedColumns: string[] = ['maDonHang', 'maKhachHang', 'tongTien','tinhTrang', 'action'];
  dataSource: MatTableDataSource<DonHang>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private donHangService:DonHangService,
    private toastr: ToastrService,
    private dialog: MatDialog,){
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
    ngOnInit(): void {
      
    }

    getDonHangData() {
      this.donHangService.getAllDonHang().subscribe(
        (data: DonHang[]) => {
          // this.dataSource.data = data.filter(donHang => donHang.tinhTrang === 'Đã thanh toán');
          this.dataSource.data = data.filter(donHang => donHang.tinhTrang === 'Đã thanh toán' || donHang.tinhTrang === 'Đã hoàn thành');;
        },
        (error) => {
          console.error('Error fetching don hang data: ', error);
        }
      );
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
      this.OpenPopup(id,'Xem hóa đơn')
      // console.log(id);
      
    }

    ExportFile(): void {
        this.donHangService.ExportExcel()
          .subscribe(response => {
            let fileName = response.headers.get('content-disposition')
              ?.split(';')[1].split('=')[1];
            let blob: Blob = response.body as Blob;
            let a = document.createElement('a');
            a.download = fileName ?? "";
            a.href = window.URL.createObjectURL(blob);
            a.click();
          });
    }
}
