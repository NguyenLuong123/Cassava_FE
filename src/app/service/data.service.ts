import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class DataService {
    private dataKey = 'yourDataKey';

    fetchData(): any {
        const storedData = sessionStorage.getItem(this.dataKey);
        return storedData ? JSON.parse(storedData) : null;
    }

    saveData(data: any): void {
        sessionStorage.setItem(this.dataKey, JSON.stringify(data));
    }

    clearData(param): void {
        sessionStorage.removeItem(param);
    }
}
