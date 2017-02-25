import {inject} from 'aurelia-framework';
import {State} from 'state';

@inject(State)
export class Blogs {
    constructor(State) {
        this.State = State;

        this.State.title = 'Blog';
    }
}