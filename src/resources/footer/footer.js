import {inject, useView, observable} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@useView('resources/footer/footer.html')
@inject(EventAggregator)
export class Footer {

    @observable element;

    name = 'footer';
    isVisible = false;
    background = null;
    isTitleVisisble = false;
    nodes = {};

    props = {
        title: ''
    };

    settings = {};

    constructor(EventAggregator, State) {
        this.eventAggregator = EventAggregator;
        this.State = State;

        this.eventAggregator.subscribe('view-changed', (event)=> {
            this.handleViewChange(event);
        });

        this.eventAggregator.subscribe('router:navigation:complete', (payload)=> {
            this.settings = payload.instruction.config.settings;
            this.updateSettings(this.settings);
        })
    }

    updateSettings(settings) {
        Object.assign(this.settings, settings);
        this.setTitle(settings);
        this.setShade(settings);
        this.setVisibility(settings);
    }

    setElementProps(fn) {
        this.pendingElementProps = this.pendingElementProps || [];
        if (this.element) {
            window.requestAnimationFrame(()=> {
                fn();
            });
        } else {
            this.pendingElementProps.push(fn);
        }
    }

    elementChanged(element) {
        if (element && this.pendingElementProps) {
            while(this.pendingElementProps.length) {
                this.pendingElementProps.shift()();
            }
        }
    }

    navigateForward(event) {
        event.preventDefault();
        this.eventAggregator.publish('state:view:next');
    }

    setTitle(settings) {
        this.props.title = settings.footerTitle;
    }

    setShade(settings) {
        settings.footerShade = settings.footerShade || {};
        this.setElementProps(()=> {
            this.element.css({
                color: settings.footerShade.primary,
                borderColor: settings.footerShade.divider,
                backgroundColor: settings.footerShade.fill
            });
        });
    }

    setVisibility(settings) {
        this.setElementProps(()=> {
            this.element.css({
                display: settings.showFooter ? '' : 'none'
            });
        });
    }
}