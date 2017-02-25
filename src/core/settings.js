
export class Settings {
    name: String = null;

    showHeader: Boolean = false;
    showFooter: Boolean = false;

    showHeaderTitle: Boolean = false;
    showFooterTitle: Boolean = false;
    
    showHeaderIcon: Boolean = false;
    showFooterIcon: Boolean = false;

    headerTitle: String = '';
    footerTitle: String = '';

    headerFill: String = null;
    footerFill: String = null;

    headerShade: Object = null;
    footerShade: Object = null;

    constructor(options) {

        let defaults        = {
            name            : null,
            isLight         : false,
            headerTitle     : null,
            footerTitle     : null,
            showHeader      : false,
            showFooter      : false,
            showHeaderTitle : true,
            showFooterTitle : true,
            headerShade     : null,
            footerShade     : null
        }

        Object.assign(this, defaults, options);
    }
}