import {inject, ElementEvents, customAttribute} from 'aurelia-framework';



@customAttribute('ripple')
@inject(Element, ElementEvents)
export class Ripple {
    constructor(Element, ElementEvents) {
        this.element = Element;
        this.events = ElementEvents;
    }

    bind() {
        this.eventName = 'mousedown';

        if (document.documentElement.classList.contains('platform-ios')) {
            this.eventName = 'touchstart';
        }

        this.events.subscribe(this.eventName, (event)=> {
            this.ripple(event);
        })
    }

    _getContainer() {
        return this.container ? this.container : this.container = document.createElement('ripple-container');
    }

    _getBackground() {
        if (this.element.dataset.useFill) {
            return this.element.dataset.useFill;
        }
        this._computed = this._computed || window.getComputedStyle(this.element);
        let background = this._computed.getPropertyValue('color');
        return background;
    }

    _createRipple() {
        let ripple = document.createElement('ripple');
        let listener = null;
        ripple.addEventListener('animationend', listener = (event)=> {
            ripple.parentNode.removeChild(ripple);
            ripple.removeEventListener('animationend', listener);
        });
        return ripple;
    }

    ripple(event) {
        this.element.style.position = 'relative';
        
        let container = this._getContainer();
        let background = this._getBackground();
        let ripple = this._createRipple();
        let height = this.element.clientHeight;
        let width = this.element.clientWidth;
        let size = height > width ? height : width;
        let rect = this.element.getBoundingClientRect();

        let clientX = event.clientX;
        let clientY = event.clientY;

        if (event.touches && event.touches.length) {
            clientX = event.touches[0].clientX;
            clientY = event.touches[0].clientY;
        }
        let bounds = {
            left: clientX - rect.left,
            top: clientY - rect.top
        }

        let half = (size / 2);

        bounds.top = bounds.top - half;
        bounds.left = bounds.left - half;

        Object.assign(ripple.style, {
            top: bounds.top + 'px',
            left: bounds.left + 'px',
            backgroundColor: background,
            width: size + 'px',
            height: size + 'px'
        });

        this.element.insertBefore(container, this.element.firstChild);
        container.appendChild(ripple);

        console.log(this.element)
    }
}