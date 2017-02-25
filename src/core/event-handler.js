export class EventHandler {
    
    
    scrollEventQueue: Array = [];
    isScrollRunning: Boolean = false;
    constructor() {

    }

    onscroll(callback) {
        this.scrollEventQueue.push(callback);

        let dispose = ()=> {
            let index = this.scrollEventQueue.indexOf(callback);
            if (~index) {
                this.scrollEventQueue.splice(index, 1);
            }
            if (!this.scrollEventQueue.length) {
                this._stopScrollListener();
            }
        }

        this._startScrollListener();

        return {dispose}
    }

    _stopScrollListener() {
        this.isScrollRunning = false;
        window.onscroll = false;
    }

    _startScrollListener() {

        let dequeueScrollQueue;
        let isAnimationFrame
        let onWindowScroll;

        if (this.isScrollRunning) {
            return;
        }

        this.isScrollRunning = true;

        isAnimationFrame = false;
        
        dequeueScrollQueue = (event)=> {
            let fn = null
            let i = 0;
            while(fn = this.scrollEventQueue[i++]) {fn(event)}
        }

        onWindowScroll = (event)=> {
            if (isAnimationFrame) {
                return;
            }

            isAnimationFrame = true;

            window.requestAnimationFrame(()=> {
                isAnimationFrame = false;
                event.scroll = {};
                event.scroll.top = document.body.scrollTop;
                event.scroll.bottom = document.body.scrollTop + window.innerHeight;
                event.scroll.height = window.innerHeight;
                dequeueScrollQueue(event);
            });
        }

        window.onscroll = (event)=> onWindowScroll(event);
    }
}