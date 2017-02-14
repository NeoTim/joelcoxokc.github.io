import { inject, Factory } from 'aurelia-framework';
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

import {View} from 'core/view';

const props = {
    fullName: 'Joel Cox',
    bday: '09/11/1990',
    email: 'joel.cox.dev@gmail.com',
    phone: '(405) 388-7691'
};

@inject(
    State,
    Enums,
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

    constructor(State, Enums, Header, Footer, Title, Profile, Technology, Projects, Experience, Education) {

        this.State = State;
        this.props = props;

        this.State.header = Header(this.State);
        this.State.footer = Footer(this.State);

        State.registerView(
            new View({
                title: 'Joel Cox',
                name: 'title',
                icon: 'home',
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
                viewModel: Profile(Enums.Profile, State)
            })
        );


        State.registerView(
            new View({
                title: 'Projects',
                name: 'projects',
                icon: 'screen_share',
                viewModel: Projects(Enums.Projects, State)
            })
        );

        State.registerView(
            new View({
                title: 'Experience',
                name: 'experience',
                icon: 'verified_user',
                viewModel: Experience(Enums.Experience, State)
            })
        );
        
        State.registerView(
            new View({
                title: 'Education',
                name: 'education',
                icon: 'school',
                viewModel: Education(Enums.Education, State)
            })
        );

        State.registerView(
            new View({
                title: 'Technology',
                name: 'technology',
                icon: 'layers',
                viewModel: Technology(Enums.Technology, State)
            })
        );
    }

    attached() {
        const container = document.querySelector('container');
        const sections = document.querySelectorAll('container > main > nav-section');

        // let index = 0;
        // let section = null;
        // console.log(sections)
        // while(section = sections[index++]) {
        //     section.style.height = container.clientHeight + 'px';
        // }

        // this.State.views[0].isActive = true;
        const target = this.State.scrollElement;

        let resetViewsAtIndex = (index)=> {
            let view;
            while(view = this.State.views[index++]) {
                view.isActive    = false;
                view.isVisible   = false;
                view.isPeeking   = false;
                view.isScrolling = false;
            }
        }
        target.onscroll = (event)=> {

            let scrollBottom = target.scrollTop + target.clientHeight;
            let scrollTop = Math.ceil(target.scrollTop);
            let index = 0;
            let view;
            let next;

            if (scrollTop === 0) {
                view = this.State.views[0];
                
                view.isActive    = true;
                view.isVisible   = true;
                view.isPeeking   = false;
                view.isScrolling = true;

                this.State.view = view;

                next = this.State.views[1];

                next.isActive    = false;
                next.isVisible   = false;
                next.isPeeking   = true;
                next.isScrolling = false;

                resetViewsAtIndex(2);
                return;
            }

            resetViewsAtIndex(0);

            while(view = this.State.views[index++]) {
                next = this.State.views[index];


                let bottom = view.element.offsetTop + view.element.clientHeight;
                let offset = view.element.offsetTop - scrollTop;
                let backset = (view.element.offsetTop + view.element.clientHeight) - scrollTop;


                // Is View Scrolling
                if (scrollTop < bottom && scrollTop >= view.element.offsetTop) {
                    view.isScrolling = true;
                    view.isActive    = true;
                    view.isVisible   = true;
                    view.isPeeking   = false;

                    this.State.view = view;

                    if (next) {
                        if (next.element.offsetTop >= scrollTop) {
                            next.isVisible   = false;
                            next.isPeeking   = true;
                            next.isActive    = false;
                            next.isScrolling = false;

                            if (next.element.offsetTop <= (scrollTop + (target.clientHeight - 56))) {
                                next.isPeeking = false;
                                next.isVisible = true;
                            }

                            if (next.element.offsetTop <= (scrollTop + (target.clientHeight / 2))) {

                                next.isPeeking   = false;
                                next.isVisible   = true;
                                next.isActive    = true;
                                next.isScrolling = false;

                                next = this.State.views[index+1];
                                if (next) {
                                    next.isPeeking   = true;
                                    next.isActive    = false;
                                    next.isScrolling = false;
                                    next.isVisible   = false;
                                    resetViewsAtIndex(index+3);
                                    break;
                                }
                            }

                            resetViewsAtIndex(index+3);
                            break;

                        } else {
                            next.isPeeking   = true;
                            next.isVisible   = false;
                            next.isActive    = false;
                            next.isScrolling = false;
                        }

                        resetViewsAtIndex(index+2);
                        break;
                    }
                }

                else if (bottom < scrollTop) {
                    view.isActive    = true;
                    view.isVisible   = false;
                    view.isPeeking   = false;
                    view.isScrolling = false;
                }
                else {
                    resetViewsAtIndex(index);
                    view.isActive = false;
                    view.isPeeking = false;
                    view.isVisible = false;
                    view.isScrolling = false;
                }
            }
        }
    }

}