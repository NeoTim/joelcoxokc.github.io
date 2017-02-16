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
import {EventAggregator} from 'aurelia-event-aggregator';
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

    constructor(State, Enums, EventAggregator, Header, Footer, Title, Profile, Technology, Projects, Experience, Education) {

        this.State = State;
        this.props = props;

        this.State.header = Header(this.State);
        this.State.footer = Footer(this.State);

        this.eventAggregator = EventAggregator;

        State.registerView(
            new View({
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

        let resetViewsAtIndex = (index)=> {
            let view;
            while(view = this.State.views[index++]) {
                view.isActive    = false;
                view.isVisible   = false;
                view.isPeeking   = false;
                view.isScrolling = false;
            }
        }

        let updateView = (view, index, views)=> {
            let top = document.body.scrollTop;
            let height = document.body.clientHeight;
            let bottom = top + height;

            view.updatePosition({top, height, bottom}, index, views);
        }

        let viewset = [];

        window.onresize = (event)=> {
            this.eventAggregator.publish('window:resize');
        }

        window.onscroll = (event)=> {
            let bodyHeight = target.clientHeight;
            let halfBodyHeight = bodyHeight / 2;
            let scrollBottom = target.scrollTop + target.clientHeight;
            let scrollTop = Math.ceil(target.scrollTop);
            let index = 0;
            let view;
            let prev;
            let next;
            let found;


            let scroll = {
                top    : scrollTop,
                height : bodyHeight,
                bottom : scrollBottom
            };

            let views = this.State.views;
            views.forEach((view, index)=> {
                view.updatePosition(scroll, index, views);
            })

            return;

            // If scrolled to top, choose the first view
            if (scrollTop === 0) {
                found = this.State.views[0]; 
                
                next = this.State.views[1];

                this.State.views.slice(2).forEach(view => view.reset());
            } else {
                // reset all views
                this.State.views.slice(2).forEach(view => view.reset());

                while(view = this.State.views[index++]) {

                    let viewTop = view.coords.top();
                    let viewBottom = view.coords.bottom();
                    let props = {};
                    
                    if (found && !next) {
                        next = view;
                        continue;
                    }

                    if (viewTop >= (scrollTop - 10) && viewTop <= (scrollTop + 10)) {
                        found = view;
                        continue;
                    }

                    if (viewBottom < scrollTop) {
                        view.reset();
                        continue;
                    }
                    
                    if (viewTop <= scrollTop && viewBottom >= (scrollTop + 56)) {
                        found = view;
                        continue;
                    }
                    if (!found && viewTop > scrollTop && viewTop < scrollBottom) {
                        found = view;
                        continue;
                    }

                    view.reset();
                }
            }

            if (found) {
                if (this.viewClass) {
                    document.documentElement.classList.remove(this.viewClass);
                }
                this.viewClass = found.name + '-view';
                document.documentElement.classList.add(this.viewClass)
                this.State.view = found;
                
                let props = {
                    isActive: true,
                }
                
                if (found.coords.top() >= (scrollTop - 10) && found.coords.top() <= (scrollTop + 10)) {
                } else {
                    props.isTop = true;
                    props.alignTitleLeft = true;
                    props.showDirectionIcon = true;
                }
                found.reset(props);
            }

            if (next) {
                if (next.coords.top() <= (scrollBottom - 56)) {
                    document.documentElement.classList.add('next-in-view');
                } else {
                    document.documentElement.classList.remove('next-in-view');
                }
            }
        }

        this.State.views.forEach(updateView)
    }
}