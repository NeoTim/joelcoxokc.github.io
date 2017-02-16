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
        console.log(value)
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
        console.log('showing');
        let listener;
        let container = document.querySelector('container');
        let main = document.querySelector('main');

        container.classList.remove('hide-navigation');
        container.classList.remove('hiding-navigation');
        
        container.addEventListener('animationend', listener = (event)=> {
            container.classList.add('show-navigation');
            container.classList.remove('showing-navigation');
            container.removeEventListener('animationend', listener);
            console.log('animationend show')
        });

        container.classList.add('showing-navigation');

        this.resizeListener = this.eventAggregator.subscribe('window:resize', ()=> {
            this.visibility = false;
        });

        main.addEventListener('mousedown', this.clickListener = (event)=> {
            event.preventDefault();
            event.stopPropagation();
            this.visibility = false;
            console.log('click')
        }, true);

        main.addEventListener('touchstart', this.touchListener = (event)=> {
            event.preventDefault();
            event.stopPropagation();
            this.visibility = false;
            console.log('click')
        }, true);
    }

    hideNavigation() {
        console.log('hiding');
        let listener;
        let container = document.querySelector('container');
        let main = document.querySelector('main');

        this.resizeListener.dispose();
        main.removeEventListener('mousedown', this.clickListener, true);
        main.removeEventListener('touchstart', this.touchListener, true);

        container.classList.remove('show-navigation');
        container.classList.remove('showing-navigation');

        container.addEventListener('animationend', listener = (event)=> {
            container.classList.remove('hiding-navigation');
            container.removeEventListener('animationend', listener);
            console.log('animationend hide')
        });

        container.classList.add('hiding-navigation');
    }
}