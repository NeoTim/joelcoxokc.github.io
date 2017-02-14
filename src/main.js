import environment from './environment';

//Configure Bluebird Promises.
Promise.config({
    warnings: {
        wForgottenReturn: false
    }
});

export function configure(aurelia) {

    const ua = window.navigator.userAgent;
    if (/ip(od|hone|ad)/.test(ua.toLowerCase())) {
        document.documentElement.classList.add('platform-ios');
    }

    aurelia.use
        .standardConfiguration()
        .feature('resources')
        .feature('modules')

    if (environment.debug) {
        aurelia.use.developmentLogging();
    }

    if (environment.testing) {
        aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(() => aurelia.setRoot());
}