import { inject, useView,  observable } from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@useView('resources/header/header.html')
@inject(EventAggregator)
export class Header {

    @observable element;
    @observable titleNode;

    nodes = {};
    name  = 'header';

    isVisible = false;
    background = null;
    isTitleVisible = false;

    props = {
        title: ''
    }

    settings = {};

    constructor(EventAggregator) {
        this.eventAggregator = EventAggregator;

        this.eventAggregator.subscribe('router:navigation:complete', (payload)=> {
            this.settings = payload.instruction.config.settings;
            this.updateSettings(this.settings);
        })
    }

    activate() {
        
    }

    navigateBack(event) {
        event.preventDefault();
        this.eventAggregator.publish('state:view:back');
    }

    updateSettings(settings) {
        Object.assign(this.settings, settings);
        this.setShade(settings);
        this.setTitle(settings);
        this.setVisibility(settings);
        this.setTitleVisibility(settings);
    }

    toggleNavigation(event) {
        event.preventDefault();
        this.eventAggregator.publish('navigation:toggle');
    }

    setElementProps(fn) {
        this.pendingElementProps = this.pendingElementProps || [];
        if (this.element) {
            window.requestAnimationFrame(()=> {
                fn();
            })
        } else {
            this.pendingElementProps.push(fn);
        }
    }

    setNodeProps(fn) {
        this.pendingNodeProps = this.pendingNodeProps || [];
        if (this.titleNode) {
            window.requestAnimationFrame(()=> {
                fn();
            });
        } else {
            this.pendingNodeProps.push(fn);
        }
    }

    elementChanged(element) {
        if (element && this.pendingElementProps) {
            while(this.pendingElementProps.length) {
                this.pendingElementProps.shift()();
            }
        }
    }

    titleNodeChanged(element) {
        if (element && this.pendingNodeProps) {
            while(this.pendingNodeProps.length) {
                this.pendingNodeProps.shift()();
            }
        }
    }

    setTitle(settings) {
        this.props.title = settings.headerTitle;
    }

    setShade(settings) {
        settings.headerShade = settings.headerShade || {};
        this.setElementProps(()=> {
            
            this.element.css({
                color: settings.headerShade.primary,
                borderColor: settings.headerShade.divider,
                backgroundColor: settings.headerShade.fill
            });

            this.eventAggregator.publish('navigation:props', {
                fill: settings.headerShade.fill,
                activeTint: settings.headerShade.primary 
            });
        });
    }

    setTitleVisibility(settings) {
        this.setNodeProps(()=> {
            this.titleNode.css({
                display: settings.showHeaderTitle ? '' : 'none'
            });
        });
    }

    setVisibility(settings) {
        let doc = document.documentElement;
        let name = settings.headerName;
        this.setElementProps(()=> {

            this.element.css({
                display: settings.showHeader ? '' : 'none'
            })

            if (doc.hasAttribute('topbar-name')) {
                let className = 'view-'+doc.getAttribute('topbar-name')+'-topbar';
                doc.removeAttribute('topbar-name');
                doc.classList.remove(className);
            }
            
            if (settings.showHeader) {
                let className = `view-${name}-topbar`;
                doc.setAttribute('topbar-name', name);
                doc.classList.add(className);
            }
        })
    }
}