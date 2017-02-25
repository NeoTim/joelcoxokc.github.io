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

            if (lastView) {
                lastView.isActive = false;
                doc.classList.remove(`view-${lastView.name}-active`);
                if (lastView.coords.bottom() < scrollTop + headerHeight) {
                }
            }

            
            let index = this.views.indexOf(newView);

            if (newView) {
                newView.isActive = true;
                doc.classList.add(`view-${newView.name}-active`);
                if (newView.element) {
                    newView.element.scrollIntoView();
                }
            }
            this.initial = false;
            this.isNavigationEvent = false;
        }
    }

    _updateViewPosition(scroll, view, index, views) {
        let top = view.coords.top();
        let bottom = view.coords.bottom();
        let prev = views[index-1];
        let halfScroll = scroll.top + (scroll.height / 2);
        
        view.isNext = false;
        view.hideHeaderTitle = false;

        if (prev && prev.isActive && prev.showTopbar && top > (scroll.bottom - 56)) {
            view.isNext = true;
        }

        if (bottom < (scroll.top + 8)) {
            // console.log('step 1', view.name)
            view.isActive = false;
            view.showTopbar = false;
            view.showTitle = false;
            return false;
        }

        if (top > scroll.bottom) {
            // console.log('step 2', view.name)
            view.isActive = false;
            view.showTopbar = false;
            view.showTitle = false;
            return false;
        }

        if (top > scroll.top + 8 && top < halfScroll) {
            // console.log('step 3', view.name)
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
              // console.log('step 4.2', view.name)
                view.hideHeaderTitle = false;
                view.showTitle = false;
            } else {
              // console.log('step 4', view.name)
            }
            return true;
        }

        if (top < scroll.top && bottom > (scroll.top + 56)) {
            view.isActive = false;
            view.showTitle = false;
            view.showTopbar = true;
            // console.log('step 5', view.name)
        }

        if (top > (scroll.top - 8) && top < (scroll.bottom - 56)) {
            view.showTitle = true;
            if (top > halfScroll) {
                view.isActive = false;
                view.showTopbar = false;
                // console.log('step 6.2', view.name)
            } else {
                view.isActive = true;
                view.showTopbar = false;
                // console.log('step 6', view.name)
                return true;
            }
            return false;
        }

        if (top < scroll.top + 8 && bottom > (scroll.top + 56)) {
            view.isActive = true;
            view.showTopbar = true;
            
            if (bottom < halfScroll) {
                view.isActive = false;
                // console.log('step 7.2', view.name)
            }

            if (top < scroll.top - 8) {
                view.showTitle = false;
                // console.log('step 7.3', view.name)
            } else {
                // console.log('step 7', view.name)
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

            this.header.updateSettings({
                headerFill: found.fill,
                headerShade: found.shade,
                headerTitle: found.title,
                showHeader: true,
                headerName: found.name,
                showHeaderTitle: !found.hideHeaderTitle
            });
            this.view = found;
        }

        if (prev && prev.showTopbar) {

            this.header.updateSettings({
                title: prev.title,
                showHeader: true,
                headerName: prev.name,
                headerFill: prev.fill,
                headerShade: prev.shade,
                showHeaderTitle: !prev.hideHeaderTitle
            });
        }

        if (next && next.isNext) {
            this.footer.updateSettings({
                footerFill: next.fill,
                footerShade: next.shade,
                footerName: next.name,
                footerTitle: next.title,
                showFooter: true,
                showFooterTitle: true
            });
        } else {
            this.footer.updateSettings({
                showFooter: false
            });
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

    setHeaderBackground(value) {
    }

}