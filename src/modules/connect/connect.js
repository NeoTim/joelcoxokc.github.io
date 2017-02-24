import {inject, Factory} from 'aurelia-framework';
import {RobotUser} from 'modules/connect/robot-user';
import {DialogService} from 'resources/elements/dialog/service';

@inject(Factory.of(RobotUser), DialogService)
export class Connect {
    constructor(RobotUser, DialogService, connections) {

        this.robotUser = RobotUser();
        this.dialogService = DialogService;
        this.props = {
            private: connections.private,
            public: connections.public
        };

        this.props.handleItemClick = (event, item)=> this.handleItemClick(event, item);
    }

    handleItemClick(event, item) {
        event.preventDefault();
        if (event.target.href) {
            var win = window.open(event.target.href, '_blank');
            win.focus();
        }
    }

    validateUserIsNotARobot($event) {
        $event.preventDefault();
        this.dialogService.compose(this.robotUser).then((result)=> {
            console.log(result);
        })
    }

    attached() {
        // document.body.scrollTop = document.body.scrollHeight;
    }
}