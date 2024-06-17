import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    tenKhachHang:new FormControl('',[Validators.required, Validators.minLength(3), Validators.maxLength(70)]),
    soDienThoai:new FormControl('',[Validators.required, Validators.minLength(7), Validators.maxLength(11)]),
    email:new FormControl('',[Validators.required, Validators.minLength(3), Validators.maxLength(80)]),
    diaChi:new FormControl('',[Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
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
          timeOut: 2000,
        });
        this.ClosePopup();  
      }, error: (error) => {
        console.error('Lỗi khi thêm khách hàng:', error);
      },
    })
  }

}
