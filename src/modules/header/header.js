import { inject, useView,  observable } from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@useView('modules/header/header.html')
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

    constructor(EventAggregator) {
        this.eventAggregator = EventAggregator;
    }

    activate() {
        
    }

    navigateBack(event) {
        event.preventDefault();
        this.eventAggregator.publish('state:view:back');
    }

    toggleNavigation(event) {
        event.preventDefault();
        this.eventAggregator.publish('navigation:toggle');
    }

    setElementProps(fn) {
        this.pendingElementProps = this.pendingElementProps || [];
        if (this.element) {
            fn();
        } else {
            this.pendingElementProps.push(fn);
        }
    }

    setNodeProps(fn) {
        this.pendingNodeProps = this.pendingNodeProps || [];
        if (this.titleNode) {
            fn();
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

    setTitle(text) {
        this.props.title = text;
    }

    setShade(primary, shade) {
        this.setElementProps(()=> {

            this.element.style.color = shade.primary;
            this.element.style.borderColor = shade.divider;
            this.element.style.backgroundColor = primary;

            this.eventAggregator.publish('navigation:props', {
                fill: primary,
                activeTint: shade.primary 
            });
        });
    }

    setTitleVisibility(isVisible) {
        this.setNodeProps(()=> {
            this.titleNode.style.setProperty('display', isVisible ? '' : 'none');
        });
    }

    setVisibility(isVisible, name) {
        let doc = document.documentElement;

        this.setElementProps(()=> {
            this.element.style.setProperty('display', isVisible ? '' : 'none');

            if (doc.hasAttribute('topbar-name')) {
                let className = 'view-'+doc.getAttribute('topbar-name')+'-topbar';
                doc.removeAttribute('topbar-name');
                doc.classList.remove(className);
            }
            
            if (isVisible) {
                let className = `view-${name}-topbar`;
                doc.setAttribute('topbar-name', name);
                doc.classList.add(className);
            }
        })
    }
}