define('app',['exports', 'aurelia-framework', 'modules/header/header', 'modules/footer/footer', 'modules/title/title', 'modules/profile/profile', 'modules/projects/projects', 'modules/technology/technology', 'modules/experience/experience', 'modules/education/education', 'core/enums', './state', 'aurelia-event-aggregator', 'core/view', 'core/util', 'core/color', 'modules/connect/connect'], function (exports, _aureliaFramework, _header, _footer, _title, _profile, _projects, _technology, _experience, _education, _enums, _state, _aureliaEventAggregator, _view, _util, _color, _connect) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.App = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _class, _desc, _value, _class2, _descriptor;

    var props = {
        fullName: 'Joel Cox',
        bday: '09/11/1990',
        email: 'joel.cox.dev@gmail.com',
        phone: '(405) 388-7691'
    };

    var App = exports.App = (_dec = (0, _aureliaFramework.inject)(_util.Util, _state.State, _enums.Enums, _color.Color, _aureliaEventAggregator.EventAggregator, _aureliaFramework.Factory.of(_header.Header), _aureliaFramework.Factory.of(_footer.Footer), _aureliaFramework.Factory.of(_title.Title), _aureliaFramework.Factory.of(_profile.Profile), _aureliaFramework.Factory.of(_technology.Technology), _aureliaFramework.Factory.of(_projects.Projects), _aureliaFramework.Factory.of(_experience.Experience), _aureliaFramework.Factory.of(_education.Education), _aureliaFramework.Factory.of(_connect.Connect)), _dec(_class = (_class2 = function () {
        function App(Util, State, Enums, Color, EventAggregator, Header, Footer, Title, Profile, Technology, Projects, Experience, Education, Connect) {
            _classCallCheck(this, App);

            _initDefineProp(this, 'view', _descriptor, this);

            this.State = State;
            this.props = props;
            this.Util = Util;
            this.Color = Color;
            this.eventAggregator = EventAggregator;

            State.registerNode(this.header = Header());

            State.registerNode(this.footer = Footer());

            State.registerView(new _view.View({
                name: 'title',
                icon: 'home',
                fill: Color.tan,
                shade: Color.dark,
                viewModel: Title({
                    title: props.fullName,
                    summary: 'UI & UX Architect, Engineer & Designer'
                })
            }));

            State.registerView(new _view.View({
                title: 'Profile',
                name: 'profile',
                icon: 'person',
                fill: Color.blue,
                shade: Color.light,
                viewModel: Profile(Enums.Profile, State)
            }));

            State.registerView(new _view.View({
                title: 'Projects',
                name: 'projects',
                icon: 'screen_share',
                fill: Color.tan,
                shade: Color.dark,
                viewModel: Projects(Enums.Projects, State)
            }));

            State.registerView(new _view.View({
                title: 'Experience',
                name: 'experience',
                icon: 'verified_user',
                fill: Color.teal,
                shade: Color.dark,
                viewModel: Experience(Enums.Experience, State)
            }));

            State.registerView(new _view.View({
                title: 'Education',
                name: 'education',
                icon: 'school',
                fill: Color.tan,
                shade: Color.dark,
                viewModel: Education(Enums.Education, State)
            }));

            State.registerView(new _view.View({
                title: 'Technology',
                name: 'technology',
                icon: 'layers',
                fill: Color.brown,
                shade: Color.light,
                viewModel: Technology(Enums.Technology, State)
            }));

            State.registerView(new _view.View({
                title: 'Connect',
                name: 'connect',
                icon: 'share',
                fill: Color.tan,
                shade: Color.dark,
                viewModel: Connect(Enums.Connect, State)
            }));
        }

        App.prototype.bind = function bind() {
            var first = this.State.views[0];
            var next = this.State.views[1];
            first.isActive = true;
            first.showTopbar = true;
            first.hideHeaderTitle = true;
            next.isNext = true;

            this.header.setShade(first.fill, first.shade);
            this.header.setTitleVisibility(!first.hideHeaderTitle);
            this.header.setVisibility(true, first.name);

            this.footer.setTitle(next.title);
            this.footer.setShade(next.fill, next.shade);
            this.footer.setVisibility(true);

            this.eventAggregator.publish('state:view:set', first);
        };

        App.prototype.attached = function attached() {
            var _this = this;

            this.State.scrollElement = document.body;
            var container = document.querySelector('container');
            var sections = document.querySelectorAll('container > main > nav-section');

            var target = this.State.scrollElement || document.body;

            var updateView = function updateView(view, index, views) {
                var top = document.body.scrollTop;
                var height = document.body.clientHeight;
                var bottom = top + height;

                view.updatePosition({ top: top, height: height, bottom: bottom }, index, views);
            };

            var viewset = [];

            this.initialWindowHeight = window.innerHeight;

            window.onresize = function (event) {};

            window.onscroll = function (event) {

                _this.eventAggregator.publish('window:scroll', event);
                return;

                var bodyHeight = window.innerHeight;
                var halfBodyHeight = bodyHeight / 2;
                var scrollBottom = target.scrollTop + bodyHeight;
                var scrollTop = Math.ceil(target.scrollTop);
                var index = 0;
                var view = void 0;
                var prev = void 0;
                var next = void 0;
                var found = void 0;

                var scroll = {
                    top: scrollTop,
                    height: window.innerHeight,
                    bottom: scrollBottom
                };

                var views = _this.State.views;
                var current = null;

                while (view = _this.State.views[index]) {
                    view.isActive = false;
                    view.isNext = false;
                    index++;
                }

                index = 0;

                while (view = _this.State.views[index]) {
                    if (_this.updatePosition(scroll, view, index, views)) {
                        current = view;
                    }
                    view.updateState();
                    index++;
                }
            };
        };

        App.prototype.updatePosition = function updatePosition(scroll, view, index, views) {
            var top = view.coords.top();
            var bottom = view.coords.bottom();
            var prev = views[index - 1];
            var halfScroll = scroll.top + scroll.height / 2;

            view.isNext = false;
            view.hideHeaderTitle = false;

            if (prev && prev.isActive && prev.showTopbar) {
                view.isNext = true;
            }

            if (bottom < scroll.top + 8) {
                view.isActive = false;
                view.showTopbar = false;
                view.showTitle = false;
                return false;
            }

            if (top > scroll.bottom) {
                view.isActive = false;
                view.showTopbar = false;
                view.showTitle = false;
                return false;
            }

            if (top > scroll.top + 8 && top < halfScroll) {
                view.isActive = true;
                view.showTitle = true;
                view.showTopbar = false;
                return true;
            }

            if (top < scroll.top + 8 && bottom > halfScroll) {
                view.isActive = true;
                view.showTitle = true;
                view.showTopbar = true;
                view.hideHeaderTitle = true;

                if (top < scroll.top - 8) {
                    view.hideHeaderTitle = false;
                    view.showTitle = false;
                }
                return true;
            }

            if (top < scroll.top && bottom > scroll.top + 56) {
                view.isActive = false;
                view.showTitle = false;
                view.showTopbar = true;
            }

            if (top > scroll.top - 8 && top < scroll.bottom - 56) {
                view.showTitle = true;
                if (top > halfScroll) {
                    view.isActive = false;
                    view.showTopbar = false;
                } else {
                    view.isActive = true;
                    return true;
                    view.showTopbar = false;
                }
                return false;
            }

            if (top < scroll.top + 8 && bottom > scroll.top + 56) {
                view.isActive = true;
                view.showTopbar = true;

                if (bottom < halfScroll) {
                    view.isActive = false;
                }

                if (top < scroll.top - 8) {
                    view.showTitle = false;
                } else {
                    view.showTitle = true;
                }
                return true;
            }
        };

        return App;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'view', [_aureliaFramework.observable], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment', 'web-animations-js', 'core/element'], function (exports, _environment) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.configure = configure;

    var _environment2 = _interopRequireDefault(_environment);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    Promise.config({
        warnings: {
            wForgottenReturn: false
        }
    });

    function configure(aurelia) {
        document.addEventListener("touchstart", function () {}, true);
        var ua = window.navigator.userAgent;
        if (/ip(od|hone|ad)/.test(ua.toLowerCase())) {
            document.documentElement.classList.add('platform-ios');
        }

        aurelia.use.standardConfiguration().feature('resources').feature('modules');

        if (_environment2.default.debug) {
            aurelia.use.developmentLogging();
        }

        if (_environment2.default.testing) {
            aurelia.use.plugin('aurelia-testing');
        }

        aurelia.start().then(function () {
            return aurelia.setRoot();
        });
    }
});
define('state',['exports', 'aurelia-framework', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _aureliaEventAggregator) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.State = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _class, _desc, _value, _class2, _descriptor;

    var viewPosition = {
        UP: -1,
        ACTIVE: 0,
        DOWN: 1
    };

    var ScrollInstruction = function ScrollInstruction() {
        return {
            top: document.body.scrollTop,
            bottom: document.body.scrollTop + window.innerHeight,
            height: window.innerHeight
        };
    };

    var State = exports.State = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator), _dec(_class = (_class2 = function () {
        function State(eventAggregator) {
            var _this = this;

            _classCallCheck(this, State);

            _initDefineProp(this, 'view', _descriptor, this);

            this.initial = true;
            this.views = [];
            this.activeViews = [];

            this.eventAggregator = eventAggregator;

            this.isNavigationEvent = false;

            this.eventAggregator.subscribe('state:view:back', function () {
                _this.handleNavigateBack();
            });

            this.eventAggregator.subscribe('state:view:next', function () {
                _this.handleNavigateNext();
            });

            this.eventAggregator.subscribe('state:view:set', function (view) {
                _this.isNavigationEvent = true;
                _this.view = view;
            });

            this.eventAggregator.subscribe('state:scroll-to', function (payload) {
                if (typeof payload.top === 'number') {
                    _this.scrollElement.scrollTop = payload.top;
                }
            });

            this.eventAggregator.subscribe('state:scroll-to-view', function (view) {
                if (view.coords.top() > document.body.scrollTop + 8 || view.coords.top() < document.body.scrollTop - 8) {
                    view.element.scrollIntoView();
                } else {
                    var index = _this.views.indexOf(view);
                    if (_this.views[index - 1]) {
                        _this.views[index - 1].element.scrollIntoView();
                    }
                }
            });

            this.eventAggregator.subscribe('window:scroll', function (event) {
                _this.handleScroll(event);
            });
        }

        State.prototype.registerView = function registerView(view) {
            view.position = viewPosition.DOWN;
            view.isActive = false;
            view.viewIndex = this.views.length;

            this.views[view.name] = view;
            this.views.push(view);

            if (!this.view) {
                this.view = view;
                this.view.isVisible = true;
                this.view.isActive = true;
                this.view.isScrolling = true;
            }

            if (this.view && this.views.length === 2) {
                view.isPeeking = true;
            }
        };

        State.prototype.registerNode = function registerNode(options) {
            this[options.name] = options;
        };

        State.prototype.viewChanged = function viewChanged(newView, lastView) {
            if (this.isNavigationEvent || this.initial) {
                console.log(newView);
                var doc = document.documentElement;
                var scrollTop = document.body.scrollTop;
                var scrollHeight = document.body.clientHeight;
                var scrollBottom = scrollTop + scrollHeight;
                var headerHeight = 56;

                if (lastView) {
                    lastView.isActive = false;
                    doc.classList.remove('view-' + lastView.name + '-active');
                    if (lastView.coords.bottom() < scrollTop + headerHeight) {}
                }

                var index = this.views.indexOf(newView);

                if (newView) {
                    newView.isActive = true;
                    doc.classList.add('view-' + newView.name + '-active');
                    if (newView.element) {
                        newView.element.scrollIntoView();
                    }
                }
                this.initial = false;
                this.isNavigationEvent = false;
            }
        };

        State.prototype._updateViewPosition = function _updateViewPosition(scroll, view, index, views) {
            var top = view.coords.top();
            var bottom = view.coords.bottom();
            var prev = views[index - 1];
            var halfScroll = scroll.top + scroll.height / 2;

            view.isNext = false;
            view.hideHeaderTitle = false;

            if (prev && prev.isActive && prev.showTopbar && top > scroll.bottom - 56) {
                view.isNext = true;
            }

            if (bottom < scroll.top + 8) {
                view.isActive = false;
                view.showTopbar = false;
                view.showTitle = false;
                return false;
            }

            if (top > scroll.bottom) {
                view.isActive = false;
                view.showTopbar = false;
                view.showTitle = false;
                return false;
            }

            if (top > scroll.top + 8 && top < halfScroll) {
                view.isActive = true;
                view.showTitle = true;
                view.showTopbar = false;
                return true;
            }

            if (top < scroll.top + 8 && bottom > halfScroll) {
                view.isActive = true;
                view.showTitle = true;
                view.showTopbar = true;
                view.hideHeaderTitle = true;

                if (top < scroll.top - 8) {
                    console.log('step 4.2', view.name);
                    view.hideHeaderTitle = false;
                    view.showTitle = false;
                } else {
                    console.log('step 4', view.name);
                }
                return true;
            }

            if (top < scroll.top && bottom > scroll.top + 56) {
                view.isActive = false;
                view.showTitle = false;
                view.showTopbar = true;
            }

            if (top > scroll.top - 8 && top < scroll.bottom - 56) {
                view.showTitle = true;
                if (top > halfScroll) {
                    view.isActive = false;
                    view.showTopbar = false;
                } else {
                    view.isActive = true;
                    view.showTopbar = false;

                    return true;
                }
                return false;
            }

            if (top < scroll.top + 8 && bottom > scroll.top + 56) {
                view.isActive = true;
                view.showTopbar = true;

                if (bottom < halfScroll) {
                    view.isActive = false;
                }

                if (top < scroll.top - 8) {
                    view.showTitle = false;
                } else {
                    view.showTitle = true;
                }
                return true;
            }
        };

        State.prototype.handleScroll = function handleScroll(event) {
            var scroll = ScrollInstruction();
            var views = this.views;
            var view = null;
            var found = null;
            var next = null;
            var prev = null;

            var index = 0;
            while (view = views[index++]) {
                view.isActive = false;
                view.isNext = false;
            }

            index = 0;
            view = null;

            while (view = views[index++]) {
                if (this._updateViewPosition(scroll, view, index - 1, views)) {
                    found = view;
                    prev = views[index - 2];
                    continue;
                }

                if (found && !next) {
                    next = view;
                }
            }

            if (found && found.isActive && found.showTopbar) {
                this.header.setShade(found.fill, found.shade);
                this.header.setTitle(found.title);
                this.header.setTitleVisibility(!found.hideHeaderTitle);
                this.header.setVisibility(true, found.name);
                this.view = found;
            }

            if (prev && prev.showTopbar) {
                this.header.setShade(prev.fill, prev.shade);
                this.header.setTitle(prev.title);
                this.header.setTitleVisibility(!prev.hideHeaderTitle);
                this.header.setVisibility(true, prev.name);
            }

            if (next && next.isNext) {
                this.footer.setShade(next.fill, next.shade);
                this.footer.setTitle(next.title);
                this.footer.setVisibility(true);
            } else {
                this.footer.setVisibility(false);
            }
        };

        State.prototype.handleNavigateNext = function handleNavigateNext() {
            this.isNavigationEvent = true;

            var index = this.views.indexOf(this.view);
            var next = this.views[index + 1];
            console.log(next);
            if (next) {
                this.view = next;
            }
        };

        State.prototype.handleNavigateBack = function handleNavigateBack() {
            var top = this.view.coords.top();
            var scrollTop = document.body.scrollTop;

            this.isNavigationEvent = true;

            if (top < scrollTop + 8 || top > scrollTop - 8) {
                var viewIndex = this.views.indexOf(this.view);
                if (this.views[viewIndex - 1]) {
                    this.view = this.views[viewIndex - 1];
                }
            } else {
                this.view.element.scrollIntoView();
            }
        };

        State.prototype.setHeaderBackground = function setHeaderBackground(value) {};

        return State;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'view', [_aureliaFramework.observable], {
        enumerable: true,
        initializer: function initializer() {
            return null;
        }
    })), _class2)) || _class);
});
define('core/color',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Color = exports.Color = function Color() {
        _classCallCheck(this, Color);

        this.blue = '#284B63';
        this.teal = '#77A0A2';
        this.white = '#FFFFFF';
        this.tan = '#D9D9D9';
        this.brown = '#353535';
        this.light = {
            primary: 'rgba(255,255,255,1)',
            secondary: 'rgba(255,255,255,0.70)',
            disabled: 'rgba(255,255,255,0.50)',
            divider: 'rgba(255,255,255, 0.12)',
            key: 'light'
        };
        this.dark = {
            primary: 'rgba(0,0,0,1)',
            secondary: 'rgba(0,0,0,0.70)',
            disabled: 'rgba(0,0,0,0.50)',
            divider: 'rgba(0,0,0, 0.12)',
            key: 'dark'
        };
    };
});
define('core/connect',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var ConnectEnums = exports.ConnectEnums = function ConnectEnums() {
        var _this = this;

        _classCallCheck(this, ConnectEnums);

        this.phone = {
            name: 'phone',
            title: 'Phone',
            icon: 'phone',
            value: '(405) 388 7691',
            html: true
        };
        this.email = {
            name: 'email',
            title: 'Email',
            icon: 'email',
            value: 'Joel.Cox.Dev@gmail.com',
            html: true
        };
        this.github = {
            name: 'github',
            title: 'Github',
            logo: '/scripts/logos/github-logo.png',
            url: 'http://github.com/joelcoxokc',
            html: true
        };
        this.linkedin = {
            name: 'linkedin',
            title: 'Linkedin',
            logo: '/scripts/logos/linkedin-logo.png',
            url: 'http://www.linkedin.com/in/joelcoxio',
            html: true
        };
        this.google = {
            name: 'google',
            title: 'Google',
            logo: '/scripts/logos/google-logo.png',
            url: 'http://plus.google.com/109302227492219897111',
            html: true
        };
        this.npm = {
            name: 'npm',
            title: 'NPM',
            logo: '/scripts/logos/npmjs-logo.svg',
            url: 'https://www.npmjs.com/~joelcoxokc',
            html: true
        };
        this.twitter = {
            name: 'twitter',
            title: 'Twitter',
            logo: '/scripts/logos/tiwtter-logo.png',
            url: 'https://twitter.com/joelcoxokc',
            html: true
        };
        this.instagram = {
            name: 'instagram',
            title: 'Instagram',
            url: 'https://www.instagram.com/joelcoxokc',
            html: true
        };
        this.facebook = {};

        this.list = [this.phone, this.email, this.github, this.npm, this.linkedin, this.twitter, this.instagram, this.google];

        this.phone.href = 'tel: 1-' + this.phone.value.replace(/\(|\)/g, '').replace(/\s+/g, '-');
        this.email.href = 'mailto: ' + this.email.value;

        console.log(this.phone.href);
        this.private = [];
        this.public = [];

        this.list.forEach(function (item) {
            if (item.name === 'phone' || item.name === 'email') {
                _this.private.push(item);
            } else {
                _this.public.push(item);
            }
        });
    };
});
define('core/core',[], function () {
  "use strict";
});
define('core/education',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var EducationEnums = exports.EducationEnums = function EducationEnums() {
        _classCallCheck(this, EducationEnums);

        this.hackreactor = {
            name: 'Hack Reactor',
            id: 'hack-reactor',
            image: '/scripts/logos/hack-reactor-logo.png',
            site: 'http://hackreactor.com',
            date: '2014',
            location: 'San Francisco, California',
            studied: 'JavaScript Engineering & Product Development',
            notes: ['Immersive JavaScript Engineering program', 'Studied Javascript Engineering, Product Development, Application Deployment, and Market Validation.']
        };
        this.swbts = {
            name: 'College at SouthWestern',
            id: 'southwestern',
            image: '/scripts/logos/southwestern-logo.png',
            site: 'http://college.swbts.edu/',
            location: 'Fort Worth, Texas',
            date: '2010-2013',
            studied: 'Hummanities & Liberal Arts',
            notes: ['Studied for Bachelor in History of Ideas', 'Studied Humanities and ideas to structure and implement currently forming ideas.']
        };
        this.uco = {
            name: 'University of Central Oklahoma',
            site: 'http://www.uco.edu/',
            date: '2009-2010',
            location: 'Oklahoma City, Oklahoma',
            studied: 'Structural Engineering',
            notes: ['Studied Engineering, Photography, Graphic Arts', 'Studied a variety of professions, trying to find what I am able to exceed in.']
        };

        this.list = [this.hackreactor, this.swbts, this.uco];
    };
});
define('core/element',[], function () {
    "use strict";

    var createElement = document.createElement;

    document.createElement = function (tagName) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var node = createElement.call(document, tagName);

        if (options.innerHTML) {
            node.innerHTML = options.innerHTML;
            delete options.innerHTML;
        }
        if (options.innerText) {
            node.innerText = options.innerText;
            delete options.innerText;
        }
        if (options.css) {
            Object.assign(node.style, options.css);
            delete options.css;
        }

        for (var key in options) {
            node.setAttribute(key, options[key]);
        }

        return node;
    };

    Element.prototype.css = function () {
        var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        if (props !== null) {
            Object.assign(this.style, props);
        }
    };
});
define('core/enums',['exports', 'aurelia-framework', './profile', './projects', './experience', './education', './technology', './connect'], function (exports, _aureliaFramework, _profile, _projects, _experience, _education, _technology, _connect) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Enums = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class, _class2, _temp;

    var Enums = exports.Enums = (_dec = (0, _aureliaFramework.inject)(_profile.ProfileEnums, _technology.TechnologyEnums, _experience.ExperienceEnums, _projects.ProjectEnums, _education.EducationEnums, _connect.ConnectEnums), _dec(_class = (_temp = _class2 = function Enums(profile, technology, experience, projects, education, connect) {
        _classCallCheck(this, Enums);

        this.Profile = profile;
        this.Technology = technology;
        this.Experience = experience;
        this.Projects = projects;
        this.Education = education;
        this.Connect = connect;
    }, _class2.Module = {
        Type: {
            Input: 1,
            Output: 2
        }
    }, _class2.profile = {}, _class2.projects = [{
        name: 'Aurelia Interface',
        from: '',
        to: '',
        description: '',
        points: [],
        tech: ''
    }, {
        name: 'UI Materialize | depricated',
        from: '',
        to: '',
        description: '',
        points: [],
        tech: ''
    }, {
        name: 'Slush-y Generator',
        from: '',
        to: '',
        description: '',
        points: [],
        tech: ''
    }, {
        name: 'Iris',
        from: '',
        to: '',
        description: '',
        points: [],
        tech: ''
    }, {
        name: 'Plateful | depricated',
        from: '',
        to: '',
        description: '',
        points: [],
        tech: ''
    }, {
        name: 'TraCom | Private',
        from: '',
        to: '',
        description: '',
        points: [],
        tech: ''
    }], _class2.experience = [{
        name: 'mParticle',
        year: '',
        position: '',
        points: [],
        tech: []
    }, {
        name: 'Wolters Kluwer',
        year: '',
        position: '',
        points: [],
        tech: []
    }, {
        name: 'Aurelia',
        year: '',
        position: '',
        points: [],
        tech: []
    }, {
        name: 'Plus AMP',
        year: '',
        position: '',
        points: [],
        tech: []
    }, {
        name: 'Undisclosed',
        year: '',
        position: '',
        points: [],
        tech: []
    }, {
        name: 'Hack Reactor',
        year: '',
        position: '',
        points: [],
        tech: []
    }, {
        name: 'Hourglass Events',
        year: '',
        position: '',
        points: [],
        tech: []
    }, {
        name: 'H-I-S Coatings',
        year: '',
        position: '',
        points: [],
        tech: []
    }], _class2.education = [{
        name: 'Hack Reactor',
        location: '',
        points: []
    }, {
        name: 'College at Southwestern',
        location: '',
        points: []
    }, {
        name: 'University of Central Oklahoma',
        location: '',
        points: []
    }], _temp)) || _class);
});
define('core/experience',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var ExperienceEnums = exports.ExperienceEnums = function ExperienceEnums() {
        _classCallCheck(this, ExperienceEnums);

        this.mParticle = {
            name: 'mParticle',
            date: '2016-2017',
            id: 'mparticle',
            occupation: 'Lead UX/UI Architect',
            link: 'http://mparticle.com',
            image: '/scripts/logos/mparticle-logo.png',
            className: 'mparticle-logo',
            stack: ['C#', '.Net', '.Net Core', 'Javascript', 'Aurelia', 'Less', 'HTML', 'Web Pack', 'Gulp'],
            notes: ['Spent many hours completing issues before the project release', 'Constructed several client side components', 'Built multiple features using provided design comps', 'Designed ux flow with provided flow conventions', 'Collaborated with dev and design teams over project decisions']
        };
        this.TheLiked = {
            name: 'The Liked | Contract',
            id: 'theliked',
            date: '2016',
            occupation: 'Soul Developer',
            link: 'http://theliked.com',
            stack: ['Node', 'Mongo DB', 'Express', 'Javascript', 'Aurelia', 'React', 'HTML', 'Sass', 'CSS'],
            notes: ['Migrated existing Angular 1.0 App to Aurelia', 'Merged multiple Aurelia and React components to work on the same state engine', 'Built the site-map, including designs, using provided comps']
        };
        this.WoltersKluwer = {
            name: 'Wolters Kluwer | Contract',
            date: '2016',
            id: 'wolters-kluwer',
            occupation: 'Senior Web Engineer | Senior Web Designer',
            link: 'http://wolterskluwer.com',
            image: '/scripts/logos/wolters-kluwer-logo.png',
            stack: ['C#', '.Net', 'Mongo', 'SQL', 'Redis', 'Javascript', 'Aurelia', 'Web Animations', 'jQuery', 'HTML', 'Sass', 'CSS'],
            notes: ['Re-scaled nine applications into one web application', 'Designed a rich interactive flow creation tool', 'Visually displayed flow data using HTML Canvas and D3', 'Collaborated with a small team using scrum methodologies', 'Designed UI Component Library for internal use across Wolters Kluwer applications']
        };
        this.Aurelia = {
            name: 'Aurelia',
            id: 'aurelia',
            date: '2014-2016',
            occupation: 'Lead UX Engineer for Aurelia Interface',
            link: 'http://aurelia.io',
            image: '/scripts/logos/aurelia-logo.png',
            stack: ['Javascript', 'Aurelia', 'HTML', 'Sass', 'CSS', 'Web Animations', 'flow', 'jspm', 'aurelia-cli'],
            notes: ['Developing not only a cross-browser, but also a cross-platform UX framework call aurelia-interface', 'Designed UX, Strictly following Google’s Material Design, Apple’s Humanize design, and Windows-guidelines.', 'Along with following standard design guidelines, I have created my own UI/UX Design standard.']
        };
        this.plusAmp = {
            name: 'PlusAMP | Contract',
            date: '2015',
            id: 'plusamp',
            occupation: 'Lead UX Engineer',
            image: '/scripts/logos/plusamp-logo.jpg',
            className: 'plusamp-logo',
            stack: ['.Net', 'Node', 'Express', 'Redis', 'Mongo DB', 'Javascript', 'Aurelia', 'HTML', 'Sass', 'CSS'],
            notes: ['Strategically crafted an open source platform similar to Github, for data-scientist to share Algorithms.', 'Through inspiring visual effects, designed a way for consumers to visually and creatively create Algorithms.', 'Though this was a remote position, our team collaborated at a frequent rate, executing prime scrum methodologies.', 'Design a full featured UX/UI patterns/Sketch file as a guide for implementation in css.']
        };
        this.secret = {
            name: 'Undisclosed',
            date: '2014-2015',
            id: 'undisclosed',
            occupation: 'Lead Javascript Engineer & Manager',
            stack: ['Javascript', 'Blue JS', 'HTML', 'Less', 'CSS'],
            notes: ['Optimized massive browser load time by 6 seconds.', 'Engineered a build system that saved over $30 million in 6 years from improving programmer time.', 'Developed and maintained a relational corporative team environment.']
        };
        this.hackreactor = {
            name: 'Hack Reactor',
            date: '2014-2015',
            id: 'hack-reactor',
            occupation: 'Instructor',
            link: 'http://hackreactor.com',
            image: '/scripts/logos/hack-reactor-logo.png',
            className: 'hack-reactor-logo',
            notes: ['Engaged in the development of current HR students by being an available educational resource.', 'Took advantage of time, diving into several technologies that extend the possibilities of programming.', 'Honored to be a Hacker in Residence under three month contract with HR.']
        };
        this.hourglass = {
            name: 'Hourglass Events',
            date: '2013-Today',
            id: 'hourglass',
            occupation: 'Senior Graphic Artist & Application Developer',
            className: 'hourglass-logo',
            notes: ['Stimulated the FAAMA\'s Annual Conventions with extraordinary graphics.', 'Promoted convention Exhibitors thoughout each year, with continual email blasts, and mobile app ads.', 'Accelerated attendee envolvement with simple and intuative mobile application.', 'Engaged Exhibitors and FAAMA members with A-B Testing on event graphics and convention mobile app.', 'Assisted event managment team with graphics & mobile app.', 'Accompanied event team managment during each convention.']
        };
        this.his = {
            name: 'H-I-S Coatings',
            date: '2010-Today',
            id: 'his',
            occupation: 'Developer & Designer',
            image: '/scripts/logos/his-logo.png',
            className: 'his-logo',
            notes: ['Custom-developed a real-time Customer Relations Platform with rich Enerprise Resource Planning integration for H-I-S Coatings company.', 'Implemented full featured OAuth system using Laravel and PHP backend with Angular and jQuery on front end.', 'Employed Google API’s for strategic delivery, routing and just-in-time order scheduling, and platform-wide notifications.', 'Integrated SQL database to communicate with SQL data store, structured by current Point-of-Sale system.', 'Engaged company employees with continual A-B testing to improve UX design.', 'Provided fequent application feedback sessions for overall application health.', 'TraCom is also used as the sole communications platform between Customer Relations and the Production Management team.']
        };
        this.graphics = {
            name: 'Graphic Artist',
            date: '2006-Today',
            id: 'graphics',
            occupation: 'Contract & Freelance',
            notes: ['UI Design, PhotoGraphics, Illustrations, Vector Art, Logo\'s, Business Cards . . . And much more.', 'Artwork created using Adobe Photoshop, Adobe Illustrator, and Adobe Fireworks.']
        };
        this.dfwprint = {
            name: 'DFW Print',
            date: '2011-2013',
            id: 'dfwprint',
            occupation: 'Senior Designer & Developer',
            notes: ['Improved customer sales and company reputation, by providing rich stationary designs.', 'Exposed Adobe\'s design software to the company, by teaching the team how to affectively use Photoshop, Illustrator & InDesign.', 'Discovered a true passion for engaging customer\'s, inorder to provide the design that would best fit their need.']
        };
        this.photographer = {
            name: 'Photographer',
            date: '2008-2013',
            id: 'photographer',
            occupation: 'Contract & Freelance',
            notes: ['Business Events, Conventions, Parties, Weddings, Portraits . . . etc', 'Final Proofs created with Adobe Photoshop']
        };
        this.hisService = {
            name: 'H-I-S Coatings',
            date: '2001-2010',
            id: 'his',
            occupation: 'Customer Service & Many other Hats',
            image: '/scripts/logos/his-logo.png',
            className: 'his-logo',
            notes: ['Established a firm understanding of customer relations, by working closely with serveral hundred customers.', 'Provided support between Customer Relations, the Delivery Team, and the Small Batch Production team.', 'Took the initiative to reorganize in house stocking system.', 'Explored several positions, wearing several hats, as my father requested.']
        };

        this.list = [this.mParticle, this.TheLiked, this.WoltersKluwer, this.Aurelia, this.plusAmp, this.secret, this.hackreactor, this.hourglass, this.his, this.graphics, this.dfwprint, this.photographer, this.hisService];
    };
});
define('core/profile',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var ProfileEnums = exports.ProfileEnums = function ProfileEnums() {
        _classCallCheck(this, ProfileEnums);

        this.name = 'Joel Cox';
        this.birthday = 'September 11, 1990';
        this.locations = ['Oklahoma City, OK', 'DFW Area, Texas'];
        this.titles = ['UI/UX Architect', 'UI/UX Engineer', 'UI/UX Designer'];
        this.description = '';
    };
});
define('core/projects',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var ProjectEnums = exports.ProjectEnums = function ProjectEnums() {
        _classCallCheck(this, ProjectEnums);

        this.DOMX = {
            name: 'DOMX | in progress',
            date: '2016-today',
            id: 'domx',
            image: '',
            link: 'http://github.com/joelcoxokc/domx',
            className: 'domx-logo',
            notes: ['Developing cross-browser cross-platform Vanilla Javascript Web Component Library', 'Built with everything I am current learning', 'Built with my knowledge of the web over the past several years']
        };
        this.AureliaHub = {
            name: 'Aurelia Hub & Documentation',
            date: '2015-2016',
            id: 'aurelia-hub',
            link: 'http://aurelia.io/hub',
            image: '/scripts/logos/aurelia-logo.png',
            notes: ['Developed dynamic navigation conforming to Aurelia\'s generated documentation structure', 'Implemented cross-browser and cross-platform support', 'Pixel pushed my way to perfectly matching creative design comps', 'Used components developed for the Aurelia Interface UX library']
        };
        this.Aurelia = {
            name: 'Aurelia Interface',
            date: '2015-2016',
            id: 'aurelia-interface',
            occupation: 'Lead UX Engineer',
            link: 'http://blog.durandal.io/2015/11/20/aurelia-beta-week-day-5-aurelia-interface/',
            image: '/scripts/logos/aurelia-logo.png',
            notes: ['Developing not only a cross-browser, but also a cross-platform UX framework call aurelia-interface', 'Integrated multiple industry-level design guidelines per-platform', 'Developed UI/UX infrastructure for Web All Browsers, All IOS Devices, All Android Devices, and All Windows Devices.', 'Worked with the aurelia-framework team, creating solutions for complex UX scenarios.']
        };
        this.uimaterialize = {
            name: 'UI-Materialize | depricated',
            date: '2014',
            id: 'ui-materialize',
            occupation: 'Project Founder',
            link: 'http://ui-materialize.com',
            className: 'ui-materialize-logo',
            notes: ['Designed UX/UI Library using Googl\'s Material Design guidelines', 'Leveraging Angular JS to create custom cross-browser Directives', 'Using Photoshop and Illustrator, developed Mockups of components before implementation', 'Project depricated due to Angular no longer supporting AngularJS version 1']
        };
        this.slushy = {
            name: 'Slush-y',
            date: '2014',
            id: 'slush-y',
            occupation: 'Project Founder',
            link: 'http://www.npmjs.com/package/slush-y',
            image: '/scripts/logos/slushy-logo.png',
            notes: ['Developed a strategy to provide a good resource for best coding practices.', 'Integrated a gulp & a Yeoman-Generator into a system called slushy, allowing the full functionality of either technology.', 'Generates a full working application template with OAuth system, and user stories.', 'Using Angular, Gulp, Socket.io, NodeJS, ExpressJS, along with Google Material.']
        };
        this.platfeful = {
            name: 'PlateFul | depricated',
            date: '2014-2015',
            id: 'plateful',
            occupation: 'Co-Founder Lead UX Engineer',
            link: 'https://github.com/Plateful',
            image: '/scripts/logos/plateful-logo.png',
            notes: ['Identified competitive opportunity to exploit shortcomings in incumbent restaurant item recommendation services.', 'Developed from the ground up: photo-centric iOS & Android app to compete against Yelp among foodies.', 'Instituted a continuously integrated test and behavior driven development strategy and workflow.', 'Oversaw transition of the team to agile development, adhering to best-practice scrum methodologies.', 'Deployed RESTful API server and Neo4j graph-oriented database on scalable coordinating virtual machines.']
        };
        this.tracom = {
            name: 'TraCom | Private',
            date: '2010-Today',
            id: 'tracom',
            occupation: 'Developer & Designer',
            image: '/scripts/logos/tracom-logo.png',
            notes: ['Custom-developed a real-time Customer Relations Platform with rich Enerprise Resource Planning integration for H-I-S Coatings company.', 'Implemented full featured OAuth system using Laravel and PHP backend with Angular and jQuery on front end.', 'Employed Google API’s for strategic delivery, routing and just-in-time order scheduling, and platform-wide notifications.', 'Integrated SQL database to communicate with SQL data store, structured by current Point-of-Sale system.', 'Engaged company employees with continual A-B testing to improve UX design.', 'Provided fequent application feedback sessions for overall application health.', 'TraCom is also used as the sole communications platform between Customer Relations and the Production Management team.']
        };

        this.list = [this.DOMX, this.AureliaHub, this.Aurelia, this.uimaterialize, this.slushy, this.platfeful, this.tracom];
    };
});
define('core/technology',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var TechnologyEnums = exports.TechnologyEnums = function () {
        function TechnologyEnums() {
            _classCallCheck(this, TechnologyEnums);

            this.languages = ['es6', 'javascript', 'typescript', 'html5', 'css3', 'apps-script', 'php', 'cypher', 'bash'];
            this.preprocessors = ['flow', 'babel', 'jade', 'coffeescript', 'sass', 'less', 'stylus', 'postcss'];
            this.frameworks = ['aurelia', 'angular2.0', 'angular', 'react', 'polymer', 'ionic', 'backbone', 'laravel', 'express'];
            this.tools = ['node', 'jspm', 'gulp', 'webpack', 'aurelia-cli', 'grunt', 'slush', 'yeoman'];
            this.data = ['redis', 'neo4j', 'mongo', 'sql'];
            this.design = ['ai', 'ps', 'sketch', 'zeplin'];
            this.rolanguages = ['C#', '.Net', '.Net core', 'java', 'Python'];

            this.process();
        }

        TechnologyEnums.prototype.process = function process() {
            var list = [{
                title: 'Languages',
                name: 'languages',
                list: this.languages
            }, {
                title: 'Preprocessors',
                name: 'preprocessors',
                list: this.preprocessors
            }, {
                title: 'Frameworks',
                name: 'frameworks',
                list: this.frameworks
            }, {
                title: 'Tools',
                name: 'tools',
                list: this.tools
            }, {
                title: 'Data',
                name: 'data',
                list: this.data
            }, {
                title: 'Design',
                name: 'design',
                list: this.design
            }, {
                title: 'Read Only Languages',
                subtitle: 'Languages I can read and am willing to learn to write',
                list: this.rolanguages
            }];

            this.list = list.map(function (listset) {
                listset.list = listset.list.map(function (item) {
                    var ref = item.replace(/\.|\#|core|\s/ig, '').toLowerCase();
                    return {
                        img: '/scripts/logos/' + ref + '-logo.png',
                        name: ref,
                        title: item[0].toUpperCase() + item.slice(1)
                    };
                });
                return listset;
            });
        };

        return TechnologyEnums;
    }();
});
define('core/util',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Util = exports.Util = function () {
        function Util() {
            _classCallCheck(this, Util);
        }

        Util.prototype.onResizeComplete = function onResizeComplete() {
            if (window.isResizing) {
                return Promise.resolve(false);
            }
            window.isResizing = true;
            var checkHeight = function checkHeight(currentHeight, callback) {
                var id = setTimeout(function () {
                    clearTimeout(id);
                    if (window.innerHeight !== currentHeight) {
                        checkHeight(window.innerHeight, callback);
                    } else {
                        window.isResizing = false;
                        callback(true);
                    }
                }, 300);
            };
            return new Promise(function (resolve) {
                checkHeight(window.innerHeight, resolve);
            });
        };

        return Util;
    }();
});
define('core/view',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var View = exports.View = function () {
        _createClass(View, [{
            key: 'sectionHeight',
            get: function get() {
                var defaultHeight = window.innerHeight - 200;
                if (this.element) {
                    return this.element.clientHeight || defaultHeight;
                }
                return defaultHeight;
            }
        }]);

        function View(props) {
            var _this = this;

            _classCallCheck(this, View);

            this.name = null;
            this.title = null;
            this.isActive = false;
            this.isVisible = false;
            this.isTop = false;
            this.isMiddle = false;
            this.isBottom = false;
            this.alignIconLeft = false;
            this.alignIconRight = false;
            this.alignTitleLeft = false;
            this.alignTitleCenter = false;
            this.alignTitleRight = false;
            this.showDirectionIcon = false;
            this.showMenuIcon = false;
            this.isPeeking = false;
            this.isScrolling = false;
            this.viewModel = null;
            this.navSection = null;
            this.bgElement = null;

            Object.assign(this, props);

            this.coords = {};

            this.coords.top = function () {
                return _this.element ? _this.element.offsetTop : 0;
            };

            this.coords.bottom = function () {
                return _this.element.offsetTop + _this.element.clientHeight;
            };
        }

        View.prototype.updateBounds = function updateBounds() {
            var height = void 0;
            if (this.element) {
                height = this.element.clientHeight;
            }

            if (height && this.background) {
                this.background.style.setProperty('min-height', height + 'px');
            }
        };

        View.prototype.reset = function reset(properties) {
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
        };

        View.prototype.configure = function configure(props) {
            Object.assign(this, props);
        };

        View.prototype.setBgElement = function setBgElement(element) {
            this.bgElement = element;
        };

        View.prototype.setNavSection = function setNavSection(navSection) {
            this.navSection = navSection;
        };

        View.prototype.setViewModel = function setViewModel(viewModel) {
            this.viewModel = viewModel;
        };

        View.prototype.updatePosition = function updatePosition(scroll, viewIndex, views) {
            return;
            var doc = document.documentElement;
            var top = this.element.offsetTop;
            var bottom = this.element.offsetTop + this.element.clientHeight;

            if (top < scroll.bottom && top > scroll.top - 8) {
                this.showTitle = true;
            } else {
                this.showTitle = false;
            }

            if (top < scroll.top + 8 && bottom > scroll.top + 8) {
                this.showTopbar = true;
            } else {
                this.showTopbar = false;
            }

            if (top < scroll.top + scroll.height / 2 && bottom > scroll.top + scroll.height / 2) {
                this.isActive = true;
            } else {
                this.isActive = false;
            }

            if (this.showTopbar && top > scroll.top - 8) {
                this.hideHeaderTitle = true;
            } else {
                this.hideHeaderTitle = false;
            }

            if (top < scroll.top + 8 && bottom > scroll.bottom - 8) {
                this.isgtvh = true;
            } else {
                this.isgtvh = false;
                this.isScrolling = false;
            }

            if (bottom < scroll.top + 56) {
                this.isScrolling = false;
                this.isAboveScroll = true;
                this.isBelowScroll = false;
            } else if (top > scroll.bottom) {
                this.isAboveScroll = false;
                this.isBelowScroll = true;
            } else {
                this.isAboveScroll = false;
                this.isBelowScroll = false;
            }

            if (this.isAboveScroll || this.isActive) {
                doc.classList.remove('view-' + this.name + '-next');
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

            doc.classList[this.showTopbar ? 'add' : 'remove']('view-' + this.name + '-topbar');
            doc.classList[this.isgtvh ? 'add' : 'remove']('view-' + this.name + '-gtvh');
            doc.classList[this.isScrolling ? 'add' : 'remove']('view-' + this.name + '-scrolling');
            doc.classList[this.isActive ? 'add' : 'remove']('view-' + this.name + '-active');
            doc.classList[this.showTitle ? 'add' : 'remove']('view-' + this.name + '-title');
            doc.classList[this.hideHeaderTitle ? 'add' : 'remove']('view-' + this.name + '-no-header-title');

            if (parseFloat(doc.getAttribute('scroll-index')) === viewIndex - 1) {
                doc.classList.add('view-' + this.name + '-peek');
            } else {
                doc.classList.remove('view-' + this.name + '-peek');
            }

            if (parseFloat(doc.getAttribute('view-index')) === viewIndex - 1) {
                doc.classList.add('view-' + this.name + '-next');
            } else {
                doc.classList.remove('view-' + this.name + '-next');
            }
        };

        View.prototype.updateState = function updateState() {
            var doc = document.documentElement;
            doc.classList[this.showTopbar ? 'add' : 'remove']('view-' + this.name + '-topbar');
            doc.classList[this.isActive ? 'add' : 'remove']('view-' + this.name + '-active');
            doc.classList[this.showTitle ? 'add' : 'remove']('view-' + this.name + '-title');
            doc.classList[this.hideHeaderTitle ? 'add' : 'remove']('view-' + this.name + '-no-header-title');
            doc.classList[this.isNext ? 'add' : 'remove']('view-' + this.name + '-next');
        };

        return View;
    }();
});
define('modules/index',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.configure = configure;
    function configure(config) {
        config.globalResources('./nav-section/nav-section', './navigation/navigation', './icon/icon');
    }
});
define('resources/index',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {
    config.globalResources(['./attributes/ripple', './elements/dialog/dialog-container', './elements/dialog/dialog', './elements/checkbox/checkbox']);
  }
});
define('modules/connect/connect',['exports', 'aurelia-framework', 'modules/connect/robot-user', 'resources/elements/dialog/service'], function (exports, _aureliaFramework, _robotUser, _service) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Connect = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Connect = exports.Connect = (_dec = (0, _aureliaFramework.inject)(_aureliaFramework.Factory.of(_robotUser.RobotUser), _service.DialogService), _dec(_class = function () {
        function Connect(RobotUser, DialogService, connections) {
            var _this = this;

            _classCallCheck(this, Connect);

            this.robotUser = RobotUser();
            this.dialogService = DialogService;
            this.props = {
                private: connections.private,
                public: connections.public
            };

            this.props.handleItemClick = function (event, item) {
                return _this.handleItemClick(event, item);
            };
        }

        Connect.prototype.handleItemClick = function handleItemClick(event, item) {
            event.preventDefault();
            if (event.target.href) {
                var win = window.open(event.target.href, '_blank');
                win.focus();
            }
        };

        Connect.prototype.validateUserIsNotARobot = function validateUserIsNotARobot($event) {
            $event.preventDefault();
            this.dialogService.compose(this.robotUser).then(function (result) {
                console.log(result);
            });
        };

        Connect.prototype.attached = function attached() {};

        return Connect;
    }()) || _class);
});
define('modules/connect/robot-user',['exports', 'aurelia-framework', 'resources/elements/dialog/service'], function (exports, _aureliaFramework, _service) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.RobotUser = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _dec2, _class, _desc, _value, _class2, _descriptor;

    var cach_key = 'joelcox.io.robot.user';

    var RobotUser = exports.RobotUser = (_dec = (0, _aureliaFramework.useView)('modules/connect/robot-user.html'), _dec2 = (0, _aureliaFramework.inject)(_service.DialogService), _dec(_class = _dec2(_class = (_class2 = function () {
        function RobotUser(dialogService) {
            _classCallCheck(this, RobotUser);

            _initDefineProp(this, 'value', _descriptor, this);

            this.service = dialogService;

            this.value = window.localStorage.getItem(cach_key);
        }

        RobotUser.prototype.valueChanged = function valueChanged(value) {
            if (value === 'true') return this.value = true;
            if (value === 'false') return this.value = false;

            if (value) {
                window.localStorage.setItem(cach_key, true);
            } else {
                window.localStorage.setItem(cach_key, false);
            }
        };

        return RobotUser;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'value', [_aureliaFramework.observable], {
        enumerable: true,
        initializer: function initializer() {
            return false;
        }
    })), _class2)) || _class) || _class);
});
define('modules/education/education',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Education = exports.Education = function Education(educations) {
        _classCallCheck(this, Education);

        this.props = {
            educations: educations.list
        };
    };
});
define('modules/experience/experience',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Experience = exports.Experience = function Experience(experiences) {
        _classCallCheck(this, Experience);

        this.props = {
            experiences: experiences.list
        };
    };
});
define('modules/footer/footer',['exports', 'aurelia-framework', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _aureliaEventAggregator) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Footer = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _dec2, _class, _desc, _value, _class2, _descriptor;

    var Footer = exports.Footer = (_dec = (0, _aureliaFramework.useView)('modules/footer/footer.html'), _dec2 = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator), _dec(_class = _dec2(_class = (_class2 = function () {
        function Footer(EventAggregator, State) {
            var _this = this;

            _classCallCheck(this, Footer);

            _initDefineProp(this, 'element', _descriptor, this);

            this.name = 'footer';
            this.isVisible = false;
            this.background = null;
            this.isTitleVisisble = false;
            this.nodes = {};
            this.props = {
                title: ''
            };

            this.eventAggregator = EventAggregator;
            this.State = State;

            this.eventAggregator.subscribe('view-changed', function (event) {
                _this.handleViewChange(event);
            });
        }

        Footer.prototype.setElementProps = function setElementProps(fn) {
            this.pendingElementProps = this.pendingElementProps || [];
            if (this.element) {
                fn();
            } else {
                this.pendingElementProps.push(fn);
            }
        };

        Footer.prototype.elementChanged = function elementChanged(element) {
            if (element && this.pendingElementProps) {
                while (this.pendingElementProps.length) {
                    this.pendingElementProps.shift()();
                }
            }
        };

        Footer.prototype.navigateForward = function navigateForward(event) {
            event.preventDefault();
            this.eventAggregator.publish('state:view:next');
        };

        Footer.prototype.setTitle = function setTitle(text) {
            this.props.title = text;
        };

        Footer.prototype.setShade = function setShade(primary, shade) {
            var _this2 = this;

            this.setElementProps(function () {
                _this2.element.style.color = shade.primary;
                _this2.element.style.borderColor = shade.divider;
                _this2.element.style.backgroundColor = primary;
            });
        };

        Footer.prototype.setVisibility = function setVisibility(isVisible) {
            var _this3 = this;

            this.setElementProps(function () {
                _this3.element.style.setProperty('display', isVisible ? '' : 'none');
            });
        };

        return Footer;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'element', [_aureliaFramework.observable], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class) || _class);
});
define('modules/header/header',['exports', 'aurelia-framework', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _aureliaEventAggregator) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Header = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2;

    var Header = exports.Header = (_dec = (0, _aureliaFramework.useView)('modules/header/header.html'), _dec2 = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator), _dec(_class = _dec2(_class = (_class2 = function () {
        function Header(EventAggregator) {
            _classCallCheck(this, Header);

            _initDefineProp(this, 'element', _descriptor, this);

            _initDefineProp(this, 'titleNode', _descriptor2, this);

            this.nodes = {};
            this.name = 'header';
            this.isVisible = false;
            this.background = null;
            this.isTitleVisible = false;
            this.props = {
                title: ''
            };

            this.eventAggregator = EventAggregator;
        }

        Header.prototype.activate = function activate() {};

        Header.prototype.navigateBack = function navigateBack(event) {
            event.preventDefault();
            this.eventAggregator.publish('state:view:back');
        };

        Header.prototype.toggleNavigation = function toggleNavigation(event) {
            event.preventDefault();
            this.eventAggregator.publish('navigation:toggle');
        };

        Header.prototype.setElementProps = function setElementProps(fn) {
            this.pendingElementProps = this.pendingElementProps || [];
            if (this.element) {
                window.requestAnimationFrame(function () {
                    fn();
                });
            } else {
                this.pendingElementProps.push(fn);
            }
        };

        Header.prototype.setNodeProps = function setNodeProps(fn) {
            this.pendingNodeProps = this.pendingNodeProps || [];
            if (this.titleNode) {
                window.requestAnimationFrame(function () {
                    fn();
                });
            } else {
                this.pendingNodeProps.push(fn);
            }
        };

        Header.prototype.elementChanged = function elementChanged(element) {
            if (element && this.pendingElementProps) {
                while (this.pendingElementProps.length) {
                    this.pendingElementProps.shift()();
                }
            }
        };

        Header.prototype.titleNodeChanged = function titleNodeChanged(element) {
            if (element && this.pendingNodeProps) {
                while (this.pendingNodeProps.length) {
                    this.pendingNodeProps.shift()();
                }
            }
        };

        Header.prototype.setTitle = function setTitle(text) {
            this.props.title = text;
        };

        Header.prototype.setShade = function setShade(primary, shade) {
            var _this = this;

            this.setElementProps(function () {

                _this.element.style.color = shade.primary;
                _this.element.style.borderColor = shade.divider;
                _this.element.style.backgroundColor = primary;

                _this.eventAggregator.publish('navigation:props', {
                    fill: primary,
                    activeTint: shade.primary
                });
            });
        };

        Header.prototype.setTitleVisibility = function setTitleVisibility(isVisible) {
            var _this2 = this;

            this.setNodeProps(function () {
                _this2.titleNode.style.setProperty('display', isVisible ? '' : 'none');
            });
        };

        Header.prototype.setVisibility = function setVisibility(isVisible, name) {
            var _this3 = this;

            var doc = document.documentElement;

            this.setElementProps(function () {
                _this3.element.style.setProperty('display', isVisible ? '' : 'none');

                if (doc.hasAttribute('topbar-name')) {
                    var className = 'view-' + doc.getAttribute('topbar-name') + '-topbar';
                    doc.removeAttribute('topbar-name');
                    doc.classList.remove(className);
                }

                if (isVisible) {
                    var _className = 'view-' + name + '-topbar';
                    doc.setAttribute('topbar-name', name);
                    doc.classList.add(_className);
                }
            });
        };

        return Header;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'element', [_aureliaFramework.observable], {
        enumerable: true,
        initializer: null
    }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'titleNode', [_aureliaFramework.observable], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class) || _class);
});
define('modules/icon/icon',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Icon = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _dec2, _dec3, _class, _desc, _value, _class2, _descriptor;

    var Template = '\n<template>\n    ${ico}\n</template>\n';

    var Icon = exports.Icon = (_dec = (0, _aureliaFramework.customElement)('icon'), _dec2 = (0, _aureliaFramework.inlineView)(Template), _dec3 = (0, _aureliaFramework.inject)(Element), _dec(_class = _dec2(_class = _dec3(_class = (_class2 = function Icon(element) {
        _classCallCheck(this, Icon);

        _initDefineProp(this, 'ico', _descriptor, this);

        element.classList.add('material-icons');
    }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'ico', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: function initializer() {
            return null;
        }
    })), _class2)) || _class) || _class) || _class);
});
define('modules/nav/nav',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Nav = exports.Nav = function () {
        function Nav() {
            _classCallCheck(this, Nav);
        }

        Nav.prototype.navigateToItem = function navigateToItem() {};

        Nav.prototype.buttonClicked = function buttonClicked() {};

        return Nav;
    }();
});
define('modules/nav-section/nav-section',['exports', 'aurelia-framework', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _aureliaEventAggregator) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.NavSection = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _dec2, _class, _desc, _value, _class2, _descriptor;

    var NavSection = exports.NavSection = (_dec = (0, _aureliaFramework.customElement)('nav-section'), _dec2 = (0, _aureliaFramework.inject)(Element, _aureliaEventAggregator.EventAggregator), _dec(_class = _dec2(_class = (_class2 = function () {
        _createClass(NavSection, [{
            key: 'winheight',
            get: function get() {
                return window.innerHeight;
            }
        }, {
            key: 'isWinChanging',
            get: function get() {
                return window.isResizing ? 'resizing' : 'stable';
            }
        }]);

        function NavSection(element, eventAggregator) {
            _classCallCheck(this, NavSection);

            _initDefineProp(this, 'view', _descriptor, this);

            this.header = null;
            this.isActive = false;

            this.element = element;
            this.eventAggregator = eventAggregator;
        }

        NavSection.prototype.attached = function attached() {

            this.mainContainer = document.querySelector('container');

            if (this.element.classList.contains('first')) {
                this.positionClass = 'first';
            }
            if (this.element.classList.contains('last')) {
                this.positionClass = 'last';
            }

            this.eventAggregator.publish('nav-section:attached', this);
        };

        NavSection.prototype.viewChanged = function viewChanged(view) {
            if (view) {
                view.setNavSection(this);
            }
        };

        NavSection.prototype.headerClicked = function headerClicked(event) {
            event.preventDefault();
            this.eventAggregator.publish('state:set:view', this.view);
        };

        NavSection.prototype.toggleNavigation = function toggleNavigation(event) {
            event.preventDefault();
            this.eventAggregator.publish('state:navigation:toggle');
        };

        NavSection.prototype.navigateDirection = function navigateDirection(event) {
            event.preventDefault();
            this.eventAggregator.publish('state:scroll-to-view', this.view);
        };

        return NavSection;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'view', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: function initializer() {
            return null;
        }
    })), _class2)) || _class) || _class);
});
define('modules/navigation/navigation',['exports', 'aurelia-framework', 'state', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _state, _aureliaEventAggregator) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Navigation = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _dec2, _class, _desc, _value, _class2, _descriptor;

    var Navigation = exports.Navigation = (_dec = (0, _aureliaFramework.customElement)('navigation'), _dec2 = (0, _aureliaFramework.inject)(Element, _aureliaEventAggregator.EventAggregator, _state.State), _dec(_class = _dec2(_class = (_class2 = function () {
        function Navigation(Element, EventAggregator, State) {
            var _this = this;

            _classCallCheck(this, Navigation);

            _initDefineProp(this, 'visibility', _descriptor, this);

            this.props = {
                fill: '#FFFFFF',
                activeTint: ''
            };
            this.currentFill = null;
            this.currentTint = '';

            this.element = Element;
            this.eventAggregator = EventAggregator;
            this.State = State;

            this.eventAggregator.subscribe('navigation:props', function (props) {
                Object.assign(_this.props, props);
                _this.currentFill = _this.props.fill;
                _this.currentTint = _this.props.activeTint;
            });
        }

        Navigation.prototype.bind = function bind() {
            var _this2 = this;

            this.eventAggregator.subscribe('navigation:toggle', function () {
                _this2.visibility = !_this2.visibility;
            });

            this.views = this.State.views.filter(function (view) {
                return view.hasOwnProperty('title');
            });
        };

        Navigation.prototype.visibilityChanged = function visibilityChanged(value) {
            console.log(value);
            if (value) {
                this.showNavigation();
            } else {
                this.hideNavigation();
            }
        };

        Navigation.prototype.navigateToView = function navigateToView(view) {
            this.eventAggregator.publish('state:scroll-to', {
                top: view.navSection.element.offsetTop + 1
            });
        };

        Navigation.prototype.showNavigation = function showNavigation() {
            var _this3 = this;

            console.log('showing');
            var _listener = void 0;
            var container = document.querySelector('container');
            var main = document.querySelector('main');

            container.classList.remove('hide-navigation');
            container.classList.remove('hiding-navigation');

            container.addEventListener('animationend', _listener = function listener(event) {
                if (event.target === container) {
                    container.classList.add('show-navigation');
                    container.classList.remove('showing-navigation');
                    container.removeEventListener('animationend', _listener);
                    console.log('animationend show');
                }
            });

            container.classList.add('showing-navigation');

            this.resizeListener = this.eventAggregator.subscribe('window:resize', function () {
                _this3.visibility = false;
            });

            main.addEventListener('mousedown', this.clickListener = function (event) {
                event.preventDefault();
                event.stopPropagation();
                _this3.visibility = false;
                console.log('click');
            }, true);

            main.addEventListener('touchstart', this.touchListener = function (event) {
                event.preventDefault();
                event.stopPropagation();
                _this3.visibility = false;
                console.log('click');
            }, true);
        };

        Navigation.prototype.hideNavigation = function hideNavigation() {
            console.log('hiding');
            var _listener2 = void 0;
            var container = document.querySelector('container');
            var main = document.querySelector('main');

            this.resizeListener.dispose();
            main.removeEventListener('mousedown', this.clickListener, true);
            main.removeEventListener('touchstart', this.touchListener, true);

            container.classList.remove('show-navigation');
            container.classList.remove('showing-navigation');

            container.addEventListener('animationend', _listener2 = function listener(event) {
                if (event.target === container) {
                    container.classList.remove('hiding-navigation');
                    container.removeEventListener('animationend', _listener2);
                    console.log('animationend hide');
                }
            });

            container.classList.add('hiding-navigation');
        };

        return Navigation;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'visibility', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: function initializer() {
            return false;
        }
    })), _class2)) || _class) || _class);
});
define('modules/profile/profile',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Profile = exports.Profile = function Profile(props) {
        _classCallCheck(this, Profile);

        this.props = props;
    };
});
define('modules/projects/projects',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Projects = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Projects = exports.Projects = function Projects(projects) {
        _classCallCheck(this, Projects);

        this.props = {
            projects: projects.list
        };
        console.log(this.props.projects);
    };
});
define('modules/technology/technology',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Technology = exports.Technology = function Technology(technologies) {
        _classCallCheck(this, Technology);

        this.props = {
            technologies: technologies.list
        };

        console.log(this.props.technologies);
    };
});
define('modules/title/title',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var chars = 'Architect,-Engineer-&-Designer';

    var Title = exports.Title = function () {
        function Title(props) {
            _classCallCheck(this, Title);

            this.title = props.title;
            this.summary = props.summary;
        }

        Title.prototype.bind = function bind() {
            this.setupAnimation();
        };

        Title.prototype.setupAnimation = function setupAnimation() {
            var _this = this;

            var clearNodes = void 0;
            var append = void 0;
            var animate = void 0;
            var reset = void 0;
            var UX = this.uxAnimation;
            var U = document.createElement('SPAN', { innerText: 'U' });
            var I = document.createElement('SPAN', { innerText: 'I' });
            var X = document.createElement('SPAN', { innerText: 'X' });

            var nodes = chars.split('').map(function (t, i) {
                if (i === 0) {
                    t = '--' + t;
                }
                return document.createElement('SPAN', { innerHTML: t.replace(/\-/g, '&nbsp;') });
            });

            reset = function reset() {
                UX.animate([{ opacity: 1 }, { opacity: 0 }], {
                    duration: 100,
                    fill: 'forwards',
                    delay: 5000
                }).onfinish = function () {
                    _this.setupAnimation();
                };
            };

            clearNodes = function clearNodes() {
                UX.innerHTML = '';
            };

            append = function append(node) {
                UX.appendChild(node);
            };

            animate = function animate(node) {
                if (node === U) {
                    node.css({
                        transform: 'translateX(150px)'
                    });
                    return node.animate([{
                        offset: 0,
                        opacity: 1,
                        transform: 'translateX(150px)'
                    }, {
                        offset: 0.9,
                        opacity: 1,
                        transform: 'translateX(150px)'
                    }, {
                        offset: 1,
                        opacity: 1,
                        transform: 'translateX(0)'
                    }], {
                        duration: 1500,
                        fill: 'forwards',
                        delay: 1000
                    });
                }
                if (node === I) {
                    node.css({
                        opacity: 0,
                        transform: 'rotate(0deg) translateX(150px)'
                    });
                    return node.animate([{
                        offset: 0,
                        opacity: 0,
                        transform: 'rotate(0deg) translateX(150px)'
                    }, {
                        offset: 0.1,
                        opacity: 1,
                        transform: 'rotate(0deg) translateX(150px)'
                    }, {
                        offset: 0.3,
                        opacity: 1,
                        transform: 'rotate(0deg) translateX(150px)'
                    }, {
                        offset: 0.4,
                        opacity: 0,
                        transform: 'rotate(180deg) translateX(150px)'
                    }, {
                        offset: 0.5,
                        opacity: 0,
                        transform: 'rotate(0deg) translateX(150px)'
                    }, {
                        offset: 0.7,
                        opacity: 0,
                        transform: 'rotate(0deg) translateX(150px)'
                    }, {
                        offset: 0.8,
                        opacity: 0,
                        transform: 'rotate(0deg) translateX(150px)'
                    }, {
                        offset: 0.9,
                        opacity: 1,
                        transform: 'rotate(0deg) translateX(150px)'
                    }, {
                        offset: 1,
                        opacity: 1,
                        transform: 'rotate(0deg) translateX(0)'
                    }], {
                        duration: 1500,
                        delay: 1000,
                        fill: 'forwards'
                    });
                }
                if (node === X) {
                    node.css({
                        transform: 'rotate(-180deg) translatex(calc(-40% + 150px))',
                        opacity: 0
                    });
                    return node.animate([{
                        offset: 0,
                        opacity: 0,
                        transform: 'rotate(-180deg) translateX(calc(-40% + 150px))'
                    }, {
                        offset: 0.3,
                        opacity: 0,
                        transform: 'rotate(-180deg) translateX(calc(-40% + 150px))'
                    }, {
                        offset: 0.4,
                        opacity: 1,
                        transform: 'rotate(0deg) translateX(calc(-40% + 150px))'
                    }, {
                        offset: 0.6,
                        opacity: 1,
                        transform: 'translateX(calc(-40% + 150px))'
                    }, {
                        offset: 0.8,
                        opacity: 1,
                        transform: 'translateX(calc(-40% + 150px))'
                    }, {
                        offset: 0.9,
                        opacity: 1,
                        transform: 'translateX(150px)'
                    }, {
                        offset: 1,
                        opacity: 1,
                        transform: 'translateX(0)'
                    }], {
                        duration: 1500,
                        delay: 1000,
                        fill: 'forwards'
                    });
                }
                node.css({
                    opacity: 0
                });
                return node.animate([{ opacity: 0 }, { opacity: 1 }], {
                    duration: 500,
                    fill: 'forwards',
                    delay: 2500
                });
            };

            clearNodes();

            UX.css({
                opacity: 0
            });

            UX.animate([{ opacity: 0 }, { opacity: 1 }], {
                duration: 100,
                fill: 'forwards'
            });

            append(U);
            animate(U);

            append(I);
            append(X);

            animate(I);
            animate(X);

            var node = void 0;
            var last = null;
            while (node = nodes.shift()) {
                append(node);
                last = animate(node);
            }

            if (last) {
                last.onfinish = function () {
                    reset();
                };
            }
        };

        Title.prototype.startAnimation = function startAnimation() {

            var iAnim = void 0;
            var xAnim = void 0;
            var uixAnim = void 0;
            var aAnim = void 0;
            var dAnim = void 0;
            var eAnim = void 0;
            var fill = 'forwards';
            var duration = 300;

            var iEl = this.nodes.i;
            var xEl = this.nodes.x;
            var aEl = this.nodes.architect;
            var dEl = this.nodes.designer;
            var eEl = this.nodes.engineer;
            var uixEl = this.nodes.uix;

            iAnim = iEl.animate([{
                opacity: 1,
                transform: 'rotate(0deg)'
            }, {
                opacity: 0,
                transform: 'rotate(180deg)'
            }], {
                duration: duration,
                delay: 1000,
                fill: fill
            });

            xAnim = xEl.animate([{
                opacity: 0,
                transform: 'rotate(-180deg)'
            }, {
                opacity: 1,
                transform: 'rotate(0deg)'
            }], {
                duration: duration,
                delay: 1000,
                fill: fill
            });

            xAnim.onfinish = function () {

                uixAnim = uixEl.animate([{
                    transform: 'translateX(145px)'
                }, {
                    transform: 'translateX(0)'
                }], {
                    duration: 1000,
                    fill: fill
                });

                iEl.animate([{ transform: 'rotate(180deg)' }, { transform: 'rotate(0deg)' }], {
                    fill: fill,
                    duration: 0
                });

                iAnim = iEl.animate([{
                    opacity: 0
                }, {
                    opacity: 1
                }], {
                    duration: 300,
                    delay: 700,
                    fill: fill
                });

                xAnim = xEl.animate([{
                    left: '15px'
                }, {
                    left: '22px'
                }], {
                    duration: 300,
                    fill: fill,
                    delay: 700
                });

                aEl.animate([{
                    opacity: 0
                }, {
                    opacity: 1
                }], {
                    duration: 200,
                    fill: fill
                });

                aEl.animate([{ transform: 'translateX(110px)' }, { transform: 'translateX(0px)' }], {
                    duration: 800,
                    fill: fill,
                    delay: 200
                });

                dAnim = dEl.animate([{ opacity: 0 }, { opacity: 1 }], {
                    duration: 200,
                    fill: fill,
                    delay: 300
                });

                dEl.animate([{ transform: 'translateX(80px)' }, { transform: 'translateX(0px)' }], {
                    duration: 600,
                    delay: 400,
                    fill: fill
                });

                eEl.animate([{ opacity: 0 }, { opacity: 1 }], {
                    duration: 200,
                    delay: 500,
                    fill: fill
                });

                eEl.animate([{ transform: 'translateX(50px)' }, { transform: 'translateX(0)' }], {
                    duration: 400,
                    delay: 600,
                    fill: fill
                });
            };

            return Promise.all([iAnim.finished, xAnim.finished]).then(function () {});

            var uframes = [];

            var iframes = [{
                opacity: 1,
                transform: 'rotate(0deg)'
            }, {
                opacity: 0,
                transform: 'rotate(180deg)'
            }];

            var xframes = [{
                opacity: 0,
                transform: 'rotate(-180deg)'
            }, {
                opacity: 1,
                transform: 'rotate(0deg)'
            }];

            var wordFrames = [{
                opacity: 0
            }, {
                opacity: 1
            }];

            var ixoptions = {
                duration: 300,
                fill: fill,
                delay: 1000
            };

            this.nodes.i.animate(iframes, ixoptions);
            this.nodes.x.animate(xframes, ixoptions);

            this.nodes.architect.animate(wordFrames, {
                fill: fill,
                duration: 300,
                delay: 1300
            });

            this.nodes.designer.animate(wordFrames, {
                fill: fill,
                duration: 300,
                delay: 1400
            });

            this.nodes.engineer.animate(wordFrames, {
                fill: fill,
                duration: 300,
                delay: 1600
            });
        };

        Title.prototype._startAnimation = function _startAnimation() {
            var _this2 = this;

            var ux = this.uxAnimation;
            var _iAnimEnd = void 0;
            var _xAnimEnd = void 0;
            var startType = void 0;
            var _uxAnimEnd = void 0;
            var startReset = void 0;

            var iEl = ux.querySelector('.i');
            var xEl = ux.querySelector('.x');
            var tEl = ux.querySelector('.type');

            startReset = function startReset() {
                var id = setTimeout(function () {
                    _this2.startAnimation();
                    clearTimeout(id);
                }, 3000);
            };

            _uxAnimEnd = function uxAnimEnd(event) {
                ux.classList.remove('animate-out');
                ux.classList.remove('split-ix');
                tEl.innerHTML = '';
                ux.removeEventListener('animationend', _uxAnimEnd);

                var id = setTimeout(function () {
                    ux.classList.add('animate');
                    clearTimeout(id);
                }, 1000);
            };

            _iAnimEnd = function iAnimEnd(event) {
                iEl.removeEventListener('animationend', _iAnimEnd);
            };

            _xAnimEnd = function xAnimEnd(event) {
                ux.classList.add('split-ix');
                startType();
                xEl.removeEventListener('animationend', _xAnimEnd);
            };

            startType = function startType() {
                var arr = chars.split('');
                var intId = setInterval(function () {
                    if (arr.length) {
                        arr.shift();
                    } else {
                        startReset();
                        clearInterval(intId);
                    }
                }, 50);
            };

            if (ux.classList.contains('animate')) {} else {}
        };

        return Title;
    }();
});
define('resources/attributes/ripple',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Ripple = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _dec2, _class;

    var Ripple = exports.Ripple = (_dec = (0, _aureliaFramework.customAttribute)('ripple'), _dec2 = (0, _aureliaFramework.inject)(Element, _aureliaFramework.ElementEvents), _dec(_class = _dec2(_class = function () {
        function Ripple(Element, ElementEvents) {
            _classCallCheck(this, Ripple);

            this.element = Element;
            this.events = ElementEvents;
        }

        Ripple.prototype.bind = function bind() {
            var _this = this;

            this.eventName = 'mousedown';

            if (document.documentElement.classList.contains('platform-ios')) {
                this.eventName = 'touchstart';
            }

            this.events.subscribe(this.eventName, function (event) {
                _this.ripple(event);
            });
        };

        Ripple.prototype._getContainer = function _getContainer() {
            return this.container ? this.container : this.container = document.createElement('ripple-container');
        };

        Ripple.prototype._getBackground = function _getBackground() {
            if (this.element.dataset.useFill) {
                return this.element.dataset.useFill;
            }
            this._computed = this._computed || window.getComputedStyle(this.element);
            var background = this._computed.getPropertyValue('color');
            return background;
        };

        Ripple.prototype._createRipple = function _createRipple() {
            var ripple = document.createElement('ripple');
            var _listener = null;
            ripple.addEventListener('animationend', _listener = function listener(event) {
                ripple.parentNode.removeChild(ripple);
                ripple.removeEventListener('animationend', _listener);
            });
            return ripple;
        };

        Ripple.prototype.ripple = function ripple(event) {
            this.element.style.position = 'relative';

            var container = this._getContainer();
            var background = this._getBackground();
            var ripple = this._createRipple();
            var height = this.element.clientHeight;
            var width = this.element.clientWidth;
            var size = height > width ? height : width;
            var rect = this.element.getBoundingClientRect();

            var clientX = event.clientX;
            var clientY = event.clientY;

            if (event.touches && event.touches.length) {
                clientX = event.touches[0].clientX;
                clientY = event.touches[0].clientY;
            }
            var bounds = {
                left: clientX - rect.left,
                top: clientY - rect.top
            };

            var half = size / 2;

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

            console.log(this.element);
        };

        return Ripple;
    }()) || _class) || _class);
});
define('resources/elements/dialog/dialog-container',['exports', 'aurelia-framework', 'resources/elements/dialog/dialog-result', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _dialogResult, _aureliaEventAggregator) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.DialogContainer = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var DialogContainer = exports.DialogContainer = (_dec = (0, _aureliaFramework.inject)(Element, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
        function DialogContainer(element, EventAggregator) {
            var _this = this;

            _classCallCheck(this, DialogContainer);

            this.element = element;
            this.eventAggregator = EventAggregator;

            var self = this;
            this.dialogModel = {
                cancel: function cancel() {
                    return self.determinCancelation({ wasCancelled: true });
                },
                close: function close(value) {
                    return self.determinCancelation({ wasCancelled: !!value || true, result: value });
                },
                ok: function ok(value) {
                    return self.determinCancelation({ wasCancelled: false, result: value });
                }
            };

            this.eventAggregator.subscribe('dialog:compose', function (instruction) {
                _this.currentInstruction = instruction;
                var resolve = instruction.resolve;
                instruction.resolve = function () {
                    _this.currentInstruction = null;
                    return resolve.apply(undefined, arguments);
                };
            });

            this.eventAggregator.subscribe('dialog:cancel', function () {
                _this.dialogModel.cancel();
            });
            this.eventAggregator.subscribe('dialog:close', function (payload) {
                _this.dialogModel.close(payload);
            });
            this.eventAggregator.subscribe('dialog:ok', function (payload) {
                _this.dialogModel.ok(payload);
            });
        }

        DialogContainer.prototype.determinCancelation = function determinCancelation(result) {
            result = new _dialogResult.DialogResult(result);
            var currentInstruction = this.currentInstruction;
            if (currentInstruction) {
                this.currentInstruction = null;
                return currentInstruction.resolve(result);
            }
            return Promise.resolve(result);
        };

        return DialogContainer;
    }()) || _class);
});
define('resources/elements/dialog/dialog-result',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var DialogResult = exports.DialogResult = function DialogResult(instruction) {
        _classCallCheck(this, DialogResult);

        this.result = {};
        this.warning = false;
        this.error = false;
        this.wasCancelled = true;

        Object.assign(this, instruction);
    };
});
define('resources/elements/dialog/dialog',['exports', 'aurelia-framework', 'resources/elements/dialog/service'], function (exports, _aureliaFramework, _service) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Dialog = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _dec2, _class;

    var Dialog = exports.Dialog = (_dec = (0, _aureliaFramework.customElement)('dialog'), _dec2 = (0, _aureliaFramework.inject)(Element, _service.DialogService), _dec(_class = _dec2(_class = function () {
        function Dialog(element, service) {
            _classCallCheck(this, Dialog);

            this.service = service;
        }

        Dialog.prototype.attached = function attached() {
            console.log('attached');
        };

        Dialog.prototype.close = function close(result) {
            return this.service.close(result);
        };

        Dialog.prototype.cancel = function cancel() {
            return this.service.cancel();
        };

        Dialog.prototype.ok = function ok(value) {
            return this.service.ok(value);
        };

        return Dialog;
    }()) || _class) || _class);
});
define('resources/elements/dialog/service',['exports', 'aurelia-framework', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _aureliaEventAggregator) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.DialogService = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _dec2, _class;

    var DialogService = exports.DialogService = (_dec = (0, _aureliaFramework.transient)(), _dec2 = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator), _dec(_class = _dec2(_class = function () {
        function DialogService(EventAggregator) {
            _classCallCheck(this, DialogService);

            this.eventAggregator = EventAggregator;
        }

        DialogService.prototype.compose = function compose(viewModel) {
            var _this = this;

            return new Promise(function (resolve) {
                var instruction = {
                    viewModel: viewModel,
                    resolve: resolve
                };
                _this.eventAggregator.publish('dialog:compose', instruction);
            });
        };

        DialogService.prototype.cancel = function cancel() {
            this.eventAggregator.publish('dialog:cancel');
        };

        DialogService.prototype.close = function close(value) {
            this.eventAggregator.publish('dialog:close', value);
        };

        DialogService.prototype.ok = function ok(value) {
            this.eventAggregator.publish('dialog:ok', value);
        };

        return DialogService;
    }()) || _class) || _class);
});
define('resources/elements/checkbox/checkbox',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Checkbox = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _dec2, _dec3, _dec4, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3;

    var twoWay = { defaultBindingMode: 2 };

    var Checkbox = exports.Checkbox = (_dec = (0, _aureliaFramework.inject)(Element), _dec2 = (0, _aureliaFramework.bindable)(twoWay), _dec3 = (0, _aureliaFramework.bindable)(twoWay), _dec4 = (0, _aureliaFramework.bindable)(twoWay), _dec(_class = (_class2 = function () {
        function Checkbox(Element) {
            _classCallCheck(this, Checkbox);

            _initDefineProp(this, 'value', _descriptor, this);

            _initDefineProp(this, 'model', _descriptor2, this);

            _initDefineProp(this, 'checked', _descriptor3, this);

            this.element = Element;
        }

        Checkbox.prototype.attached = function attached() {
            var input = this.element.querySelector('input');
            var label = input.labels[0];

            if (label && label instanceof Element) {
                label.classList.add('checkbox-label');
            }
        };

        return Checkbox;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'value', [_dec2], {
        enumerable: true,
        initializer: function initializer() {
            return null;
        }
    }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'model', [_dec3], {
        enumerable: true,
        initializer: function initializer() {
            return null;
        }
    }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'checked', [_dec4], {
        enumerable: true,
        initializer: function initializer() {
            return false;
        }
    })), _class2)) || _class);
});
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=./app.css></require><div class=app-background></div><dialog-container></dialog-container><navigation></navigation><container><compose containerless view-model.bind=header></compose><main><template repeat.for=\"view of State.views\"><nav-section class=\"${$first ? 'first' : $last ? 'last' : ''} app-${view.name}\" ref=view.element view.bind=view></nav-section></template></main><compose containerless view-model.bind=footer></compose></container><div class=background-container></div></template>"; });
define('text!modules/connect/connect-card.html', ['module'], function(module) { module.exports = "<template bindable=\"item, props\" class=\"connection connection-${item.name}\"><a href.bind=\"item.url || item.href || 'javascript:;'\" click.delegate=\"props.handleItemClick($event, item)\"><template if.bind=item.html><compose class=\"anim-logo anim-${item.name}-logo\" view=modules/connect/${item.name}-logo.html></compose></template><template if.bind=\"!item.html && item.icon\"><icon ico.bind=item.icon></icon></template><template if.bind=\"!item.html && item.logo\"><div class=connection-logo><img src.bind=item.logo></div></template><template if.bind=item.url><span class=anchor href.bind=item.url title=\"go to ${item.title}\">@${item.name}</span></template><template if.bind=item.value><span class=text>${item.value}</span></template></a><template if.bind=item.url><input ref=item.input click.delegate=item.input.select() class=url type=text value.bind=item.url title=\"${item.title} Web Address\"></template></template>"; });
define('text!modules/connect/connect.html', ['module'], function(module) { module.exports = "<template><require from=modules/connect/connect-card.html as=connect-card></require><article class=\"connect-card private\"><template if.bind=robotUser.value><template repeat.for=\"item of props.private\"><connect-card props.bind=props item.bind=item></connect-card></template></template><template if.bind=!robotUser.value><button class=\"btn btn-blue\" click.delegate=validateUserIsNotARobot($event)>Contact</button></template></article><article class=connect-card><template repeat.for=\"item of props.public\"><connect-card props.bind=props item.bind=item></connect-card></template></article></template>"; });
define('text!modules/connect/email-logo.html', ['module'], function(module) { module.exports = "<template><svg xmlns=http://www.w3.org/2000/svg fill=#000000 height=24 viewBox=\"0 0 24 24\" width=24><path d=\"M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z\"/><path d=\"M0 0h24v24H0z\" fill=none /></svg></template>"; });
define('text!app.css', ['module'], function(module) { module.exports = "@import url(\"https://fonts.googleapis.com/css?family=Roboto\");\nnav-section {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  min-height: 100%;\n  position: relative; }\n  nav-section .row {\n    flex: 1 0 auto;\n    display: flex;\n    align-items: flex-start;\n    justify-content: flex-start;\n    flex-direction: row; }\n  nav-section .section-container {\n    flex: 1;\n    height: auto;\n    display: flex;\n    position: relative;\n    flex-direction: column;\n    align-items: stretch;\n    justify-content: flex-start;\n    padding-top: 200px;\n    box-shadow: -3px 0 3px rgba(0, 0, 0, 0.3);\n    background-color: inherit;\n    z-index: 4; }\n  nav-section article {\n    margin-bottom: 24px;\n    display: flex;\n    flex-direction: column;\n    align-self: stretch; }\n  nav-section header.nav-section-header {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    min-height: 56px;\n    font-size: 36px;\n    transform: translateY(150%);\n    color: inherit;\n    display: flex;\n    text-align: left;\n    padding-left: 36px;\n    flex-direction: row;\n    align-items: flex-start;\n    justify-content: flex-start; }\n    nav-section header.nav-section-header .header-title {\n      flex: 1;\n      display: block;\n      text-align: inherit;\n      font-size: inherit;\n      color: inherit; }\n    @media screen and (min-width: 768px) {\n      nav-section header.nav-section-header {\n        font-size: 56px;\n        text-align: center;\n        padding-left: 0; } }\n  nav-section.light-tint-section {\n    color: white; }\n  nav-section.dark-tint-section {\n    color: rgba(0, 0, 0, 0.87); }\n\ncontainer > header.nav-section-header {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.12); }\n\n.app-section-header {\n  opacity: 0;\n  visibility: hidden; }\n  .app-section-header icon {\n    position: relative;\n    user-select: none;\n    height: 56px;\n    width: 56px;\n    line-height: 56px;\n    text-align: center;\n    cursor: pointer;\n    color: inherit; }\n  .app-section-header icon.menu-icon {\n    display: none; }\n  .app-section-header .header-title {\n    user-select: none;\n    padding: 0 56px;\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    text-align: left;\n    display: block;\n    font-size: 24px;\n    line-height: 56px;\n    font-weight: bold;\n    cursor: pointer;\n    user-select: none;\n    color: inherit; }\n  .app-section-header.fixed {\n    opacity: 0;\n    visibility: hidden; }\n    .app-section-header.fixed:hover .header-title {\n      opacity: 0.7; }\n  .app-section-header.first {\n    opacity: 0;\n    visibility: hidden; }\n\nnavigation {\n  position: fixed;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  min-height: 100vh;\n  max-height: 100vh;\n  width: 200px;\n  z-index: 2;\n  pointer-events: none;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  justify-content: flex-start; }\n  navigation > header {\n    display: block;\n    width: 100%;\n    background-color: rgba(255, 255, 255, 0.6);\n    height: 56px;\n    box-shadow: 0 3px 4px rgba(0, 0, 0, 0.2); }\n  navigation > section {\n    flex: 1;\n    display: block;\n    width: 100%; }\n  navigation > footer {\n    background-color: rgba(255, 255, 255, 0.6);\n    display: block;\n    width: 100%;\n    height: 56px;\n    box-shadow: 0 -3px 4px rgba(0, 0, 0, 0.2); }\n  navigation ul.navigation-list {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    flex: 1 0 auto;\n    margin: 0;\n    padding: 0;\n    list-style: none;\n    display: flex;\n    flex-direction: column;\n    align-items: flex-start;\n    justify-content: flex-start; }\n    navigation ul.navigation-list:after, navigation ul.navigation-list:before {\n      display: block;\n      content: \" \";\n      background-color: rgba(255, 255, 255, 0.6);\n      width: 100%; }\n    navigation ul.navigation-list:before {\n      min-height: 56px;\n      max-height: 56px; }\n    navigation ul.navigation-list:after {\n      flex: 1 0 auto; }\n    navigation ul.navigation-list li {\n      flex: 1 0 auto;\n      color: inherit;\n      width: 100%;\n      pointer-events: auto;\n      display: flex;\n      flex-direction: row;\n      align-items: flex-start;\n      justify-content: flex-start;\n      min-height: 48px;\n      max-height: 48px;\n      cursor: pointer;\n      background-color: rgba(255, 255, 255, 0.6);\n      transition: background-color 0.3s ease 0s; }\n      navigation ul.navigation-list li icon {\n        color: rgba(0, 0, 0, 0.87);\n        pointer-events: none;\n        margin: 12px; }\n      navigation ul.navigation-list li span.text {\n        pointer-events: none;\n        flex: 0 1 auto;\n        font-size: 16px;\n        font-weight: 500;\n        line-height: 48px;\n        letter-spacing: 1.34px;\n        user-select: none;\n        color: rgba(0, 0, 0, 0.87); }\n      navigation ul.navigation-list li.active icon, navigation ul.navigation-list li.active span.text {\n        color: inherit; }\n    navigation ul.navigation-list li:last-child {\n      height: auto;\n      flex: 1 0 auto;\n      background-color: rgba(255, 255, 255, 0.6); }\n\n@keyframes animate-main-right {\n  from {\n    transform: translate3d(0, 0, 0); }\n  to {\n    transform: translate3d(200px, 0, 0); } }\n\n@keyframes animate-main-default {\n  from {\n    transform: translate3d(200px, 0, 0); }\n  to {\n    transform: translate3d(0, 0, 0); } }\n\nripple-container {\n  pointer-events: none;\n  display: block;\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  min-height: 100%;\n  min-width: 100%;\n  overflow: hidden;\n  opacity: 0.8; }\n\nripple {\n  display: block;\n  position: absolute;\n  opacity: 0;\n  transform: scale(0);\n  top: 0;\n  left: 0;\n  border-radius: 100%;\n  animation-timing-function: linear;\n  animation-duration: 0.5s;\n  animation-fill-mode: forwards;\n  animation-name: show-ripple; }\n\n@keyframes show-ripple {\n  0% {\n    opacity: 0;\n    transform: scale(0); }\n  50% {\n    opacity: 1;\n    transform: scale(1); }\n  100% {\n    opacity: 0;\n    transform: scale(3); } }\n\n.app-title .ux-animation {\n  display: block;\n  width: 340px;\n  height: 28px;\n  margin: 0 auto;\n  position: relative;\n  display: flex;\n  justify-content: center;\n  animation-duration: 1s;\n  animation-timing-function: ease;\n  animation-fill-mode: forwards; }\n  .app-title .ux-animation span {\n    display: block;\n    float: left;\n    letter-spacing: 1.4px;\n    transform-origin: 150px; }\n  .platform-ios .app-title .ux-animation {\n    width: 340px;\n    text-align: center;\n    white-space: nowrap; }\n    .platform-ios .app-title .ux-animation span {\n      letter-spacing: 1px;\n      font-size: 80%; }\n\n@keyframes show-ux {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@keyframes hide-ux {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0; } }\n\n@keyframes start-spin-i {\n  from {\n    opacity: 1;\n    transform: rotate(0deg); }\n  to {\n    opacity: 0;\n    transform: rotate(180deg); } }\n\n@keyframes start-spin-x {\n  from {\n    opacity: 0;\n    transform: rotate(-180deg); }\n  to {\n    opacity: 1;\n    transform: rotate(0deg); } }\n\n@keyframes start-split-i {\n  0% {\n    opacity: 0;\n    transform: rotate(180deg); }\n  2% {\n    opacity: 0;\n    transform: rotate(0deg); }\n  100% {\n    opacity: 1;\n    transform: rotate(0deg); } }\n\n@keyframes start-split-x {\n  from {\n    opacity: 1;\n    transform: translate(0, 0); }\n  to {\n    opacity: 1;\n    transform: translate(100%, 0); } }\n\nheader.app-header {\n  display: flex;\n  flex-direction: row;\n  align-items: flex-start;\n  justify-content: flex-start;\n  min-height: 56px;\n  line-height: 56px;\n  background-color: #D9D9D9;\n  color: rgba(0, 0, 0, 0.87);\n  font-size: 24px;\n  border-bottom: rgba(0, 0, 0, 0.12);\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  z-index: 6;\n  border-width: 0;\n  border-color: rgba(0, 0, 0, 0.12); }\n  header.app-header .header-content {\n    flex: 1;\n    display: flex;\n    flex-direction: row;\n    align-items: flex-start;\n    justify-content: flex-start;\n    font-size: inherit;\n    line-height: inherit;\n    background-color: inherit;\n    color: inherit;\n    border-bottom-width: 1px;\n    border-bottom-style: solid;\n    border-bottom-color: inherit; }\n  header.app-header icon, header.app-header span {\n    color: inherit;\n    line-height: inherit;\n    cursor: pointer; }\n  header.app-header icon {\n    width: 56px;\n    text-align: center; }\n  header.app-header span {\n    font-size: inherit; }\n  header.app-header nav {\n    font-size: inherit;\n    line-height: inherit;\n    color: inherit;\n    position: relative;\n    display: block;\n    flex: 0 0 auto; }\n  header.app-header nav.left-nav {\n    order: -1; }\n  header.app-header nav.center-nav {\n    flex: 1; }\n  header.app-header nav.right-nav {\n    margin-left: auto; }\n\nfooter.app-footer {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-items: flex-start;\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  min-height: 56px;\n  z-index: 6;\n  font-size: 24px;\n  line-height: 56px;\n  color: rgba(0, 0, 0, 0.87);\n  max-height: 56px; }\n  footer.app-footer .footer-content {\n    flex: 1;\n    display: flex;\n    flex-direction: row;\n    align-items: flex-start;\n    justify-content: flex-start;\n    font-size: inherit;\n    line-height: inherit;\n    color: inherit; }\n  footer.app-footer icon, footer.app-footer span, footer.app-footer nav {\n    color: inherit;\n    line-height: inherit;\n    cursor: pointer; }\n  footer.app-footer span, footer.app-footer nav {\n    font-size: inherit; }\n  footer.app-footer icon {\n    width: 56px;\n    text-align: center; }\n  footer.app-footer nav.left-nav {\n    flex: 0 0 auto; }\n  footer.app-footer nav.center-nav {\n    flex: 1;\n    text-align: right; }\n  footer.app-footer nav.right-nav {\n    flex: 0 0 auto; }\n\ndialog-container {\n  display: block;\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: rgba(0, 0, 0, 0.2);\n  opacity: 0;\n  transition: opacity 0.5s ease;\n  z-index: 12;\n  visibility: hidden; }\n  dialog-container.active {\n    visibility: visible;\n    opacity: 1; }\n  dialog-container dialog {\n    display: flex;\n    flex-direction: column;\n    align-items: stretch;\n    justify-content: flex-start;\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    min-width: 100%;\n    max-width: 100%;\n    min-height: 200px;\n    max-height: 400px;\n    margin: auto;\n    background-color: white;\n    box-shadow: 0 10px 12px -8px rgba(0, 0, 0, 0.2), 0 8px 12px rgba(0, 0, 0, 0.1);\n    border-radius: 2px;\n    border: none;\n    padding: 0; }\n    dialog-container dialog header {\n      display: flex;\n      flex-direction: row;\n      align-items: flex-start;\n      justify-content: flex-start;\n      height: 48px;\n      line-height: 48px;\n      font-size: 24px;\n      font-weight: bold;\n      text-align: left;\n      padding: 0;\n      border-bottom: 1px solid rgba(0, 0, 0, 0.12); }\n      dialog-container dialog header icon {\n        width: 48px;\n        height: 48px;\n        line-height: 48px !important;\n        margin: 0;\n        color: #284B63;\n        text-align: center; }\n      dialog-container dialog header span.text {\n        padding: 0 24px 0 0;\n        line-height: 24px;\n        font-size: inherit;\n        margin: 12px 0;\n        display: block;\n        color: #284B63;\n        font-weight: normal;\n        flex: 1;\n        padding-left: 36px; }\n    dialog-container dialog section {\n      font-size: 16px;\n      padding: 24px;\n      flex: 1 0 auto; }\n    dialog-container dialog footer {\n      height: 48px;\n      max-height: 48px;\n      display: flex;\n      justify-content: flex-end;\n      align-items: center;\n      border-top: 1px solid rgba(0, 0, 0, 0.12); }\n      dialog-container dialog footer button.btn {\n        margin: 4px !important;\n        box-shadow: none !important; }\n        dialog-container dialog footer button.btn:hover {\n          background-color: rgba(0, 0, 0, 0.12); }\n        dialog-container dialog footer button.btn.cancel {\n          color: lightcoral; }\n        dialog-container dialog footer button.btn:last-child {\n          color: #77A0A2;\n          margin-right: 8px !important; }\n  @media screen and (min-width: 768px) {\n    dialog-container dialog {\n      min-width: 560px;\n      max-width: 560px;\n      min-height: 200px;\n      transform: translateY(-75%); } }\n\nlabel.checkbox-label {\n  line-height: 24px;\n  display: flex;\n  flex-direction: row;\n  align-items: flex-start;\n  justify-content: flex-start;\n  cursor: pointer;\n  color: #284B63;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  -o-user-select: none;\n  user-select: none; }\n  label.checkbox-label .text {\n    line-height: inherit;\n    margin: 12px 0;\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    -o-user-select: none;\n    user-select: none; }\n\ncheckbox {\n  position: relative;\n  display: inline-block;\n  width: 48px;\n  height: 48px;\n  color: inherit;\n  cursor: pointer; }\n  checkbox input[type=checkbox] {\n    z-index: 3; }\n  checkbox icon.checked {\n    z-index: 2; }\n  checkbox icon.unchecked {\n    z-index: 1; }\n  checkbox input[type=checkbox] {\n    margin: 0;\n    cursor: pointer;\n    pointer-events: auto;\n    z-index: 3;\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    width: 100%;\n    height: 100%;\n    display: block;\n    opacity: 0;\n    color: inherit;\n    background: transparent;\n    -webkit-appearance: none;\n    -moz-appearance: none;\n    -ms-appearance: none;\n    -o-appearance: none;\n    appearance: none; }\n  checkbox icon {\n    pointer-events: none;\n    position: absolute;\n    color: inherit;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    margin: 12px;\n    width: 24px;\n    height: 24px;\n    animation-timing-function: ease-out;\n    animation-fill-mode: forwards;\n    animation-duration: 0.2s; }\n  checkbox icon.unchecked {\n    opacity: 1;\n    transform: scale(1); }\n  checkbox icon.checked {\n    opacity: 0;\n    transform: scale(0); }\n  checkbox input[type=checkbox]:not(:checked) ~ icon.checked {\n    animation-name: hide-checked-icon; }\n  checkbox input[type=checkbox]:checked ~ icon.checked {\n    animation-name: show-checked-icon; }\n\n@keyframes show-checked-icon {\n  from {\n    opacity: 0;\n    transform: scale(0); }\n  to {\n    opacity: 1;\n    transform: scale(1); } }\n\n@keyframes hide-checked-icon {\n  from {\n    opacity: 1;\n    transform: scale(1); }\n  to {\n    opacity: 0;\n    transform: scale(0); } }\n\n*::-webkit-scrollbar {\n  display: none; }\n\n* {\n  -webkit-tap-highlight-color: transparent; }\n\nhtml {\n  width: 100vw;\n  height: 100vh;\n  color: #323232;\n  font-family: 'Roboto', sans-serif;\n  max-width: 100%;\n  max-height: 100vh;\n  min-height: 100vh;\n  overflow-x: hidden;\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch;\n  /* lets it scroll lazy */ }\n\nbody {\n  padding: 0;\n  margin: 0;\n  position: relative;\n  width: 100%;\n  max-width: 100%; }\n\nbutton {\n  background: transparent;\n  border: none;\n  outline: none;\n  -webkit-webkit-appearance: none;\n  -moz-webkit-appearance: none;\n  -ms-webkit-appearance: none;\n  -o-webkit-appearance: none;\n  webkit-appearance: none;\n  font-weight: normal;\n  text-transform: uppercase; }\n\nbutton.btn {\n  height: 36px;\n  min-width: 120px;\n  line-height: 36px;\n  padding: 0;\n  margin: 0;\n  align-self: flex-start;\n  box-shadow: 0 5px 4px -4px rgba(0, 0, 0, 0.2), 0 3px 4px rgba(0, 0, 0, 0.2);\n  transition: box-shadow 0.1s ease;\n  cursor: pointer; }\n  button.btn.btn-blue {\n    background-color: #284B63;\n    color: #D9D9D9; }\n  @media screen and (min-width: 768px) {\n    button.btn:hover {\n      box-shadow: 0 6px 6px -7px rgba(0, 0, 0, 0.2), 0 5px 6px rgba(0, 0, 0, 0.2); } }\n  button.btn:active {\n    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2); }\n  button.btn:disabled {\n    opacity: 0.5;\n    color: rgba(0, 0, 0, 0.54) !important;\n    cursor: not-allowed;\n    border: 1px solid rgba(0, 0, 0, 0.12);\n    background: rgba(0, 0, 0, 0.12); }\n\ncontainer {\n  position: relative;\n  display: block;\n  z-index: 3;\n  pointer-events: none;\n  box-shadow: -2px 0 4px rgba(0, 0, 0, 0.2); }\n  container > * {\n    pointer-events: auto; }\n\nmain {\n  display: flex;\n  flex-direction: column;\n  align-items: stretch;\n  justify-content: flex-start;\n  position: relative;\n  z-index: 5;\n  max-width: 100%;\n  overflow-x: hidden; }\n\nicon {\n  user-select: none; }\n\n.background-container {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  min-height: 100%;\n  display: flex;\n  align-items: stretch;\n  flex-direction: column;\n  z-index: 1;\n  transform: translate3d(-50px, 0, 0); }\n\n.app-background {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 0;\n  background-image: url(http://brodeurcampbellfence.com/wp-content/uploads/2013/03/gradient-background-more-white.jpg);\n  background-repeat: no-repeat;\n  background-size: cover; }\n\nnav-section {\n  height: auto;\n  min-height: 100vh;\n  flex: 1 0 auto;\n  min-width: 100%; }\n\nheader.nav-section-header {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  min-height: 56px;\n  display: flex;\n  flex-direction: row;\n  height: 56px;\n  z-index: 5; }\n\nnav-section header.nav-section-header {\n  position: absolute; }\n\nheader.header-title {\n  background-color: #D9D9D9;\n  color: rgba(0, 0, 0, 0.87); }\n  header.header-title icon {\n    color: rgba(0, 0, 0, 0.87); }\n  header.header-title .header-title {\n    color: rgba(0, 0, 0, 0.87); }\n\nnav-section.app-title {\n  background-color: #D9D9D9; }\n\n.background-container nav-section.app-title + nav-section {\n  position: relative; }\n  .background-container nav-section.app-title + nav-section:before {\n    content: \" \";\n    position: absolute;\n    top: 0;\n    right: 0;\n    left: 0;\n    min-height: 200px;\n    max-height: 200px;\n    width: 100%;\n    transform: translateY(-50%);\n    /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#D9D9D9+0,#284B63+100 */\n    background: #D9D9D9;\n    /* Old browsers */\n    background: -moz-linear-gradient(top, #D9D9D9 0%, #284B63 100%);\n    /* FF3.6-15 */\n    background: -webkit-linear-gradient(top, #D9D9D9 0%, #284B63 100%);\n    /* Chrome10-25,Safari5.1-6 */\n    background: linear-gradient(to bottom, #D9D9D9 0%, #284B63 100%);\n    /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */\n    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#D9D9D9', endColorstr='#284B63',GradientType=0 );\n    /* IE6-9 */ }\n\n.view-title-active navigation ul.navigation-list li.active {\n  background-color: transparent; }\n\n@media screen and (min-width: 768px) {\n  .view-title-active navigation ul.navigation-list li:hover {\n    background-color: rgba(255, 255, 255, 0.4); } }\n\n.view-title-no-header-title header.header-title .header-title {\n  opacity: 0;\n  visibility: hidden; }\n\n.view-title-topbar header.header-title {\n  top: 0;\n  bottom: unset;\n  opacity: 1;\n  visibility: visible; }\n  .view-title-topbar header.header-title icon.direction-icon {\n    margin-left: auto;\n    margin-right: 0; }\n  .view-title-topbar header.header-title icon.menu-icon {\n    margin-right: auto;\n    display: block; }\n  @media screen and (min-width: 1200px) {\n    .view-title-topbar header.header-title icon.menu-icon {\n      display: none; } }\n  .view-title-topbar header.header-title .header-title {\n    text-align: left;\n    transform: translate3d(0, 0, 0);\n    font-size: 24px; }\n\n.view-title-topbar.view-title-no-header-title header.header-title .header-title {\n  opacity: 0;\n  visibility: hidden; }\n\n.view-title-title:not(.view-title-topbar) header.header-title {\n  top: 0;\n  bottom: unset;\n  opacity: 0;\n  visibility: hidden; }\n  .view-title-title:not(.view-title-topbar) header.header-title icon.direction-icon {\n    margin-left: auto;\n    margin-right: 0; }\n  .view-title-title:not(.view-title-topbar) header.header-title icon.menu-icon {\n    margin-right: auto;\n    display: block; }\n  @media screen and (min-width: 1200px) {\n    .view-title-title:not(.view-title-topbar) header.header-title icon.menu-icon {\n      display: none; } }\n  .view-title-title:not(.view-title-topbar) header.header-title .header-title {\n    text-align: center;\n    transform: translate3d(0, 150%, 0);\n    font-size: 56px; }\n  .view-title-title:not(.view-title-topbar) header.header-title .header-title {\n    opacity: 0;\n    visibility: hidden; }\n\n.view-title-title nav-section.app-title header.nav-section-header {\n  top: 0;\n  bottom: unset;\n  opacity: 1;\n  visibility: visible; }\n  .view-title-title nav-section.app-title header.nav-section-header icon.direction-icon {\n    margin-left: auto;\n    margin-right: 0; }\n  .view-title-title nav-section.app-title header.nav-section-header icon.menu-icon {\n    margin-right: auto;\n    display: block; }\n  @media screen and (min-width: 1200px) {\n    .view-title-title nav-section.app-title header.nav-section-header icon.menu-icon {\n      display: none; } }\n  .view-title-title nav-section.app-title header.nav-section-header .header-title {\n    text-align: center;\n    transform: translate3d(0, 150%, 0);\n    font-size: 56px; }\n\n.view-title-peek header.header-title {\n  top: unset;\n  bottom: 0;\n  opacity: 1;\n  visibility: visible; }\n  .view-title-peek header.header-title icon.direction-icon {\n    margin-left: auto;\n    margin-right: 0;\n    transform: rotate(180deg); }\n  .view-title-peek header.header-title .header-title {\n    text-align: right;\n    transform: translate3d(0, 0, 0);\n    font-size: 24px; }\n\n.view-title-next header.header-title {\n  top: unset;\n  bottom: 0;\n  opacity: 1;\n  visibility: visible; }\n  .view-title-next header.header-title icon.direction-icon {\n    margin-left: auto;\n    margin-right: 0;\n    transform: rotate(180deg); }\n  .view-title-next header.header-title .header-title {\n    text-align: right;\n    transform: translate3d(0, 0, 0);\n    font-size: 24px; }\n\nheader.header-profile {\n  background-color: #284B63;\n  color: white; }\n  header.header-profile icon {\n    color: white; }\n  header.header-profile .header-title {\n    color: white; }\n\nnav-section.app-profile {\n  background-color: #284B63; }\n\n.background-container nav-section.app-profile + nav-section {\n  position: relative; }\n  .background-container nav-section.app-profile + nav-section:before {\n    content: \" \";\n    position: absolute;\n    top: 0;\n    right: 0;\n    left: 0;\n    min-height: 200px;\n    max-height: 200px;\n    width: 100%;\n    transform: translateY(-50%);\n    /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#284B63+0,#D9D9D9+100 */\n    background: #284B63;\n    /* Old browsers */\n    background: -moz-linear-gradient(top, #284B63 0%, #D9D9D9 100%);\n    /* FF3.6-15 */\n    background: -webkit-linear-gradient(top, #284B63 0%, #D9D9D9 100%);\n    /* Chrome10-25,Safari5.1-6 */\n    background: linear-gradient(to bottom, #284B63 0%, #D9D9D9 100%);\n    /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */\n    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#284B63', endColorstr='#D9D9D9',GradientType=0 );\n    /* IE6-9 */ }\n\n.view-profile-active navigation ul.navigation-list li.active {\n  background-color: transparent; }\n\n@media screen and (min-width: 768px) {\n  .view-profile-active navigation ul.navigation-list li:hover {\n    background-color: rgba(255, 255, 255, 0.4); } }\n\n.view-profile-no-header-title header.header-profile .header-title {\n  opacity: 0;\n  visibility: hidden; }\n\n.view-profile-topbar header.header-profile {\n  top: 0;\n  bottom: unset;\n  opacity: 1;\n  visibility: visible; }\n  .view-profile-topbar header.header-profile icon.direction-icon {\n    margin-left: auto;\n    margin-right: 0; }\n  .view-profile-topbar header.header-profile icon.menu-icon {\n    margin-right: auto;\n    display: block; }\n  @media screen and (min-width: 1200px) {\n    .view-profile-topbar header.header-profile icon.menu-icon {\n      display: none; } }\n  .view-profile-topbar header.header-profile .header-title {\n    text-align: left;\n    transform: translate3d(0, 0, 0);\n    font-size: 24px; }\n\n.view-profile-topbar.view-profile-no-header-title header.header-profile .header-title {\n  opacity: 0;\n  visibility: hidden; }\n\n.view-profile-title:not(.view-profile-topbar) header.header-profile {\n  top: 0;\n  bottom: unset;\n  opacity: 0;\n  visibility: hidden; }\n  .view-profile-title:not(.view-profile-topbar) header.header-profile icon.direction-icon {\n    margin-left: auto;\n    margin-right: 0; }\n  .view-profile-title:not(.view-profile-topbar) header.header-profile icon.menu-icon {\n    margin-right: auto;\n    display: block; }\n  @media screen and (min-width: 1200px) {\n    .view-profile-title:not(.view-profile-topbar) header.header-profile icon.menu-icon {\n      display: none; } }\n  .view-profile-title:not(.view-profile-topbar) header.header-profile .header-title {\n    text-align: center;\n    transform: translate3d(0, 150%, 0);\n    font-size: 56px; }\n  .view-profile-title:not(.view-profile-topbar) header.header-profile .header-title {\n    opacity: 0;\n    visibility: hidden; }\n\n.view-profile-title nav-section.app-profile header.nav-section-header {\n  top: 0;\n  bottom: unset;\n  opacity: 1;\n  visibility: visible; }\n  .view-profile-title nav-section.app-profile header.nav-section-header icon.direction-icon {\n    margin-left: auto;\n    margin-right: 0; }\n  .view-profile-title nav-section.app-profile header.nav-section-header icon.menu-icon {\n    margin-right: auto;\n    display: block; }\n  @media screen and (min-width: 1200px) {\n    .view-profile-title nav-section.app-profile header.nav-section-header icon.menu-icon {\n      display: none; } }\n  .view-profile-title nav-section.app-profile header.nav-section-header .header-title {\n    text-align: center;\n    transform: translate3d(0, 150%, 0);\n    font-size: 56px; }\n\n.view-profile-peek header.header-profile {\n  top: unset;\n  bottom: 0;\n  opacity: 1;\n  visibility: visible; }\n  .view-profile-peek header.header-profile icon.direction-icon {\n    margin-left: auto;\n    margin-right: 0;\n    transform: rotate(180deg); }\n  .view-profile-peek header.header-profile .header-title {\n    text-align: right;\n    transform: translate3d(0, 0, 0);\n    font-size: 24px; }\n\n.view-profile-next header.header-profile {\n  top: unset;\n  bottom: 0;\n  opacity: 1;\n  visibility: visible; }\n  .view-profile-next header.header-profile icon.direction-icon {\n    margin-left: auto;\n    margin-right: 0;\n    transform: rotate(180deg); }\n  .view-profile-next header.header-profile .header-title {\n    text-align: right;\n    transform: translate3d(0, 0, 0);\n    font-size: 24px; }\n\nheader.header-projects {\n  background-color: #D9D9D9;\n  color: rgba(0, 0, 0, 0.87); }\n  header.header-projects icon {\n    color: rgba(0, 0, 0, 0.87); }\n  header.header-projects .header-title {\n    color: rgba(0, 0, 0, 0.87); }\n\nnav-section.app-projects {\n  background-color: #D9D9D9; }\n\n.background-container nav-section.app-projects + nav-section {\n  position: relative; }\n  .background-container nav-section.app-projects + nav-section:before {\n    content: \" \";\n    position: absolute;\n    top: 0;\n    right: 0;\n    left: 0;\n    min-height: 200px;\n    max-height: 200px;\n    width: 100%;\n    transform: translateY(-50%);\n    /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#D9D9D9+0,#77A0A2+100 */\n    background: #D9D9D9;\n    /* Old browsers */\n    background: -moz-linear-gradient(top, #D9D9D9 0%, #77A0A2 100%);\n    /* FF3.6-15 */\n    background: -webkit-linear-gradient(top, #D9D9D9 0%, #77A0A2 100%);\n    /* Chrome10-25,Safari5.1-6 */\n    background: linear-gradient(to bottom, #D9D9D9 0%, #77A0A2 100%);\n    /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */\n    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#D9D9D9', endColorstr='#77A0A2',GradientType=0 );\n    /* IE6-9 */ }\n\n.view-projects-active navigation ul.navigation-list li.active {\n  background-color: transparent; }\n\n@media screen and (min-width: 768px) {\n  .view-projects-active navigation ul.navigation-list li:hover {\n    background-color: rgba(255, 255, 255, 0.4); } }\n\n.view-projects-no-header-title header.header-projects .header-title {\n  opacity: 0;\n  visibility: hidden; }\n\n.view-projects-topbar header.header-projects {\n  top: 0;\n  bottom: unset;\n  opacity: 1;\n  visibility: visible; }\n  .view-projects-topbar header.header-projects icon.direction-icon {\n    margin-left: auto;\n    margin-right: 0; }\n  .view-projects-topbar header.header-projects icon.menu-icon {\n    margin-right: auto;\n    display: block; }\n  @media screen and (min-width: 1200px) {\n    .view-projects-topbar header.header-projects icon.menu-icon {\n      display: none; } }\n  .view-projects-topbar header.header-projects .header-title {\n    text-align: left;\n    transform: translate3d(0, 0, 0);\n    font-size: 24px; }\n\n.view-projects-topbar.view-projects-no-header-title header.header-projects .header-title {\n  opacity: 0;\n  visibility: hidden; }\n\n.view-projects-title:not(.view-projects-topbar) header.header-projects {\n  top: 0;\n  bottom: unset;\n  opacity: 0;\n  visibility: hidden; }\n  .view-projects-title:not(.view-projects-topbar) header.header-projects icon.direction-icon {\n    margin-left: auto;\n    margin-right: 0; }\n  .view-projects-title:not(.view-projects-topbar) header.header-projects icon.menu-icon {\n    margin-right: auto;\n    display: block; }\n  @media screen and (min-width: 1200px) {\n    .view-projects-title:not(.view-projects-topbar) header.header-projects icon.menu-icon {\n      display: none; } }\n  .view-projects-title:not(.view-projects-topbar) header.header-projects .header-title {\n    text-align: center;\n    transform: translate3d(0, 150%, 0);\n    font-size: 56px; }\n  .view-projects-title:not(.view-projects-topbar) header.header-projects .header-title {\n    opacity: 0;\n    visibility: hidden; }\n\n.view-projects-title nav-section.app-projects header.nav-section-header {\n  top: 0;\n  bottom: unset;\n  opacity: 1;\n  visibility: visible; }\n  .view-projects-title nav-section.app-projects header.nav-section-header icon.direction-icon {\n    margin-left: auto;\n    margin-right: 0; }\n  .view-projects-title nav-section.app-projects header.nav-section-header icon.menu-icon {\n    margin-right: auto;\n    display: block; }\n  @media screen and (min-width: 1200px) {\n    .view-projects-title nav-section.app-projects header.nav-section-header icon.menu-icon {\n      display: none; } }\n  .view-projects-title nav-section.app-projects header.nav-section-header .header-title {\n    text-align: center;\n    transform: translate3d(0, 150%, 0);\n    font-size: 56px; }\n\n.view-projects-peek header.header-projects {\n  top: unset;\n  bottom: 0;\n  opacity: 1;\n  visibility: visible; }\n  .view-projects-peek header.header-projects icon.direction-icon {\n    margin-left: auto;\n    margin-right: 0;\n    transform: rotate(180deg); }\n  .view-projects-peek header.header-projects .header-title {\n    text-align: right;\n    transform: translate3d(0, 0, 0);\n    font-size: 24px; }\n\n.view-projects-next header.header-projects {\n  top: unset;\n  bottom: 0;\n  opacity: 1;\n  visibility: visible; }\n  .view-projects-next header.header-projects icon.direction-icon {\n    margin-left: auto;\n    margin-right: 0;\n    transform: rotate(180deg); }\n  .view-projects-next header.header-projects .header-title {\n    text-align: right;\n    transform: translate3d(0, 0, 0);\n    font-size: 24px; }\n\nheader.header-experience {\n  background-color: #77A0A2;\n  color: rgba(0, 0, 0, 0.87); }\n  header.header-experience icon {\n    color: rgba(0, 0, 0, 0.87); }\n  header.header-experience .header-title {\n    color: rgba(0, 0, 0, 0.87); }\n\nnav-section.app-experience {\n  background-color: #77A0A2; }\n\n.background-container nav-section.app-experience + nav-section {\n  position: relative; }\n  .background-container nav-section.app-experience + nav-section:before {\n    content: \" \";\n    position: absolute;\n    top: 0;\n    right: 0;\n    left: 0;\n    min-height: 200px;\n    max-height: 200px;\n    width: 100%;\n    transform: translateY(-50%);\n    /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#77A0A2+0,#D9D9D9+100 */\n    background: #77A0A2;\n    /* Old browsers */\n    background: -moz-linear-gradient(top, #77A0A2 0%, #D9D9D9 100%);\n    /* FF3.6-15 */\n    background: -webkit-linear-gradient(top, #77A0A2 0%, #D9D9D9 100%);\n    /* Chrome10-25,Safari5.1-6 */\n    background: linear-gradient(to bottom, #77A0A2 0%, #D9D9D9 100%);\n    /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */\n    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#77A0A2', endColorstr='#D9D9D9',GradientType=0 );\n    /* IE6-9 */ }\n\n.view-experience-active navigation ul.navigation-list li.active {\n  background-color: transparent; }\n\n@media screen and (min-width: 768px) {\n  .view-experience-active navigation ul.navigation-list li:hover {\n    background-color: rgba(255, 255, 255, 0.4); } }\n\n.view-experience-no-header-title header.header-experience .header-title {\n  opacity: 0;\n  visibility: hidden; }\n\n.view-experience-topbar header.header-experience {\n  top: 0;\n  bottom: unset;\n  opacity: 1;\n  visibility: visible; }\n  .view-experience-topbar header.header-experience icon.direction-icon {\n    margin-left: auto;\n    margin-right: 0; }\n  .view-experience-topbar header.header-experience icon.menu-icon {\n    margin-right: auto;\n    display: block; }\n  @media screen and (min-width: 1200px) {\n    .view-experience-topbar header.header-experience icon.menu-icon {\n      display: none; } }\n  .view-experience-topbar header.header-experience .header-title {\n    text-align: left;\n    transform: translate3d(0, 0, 0);\n    font-size: 24px; }\n\n.view-experience-topbar.view-experience-no-header-title header.header-experience .header-title {\n  opacity: 0;\n  visibility: hidden; }\n\n.view-experience-title:not(.view-experience-topbar) header.header-experience {\n  top: 0;\n  bottom: unset;\n  opacity: 0;\n  visibility: hidden; }\n  .view-experience-title:not(.view-experience-topbar) header.header-experience icon.direction-icon {\n    margin-left: auto;\n    margin-right: 0; }\n  .view-experience-title:not(.view-experience-topbar) header.header-experience icon.menu-icon {\n    margin-right: auto;\n    display: block; }\n  @media screen and (min-width: 1200px) {\n    .view-experience-title:not(.view-experience-topbar) header.header-experience icon.menu-icon {\n      display: none; } }\n  .view-experience-title:not(.view-experience-topbar) header.header-experience .header-title {\n    text-align: center;\n    transform: translate3d(0, 150%, 0);\n    font-size: 56px; }\n  .view-experience-title:not(.view-experience-topbar) header.header-experience .header-title {\n    opacity: 0;\n    visibility: hidden; }\n\n.view-experience-title nav-section.app-experience header.nav-section-header {\n  top: 0;\n  bottom: unset;\n  opacity: 1;\n  visibility: visible; }\n  .view-experience-title nav-section.app-experience header.nav-section-header icon.direction-icon {\n    margin-left: auto;\n    margin-right: 0; }\n  .view-experience-title nav-section.app-experience header.nav-section-header icon.menu-icon {\n    margin-right: auto;\n    display: block; }\n  @media screen and (min-width: 1200px) {\n    .view-experience-title nav-section.app-experience header.nav-section-header icon.menu-icon {\n      display: none; } }\n  .view-experience-title nav-section.app-experience header.nav-section-header .header-title {\n    text-align: center;\n    transform: translate3d(0, 150%, 0);\n    font-size: 56px; }\n\n.view-experience-peek header.header-experience {\n  top: unset;\n  bottom: 0;\n  opacity: 1;\n  visibility: visible; }\n  .view-experience-peek header.header-experience icon.direction-icon {\n    margin-left: auto;\n    margin-right: 0;\n    transform: rotate(180deg); }\n  .view-experience-peek header.header-experience .header-title {\n    text-align: right;\n    transform: translate3d(0, 0, 0);\n    font-size: 24px; }\n\n.view-experience-next header.header-experience {\n  top: unset;\n  bottom: 0;\n  opacity: 1;\n  visibility: visible; }\n  .view-experience-next header.header-experience icon.direction-icon {\n    margin-left: auto;\n    margin-right: 0;\n    transform: rotate(180deg); }\n  .view-experience-next header.header-experience .header-title {\n    text-align: right;\n    transform: translate3d(0, 0, 0);\n    font-size: 24px; }\n\nheader.header-education {\n  background-color: #D9D9D9;\n  color: rgba(0, 0, 0, 0.87); }\n  header.header-education icon {\n    color: rgba(0, 0, 0, 0.87); }\n  header.header-education .header-title {\n    color: rgba(0, 0, 0, 0.87); }\n\nnav-section.app-education {\n  background-color: #D9D9D9; }\n\n.background-container nav-section.app-education + nav-section {\n  position: relative; }\n  .background-container nav-section.app-education + nav-section:before {\n    content: \" \";\n    position: absolute;\n    top: 0;\n    right: 0;\n    left: 0;\n    min-height: 200px;\n    max-height: 200px;\n    width: 100%;\n    transform: translateY(-50%);\n    /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#D9D9D9+0,#353535+100 */\n    background: #D9D9D9;\n    /* Old browsers */\n    background: -moz-linear-gradient(top, #D9D9D9 0%, #353535 100%);\n    /* FF3.6-15 */\n    background: -webkit-linear-gradient(top, #D9D9D9 0%, #353535 100%);\n    /* Chrome10-25,Safari5.1-6 */\n    background: linear-gradient(to bottom, #D9D9D9 0%, #353535 100%);\n    /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */\n    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#D9D9D9', endColorstr='#353535',GradientType=0 );\n    /* IE6-9 */ }\n\n.view-education-active navigation ul.navigation-list li.active {\n  background-color: transparent; }\n\n@media screen and (min-width: 768px) {\n  .view-education-active navigation ul.navigation-list li:hover {\n    background-color: rgba(255, 255, 255, 0.4); } }\n\n.view-education-no-header-title header.header-education .header-title {\n  opacity: 0;\n  visibility: hidden; }\n\n.view-education-topbar header.header-education {\n  top: 0;\n  bottom: unset;\n  opacity: 1;\n  visibility: visible; }\n  .view-education-topbar header.header-education icon.direction-icon {\n    margin-left: auto;\n    margin-right: 0; }\n  .view-education-topbar header.header-education icon.menu-icon {\n    margin-right: auto;\n    display: block; }\n  @media screen and (min-width: 1200px) {\n    .view-education-topbar header.header-education icon.menu-icon {\n      display: none; } }\n  .view-education-topbar header.header-education .header-title {\n    text-align: left;\n    transform: translate3d(0, 0, 0);\n    font-size: 24px; }\n\n.view-education-topbar.view-education-no-header-title header.header-education .header-title {\n  opacity: 0;\n  visibility: hidden; }\n\n.view-education-title:not(.view-education-topbar) header.header-education {\n  top: 0;\n  bottom: unset;\n  opacity: 0;\n  visibility: hidden; }\n  .view-education-title:not(.view-education-topbar) header.header-education icon.direction-icon {\n    margin-left: auto;\n    margin-right: 0; }\n  .view-education-title:not(.view-education-topbar) header.header-education icon.menu-icon {\n    margin-right: auto;\n    display: block; }\n  @media screen and (min-width: 1200px) {\n    .view-education-title:not(.view-education-topbar) header.header-education icon.menu-icon {\n      display: none; } }\n  .view-education-title:not(.view-education-topbar) header.header-education .header-title {\n    text-align: center;\n    transform: translate3d(0, 150%, 0);\n    font-size: 56px; }\n  .view-education-title:not(.view-education-topbar) header.header-education .header-title {\n    opacity: 0;\n    visibility: hidden; }\n\n.view-education-title nav-section.app-education header.nav-section-header {\n  top: 0;\n  bottom: unset;\n  opacity: 1;\n  visibility: visible; }\n  .view-education-title nav-section.app-education header.nav-section-header icon.direction-icon {\n    margin-left: auto;\n    margin-right: 0; }\n  .view-education-title nav-section.app-education header.nav-section-header icon.menu-icon {\n    margin-right: auto;\n    display: block; }\n  @media screen and (min-width: 1200px) {\n    .view-education-title nav-section.app-education header.nav-section-header icon.menu-icon {\n      display: none; } }\n  .view-education-title nav-section.app-education header.nav-section-header .header-title {\n    text-align: center;\n    transform: translate3d(0, 150%, 0);\n    font-size: 56px; }\n\n.view-education-peek header.header-education {\n  top: unset;\n  bottom: 0;\n  opacity: 1;\n  visibility: visible; }\n  .view-education-peek header.header-education icon.direction-icon {\n    margin-left: auto;\n    margin-right: 0;\n    transform: rotate(180deg); }\n  .view-education-peek header.header-education .header-title {\n    text-align: right;\n    transform: translate3d(0, 0, 0);\n    font-size: 24px; }\n\n.view-education-next header.header-education {\n  top: unset;\n  bottom: 0;\n  opacity: 1;\n  visibility: visible; }\n  .view-education-next header.header-education icon.direction-icon {\n    margin-left: auto;\n    margin-right: 0;\n    transform: rotate(180deg); }\n  .view-education-next header.header-education .header-title {\n    text-align: right;\n    transform: translate3d(0, 0, 0);\n    font-size: 24px; }\n\nheader.header-technology {\n  background-color: #353535;\n  color: white; }\n  header.header-technology icon {\n    color: white; }\n  header.header-technology .header-title {\n    color: white; }\n\nnav-section.app-technology {\n  background-color: #353535; }\n\n.background-container nav-section.app-technology + nav-section {\n  position: relative; }\n  .background-container nav-section.app-technology + nav-section:before {\n    content: \" \";\n    position: absolute;\n    top: 0;\n    right: 0;\n    left: 0;\n    min-height: 200px;\n    max-height: 200px;\n    width: 100%;\n    transform: translateY(-50%);\n    /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#353535+0,#D9D9D9+100 */\n    background: #353535;\n    /* Old browsers */\n    background: -moz-linear-gradient(top, #353535 0%, #D9D9D9 100%);\n    /* FF3.6-15 */\n    background: -webkit-linear-gradient(top, #353535 0%, #D9D9D9 100%);\n    /* Chrome10-25,Safari5.1-6 */\n    background: linear-gradient(to bottom, #353535 0%, #D9D9D9 100%);\n    /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */\n    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#353535', endColorstr='#D9D9D9',GradientType=0 );\n    /* IE6-9 */ }\n\n.view-technology-active navigation ul.navigation-list li.active {\n  background-color: transparent; }\n\n@media screen and (min-width: 768px) {\n  .view-technology-active navigation ul.navigation-list li:hover {\n    background-color: rgba(255, 255, 255, 0.4); } }\n\n.view-technology-no-header-title header.header-technology .header-title {\n  opacity: 0;\n  visibility: hidden; }\n\n.view-technology-topbar header.header-technology {\n  top: 0;\n  bottom: unset;\n  opacity: 1;\n  visibility: visible; }\n  .view-technology-topbar header.header-technology icon.direction-icon {\n    margin-left: auto;\n    margin-right: 0; }\n  .view-technology-topbar header.header-technology icon.menu-icon {\n    margin-right: auto;\n    display: block; }\n  @media screen and (min-width: 1200px) {\n    .view-technology-topbar header.header-technology icon.menu-icon {\n      display: none; } }\n  .view-technology-topbar header.header-technology .header-title {\n    text-align: left;\n    transform: translate3d(0, 0, 0);\n    font-size: 24px; }\n\n.view-technology-topbar.view-technology-no-header-title header.header-technology .header-title {\n  opacity: 0;\n  visibility: hidden; }\n\n.view-technology-title:not(.view-technology-topbar) header.header-technology {\n  top: 0;\n  bottom: unset;\n  opacity: 0;\n  visibility: hidden; }\n  .view-technology-title:not(.view-technology-topbar) header.header-technology icon.direction-icon {\n    margin-left: auto;\n    margin-right: 0; }\n  .view-technology-title:not(.view-technology-topbar) header.header-technology icon.menu-icon {\n    margin-right: auto;\n    display: block; }\n  @media screen and (min-width: 1200px) {\n    .view-technology-title:not(.view-technology-topbar) header.header-technology icon.menu-icon {\n      display: none; } }\n  .view-technology-title:not(.view-technology-topbar) header.header-technology .header-title {\n    text-align: center;\n    transform: translate3d(0, 150%, 0);\n    font-size: 56px; }\n  .view-technology-title:not(.view-technology-topbar) header.header-technology .header-title {\n    opacity: 0;\n    visibility: hidden; }\n\n.view-technology-title nav-section.app-technology header.nav-section-header {\n  top: 0;\n  bottom: unset;\n  opacity: 1;\n  visibility: visible; }\n  .view-technology-title nav-section.app-technology header.nav-section-header icon.direction-icon {\n    margin-left: auto;\n    margin-right: 0; }\n  .view-technology-title nav-section.app-technology header.nav-section-header icon.menu-icon {\n    margin-right: auto;\n    display: block; }\n  @media screen and (min-width: 1200px) {\n    .view-technology-title nav-section.app-technology header.nav-section-header icon.menu-icon {\n      display: none; } }\n  .view-technology-title nav-section.app-technology header.nav-section-header .header-title {\n    text-align: center;\n    transform: translate3d(0, 150%, 0);\n    font-size: 56px; }\n\n.view-technology-peek header.header-technology {\n  top: unset;\n  bottom: 0;\n  opacity: 1;\n  visibility: visible; }\n  .view-technology-peek header.header-technology icon.direction-icon {\n    margin-left: auto;\n    margin-right: 0;\n    transform: rotate(180deg); }\n  .view-technology-peek header.header-technology .header-title {\n    text-align: right;\n    transform: translate3d(0, 0, 0);\n    font-size: 24px; }\n\n.view-technology-next header.header-technology {\n  top: unset;\n  bottom: 0;\n  opacity: 1;\n  visibility: visible; }\n  .view-technology-next header.header-technology icon.direction-icon {\n    margin-left: auto;\n    margin-right: 0;\n    transform: rotate(180deg); }\n  .view-technology-next header.header-technology .header-title {\n    text-align: right;\n    transform: translate3d(0, 0, 0);\n    font-size: 24px; }\n\nheader.header-connect {\n  background-color: #D9D9D9;\n  color: rgba(0, 0, 0, 0.87); }\n  header.header-connect icon {\n    color: rgba(0, 0, 0, 0.87); }\n  header.header-connect .header-title {\n    color: rgba(0, 0, 0, 0.87); }\n\nnav-section.app-connect {\n  background-color: #D9D9D9; }\n\n.view-connect-active navigation ul.navigation-list li.active {\n  background-color: transparent; }\n\n@media screen and (min-width: 768px) {\n  .view-connect-active navigation ul.navigation-list li:hover {\n    background-color: rgba(255, 255, 255, 0.4); } }\n\n.view-connect-no-header-title header.header-connect .header-title {\n  opacity: 0;\n  visibility: hidden; }\n\n.view-connect-topbar header.header-connect {\n  top: 0;\n  bottom: unset;\n  opacity: 1;\n  visibility: visible; }\n  .view-connect-topbar header.header-connect icon.direction-icon {\n    margin-left: auto;\n    margin-right: 0; }\n  .view-connect-topbar header.header-connect icon.menu-icon {\n    margin-right: auto;\n    display: block; }\n  @media screen and (min-width: 1200px) {\n    .view-connect-topbar header.header-connect icon.menu-icon {\n      display: none; } }\n  .view-connect-topbar header.header-connect .header-title {\n    text-align: left;\n    transform: translate3d(0, 0, 0);\n    font-size: 24px; }\n\n.view-connect-topbar.view-connect-no-header-title header.header-connect .header-title {\n  opacity: 0;\n  visibility: hidden; }\n\n.view-connect-title:not(.view-connect-topbar) header.header-connect {\n  top: 0;\n  bottom: unset;\n  opacity: 0;\n  visibility: hidden; }\n  .view-connect-title:not(.view-connect-topbar) header.header-connect icon.direction-icon {\n    margin-left: auto;\n    margin-right: 0; }\n  .view-connect-title:not(.view-connect-topbar) header.header-connect icon.menu-icon {\n    margin-right: auto;\n    display: block; }\n  @media screen and (min-width: 1200px) {\n    .view-connect-title:not(.view-connect-topbar) header.header-connect icon.menu-icon {\n      display: none; } }\n  .view-connect-title:not(.view-connect-topbar) header.header-connect .header-title {\n    text-align: center;\n    transform: translate3d(0, 150%, 0);\n    font-size: 56px; }\n  .view-connect-title:not(.view-connect-topbar) header.header-connect .header-title {\n    opacity: 0;\n    visibility: hidden; }\n\n.view-connect-title nav-section.app-connect header.nav-section-header {\n  top: 0;\n  bottom: unset;\n  opacity: 1;\n  visibility: visible; }\n  .view-connect-title nav-section.app-connect header.nav-section-header icon.direction-icon {\n    margin-left: auto;\n    margin-right: 0; }\n  .view-connect-title nav-section.app-connect header.nav-section-header icon.menu-icon {\n    margin-right: auto;\n    display: block; }\n  @media screen and (min-width: 1200px) {\n    .view-connect-title nav-section.app-connect header.nav-section-header icon.menu-icon {\n      display: none; } }\n  .view-connect-title nav-section.app-connect header.nav-section-header .header-title {\n    text-align: center;\n    transform: translate3d(0, 150%, 0);\n    font-size: 56px; }\n\n.view-connect-peek header.header-connect {\n  top: unset;\n  bottom: 0;\n  opacity: 1;\n  visibility: visible; }\n  .view-connect-peek header.header-connect icon.direction-icon {\n    margin-left: auto;\n    margin-right: 0;\n    transform: rotate(180deg); }\n  .view-connect-peek header.header-connect .header-title {\n    text-align: right;\n    transform: translate3d(0, 0, 0);\n    font-size: 24px; }\n\n.view-connect-next header.header-connect {\n  top: unset;\n  bottom: 0;\n  opacity: 1;\n  visibility: visible; }\n  .view-connect-next header.header-connect icon.direction-icon {\n    margin-left: auto;\n    margin-right: 0;\n    transform: rotate(180deg); }\n  .view-connect-next header.header-connect .header-title {\n    text-align: right;\n    transform: translate3d(0, 0, 0);\n    font-size: 24px; }\n\n.view-title-topbar header.app-header icon.direction-icon {\n  display: none; }\n\n@media screen and (max-width: 1200px) {\n  container > header:first-of-type {\n    visibility: visible;\n    opacity: 1; }\n  container > main,\n  container > header {\n    animation-timing-function: ease-out;\n    animation-fill-mode: forwards;\n    animation-duration: 0.3s; }\n  container.showing-navigation > main,\n  container.showing-navigation > header {\n    animation-name: animate-main-right; }\n  container.show-navigation > main,\n  container.show-navigation > header {\n    transform: translate3d(200px, 0, 0); }\n  container.hiding-navigation > main,\n  container.hiding-navigation > header {\n    animation-name: animate-main-default; }\n  container.hide-navigatin > main,\n  container.hide-navigatin > header {\n    transform: translate3d(0, 0, 0); } }\n\n.profile-background {\n  background-color: #284B63; }\n\n.technology-background {\n  background-color: #353535; }\n\n.projects-background {\n  background-color: #D9D9D9; }\n\n.experience-background {\n  background-color: #77A0A2; }\n\n.education-background {\n  background-color: #D9D9D9; }\n\n.app-title {\n  background-color: #D9D9D9; }\n  .app-title-header {\n    background-color: #D9D9D9; }\n\n.app-profile {\n  background-color: #284B63; }\n  .app-profile article {\n    flex: 1 0 auto;\n    display: flex;\n    flex-direction: column;\n    align-items: stretch;\n    justify-content: flex-start; }\n  .app-profile .profile-image {\n    flex: 0 0 258px;\n    margin: 0 auto;\n    text-align: center; }\n    .app-profile .profile-image img {\n      height: 250px;\n      width: 250px;\n      border-radius: 100%;\n      border: 4px solid white;\n      box-shadow: 0 10px 10px -6px rgba(0, 0, 0, 0.2); }\n  @media screen and (min-width: 1200px) {\n    .app-profile {\n      text-align: center; }\n      .app-profile .profile-image {\n        flex: 0 0 358px; }\n        .app-profile .profile-image img {\n          width: 350px;\n          height: 350px; } }\n  .app-profile .profile-content {\n    flex: 1; }\n  .app-profile ul.profile-detail {\n    list-style: none;\n    margin: 24px 0;\n    padding: 0; }\n    .app-profile ul.profile-detail li {\n      min-height: 48px;\n      line-height: 48px;\n      font-size: 24px;\n      color: white;\n      margin-bottom: 12px;\n      display: flex;\n      flex-direction: column;\n      align-items: flex-start;\n      justify-content: flex-start;\n      padding-bottom: 12px; }\n      .app-profile ul.profile-detail li label {\n        font-size: 14px;\n        padding-right: 12px;\n        color: rgba(255, 255, 255, 0.7);\n        font-weight: bold;\n        margin: 0;\n        flex: 1;\n        padding-left: 36px; }\n      .app-profile ul.profile-detail li .value {\n        flex: 1;\n        display: flex;\n        flex-direction: column;\n        align-items: stretch;\n        justify-content: flex-start;\n        font-size: inherit;\n        line-height: inherit;\n        color: inherit; }\n      .app-profile ul.profile-detail li p {\n        font-size: inherit;\n        line-height: inherit;\n        color: inherit;\n        text-align: left;\n        padding-left: 36px;\n        margin: 0;\n        border-left: 1px solid rgba(255, 255, 255, 0.12); }\n    @media screen and (min-width: 768px) {\n      .app-profile ul.profile-detail li {\n        padding-left: 56px;\n        padding-right: 56px;\n        flex-direction: row;\n        align-items: flex-start;\n        justify-content: flex-start; }\n        .app-profile ul.profile-detail li label {\n          text-align: right;\n          padding-left: 0; }\n        .app-profile ul.profile-detail li p {\n          padding-left: 12px; } }\n  .app-profile-header {\n    background-color: #284B63; }\n    .app-profile-header icon {\n      color: white; }\n    .app-profile-header .header-title {\n      color: white; }\n  .app-profile .header-title {\n    color: white; }\n\n.app-projects {\n  background-color: #D9D9D9; }\n  .app-projects article {\n    margin-bottom: 24px;\n    border-bottom: 1px solid rgba(0, 0, 0, 0.12);\n    display: flex;\n    flex-direction: column;\n    align-items: flex-start;\n    justify-content: flex-start;\n    padding: 0 12px; }\n    .app-projects article:last-child {\n      border-bottom: none; }\n    .app-projects article > .card-image {\n      height: auto;\n      max-width: 120px;\n      min-width: 120px;\n      height: 120px;\n      width: 120px;\n      margin: 24px auto;\n      text-align: center;\n      background: white;\n      border-radius: 100%;\n      box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2); }\n      .app-projects article > .card-image img {\n        max-width: 110px;\n        max-height: 110px;\n        margin: 5px; }\n    .app-projects article > .card-content {\n      order: -1;\n      flex: 1 1 auto;\n      padding-top: 20px;\n      height: auto;\n      display: flex;\n      flex-direction: column;\n      align-items: flex-start;\n      justify-content: flex-start; }\n    .app-projects article .card-heading {\n      display: flex;\n      flex-direction: column;\n      align-items: flex-start;\n      justify-content: flex-start;\n      margin-bottom: 12px;\n      padding-top: 12px;\n      width: 100%; }\n    .app-projects article .card-title {\n      flex: 1;\n      font-weight: normal;\n      font-size: 36px;\n      color: rgba(0, 0, 0, 0.54);\n      padding-left: 24px;\n      padding-right: 12px;\n      font-size: 24px;\n      font-weight: bold; }\n    .app-projects article .card-date {\n      margin-left: auto;\n      text-align: right;\n      font-size: 14px;\n      padding-right: 12px;\n      letter-spacing: 1.34px;\n      font-weight: bold;\n      color: rgba(0, 0, 0, 0.54);\n      padding-right: 24px;\n      padding-left: 12px;\n      margin-left: 12px; }\n    .app-projects article .card-details {\n      list-style: none;\n      margin: 0;\n      padding: 0; }\n      .app-projects article .card-details li {\n        min-height: 36px;\n        display: flex;\n        flex-direction: row;\n        align-items: flex-start;\n        justify-content: flex-start;\n        padding-left: 24px;\n        padding-right: 24px; }\n      .app-projects article .card-details icon {\n        color: rgba(0, 0, 0, 0.87);\n        flex: 0 0 auto;\n        margin: 6px;\n        font-size: 16px; }\n      .app-projects article .card-details span.text {\n        flex: 0 1 auto;\n        padding-top: 4px;\n        line-height: 1.34;\n        font-size: 16px;\n        font-weight: normal;\n        color: rgba(0, 0, 0, 0.87); }\n    .app-projects article .card-tags {\n      margin: 0 0 24px 0;\n      padding: 0 24px;\n      list-style: none;\n      display: flex;\n      flex-direction: row;\n      align-items: flex-start;\n      justify-content: flex-start;\n      flex-wrap: wrap; }\n      .app-projects article .card-tags li {\n        display: inline;\n        padding: 6px 12px;\n        white-space: nowrap;\n        font-size: 12px;\n        font-weight: normal;\n        color: rgba(0, 0, 0, 0.87);\n        margin: 0 8px 0 0; }\n  @media screen and (min-width: 768px) {\n    .app-projects article {\n      padding: 0 56px;\n      flex-direction: row; }\n      .app-projects article .card-image {\n        margin: 24px; }\n      .app-projects article .card-title {\n        font-size: 36px;\n        font-weight: normal; } }\n  .app-projects .project-image {\n    margin-left: 24px;\n    width: 100px;\n    height: 100px;\n    position: relative;\n    flex: 0 0 auto;\n    height: 108px;\n    width: 108px;\n    background-color: white;\n    box-shadow: 0 4px 4px -3px rgba(0, 0, 0, 0.1), 0 3px 4px rgba(0, 0, 0, 0.2); }\n    .app-projects .project-image img {\n      display: block;\n      max-height: 80px;\n      max-width: 80px;\n      margin: 10px auto; }\n  .app-projects .project-heading {\n    display: flex;\n    flex-direction: column;\n    align-items: flex-start;\n    justify-content: flex-start;\n    margin-bottom: 12px;\n    padding-top: 12px;\n    width: 100%;\n    align-items: flex-end; }\n  .app-projects .project-title {\n    flex: 1;\n    font-weight: normal;\n    font-size: 36px;\n    color: rgba(0, 0, 0, 0.54);\n    padding-left: 24px;\n    padding-right: 12px; }\n  .app-projects .project-date {\n    margin-left: auto;\n    text-align: right;\n    font-size: 14px;\n    padding-right: 12px;\n    letter-spacing: 1.34px;\n    font-weight: bold;\n    color: rgba(0, 0, 0, 0.54);\n    padding-right: 24px;\n    padding-left: 12px; }\n  .app-projects ul.project-details {\n    list-style: none;\n    margin: 0;\n    padding: 0; }\n    .app-projects ul.project-details li {\n      min-height: 36px;\n      display: flex;\n      flex-direction: row;\n      align-items: flex-start;\n      justify-content: flex-start;\n      padding-left: 24px;\n      padding-right: 24px; }\n    .app-projects ul.project-details icon {\n      color: rgba(0, 0, 0, 0.54);\n      flex: 0 0 auto;\n      margin: 6px;\n      font-size: 16px; }\n    .app-projects ul.project-details span.text {\n      flex: 0 1 auto;\n      padding-top: 4px;\n      line-height: 1.34;\n      font-size: 16px;\n      font-weight: normal;\n      color: rgba(0, 0, 0, 0.87); }\n  .app-projects-header {\n    background-color: #D9D9D9; }\n\n.app-experience {\n  background-color: #77A0A2; }\n  .app-experience article {\n    margin-bottom: 24px;\n    border-bottom: 1px solid rgba(0, 0, 0, 0.12);\n    display: flex;\n    flex-direction: column;\n    align-items: flex-start;\n    justify-content: flex-start;\n    padding: 0 12px; }\n    .app-experience article:last-child {\n      border-bottom: none; }\n    .app-experience article > .card-image {\n      height: auto;\n      max-width: 120px;\n      min-width: 120px;\n      height: 120px;\n      width: 120px;\n      margin: 24px auto;\n      text-align: center;\n      background: white;\n      border-radius: 100%;\n      box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2); }\n      .app-experience article > .card-image img {\n        max-width: 110px;\n        max-height: 110px;\n        margin: 5px; }\n    .app-experience article > .card-content {\n      order: -1;\n      flex: 1 1 auto;\n      padding-top: 20px;\n      height: auto;\n      display: flex;\n      flex-direction: column;\n      align-items: flex-start;\n      justify-content: flex-start; }\n    .app-experience article .card-heading {\n      display: flex;\n      flex-direction: column;\n      align-items: flex-start;\n      justify-content: flex-start;\n      margin-bottom: 12px;\n      padding-top: 12px;\n      width: 100%; }\n    .app-experience article .card-title {\n      flex: 1;\n      font-weight: normal;\n      font-size: 36px;\n      color: rgba(0, 0, 0, 0.54);\n      padding-left: 24px;\n      padding-right: 12px;\n      font-size: 24px;\n      font-weight: bold; }\n    .app-experience article .card-date {\n      margin-left: auto;\n      text-align: right;\n      font-size: 14px;\n      padding-right: 12px;\n      letter-spacing: 1.34px;\n      font-weight: bold;\n      color: rgba(0, 0, 0, 0.54);\n      padding-right: 24px;\n      padding-left: 12px;\n      margin-left: 12px; }\n    .app-experience article .card-details {\n      list-style: none;\n      margin: 0;\n      padding: 0; }\n      .app-experience article .card-details li {\n        min-height: 36px;\n        display: flex;\n        flex-direction: row;\n        align-items: flex-start;\n        justify-content: flex-start;\n        padding-left: 24px;\n        padding-right: 24px; }\n      .app-experience article .card-details icon {\n        color: rgba(0, 0, 0, 0.87);\n        flex: 0 0 auto;\n        margin: 6px;\n        font-size: 16px; }\n      .app-experience article .card-details span.text {\n        flex: 0 1 auto;\n        padding-top: 4px;\n        line-height: 1.34;\n        font-size: 16px;\n        font-weight: normal;\n        color: rgba(0, 0, 0, 0.87); }\n    .app-experience article .card-tags {\n      margin: 0 0 24px 0;\n      padding: 0 24px;\n      list-style: none;\n      display: flex;\n      flex-direction: row;\n      align-items: flex-start;\n      justify-content: flex-start;\n      flex-wrap: wrap; }\n      .app-experience article .card-tags li {\n        display: inline;\n        padding: 6px 12px;\n        white-space: nowrap;\n        font-size: 12px;\n        font-weight: normal;\n        color: rgba(0, 0, 0, 0.87);\n        margin: 0 8px 0 0; }\n  @media screen and (min-width: 768px) {\n    .app-experience article {\n      padding: 0 56px;\n      flex-direction: row; }\n      .app-experience article .card-image {\n        margin: 24px; }\n      .app-experience article .card-title {\n        font-size: 36px;\n        font-weight: normal; } }\n  .app-experience .xp-heading {\n    display: flex;\n    flex-direction: column;\n    align-items: flex-start;\n    justify-content: flex-start;\n    margin-bottom: 12px;\n    padding-top: 12px;\n    width: 100%; }\n  .app-experience .xp-title {\n    flex: 1;\n    font-weight: normal;\n    font-size: 36px;\n    color: rgba(0, 0, 0, 0.54);\n    padding-left: 24px;\n    padding-right: 12px; }\n  .app-experience .xp-date {\n    margin-left: auto;\n    text-align: right;\n    font-size: 14px;\n    padding-right: 12px;\n    letter-spacing: 1.34px;\n    font-weight: bold;\n    color: rgba(0, 0, 0, 0.54);\n    padding-right: 24px;\n    padding-left: 12px; }\n  .app-experience ul.xp-details {\n    list-style: none;\n    margin: 0;\n    padding: 0; }\n    .app-experience ul.xp-details li {\n      min-height: 36px;\n      display: flex;\n      flex-direction: row;\n      align-items: flex-start;\n      justify-content: flex-start;\n      padding-left: 24px;\n      padding-right: 24px; }\n    .app-experience ul.xp-details icon {\n      color: rgba(0, 0, 0, 0.54);\n      flex: 0 0 auto;\n      margin: 6px;\n      font-size: 16px; }\n    .app-experience ul.xp-details span.text {\n      flex: 0 1 auto;\n      padding-top: 4px;\n      line-height: 1.34;\n      font-size: 16px;\n      font-weight: normal;\n      color: rgba(0, 0, 0, 0.87); }\n  .app-experience ul.xp-tech {\n    margin: 0 0 24px 0;\n    padding: 0 24px;\n    list-style: none;\n    display: flex;\n    flex-direction: row;\n    align-items: flex-start;\n    justify-content: flex-start;\n    flex-wrap: wrap; }\n    .app-experience ul.xp-tech li {\n      display: inline;\n      padding: 6px 12px;\n      white-space: nowrap;\n      font-size: 12px;\n      font-weight: normal;\n      color: #2196F3;\n      margin: 0 8px 0 0; }\n  .app-experience-header {\n    background-color: #77A0A2; }\n\n.app-education {\n  background-color: #D9D9D9; }\n  .app-education article {\n    margin-bottom: 24px;\n    border-bottom: 1px solid rgba(0, 0, 0, 0.12);\n    display: flex;\n    flex-direction: column;\n    align-items: flex-start;\n    justify-content: flex-start;\n    padding: 0 12px; }\n    .app-education article:last-child {\n      border-bottom: none; }\n    .app-education article > .card-image {\n      height: auto;\n      max-width: 120px;\n      min-width: 120px;\n      height: 120px;\n      width: 120px;\n      margin: 24px auto;\n      text-align: center;\n      background: white;\n      border-radius: 100%;\n      box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2); }\n      .app-education article > .card-image img {\n        max-width: 110px;\n        max-height: 110px;\n        margin: 5px; }\n    .app-education article > .card-content {\n      order: -1;\n      flex: 1 1 auto;\n      padding-top: 20px;\n      height: auto;\n      display: flex;\n      flex-direction: column;\n      align-items: flex-start;\n      justify-content: flex-start; }\n    .app-education article .card-heading {\n      display: flex;\n      flex-direction: column;\n      align-items: flex-start;\n      justify-content: flex-start;\n      margin-bottom: 12px;\n      padding-top: 12px;\n      width: 100%; }\n    .app-education article .card-title {\n      flex: 1;\n      font-weight: normal;\n      font-size: 36px;\n      color: rgba(0, 0, 0, 0.54);\n      padding-left: 24px;\n      padding-right: 12px;\n      font-size: 24px;\n      font-weight: bold; }\n    .app-education article .card-date {\n      margin-left: auto;\n      text-align: right;\n      font-size: 14px;\n      padding-right: 12px;\n      letter-spacing: 1.34px;\n      font-weight: bold;\n      color: rgba(0, 0, 0, 0.54);\n      padding-right: 24px;\n      padding-left: 12px;\n      margin-left: 12px; }\n    .app-education article .card-details {\n      list-style: none;\n      margin: 0;\n      padding: 0; }\n      .app-education article .card-details li {\n        min-height: 36px;\n        display: flex;\n        flex-direction: row;\n        align-items: flex-start;\n        justify-content: flex-start;\n        padding-left: 24px;\n        padding-right: 24px; }\n      .app-education article .card-details icon {\n        color: rgba(0, 0, 0, 0.87);\n        flex: 0 0 auto;\n        margin: 6px;\n        font-size: 16px; }\n      .app-education article .card-details span.text {\n        flex: 0 1 auto;\n        padding-top: 4px;\n        line-height: 1.34;\n        font-size: 16px;\n        font-weight: normal;\n        color: rgba(0, 0, 0, 0.87); }\n    .app-education article .card-tags {\n      margin: 0 0 24px 0;\n      padding: 0 24px;\n      list-style: none;\n      display: flex;\n      flex-direction: row;\n      align-items: flex-start;\n      justify-content: flex-start;\n      flex-wrap: wrap; }\n      .app-education article .card-tags li {\n        display: inline;\n        padding: 6px 12px;\n        white-space: nowrap;\n        font-size: 12px;\n        font-weight: normal;\n        color: rgba(0, 0, 0, 0.87);\n        margin: 0 8px 0 0; }\n  @media screen and (min-width: 768px) {\n    .app-education article {\n      padding: 0 56px;\n      flex-direction: row; }\n      .app-education article .card-image {\n        margin: 24px; }\n      .app-education article .card-title {\n        font-size: 36px;\n        font-weight: normal; } }\n  .app-education header {\n    color: rgba(0, 0, 0, 0.87); }\n    .app-education header icon {\n      color: rgba(0, 0, 0, 0.87); }\n  .app-education-header {\n    background-color: #D9D9D9;\n    color: rgba(0, 0, 0, 0.87); }\n    .app-education-header icon {\n      color: rgba(0, 0, 0, 0.87); }\n\n.app-technology {\n  background-color: #353535; }\n  .app-technology h1 {\n    font-size: 32px;\n    padding-left: 36px; }\n  .app-technology ul {\n    list-style: none;\n    margin: 0 12px;\n    padding: 0;\n    display: flex;\n    flex-wrap: wrap;\n    flex-direction: row;\n    align-items: flex-start;\n    justify-content: flex-start;\n    max-width: 100%;\n    margin-left: 24px;\n    margin-right: 24px; }\n    .app-technology ul li {\n      display: inline-block;\n      margin: 12px;\n      max-width: 100px;\n      min-width: 100px;\n      max-height: 136px;\n      min-height: 136px;\n      background-color: white;\n      padding-bottom: 34px;\n      box-shadow: 0 3px 4px -3px rgba(0, 0, 0, 0.2), 0 3px 4px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.1);\n      position: relative;\n      color: #353535; }\n      .app-technology ul li img {\n        display: block;\n        width: inherit;\n        max-width: inherit; }\n      .app-technology ul li span {\n        display: block;\n        text-align: center;\n        font-size: 18px;\n        font-weight: bold;\n        line-height: 24px;\n        position: absolute;\n        bottom: 0;\n        left: 0;\n        right: 0;\n        height: 24px;\n        margin-bottom: 10px; }\n  @media screen and (min-width: 768px) {\n    .app-technology h1 {\n      padding-left: 56px;\n      padding-right: 56px; }\n    .app-technology ul {\n      margin-left: 44px;\n      margin-right: 44px; } }\n  .app-technology-header {\n    background-color: #353535; }\n\n.app-connect article.connect-card {\n  margin-bottom: 56px;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.12); }\n\n.app-connect button {\n  margin: 24px; }\n\n.app-connect article.private {\n  min-height: 152px; }\n\n.app-connect .connection {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-items: flex-start;\n  margin-bottom: 24px;\n  padding: 0 24px;\n  height: 48px;\n  line-height: 48px;\n  cursor: pointer; }\n  .app-connect .connection * {\n    pointer-events: none; }\n  .app-connect .connection a {\n    pointer-events: auto;\n    display: flex;\n    flex-direction: row;\n    align-items: flex-start;\n    justify-content: flex-start;\n    flex: 0 0 auto;\n    text-decoration: none; }\n  .app-connect .connection .anchor,\n  .app-connect .connection .text {\n    line-height: 24px;\n    margin: 12px 0;\n    font-size: 20px;\n    color: #284B63; }\n  .app-connect .connection .anchor {\n    color: #284B63;\n    transition: transform 0.5s ease-out;\n    margin-right: 24px; }\n  .app-connect .connection .url {\n    line-height: 24px;\n    height: 24px;\n    margin: 12px 0;\n    min-width: 50%;\n    opacity: 0;\n    transition: opacity 0.5s, transform 0.5s ease-out;\n    padding-left: 4px;\n    font-size: 16px;\n    background-color: transparent;\n    border-color: rgba(0, 0, 0, 0.12);\n    border-radius: 12px;\n    color: rgba(0, 0, 0, 0.54);\n    outline: none;\n    text-decoration: none;\n    pointer-events: auto;\n    display: none; }\n  .app-connect .connection icon {\n    margin: 12px; }\n  .app-connect .connection .connection-logo {\n    width: 48px;\n    height: 48px;\n    font-size: 0;\n    margin-right: 12px; }\n    .app-connect .connection .connection-logo img {\n      max-width: 48px;\n      max-height: 48px; }\n  .app-connect .connection .anim-logo {\n    height: 48px;\n    width: 48px;\n    display: block;\n    position: relative;\n    border-radius: 100%;\n    color: #284B63;\n    fill: #284B63;\n    border-radius: 100%;\n    margin-right: 24px; }\n    .app-connect .connection .anim-logo svg {\n      color: inherit;\n      fill: inherit;\n      height: 48px;\n      width: 48px; }\n    .app-connect .connection .anim-logo.anim-npm-logo svg {\n      width: 80%;\n      margin: 0 10%; }\n      .app-connect .connection .anim-logo.anim-npm-logo svg .background {\n        fill: #284B63; }\n      .app-connect .connection .anim-logo.anim-npm-logo svg .foreground {\n        fill: #D9D9D9; }\n    .app-connect .connection .anim-logo.anim-phone-logo svg, .app-connect .connection .anim-logo.anim-email-logo svg {\n      height: 24px;\n      width: 24px;\n      margin: 12px; }\n\n@media screen and (min-width: 768px) {\n  .app-connect button {\n    margin: 56px; }\n  .app-connect .connection {\n    padding: 0 56px; }\n    .app-connect .connection .url {\n      display: block; }\n    .app-connect .connection:hover .anchor {\n      text-decoration: underline;\n      transform: translateX(25px); }\n    .app-connect .connection:hover .url {\n      transform: translateX(50px);\n      opacity: 1; }\n    .app-connect .connection:hover .anim-logo {\n      background: #284B63;\n      transition: background-color 0.5s, transform 0.5s ease-out;\n      transform: scale(1.25);\n      fill: #D9D9D9;\n      color: #D9D9D9; }\n    .app-connect .connection:hover .anim-npm-logo svg .background {\n      fill: #284B63;\n      transition: fill 0.5s; }\n    .app-connect .connection:hover .anim-npm-logo svg .foreground {\n      fill: #D9D9D9;\n      transition: fill 0.5s; } }\n\n@media screen and (max-width: 1200px) {\n  .platform-ios container navigation {\n    opacity: 0;\n    visibility: hidden;\n    transition: opacity 0.3s ease 0s; }\n  .platform-ios container.offset-main-right navigation {\n    opacity: 1;\n    visibility: visible; }\n  .platform-ios container.animate-main-right navigation {\n    opacity: 1;\n    visibility: visible; }\n  .platform-ios container.animate-main-default navigation {\n    opacity: 0;\n    visibility: hidden; } }\n\n@media screen and (min-width: 1201px) {\n  container {\n    margin-left: 200px; }\n    container > header {\n      margin-left: 200px; }\n    container > footer {\n      margin-left: 200px; }\n    container .header-title {\n      padding-left: 24px; }\n    container icon.menu-icon {\n      display: none !important; } }\n\n.ui-materialize-logo {\n  height: 100%;\n  width: 100%;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: center; }\n  .ui-materialize-logo:before {\n    content: \"ui\";\n    display: block;\n    color: deeppink;\n    font-weight: bold;\n    font-size: 16px;\n    line-height: 20px; }\n  .ui-materialize-logo:after {\n    content: \"Materialize\";\n    display: block;\n    color: dimgrey;\n    font-weight: normal;\n    font-size: 20px; }\n\n.domx-logo {\n  height: 100%;\n  width: 100%;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: center; }\n  .domx-logo:before {\n    content: \"<\";\n    display: block;\n    color: darkorange;\n    font-weight: bold;\n    font-size: 30px;\n    line-height: 24px; }\n  .domx-logo:after {\n    content: \"dom-x\";\n    display: block;\n    color: indigo;\n    font-weight: normal;\n    font-size: 30px; }\n\narticle.card-mparticle .card-image img {\n  margin-top: 24px; }\n\narticle.card-plusamp .card-image img {\n  border-radius: 100%; }\n\narticle.card-his .card-image img {\n  margin-top: 45px; }\n\narticle.card-southwestern .card-image img {\n  margin-top: 26px; }\n\nli.card-item-net img {\n  margin-top: 30px; }\n\nli.card-item-node img,\nli.card-item-mongo img,\nli.card-item-python img,\nli.card-item-postcss img,\nli.card-item-express img,\nli.card-item-sketch img {\n  width: 80% !important;\n  height: 80% !important;\n  margin: 10px; }\n\nli.card-item-sql img,\nli.card-item-redis img,\nli.card-item-grunt img,\nli.card-item-coffeescript img {\n  margin-top: 10px; }\n\nli.card-item-html5 img,\nli.card-item-css3 img {\n  margin-top: 10px; }\n\nli.card-item-node img,\nli.card-item-neo4j img,\nli.card-item-cypher img,\nli.card-item-express img {\n  margin-top: 30px; }\n"; });
define('text!modules/connect/github-logo.html', ['module'], function(module) { module.exports = "<template><svg viewBox=\"0 0 512 512\"><path d=\"M256 70.7c-102.6 0-185.9 83.2-185.9 185.9 0 82.1 53.3 151.8 127.1 176.4 9.3 1.7 12.3-4 12.3-8.9V389.4c-51.7 11.3-62.5-21.9-62.5-21.9 -8.4-21.5-20.6-27.2-20.6-27.2 -16.9-11.5 1.3-11.3 1.3-11.3 18.7 1.3 28.5 19.2 28.5 19.2 16.6 28.4 43.5 20.2 54.1 15.4 1.7-12 6.5-20.2 11.8-24.9 -41.3-4.7-84.7-20.6-84.7-91.9 0-20.3 7.3-36.9 19.2-49.9 -1.9-4.7-8.3-23.6 1.8-49.2 0 0 15.6-5 51.1 19.1 14.8-4.1 30.7-6.2 46.5-6.3 15.8 0.1 31.7 2.1 46.6 6.3 35.5-24 51.1-19.1 51.1-19.1 10.1 25.6 3.8 44.5 1.8 49.2 11.9 13 19.1 29.6 19.1 49.9 0 71.4-43.5 87.1-84.9 91.7 6.7 5.8 12.8 17.1 12.8 34.4 0 24.9 0 44.9 0 51 0 4.9 3 10.7 12.4 8.9 73.8-24.6 127-94.3 127-176.4C441.9 153.9 358.6 70.7 256 70.7z\"/></svg><!--[if lt IE 9]><em>GitHub</em><![endif]--></template>"; });
define('text!modules/connect/google-logo.html', ['module'], function(module) { module.exports = "<template><svg viewBox=\"0 0 512 512\"><path d=\"M179.7 237.6L179.7 284.2 256.7 284.2C253.6 304.2 233.4 342.9 179.7 342.9 133.4 342.9 95.6 304.4 95.6 257 95.6 209.6 133.4 171.1 179.7 171.1 206.1 171.1 223.7 182.4 233.8 192.1L270.6 156.6C247 134.4 216.4 121 179.7 121 104.7 121 44 181.8 44 257 44 332.2 104.7 393 179.7 393 258 393 310 337.8 310 260.1 310 251.2 309 244.4 307.9 237.6L179.7 237.6 179.7 237.6ZM468 236.7L429.3 236.7 429.3 198 390.7 198 390.7 236.7 352 236.7 352 275.3 390.7 275.3 390.7 314 429.3 314 429.3 275.3 468 275.3\"/></svg><!--[if lt IE 9]><em>GooglePlus</em><![endif]--></template>"; });
define('text!modules/connect/instagram-logo.html', ['module'], function(module) { module.exports = "<template><svg viewBox=\"0 0 512 512\"><g><path d=\"M256 109.3c47.8 0 53.4 0.2 72.3 1 17.4 0.8 26.9 3.7 33.2 6.2 8.4 3.2 14.3 7.1 20.6 13.4 6.3 6.3 10.1 12.2 13.4 20.6 2.5 6.3 5.4 15.8 6.2 33.2 0.9 18.9 1 24.5 1 72.3s-0.2 53.4-1 72.3c-0.8 17.4-3.7 26.9-6.2 33.2 -3.2 8.4-7.1 14.3-13.4 20.6 -6.3 6.3-12.2 10.1-20.6 13.4 -6.3 2.5-15.8 5.4-33.2 6.2 -18.9 0.9-24.5 1-72.3 1s-53.4-0.2-72.3-1c-17.4-0.8-26.9-3.7-33.2-6.2 -8.4-3.2-14.3-7.1-20.6-13.4 -6.3-6.3-10.1-12.2-13.4-20.6 -2.5-6.3-5.4-15.8-6.2-33.2 -0.9-18.9-1-24.5-1-72.3s0.2-53.4 1-72.3c0.8-17.4 3.7-26.9 6.2-33.2 3.2-8.4 7.1-14.3 13.4-20.6 6.3-6.3 12.2-10.1 20.6-13.4 6.3-2.5 15.8-5.4 33.2-6.2C202.6 109.5 208.2 109.3 256 109.3M256 77.1c-48.6 0-54.7 0.2-73.8 1.1 -19 0.9-32.1 3.9-43.4 8.3 -11.8 4.6-21.7 10.7-31.7 20.6 -9.9 9.9-16.1 19.9-20.6 31.7 -4.4 11.4-7.4 24.4-8.3 43.4 -0.9 19.1-1.1 25.2-1.1 73.8 0 48.6 0.2 54.7 1.1 73.8 0.9 19 3.9 32.1 8.3 43.4 4.6 11.8 10.7 21.7 20.6 31.7 9.9 9.9 19.9 16.1 31.7 20.6 11.4 4.4 24.4 7.4 43.4 8.3 19.1 0.9 25.2 1.1 73.8 1.1s54.7-0.2 73.8-1.1c19-0.9 32.1-3.9 43.4-8.3 11.8-4.6 21.7-10.7 31.7-20.6 9.9-9.9 16.1-19.9 20.6-31.7 4.4-11.4 7.4-24.4 8.3-43.4 0.9-19.1 1.1-25.2 1.1-73.8s-0.2-54.7-1.1-73.8c-0.9-19-3.9-32.1-8.3-43.4 -4.6-11.8-10.7-21.7-20.6-31.7 -9.9-9.9-19.9-16.1-31.7-20.6 -11.4-4.4-24.4-7.4-43.4-8.3C310.7 77.3 304.6 77.1 256 77.1L256 77.1z\"/><path d=\"M256 164.1c-50.7 0-91.9 41.1-91.9 91.9s41.1 91.9 91.9 91.9 91.9-41.1 91.9-91.9S306.7 164.1 256 164.1zM256 315.6c-32.9 0-59.6-26.7-59.6-59.6s26.7-59.6 59.6-59.6 59.6 26.7 59.6 59.6S288.9 315.6 256 315.6z\"/><circle cx=351.5 cy=160.5 r=21.5 /></g></svg><!--[if lt IE 9]><em>Instagram</em><![endif]--></template>"; });
define('text!modules/connect/linkedin-logo.html', ['module'], function(module) { module.exports = "<template><svg viewBox=\"0 0 512 512\"><path d=\"M186.4 142.4c0 19-15.3 34.5-34.2 34.5 -18.9 0-34.2-15.4-34.2-34.5 0-19 15.3-34.5 34.2-34.5C171.1 107.9 186.4 123.4 186.4 142.4zM181.4 201.3h-57.8V388.1h57.8V201.3zM273.8 201.3h-55.4V388.1h55.4c0 0 0-69.3 0-98 0-26.3 12.1-41.9 35.2-41.9 21.3 0 31.5 15 31.5 41.9 0 26.9 0 98 0 98h57.5c0 0 0-68.2 0-118.3 0-50-28.3-74.2-68-74.2 -39.6 0-56.3 30.9-56.3 30.9v-25.2H273.8z\"/></svg><!--[if lt IE 9]><em>LinkedIn</em><![endif]--></template>"; });
define('text!modules/connect/npm-logo.html', ['module'], function(module) { module.exports = "<template><svg viewBox=\"0 0 18 7\" class=npm-logo><path class=background d=M0,0v6h5v1h4v-1h9v-6></path><path class=foreground d=M1,1v4h2v-3h1v3h1v-4h1v5h2v-4h1v2h-1v1h2v-4h1v4h2v-3h1v3h1v-3h1v3h1v-4></path></svg></template>"; });
define('text!modules/connect/phone-logo.html', ['module'], function(module) { module.exports = "<template><svg xmlns=http://www.w3.org/2000/svg fill=#000000 height=24 viewBox=\"0 0 24 24\" width=24><path d=\"M0 0h24v24H0z\" fill=none /><path d=\"M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z\"/></svg></template>"; });
define('text!modules/connect/robot-user.html', ['module'], function(module) { module.exports = "<template><dialog><span slot=header class=text>Are you a Robot?</span><section><label><checkbox checked.bind=value></checkbox><span class=text>Select if you are not a robot.</span></label></section><footer><button class=\"btn cancel\" click.delegate=service.cancel()>Cancel</button><button class=btn disabled.bind=!value click.delegate=service.ok()>Ok</button></footer></dialog></template>"; });
define('text!modules/connect/stackoverflow-logo.html', ['module'], function(module) { module.exports = "<template><svg viewBox=\"0 0 512 512\"><path d=\"M294.8 361.2l-122 0.1 0-26 122-0.1L294.8 361.2zM377.2 213.7L356.4 93.5l-25.7 4.5 20.9 120.2L377.2 213.7zM297.8 301.8l-121.4-11.2 -2.4 25.9 121.4 11.2L297.8 301.8zM305.8 267.8l-117.8-31.7 -6.8 25.2 117.8 31.7L305.8 267.8zM321.2 238l-105-62 -13.2 22.4 105 62L321.2 238zM346.9 219.7l-68.7-100.8 -21.5 14.7 68.7 100.8L346.9 219.7zM315.5 275.5v106.5H155.6V275.5h-20.8v126.9h201.5V275.5H315.5z\"/></svg><!--[if lt IE 9]><em>StackOverflow</em><![endif]--></template>"; });
define('text!modules/connect/twitter-logo.html', ['module'], function(module) { module.exports = "<template><svg viewBox=\"0 0 512 512\"><path d=\"M419.6 168.6c-11.7 5.2-24.2 8.7-37.4 10.2 13.4-8.1 23.8-20.8 28.6-36 -12.6 7.5-26.5 12.9-41.3 15.8 -11.9-12.6-28.8-20.6-47.5-20.6 -42 0-72.9 39.2-63.4 79.9 -54.1-2.7-102.1-28.6-134.2-68 -17 29.2-8.8 67.5 20.1 86.9 -10.7-0.3-20.7-3.3-29.5-8.1 -0.7 30.2 20.9 58.4 52.2 64.6 -9.2 2.5-19.2 3.1-29.4 1.1 8.3 25.9 32.3 44.7 60.8 45.2 -27.4 21.4-61.8 31-96.4 27 28.8 18.5 63 29.2 99.8 29.2 120.8 0 189.1-102.1 185-193.6C399.9 193.1 410.9 181.7 419.6 168.6z\"/></svg><!--[if lt IE 9]><em>Twitter</em><![endif]--></template>"; });
define('text!modules/education/education.html', ['module'], function(module) { module.exports = "<template><template repeat.for=\"edu of props.educations\"><article class=card-${edu.id}><div class=card-image if.bind=edu.image><span if.bind=\"edu.className && !edu.image\" class=${edu.className}></span><img src.bind=edu.image class=${edu.className} alt.bind=edu.name></div><div class=card-content><div class=card-heading><div class=card-title>${edu.name}</div><div class=card-date>${edu.date}</div></div><ul class=card-details><li repeat.for=\"note of edu.notes\"><icon ico=chevron_right></icon><span class=text>${note}</span></li></ul></div></article></template></template>"; });
define('text!modules/experience/experience.html', ['module'], function(module) { module.exports = "<template><template repeat.for=\"xp of props.experiences\"><article class=card-${xp.id}><div class=card-image if.bind=xp.image><span if.bind=\"xp.className && !xp.image\" class=${xp.className}></span><img src.bind=xp.image class=${xp.className} alt.bind=xp.name></div><div class=card-content><div class=card-heading><div class=card-title>${xp.name}</div><div class=card-date>${xp.date}</div></div><ul class=card-details><li repeat.for=\"note of xp.notes\"><icon ico=chevron_right></icon><span class=text>${note}</span></li></ul><ul class=card-tags><li repeat.for=\"stack of xp.stack\">${stack}</li></ul></div></article></template></template>"; });
define('text!modules/footer/footer.html', ['module'], function(module) { module.exports = "<template><footer ref=element class=app-footer><div ripple class=footer-content><nav class=left-nav></nav><nav class=center-nav><span ref=nodes.title class=header-title>${props.title}</span></nav><nav class=right-nav><icon ico=arrow_forward class=direction-icon click.delegate=navigateForward($event)></icon></nav></div></footer></template>"; });
define('text!modules/header/header.html', ['module'], function(module) { module.exports = "<template><header ref=element class=app-header><div ripple class=header-content><nav class=left-nav><icon ico=menu class=menu-icon click.delegate=toggleNavigation($event)></icon></nav><nav class=center-nav><span ref=titleNode class=header-title>${props.title}</span></nav><nav class=right-nav><icon ico=arrow_back class=direction-icon click.delegate=navigateBack($event)></icon></nav></div></header></template>"; });
define('text!modules/nav/nav.html', ['module'], function(module) { module.exports = "<template><ul><li repeat.for=\"items of leftNav\" click.delegate=\"navigateToItem($event, item)\"><a>${item.name}</a></li></ul><button click.delegate=buttonClicked($event)></button><ul><li repeat.for=\"items of rightNav\" click.delegate=\"navigateToItem($event, item)\"><a>${item.name}</a></li></ul></template>"; });
define('text!modules/nav-section/nav-section.html', ['module'], function(module) { module.exports = "<template class=\"${view.shade.key}-tint-section ${view.isActive ? 'active' : ''} ${view.isScrolling ? 'scrolling' : ''} ${view.isPeeking ? 'peeking' : ''} ${view.isVisible ? 'visible' : ''}\"><section class=section-container><header ref=header css=\"opacity: ${view.showTitle ? 1 : 0}; visibility: ${view.showTitle ? visible : hidden};\" click.delegate=headerClicked($event) class=\"nav-section-header app-${view.name}-header\"><span if.bind=view.title class=header-title>${view.title}</span></header><compose containerless view-model.bind=view.viewModel></compose></section></template>"; });
define('text!modules/profile/profile.html', ['module'], function(module) { module.exports = "<template><style>@media screen and (max-width:1200px){.app-profile .row{flex-direction:column}.app-profile .row .profile-info{width:100%}.app-profile .row .profile-info ul{margin:24px}}</style><article><div class=profile-image><img src=\"https://avatars0.githubusercontent.com/u/4668188?v=3&s=460\" alt=\"\"></div><div class=profile-content><ul class=profile-detail><li><label>Name</label><div class=value><p>${props.name}</p></div></li><li><label>Birthday</label><div class=value><p>${props.birthday}</p></div></li><li><label>Titles</label><div class=value><p repeat.for=\"title of props.titles\">${title}</p></div></li><li><label>Locations</label><div class=value><p repeat.for=\"loc of props.locations\">${loc}</p></div></li><li><label>Info</label><div class=value><p>${props.info}</p></div></li></ul></div></article></template>"; });
define('text!modules/navigation/navigation.html', ['module'], function(module) { module.exports = "<template><style>navigation ul li.active span.text{color:{};}</style><section css=\"background-color: ${props.fill}\"><ul class=navigation-list css=\"color: ${currentTint};\"><li ripple data-use-fill=${view.fill} repeat.for=\"view of views\" class=\"${view.isActive ? 'active' : ''}\" click.delegate=navigateToView(view)><icon ico.bind=view.icon></icon><span class=text>${view.title}</span></li><li></li></ul></section></template>"; });
define('text!modules/projects/projects.html', ['module'], function(module) { module.exports = "<template><template repeat.for=\"project of props.projects\"><article class=card-${project.id}><div class=card-image><span if.bind=\"project.className && !project.image\" class=${project.className}></span><img if.bind=project.image class=${project.className} src.bind=project.image alt.bind=project.name></div><div class=card-content><div class=card-heading><div class=card-title>${project.name}</div><div class=card-date>${project.date}</div></div><ul class=card-details><li repeat.for=\"note of project.notes\"><icon ico=chevron_right></icon><span class=text>${note}</span></li></ul><ul class=card-tags><li repeat.for=\"stack of project.stack\">${stack}</li></ul></div></article></template></template>"; });
define('text!modules/technology/technology.html', ['module'], function(module) { module.exports = "<template><template repeat.for=\"tech of props.technologies\"><article><h1>${tech.title}</h1><ul><li repeat.for=\"item of tech.list\" class=card-item-${item.name}><img src.bind=item.img alt.bind=item.name><span class=text>${item.title}</span></li></ul></article></template></template>"; });
define('text!modules/title/title.html', ['module'], function(module) { module.exports = "<template><style>.app-title .title-image{height:450px;width:350px;display:block;float:left;margin:75px 75px 0 75px}.app-title .title-text h1{margin-top:75px;margin-bottom:75px;text-align:center;font-size:56px}.app-title .title-text{display:block;width:100%;text-align:center}</style><div class=title-text><h1>${title}</h1><h3 ref=uxAnimation class=ux-animation><span ref=nodes.uix class=uix><span ref=nodes.u class=u>U</span><span ref=nodes.i class=i>I</span><span ref=nodes.x class=x>X</span></span><span ref=nodes.architect class=architect>Architect</span><span ref=nodes.designer class=designer>, &nbsp;Designer</span><span ref=nodes.engineer class=engineer>&nbsp;&&nbsp;Engineer</span><span ref=textInsert class=type></span></h3></div></template>"; });
define('text!resources/elements/checkbox/checkbox.html', ['module'], function(module) { module.exports = "<template><input type=checkbox checked.two-way=checked model.two-way=model value.two-way=value><icon class=unchecked ico=check_box_outline_blank></icon><icon class=checked ico=check_box></icon></template>"; });
define('text!resources/elements/dialog/dialog-container.html', ['module'], function(module) { module.exports = "<template class=\"${currentInstruction ? 'active' : ''}\"><template if.bind=currentInstruction><compose containerless view-model.bind=currentInstruction.viewModel model.bind=dialogModel></compose></template></template>"; });
define('text!resources/elements/dialog/dialog.html', ['module'], function(module) { module.exports = "<template><header><slot name=header></slot></header><slot></slot></template>"; });
//# sourceMappingURL=app-bundle.js.map