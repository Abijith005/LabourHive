import { Component, OnInit } from '@angular/core';
import { AdminJobManagementService } from 'src/app/services/adminServices/admin-job-management.service';
import { AdminPaymentManagementService } from 'src/app/services/adminServices/admin-payment-management.service';

interface summaryDatas{
  totalRevenue: number;
  totalHire: number;
  totalUsers: number;
  totalJobs: number;
 }
@Component({
  selector: 'labourHive-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  // variable declarations
  columnChart: any = '';
  lineChart: any = '';
  pieChart: any = '';
  summaryDatas:summaryDatas|null=null

  constructor(
    private _paymetService: AdminPaymentManagementService,
    private _jobService: AdminJobManagementService
  ) {}

  ngOnInit(): void {
    this._paymetService.getRevenueDatas().subscribe((res) => {
      const coloumnChartOptions = {
        title: {
          text: 'Monthly Revenue',
        },
        theme: 'light2',
        animationEnabled: false,
        exportEnabled: false,
        axisY: {
          includeZero: true,
          valueFormatString: '₹#,##0k',
        },
        data: [
          {
            type: 'column', //change type to bar, line, area, pie, etc
            yValueFormatString: '₹#,##0k',
            color: '#01b8aa',
            dataPoints: res.monthlyRevenue,
          },
        ],
      };

      const lineChartOptions = {
        title: {
          text: 'Monthly Jobs Data',
        },
        theme: 'light2',
        animationEnabled: true,
        exportEnabled: false,
        axisY: {
          includeZero: true,
          valueFormatString: '#,##0',
        },
        data: [
          {
            type: 'area', //change type to bar, line, area, pie, etc
            yValueFormatString: '#,##0',
            color: '#01b8aa',
            dataPoints: res.monthlyHiring,
          },
        ],
      };

      const pieChartOptions = {
        animationEnabled: true,
        theme: 'light2',
        title: {
          text: 'Total Hire Breakdown',
        },
        data: [
          {
            type: 'doughnut',
            yValueFormatString: "#,###.##'%'",
            indexLabel: '{name}',
            dataPoints: res.categoryHiringCount,
          },
        ],
      };

      this.columnChart = coloumnChartOptions;
      this.lineChart = lineChartOptions;
      this.pieChart = pieChartOptions;
    });

    this._jobService.getHeaderDatas().subscribe((res) => {
      this.summaryDatas=res
    });
  }
}
