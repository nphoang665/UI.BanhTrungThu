import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { KhachHang } from '../../models/khach-hang.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { KhachHangService } from '../../services/KhachHang/khach-hang.service';
import { MatDialog } from '@angular/material/dialog';
import { ThemKhachHangComponent } from './them-khach-hang/them-khach-hang.component';
import { SuaKhachHangComponent } from './sua-khach-hang/sua-khach-hang.component';
import { XacNhanXoaComponent } from '../../xac-nhan-xoa/xac-nhan-xoa.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-khach-hang',
  templateUrl: './khach-hang.component.html',
  styleUrl: './khach-hang.component.css'
})
export class KhachHangComponent implements AfterViewInit, OnInit{
  displayedColumns: string[] = ['maKhachHang', 'tenKhachHang', 'soDienThoai','email', 'action'];
  dataSource: MatTableDataSource<KhachHang>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private khachHangServices:KhachHangService,
    private dialog:MatDialog,
    private toastr:ToastrService
  ){
    this.dataSource = new MatTableDataSource<KhachHang>([]);
  }
  ngOnInit(): void {
    this.getKhachHangData();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  OpenPopup(id: any, title: any): void {
    const _popup = this.dialog.open(ThemKhachHangComponent, {
      width: '80%',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
      data: {
        title: title,
        idKhachHang: id 
      },
    });
    _popup.afterClosed().subscribe((item) => {
      // console.log(item);
      this.getKhachHangData(); 
    });
  }
  OpenPopupSua(id: any, title: any): void {
    const _popup = this.dialog.open(SuaKhachHangComponent, {
      width: '80%',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
      data: {
        title: title,
        idKhachHang: id 
      },
    });
    _popup.afterClosed().subscribe((item) => {
      // console.log(item);
      this.getKhachHangData();
    });
  }
  themKhachHang(): void {
    this.OpenPopup(0, 'Thêm mới khách hàng');
  }
  suaKhachHang(id: any): void {
    this.OpenPopupSua(id, 'Sửa loại khách hàng');
    console.log(id);
    
  }

  xoaKhachHang(element:any){
   
    const message = `Bạn có chắc muốn xóa ${element.maKhachHang} - ${element.tenKhachHang} không?`;
    const dialogRef = this.dialog.open(XacNhanXoaComponent, {
      width: '500px',
      data: { message: message }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.khachHangServices.xoaKhachHang(element.maKhachHang).subscribe((data:any)=>{
          this.toastr.success('Xóa khách hàng thành công', 'Thông báo', {
            timeOut: 2000,
          });
          this.getKhachHangData();
        });
      }
    });
  }

  getKhachHangData(){
    this.khachHangServices.getAllKhachHang().subscribe(
      (data:KhachHang[])=>{
        this.dataSource.data = data.filter(x=>x.tinhTrang=="Đang hoạt động");
      },
      (error) => {
        console.error('Error fetching khachHang data: ', error);
      }
    )
  }

  ExportFile(): void {
      this.khachHangServices.ExportExcel()
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
