import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SanPham } from '../../models/san-pham.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { SanPhamService } from '../../services/SanPham/san-pham.service';
import { ThemSanPhamComponent } from './them-san-pham/them-san-pham.component';
import { SuaSanPhamComponent } from './sua-san-pham/sua-san-pham.component';
import { XacNhanXoaComponent } from '../../xac-nhan-xoa/xac-nhan-xoa.component';

@Component({
  selector: 'app-san-pham',
  templateUrl: './san-pham.component.html',
  styleUrl: './san-pham.component.css'
})
export class SanPhamComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['maSanPham', 'maLoai', 'tenSanPham', 'gia', 'action'];
  dataSource: MatTableDataSource<SanPham>;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  sanPham$?: Observable<SanPham[]>;
  constructor(
    private sanPhamServices: SanPhamService,
    private toastr: ToastrService,
    private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<SanPham>([]);
    this.getSanPhamData()
   }

  
  ngOnInit(): void {

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
    const _popup = this.dialog.open(ThemSanPhamComponent, {
      width: '80%',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
      data: {
        title: title,
        idSanPham: id 
      },
    });
    _popup.afterClosed().subscribe((item) => {
      // console.log(item);
      this.getSanPhamData(); 
    });
  }
  OpenPopupSua(id: any, title: any): void {
    const _popup = this.dialog.open(SuaSanPhamComponent, {
      width: '80%',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
      data: {
        title: title,
        idSanPham: id 
      },
    });
    _popup.afterClosed().subscribe((item) => {
      // console.log(item);
      this.getSanPhamData(); 
    });
  }

  themSanPham(): void {
    this.OpenPopup(0, 'Thêm mới sản phẩm');
  }
  suaSanPham(id:any): void {
    this.OpenPopupSua(id, 'Sửa sản phẩm');
  }
  
  xoaSanPham(element:any){
   
    const message = `Bạn có chắc muốn xóa ${element.maSanPham} - ${element.tenSanPham} không?`;
    const dialogRef = this.dialog.open(XacNhanXoaComponent, {
      width: '500px',
      data: { message: message }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.sanPhamServices.xoaSanPham(element.maSanPham).subscribe((data:any)=>{
          this.toastr.success('Xóa sản phẩm thành công', 'Thông báo', {
            timeOut: 2000,
          });
          this.getSanPhamData();
        });
      }
    });
  }

  getSanPhamData(){
    this.sanPhamServices.getAllSanPham().subscribe(
      (data:SanPham[])=>{
        this.dataSource.data = data.filter(sp=>sp.tinhTrang!="Ngưng bán");
      },
      (error) => {
        console.error('Error fetching SanPham data: ', error);
      }
    )
  }
  ExportFile(): void {
      this.sanPhamServices.ExportExcel()
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
