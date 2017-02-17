import {inject, useView, observable} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@useView('modules/footer/footer.html')
@inject(EventAggregator)
export class Footer {

    @observable element;

    name = 'footer';
    isVisible = false;
    background = null;
    isTitleVisisble = false;
    nodes = {};

    props = {
        title: ''
    };

    constructor(EventAggregator, State) {
        this.eventAggregator = EventAggregator;
        this.State = State;

        this.eventAggregator.subscribe('view-changed', (event)=> {
            this.handleViewChange(event);
        });
    }

    setElementProps(fn) {
        this.pendingElementProps = this.pendingElementProps || [];
        if (this.element) {
            fn();
        } else {
            this.pendingElementProps.push(fn);
        }
    }

    elementChanged(element) {
        if (element && this.pendingElementProps) {
            while(this.pendingElementProps.length) {
                this.pendingElementProps.shift()();
            }
        }
    }

    navigateForward(event) {
        event.preventDefault();
        this.eventAggregator.publish('state:view:next');
    }

    setTitle(text) {
        this.props.title = text;
    }

    setShade(primary, shade) {
        this.setElementProps(()=> {
            this.element.style.color = shade.primary;
            this.element.style.borderColor = shade.divider;
            this.element.style.backgroundColor = primary;
        })
    }

    setVisibility(isVisible) {
        this.setElementProps(()=> {
            this.element.style.setProperty('display', isVisible ? '' : 'none');
        })
    }
}