define('app',['exports', 'aurelia-framework', 'modules/header/header', 'modules/footer/footer', 'modules/title/title', 'modules/profile/profile', 'modules/projects/projects', 'modules/technology/technology', 'modules/experience/experience', 'modules/education/education', 'core/enums', './state', 'aurelia-event-aggregator', 'core/view', 'core/util', 'core/color'], function (exports, _aureliaFramework, _header, _footer, _title, _profile, _projects, _technology, _experience, _education, _enums, _state, _aureliaEventAggregator, _view, _util, _color) {
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

    var App = exports.App = (_dec = (0, _aureliaFramework.inject)(_util.Util, _state.State, _enums.Enums, _color.Color, _aureliaEventAggregator.EventAggregator, _aureliaFramework.Factory.of(_header.Header), _aureliaFramework.Factory.of(_footer.Footer), _aureliaFramework.Factory.of(_title.Title), _aureliaFramework.Factory.of(_profile.Profile), _aureliaFramework.Factory.of(_technology.Technology), _aureliaFramework.Factory.of(_projects.Projects), _aureliaFramework.Factory.of(_experience.Experience), _aureliaFramework.Factory.of(_education.Education)), _dec(_class = (_class2 = function () {
        function App(Util, State, Enums, Color, EventAggregator, Header, Footer, Title, Profile, Technology, Projects, Experience, Education) {
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
                fill: Color.teal,
                shade: Color.dark,
                viewModel: Projects(Enums.Projects, State)
            }));

            State.registerView(new _view.View({
                title: 'Experience',
                name: 'experience',
                icon: 'verified_user',
                fill: Color.tan,
                shade: Color.dark,
                viewModel: Experience(Enums.Experience, State)
            }));

            State.registerView(new _view.View({
                title: 'Education',
                name: 'education',
                icon: 'school',
                fill: Color.brown,
                shade: Color.light,
                viewModel: Education(Enums.Education, State)
            }));

            State.registerView(new _view.View({
                title: 'Technology',
                name: 'technology',
                icon: 'layers',
                fill: Color.tan,
                shade: Color.dark,
                viewModel: Technology(Enums.Technology, State)
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
define('main',['exports', './environment', 'core/element'], function (exports, _environment) {
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
});
define('core/enums',['exports', 'aurelia-framework', './profile', './projects', './experience', './education', './technology'], function (exports, _aureliaFramework, _profile, _projects, _experience, _education, _technology) {
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

    var Enums = exports.Enums = (_dec = (0, _aureliaFramework.inject)(_profile.ProfileEnums, _technology.TechnologyEnums, _experience.ExperienceEnums, _projects.ProjectEnums, _education.EducationEnums), _dec(_class = (_temp = _class2 = function Enums(profile, technology, experience, projects, education) {
        _classCallCheck(this, Enums);

        this.Profile = profile;
        this.Technology = technology;
        this.Experience = experience;
        this.Projects = projects;
        this.Education = education;
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
            notes: ['Spent countless nights completing issues before our first release', 'Re-architected the client side component structure', 'Built several features using provided design comps', 'Designed ux flow using provided flow descriptions']
        };
        this.TheLiked = {
            name: 'The Liked | Contract',
            id: 'theliked',
            date: '2016',
            occupation: 'Soul Developer',
            link: 'http://theliked.com',
            stack: ['Node', 'Mongo DB', 'Express', 'Javascript', 'Aurelia', 'React', 'HTML', 'Sass', 'CSS'],
            notes: ['Migrated existing Angular 1.0 App to Aurelia', 'Merged Several Aurelia and React components to work on the same state engine', 'Built the site-map, including designs, using provided comps']
        };
        this.WoltersKluwer = {
            name: 'Wolters Kluwer | Contract',
            date: '2016',
            id: 'wolters-kluwer',
            occupation: 'Senior Web Engineer | Senior Web Designer',
            link: 'http://wolterskluwer.com',
            image: '/scripts/logos/wolters-kluwer-logo.png',
            stack: ['C#', '.Net', 'Mongo', 'SQL', 'Redis', 'Javascript', 'Aurelia', 'Web Animations', 'jQuery', 'HTML', 'Sass', 'CSS'],
            notes: ['Re-scaled nine applications into one web application', 'Designed a rich interactive flow creation tool', 'Visually display flow data using HTML Canvas and D3', 'Collaborated with a small team using scrum methodologies', 'Design UI Component Library for internal use across Wolters Kluwer applications']
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
define('resources/index',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {
    config.globalResources(['./attributes/ripple']);
  }
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
                fn();
            } else {
                this.pendingElementProps.push(fn);
            }
        };

        Header.prototype.setNodeProps = function setNodeProps(fn) {
            this.pendingNodeProps = this.pendingNodeProps || [];
            if (this.titleNode) {
                fn();
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
            this.startAnimation();
        };

        Title.prototype.startAnimation = function startAnimation() {
            var _this = this;

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
                    _this.startAnimation();
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
                        tEl.innerHTML += arr.shift().replace(/\-/, '&nbsp;');
                    } else {
                        startReset();
                        clearInterval(intId);
                    }
                }, 50);
            };

            iEl.addEventListener('animationend', _iAnimEnd);
            xEl.addEventListener('animationend', _xAnimEnd);

            if (ux.classList.contains('animate')) {
                ux.addEventListener('animationend', _uxAnimEnd);
                ux.classList.add('animate-out');
                ux.classList.remove('animate');
            } else {
                ux.classList.add('animate');
            }
        };

        return Title;
    }();
});
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=./app.css></require><div class=app-background></div><navigation></navigation><container><compose containerless view-model.bind=header></compose><main><template repeat.for=\"view of State.views\"><nav-section class=\"${$first ? 'first' : $last ? 'last' : ''} app-${view.name}\" ref=view.element view.bind=view></nav-section></template></main><compose containerless view-model.bind=footer></compose></container><div class=background-container></div></template>"; });
define('text!modules/education/education.html', ['module'], function(module) { module.exports = "<template><template repeat.for=\"edu of props.educations\"><article class=card-${edu.id}><div class=card-image if.bind=edu.image><span if.bind=\"edu.className && !edu.image\" class=${edu.className}></span><img src.bind=edu.image class=${edu.className} alt.bind=edu.name></div><div class=card-content><div class=card-heading><div class=card-title>${edu.name}</div><div class=card-date>${edu.date}</div></div><ul class=card-details><li repeat.for=\"note of edu.notes\"><icon ico=chevron_right></icon><span class=text>${note}</span></li></ul></div></article></template></template>"; });
define('text!modules/experience/experience.html', ['module'], function(module) { module.exports = "<template><template repeat.for=\"xp of props.experiences\"><article class=card-${xp.id}><div class=card-image if.bind=xp.image><span if.bind=\"xp.className && !xp.image\" class=${xp.className}></span><img src.bind=xp.image class=${xp.className} alt.bind=xp.name></div><div class=card-content><div class=card-heading><div class=card-title>${xp.name}</div><div class=card-date>${xp.date}</div></div><ul class=card-details><li repeat.for=\"note of xp.notes\"><icon ico=chevron_right></icon><span class=text>${note}</span></li></ul><ul class=card-tags><li repeat.for=\"stack of xp.stack\">${stack}</li></ul></div></article></template></template>"; });
define('text!modules/footer/footer.html', ['module'], function(module) { module.exports = "<template><footer ref=element class=app-footer><div ripple class=footer-content><nav class=left-nav></nav><nav class=center-nav><span ref=nodes.title class=header-title>${props.title}</span></nav><nav class=right-nav><icon ico=arrow_forward class=direction-icon click.delegate=navigateForward($event)></icon></nav></div></footer></template>"; });
define('text!app.css', ['module'], function(module) { module.exports = "@import url(\"https://fonts.googleapis.com/css?family=Roboto\");\nnav-section {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  min-height: 100%;\n  position: relative; }\n  nav-section .row {\n    flex: 1 0 auto;\n    display: flex;\n    align-items: flex-start;\n    justify-content: flex-start;\n    flex-direction: row; }\n  nav-section .section-container {\n    flex: 1;\n    height: auto;\n    display: flex;\n    position: relative;\n    flex-direction: column;\n    align-items: stretch;\n    justify-content: flex-start;\n    padding-top: 200px;\n    box-shadow: -3px 0 3px rgba(0, 0, 0, 0.3);\n    background-color: inherit;\n    z-index: 4; }\n  nav-section article {\n    margin-bottom: 24px;\n    display: flex;\n    flex-direction: column;\n    align-self: stretch; }\n  nav-section header.nav-section-header {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    min-height: 56px;\n    font-size: 36px;\n    transform: translateY(150%);\n    color: inherit;\n    display: flex;\n    text-align: left;\n    padding-left: 36px;\n    flex-direction: row;\n    align-items: flex-start;\n    justify-content: flex-start; }\n    nav-section header.nav-section-header .header-title {\n      flex: 1;\n      display: block;\n      text-align: inherit;\n      font-size: inherit;\n      color: inherit; }\n    @media screen and (min-width: 768px) {\n      nav-section header.nav-section-header {\n        font-size: 56px;\n        text-align: center;\n        padding-left: 0; } }\n  nav-section.light-tint-section {\n    color: white; }\n  nav-section.dark-tint-section {\n    color: rgba(0, 0, 0, 0.87); }\n\ncontainer > header.nav-section-header {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.12); }\n\n.app-section-header {\n  opacity: 0;\n  visibility: hidden; }\n  .app-section-header icon {\n    position: relative;\n    user-select: none;\n    height: 56px;\n    width: 56px;\n    line-height: 56px;\n    text-align: center;\n    cursor: pointer;\n    color: inherit; }\n  .app-section-header icon.menu-icon {\n    display: none; }\n  .app-section-header .header-title {\n    user-select: none;\n    padding: 0 56px;\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    text-align: left;\n    display: block;\n    font-size: 24px;\n    line-height: 56px;\n    font-weight: bold;\n    cursor: pointer;\n    user-select: none;\n    color: inherit; }\n  .app-section-header.fixed {\n    opacity: 0;\n    visibility: hidden; }\n    .app-section-header.fixed:hover .header-title {\n      opacity: 0.7; }\n  .app-section-header.first {\n    opacity: 0;\n    visibility: hidden; }\n\nnavigation {\n  position: fixed;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  min-height: 100vh;\n  max-height: 100vh;\n  width: 200px;\n  z-index: 2;\n  pointer-events: none;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  justify-content: flex-start; }\n  navigation > header {\n    display: block;\n    width: 100%;\n    background-color: rgba(255, 255, 255, 0.6);\n    height: 56px;\n    box-shadow: 0 3px 4px rgba(0, 0, 0, 0.2); }\n  navigation > section {\n    flex: 1;\n    display: block;\n    width: 100%; }\n  navigation > footer {\n    background-color: rgba(255, 255, 255, 0.6);\n    display: block;\n    width: 100%;\n    height: 56px;\n    box-shadow: 0 -3px 4px rgba(0, 0, 0, 0.2); }\n  navigation ul.navigation-list {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    flex: 1 0 auto;\n    margin: 0;\n    padding: 0;\n    list-style: none;\n    display: flex;\n    flex-direction: column;\n    align-items: flex-start;\n    justify-content: flex-start; }\n    navigation ul.navigation-list:after, navigation ul.navigation-list:before {\n      display: block;\n      content: \" \";\n      background-color: rgba(255, 255, 255, 0.6);\n      width: 100%; }\n    navigation ul.navigation-list:before {\n      min-height: 56px;\n      max-height: 56px; }\n    navigation ul.navigation-list:after {\n      flex: 1 0 auto; }\n    navigation ul.navigation-list li {\n      flex: 1 0 auto;\n      color: inherit;\n      width: 100%;\n      pointer-events: auto;\n      display: flex;\n      flex-direction: row;\n      align-items: flex-start;\n      justify-content: flex-start;\n      min-height: 48px;\n      max-height: 48px;\n      cursor: pointer;\n      background-color: rgba(255, 255, 255, 0.6);\n      transition: background-color 0.3s ease 0s; }\n      navigation ul.navigation-list li icon {\n        color: rgba(0, 0, 0, 0.87);\n        pointer-events: none;\n        margin: 12px; }\n      navigation ul.navigation-list li span.text {\n        pointer-events: none;\n        flex: 0 1 auto;\n        font-size: 16px;\n        font-weight: 500;\n        line-height: 48px;\n        letter-spacing: 1.34px;\n        user-select: none;\n        color: rgba(0, 0, 0, 0.87); }\n      navigation ul.navigation-list li.active icon, navigation ul.navigation-list li.active span.text {\n        color: inherit; }\n    navigation ul.navigation-list li:last-child {\n      height: auto;\n      flex: 1 0 auto;\n      background-color: rgba(255, 255, 255, 0.6); }\n\n@keyframes animate-main-right {\n  from {\n    transform: translate3d(0, 0, 0); }\n  to {\n    transform: translate3d(200px, 0, 0); } }\n\n@keyframes animate-main-default {\n  from {\n    transform: translate3d(200px, 0, 0); }\n  to {\n    transform: translate3d(0, 0, 0); } }\n\nripple-container {\n  pointer-events: none;\n  display: block;\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  min-height: 100%;\n  min-width: 100%;\n  overflow: hidden;\n  opacity: 0.8; }\n\nripple {\n  display: block;\n  position: absolute;\n  opacity: 0;\n  transform: scale(0);\n  top: 0;\n  left: 0;\n  border-radius: 100%;\n  animation-timing-function: linear;\n  animation-duration: 0.5s;\n  animation-fill-mode: forwards;\n  animation-name: show-ripple; }\n\n@keyframes show-ripple {\n  0% {\n    opacity: 0;\n    transform: scale(0); }\n  50% {\n    opacity: 1;\n    transform: scale(1); }\n  100% {\n    opacity: 0;\n    transform: scale(3); } }\n\n.app-title .ux-animation {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: center;\n  width: 320px;\n  margin: 0 auto;\n  animation-duration: 1s;\n  animation-timing-function: ease;\n  animation-fill-mode: forwards;\n  opacity: 0; }\n  .app-title .ux-animation span {\n    height: 28px;\n    line-height: 28px; }\n  .app-title .ux-animation span.u {\n    flex: 0 1 auto; }\n  .app-title .ux-animation span.ix {\n    position: relative;\n    flex: 0 0 auto;\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    justify-content: flex-start; }\n    .app-title .ux-animation span.ix span.i,\n    .app-title .ux-animation span.ix span.x {\n      animation-timing-function: linear;\n      animation-fill-mode: forwards;\n      animation-duration: 0.25s;\n      position: absolute;\n      display: block;\n      width: 10px;\n      top: 0;\n      left: 0; }\n    .app-title .ux-animation span.ix span.i {\n      animation-delay: 2.3s; }\n    .app-title .ux-animation span.ix span.x {\n      animation-delay: 2.5s;\n      transform: rotate(-180deg);\n      opacity: 0; }\n  .app-title .ux-animation span.type {\n    margin-left: 30px;\n    text-align: left;\n    display: inline-block;\n    flex: 0 0 auto; }\n  .app-title .ux-animation.animate {\n    animation-name: show-ux; }\n    .app-title .ux-animation.animate span.i {\n      animation-delay: 2.3s;\n      animation-name: start-spin-i; }\n    .app-title .ux-animation.animate span.x {\n      animation-delay: 2.5s;\n      transform: rotate(-180deg);\n      opacity: 0;\n      animation-name: start-spin-x; }\n  .app-title .ux-animation.split-ix span.ix span.i {\n    animation-name: start-split-i; }\n  .app-title .ux-animation.split-ix span.ix span.x {\n    transform: rotate(0deg);\n    animation-name: start-split-x; }\n  .app-title .ux-animation.animate-out {\n    animation-name: hide-ux; }\n\n@keyframes show-ux {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@keyframes hide-ux {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0; } }\n\n@keyframes start-spin-i {\n  from {\n    opacity: 1;\n    transform: rotate(0deg); }\n  to {\n    opacity: 0;\n    transform: rotate(180deg); } }\n\n@keyframes start-spin-x {\n  from {\n    opacity: 0;\n    transform: rotate(-180deg); }\n  to {\n    opacity: 1;\n    transform: rotate(0deg); } }\n\n@keyframes start-split-i {\n  0% {\n    opacity: 0;\n    transform: rotate(180deg); }\n  2% {\n    opacity: 0;\n    transform: rotate(0deg); }\n  100% {\n    opacity: 1;\n    transform: rotate(0deg); } }\n\n@keyframes start-split-x {\n  from {\n    opacity: 1;\n    transform: translate(0, 0); }\n  to {\n    opacity: 1;\n    transform: translate(100%, 0); } }\n\nheader.app-header {\n  display: flex;\n  flex-direction: row;\n  align-items: flex-start;\n  justify-content: flex-start;\n  min-height: 56px;\n  line-height: 56px;\n  background-color: #D9D9D9;\n  color: rgba(0, 0, 0, 0.87);\n  font-size: 24px;\n  border-bottom: rgba(0, 0, 0, 0.12);\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  z-index: 6;\n  border-width: 0;\n  border-color: rgba(0, 0, 0, 0.12); }\n  header.app-header .header-content {\n    flex: 1;\n    display: flex;\n    flex-direction: row;\n    align-items: flex-start;\n    justify-content: flex-start;\n    font-size: inherit;\n    line-height: inherit;\n    background-color: inherit;\n    color: inherit;\n    border-bottom-width: 1px;\n    border-bottom-style: solid;\n    border-bottom-color: inherit; }\n  header.app-header icon, header.app-header span {\n    color: inherit;\n    line-height: inherit;\n    cursor: pointer; }\n  header.app-header icon {\n    width: 56px;\n    text-align: center; }\n  header.app-header span {\n    font-size: inherit; }\n  header.app-header nav {\n    font-size: inherit;\n    line-height: inherit;\n    color: inherit;\n    position: relative;\n    display: block;\n    flex: 0 0 auto; }\n  header.app-header nav.left-nav {\n    order: -1; }\n  header.app-header nav.center-nav {\n    flex: 1; }\n  header.app-header nav.right-nav {\n    margin-left: auto; }\n\nfooter.app-footer {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-items: flex-start;\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  min-height: 56px;\n  z-index: 6;\n  font-size: 24px;\n  line-height: 56px;\n  color: rgba(0, 0, 0, 0.87);\n  max-height: 56px; }\n  footer.app-footer .footer-content {\n    flex: 1;\n    display: flex;\n    flex-direction: row;\n    align-items: flex-start;\n    justify-content: flex-start;\n    font-size: inherit;\n    line-height: inherit;\n    color: inherit; }\n  footer.app-footer icon, footer.app-footer span, footer.app-footer nav {\n    color: inherit;\n    line-height: inherit;\n    cursor: pointer; }\n  footer.app-footer span, footer.app-footer nav {\n    font-size: inherit; }\n  footer.app-footer icon {\n    width: 56px;\n    text-align: center; }\n  footer.app-footer nav.left-nav {\n    flex: 0 0 auto; }\n  footer.app-footer nav.center-nav {\n    flex: 1;\n    text-align: right; }\n  footer.app-footer nav.right-nav {\n    flex: 0 0 auto; }\n\n*::-webkit-scrollbar {\n  display: none; }\n\n* {\n  -webkit-tap-highlight-color: transparent; }\n\nhtml {\n  width: 100vw;\n  height: 100vh;\n  color: #323232;\n  font-family: 'Roboto', sans-serif;\n  max-width: 100%;\n  max-height: 100vh;\n  min-height: 100vh;\n  overflow-x: hidden;\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch;\n  /* lets it scroll lazy */ }\n\nbody {\n  padding: 0;\n  margin: 0;\n  position: relative;\n  width: 100%;\n  max-width: 100%; }\n\nbutton {\n  background: transparent;\n  border: none;\n  outline: none;\n  -webkit-webkit-appearance: none;\n  -moz-webkit-appearance: none;\n  -ms-webkit-appearance: none;\n  -o-webkit-appearance: none;\n  webkit-appearance: none; }\n\ncontainer {\n  position: relative;\n  display: block;\n  z-index: 3;\n  pointer-events: none;\n  box-shadow: -2px 0 4px rgba(0, 0, 0, 0.2); }\n  container > * {\n    pointer-events: auto; }\n\nmain {\n  display: flex;\n  flex-direction: column;\n  align-items: stretch;\n  justify-content: flex-start;\n  position: relative;\n  z-index: 5;\n  max-width: 100%;\n  overflow-x: hidden; }\n\nicon {\n  user-select: none; }\n\n.background-container {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  min-height: 100%;\n  display: flex;\n  align-items: stretch;\n  flex-direction: column;\n  z-index: 1;\n  transform: translate3d(-50px, 0, 0); }\n\n.app-background {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 0;\n  background-image: url(http://brodeurcampbellfence.com/wp-content/uploads/2013/03/gradient-background-more-white.jpg);\n  background-repeat: no-repeat;\n  background-size: cover; }\n\nnav-section {\n  height: auto;\n  min-height: 100vh;\n  flex: 1 0 auto;\n  min-width: 100%; }\n\nheader.nav-section-header {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  min-height: 56px;\n  display: flex;\n  flex-direction: row;\n  height: 56px;\n  z-index: 5; }\n\nnav-section header.nav-section-header {\n  position: absolute; }\n\nheader.header-title {\n  background-color: #D9D9D9;\n  color: rgba(0, 0, 0, 0.87); }\n  header.header-title icon {\n    color: rgba(0, 0, 0, 0.87); }\n  header.header-title .header-title {\n    color: rgba(0, 0, 0, 0.87); }\n\nnav-section.app-title {\n  background-color: #D9D9D9; }\n\n.background-container nav-section.app-title + nav-section {\n  position: relative; }\n  .background-container nav-section.app-title + nav-section:before {\n    content: \" \";\n    position: absolute;\n    top: 0;\n    right: 0;\n    left: 0;\n    min-height: 200px;\n    max-height: 200px;\n    width: 100%;\n    transform: translateY(-50%);\n    /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#D9D9D9+0,#284B63+100 */\n    background: #D9D9D9;\n    /* Old browsers */\n    background: -moz-linear-gradient(top, #D9D9D9 0%, #284B63 100%);\n    /* FF3.6-15 */\n    background: -webkit-linear-gradient(top, #D9D9D9 0%, #284B63 100%);\n    /* Chrome10-25,Safari5.1-6 */\n    background: linear-gradient(to bottom, #D9D9D9 0%, #284B63 100%);\n    /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */\n    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#D9D9D9', endColorstr='#284B63',GradientType=0 );\n    /* IE6-9 */ }\n\n.view-title-active navigation ul.navigation-list li.active {\n  background-color: transparent; }\n\n@media screen and (min-width: 768px) {\n  .view-title-active navigation ul.navigation-list li:hover {\n    background-color: rgba(255, 255, 255, 0.4); } }\n\n.view-title-no-header-title header.header-title .header-title {\n  opacity: 0;\n  visibility: hidden; }\n\n.view-title-topbar header.header-title {\n  top: 0;\n  bottom: unset;\n  opacity: 1;\n  visibility: visible; }\n  .view-title-topbar header.header-title icon.direction-icon {\n    margin-left: auto;\n    margin-right: 0; }\n  .view-title-topbar header.header-title icon.menu-icon {\n    margin-right: auto;\n    display: block; }\n  @media screen and (min-width: 1200px) {\n    .view-title-topbar header.header-title icon.menu-icon {\n      display: none; } }\n  .view-title-topbar header.header-title .header-title {\n    text-align: left;\n    transform: translate3d(0, 0, 0);\n    font-size: 24px; }\n\n.view-title-topbar.view-title-no-header-title header.header-title .header-title {\n  opacity: 0;\n  visibility: hidden; }\n\n.view-title-title:not(.view-title-topbar) header.header-title {\n  top: 0;\n  bottom: unset;\n  opacity: 0;\n  visibility: hidden; }\n  .view-title-title:not(.view-title-topbar) header.header-title icon.direction-icon {\n    margin-left: auto;\n    margin-right: 0; }\n  .view-title-title:not(.view-title-topbar) header.header-title icon.menu-icon {\n    margin-right: auto;\n    display: block; }\n  @media screen and (min-width: 1200px) {\n    .view-title-title:not(.view-title-topbar) header.header-title icon.menu-icon {\n      display: none; } }\n  .view-title-title:not(.view-title-topbar) header.header-title .header-title {\n    text-align: center;\n    transform: translate3d(0, 150%, 0);\n    font-size: 56px; }\n  .view-title-title:not(.view-title-topbar) header.header-title .header-title {\n    opacity: 0;\n    visibility: hidden; }\n\n.view-title-title nav-section.app-title header.nav-section-header {\n  top: 0;\n  bottom: unset;\n  opacity: 1;\n  visibility: visible; }\n  .view-title-title nav-section.app-title header.nav-section-header icon.direction-icon {\n    margin-left: auto;\n    margin-right: 0; }\n  .view-title-title nav-section.app-title header.nav-section-header icon.menu-icon {\n    margin-right: auto;\n    display: block; }\n  @media screen and (min-width: 1200px) {\n    .view-title-title nav-section.app-title header.nav-section-header icon.menu-icon {\n      display: none; } }\n  .view-title-title nav-section.app-title header.nav-section-header .header-title {\n    text-align: center;\n    transform: translate3d(0, 150%, 0);\n    font-size: 56px; }\n\n.view-title-peek header.header-title {\n  top: unset;\n  bottom: 0;\n  opacity: 1;\n  visibility: visible; }\n  .view-title-peek header.header-title icon.direction-icon {\n    margin-left: auto;\n    margin-right: 0;\n    transform: rotate(180deg); }\n  .view-title-peek header.header-title .header-title {\n    text-align: right;\n    transform: translate3d(0, 0, 0);\n    font-size: 24px; }\n\n.view-title-next header.header-title {\n  top: unset;\n  bottom: 0;\n  opacity: 1;\n  visibility: visible; }\n  .view-title-next header.header-title icon.direction-icon {\n    margin-left: auto;\n    margin-right: 0;\n    transform: rotate(180deg); }\n  .view-title-next header.header-title .header-title {\n    text-align: right;\n    transform: translate3d(0, 0, 0);\n    font-size: 24px; }\n\nheader.header-profile {\n  background-color: #284B63;\n  color: white; }\n  header.header-profile icon {\n    color: white; }\n  header.header-profile .header-title {\n    color: white; }\n\nnav-section.app-profile {\n  background-color: #284B63; }\n\n.background-container nav-section.app-profile + nav-section {\n  position: relative; }\n  .background-container nav-section.app-profile + nav-section:before {\n    content: \" \";\n    position: absolute;\n    top: 0;\n    right: 0;\n    left: 0;\n    min-height: 200px;\n    max-height: 200px;\n    width: 100%;\n    transform: translateY(-50%);\n    /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#284B63+0,#77A0A2+100 */\n    background: #284B63;\n    /* Old browsers */\n    background: -moz-linear-gradient(top, #284B63 0%, #77A0A2 100%);\n    /* FF3.6-15 */\n    background: -webkit-linear-gradient(top, #284B63 0%, #77A0A2 100%);\n    /* Chrome10-25,Safari5.1-6 */\n    background: linear-gradient(to bottom, #284B63 0%, #77A0A2 100%);\n    /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */\n    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#284B63', endColorstr='#77A0A2',GradientType=0 );\n    /* IE6-9 */ }\n\n.view-profile-active navigation ul.navigation-list li.active {\n  background-color: transparent; }\n\n@media screen and (min-width: 768px) {\n  .view-profile-active navigation ul.navigation-list li:hover {\n    background-color: rgba(255, 255, 255, 0.4); } }\n\n.view-profile-no-header-title header.header-profile .header-title {\n  opacity: 0;\n  visibility: hidden; }\n\n.view-profile-topbar header.header-profile {\n  top: 0;\n  bottom: unset;\n  opacity: 1;\n  visibility: visible; }\n  .view-profile-topbar header.header-profile icon.direction-icon {\n    margin-left: auto;\n    margin-right: 0; }\n  .view-profile-topbar header.header-profile icon.menu-icon {\n    margin-right: auto;\n    display: block; }\n  @media screen and (min-width: 1200px) {\n    .view-profile-topbar header.header-profile icon.menu-icon {\n      display: none; } }\n  .view-profile-topbar header.header-profile .header-title {\n    text-align: left;\n    transform: translate3d(0, 0, 0);\n    font-size: 24px; }\n\n.view-profile-topbar.view-profile-no-header-title header.header-profile .header-title {\n  opacity: 0;\n  visibility: hidden; }\n\n.view-profile-title:not(.view-profile-topbar) header.header-profile {\n  top: 0;\n  bottom: unset;\n  opacity: 0;\n  visibility: hidden; }\n  .view-profile-title:not(.view-profile-topbar) header.header-profile icon.direction-icon {\n    margin-left: auto;\n    margin-right: 0; }\n  .view-profile-title:not(.view-profile-topbar) header.header-profile icon.menu-icon {\n    margin-right: auto;\n    display: block; }\n  @media screen and (min-width: 1200px) {\n    .view-profile-title:not(.view-profile-topbar) header.header-profile icon.menu-icon {\n      display: none; } }\n  .view-profile-title:not(.view-profile-topbar) header.header-profile .header-title {\n    text-align: center;\n    transform: translate3d(0, 150%, 0);\n    font-size: 56px; }\n  .view-profile-title:not(.view-profile-topbar) header.header-profile .header-title {\n    opacity: 0;\n    visibility: hidden; }\n\n.view-profile-title nav-section.app-profile header.nav-section-header {\n  top: 0;\n  bottom: unset;\n  opacity: 1;\n  visibility: visible; }\n  .view-profile-title nav-section.app-profile header.nav-section-header icon.direction-icon {\n    margin-left: auto;\n    margin-right: 0; }\n  .view-profile-title nav-section.app-profile header.nav-section-header icon.menu-icon {\n    margin-right: auto;\n    display: block; }\n  @media screen and (min-width: 1200px) {\n    .view-profile-title nav-section.app-profile header.nav-section-header icon.menu-icon {\n      display: none; } }\n  .view-profile-title nav-section.app-profile header.nav-section-header .header-title {\n    text-align: center;\n    transform: translate3d(0, 150%, 0);\n    font-size: 56px; }\n\n.view-profile-peek header.header-profile {\n  top: unset;\n  bottom: 0;\n  opacity: 1;\n  visibility: visible; }\n  .view-profile-peek header.header-profile icon.direction-icon {\n    margin-left: auto;\n    margin-right: 0;\n    transform: rotate(180deg); }\n  .view-profile-peek header.header-profile .header-title {\n    text-align: right;\n    transform: translate3d(0, 0, 0);\n    font-size: 24px; }\n\n.view-profile-next header.header-profile {\n  top: unset;\n  bottom: 0;\n  opacity: 1;\n  visibility: visible; }\n  .view-profile-next header.header-profile icon.direction-icon {\n    margin-left: auto;\n    margin-right: 0;\n    transform: rotate(180deg); }\n  .view-profile-next header.header-profile .header-title {\n    text-align: right;\n    transform: translate3d(0, 0, 0);\n    font-size: 24px; }\n\nheader.header-projects {\n  background-color: #77A0A2;\n  color: rgba(0, 0, 0, 0.87); }\n  header.header-projects icon {\n    color: rgba(0, 0, 0, 0.87); }\n  header.header-projects .header-title {\n    color: rgba(0, 0, 0, 0.87); }\n\nnav-section.app-projects {\n  background-color: #77A0A2; }\n\n.background-container nav-section.app-projects + nav-section {\n  position: relative; }\n  .background-container nav-section.app-projects + nav-section:before {\n    content: \" \";\n    position: absolute;\n    top: 0;\n    right: 0;\n    left: 0;\n    min-height: 200px;\n    max-height: 200px;\n    width: 100%;\n    transform: translateY(-50%);\n    /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#77A0A2+0,#D9D9D9+100 */\n    background: #77A0A2;\n    /* Old browsers */\n    background: -moz-linear-gradient(top, #77A0A2 0%, #D9D9D9 100%);\n    /* FF3.6-15 */\n    background: -webkit-linear-gradient(top, #77A0A2 0%, #D9D9D9 100%);\n    /* Chrome10-25,Safari5.1-6 */\n    background: linear-gradient(to bottom, #77A0A2 0%, #D9D9D9 100%);\n    /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */\n    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#77A0A2', endColorstr='#D9D9D9',GradientType=0 );\n    /* IE6-9 */ }\n\n.view-projects-active navigation ul.navigation-list li.active {\n  background-color: transparent; }\n\n@media screen and (min-width: 768px) {\n  .view-projects-active navigation ul.navigation-list li:hover {\n    background-color: rgba(255, 255, 255, 0.4); } }\n\n.view-projects-no-header-title header.header-projects .header-title {\n  opacity: 0;\n  visibility: hidden; }\n\n.view-projects-topbar header.header-projects {\n  top: 0;\n  bottom: unset;\n  opacity: 1;\n  visibility: visible; }\n  .view-projects-topbar header.header-projects icon.direction-icon {\n    margin-left: auto;\n    margin-right: 0; }\n  .view-projects-topbar header.header-projects icon.menu-icon {\n    margin-right: auto;\n    display: block; }\n  @media screen and (min-width: 1200px) {\n    .view-projects-topbar header.header-projects icon.menu-icon {\n      display: none; } }\n  .view-projects-topbar header.header-projects .header-title {\n    text-align: left;\n    transform: translate3d(0, 0, 0);\n    font-size: 24px; }\n\n.view-projects-topbar.view-projects-no-header-title header.header-projects .header-title {\n  opacity: 0;\n  visibility: hidden; }\n\n.view-projects-title:not(.view-projects-topbar) header.header-projects {\n  top: 0;\n  bottom: unset;\n  opacity: 0;\n  visibility: hidden; }\n  .view-projects-title:not(.view-projects-topbar) header.header-projects icon.direction-icon {\n    margin-left: auto;\n    margin-right: 0; }\n  .view-projects-title:not(.view-projects-topbar) header.header-projects icon.menu-icon {\n    margin-right: auto;\n    display: block; }\n  @media screen and (min-width: 1200px) {\n    .view-projects-title:not(.view-projects-topbar) header.header-projects icon.menu-icon {\n      display: none; } }\n  .view-projects-title:not(.view-projects-topbar) header.header-projects .header-title {\n    text-align: center;\n    transform: translate3d(0, 150%, 0);\n    font-size: 56px; }\n  .view-projects-title:not(.view-projects-topbar) header.header-projects .header-title {\n    opacity: 0;\n    visibility: hidden; }\n\n.view-projects-title nav-section.app-projects header.nav-section-header {\n  top: 0;\n  bottom: unset;\n  opacity: 1;\n  visibility: visible; }\n  .view-projects-title nav-section.app-projects header.nav-section-header icon.direction-icon {\n    margin-left: auto;\n    margin-right: 0; }\n  .view-projects-title nav-section.app-projects header.nav-section-header icon.menu-icon {\n    margin-right: auto;\n    display: block; }\n  @media screen and (min-width: 1200px) {\n    .view-projects-title nav-section.app-projects header.nav-section-header icon.menu-icon {\n      display: none; } }\n  .view-projects-title nav-section.app-projects header.nav-section-header .header-title {\n    text-align: center;\n    transform: translate3d(0, 150%, 0);\n    font-size: 56px; }\n\n.view-projects-peek header.header-projects {\n  top: unset;\n  bottom: 0;\n  opacity: 1;\n  visibility: visible; }\n  .view-projects-peek header.header-projects icon.direction-icon {\n    margin-left: auto;\n    margin-right: 0;\n    transform: rotate(180deg); }\n  .view-projects-peek header.header-projects .header-title {\n    text-align: right;\n    transform: translate3d(0, 0, 0);\n    font-size: 24px; }\n\n.view-projects-next header.header-projects {\n  top: unset;\n  bottom: 0;\n  opacity: 1;\n  visibility: visible; }\n  .view-projects-next header.header-projects icon.direction-icon {\n    margin-left: auto;\n    margin-right: 0;\n    transform: rotate(180deg); }\n  .view-projects-next header.header-projects .header-title {\n    text-align: right;\n    transform: translate3d(0, 0, 0);\n    font-size: 24px; }\n\nheader.header-experience {\n  background-color: #D9D9D9;\n  color: rgba(0, 0, 0, 0.87); }\n  header.header-experience icon {\n    color: rgba(0, 0, 0, 0.87); }\n  header.header-experience .header-title {\n    color: rgba(0, 0, 0, 0.87); }\n\nnav-section.app-experience {\n  background-color: #D9D9D9; }\n\n.background-container nav-section.app-experience + nav-section {\n  position: relative; }\n  .background-container nav-section.app-experience + nav-section:before {\n    content: \" \";\n    position: absolute;\n    top: 0;\n    right: 0;\n    left: 0;\n    min-height: 200px;\n    max-height: 200px;\n    width: 100%;\n    transform: translateY(-50%);\n    /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#D9D9D9+0,#353535+100 */\n    background: #D9D9D9;\n    /* Old browsers */\n    background: -moz-linear-gradient(top, #D9D9D9 0%, #353535 100%);\n    /* FF3.6-15 */\n    background: -webkit-linear-gradient(top, #D9D9D9 0%, #353535 100%);\n    /* Chrome10-25,Safari5.1-6 */\n    background: linear-gradient(to bottom, #D9D9D9 0%, #353535 100%);\n    /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */\n    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#D9D9D9', endColorstr='#353535',GradientType=0 );\n    /* IE6-9 */ }\n\n.view-experience-active navigation ul.navigation-list li.active {\n  background-color: transparent; }\n\n@media screen and (min-width: 768px) {\n  .view-experience-active navigation ul.navigation-list li:hover {\n    background-color: rgba(255, 255, 255, 0.4); } }\n\n.view-experience-no-header-title header.header-experience .header-title {\n  opacity: 0;\n  visibility: hidden; }\n\n.view-experience-topbar header.header-experience {\n  top: 0;\n  bottom: unset;\n  opacity: 1;\n  visibility: visible; }\n  .view-experience-topbar header.header-experience icon.direction-icon {\n    margin-left: auto;\n    margin-right: 0; }\n  .view-experience-topbar header.header-experience icon.menu-icon {\n    margin-right: auto;\n    display: block; }\n  @media screen and (min-width: 1200px) {\n    .view-experience-topbar header.header-experience icon.menu-icon {\n      display: none; } }\n  .view-experience-topbar header.header-experience .header-title {\n    text-align: left;\n    transform: translate3d(0, 0, 0);\n    font-size: 24px; }\n\n.view-experience-topbar.view-experience-no-header-title header.header-experience .header-title {\n  opacity: 0;\n  visibility: hidden; }\n\n.view-experience-title:not(.view-experience-topbar) header.header-experience {\n  top: 0;\n  bottom: unset;\n  opacity: 0;\n  visibility: hidden; }\n  .view-experience-title:not(.view-experience-topbar) header.header-experience icon.direction-icon {\n    margin-left: auto;\n    margin-right: 0; }\n  .view-experience-title:not(.view-experience-topbar) header.header-experience icon.menu-icon {\n    margin-right: auto;\n    display: block; }\n  @media screen and (min-width: 1200px) {\n    .view-experience-title:not(.view-experience-topbar) header.header-experience icon.menu-icon {\n      display: none; } }\n  .view-experience-title:not(.view-experience-topbar) header.header-experience .header-title {\n    text-align: center;\n    transform: translate3d(0, 150%, 0);\n    font-size: 56px; }\n  .view-experience-title:not(.view-experience-topbar) header.header-experience .header-title {\n    opacity: 0;\n    visibility: hidden; }\n\n.view-experience-title nav-section.app-experience header.nav-section-header {\n  top: 0;\n  bottom: unset;\n  opacity: 1;\n  visibility: visible; }\n  .view-experience-title nav-section.app-experience header.nav-section-header icon.direction-icon {\n    margin-left: auto;\n    margin-right: 0; }\n  .view-experience-title nav-section.app-experience header.nav-section-header icon.menu-icon {\n    margin-right: auto;\n    display: block; }\n  @media screen and (min-width: 1200px) {\n    .view-experience-title nav-section.app-experience header.nav-section-header icon.menu-icon {\n      display: none; } }\n  .view-experience-title nav-section.app-experience header.nav-section-header .header-title {\n    text-align: center;\n    transform: translate3d(0, 150%, 0);\n    font-size: 56px; }\n\n.view-experience-peek header.header-experience {\n  top: unset;\n  bottom: 0;\n  opacity: 1;\n  visibility: visible; }\n  .view-experience-peek header.header-experience icon.direction-icon {\n    margin-left: auto;\n    margin-right: 0;\n    transform: rotate(180deg); }\n  .view-experience-peek header.header-experience .header-title {\n    text-align: right;\n    transform: translate3d(0, 0, 0);\n    font-size: 24px; }\n\n.view-experience-next header.header-experience {\n  top: unset;\n  bottom: 0;\n  opacity: 1;\n  visibility: visible; }\n  .view-experience-next header.header-experience icon.direction-icon {\n    margin-left: auto;\n    margin-right: 0;\n    transform: rotate(180deg); }\n  .view-experience-next header.header-experience .header-title {\n    text-align: right;\n    transform: translate3d(0, 0, 0);\n    font-size: 24px; }\n\nheader.header-education {\n  background-color: #353535;\n  color: white; }\n  header.header-education icon {\n    color: white; }\n  header.header-education .header-title {\n    color: white; }\n\nnav-section.app-education {\n  background-color: #353535; }\n\n.background-container nav-section.app-education + nav-section {\n  position: relative; }\n  .background-container nav-section.app-education + nav-section:before {\n    content: \" \";\n    position: absolute;\n    top: 0;\n    right: 0;\n    left: 0;\n    min-height: 200px;\n    max-height: 200px;\n    width: 100%;\n    transform: translateY(-50%);\n    /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#353535+0,#D9D9D9+100 */\n    background: #353535;\n    /* Old browsers */\n    background: -moz-linear-gradient(top, #353535 0%, #D9D9D9 100%);\n    /* FF3.6-15 */\n    background: -webkit-linear-gradient(top, #353535 0%, #D9D9D9 100%);\n    /* Chrome10-25,Safari5.1-6 */\n    background: linear-gradient(to bottom, #353535 0%, #D9D9D9 100%);\n    /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */\n    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#353535', endColorstr='#D9D9D9',GradientType=0 );\n    /* IE6-9 */ }\n\n.view-education-active navigation ul.navigation-list li.active {\n  background-color: transparent; }\n\n@media screen and (min-width: 768px) {\n  .view-education-active navigation ul.navigation-list li:hover {\n    background-color: rgba(255, 255, 255, 0.4); } }\n\n.view-education-no-header-title header.header-education .header-title {\n  opacity: 0;\n  visibility: hidden; }\n\n.view-education-topbar header.header-education {\n  top: 0;\n  bottom: unset;\n  opacity: 1;\n  visibility: visible; }\n  .view-education-topbar header.header-education icon.direction-icon {\n    margin-left: auto;\n    margin-right: 0; }\n  .view-education-topbar header.header-education icon.menu-icon {\n    margin-right: auto;\n    display: block; }\n  @media screen and (min-width: 1200px) {\n    .view-education-topbar header.header-education icon.menu-icon {\n      display: none; } }\n  .view-education-topbar header.header-education .header-title {\n    text-align: left;\n    transform: translate3d(0, 0, 0);\n    font-size: 24px; }\n\n.view-education-topbar.view-education-no-header-title header.header-education .header-title {\n  opacity: 0;\n  visibility: hidden; }\n\n.view-education-title:not(.view-education-topbar) header.header-education {\n  top: 0;\n  bottom: unset;\n  opacity: 0;\n  visibility: hidden; }\n  .view-education-title:not(.view-education-topbar) header.header-education icon.direction-icon {\n    margin-left: auto;\n    margin-right: 0; }\n  .view-education-title:not(.view-education-topbar) header.header-education icon.menu-icon {\n    margin-right: auto;\n    display: block; }\n  @media screen and (min-width: 1200px) {\n    .view-education-title:not(.view-education-topbar) header.header-education icon.menu-icon {\n      display: none; } }\n  .view-education-title:not(.view-education-topbar) header.header-education .header-title {\n    text-align: center;\n    transform: translate3d(0, 150%, 0);\n    font-size: 56px; }\n  .view-education-title:not(.view-education-topbar) header.header-education .header-title {\n    opacity: 0;\n    visibility: hidden; }\n\n.view-education-title nav-section.app-education header.nav-section-header {\n  top: 0;\n  bottom: unset;\n  opacity: 1;\n  visibility: visible; }\n  .view-education-title nav-section.app-education header.nav-section-header icon.direction-icon {\n    margin-left: auto;\n    margin-right: 0; }\n  .view-education-title nav-section.app-education header.nav-section-header icon.menu-icon {\n    margin-right: auto;\n    display: block; }\n  @media screen and (min-width: 1200px) {\n    .view-education-title nav-section.app-education header.nav-section-header icon.menu-icon {\n      display: none; } }\n  .view-education-title nav-section.app-education header.nav-section-header .header-title {\n    text-align: center;\n    transform: translate3d(0, 150%, 0);\n    font-size: 56px; }\n\n.view-education-peek header.header-education {\n  top: unset;\n  bottom: 0;\n  opacity: 1;\n  visibility: visible; }\n  .view-education-peek header.header-education icon.direction-icon {\n    margin-left: auto;\n    margin-right: 0;\n    transform: rotate(180deg); }\n  .view-education-peek header.header-education .header-title {\n    text-align: right;\n    transform: translate3d(0, 0, 0);\n    font-size: 24px; }\n\n.view-education-next header.header-education {\n  top: unset;\n  bottom: 0;\n  opacity: 1;\n  visibility: visible; }\n  .view-education-next header.header-education icon.direction-icon {\n    margin-left: auto;\n    margin-right: 0;\n    transform: rotate(180deg); }\n  .view-education-next header.header-education .header-title {\n    text-align: right;\n    transform: translate3d(0, 0, 0);\n    font-size: 24px; }\n\nheader.header-technology {\n  background-color: #D9D9D9;\n  color: rgba(0, 0, 0, 0.87); }\n  header.header-technology icon {\n    color: rgba(0, 0, 0, 0.87); }\n  header.header-technology .header-title {\n    color: rgba(0, 0, 0, 0.87); }\n\nnav-section.app-technology {\n  background-color: #D9D9D9; }\n\n.view-technology-active navigation ul.navigation-list li.active {\n  background-color: transparent; }\n\n@media screen and (min-width: 768px) {\n  .view-technology-active navigation ul.navigation-list li:hover {\n    background-color: rgba(255, 255, 255, 0.4); } }\n\n.view-technology-no-header-title header.header-technology .header-title {\n  opacity: 0;\n  visibility: hidden; }\n\n.view-technology-topbar header.header-technology {\n  top: 0;\n  bottom: unset;\n  opacity: 1;\n  visibility: visible; }\n  .view-technology-topbar header.header-technology icon.direction-icon {\n    margin-left: auto;\n    margin-right: 0; }\n  .view-technology-topbar header.header-technology icon.menu-icon {\n    margin-right: auto;\n    display: block; }\n  @media screen and (min-width: 1200px) {\n    .view-technology-topbar header.header-technology icon.menu-icon {\n      display: none; } }\n  .view-technology-topbar header.header-technology .header-title {\n    text-align: left;\n    transform: translate3d(0, 0, 0);\n    font-size: 24px; }\n\n.view-technology-topbar.view-technology-no-header-title header.header-technology .header-title {\n  opacity: 0;\n  visibility: hidden; }\n\n.view-technology-title:not(.view-technology-topbar) header.header-technology {\n  top: 0;\n  bottom: unset;\n  opacity: 0;\n  visibility: hidden; }\n  .view-technology-title:not(.view-technology-topbar) header.header-technology icon.direction-icon {\n    margin-left: auto;\n    margin-right: 0; }\n  .view-technology-title:not(.view-technology-topbar) header.header-technology icon.menu-icon {\n    margin-right: auto;\n    display: block; }\n  @media screen and (min-width: 1200px) {\n    .view-technology-title:not(.view-technology-topbar) header.header-technology icon.menu-icon {\n      display: none; } }\n  .view-technology-title:not(.view-technology-topbar) header.header-technology .header-title {\n    text-align: center;\n    transform: translate3d(0, 150%, 0);\n    font-size: 56px; }\n  .view-technology-title:not(.view-technology-topbar) header.header-technology .header-title {\n    opacity: 0;\n    visibility: hidden; }\n\n.view-technology-title nav-section.app-technology header.nav-section-header {\n  top: 0;\n  bottom: unset;\n  opacity: 1;\n  visibility: visible; }\n  .view-technology-title nav-section.app-technology header.nav-section-header icon.direction-icon {\n    margin-left: auto;\n    margin-right: 0; }\n  .view-technology-title nav-section.app-technology header.nav-section-header icon.menu-icon {\n    margin-right: auto;\n    display: block; }\n  @media screen and (min-width: 1200px) {\n    .view-technology-title nav-section.app-technology header.nav-section-header icon.menu-icon {\n      display: none; } }\n  .view-technology-title nav-section.app-technology header.nav-section-header .header-title {\n    text-align: center;\n    transform: translate3d(0, 150%, 0);\n    font-size: 56px; }\n\n.view-technology-peek header.header-technology {\n  top: unset;\n  bottom: 0;\n  opacity: 1;\n  visibility: visible; }\n  .view-technology-peek header.header-technology icon.direction-icon {\n    margin-left: auto;\n    margin-right: 0;\n    transform: rotate(180deg); }\n  .view-technology-peek header.header-technology .header-title {\n    text-align: right;\n    transform: translate3d(0, 0, 0);\n    font-size: 24px; }\n\n.view-technology-next header.header-technology {\n  top: unset;\n  bottom: 0;\n  opacity: 1;\n  visibility: visible; }\n  .view-technology-next header.header-technology icon.direction-icon {\n    margin-left: auto;\n    margin-right: 0;\n    transform: rotate(180deg); }\n  .view-technology-next header.header-technology .header-title {\n    text-align: right;\n    transform: translate3d(0, 0, 0);\n    font-size: 24px; }\n\n.view-title-topbar header.app-header icon.direction-icon {\n  display: none; }\n\n@media screen and (max-width: 1200px) {\n  container > header:first-of-type {\n    visibility: visible;\n    opacity: 1; }\n  container > main,\n  container > header {\n    animation-timing-function: ease-out;\n    animation-fill-mode: forwards;\n    animation-duration: 0.3s; }\n  container.showing-navigation > main,\n  container.showing-navigation > header {\n    animation-name: animate-main-right; }\n  container.show-navigation > main,\n  container.show-navigation > header {\n    transform: translate3d(200px, 0, 0); }\n  container.hiding-navigation > main,\n  container.hiding-navigation > header {\n    animation-name: animate-main-default; }\n  container.hide-navigatin > main,\n  container.hide-navigatin > header {\n    transform: translate3d(0, 0, 0); } }\n\n.profile-background {\n  background-color: #284B63; }\n\n.technology-background {\n  background-color: #D9D9D9; }\n\n.projects-background {\n  background-color: #77A0A2; }\n\n.experience-background {\n  background-color: #D9D9D9; }\n\n.education-background {\n  background-color: #353535; }\n\n.app-title {\n  background-color: #D9D9D9; }\n  .app-title-header {\n    background-color: #D9D9D9; }\n\n.app-profile {\n  background-color: #284B63; }\n  .app-profile article {\n    flex: 1 0 auto;\n    display: flex;\n    flex-direction: column;\n    align-items: stretch;\n    justify-content: flex-start; }\n  .app-profile .profile-image {\n    flex: 0 0 258px;\n    margin: 0 auto;\n    text-align: center; }\n    .app-profile .profile-image img {\n      height: 250px;\n      width: 250px;\n      border-radius: 100%;\n      border: 4px solid white;\n      box-shadow: 0 10px 10px -6px rgba(0, 0, 0, 0.2); }\n  @media screen and (min-width: 1200px) {\n    .app-profile {\n      text-align: center; }\n      .app-profile .profile-image {\n        flex: 0 0 358px; }\n        .app-profile .profile-image img {\n          width: 350px;\n          height: 350px; } }\n  .app-profile .profile-content {\n    flex: 1; }\n  .app-profile ul.profile-detail {\n    list-style: none;\n    margin: 24px 0;\n    padding: 0; }\n    .app-profile ul.profile-detail li {\n      min-height: 48px;\n      line-height: 48px;\n      font-size: 24px;\n      color: white;\n      margin-bottom: 12px;\n      display: flex;\n      flex-direction: column;\n      align-items: flex-start;\n      justify-content: flex-start;\n      padding-bottom: 12px; }\n      .app-profile ul.profile-detail li label {\n        font-size: 14px;\n        padding-right: 12px;\n        color: rgba(255, 255, 255, 0.7);\n        font-weight: bold;\n        margin: 0;\n        flex: 1;\n        padding-left: 36px; }\n      .app-profile ul.profile-detail li .value {\n        flex: 1;\n        display: flex;\n        flex-direction: column;\n        align-items: stretch;\n        justify-content: flex-start;\n        font-size: inherit;\n        line-height: inherit;\n        color: inherit; }\n      .app-profile ul.profile-detail li p {\n        font-size: inherit;\n        line-height: inherit;\n        color: inherit;\n        text-align: left;\n        padding-left: 36px;\n        margin: 0;\n        border-left: 1px solid rgba(255, 255, 255, 0.12); }\n    @media screen and (min-width: 768px) {\n      .app-profile ul.profile-detail li {\n        padding-left: 56px;\n        padding-right: 56px;\n        flex-direction: row;\n        align-items: flex-start;\n        justify-content: flex-start; }\n        .app-profile ul.profile-detail li label {\n          text-align: right;\n          padding-left: 0; }\n        .app-profile ul.profile-detail li p {\n          padding-left: 12px; } }\n  .app-profile-header {\n    background-color: #284B63; }\n    .app-profile-header icon {\n      color: white; }\n    .app-profile-header .header-title {\n      color: white; }\n  .app-profile .header-title {\n    color: white; }\n\n.app-technology {\n  background-color: #D9D9D9; }\n  .app-technology h1 {\n    font-size: 32px;\n    padding-left: 36px; }\n  .app-technology ul {\n    list-style: none;\n    margin: 0 12px;\n    padding: 0;\n    display: flex;\n    flex-wrap: wrap;\n    flex-direction: row;\n    align-items: flex-start;\n    justify-content: flex-start;\n    max-width: 100%;\n    margin-left: 24px;\n    margin-right: 24px; }\n    .app-technology ul li {\n      display: inline-block;\n      margin: 12px;\n      max-width: 100px;\n      min-width: 100px;\n      max-height: 136px;\n      min-height: 136px;\n      background-color: white;\n      padding-bottom: 34px;\n      box-shadow: 0 3px 4px -3px rgba(0, 0, 0, 0.2), 0 3px 4px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.1);\n      position: relative; }\n      .app-technology ul li img {\n        display: block;\n        width: inherit;\n        max-width: inherit; }\n      .app-technology ul li span {\n        display: block;\n        text-align: center;\n        font-size: 18px;\n        font-weight: bold;\n        line-height: 24px;\n        position: absolute;\n        bottom: 0;\n        left: 0;\n        right: 0;\n        height: 24px;\n        margin-bottom: 10px; }\n  @media screen and (min-width: 768px) {\n    .app-technology h1 {\n      padding-left: 56px;\n      padding-right: 56px; }\n    .app-technology ul {\n      margin-left: 44px;\n      margin-right: 44px; } }\n  .app-technology-header {\n    background-color: #D9D9D9; }\n\n.app-projects {\n  background-color: #77A0A2; }\n  .app-projects article {\n    margin-bottom: 24px;\n    border-bottom: 1px solid rgba(0, 0, 0, 0.12);\n    display: flex;\n    flex-direction: column;\n    align-items: flex-start;\n    justify-content: flex-start;\n    padding: 0 12px; }\n    .app-projects article:last-child {\n      border-bottom: none; }\n    .app-projects article > .card-image {\n      height: auto;\n      max-width: 120px;\n      min-width: 120px;\n      height: 120px;\n      width: 120px;\n      margin: 24px auto;\n      text-align: center;\n      background: white;\n      border-radius: 100%;\n      box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2); }\n      .app-projects article > .card-image img {\n        max-width: 110px;\n        max-height: 110px;\n        margin: 5px; }\n    .app-projects article > .card-content {\n      order: -1;\n      flex: 1 1 auto;\n      padding-top: 20px;\n      height: auto;\n      display: flex;\n      flex-direction: column;\n      align-items: flex-start;\n      justify-content: flex-start; }\n    .app-projects article .card-heading {\n      display: flex;\n      flex-direction: column;\n      align-items: flex-start;\n      justify-content: flex-start;\n      margin-bottom: 12px;\n      padding-top: 12px;\n      width: 100%; }\n    .app-projects article .card-title {\n      flex: 1;\n      font-weight: normal;\n      font-size: 36px;\n      color: rgba(0, 0, 0, 0.54);\n      padding-left: 24px;\n      padding-right: 12px;\n      font-size: 24px;\n      font-weight: bold; }\n    .app-projects article .card-date {\n      margin-left: auto;\n      text-align: right;\n      font-size: 14px;\n      padding-right: 12px;\n      letter-spacing: 1.34px;\n      font-weight: bold;\n      color: rgba(0, 0, 0, 0.54);\n      padding-right: 24px;\n      padding-left: 12px;\n      margin-left: 12px; }\n    .app-projects article .card-details {\n      list-style: none;\n      margin: 0;\n      padding: 0; }\n      .app-projects article .card-details li {\n        min-height: 36px;\n        display: flex;\n        flex-direction: row;\n        align-items: flex-start;\n        justify-content: flex-start;\n        padding-left: 24px;\n        padding-right: 24px; }\n      .app-projects article .card-details icon {\n        color: rgba(0, 0, 0, 0.87);\n        flex: 0 0 auto;\n        margin: 6px;\n        font-size: 16px; }\n      .app-projects article .card-details span.text {\n        flex: 0 1 auto;\n        padding-top: 4px;\n        line-height: 1.34;\n        font-size: 16px;\n        font-weight: normal;\n        color: rgba(0, 0, 0, 0.87); }\n    .app-projects article .card-tags {\n      margin: 0 0 24px 0;\n      padding: 0 24px;\n      list-style: none;\n      display: flex;\n      flex-direction: row;\n      align-items: flex-start;\n      justify-content: flex-start;\n      flex-wrap: wrap; }\n      .app-projects article .card-tags li {\n        display: inline;\n        padding: 6px 12px;\n        white-space: nowrap;\n        font-size: 12px;\n        font-weight: normal;\n        color: rgba(0, 0, 0, 0.87);\n        margin: 0 8px 0 0; }\n  @media screen and (min-width: 768px) {\n    .app-projects article {\n      padding: 0 56px;\n      flex-direction: row; }\n      .app-projects article .card-image {\n        margin: 24px; }\n      .app-projects article .card-title {\n        font-size: 36px;\n        font-weight: normal; } }\n  .app-projects .project-image {\n    margin-left: 24px;\n    width: 100px;\n    height: 100px;\n    position: relative;\n    flex: 0 0 auto;\n    height: 108px;\n    width: 108px;\n    background-color: white;\n    box-shadow: 0 4px 4px -3px rgba(0, 0, 0, 0.1), 0 3px 4px rgba(0, 0, 0, 0.2); }\n    .app-projects .project-image img {\n      display: block;\n      max-height: 80px;\n      max-width: 80px;\n      margin: 10px auto; }\n  .app-projects .project-heading {\n    display: flex;\n    flex-direction: column;\n    align-items: flex-start;\n    justify-content: flex-start;\n    margin-bottom: 12px;\n    padding-top: 12px;\n    width: 100%;\n    align-items: flex-end; }\n  .app-projects .project-title {\n    flex: 1;\n    font-weight: normal;\n    font-size: 36px;\n    color: rgba(0, 0, 0, 0.54);\n    padding-left: 24px;\n    padding-right: 12px; }\n  .app-projects .project-date {\n    margin-left: auto;\n    text-align: right;\n    font-size: 14px;\n    padding-right: 12px;\n    letter-spacing: 1.34px;\n    font-weight: bold;\n    color: rgba(0, 0, 0, 0.54);\n    padding-right: 24px;\n    padding-left: 12px; }\n  .app-projects ul.project-details {\n    list-style: none;\n    margin: 0;\n    padding: 0; }\n    .app-projects ul.project-details li {\n      min-height: 36px;\n      display: flex;\n      flex-direction: row;\n      align-items: flex-start;\n      justify-content: flex-start;\n      padding-left: 24px;\n      padding-right: 24px; }\n    .app-projects ul.project-details icon {\n      color: rgba(0, 0, 0, 0.54);\n      flex: 0 0 auto;\n      margin: 6px;\n      font-size: 16px; }\n    .app-projects ul.project-details span.text {\n      flex: 0 1 auto;\n      padding-top: 4px;\n      line-height: 1.34;\n      font-size: 16px;\n      font-weight: normal;\n      color: rgba(0, 0, 0, 0.87); }\n  .app-projects-header {\n    background-color: #77A0A2; }\n\n.app-experience {\n  background-color: #D9D9D9; }\n  .app-experience article {\n    margin-bottom: 24px;\n    border-bottom: 1px solid rgba(0, 0, 0, 0.12);\n    display: flex;\n    flex-direction: column;\n    align-items: flex-start;\n    justify-content: flex-start;\n    padding: 0 12px; }\n    .app-experience article:last-child {\n      border-bottom: none; }\n    .app-experience article > .card-image {\n      height: auto;\n      max-width: 120px;\n      min-width: 120px;\n      height: 120px;\n      width: 120px;\n      margin: 24px auto;\n      text-align: center;\n      background: white;\n      border-radius: 100%;\n      box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2); }\n      .app-experience article > .card-image img {\n        max-width: 110px;\n        max-height: 110px;\n        margin: 5px; }\n    .app-experience article > .card-content {\n      order: -1;\n      flex: 1 1 auto;\n      padding-top: 20px;\n      height: auto;\n      display: flex;\n      flex-direction: column;\n      align-items: flex-start;\n      justify-content: flex-start; }\n    .app-experience article .card-heading {\n      display: flex;\n      flex-direction: column;\n      align-items: flex-start;\n      justify-content: flex-start;\n      margin-bottom: 12px;\n      padding-top: 12px;\n      width: 100%; }\n    .app-experience article .card-title {\n      flex: 1;\n      font-weight: normal;\n      font-size: 36px;\n      color: rgba(0, 0, 0, 0.54);\n      padding-left: 24px;\n      padding-right: 12px;\n      font-size: 24px;\n      font-weight: bold; }\n    .app-experience article .card-date {\n      margin-left: auto;\n      text-align: right;\n      font-size: 14px;\n      padding-right: 12px;\n      letter-spacing: 1.34px;\n      font-weight: bold;\n      color: rgba(0, 0, 0, 0.54);\n      padding-right: 24px;\n      padding-left: 12px;\n      margin-left: 12px; }\n    .app-experience article .card-details {\n      list-style: none;\n      margin: 0;\n      padding: 0; }\n      .app-experience article .card-details li {\n        min-height: 36px;\n        display: flex;\n        flex-direction: row;\n        align-items: flex-start;\n        justify-content: flex-start;\n        padding-left: 24px;\n        padding-right: 24px; }\n      .app-experience article .card-details icon {\n        color: rgba(0, 0, 0, 0.87);\n        flex: 0 0 auto;\n        margin: 6px;\n        font-size: 16px; }\n      .app-experience article .card-details span.text {\n        flex: 0 1 auto;\n        padding-top: 4px;\n        line-height: 1.34;\n        font-size: 16px;\n        font-weight: normal;\n        color: rgba(0, 0, 0, 0.87); }\n    .app-experience article .card-tags {\n      margin: 0 0 24px 0;\n      padding: 0 24px;\n      list-style: none;\n      display: flex;\n      flex-direction: row;\n      align-items: flex-start;\n      justify-content: flex-start;\n      flex-wrap: wrap; }\n      .app-experience article .card-tags li {\n        display: inline;\n        padding: 6px 12px;\n        white-space: nowrap;\n        font-size: 12px;\n        font-weight: normal;\n        color: rgba(0, 0, 0, 0.87);\n        margin: 0 8px 0 0; }\n  @media screen and (min-width: 768px) {\n    .app-experience article {\n      padding: 0 56px;\n      flex-direction: row; }\n      .app-experience article .card-image {\n        margin: 24px; }\n      .app-experience article .card-title {\n        font-size: 36px;\n        font-weight: normal; } }\n  .app-experience .xp-heading {\n    display: flex;\n    flex-direction: column;\n    align-items: flex-start;\n    justify-content: flex-start;\n    margin-bottom: 12px;\n    padding-top: 12px;\n    width: 100%; }\n  .app-experience .xp-title {\n    flex: 1;\n    font-weight: normal;\n    font-size: 36px;\n    color: rgba(0, 0, 0, 0.54);\n    padding-left: 24px;\n    padding-right: 12px; }\n  .app-experience .xp-date {\n    margin-left: auto;\n    text-align: right;\n    font-size: 14px;\n    padding-right: 12px;\n    letter-spacing: 1.34px;\n    font-weight: bold;\n    color: rgba(0, 0, 0, 0.54);\n    padding-right: 24px;\n    padding-left: 12px; }\n  .app-experience ul.xp-details {\n    list-style: none;\n    margin: 0;\n    padding: 0; }\n    .app-experience ul.xp-details li {\n      min-height: 36px;\n      display: flex;\n      flex-direction: row;\n      align-items: flex-start;\n      justify-content: flex-start;\n      padding-left: 24px;\n      padding-right: 24px; }\n    .app-experience ul.xp-details icon {\n      color: rgba(0, 0, 0, 0.54);\n      flex: 0 0 auto;\n      margin: 6px;\n      font-size: 16px; }\n    .app-experience ul.xp-details span.text {\n      flex: 0 1 auto;\n      padding-top: 4px;\n      line-height: 1.34;\n      font-size: 16px;\n      font-weight: normal;\n      color: rgba(0, 0, 0, 0.87); }\n  .app-experience ul.xp-tech {\n    margin: 0 0 24px 0;\n    padding: 0 24px;\n    list-style: none;\n    display: flex;\n    flex-direction: row;\n    align-items: flex-start;\n    justify-content: flex-start;\n    flex-wrap: wrap; }\n    .app-experience ul.xp-tech li {\n      display: inline;\n      padding: 6px 12px;\n      white-space: nowrap;\n      font-size: 12px;\n      font-weight: normal;\n      color: #2196F3;\n      margin: 0 8px 0 0; }\n  .app-experience-header {\n    background-color: #D9D9D9; }\n\n.app-education {\n  background-color: #353535; }\n  .app-education article {\n    margin-bottom: 24px;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.12);\n    display: flex;\n    flex-direction: column;\n    align-items: flex-start;\n    justify-content: flex-start;\n    padding: 0 12px; }\n    .app-education article:last-child {\n      border-bottom: none; }\n    .app-education article > .card-image {\n      height: auto;\n      max-width: 120px;\n      min-width: 120px;\n      height: 120px;\n      width: 120px;\n      margin: 24px auto;\n      text-align: center;\n      background: white;\n      border-radius: 100%;\n      box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2); }\n      .app-education article > .card-image img {\n        max-width: 110px;\n        max-height: 110px;\n        margin: 5px; }\n    .app-education article > .card-content {\n      order: -1;\n      flex: 1 1 auto;\n      padding-top: 20px;\n      height: auto;\n      display: flex;\n      flex-direction: column;\n      align-items: flex-start;\n      justify-content: flex-start; }\n    .app-education article .card-heading {\n      display: flex;\n      flex-direction: column;\n      align-items: flex-start;\n      justify-content: flex-start;\n      margin-bottom: 12px;\n      padding-top: 12px;\n      width: 100%; }\n    .app-education article .card-title {\n      flex: 1;\n      font-weight: normal;\n      font-size: 36px;\n      color: rgba(255, 255, 255, 0.7);\n      padding-left: 24px;\n      padding-right: 12px;\n      font-size: 24px;\n      font-weight: bold; }\n    .app-education article .card-date {\n      margin-left: auto;\n      text-align: right;\n      font-size: 14px;\n      padding-right: 12px;\n      letter-spacing: 1.34px;\n      font-weight: bold;\n      color: rgba(255, 255, 255, 0.5);\n      padding-right: 24px;\n      padding-left: 12px;\n      margin-left: 12px; }\n    .app-education article .card-details {\n      list-style: none;\n      margin: 0;\n      padding: 0; }\n      .app-education article .card-details li {\n        min-height: 36px;\n        display: flex;\n        flex-direction: row;\n        align-items: flex-start;\n        justify-content: flex-start;\n        padding-left: 24px;\n        padding-right: 24px; }\n      .app-education article .card-details icon {\n        color: white;\n        flex: 0 0 auto;\n        margin: 6px;\n        font-size: 16px; }\n      .app-education article .card-details span.text {\n        flex: 0 1 auto;\n        padding-top: 4px;\n        line-height: 1.34;\n        font-size: 16px;\n        font-weight: normal;\n        color: white; }\n    .app-education article .card-tags {\n      margin: 0 0 24px 0;\n      padding: 0 24px;\n      list-style: none;\n      display: flex;\n      flex-direction: row;\n      align-items: flex-start;\n      justify-content: flex-start;\n      flex-wrap: wrap; }\n      .app-education article .card-tags li {\n        display: inline;\n        padding: 6px 12px;\n        white-space: nowrap;\n        font-size: 12px;\n        font-weight: normal;\n        color: white;\n        margin: 0 8px 0 0; }\n  @media screen and (min-width: 768px) {\n    .app-education article {\n      padding: 0 56px;\n      flex-direction: row; }\n      .app-education article .card-image {\n        margin: 24px; }\n      .app-education article .card-title {\n        font-size: 36px;\n        font-weight: normal; } }\n  .app-education header {\n    color: white; }\n    .app-education header icon {\n      color: white; }\n  .app-education-header {\n    background-color: #353535;\n    color: white; }\n    .app-education-header icon {\n      color: white; }\n\n@media screen and (max-width: 1200px) {\n  .platform-ios container navigation {\n    opacity: 0;\n    visibility: hidden;\n    transition: opacity 0.3s ease 0s; }\n  .platform-ios container.offset-main-right navigation {\n    opacity: 1;\n    visibility: visible; }\n  .platform-ios container.animate-main-right navigation {\n    opacity: 1;\n    visibility: visible; }\n  .platform-ios container.animate-main-default navigation {\n    opacity: 0;\n    visibility: hidden; } }\n\n@media screen and (min-width: 1201px) {\n  container {\n    margin-left: 200px; }\n    container > header {\n      margin-left: 200px; }\n    container .header-title {\n      padding-left: 24px; }\n    container icon.menu-icon {\n      display: none !important; } }\n\n.ui-materialize-logo {\n  height: 100%;\n  width: 100%;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: center; }\n  .ui-materialize-logo:before {\n    content: \"ui\";\n    display: block;\n    color: deeppink;\n    font-weight: bold;\n    font-size: 16px;\n    line-height: 20px; }\n  .ui-materialize-logo:after {\n    content: \"Materialize\";\n    display: block;\n    color: dimgrey;\n    font-weight: normal;\n    font-size: 20px; }\n\n.domx-logo {\n  height: 100%;\n  width: 100%;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: center; }\n  .domx-logo:before {\n    content: \"<\";\n    display: block;\n    color: darkorange;\n    font-weight: bold;\n    font-size: 30px;\n    line-height: 24px; }\n  .domx-logo:after {\n    content: \"dom-x\";\n    display: block;\n    color: indigo;\n    font-weight: normal;\n    font-size: 30px; }\n\narticle.card-mparticle .card-image img {\n  margin-top: 24px; }\n\narticle.card-plusamp .card-image img {\n  border-radius: 100%; }\n\narticle.card-his .card-image img {\n  margin-top: 45px; }\n\narticle.card-southwestern .card-image img {\n  margin-top: 26px; }\n\nli.card-item-net img {\n  margin-top: 30px; }\n\nli.card-item-node img,\nli.card-item-mongo img,\nli.card-item-python img,\nli.card-item-postcss img,\nli.card-item-express img,\nli.card-item-sketch img {\n  width: 80% !important;\n  height: 80% !important;\n  margin: 10px; }\n\nli.card-item-sql img,\nli.card-item-redis img,\nli.card-item-grunt img,\nli.card-item-coffeescript img {\n  margin-top: 10px; }\n\nli.card-item-html5 img,\nli.card-item-css3 img {\n  margin-top: 10px; }\n\nli.card-item-node img,\nli.card-item-neo4j img,\nli.card-item-cypher img,\nli.card-item-express img {\n  margin-top: 30px; }\n"; });
define('text!modules/header/header.html', ['module'], function(module) { module.exports = "<template><header ref=element class=app-header><div ripple class=header-content><nav class=left-nav><icon ico=menu class=menu-icon click.delegate=toggleNavigation($event)></icon></nav><nav class=center-nav><span ref=titleNode class=header-title>${props.title}</span></nav><nav class=right-nav><icon ico=arrow_back class=direction-icon click.delegate=navigateBack($event)></icon></nav></div></header></template>"; });
define('text!modules/nav/nav.html', ['module'], function(module) { module.exports = "<template><ul><li repeat.for=\"items of leftNav\" click.delegate=\"navigateToItem($event, item)\"><a>${item.name}</a></li></ul><button click.delegate=buttonClicked($event)></button><ul><li repeat.for=\"items of rightNav\" click.delegate=\"navigateToItem($event, item)\"><a>${item.name}</a></li></ul></template>"; });
define('text!modules/nav-section/nav-section.html', ['module'], function(module) { module.exports = "<template class=\"${view.shade.key}-tint-section ${view.isActive ? 'active' : ''} ${view.isScrolling ? 'scrolling' : ''} ${view.isPeeking ? 'peeking' : ''} ${view.isVisible ? 'visible' : ''}\"><section class=section-container><header ref=header show.bind=view.showTitle click.delegate=headerClicked($event) class=\"nav-section-header app-${view.name}-header\"><span if.bind=view.title class=header-title>${view.title}</span></header><compose containerless view-model.bind=view.viewModel></compose></section></template>"; });
define('text!modules/navigation/navigation.html', ['module'], function(module) { module.exports = "<template><style>navigation ul li.active span.text{color:{};}</style><section css=\"background-color: ${props.fill}\"><ul class=navigation-list css=\"color: ${currentTint};\"><li ripple data-use-fill=${view.fill} repeat.for=\"view of views\" class=\"${view.isActive ? 'active' : ''}\" click.delegate=navigateToView(view)><icon ico.bind=view.icon></icon><span class=text>${view.title}</span></li><li></li></ul></section></template>"; });
define('text!modules/profile/profile.html', ['module'], function(module) { module.exports = "<template><style>@media screen and (max-width:1200px){.app-profile .row{flex-direction:column}.app-profile .row .profile-info{width:100%}.app-profile .row .profile-info ul{margin:24px}}</style><article><div class=profile-image><img src=\"https://avatars0.githubusercontent.com/u/4668188?v=3&s=460\" alt=\"\"></div><div class=profile-content><ul class=profile-detail><li><label>Name</label><div class=value><p>${props.name}</p></div></li><li><label>Birthday</label><div class=value><p>${props.birthday}</p></div></li><li><label>Titles</label><div class=value><p repeat.for=\"title of props.titles\">${title}</p></div></li><li><label>Locations</label><div class=value><p repeat.for=\"loc of props.locations\">${loc}</p></div></li><li><label>Info</label><div class=value><p>${props.info}</p></div></li></ul></div></article></template>"; });
define('text!modules/technology/technology.html', ['module'], function(module) { module.exports = "<template><template repeat.for=\"tech of props.technologies\"><article><h1>${tech.title}</h1><ul><li repeat.for=\"item of tech.list\" class=card-item-${item.name}><img src.bind=item.img alt.bind=item.name><span class=text>${item.title}</span></li></ul></article></template></template>"; });
define('text!modules/projects/projects.html', ['module'], function(module) { module.exports = "<template><template repeat.for=\"project of props.projects\"><article class=card-${project.id}><div class=card-image><span if.bind=\"project.className && !project.image\" class=${project.className}></span><img if.bind=project.image class=${project.className} src.bind=project.image alt.bind=project.name></div><div class=card-content><div class=card-heading><div class=card-title>${project.name}</div><div class=card-date>${project.date}</div></div><ul class=card-details><li repeat.for=\"note of project.notes\"><icon ico=chevron_right></icon><span class=text>${note}</span></li></ul><ul class=card-tags><li repeat.for=\"stack of project.stack\">${stack}</li></ul></div></article></template></template>"; });
define('text!modules/title/title.html', ['module'], function(module) { module.exports = "<template><style>.app-title .title-image{height:450px;width:350px;display:block;float:left;margin:75px 75px 0 75px}.app-title .title-text h1{margin-top:75px;margin-bottom:75px;text-align:center;font-size:56px}.app-title .title-text{display:block;width:100%;text-align:center}</style><div class=title-text><h1>${title}</h1><h3 ref=uxAnimation class=ux-animation><span class=u>U</span><span class=ix><span class=i>I</span><span class=x>X</span></span><span ref=textInsert class=type></span></h3></div></template>"; });
//# sourceMappingURL=app-bundle.js.map