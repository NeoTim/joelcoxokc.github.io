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

    viewChanged(newView, lastView) {
        const doc = document.documentElement;
        const scrollTop = document.body.scrollTop;
        const scrollHeight = document.body.clientHeight;
        const scrollBottom = scrollTop + scrollHeight;
        const headerHeight = 56;
        
        if (lastView) {
            if (lastView.coords.bottom() < scrollTop + headerHeight) {
            }
        }

        let index = this.views.indexOf(newView);

        if (newView) {
            newView.isActive = true;
        }
    }

    _updateViewPosition(scroll, view, index, views) {
        let top = view.coords.top();
        let bottom = view.coords.bottom();
        let prev = views[index-1];
        let halfScroll = scroll.top + (scroll.height / 2);
        
        view.isNext = false;
        view.hideHeaderTitle = false;

        if (prev && prev.isActive && prev.showTopbar) {
            view.isNext = true;
        }

        if (bottom < (scroll.top + 8)) {
            view.isActive = false;
            view.showTopbar = false;
            view.showTitle = false;
            return false;
        }

        if (top > scroll.bottom) {
            view.isActive = false;
            view.showTopbar = false;
            view.showTitle = false;
            return false;
        }

        if (top > scroll.top + 8 && top < halfScroll) {
            view.isActive = true;
            view.showTitle = true;
            view.showTopbar = false;
            return true;
        }

        if (top < scroll.top + 8 && bottom > halfScroll) {
            view.isActive = true;
            view.showTitle = true;
            view.showTopbar = true;
            view.hideHeaderTitle = true;

            if (top < scroll.top - 8) {
                view.hideHeaderTitle = false;
                view.showTitle = false;
            }
            return true;
        }

        if (top < scroll.top && bottom > (scroll.top + 56)) {
            view.isActive = false;
            view.showTitle = false;
            view.showTopbar = true;
        }

        if (top > (scroll.top - 8) && top < (scroll.bottom - 56)) {
            view.showTitle = true;
            if (top > halfScroll) {
                view.isActive = false;
                view.showTopbar = false;
            } else {
                view.isActive = true;
                return true;
                view.showTopbar = false;
            }
            return false;
        }

        if (top < scroll.top + 8 && bottom > (scroll.top + 56)) {
            view.isActive = true;
            view.showTopbar = true;
            
            if (bottom < halfScroll) {
                view.isActive = false;
            }

            if (top < scroll.top - 8) {
                view.showTitle = false;
            } else {
                view.showTitle = true;
            }
            return true;
        }
    }

    handleScroll(event) {
        let scroll = ScrollInstruction();
        let views  = this.views;
        let view   = null;
        let found  = null;
        let next   = null;
        let prev   = null;

        let index  = 0;
        while(view = views[index++]) {
            view.isActive = false;
            view.isNext = false;
        }

        index = 0;
        view = null;

        while(view = views[index++]) {
            if (this._updateViewPosition(scroll, view, index-1, views)) {
                found = view;
                prev = views[index-2];
                continue;
            }
            
            if (found && !next) {
                next = view;
            }
        }

        if (found && found.isActive && found.showTopbar) {
            this.app.header.setBackground(found.getBackground());
            this.app.header.setTitle(found.title);
            this.app.header.setTitleVisibility(!found.hideHeaderTitle);
            this.app.header.setVisibility(true);
        }

        if (prev & prev.showTopbar) {
            this.app.header.setBackground(prev.getBackground());
            this.app.header.setTitle(prev.title);
            this.app.header.setTitleVisibility(!found.hideHeaderTitle);
            this.app.header.setVisibility(true);
        }

        if (next && next.isNext) {
            this.app.footer.setTitle(next.title);
            this.app.footer.setBackground(next.getBackground());
            this.app.footer.setVisibility(true);
        } else {
            this.app.footer.setVisibility(false);
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