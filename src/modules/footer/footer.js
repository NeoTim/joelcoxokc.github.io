import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';


@inject(EventAggregator)
export class Footer {
    constructor(EventAggregator, State) {
        this.eventAggregator = EventAggregator;
        this.State = State;

        this.eventAggregator.subscribe('view-changed', (event)=> {
            this.handleViewChange(event);
        });
    }

    setTitle(text) {
        this.title = text;
    }

    setBackground(background) {
        this.element.style.backgroundColor = background;
    }

    setTitleVisibility(isVisible) {
        this.nodes.title.style.setProperty('display', isVisible ? '' : 'none');
    }

    setVisibility(isVisible) {
        this.element.style.setProperty('display', isVisible ? '' : 'none');
    }
}