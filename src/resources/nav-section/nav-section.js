import { Container, inject, bindable, customElement } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';

@customElement('nav-section')
@inject(Element, EventAggregator)
export class NavSection {
    @bindable view = null;

    header: Element = null;
    isActive: Boolean = false;

    get winheight() {
        return window.innerHeight;
    }

    get isWinChanging() {
        return window.isResizing ? 'resizing' : 'stable';
    }

    constructor(element, eventAggregator) {
        this.element = element;
        this.eventAggregator = eventAggregator;
    }

    attached() {

        this.mainContainer = document.querySelector('container');

        if (this.element.classList.contains('first')) {
            this.positionClass = 'first';
        }
        if (this.element.classList.contains('last')) {
            this.positionClass = 'last';
        }

        this.eventAggregator.publish('nav-section:attached', this);
    }

    viewChanged(view) {
        if (view) {
            view.setNavSection(this);
            view.element = this.element;
        }
    } 

    headerClicked(event) {
        event.preventDefault();
        this.eventAggregator.publish('state:set:view', this.view);
    }

    toggleNavigation(event) {
        event.preventDefault();
        this.eventAggregator.publish('state:navigation:toggle');
    }

    navigateDirection(event) {
        event.preventDefault();
        this.eventAggregator.publish('state:scroll-to-view', this.view)
    }
}