import { observable, inject } from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
const viewPosition = {
    UP: -1,
    ACTIVE: 0,
    DOWN: 1
}

@inject(EventAggregator)
export class State {

    @observable view = null;

    views = [];

    activeViews = [];

    constructor(eventAggregator) {
        this.eventAggregator = eventAggregator;

        this.eventAggregator.subscribe('state:set:view', (view)=> {
            this.view = view;
        });

        this.eventAggregator.subscribe('state:scroll-to', payload => {
            if (typeof payload.top === 'number') {
                this.scrollElement.scrollTop = payload.top;
            }
        });
    }

    viewChanged(view, lastView) {
        console.log(view);
        if (view) {
            let position = view.position;
            let leavePosition;
            let enterPosition;
            let leaveAnimation;
            let enterAnimation;
            let leaveClass;
            let enterClass;

            if (position === viewPosition.DOWN) {
                leavePosition = viewPosition.UP;
                enterPosition = viewPosition.ACTIVE;
                leaveAnimation = 'animate-view-active-to-up';
                enterAnimation = 'animate-view-down-to-active';
                leaveClass     = 'view-up';
                enterClass     = 'view-active';
            }
            else if (position === viewPosition.UP) {
                leavePosition = viewPosition.DOWN;
                enterPosition = viewPosition.ACTIVE;
                leaveAnimation = 'animate-view-active-to-down';
                enterAnimation = 'animate-view-up-to-active';
                leaveClass     = 'view-down';
                enterClass     = 'view-active';
            }
            
            if (lastView) {
                let listener = null;
                let position = lastView.position;
                
                lastView.element.addEventListener('animationend', listener = (event)=> {
                    lastView.isActive = false;
                    lastView.position = leavePosition;
                    lastView.element.removeEventListener('animationend', listener);
                    lastView.element.classList.add(leaveClass);
                    lastView.element.classList.remove(leaveAnimation);
                });
                lastView.element.classList.remove('view-up', 'view-down', 'view-active');
                lastView.element.classList.add(leaveAnimation);
            }

            if (!this.isInitial) {
                this.isInitial = true;
                view.isActive = true;
                view.position = enterPosition;
            } else {
                let listener = null;
                view.element.addEventListener('animationend', listener = (event)=> {
                    view.element.removeEventListener('animationend', listener);
                    view.isActive = true;
                    view.position = enterPosition;
                    view.element.classList.add(enterClass);
                    view.element.classList.remove(enterAnimation);
                });
                view.element.classList.remove('view-up', 'view-down', 'view-active');
                view.element.classList.add(enterAnimation);
            }
        }
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

    setHeaderBackground(value) {
    }

}