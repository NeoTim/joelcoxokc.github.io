import { inject } from 'aurelia-framework';
import { Core } from 'core/core';


export class Header {
    constructor(State) {
        this.State = State;
    }

    activate() {

    }

    setActiveTab(tab) {
        this.State.view = tab;
    }
}