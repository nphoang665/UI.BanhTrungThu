import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { KhachHangService } from '../../../services/KhachHang/khach-hang.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-them-khach-hang',
  templateUrl: './them-khach-hang.component.html',
  styleUrl: './them-khach-hang.component.css'
})
export class ThemKhachHangComponent implements OnInit{

  myForm:FormGroup = new FormGroup({
    tenKhachHang:new FormControl(''),
    soDienThoai:new FormControl(''),
    email:new FormControl(''),
    diaChi:new FormControl(''),
    tinhTrang:new FormControl(''),
  })
  constructor(    
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<ThemKhachHangComponent>,
    private khachHangServices: KhachHangService,
    private toastr: ToastrService,){
  }
  ClosePopup() {
    this.ref.close();
  }
  ngOnInit(): void {
  
  }

  themKhachHang(){
    this.khachHangServices.themKhachHang(this.myForm.value).subscribe({
      next:(response)=>{
        console.log(response);
        this.toastr.success('Thêm khách hàng thành công', 'Thông báo', {
          timeOut: 1000,
        });
        this.ClosePopup();  
      }, error: (error) => {
        console.error('Lỗi khi thêm khách hàng:', error);
      },
    })
  }

}
