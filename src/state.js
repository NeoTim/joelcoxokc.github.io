import { observable, inject } from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
const viewPosition = {
    UP: -1,
    ACTIVE: 0,
    DOWN: 1
}

const ScrollInstruction = ()=> ({
    top: document.body.scrollTop,
    bottom: document.body.scrollTop + window.innerHeight,
    height: window.innerHeight,
});

@inject(EventAggregator)
export class State {

    @observable view = null;

    initial = true;

    views = [];

    activeViews = [];

    constructor(eventAggregator) {
        window.State = this;
        this.eventAggregator = eventAggregator;

        this.isNavigationEvent = false;

        this.eventAggregator.subscribe('state:view:back', ()=> {
           this.handleNavigateBack();
        });
        
        this.eventAggregator.subscribe('state:view:next', ()=> {
           this.handleNavigateNext();
        });

        this.eventAggregator.subscribe('state:view:set', (view)=> {
            this.isNavigationEvent = true;
            this.view = view;
        });

        this.eventAggregator.subscribe('state:scroll-to', payload => {
            if (typeof payload.top === 'number') {
                this.scrollElement.scrollTop = payload.top;
            }
        });

        this.eventAggregator.subscribe('state:scroll-to-view', view => {
            if (view.coords.top() > document.body.scrollTop + 8 || view.coords.top() < document.body.scrollTop - 8) {
                view.element.scrollIntoView();
            } else {
                let index = this.views.indexOf(view);
                if (this.views[index-1]) {
                    this.views[index-1].element.scrollIntoView();
                }
            }
        });

        this.eventAggregator.subscribe('window:scroll', (event)=> {
            this.handleScroll(event);
        });
    }

    registerView(view) {
        view.position  = viewPosition.DOWN; 
        view.isActive  = false;
        view.viewIndex = this.views.length; 

        this.views[view.name] = view;
        this.views.push(view);

        if (!this.view) {
            this.view = view;
            this.view.isVisible   = true;
            this.view.isActive    = true;
            this.view.isScrolling = true;
        }

        if (this.view && this.views.length === 2) {
            view.isPeeking = true;
        }
    }

    registerNode(options) {
        this[options.name] = options;
    }

    viewChanged(newView, lastView) {
        if (this.isNavigationEvent || this.initial) {
          // console.log(newView);
            const doc = document.documentElement;
            const scrollTop = document.body.scrollTop;
            const scrollHeight = document.body.clientHeight;
            const scrollBottom = scrollTop + scrollHeight;
            const headerHeight = 56;

            if (newView) {
                if (newView.element) {
                    newView.element.scrollIntoView();
                }
            }
            this.initial = false;
            this.isNavigationEvent = false;
        }
    }

    handleNavigateNext() {
        this.isNavigationEvent = true;

        let index = this.views.indexOf(this.view);
        let next = this.views[index + 1];
      // console.log(next)
        if (next) {
            this.view = next;
        }
    }

    handleNavigateBack() {
        let top = this.view.coords.top();
        let scrollTop = document.body.scrollTop;

        this.isNavigationEvent = true;

        if (top < (scrollTop + 8) || top > (scrollTop - 8)) {
            let viewIndex = this.views.indexOf(this.view);
            if (this.views[viewIndex-1]) {
                this.view = this.views[viewIndex-1];
            }
        } else {
            this.view.element.scrollIntoView();
        }
    }
}