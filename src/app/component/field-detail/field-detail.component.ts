import {Component, OnInit, ViewChild} from '@angular/core';
import {AppComponent} from '../../app.component';
import {AppMainComponent} from '../../app.main.component';
import {AppBreadcrumbService} from '../../app.breadcrumb.service';
import {FieldService} from '../../service/field.service';
import {Router} from '@angular/router';
import {Chart} from 'chart.js';
import {MessageService} from 'primeng/api';
import {DatePipe} from '@angular/common';
import {from, Observable} from 'rxjs';

@Component({
    selector: 'app-field-detail',
    templateUrl: './field-detail.component.html',
    styleUrls: ['./field-detail.component.scss']
})
export class FieldDetailComponent implements OnInit {
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
                private router: Router,
                private messageService: MessageService, private datePipe: DatePipe,
                private breadcrumbService: AppBreadcrumbService, private field: FieldService) {
        this.breadcrumbService.setItems([
            {label: 'Thông tin chi tiết của cánh đồng', routerLink: ['/Home/DetailField']}
        ]);
        this.fieldName = '';
        this.humidityList = null;
        this.isIrr = false;
        this.nameField = JSON.parse(localStorage.getItem('fieldName'));
        this.fieldName = this.nameField.fieldName;
        if (this.nameField.irrigation_information) {
            const dateString = this.nameField.irrigation_information.time;
            const dateToCompare = new Date(dateString);
            const currentDate = new Date();
            if (dateToCompare > currentDate) {
                this.isIrr = true;
            }
        }
        this.field.getField(this.nameField.fieldName).subscribe(res => {
            this.nameField = res;
        });
        // const folderPath = 'images/' +  this.nameField + '/Cassva mosaic disease';
        // const ref = this.storage.ref(folderPath);
        //
        // // Chuyển từ Promise sang Observable bằng cách sử dụng from
        // const observable = from(ref.listAll());
        //
        // observable.subscribe(result => {
        //     result.items.forEach(itemRef => {
        //         itemRef.getDownloadURL().then(url => {
        //             this.imageUrls.push(url);
        //         });
        //     });
        // });
    }

    async ngOnInit() {
        this.isLoading = true;
        await this.initLuongNuocTuoi();
        await this.getHistory();
        await this.getHumidity();
        await this.getDisease();
        const detailField = localStorage.getItem('detail');
        console.log(detailField);
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

    onClickBack() {
        this.router.navigate(['/Home']);
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

    initLuongNuocTuoi() {
        this.field.getModelField(this.nameField.fieldName).subscribe(res => {
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

    onClickSetIrr() {
        const durat = this.amount * this.nameField.customized_parameters.acreage /
            (this.nameField.customized_parameters.dripRate * this.nameField.customized_parameters.numberOfHoles) * 3600;
        const param = {
            amount: this.amount,
            time: this.datePipe.transform(this.timeIrr, 'HH:mm:ss dd/MM/yyyy'),
            duration: durat,
            userName: localStorage.getItem('USER'),
            fieldName: this.nameField.fieldName
        };
        this.field.setIrrigation(param).subscribe(res => {
        });
        this.field.getField(this.nameField.fieldName).subscribe(res => {
            this.nameField = res;
        });
        setTimeout(() => {
            this.field.getUpdateListField();
        }, 200);
        this.isIrr = true;
        this.nameField.irrigation_information.time = this.datePipe.transform(this.timeIrr, 'HH:mm:ss dd/MM/yyyy');
        this.nameField.irrigation_information.amount = this.amount;
        this.nameField.irrigation_information.duration = durat;
        this.messageService.add({severity: 'success', summary: 'Thông báo', detail: 'Cài đặt tưới thành công'});
    }

    getHistory() {
        this.field.getHistory(this.nameField.fieldName).subscribe(res => {
            this.listHistory = res;
            this.isLoading = false;
        });
    }
    getHumidity() {
        this.field.getHumidity(this.nameField.fieldName).subscribe(res => {
            this.humidityList = res.slice(res.length - 1000, res.length + 1);
            this.chart30.data.datasets[0].data = this.humidityList.map(item => item.humidity30);
            this.chart30.data.datasets[1].data = this.humidityList.map(item => item.humidity60);
            this.chart30.data.labels = this.humidityList.map(item => {
                const date = new Date(item.time);
                const hours = date.getHours().toString().padStart(2, '0');
                const minutes = date.getMinutes().toString().padStart(2, '0');
                return `${hours}:${minutes}`;
            });
            this.chartHumidity30 = {...this.chartHumidity30};
        });
    }
    getDisease() {
        this.field.getDisease(this.nameField.fieldName).subscribe(res => {
            this.lstDisease = res;
        });
    }
}
