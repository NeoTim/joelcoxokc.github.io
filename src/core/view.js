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

    constructor(properties) {
        Object.assign(this, properties)
    }

    get sectionHeight() {
        const defaultHeight = window.innerHeight - 200;
        if (this.navSection) {
            return this.navSection.element.clientHeight || defaultHeight;
        }
        return defaultHeight;
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