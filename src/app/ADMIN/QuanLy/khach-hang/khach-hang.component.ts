import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { KhachHang } from '../../models/khach-hang.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { KhachHangService } from '../../services/KhachHang/khach-hang.service';
import { MatDialog } from '@angular/material/dialog';
import { ThemKhachHangComponent } from './them-khach-hang/them-khach-hang.component';
import { SuaKhachHangComponent } from './sua-khach-hang/sua-khach-hang.component';

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


  getKhachHangData(){
    this.khachHangServices.getAllKhachHang().subscribe(
      (data:KhachHang[])=>{
        this.dataSource.data = data
      },
      (error) => {
        console.error('Error fetching khachHang data: ', error);
      }
    )
  }
}
