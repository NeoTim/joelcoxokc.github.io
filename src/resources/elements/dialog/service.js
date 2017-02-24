import {transient, inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@transient()
@inject(EventAggregator)
export class DialogService {
    constructor(EventAggregator) {
        this.eventAggregator = EventAggregator;
    }

    compose(viewModel) {
        return new Promise(resolve => {
            let instruction = {
                viewModel: viewModel,
                resolve: resolve,
            };
            this.eventAggregator.publish('dialog:compose', instruction);
        })
    }

    cancel() {
        this.eventAggregator.publish('dialog:cancel');
    }

    close(value) {
        this.eventAggregator.publish('dialog:close', value);
    }

    ok(value) {
        this.eventAggregator.publish('dialog:ok', value);
    }
}