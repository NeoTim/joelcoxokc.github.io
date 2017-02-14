import {inject, bindable, customElement} from 'aurelia-framework';
import {State} from 'state';
import {EventAggregator} from 'aurelia-event-aggregator';

@customElement('navigation')
@inject(Element, EventAggregator, State)
export class Navigation {
    
    @bindable visibility = false;

    constructor(Element, EventAggregator, State) {
        this.element = Element;
        this.eventAggregator = EventAggregator;
        this.State = State;
    }

    bind() {
        this.eventAggregator.subscribe('state:navigation:toggle', ()=> {
            this.visibility = !this.visibility;
        })
        this.views = this.State.views.filter(view => view.hasOwnProperty('title'));
    }

    visibilityChanged(value) {
        if (value) {
            this.showNavigation();
        } else {
            this.hideNavigation();
        }
    }

    navigateToView(view) {
        this.eventAggregator.publish('state:scroll-to', {
            top: view.navSection.element.offsetTop + 1
        });
    }

    showNavigation() {
        let listener;
        let element = this.State.container;

        element.addEventListener('animationend', listener = (event)=> {
            element.classList.add('offset-main-right');
            element.classList.remove('animate-main-right');
            element.removeEventListener('animationend', listener);
        }, true);

        element.classList.add('animate-main-right');
    }

    hideNavigation() {
        let listener;
        let element = this.State.container;

        element.addEventListener('animationend', listener = (event)=> {
            element.classList.remove('offset-main-right');
            element.classList.remove('animate-main-default');
            element.removeEventListener('animationend', listener);
        }, true);

        element.classList.add('animate-main-default');
    }
}