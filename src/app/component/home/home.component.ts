import {Component, OnInit} from '@angular/core';
import {AppComponent} from '../../app.component';
import {AppMainComponent} from '../../app.main.component';
import {AppBreadcrumbService} from '../../app.breadcrumb.service';
import {FieldService} from '../../service/field.service';
import {Router} from '@angular/router';
import {ConfirmationService, MessageService} from 'primeng/api';
import * as XLSX from 'xlsx';
import {Field} from "../../model/field";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    lstField: any[];
    isInsert: boolean;
    isUpdate: boolean;
    nameField: any;
    selectField: any;
    weatherData = [];
    isLoading = false;

    constructor(public app: AppComponent, public appMain: AppMainComponent, private router: Router,
                private messageService: MessageService,
                private confirmationService: ConfirmationService,
                private breadcrumbService: AppBreadcrumbService, private field: FieldService) {
        this.breadcrumbService.setItems([
            {label: 'Danh sách cánh đồng', routerLink: ['/Home']}
        ]);
    }

    ngOnInit(): void {
        this.isLoading = true;
        this.field.getList().subscribe(res => {
            this.lstField = res;
            this.selectField = this.lstField[0];
            this.isLoading = false;
            localStorage.setItem('lstField', JSON.stringify(res));
        });
        this.weatherData = JSON.parse(localStorage.getItem('weather'));
    }

    onClickField(event) {
        localStorage.setItem('fieldName', JSON.stringify(event));
        localStorage.setItem('detail', event);
        this.router.navigate(['/Home/DetailField']);
    }

    onClickThemMoi() {
        this.isInsert = true;
    }

    onClickGhiThemMoi() {
        const param = {
            fieldName: this.nameField,
        };
        this.field.insertField(param).subscribe(res => {
            this.field.getUpdateListField().subscribe(res2 => {
                this.lstField = res2;
            });
        });
        this.messageService.add({severity: 'success', summary: 'Thông báo', detail: 'Thêm mới cánh đồng thành công'});
        // @ts-ignore
        this.lstField.push(new Field(this.nameField));
        this.isInsert = false;
    }

    onClickHuy() {
        this.isInsert = false;
        this.isUpdate = false;
    }

    async onClickUpDate() {
        this.field.updateCustomizedParameters(this.selectField).subscribe(res => {
        });
        this.field.getUpdateListField().subscribe(res2 => {
            this.lstField = res2;
        });
        this.messageService.add({severity: 'success', summary: 'Thông báo', detail: 'Chỉnh sửa cánh đồng thành công'});
        this.isUpdate = false;
    }

    onClickEdit(rowData: any) {
        this.selectField = rowData;
        this.isUpdate = true;
    }

    onClickDelete(rowData: any) {
        this.confirmationService.confirm({
            header: 'Xác nhận',
            message: 'Bạn có chắc chắn xóa cánh đồng này không ??',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.field.deleteField(rowData.fieldName).subscribe(res => {
                    this.field.getUpdateListField().subscribe(res2 => {
                        this.lstField = res2;
                    });
                });
                // tslint:disable-next-line:triple-equals
                this.lstField = this.lstField.filter(x => x.fieldName != rowData.fieldName);
                localStorage.setItem('lstField', JSON.stringify(this.lstField));
            }
        });
    }

    private saveAsExcelFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
        const url: string = window.URL.createObjectURL(data);
        const a: HTMLAnchorElement = document.createElement('a');
        a.href = url;
        a.download = fileName + '.xlsx';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }

    ExportFileExcell() {
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.weatherData);
        const workbook: XLSX.WorkBook = {
            Sheets: {DATA_WEATHER: worksheet},
            SheetNames: ['DATA_WEATHER']
        };
        const excelBuffer: any = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
        this.saveAsExcelFile(excelBuffer, 'dataWeather');
    }
}
