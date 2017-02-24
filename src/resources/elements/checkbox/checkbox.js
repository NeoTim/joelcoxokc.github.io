import {customElement, inject, bindable} from 'aurelia-framework';

const twoWay = {defaultBindingMode: 2}

@inject(Element)
export class Checkbox {

    @bindable(twoWay) value = null;
    @bindable(twoWay) model = null;
    @bindable(twoWay) checked = false;

    constructor(Element) {
        this.element = Element;
    }

    attached() {
        const input = this.element.querySelector('input');
        const label = input.labels[0];

        if (label && label instanceof Element) {
            label.classList.add('checkbox-label');
        }
    }
}