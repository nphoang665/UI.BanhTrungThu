import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LoaiSanPham } from '../../../models/loai-san-pham.model';
import { ToastrService } from 'ngx-toastr';
import { LoaiSanPhamService } from '../../../services/LoaiSanPham/loai-san-pham.service';

@Component({
  selector: 'app-sua-loai-san-pham',
  templateUrl: './sua-loai-san-pham.component.html',
  styleUrl: './sua-loai-san-pham.component.css'
})
export class SuaLoaiSanPhamComponent implements OnInit {
  model?:LoaiSanPham;
  inputdata: any;
  myForm : FormGroup = new FormGroup({
    maLoai: new FormControl(''),
    tenLoai: new FormControl(''),
    moTa: new FormControl(''),
  })


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<SuaLoaiSanPhamComponent>,
    private loaiSanPhamServices: LoaiSanPhamService,
    private toastr: ToastrService,
  ) { }
  id?: string | null = null;

  ngOnInit(): void {
    this.inputdata = this.data;
    this.id = this.data.idLoaiSanPham;
    if (this.id) {
      this.loaiSanPhamServices.getLoaiSanPhamById(this.id).subscribe((data: LoaiSanPham) => {
        if (data) {
          this.model = data;
          this.initalizeForm();
        } else {
          console.error('không tìm thấy loại sản phẩm', this.id);
        }
      });
    }
  }

  initalizeForm():void{
    console.log('Model:', this.model);
   this.myForm = new FormGroup({
    maLoai: new FormControl(this.model?.maLoai),
    tenLoai: new FormControl(this.model?.tenLoai),
    moTa: new FormControl(this.model?.moTa),
   })
  }
  ClosePopup() {
    this.ref.close();
  }

  suaLoaiSanPham(event:Event){
    
    if(this.model && this.id){
      this.loaiSanPhamServices.suaLoaiSanPham(this.id,this.myForm.value).subscribe({
        next:(response)=>{
          console.log(response);
          this.toastr.success('Sửa loại sản phẩm thành công', 'Thông báo', {
            timeOut: 1000,
          });
        }
      })
      this.ref.close();
    }
  }
}
