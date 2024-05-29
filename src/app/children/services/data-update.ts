import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataUpdateService {
    private updateSubject = new Subject<void>();

    updateData(): void {
        this.updateSubject.next();
    }

    onUpdateData() {
        return this.updateSubject.asObservable();
    }
}
