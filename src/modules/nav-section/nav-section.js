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
        
        if (this.fixedTopHeader) {
            this.mainContainer.appendChild(this.fixedTopHeader);
        }
        if (this.fixedBottomHeader) {
            this.mainContainer.appendChild(this.fixedBottomHeader);
        }

        if (this.view.bgElement) {
            this.view.bgElement.style.height = this.element.clientHeight + 'px';
        }

        this.eventAggregator.publish('nav-section:attached', this);

        let bgContainer = document.querySelector('.background-container');
        let height = this.element.clientHeight + 'px';
        let clone = null;

        if (bgContainer) {
            this.clone = this.element.cloneNode();
            Object.assign(this.clone.style, {
                height: height,
                minHeight: height,
                maxHeight: height
            });
            bgContainer.appendChild(this.clone);
        }

        let clientHeight = this.element.clientHeight;
        
        this.eventAggregator.subscribe('window:resize', ()=> {
            if (clientHeight !== this.element.clientHeight) {
                clientHeight = this.element.clientHeight;
                height = this.element.clientHeight + 'px';
                Object.assign(this.clone.style, {
                    height: height,
                    minHeight: height,
                    maxHeight: height
                });
            }
        });
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
        this.eventAggregator.publish('state:scroll-to-view', this.view)
    }
}