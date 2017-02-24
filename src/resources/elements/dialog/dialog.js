import {inject, customElement} from 'aurelia-framework';
import {DialogService} from 'resources/elements/dialog/service';

@customElement('dialog')
@inject(Element, DialogService)
export class Dialog {
    constructor(element, service) {
        this.service = service;
    }

    attached() {
        console.log('attached');
    }

    close(result) {
        return this.service.close(result);
    }

    cancel() {
        return this.service.cancel();
    }

    ok(value) {
        return this.service.ok(value);
    }
}