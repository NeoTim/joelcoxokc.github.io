import {inject, Factory} from 'aurelia-framework';
import {Title} from './title/title';
import {Profile} from './profile/profile';
import {Projects} from './projects/projects';
import {Experience} from './experience/experience';
import {Education} from './education/education';
import {Technology} from './technology/technology';
import {Connect} from './connect/connect';
import {Enums} from 'core/enums';
import {State} from 'state';
import {View} from 'core/view';
import {Color} from 'core/color';
import {EventHandler} from 'core/event-handler';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(
    Enums,
    State,
    EventHandler,
    EventAggregator,
    Factory.of(Title),
    Factory.of(Profile),
    Factory.of(Projects),
    Factory.of(Experience),
    Factory.of(Education),
    Factory.of(Technology),
    Factory.of(Connect),
)
export class Resume {

    transforms = [];

    constructor(Enums, State, EventHandler, EventAggregator, Title, Profile, Projects, Experience, Education, Technology, Connect) {
        this.State = State;
        this.EventHandler = EventHandler;
        this.EventAggregator = EventAggregator;
        this.State.title = 'Resume';
        this.views = [
            new View({
                name: 'title',
                icon: 'home',
                shade: Color.tan,
                viewModel: Title({
                    title: 'Joel Cox',
                    summary: 'UI & UX Architect, Engineer & Designer'
                })
            }),
            new View({
                title: 'Profile',
                name: 'profile',
                icon: 'person',
                shade: Color.blue,
                viewModel: Profile(Enums.Profile, State)
            }),
            new View({
                title: 'Projects',
                name: 'projects',
                icon: 'screen_share',
                shade: Color.tan,
                viewModel: Projects(Enums.Projects, State)
            }),
            new View({
                title: 'Experience',
                name: 'experience',
                icon: 'verified_user',
                shade: Color.teal,
                viewModel: Experience(Enums.Experience, State)
            }),
            new View({
                title: 'Education',
                name: 'education',
                icon: 'school',
                shade: Color.tan,
                viewModel: Education(Enums.Education, State)
            }),
            new View({
                title: 'Technology',
                name: 'technology',
                icon: 'layers',
                shade: Color.brown,
                viewModel: Technology(Enums.Technology, State)
            }),
            new View({
                title: 'Connect',
                name: 'connect',
                icon: 'share',
                shade: Color.tan,
                viewModel: Connect(Enums.Connect, State)
            })
        ]
    }

    attached() {
        this.EventHandler.onscroll(this.handleViewPortScroll());
        
        this.views.forEach(view => {
            if (!view.element) {
                view.element = document.querySelector(`.app-${view.name}`);
            }
        })
    }

    handleViewPortScroll() {
        
        let getSections;
        let navsections = [];
        let setAttr;
        let removeAttr;
        let getTransforms;
        let afterScrollTimeout;
        let getTitleTransform;
        let doc = document.documentElement;
        let sections = [];
        
        getSections = ()=> {
            return navsections = navsections.length ? navsections : Array.from(document.querySelectorAll('nav-section'));
        }

        setAttr = (name, value) => {
            doc.setAttribute(name, value);
        }

        removeAttr = (name)=> {
            doc.removeAttribute(name);
        }

        let currentE = null;
        let isTimeout = false;
        let currentTimeout = null;
        afterScrollTimeout = (callback, extended = 0)=> {
            if (isTimeout && currentTimeout) {
                currentTimeout.cancel();
            }

            isTimeout = true;
            currentTimeout = cycle(currentE);
            
            function cycle(animE) {

                let isCancelled = false;

                if (!animE) {
                    return window.requestAnimationFrame(()=> {
                        !isCancelled && cycle(currentE);
                    });
                }

                if (animE && animE.scroll.top !== currentE.scroll.top) {
                    return window.requestAnimationFrame(()=> {
                        !isCancelled && cycle(currentE);
                    });
                }
                
                let id = setTimeout(()=> {
                    if (animE.scroll.top !== currentE.scroll.top) {
                        !isCancelled && cycle(currentE);
                    } else {
                        !isCancelled && extend()
                    }
                    clearTimeout(id);
                }, 300);
                
                return {cancel};

                function extend () {
                    let id = setTimeout(()=> {
                        isTimeout = false;
                        currentTimeout = null;
                        !isCancelled && callback();
                        clearTimeout(id);
                    }, extended);
                }

                function cancel() {
                    isCancelled = true;
                }
            }
        }

        return (event) => {
            currentE = event;
            sections = getSections();
            let section;
            let index = 0;
            let topbar = 0;
            let bottombar = 0;
            let topbarTitle = 0;
            let bottombarTitle = 0;
            let last;
            // getTransforms().forEach(t => t.update(event));
            
            while(section = sections[index]) {
                
                if (section.offsetTop <= event.scroll.top + 1 && (section.offsetTop + section.clientHeight) > event.scroll.top + 1) {
                    topbar = index;

                    if (section.offsetTop > event.scroll.top - 10) {
                        topbarTitle = false;
                    } else {
                        topbarTitle = index;
                    }
                }
                
                if (last && last.offsetTop <= event.scroll.top + 1 && section.offsetTop > event.scroll.bottom - 1) {
                    bottombar = index;
                    bottombarTitle = index;
                }
                
                if (section.offsetTop > event.scroll.top && section.offsetTop < event.scroll.bottom - 56) {
                    bottombar = false;
                    bottombarTitle = 0;
                }

                last = section;
                index++;
            }

            setAttr('topbar', topbar);
            setAttr('bottombar', false);
            setAttr('topbar-title', topbarTitle);
            setAttr('bottombar-title', bottombarTitle);
            
            let lastE = currentE;
            window.requestAnimationFrame(()=> {
                if (lastE !== currentE) return;
                if (currentE === lastE || lastE.scroll.top === currentE.scroll.top && event === currentE) {
                    lastE = currentE;
                    document.sleep(3000).then(()=> {
                        if (lastE === currentE) {
                            setAttr('bottombar', bottombar);
                        }
                    });
                }
            });
        }
    }

    showNavigation() {
        this.EventAggregator.publish('navigation:toggle');
    }

    navigateForward($event, index) {
        $event.preventDefault();

        let sections = document.querySelectorAll('nav-section .nav-header');
        let section  = sections.item(index);

        if (section) {
            section.scrollIntoView();
        }
    }
}