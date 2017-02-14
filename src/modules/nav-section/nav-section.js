import { Container, inject, bindable, customElement } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';

@customElement('nav-section')
@inject(Element, EventAggregator)
export class NavSection {
    @bindable view = null;

    header: Element = null;
    isActive: Boolean = false;

    constructor(element, eventAggregator) {
        this.element = element;
        this.eventAggregator = eventAggregator;
    }

    attached() {
        if (this.element.classList.contains('first')) {
            this.positionClass = 'first';
        }
        if (this.element.classList.contains('last')) {
            this.positionClass = 'last';
        }
        
        this.element.parentElement.parentElement.appendChild(this.fixedheader);

        if (this.view.bgElement) {
            this.view.bgElement.style.height = this.element.clientHeight + 'px';
        }

        this.eventAggregator.publish('nav-section:attached', this);
    }

    viewChanged(view) {
        if (view) {
            view.setNavSection(this);
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
        if (this.view.isPeeking) {
            this.eventAggregator.publish('state:scroll-to', {
                top: this.element.offsetTop
            });
        }
        else if (this.view.isScrolling) {
            this.eventAggregator.publish('state:scroll-to', {
                top: this.element.previousElementSibling.offsetTop
            });
        }
    }
}