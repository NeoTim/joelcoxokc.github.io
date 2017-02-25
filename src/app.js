import { inject, Factory, observable } from 'aurelia-framework';
import { Header } from 'resources/header/header';
import { Footer } from 'resources/footer/footer';
import { Enums } from 'core/enums';
import { State } from './state';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Util } from 'core/util';
import { Color } from 'core/color';
import { Resume } from 'resume/index';
import { Settings } from 'core/settings';
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
    EventAggregator,
    Factory.of(Header),
    Factory.of(Footer),
    Factory.of(Resume)
)
export class App {

    @observable view;

    constructor(Util, State, Enums, EventAggregator, Header, Footer, Resume) {

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

        this.resume = Resume();

        this.resume.views.forEach(view => State.registerView(view));
    }

    configureRouter(config, router) {
        const view1 = this.State.views[0];
        const view2 = this.State.views[1];
        
        const resumeSettings = new Settings({
            showFooter: true,
            showHeader: true,
            headerTitle: view1.title,
            footerTitle: view2.title,
            showHeaderTitle: true,
            showFooterTitle: true,
            headerShade: view1.shade,
            footerShade: view2.shade,
        });

        const blogSettings = new Settings({
            showHeader: true,
            headerTitle: 'Joel Cox\'s Blog',
            showHeaderTitle: true,
            headerShade: Color.tan,
        });

        config.map([
            {
                route: ['', 'resume'],
                name: 'resume',
                title: 'Resume',
                moduleId: 'resume/index',
                nav: true,
                icon: 'folder_special',
                settings: resumeSettings
            },
            {
                route: 'blog',
                name: 'blog',
                title: 'Blog',
                moduleId: 'blog/index',
                nav: true,
                icon: 'library_books',
                settings: blogSettings
            }
        ]);

        this.router = router;
    }

    bind() {
        let first = this.State.views[0];
        let next  = this.State.views[1];
        first.isActive = true;
        first.showTopbar = true;
        first.hideHeaderTitle = true;
        next.isNext = true;

        this.eventAggregator.publish('state:view:set', first);
    }

    attached() {
        this.State.scrollElement = document.body;
        const container = document.querySelector('container');
        const sections = document.querySelectorAll('container > main > nav-section');

        window.onresize = (event)=> {
            
        }

        window.onscroll = (event)=> {
            this.eventAggregator.publish('window:scroll', event);
        }
    }
}