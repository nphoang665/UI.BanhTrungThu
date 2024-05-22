import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { LoaiSanPham } from '../../models/loai-san-pham.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ThemLoaiSanPhamComponent } from './them-loai-san-pham/them-loai-san-pham.component';
import { SuaLoaiSanPhamComponent } from './sua-loai-san-pham/sua-loai-san-pham.component';
import { LoaiSanPhamService } from '../../services/LoaiSanPham/loai-san-pham.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-loai-san-pham',
  templateUrl: './loai-san-pham.component.html',
  styleUrl: './loai-san-pham.component.css'
})
export class LoaiSanPhamComponent implements AfterViewInit, OnInit  {

  displayedColumns: string[] = ['maLoai', 'tenLoai', 'anhLoai', 'action'];
  dataSource: MatTableDataSource<LoaiSanPham>;
  apiBaseUrl: string = environment.apiBaseUrl;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private loaiSanPhamServices: LoaiSanPhamService,
    private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<LoaiSanPham>([]);
  }
  
  ngOnInit(): void {
    this.getLoaiSanPhamData();

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
    const _popup = this.dialog.open(ThemLoaiSanPhamComponent, {
      width: '80%',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
      data: {
        title: title,
        idLoaiSanPham: id 
      },
    });
    _popup.afterClosed().subscribe((item) => {
      // console.log(item);
      this.getLoaiSanPhamData(); 
    });
  }
  OpenPopupSua(id: any, title: any): void {
    const _popup = this.dialog.open(SuaLoaiSanPhamComponent, {
      width: '80%',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
      data: {
        title: title,
        idLoaiSanPham: id 
      },
    });
    _popup.afterClosed().subscribe((item) => {
      // console.log(item);
      this.getLoaiSanPhamData();
    });
  }
  themLoaiSanPham(): void {
    this.OpenPopup(0, 'Thêm mới loại sản phẩm');
  }
  suaLoaiSanPham(id: any): void {
    this.OpenPopupSua(id, 'Sửa loại sản phẩm');
    console.log(id);
    
  }


  getLoaiSanPhamData(){
    this.loaiSanPhamServices.getAllLoaiSanPham().subscribe(
      (data:LoaiSanPham[])=>{
        this.dataSource.data = data
      },
      (error) => {
        console.error('Error fetching loaiSanPham data: ', error);
      }
    )
  }
}
