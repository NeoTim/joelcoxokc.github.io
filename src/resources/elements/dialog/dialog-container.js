import {inject, customElement} from 'aurelia-framework';
import {DialogResult} from 'resources/elements/dialog/dialog-result';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(Element, EventAggregator)
export class DialogContainer {
    constructor(element, EventAggregator) {
        this.element = element;
        this.eventAggregator = EventAggregator;
        
        let self = this;
        this.dialogModel = {
            cancel() {
                return self.determinCancelation({wasCancelled: true});
            },
            close(value) {
                return self.determinCancelation({wasCancelled : !!value || true, result: value});
            },
            ok(value) {
                return self.determinCancelation({wasCancelled: false, result: value})
            }
        };

        this.eventAggregator.subscribe('dialog:compose', instruction => {
            this.currentInstruction = instruction;
            let resolve = instruction.resolve;
            instruction.resolve = (...a)=> {
                this.currentInstruction = null;
                return resolve(...a);
            }
        });

        this.eventAggregator.subscribe('dialog:cancel', ()=> {
            this.dialogModel.cancel();
        });
        this.eventAggregator.subscribe('dialog:close', (payload)=> {
            this.dialogModel.close(payload);
        });
        this.eventAggregator.subscribe('dialog:ok', (payload)=> {
            this.dialogModel.ok(payload);
        });
    }

    determinCancelation(result) {
        result = new DialogResult(result);
        let currentInstruction = this.currentInstruction;
        if (currentInstruction) {
            this.currentInstruction = null;
            return currentInstruction.resolve(result);
        }
        return Promise.resolve(result);
    }
}