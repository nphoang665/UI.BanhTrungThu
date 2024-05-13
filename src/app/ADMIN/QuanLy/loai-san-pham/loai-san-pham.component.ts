import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { LoaiSanPham } from '../../models/loai-san-pham.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { LoaiSanPhamService } from '../../services/loai-san-pham.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-loai-san-pham',
  templateUrl: './loai-san-pham.component.html',
  styleUrl: './loai-san-pham.component.css'
})
export class LoaiSanPhamComponent implements AfterViewInit, OnInit  {

  displayedColumns: string[] = ['maLoai', 'tenLoai', 'khoiLuong', 'action'];
  dataSource: MatTableDataSource<LoaiSanPham>;

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
