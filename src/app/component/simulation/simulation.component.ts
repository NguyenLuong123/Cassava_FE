import {Component, OnInit, ViewChild} from '@angular/core';
import {AppComponent} from "../../app.component";
import {AppMainComponent} from "../../app.main.component";
import {FieldService} from "../../service/field.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {DatePipe} from "@angular/common";
import {AppBreadcrumbService} from "../../app.breadcrumb.service";
import {CsvService} from "../../service/csv.service";
import {Chart} from "chart.js";
import {Observable} from "rxjs";

@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.scss']
})
export class SimulationComponent implements OnInit {
    imageUrls: string[] = [];
    chartAmountIrr: any;
    chartPredictYield: any;
    chartLeafArea: any;
    chartLabieCacbon: any;
    dataLeafArea: any;
    dataLabieCarbon: any;
    ordersOptions: any;
    lstResult: any;
    data = [];
    dateArray = [];
    @ViewChild('chart') chart: Chart;
    @ViewChild('chart1') chart1: Chart;
    @ViewChild('chart30') chart30: Chart;
    @ViewChild('chartLeaf') chartLeaf: Chart;
    @ViewChild('chartLabie') chartLabie: Chart;
    timeIrr: any;
    amount: any;
    nameField: any;
    listHistory = [];
    isLoading = false;
    duration: any;
    humidityList: any;
    chartHumidity30: any;
    basicOptions: any;
    isIrr = false;
    private userProfileImg: any;
    imageUrl$: Observable<string>;
    fieldName = '';
    lstDisease: any;

  constructor(public app: AppComponent, public appMain: AppMainComponent, private fieldService: FieldService,
              private router: Router, public _csvService: CsvService,
              private messageService: MessageService, private datePipe: DatePipe,
              private breadcrumbService: AppBreadcrumbService, private field: FieldService) {
      this.breadcrumbService.setItems([
          {label: 'Mô phỏng với dữ liệu thời tiết ', routerLink: ['/Home/Simulation']}
      ]);
  }

    async ngOnInit() {
      await this.initLuongNuocTuoi();
      this.chartAmountIrr = {
          labels: this.dateArray,
          datasets: [{
              label: 'Lượng nước tưới (m^3/ha)',
              data: this.data,
              borderColor: [
                  '#4DD0E1',
              ],
              backgroundColor: [
                  'rgba(77, 208, 225, 0.8)',
              ],
              borderWidth: 0.5,
              fill: true,
              tension: .3
          }]
      };
      this.chartPredictYield = {
          labels: this.dateArray,
          datasets: [{
              label: 'Dự đoán sản lượng (kg/ha)',
              data: this.lstResult,
              borderColor: [
                  '#21702a',
              ],
              backgroundColor: [
                  'rgba(28,84,25,0.8)',
              ],
              borderWidth: 0.5,
              fill: true,
              tension: .3
          }]
      };
      this.chartLeafArea = {
          labels: this.dateArray,
          datasets: [{
              label: 'Diện tích lá',
              data: this.dataLeafArea,
              borderColor: [
                  '#4DD0E1',
              ],
              backgroundColor: [
                  'rgba(77, 208, 225, 0.8)',
              ],
              borderWidth: 0.5,
              fill: true,
              tension: .3
          }]
      };
      this.chartLabieCacbon = {
          labels: this.dateArray,
          datasets: [{
              label: 'Labie Carbon',
              data: this.dataLabieCarbon,
              borderColor: [
                  '#4DD0E1',
              ],
              backgroundColor: [
                  'rgba(77, 208, 225, 0.8)',
              ],
              borderWidth: 0.5,
              fill: true,
              tension: .3
          }]
      };
      this.chartHumidity30 = {
          labels: [],
          datasets: [{
              label: 'Độ ẩm ở độ sâu 30 cm',
              data: [],
              borderColor: [
                  '#103b41',
              ],
              backgroundColor: [
                  'rgba(159,206,120,0.8)',
              ],
              borderWidth: 0.5,
              fill: false,
              tension: .3
          },
              {
                  label: 'Độ ẩm ở độ sâu 60 cm (Cbar)',
                  data: [],
                  borderColor: [
                      '#56a2ad',
                  ],
                  backgroundColor: [
                      'rgba(12,18,61,0.8)',
                  ],
                  borderWidth: 0.5,
                  fill: false,
                  tension: .3
              },
          ]
      };
      this.ordersOptions = this.getOrdersOptions();
  }
    getOrdersOptions() {
        const textColor = getComputedStyle(document.body).getPropertyValue('--text-color') || 'rgba(0, 0, 0, 0.87)';
        const gridLinesColor = getComputedStyle(document.body).getPropertyValue('--divider-color') || 'rgba(160, 167, 181, .3)';
        const fontFamily = getComputedStyle(document.body).getPropertyValue('--font-family');
        return {
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        fontFamily,
                        fontColor: textColor,
                    }
                }
            },
            responsive: true,
            scales: {
                y: {
                    ticks: {
                        fontFamily,
                        color: textColor
                    },
                    grid: {
                        color: gridLinesColor
                    }
                },
                x: {
                    display: true,
                    ticks: {
                        fontFamily,
                        color: textColor,
                        stepSize: 5, // Cài đặt để hiển thị mỗi 2 label
                    },
                    grid: {
                        color: gridLinesColor
                    }
                }
            }
        };
    }
    public importedData: Array<any> = [];

    public saveDataInCSV(name: string, data: Array<any>): void {
        let csvContent = this._csvService.saveDataInCSV(data);

        var hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvContent);
        hiddenElement.target = '_blank';
        hiddenElement.download = name + '.csv';
        hiddenElement.click();
    }

    public async importDataFromCSV(event: any) {
        let fileContent = await this.getTextFromFile(event);
        this.importedData = this._csvService.importDataFromCSV(fileContent);
        let x = 0;
        x = x + 1;
        this.field.getModelCSV(this.importedData).subscribe(res => {
        });
    }

    private async getTextFromFile(event: any) {
        const file: File = event.target.files[0];
        let fileContent = await file.text();

        return fileContent;
    }
    initLuongNuocTuoi() {
        this.field.getModelField('Test').subscribe(res => {
            this.data = res[2];
            this.lstResult = res[0];
            this.dataLeafArea = res[3];
            this.dataLabieCarbon = res[4];
            this.dateArray = res[8].filter(element => element > 0);
            this.dateArray = this.dateArray.map((x) => {
                const currentDate = new Date();
                const startOfCurrentYear = new Date(currentDate.getFullYear(), 0, 1);
                const targetDate = new Date(startOfCurrentYear);
                targetDate.setDate(startOfCurrentYear.getDate() + x);

                return `${targetDate.getDate()}/${targetDate.getMonth() + 1}`;
            });
            this.chart.data.datasets[0].data = this.data;
            this.chart.data.labels = this.dateArray;
            this.chart1.data.datasets[0].data = this.lstResult;
            this.chart1.data.labels = this.dateArray;
            this.chartLeaf.data.datasets[0].data = this.dataLeafArea;
            this.chartLeaf.data.labels = this.dateArray;
            this.chartLabie.data.labels = this.dateArray;
            this.chartLabie.data.datasets[0].data = this.dataLabieCarbon;
            this.isLoading = false;
            this.chartLabieCacbon = {...this.chartLabieCacbon};
            this.chartPredictYield = {...this.chartPredictYield};
            this.chartAmountIrr = {...this.chartAmountIrr};
            this.chartLeafArea = {...this.chartLeafArea};
        });
    }
}
