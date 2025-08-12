import { Injectable } from '@angular/core';
import { CommonService } from '../common/common.service';

@Injectable({
    providedIn: 'root',
})
export class LogService {
    constructor(private common: CommonService) { }

    today() { return this.common.get('Log/Today', {}, false) }

    date() { return this.common.get('Menu/GetAll', {}, false) }
}
