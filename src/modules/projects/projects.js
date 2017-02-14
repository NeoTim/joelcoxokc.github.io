import {inject} from 'aurelia-framework';

export class Projects {
    constructor(projects) {
        this.props = {
            projects: projects.list
        }
        console.log(this.props.projects)
    }
}