import { inject } from 'aurelia-framework';
import { Core } from 'core/core';


export class Header {

    nodes = {};
    
    constructor(State) {
        this.State = State;
    }

    activate() {

    }

    setTitle(text) {
        this.title = text;
    }

    setBackground(background) {
        this.element.style.backgroundColor = background;
    }

    setTitleVisibility(isVisible) {
        this.nodes.title.style.setProperty('display', isVisible ? '' : 'none');
    }

    setVisibility(isVisible) {
        this.element.style.setProperty('display', isVisible ? '' : 'none');
    }
}