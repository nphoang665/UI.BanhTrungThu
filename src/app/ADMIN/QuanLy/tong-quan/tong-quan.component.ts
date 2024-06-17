import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { DonHangService } from '../../services/DonHang/don-hang.service';

@Component({
  selector: 'app-tong-quan',
  templateUrl: './tong-quan.component.html',
  styleUrl: './tong-quan.component.css'
})
export class TongQuanComponent implements OnInit{

  Highcharts: typeof Highcharts = Highcharts;
  sdsd:any[] =[];

  constructor(private donHangService: DonHangService) {
    this.sdsd =[];

  }
  DoanhThuchartsOptions: Highcharts.Options = {
    title: {
      text: 'Doanh thu năm 2024'
    },
    xAxis: {
      categories: [
        'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
        'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
      ]
    },
    yAxis: {
      title: {
        text: 'Tổng tiền'
      }
    },
    series: [{
      name:'Tổng tiền',
      data: this.sdsd,
      type: 'line'
    }]
  };
  ngOnInit(): void {
    this.getDoanhThuTheoThang();
    document.addEventListener('DOMContentLoaded', () => {
      const elements = document.querySelectorAll('.highcharts-credits');
      elements.forEach((element) => {
        (element as HTMLElement).style.display = 'none';
      });
    });
  }

  getDoanhThuTheoThang() {
    this.donHangService.getDoanhThuTheoThang().subscribe(
      (data: any) => {
        // console.log('API data:', data);

        let transformedData = Array(12).fill(0);
        data.forEach((item: { thang: string; doanhThu: number }) => {
          let monthIndex = parseInt(item.thang.split('/')[0]) - 1;
          transformedData[monthIndex] = item.doanhThu;
        });
        this.sdsd = transformedData;
        // console.log('Transformed data:', transformedData);

        this.DoanhThuchartsOptions = {
          title: {
            text: 'Doanh thu năm 2024'
          },
          xAxis: {
            categories: [
              'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
              'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
            ]
          },
          yAxis: {
            title: {
              text: 'Tổng tiền'
            }
          },
          series: [{
            data: transformedData,
            type: 'line'
          }]
        };
      },
      (error) => {
        console.error('API error:', error);
      }
    );
  }
  
}
