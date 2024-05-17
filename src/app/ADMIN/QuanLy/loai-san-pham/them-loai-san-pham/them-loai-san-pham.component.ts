import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { LoaiSanPhamService } from '../../../services/LoaiSanPham/loai-san-pham.service';

@Component({
  selector: 'app-them-loai-san-pham',
  templateUrl: './them-loai-san-pham.component.html',
  styleUrl: './them-loai-san-pham.component.css'
})
export class ThemLoaiSanPhamComponent implements OnInit{

  myForm: FormGroup = new FormGroup({
    tenLoai: new FormControl(''),
    moTa: new FormControl(''),
  })

  constructor(    
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<ThemLoaiSanPhamComponent>,
    private loaiSanPhamServices: LoaiSanPhamService,
    private toastr: ToastrService,){
    
  }
  ClosePopup() {
    this.ref.close();
  }

  ngOnInit(): void {

  }

  themLoaiSanPham(){

    this.loaiSanPhamServices.themLoaiSanPham(this.myForm.value).subscribe({
      next:(response)=>{
        console.log(response);
        this.toastr.success('Thêm loại sản phẩm thành công', 'Thông báo', {
          timeOut: 1000,
        });
        
        this.ClosePopup();
      }, error: (error) => {
        console.error('Lỗi khi thêm loại sản phẩm:', error);
      },
    })
  }

}
