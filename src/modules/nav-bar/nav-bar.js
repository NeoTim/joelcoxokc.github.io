import { inject, customElement, bindable } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';

@customElement('nav-bar')
@inject(Element, EventAggregator)
export class NavBar {

    @bindable state = null;

    navigation = [];

    constructor(element, eventAggregator) {
        this.element = element;
        this.eventAggregator = eventAggregator;
        this.sections = [

        ];
    }

    bind() {
        this.subscription = this.eventAggregator.subscribe('nav-section:attached', (payload) => {
            if (!this.isNavSectition(payload)) {
                return;
            }

            if (this.checkIfNavExists(payload)) {
                return;
            }

            this.navigation.push(payload);
            console.log(this.navigation);
        });
    }

    unbind() {
        this.navigation = [];
        if (this.subscription) {
            this.subscription.dispose();
        }
    }

    attached() {
        return;
        window.onscroll = (event) => {
            window.requestAnimationFrame(() => {
                this.handleScrollEvent(event);
            });
        }
    }

    isNavSectition(payload) {
        if (payload.hasOwnProperty('element') && payload.element instanceof Element) {
            return true;
        }
        return false;
    }

    checkIfNavExists(nav) {
        const index = this.navigation.indexOf(nav);
        if (~index) {
            return true;
        }
        return false;
    }

    handleScrollEvent(event) {
        let scrollElement = document.body;
        let current;
        let next;
        let index = 0;
        while (current = this.navigation[index++]) {
            next = this.navigation[index];

            if (next && scrollElement.scrollTop > current.element.offsetTop && scrollElement.scrollTop < next.element.offsetTop) {
                break;
            }
            if (current.element.offsetTop < scrollElement.scrollTop && next.element.offsetTop > scrollElement.scrollTop) {
                break;
            }
        }
    }
}