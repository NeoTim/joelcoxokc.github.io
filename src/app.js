import { inject, Factory, observable } from 'aurelia-framework';
import { Header } from 'modules/header/header';
import { Footer } from 'modules/footer/footer';
import { Title } from 'modules/title/title';
import { Profile } from 'modules/profile/profile';
import { Projects } from 'modules/projects/projects';
import { Technology } from 'modules/technology/technology';
import { Experience } from 'modules/experience/experience';
import { Education } from 'modules/education/education';
import { Enums } from 'core/enums';
import { State } from './state';
import {EventAggregator} from 'aurelia-event-aggregator';
import {View} from 'core/view';
import {Util} from 'core/util';
import {Color} from 'core/color';

const props = {
    fullName: 'Joel Cox',
    bday: '09/11/1990',
    email: 'joel.cox.dev@gmail.com',
    phone: '(405) 388-7691'
};

@inject(
    Util,
    State,
    Enums,
    Color,
    EventAggregator,
    Factory.of(Header),
    Factory.of(Footer),
    Factory.of(Title),
    Factory.of(Profile),
    Factory.of(Technology),
    Factory.of(Projects),
    Factory.of(Experience),
    Factory.of(Education)
)
export class App {

    @observable view;

    constructor(Util, State, Enums, Color, EventAggregator, Header, Footer, Title, Profile, Technology, Projects, Experience, Education) {

        this.State = State;
        this.props = props;
        this.Util  = Util;
        this.Color = Color;
        this.eventAggregator = EventAggregator;

        State.registerNode(
            this.header = Header()
        );

        State.registerNode(
            this.footer = Footer()
        );

        State.registerView(
            new View({
                name: 'title',
                icon: 'home',
                fill: Color.tan,
                shade: Color.dark,
                viewModel: Title({
                    title: props.fullName,
                    summary: 'UI & UX Architect, Engineer & Designer'
                })
            })
        );

        State.registerView(
            new View({
                title: 'Profile',
                name: 'profile',
                icon: 'person',
                fill: Color.blue,
                shade: Color.light,
                viewModel: Profile(Enums.Profile, State)
            })
        );


        State.registerView(
            new View({
                title: 'Projects',
                name: 'projects',
                icon: 'screen_share',
                fill: Color.teal,
                shade: Color.dark,
                viewModel: Projects(Enums.Projects, State)
            })
        );

        State.registerView(
            new View({
                title: 'Experience',
                name: 'experience',
                icon: 'verified_user',
                fill: Color.tan,
                shade: Color.dark,
                viewModel: Experience(Enums.Experience, State)
            })
        );
        
        State.registerView(
            new View({
                title: 'Education',
                name: 'education',
                icon: 'school',
                fill: Color.brown,
                shade: Color.light,
                viewModel: Education(Enums.Education, State)
            })
        );

        State.registerView(
            new View({
                title: 'Technology',
                name: 'technology',
                icon: 'layers',
                fill: Color.tan,
                shade: Color.dark,
                viewModel: Technology(Enums.Technology, State)
            })
        );
    }

    bind() {
        let first = this.State.views[0];
        let next  = this.State.views[1];
        first.isActive = true;
        first.showTopbar = true;
        first.hideHeaderTitle = true;
        next.isNext = true;

        this.header.setShade(first.fill, first.shade);
        this.header.setTitleVisibility(!first.hideHeaderTitle);
        this.header.setVisibility(true, first.name);

        this.footer.setTitle(next.title);
        this.footer.setShade(next.fill, next.shade);
        this.footer.setVisibility(true);

        this.eventAggregator.publish('state:view:set', first);
    }

    attached() {
        this.State.scrollElement = document.body;
        const container = document.querySelector('container');
        const sections = document.querySelectorAll('container > main > nav-section');

        

        // let index = 0;
        // let section = null;
        // console.log(sections)
        // while(section = sections[index++]) {
        //     section.style.height = container.clientHeight + 'px';
        // }

        // this.State.views[0].isActive = true;
        const target = this.State.scrollElement || document.body;

        let updateView = (view, index, views)=> {
            let top = document.body.scrollTop;
            let height = document.body.clientHeight;
            let bottom = top + height;

            view.updatePosition({top, height, bottom}, index, views);
        }

        let viewset = [];

        this.initialWindowHeight = window.innerHeight;

        window.onresize = (event)=> {
            // this.Util.onResizeComplete().then((complete)=> {
            //     if (complete) {
            //         this.State.views.forEach(updateView);
            //         this.eventAggregator.publish('window:resize');
            //     }
            // })
        }

        window.onscroll = (event)=> {

            
            this.eventAggregator.publish('window:scroll', event);
            return;

            let bodyHeight = window.innerHeight;
            let halfBodyHeight = bodyHeight / 2;
            let scrollBottom = target.scrollTop + bodyHeight;
            let scrollTop = Math.ceil(target.scrollTop);
            let index = 0;
            let view;
            let prev;
            let next;
            let found;

            let scroll = {
                top    : scrollTop,
                height : window.innerHeight,
                bottom : scrollBottom
            };

            let views = this.State.views;
            let current = null;
            

            while(view = this.State.views[index]) {
                view.isActive = false;
                view.isNext = false;
                index++;
            }

            index = 0;
            
            while(view = this.State.views[index]) {
                if (this.updatePosition(scroll, view, index, views)) {
                    current = view;
                }
                view.updateState();
                index++;
            }
        }
    }

    updatePosition(scroll, view, index, views) {
        let top = view.coords.top();
        let bottom = view.coords.bottom();
        let prev = views[index-1];
        let halfScroll = scroll.top + (scroll.height / 2);
        
        view.isNext = false;
        view.hideHeaderTitle = false;

        if (prev && prev.isActive && prev.showTopbar) {
            view.isNext = true;
        }

        if (bottom < (scroll.top + 8)) {
            view.isActive = false;
            view.showTopbar = false;
            view.showTitle = false;
            return false;
        }

        if (top > scroll.bottom) {
            view.isActive = false;
            view.showTopbar = false;
            view.showTitle = false;
            return false;
        }

        if (top > scroll.top + 8 && top < halfScroll) {
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
                view.hideHeaderTitle = false;
                view.showTitle = false;
            }
            return true;
        }

        if (top < scroll.top && bottom > (scroll.top + 56)) {
            view.isActive = false;
            view.showTitle = false;
            view.showTopbar = true;
        }

        if (top > (scroll.top - 8) && top < (scroll.bottom - 56)) {
            view.showTitle = true;
            if (top > halfScroll) {
                view.isActive = false;
                view.showTopbar = false;
            } else {
                view.isActive = true;
                return true;
                view.showTopbar = false;
            }
            return false;
        }

        if (top < scroll.top + 8 && bottom > (scroll.top + 56)) {
            view.isActive = true;
            view.showTopbar = true;
            
            if (bottom < halfScroll) {
                view.isActive = false;
            }

            if (top < scroll.top - 8) {
                view.showTitle = false;
            } else {
                view.showTitle = true;
            }
            return true;
        }
    }
}