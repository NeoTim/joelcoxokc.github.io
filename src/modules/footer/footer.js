import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';


@inject(EventAggregator)
export class Footer {
    constructor(EventAggregator, State) {
        this.eventAggregator = EventAggregator;
        this.State = State;

        this.eventAggregator.subscribe('view-changed', (view)=> {
            
        });
    }
}