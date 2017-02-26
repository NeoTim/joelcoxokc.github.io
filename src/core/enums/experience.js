import {WorkEnums} from './work';
import {ProjectEnums} from './projects';


export class ExperienceEnums {
    static inject = [WorkEnums, ProjectEnums];

    constructor(work, projects) {

        this.list = work.list.concat(projects.list).sort((a,b)=> {
            if (a.order < b.order) return 1;
            return -1;
        });

        this.processList();
        console.log('created')
    }

    processList() {
        this.list.forEach(item => {

            if (item.image) {
                item.image = '/scripts/logos/' + item.image;
            }
        });
    }
}