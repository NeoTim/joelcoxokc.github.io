export class View {
    
    name: String = null;

    title: String = null;

    isActive: Boolean = false;

    isVisible: Boolean = false;

    isPeeking: Boolean = false;

    isScrolling: Boolean = false;
    
    viewModel: ViewModel = null;

    navSection: NavSection = null;

    bgElement: Element = null;


    get sectionHeight() {
        const defaultHeight = window.innerHeight - 200;
        if (this.navSection) {
            return this.navSection.element.clientHeight || defaultHeight;
        }
        return defaultHeight;
    }

    constructor(props) {
        Object.assign(this, props);

        this.coords = {};

        this.coords.top = ()=> {
            return this.element.offsetTop;
        }

        this.coords.bottom = ()=> {
            return this.element.offsetTop + this.element.clientHeight;
        }
    }

    reset(properties) {
        Object.assign(this, {
            isVisible: false,
            isScrolling: false,
            isPeeking: false,
            isActive: false
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
}