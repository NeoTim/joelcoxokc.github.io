import {inject, bindable, customElement} from 'aurelia-framework';
import {State} from 'state';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Router} from 'aurelia-router';

@customElement('navigation')
@inject(Element, EventAggregator, State, Router)
export class Navigation {
    
    @bindable visibility = false;
    @bindable instruction = null;

    props = {
        fill: '#FFFFFF',
        activeTint: ''
    };

    currentFill = null;
    currentTint = '';
    otherRoute = null;

    settings = {};

    constructor(Element, EventAggregator, State, Router) {
        this.element = Element;
        this.eventAggregator = EventAggregator;
        this.State = State;
        this.router = Router;

        this.eventAggregator.subscribe('navigation:props', (props) => {
            Object.assign(this.props, props);
            this.currentFill = this.props.fill;
            this.currentTint = this.props.activeTint;
        });

        this.eventAggregator.subscribe('router:navigation:complete', (payload) => {
            this.settings = payload.instruction.config.settings;
            this.updateSettings(this.settings);
        });
    }

    bind() {
        this.eventAggregator.subscribe('navigation:toggle', ()=> {
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

    instructionChanged(instruction, last) {
        if (instruction) {
            this.otherRoute = this.router.navigation.filter(nav => nav.title !== instruction.config.title)[0];
        }
    }

    updateSettings(settings) {
        this.currentFill = settings.headerShade.fill;
        this.currentTint = settings.headerShade.primary;
    }

    navigateToView(view) {
        this.eventAggregator.publish('state:view:set', view);
    }

    showNavigation() {
        console.log('showing');
        let listener;
        let container = document.querySelector('container');
        let main = document.querySelector('main');

        // container.classList.remove('hide-navigation');
        // container.classList.remove('hiding-navigation');
        
        container.addEventListener('transitionend', listener = (event)=> {
            if (event.target === container) {
                // container.classList.add('show-navigation');
                // container.classList.remove('showing-navigation');
                container.removeEventListener('transitionend', listener);
                console.log('animationend show')
            }
        });

        container.style.transition = 'transform 0.25s ease-out';
        
        window.requestAnimationFrame(()=> {
            container.style.transform = 'translateX(200px)'
        })

        // container.classList.add('showing-navigation');

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

        // container.classList.remove('show-navigation');
        // container.classList.remove('showing-navigation');

        container.addEventListener('transitionend', listener = (event)=> {
            if (event.target === container) {
                // container.classList.remove('hiding-navigation');
                container.style.transform = '';
                container.removeEventListener('transitionend', listener);
                console.log('animationend hide')
            }
        });

        container.style.transition = 'transform 0.25s ease-in';
        
        window.requestAnimationFrame(()=> {
            container.style.transform = 'translateX(0px)'
        })

        // container.classList.add('hiding-navigation');
    }
}