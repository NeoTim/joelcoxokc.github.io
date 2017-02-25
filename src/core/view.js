export class View {

    element: Element = null;
    
    name: String = null;

    title: String = null;

    isActive: Boolean = false;

    isVisible: Boolean = false;

    isTop: Boolean = false;
    
    isMiddle: Boolean = false;

    isBottom: Boolean = false;

    alignIconLeft: Boolean = false;
    
    alignIconRight: Boolean = false;

    alignTitleLeft: Boolean = false;
    
    alignTitleCenter: Boolean = false;
    
    alignTitleRight: Boolean = false;
    
    showDirectionIcon: Boolean = false;
    
    showMenuIcon: Boolean = false;

    isPeeking: Boolean = false;

    isScrolling: Boolean = false;
    
    viewModel: ViewModel = null;

    navSection: NavSection = null;

    bgElement: Element = null;


    get sectionHeight() {
        const defaultHeight = window.innerHeight - 200;
        if (this.element) {
            return this.element.clientHeight || defaultHeight;
        }
        return defaultHeight;
    }

    constructor(props) {
        Object.assign(this, props);

        this.coords = {};

        this.coords.top = ()=> {
            let node = this.getElement();
            if (node !== null) {
                return node.offsetTop;
            }
            return 0;
        }

        this.coords.bottom = ()=> {
            let node = this.getElement();
            if (node !== null) {
                return node.offsetTop + node.clientHeight;
            }
            return 0;
        }
    }

    getElement() {
        if (!this.element) {
            this.element = document.querySelector('.app-'+this.name);
        }
        return this.element || null;
    }

    updateBounds() {
        let height;
        if (this.element) {
            height = this.element.clientHeight;
        }
        
        if (height && this.background) {
            this.background.style.setProperty('min-height', height + 'px');
        }
    }

    reset(properties) {
        Object.assign(this, {
            isVisible: false,
            isScrolling: false,
            isPeeking: false,
            isActive: false,
            isTop: false,
            isMiddle: false,
            isBottom: false,
            alignIconLeft: false,
            alignIconRight: false,
            alignTitleCenter: false,
            alignTitleLeft: false,
            alignTitleRight: false,
            showDirectionIcon: false,
            showMenuIcon: false
        }, properties);
    }

    configure(props) {
        Object.assign(this, props);
    }

    setBgElement(element) {
        this.bgElement = element;
    }

    setNavSection(navSection) {
        this.navSection = navSection;
    }
    
    setViewModel(viewModel) {
        this.viewModel = viewModel;
    }

    updatePosition(scroll, viewIndex, views) {
        return;
        const doc = document.documentElement;
        const top = this.element.offsetTop;
        const bottom = this.element.offsetTop + this.element.clientHeight;

        if (top < scroll.bottom && top > (scroll.top - 8)) {
            this.showTitle = true;
        } else {
            this.showTitle = false;
        }

        if (top < (scroll.top + 8) && bottom > (scroll.top + 8)) {
            this.showTopbar = true;
        } else {
            this.showTopbar = false;
        }

        if (top < (scroll.top + (scroll.height / 2)) && bottom > (scroll.top + (scroll.height / 2)))  {
            this.isActive = true;
        } else {
            this.isActive = false;
        }

        if (this.showTopbar && top > (scroll.top - 8)) {
            this.hideHeaderTitle = true;
        } else {
            this.hideHeaderTitle = false;
        }

        if (top < (scroll.top + 8) && bottom > (scroll.bottom - 8)) {
            this.isgtvh = true;
        } else {
            this.isgtvh = false;
            this.isScrolling = false;
        }

        if (bottom < scroll.top + 56) {
            this.isScrolling = false;
            this.isAboveScroll = true;
            this.isBelowScroll = false;
        }

        else if (top > scroll.bottom) {
            this.isAboveScroll = false;
            this.isBelowScroll = true;
        }
        else {
            this.isAboveScroll = false;
            this.isBelowScroll = false;
        }

        if (this.isAboveScroll || this.isActive) {
            doc.classList.remove(`view-${this.name}-next`);
        }

        if (this.isAboveScroll || this.isBelowScroll) {
            this.isActive = false;
            this.showTitle = false;
            this.isScrolling = false;
        }

        if (this.isActive) {
            doc.setAttribute('view-index', viewIndex);
            
            if (this.isScrolling) {
                doc.setAttribute('scroll-index', viewIndex);
            }
            
            doc.removeAttribute('scroll-index');
        }

        doc.classList[this.showTopbar ? 'add' : 'remove'](`view-${this.name}-topbar`);
        doc.classList[this.isgtvh ? 'add' : 'remove'](`view-${this.name}-gtvh`);
        doc.classList[this.isScrolling ? 'add' : 'remove'](`view-${this.name}-scrolling`);
        doc.classList[this.isActive ? 'add' : 'remove'](`view-${this.name}-active`);
        doc.classList[this.showTitle ? 'add' : 'remove'](`view-${this.name}-title`);
        doc.classList[this.hideHeaderTitle ? 'add' : 'remove'](`view-${this.name}-no-header-title`);

        if (parseFloat(doc.getAttribute('scroll-index')) === (viewIndex -1) ) {
            doc.classList.add(`view-${this.name}-peek`);
        } else {
            doc.classList.remove(`view-${this.name}-peek`);
        }

        if (parseFloat(doc.getAttribute('view-index')) === (viewIndex -1) ) {
            doc.classList.add(`view-${this.name}-next`);
        } else {
            doc.classList.remove(`view-${this.name}-next`);
        }
    }

    updateState() {
        const doc = document.documentElement;
        doc.classList[this.showTopbar ? 'add' : 'remove'](`view-${this.name}-topbar`);
        doc.classList[this.isActive ? 'add' : 'remove'](`view-${this.name}-active`);
        doc.classList[this.showTitle ? 'add' : 'remove'](`view-${this.name}-title`);
        doc.classList[this.hideHeaderTitle ? 'add' : 'remove'](`view-${this.name}-no-header-title`);
        doc.classList[this.isNext ? 'add' : 'remove'](`view-${this.name}-next`);
    }
}