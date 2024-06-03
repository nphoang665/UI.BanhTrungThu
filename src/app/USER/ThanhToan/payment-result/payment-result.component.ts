import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-result',
  template: `
  <div *ngIf="paymentStatus">
    <h1>{{ paymentStatus === 'Đã thanh toán' ? 'Thanh toán thành công!' : 'Thanh toán thất bại!' }}</h1>
    <p>Bạn sẽ được chuyển về trang chủ trong 10 giây...</p>
  </div>
  `,
  styleUrl: './payment-result.component.css'
})
export class PaymentResultComponent implements OnInit {
  paymentStatus: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const status = params['status'];
      this.paymentStatus = status;

      if (status === 'Đã thanh toán') {
        this.toastr.success('Thanh toán thành công!', 'Thông báo', { timeOut: 3000 });
      } else {
        this.toastr.error('Thanh toán thất bại!', 'Thông báo', { timeOut: 3000 });
      }

      // Chuyển hướng sau 10 giây
      setTimeout(() => {
        this.router.navigateByUrl('/home');
      }, 10000);
    });
  }
}