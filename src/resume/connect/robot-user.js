import {inject, useView, observable} from 'aurelia-framework';
import {DialogService} from 'resources/elements/dialog/service';

const cach_key = 'joelcox.io.robot.user';

@useView('modules/connect/robot-user.html')
@inject(DialogService)
export class RobotUser {

    @observable value = false;

    constructor(dialogService) {
        this.service = dialogService;

        this.value = window.localStorage.getItem(cach_key);
    }

    valueChanged(value) {
        if (value === 'true') return this.value = true;
        if (value === 'false') return this.value = false;

        if (value) {
            window.localStorage.setItem(cach_key, true);
        } else {
            window.localStorage.setItem(cach_key, false);
        }
    }
}