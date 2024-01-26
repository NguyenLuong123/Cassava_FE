import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {AppBreadcrumbService} from '../../app.breadcrumb.service';
import {FieldService} from '../../service/field.service';
import {Chart} from 'chart.js';

@Component({
    selector: 'app-weather',
    templateUrl: './weather.component.html',
    styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit, AfterViewInit {
    weatherData: any;

    @ViewChild('chartTem') chartTem: Chart;
    @ViewChild('chartHum') chartHum: Chart;
    @ViewChild('chartRad') chartRad: Chart;
    @ViewChild('chartRain') chartRain: Chart;
    @ViewChild('chartWind') chartWind: Chart;
    chartTemData: any;
    chartHumData: any;
    chartRadData: any;
    chartRainData: any;
    chartWindData: any;
    ordersOptions: any;
    isLoading = false;

    constructor(private breadcrumbService: AppBreadcrumbService, private field: FieldService, private cdRef: ChangeDetectorRef) {
        this.breadcrumbService.setItems([
            {label: 'Dữ liệu thời tiết', routerLink: ['/Home/WeatherData']}
        ]);
    }

    async ngOnInit() {
        this.isLoading = true;
        this.chartTemData = {
            labels: [],
            datasets: [{
                label: 'Nhiệt độ oC',
                data: [],
                borderColor: [
                    '#cc132e',
                ],
                backgroundColor: [
                    'rgba(192,23,48,0.8)',
                ],
                borderWidth: 0.5,
                fill: true,
                tension: .3
            }]
        };
        this.chartHumData = {
            labels: [],
            datasets: [{
                label: 'Độ ẩm tương đối',
                data: [],
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
        this.chartRadData = {
            labels: [],
            datasets: [{
                label: 'Bức xạ',
                data: [],
                borderColor: [
                    '#964136',
                ],
                backgroundColor: [
                    'rgba(131,73,54,0.8)',
                ],
                borderWidth: 0.5,
                fill: true,
                tension: .3
            }]
        };
        this.chartRainData = {
            labels: [],
            datasets: [{
                label: 'Lượng mưa',
                data: [],
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
        this.chartWindData = {
            labels: [],
            datasets: [{
                label: 'Tốc độ gió',
                data: [],
                borderColor: [
                    '#344eb7',
                ],
                backgroundColor: [
                    'rgb(7,32,93)',
                ],
                borderWidth: 0.5,
                fill: true,
                tension: .3
            }]
        };
        this.weatherData = JSON.parse(localStorage.getItem('weather'));
        setTimeout(() => {
            this.setChart();
        }, 200);
        if (this.weatherData) {
            this.weatherData = this.weatherData.slice(this.weatherData.length - 1000, this.weatherData.length + 1);
            this.chartTem.data.datasets[0].data = this.weatherData.map(item => item.temperature);
            this.chartHum.data.datasets[0].data = this.weatherData.map(item => item.relativeHumidity);
            this.chartRad.data.datasets[0].data = this.weatherData.map(item => item.radiation);
            this.chartRain.data.datasets[0].data = this.weatherData.map(item => item.rainFall);
            this.chartWind.data.datasets[0].data = this.weatherData.map(item => item.windSpeed);
            const time = this.weatherData.map(item => {
                const date = new Date(item.time);
                const hours = date.getHours().toString().padStart(2, '0');
                const minutes = date.getMinutes().toString().padStart(2, '0');
                return `${hours}:${minutes}`;
            });
            this.chartTem.data.labels = time;
            this.chartHum.data.labels = time;
            this.chartRad.data.labels = time;
            this.chartRain.data.labels = time;
            this.chartWind.data.labels = time;
            this.chartTemData = {...this.chartTemData};
            this.chartWindData = {...this.chartWindData};
            this.chartRainData = {...this.chartRainData};
            this.chartRadData = {...this.chartRadData};
            this.chartHumData = {...this.chartHumData};
            this.isLoading = false;
            this.ordersOptions = this.getOrdersOptions();
        } else {
            this.field.getWeatherData('field1').subscribe(res =>
            {
                this.weatherData = res.slice(res.length - 1000, res.length + 1);
                this.setChart();
            });
        }
    }

    setChart() {
        this.chartTem.data.datasets[0].data = this.weatherData.map(item => item.temperature);
        this.chartHum.data.datasets[0].data = this.weatherData.map(item => item.relativeHumidity);
        this.chartRad.data.datasets[0].data = this.weatherData.map(item => item.radiation);
        this.chartRain.data.datasets[0].data = this.weatherData.map(item => item.rainFall);
        this.chartWind.data.datasets[0].data = this.weatherData.map(item => item.windSpeed);
        const time = this.weatherData.map(item => {
            const date = new Date(item.time);
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            return `${hours}:${minutes}`;
        });
        this.chartTem.data.labels = time;
        this.chartHum.data.labels = time;
        this.chartRad.data.labels = time;
        this.chartRain.data.labels = time;
        this.chartWind.data.labels = time;
        this.chartTemData = {...this.chartTemData};
        this.chartWindData = {...this.chartWindData};
        this.chartRainData = {...this.chartRainData};
        this.chartRadData = {...this.chartRadData};
        this.chartHumData = {...this.chartHumData};
        this.isLoading = false;
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

    ngAfterViewInit(): void {
    }
}
