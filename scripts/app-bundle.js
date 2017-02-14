define('app',['exports', 'aurelia-framework', 'modules/header/header', 'modules/footer/footer', 'modules/title/title', 'modules/profile/profile', 'modules/projects/projects', 'modules/technology/technology', 'modules/experience/experience', 'modules/education/education', 'core/enums', './state', 'core/view'], function (exports, _aureliaFramework, _header, _footer, _title, _profile, _projects, _technology, _experience, _education, _enums, _state, _view) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.App = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var props = {
        fullName: 'Joel Cox',
        bday: '09/11/1990',
        email: 'joel.cox.dev@gmail.com',
        phone: '(405) 388-7691'
    };

    var App = exports.App = (_dec = (0, _aureliaFramework.inject)(_state.State, _enums.Enums, _aureliaFramework.Factory.of(_header.Header), _aureliaFramework.Factory.of(_footer.Footer), _aureliaFramework.Factory.of(_title.Title), _aureliaFramework.Factory.of(_profile.Profile), _aureliaFramework.Factory.of(_technology.Technology), _aureliaFramework.Factory.of(_projects.Projects), _aureliaFramework.Factory.of(_experience.Experience), _aureliaFramework.Factory.of(_education.Education)), _dec(_class = function () {
        function App(State, Enums, Header, Footer, Title, Profile, Technology, Projects, Experience, Education) {
            _classCallCheck(this, App);

            this.State = State;
            this.props = props;

            this.State.header = Header(this.State);
            this.State.footer = Footer(this.State);

            State.registerView(new _view.View({
                title: 'Joel Cox',
                name: 'title',
                icon: 'home',
                viewModel: Title({
                    title: props.fullName,
                    summary: 'UI & UX Architect, Engineer & Designer'
                })
            }));

            State.registerView(new _view.View({
                title: 'Profile',
                name: 'profile',
                icon: 'person',
                viewModel: Profile(Enums.Profile, State)
            }));

            State.registerView(new _view.View({
                title: 'Projects',
                name: 'projects',
                icon: 'screen_share',
                viewModel: Projects(Enums.Projects, State)
            }));

            State.registerView(new _view.View({
                title: 'Experience',
                name: 'experience',
                icon: 'verified_user',
                viewModel: Experience(Enums.Experience, State)
            }));

            State.registerView(new _view.View({
                title: 'Education',
                name: 'education',
                icon: 'school',
                viewModel: Education(Enums.Education, State)
            }));

            State.registerView(new _view.View({
                title: 'Technology',
                name: 'technology',
                icon: 'layers',
                viewModel: Technology(Enums.Technology, State)
            }));
        }

        App.prototype.attached = function attached() {
            var _this = this;

            var container = document.querySelector('container');
            var sections = document.querySelectorAll('container > main > nav-section');

            var target = this.State.scrollElement;

            var resetViewsAtIndex = function resetViewsAtIndex(index) {
                var view = void 0;
                while (view = _this.State.views[index++]) {
                    view.isActive = false;
                    view.isVisible = false;
                    view.isPeeking = false;
                    view.isScrolling = false;
                }
            };

            target.onscroll = function (event) {

                var scrollBottom = target.scrollTop + target.clientHeight;
                var scrollTop = Math.ceil(target.scrollTop);
                var index = 0;
                var view = void 0;
                var next = void 0;

                if (scrollTop === 0) {
                    view = _this.State.views[0];

                    view.reset({
                        isActive: true,
                        isVisible: true,
                        isScrolling: true
                    });

                    _this.State.view = view;

                    next = _this.State.views[1];

                    if (next) {
                        next.reset({
                            isPeeking: true
                        });
                    }

                    _this.State.views.slice(2).forEach(function (view) {
                        return view.reset();
                    });
                    return;
                }

                _this.State.views.slice(2).forEach(function (view) {
                    return view.reset();
                });

                while (view = _this.State.views[index++]) {
                    next = _this.State.views[index];

                    var bottom = view.coords.bottom();
                    var offset = view.coords.top() - scrollTop;
                    var backset = view.coords.top() + view.element.clientHeight - scrollTop;

                    if (scrollTop < bottom && scrollTop >= view.coords.top()) {
                        view.reset({
                            isScrolling: true,
                            isVisible: true,
                            isActive: true
                        });

                        _this.State.view = view;

                        if (next && next.coords.top()) {
                            next.reset({ isPeeking: true });

                            if (next.coords.top() <= scrollTop + (target.clientHeight - 56)) {
                                next.reset({
                                    isVisible: true
                                });
                            }

                            if (next.coords.top() <= scrollTop + target.clientHeight / 2) {
                                next.reset({
                                    isVisible: true,
                                    isActive: true
                                });
                            }

                            if (_this.State.views[index + 1]) {
                                _this.State.views.slice(index + 1).forEach(function (view) {
                                    return view.reset();
                                });
                            }
                            break;
                        }

                        if (next) {
                            if (next.coords.top() >= scrollTop) {
                                next.isVisible = false;
                                next.isPeeking = true;
                                next.isActive = false;
                                next.isScrolling = false;

                                if (next.coords.top() <= scrollTop + (target.clientHeight - 56)) {
                                    next.isPeeking = false;
                                    next.isVisible = true;
                                }

                                if (next.coords.top() <= scrollTop + target.clientHeight / 2) {

                                    next.isPeeking = false;
                                    next.isVisible = true;
                                    next.isActive = true;
                                    next.isScrolling = false;

                                    next = _this.State.views[index + 1];

                                    if (next) {
                                        next.isPeeking = true;
                                        next.isActive = false;
                                        next.isScrolling = false;
                                        next.isVisible = false;
                                        resetViewsAtIndex(index + 3);
                                        break;
                                    }
                                }

                                resetViewsAtIndex(index + 3);
                                break;
                            } else {
                                next.isPeeking = true;
                                next.isVisible = false;
                                next.isActive = false;
                                next.isScrolling = false;
                            }

                            resetViewsAtIndex(index + 2);
                            break;
                        }
                    } else if (bottom < scrollTop) {
                        view.reset({ isActive: true });
                    } else {
                        _this.State.views.slice(index).forEach(function (view) {
                            return view.reset();
                        });
                        view.reset();
                    }
                }
            };
        };

        return App;
    }()) || _class);
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
define('main',['exports', './environment'], function (exports, _environment) {
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

    var State = exports.State = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator), _dec(_class = (_class2 = function () {
        function State(eventAggregator) {
            var _this = this;

            _classCallCheck(this, State);

            _initDefineProp(this, 'view', _descriptor, this);

            this.views = [];
            this.activeViews = [];

            this.eventAggregator = eventAggregator;

            this.eventAggregator.subscribe('state:set:view', function (view) {
                _this.view = view;
            });

            this.eventAggregator.subscribe('state:scroll-to', function (payload) {
                if (typeof payload.top === 'number') {
                    _this.scrollElement.scrollTop = payload.top;
                }
            });
        }

        State.prototype.viewChanged = function viewChanged(view, lastView) {
            var _this2 = this;

            console.log(view);
            if (view) {
                (function () {
                    var position = view.position;
                    var leavePosition = void 0;
                    var enterPosition = void 0;
                    var leaveAnimation = void 0;
                    var enterAnimation = void 0;
                    var leaveClass = void 0;
                    var enterClass = void 0;

                    if (position === viewPosition.DOWN) {
                        leavePosition = viewPosition.UP;
                        enterPosition = viewPosition.ACTIVE;
                        leaveAnimation = 'animate-view-active-to-up';
                        enterAnimation = 'animate-view-down-to-active';
                        leaveClass = 'view-up';
                        enterClass = 'view-active';
                    } else if (position === viewPosition.UP) {
                        leavePosition = viewPosition.DOWN;
                        enterPosition = viewPosition.ACTIVE;
                        leaveAnimation = 'animate-view-active-to-down';
                        enterAnimation = 'animate-view-up-to-active';
                        leaveClass = 'view-down';
                        enterClass = 'view-active';
                    }

                    if (lastView) {
                        (function () {
                            var _listener = null;
                            var position = lastView.position;

                            lastView.element.addEventListener('animationend', _listener = function listener(event) {
                                lastView.isActive = false;
                                lastView.position = leavePosition;
                                lastView.element.removeEventListener('animationend', _listener);
                                lastView.element.classList.add(leaveClass);
                                lastView.element.classList.remove(leaveAnimation);
                            });
                            lastView.element.classList.remove('view-up', 'view-down', 'view-active');
                            lastView.element.classList.add(leaveAnimation);
                        })();
                    }

                    if (!_this2.isInitial) {
                        _this2.isInitial = true;
                        view.isActive = true;
                        view.position = enterPosition;
                    } else {
                        (function () {
                            var _listener2 = null;
                            view.element.addEventListener('animationend', _listener2 = function listener(event) {
                                view.element.removeEventListener('animationend', _listener2);
                                view.isActive = true;
                                view.position = enterPosition;
                                view.element.classList.add(enterClass);
                                view.element.classList.remove(enterAnimation);
                            });
                            view.element.classList.remove('view-up', 'view-down', 'view-active');
                            view.element.classList.add(enterAnimation);
                        })();
                    }
                })();
            }
        };

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

        this.blue = '#2196F3';
        this.blue200 = '#90CAF9';
        this.blue700 = '#1976d2';
        this.blue900 = '#0D47A1';
        this.cyan = '#00BCD4';
        this.cyan200 = '#80DEEA';
        this.cyan700 = '#0097A7';
        this.cyana200 = '#18FFFF';
        this.lime = '#CDDC39';
        this.lime200 = '#E6EE9C';
        this.lime700 = '#AFB42B';
        this.limeA400 = '#C6FF00';
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
            site: 'http://hackreactor.com',
            date: '2014',
            location: 'San Francisco, California',
            studied: 'JavaScript Engineering & Product Development',
            notes: ['Immersive JavaScript Engineering program', 'Studied Javascript Engineering, Product Development, Application Deployment, and Market Validation.']
        };
        this.swbts = {
            name: 'College at SouthWestern',
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

        this.Aurelia = {
            name: 'Aurelia',
            date: '2015-Today',
            occupation: 'Lead UX Engineer for Aurelia Interface',
            link: 'http://aurelia.io',
            notes: ['Developing not only a cross-browser, but also a cross-platform UX framework call aurelia-interface', 'Designed UX, Strictly following Google’s Material Design, Apple’s Humanize design, and Windows-guidelines.', 'Along with following standard design guidelines, I have created my own UI/UX Design standard.']
        };
        this.plusAmp = {
            name: 'PlusAMP',
            date: '2015',
            occupation: 'Lead UX Engineer',
            notes: ['Strategically crafted an open source platform similar to Github, for data-scientist to share Algorithms.', 'Through inspiring visual effects, designed a way for consumers to visually and creatively create Algorithms.', 'Though this was a remote position, our team collaborated at a frequent rate, executing prime scrum methodologies.', 'Design a full featured UX/UI patterns/Sketch file as a guide for implementation in css.']
        };
        this.secret = {
            name: 'Undisclosed',
            date: '2014-2015',
            occupation: 'Lead Javascript Engineer & Manager',
            notes: ['Optimized massive browser load time by 6 seconds.', 'Engineered a build system that saved over $30 million in 6 years from improving programmer time.', 'Developed and maintained a relational corporative team environment.']
        };
        this.hackreactor = {
            name: 'Hack Reactor',
            date: '2014-2015',
            occupation: 'Instructor',
            link: 'http://hackreactor.com',
            notes: ['Engaged in the development of current HR students by being an available educational resource.', 'Took advantage of time, diving into several technologies that extend the possibilities of programming.', 'Honored to be a Hacker in Residence under three month contract with HR.']
        };
        this.hourglass = {
            name: 'Hourglass Events',
            occupation: 'Senior Graphic Artist & Application Developer',
            date: '2013-Today',
            notes: ['Stimulated the FAAMA\'s Annual Conventions with extraordinary graphics.', 'Promoted convention Exhibitors thoughout each year, with continual email blasts, and mobile app ads.', 'Accelerated attendee envolvement with simple and intuative mobile application.', 'Engaged Exhibitors and FAAMA members with A-B Testing on event graphics and convention mobile app.', 'Assisted event managment team with graphics & mobile app.', 'Accompanied event team managment during each convention.']
        };
        this.his = {
            name: 'H-I-S Coatings',
            date: '2010-Today',
            occupation: 'Developer & Designer',
            notes: ['Custom-developed a real-time Customer Relations Platform with rich Enerprise Resource Planning integration for H-I-S Coatings company.', 'Implemented full featured OAuth system using Laravel and PHP backend with Angular and jQuery on front end.', 'Employed Google API’s for strategic delivery, routing and just-in-time order scheduling, and platform-wide notifications.', 'Integrated SQL database to communicate with SQL data store, structured by current Point-of-Sale system.', 'Engaged company employees with continual A-B testing to improve UX design.', 'Provided fequent application feedback sessions for overall application health.', 'TraCom is also used as the sole communications platform between Customer Relations and the Production Management team.']
        };
        this.graphics = {
            name: 'Graphic Artist',
            date: '2006-Today',
            occupation: 'Contract & Freelance',
            notes: ['UI Design, PhotoGraphics, Illustrations, Vector Art, Logo\'s, Business Cards . . . And much more.', 'Artwork created using Adobe Photoshop, Adobe Illustrator, and Adobe Fireworks.']
        };
        this.dfwprint = {
            name: 'DFW Print',
            date: '2011-2013',
            occupation: 'Senior Designer & Developer',
            notes: ['Improved customer sales and company reputation, by providing rich stationary designs.', 'Exposed Adobe\'s design software to the company, by teaching the team how to affectively use Photoshop, Illustrator & InDesign.', 'Discovered a true passion for engaging customer\'s, inorder to provide the design that would best fit their need.']
        };
        this.photographer = {
            name: 'Photographer',
            date: '2008-2013',
            occupation: 'Contract & Freelance',
            notes: ['Business Events, Conventions, Parties, Weddings, Portraits . . . etc', 'Final Proofs created with Adobe Photoshop']
        };
        this.hisService = {
            name: 'H-I-S Coatings',
            date: '2001-2010',
            occupation: 'Customer Service & Many other Hats',
            notes: ['Established a firm understanding of customer relations, by working closely with serveral hundred customers.', 'Provided support between Customer Relations, the Delivery Team, and the Small Batch Production team.', 'Took the initiative to reorganize in house stocking system.', 'Explored several positions, wearing several hats, as my father requested.']
        };

        this.list = [this.Aurelia, this.plusAmp, this.secret, this.hackreactor, this.hourglass, this.his, this.graphics, this.dfwprint, this.photographer, this.hisService];
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

        this.Aurelia = {
            name: 'Aurelia Interface',
            date: '2015-Today',
            occupation: 'Lead UX Engineer',
            link: 'http://blog.durandal.io/2015/11/20/aurelia-beta-week-day-5-aurelia-interface/',
            image: '/scripts/logos/aurelia-logo.png',
            notes: ['Developing not only a cross-browser, but also a cross-platform UX framework call aurelia-interface', 'Integrated multiple industry-level design guidelines per-platform', 'Developed UI/UX infrastructure for Web All Browsers, All IOS Devices, All Android Devices, and All Windows Devices.', 'Worked with the aurelia-framework team, creating solutions for complex UX scenarios.']
        };
        this.uimaterialize = {
            name: 'UI-Materialize | depricated',
            date: '2014',
            occupation: 'Project Founder',
            link: 'http://ui-materialize.com',
            notes: ['Designed UX/UI Library using Googl\'s Material Design guidelines', 'Leveraging Angular JS to create custom cross-browser Directives', 'Using Photoshop and Illustrator, developed Mockups of components before implementation', 'Project depricated due to Angular no longer supporting AngularJS version 1']
        };
        this.slushy = {
            name: 'Slush-y',
            date: '2014',
            occupation: 'Project Founder',
            link: 'http://www.npmjs.com/package/slush-y',
            image: '/scripts/logos/slushy-logo.png',
            notes: ['Developed a strategy to provide a good resource for best coding practices.', 'Integrated a gulp & a Yeoman-Generator into a system called slushy, allowing the full functionality of either technology.', 'Generates a full working application template with OAuth system, and user stories.', 'Using Angular, Gulp, Socket.io, NodeJS, ExpressJS, along with Google Material.']
        };
        this.platfeful = {
            name: 'PlateFul | depricated',
            date: '2014-2015',
            occupation: 'Co-Founder Lead UX Engineer',
            link: 'https://github.com/Plateful',
            image: '/scripts/logos/plateful-logo.png',
            notes: ['Identified competitive opportunity to exploit shortcomings in incumbent restaurant item recommendation services.', 'Developed from the ground up: photo-centric iOS & Android app to compete against Yelp among foodies.', 'Instituted a continuously integrated test and behavior driven development strategy and workflow.', 'Oversaw transition of the team to agile development, adhering to best-practice scrum methodologies.', 'Deployed RESTful API server and Neo4j graph-oriented database on scalable coordinating virtual machines.']
        };
        this.tracom = {
            name: 'TraCom | Private',
            date: '2010-Today',
            occupation: 'Developer & Designer',
            image: '/scripts/logos/tracom-logo.png',
            notes: ['Custom-developed a real-time Customer Relations Platform with rich Enerprise Resource Planning integration for H-I-S Coatings company.', 'Implemented full featured OAuth system using Laravel and PHP backend with Angular and jQuery on front end.', 'Employed Google API’s for strategic delivery, routing and just-in-time order scheduling, and platform-wide notifications.', 'Integrated SQL database to communicate with SQL data store, structured by current Point-of-Sale system.', 'Engaged company employees with continual A-B testing to improve UX design.', 'Provided fequent application feedback sessions for overall application health.', 'TraCom is also used as the sole communications platform between Customer Relations and the Production Management team.']
        };

        this.list = [this.Aurelia, this.uimaterialize, this.slushy, this.platfeful, this.tracom];
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

            this.languages = ['es6', 'javascript', 'html5', 'css3', 'apps-script', 'php'];
            this.preprocessors = ['jade', 'coffeescript', 'sass', 'less', 'stylus', 'postcss'];
            this.frameworks = ['aurelia', 'angular2.0', 'angular', 'react', 'polymer', 'ionic', 'backbone', 'laravel'];
            this.tools = ['jspm', 'gulp', 'grunt', 'slush', 'yeoman'];
            this.data = ['redis', 'neo4j', 'mongo', 'sql'];
            this.design = ['ai', 'ps', 'sketch'];

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
            }];

            this.list = list.map(function (listset) {
                listset.list = listset.list.map(function (item) {
                    return {
                        img: '/scripts/logos/' + item + '-logo.png',
                        name: item,
                        title: item[0].toUpperCase() + item.slice(1)
                    };
                });
                return listset;
            });
        };

        return TechnologyEnums;
    }();
});
define('core/view',["exports"], function (exports) {
    "use strict";

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
            key: "sectionHeight",
            get: function get() {
                var defaultHeight = window.innerHeight - 200;
                if (this.navSection) {
                    return this.navSection.element.clientHeight || defaultHeight;
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
            this.isPeeking = false;
            this.isScrolling = false;
            this.viewModel = null;
            this.navSection = null;
            this.bgElement = null;

            Object.assign(this, props);

            this.coords = {};

            this.coords.top = function () {
                return _this.element.offsetTop;
            };

            this.coords.bottom = function () {
                return _this.element.offsetTop + _this.element.clientHeight;
            };
        }

        View.prototype.reset = function reset(properties) {
            Object.assign(this, {
                isVisible: false,
                isScrolling: false,
                isPeeking: false,
                isActive: false
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

        return View;
    }();
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('modules/index',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.configure = configure;
    function configure(config) {
        config.globalResources('./nav-section/nav-section', './nav-bar/nav-bar', './navigation/navigation', './icon/icon');
    }
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
define('modules/footer/footer',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Footer = exports.Footer = function Footer() {
        _classCallCheck(this, Footer);
    };
});
define('modules/header/header',['exports', 'aurelia-framework', 'core/core'], function (exports, _aureliaFramework, _core) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Header = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Header = exports.Header = function () {
        function Header(State) {
            _classCallCheck(this, Header);

            this.State = State;
        }

        Header.prototype.activate = function activate() {};

        Header.prototype.setActiveTab = function setActiveTab(tab) {
            this.State.view = tab;
        };

        return Header;
    }();
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
define('modules/nav-bar/nav-bar',['exports', 'aurelia-framework', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _aureliaEventAggregator) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.NavBar = undefined;

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

    var NavBar = exports.NavBar = (_dec = (0, _aureliaFramework.customElement)('nav-bar'), _dec2 = (0, _aureliaFramework.inject)(Element, _aureliaEventAggregator.EventAggregator), _dec(_class = _dec2(_class = (_class2 = function () {
        function NavBar(element, eventAggregator) {
            _classCallCheck(this, NavBar);

            _initDefineProp(this, 'state', _descriptor, this);

            this.navigation = [];

            this.element = element;
            this.eventAggregator = eventAggregator;
            this.sections = [];
        }

        NavBar.prototype.bind = function bind() {
            var _this = this;

            this.subscription = this.eventAggregator.subscribe('nav-section:attached', function (payload) {
                if (!_this.isNavSectition(payload)) {
                    return;
                }

                if (_this.checkIfNavExists(payload)) {
                    return;
                }

                _this.navigation.push(payload);
                console.log(_this.navigation);
            });
        };

        NavBar.prototype.unbind = function unbind() {
            this.navigation = [];
            if (this.subscription) {
                this.subscription.dispose();
            }
        };

        NavBar.prototype.attached = function attached() {
            var _this2 = this;

            return;
            window.onscroll = function (event) {
                window.requestAnimationFrame(function () {
                    _this2.handleScrollEvent(event);
                });
            };
        };

        NavBar.prototype.isNavSectition = function isNavSectition(payload) {
            if (payload.hasOwnProperty('element') && payload.element instanceof Element) {
                return true;
            }
            return false;
        };

        NavBar.prototype.checkIfNavExists = function checkIfNavExists(nav) {
            var index = this.navigation.indexOf(nav);
            if (~index) {
                return true;
            }
            return false;
        };

        NavBar.prototype.handleScrollEvent = function handleScrollEvent(event) {
            var scrollElement = document.body;
            var current = void 0;
            var next = void 0;
            var index = 0;
            while (current = this.navigation[index++]) {
                next = this.navigation[index];

                if (next && scrollElement.scrollTop > current.element.offsetTop && scrollElement.scrollTop < next.element.offsetTop) {
                    break;
                }
                if (current.element.offsetTop < scrollElement.scrollTop && next.element.offsetTop > scrollElement.scrollTop) {
                    break;
                }
            }
        };

        return NavBar;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'state', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: function initializer() {
            return null;
        }
    })), _class2)) || _class) || _class);
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
        function NavSection(element, eventAggregator) {
            _classCallCheck(this, NavSection);

            _initDefineProp(this, 'view', _descriptor, this);

            this.header = null;
            this.isActive = false;

            this.element = element;
            this.eventAggregator = eventAggregator;
        }

        NavSection.prototype.attached = function attached() {
            if (this.element.classList.contains('first')) {
                this.positionClass = 'first';
            }
            if (this.element.classList.contains('last')) {
                this.positionClass = 'last';
            }

            this.element.parentElement.parentElement.appendChild(this.fixedheader);

            if (this.view.bgElement) {
                this.view.bgElement.style.height = this.element.clientHeight + 'px';
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
            if (this.view.isPeeking) {
                this.eventAggregator.publish('state:scroll-to', {
                    top: this.element.offsetTop
                });
            } else if (this.view.isScrolling) {
                this.eventAggregator.publish('state:scroll-to', {
                    top: this.element.previousElementSibling.offsetTop
                });
            }
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
            _classCallCheck(this, Navigation);

            _initDefineProp(this, 'visibility', _descriptor, this);

            this.element = Element;
            this.eventAggregator = EventAggregator;
            this.State = State;
        }

        Navigation.prototype.bind = function bind() {
            var _this = this;

            this.eventAggregator.subscribe('state:navigation:toggle', function () {
                _this.visibility = !_this.visibility;
            });
            this.views = this.State.views.filter(function (view) {
                return view.hasOwnProperty('title');
            });
        };

        Navigation.prototype.visibilityChanged = function visibilityChanged(value) {
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
            var _listener = void 0;
            var element = this.State.container;

            element.addEventListener('animationend', _listener = function listener(event) {
                element.classList.add('offset-main-right');
                element.classList.remove('animate-main-right');
                element.removeEventListener('animationend', _listener);
            }, true);

            element.classList.add('animate-main-right');
        };

        Navigation.prototype.hideNavigation = function hideNavigation() {
            var _listener2 = void 0;
            var element = this.State.container;

            element.addEventListener('animationend', _listener2 = function listener(event) {
                element.classList.remove('offset-main-right');
                element.classList.remove('animate-main-default');
                element.removeEventListener('animationend', _listener2);
            }, true);

            element.classList.add('animate-main-default');
        };

        return Navigation;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'visibility', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: function initializer() {
            return false;
        }
    })), _class2)) || _class) || _class);
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
define('modules/title/title',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Title = exports.Title = function Title(props) {
        _classCallCheck(this, Title);

        this.title = props.title;
        this.summary = props.summary;
    };
});
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=./app.css></require><div class=app-background></div><container ref=State.container class=active-view-${State.view.name}><navigation></navigation><main ref=State.scrollElement><template repeat.for=\"view of State.views\"><nav-section class=\"${$first ? 'first' : $last ? 'last' : ''} app-${view.name}\" ref=view.element view.bind=view></nav-section></template></main><footer ref=State.footer.element><compose view-model.bind=State.footer></compose></footer></container></template>"; });
define('text!app.css', ['module'], function(module) { module.exports = "nav-bar {\n  position: fixed;\n  top: 50%;\n  right: 10%;\n  transform: translateY(-50%); }\n  nav-bar > button {\n    outline: none;\n    background: white;\n    border-radius: 2px;\n    border: none;\n    box-shadow: 0 3px 4px rgba(0, 0, 0, 0.2);\n    height: 36px;\n    width: 120px; }\n  nav-bar > ul.slider {\n    width: 100%;\n    position: absolute;\n    height: auto;\n    top: 0;\n    left: 0;\n    background: red;\n    margin: 0;\n    padding: 0;\n    list-style: none; }\n    nav-bar > ul.slider > li {\n      height: 36px; }\n\nnav-section {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  min-height: 100%;\n  position: relative; }\n  nav-section .row {\n    flex: 1 0 auto;\n    display: flex;\n    align-items: flex-start;\n    justify-content: flex-start;\n    flex-direction: row; }\n  nav-section .section-container {\n    flex: 1;\n    height: auto;\n    display: flex;\n    position: relative;\n    flex-direction: column;\n    align-items: flex-start;\n    justify-content: flex-start;\n    padding-top: 200px;\n    box-shadow: -3px 0 3px rgba(0, 0, 0, 0.3);\n    background-color: inherit;\n    z-index: 4; }\n  nav-section article {\n    width: 100%; }\n\n.nav-section-header {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  min-height: 56px;\n  display: flex;\n  flex-direction: row;\n  z-index: 5; }\n  .nav-section-header icon {\n    user-select: none;\n    height: 56px;\n    width: 56px;\n    line-height: 56px;\n    text-align: center;\n    cursor: pointer; }\n    .nav-section-header icon:hover {\n      opacity: 0.5; }\n  .nav-section-header icon.menu-icon {\n    display: none; }\n  .nav-section-header .header-title {\n    pointer-events: none;\n    padding: 0 56px;\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    text-align: left;\n    display: block;\n    font-size: 24px;\n    line-height: 56px;\n    font-weight: bold; }\n  .nav-section-header.fixed {\n    opacity: 0;\n    visibility: hidden; }\n  .nav-section-header.first {\n    opacity: 0;\n    visibility: hidden; }\n  .nav-section-header.visible:not(.scrolling) icon {\n    display: none; }\n  .nav-section-header.visible:not(.scrolling) .header-title {\n    text-align: center;\n    font-size: 56px;\n    transform: translate3d(0, 165%, 0); }\n  .nav-section-header.visible:not(.scrolling).fixed {\n    opacity: 0;\n    visibility: hidden; }\n  .nav-section-header.peeking {\n    box-shadow: 0 -3px 4px -1px rgba(0, 0, 0, 0.2); }\n    .nav-section-header.peeking icon {\n      margin-left: auto;\n      transform: rotate(180deg); }\n    .nav-section-header.peeking .header-title {\n      text-align: right; }\n    .nav-section-header.peeking.fixed {\n      opacity: 1;\n      visibility: visible;\n      top: unset;\n      bottom: 0; }\n  .nav-section-header.active .header-title {\n    text-align: center;\n    font-size: 56px;\n    transform: translate3d(0, 165%, 0); }\n  .nav-section-header.active.scrolling {\n    box-shadow: 0 3px 4px -1px rgba(0, 0, 0, 0.2); }\n    .nav-section-header.active.scrolling icon.direction-icon {\n      margin-left: auto; }\n    .nav-section-header.active.scrolling icon.menu-icon {\n      display: block; }\n    .nav-section-header.active.scrolling.fixed {\n      opacity: 1;\n      visibility: visible; }\n      .nav-section-header.active.scrolling.fixed .header-title {\n        text-align: left;\n        font-size: 24px;\n        transform: translate3d(0, 0, 0); }\n\napp-section.view-active {\n  transform: translate3d(0, 0, 0); }\n\napp-section.view-down {\n  transform: translate3d(0, 100%, 0); }\n\napp-section.view-up {\n  transform: translate3d(0, -100%, 0); }\n\napp-section.animate-view-down-to-active {\n  animation-name: animate-view-down-to-active; }\n  app-section.animate-view-down-to-active header span.header-title {\n    animation-name: animate-header-down-to-active; }\n\napp-section.animate-view-active-to-up {\n  animation-name: animate-view-active-to-up; }\n\napp-section.animate-view-up-to-active {\n  animation-name: animate-view-up-to-active; }\n\napp-section.animate-view-active-to-down {\n  animation-name: animate-view-active-to-down; }\n\n@keyframes animate-view-down-to-active {\n  from {\n    transform: translate3d(0, 100%, 0); }\n  to {\n    transform: translate3d(0, 0, 0); } }\n\n@keyframes animate-view-active-to-up {\n  from {\n    transform: translate3d(0, 0, 0); }\n  to {\n    transform: translate3d(0, -100%, 0); } }\n\n@keyframes animate-view-up-to-active {\n  from {\n    transform: translate3d(0, -100%, 0); }\n  to {\n    transform: translate3d(0, 0, 0); } }\n\n@keyframes animate-view-active-to-down {\n  from {\n    transform: translate3d(0, 0, 0); }\n  to {\n    transform: translate3d(0, 100%, 0); } }\n\n@keyframes animate-header-down-to-active {\n  from {\n    right: 0;\n    text-align: right;\n    transform: translate3d(0, 0, 0); }\n  to {\n    right: unset;\n    text-align: center;\n    transform: translate3d(0, 100%, 0); } }\n\nnavigation {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  min-height: 100%;\n  width: 200px;\n  z-index: 1;\n  pointer-events: none;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  justify-content: flex-start; }\n  navigation > header {\n    display: block;\n    width: 100%;\n    background-color: rgba(255, 255, 255, 0.6);\n    height: 56px;\n    box-shadow: 0 3px 4px rgba(0, 0, 0, 0.2); }\n  navigation > section {\n    flex: 1;\n    display: block;\n    width: 100%;\n    background-color: rgba(255, 255, 255, 0.6); }\n  navigation > footer {\n    background-color: rgba(255, 255, 255, 0.6);\n    display: block;\n    width: 100%;\n    height: 56px;\n    box-shadow: 0 -3px 4px rgba(0, 0, 0, 0.2); }\n  navigation ul.navigation-list {\n    margin: 0;\n    padding: 0;\n    list-style: none;\n    display: flex;\n    flex-direction: column;\n    align-items: flex-start;\n    justify-content: flex-start; }\n    navigation ul.navigation-list li {\n      width: 100%;\n      pointer-events: auto;\n      display: flex;\n      flex-direction: row;\n      align-items: flex-start;\n      justify-content: flex-start;\n      min-height: 48px;\n      cursor: pointer; }\n      navigation ul.navigation-list li icon {\n        pointer-events: none;\n        margin: 12px; }\n      navigation ul.navigation-list li span.text {\n        pointer-events: none;\n        flex: 0 1 auto;\n        font-size: 16px;\n        font-weight: 500;\n        line-height: 48px;\n        letter-spacing: 1.34px;\n        user-select: none; }\n\n.active-view-title navigation ul.navigation-list li:hover {\n  background-color: rgba(255, 255, 255, 0.6); }\n\n.active-view-title navigation ul.navigation-list li.active {\n  background-color: white;\n  color: rgba(0, 0, 0, 0.87); }\n\n.active-view-profile navigation ul.navigation-list li:hover {\n  background-color: rgba(244, 67, 54, 0.6); }\n\n.active-view-profile navigation ul.navigation-list li.active {\n  background-color: #F44336;\n  color: white; }\n\n.active-view-projects navigation ul.navigation-list li:hover {\n  background-color: rgba(33, 150, 243, 0.6); }\n\n.active-view-projects navigation ul.navigation-list li.active {\n  background-color: #2196F3;\n  color: rgba(0, 0, 0, 0.87); }\n\n.active-view-experience navigation ul.navigation-list li:hover {\n  background-color: rgba(76, 175, 80, 0.6); }\n\n.active-view-experience navigation ul.navigation-list li.active {\n  background-color: #4CAF50;\n  color: rgba(0, 0, 0, 0.87); }\n\n.active-view-education navigation ul.navigation-list li:hover {\n  background-color: rgba(255, 193, 7, 0.6); }\n\n.active-view-education navigation ul.navigation-list li.active {\n  background-color: #ffC107;\n  color: rgba(0, 0, 0, 0.87); }\n\n.active-view-technology navigation ul.navigation-list li:hover {\n  background-color: rgba(158, 158, 158, 0.6); }\n\n.active-view-technology navigation ul.navigation-list li.active {\n  background-color: #9E9E9E;\n  color: rgba(0, 0, 0, 0.87); }\n\ncontainer > header.nav-section-header,\ncontainer .section-container {\n  animation-timing-function: ease;\n  animation-duration: 0.3s;\n  animation-fill-mode: forwards; }\n\ncontainer.offset-main-right > header.nav-section-header {\n  transform: translate3d(200px, 0, 0); }\n\ncontainer.offset-main-right .section-container {\n  transform: translate3d(200px, 0, 0); }\n\ncontainer.animate-main-right > header.nav-section-header {\n  animation-name: animate-main-right;\n  border-top-left-radius: 0; }\n\ncontainer.animate-main-right .section-container {\n  animation-name: animate-main-right; }\n\ncontainer.animate-main-default > header.nav-section-header {\n  animation-name: animate-main-default;\n  border-top-left-radius: 0; }\n\ncontainer.animate-main-default .section-container {\n  animation-name: animate-main-default; }\n\n@keyframes animate-main-right {\n  from {\n    transform: translate3d(0, 0, 0); }\n  to {\n    transform: translate3d(200px, 0, 0); } }\n\n@keyframes animate-main-default {\n  from {\n    transform: translate3d(200px, 0, 0); }\n  to {\n    transform: translate3d(0, 0, 0); } }\n\n*::-webkit-scrollbar {\n  display: none; }\n\nhtml {\n  width: 100vw;\n  height: 100vh;\n  color: #323232;\n  font-family: sans-serif; }\n\nbody {\n  padding: 0;\n  margin: 0;\n  position: relative;\n  width: 100%;\n  height: 100%;\n  max-width: 100%;\n  overflow: hidden; }\n\nbutton {\n  background: transparent;\n  border: none;\n  outline: none;\n  -webkit-webkit-appearance: none;\n  -moz-webkit-appearance: none;\n  -ms-webkit-appearance: none;\n  -o-webkit-appearance: none;\n  webkit-appearance: none; }\n\n.app-background {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 0;\n  background-image: url(http://brodeurcampbellfence.com/wp-content/uploads/2013/03/gradient-background-more-white.jpg);\n  background-repeat: no-repeat;\n  background-size: cover; }\n\n.app-section {\n  height: 100%;\n  width: 100%;\n  position: relative; }\n\nnav-section {\n  height: auto;\n  min-height: 100%;\n  flex: 1 0 auto;\n  min-width: 100%; }\n\ncontainer {\n  display: block;\n  background: white;\n  box-shadow: 2px 3px 4px rgba(0, 0, 0, 0.1), -2px 0px 4px rgba(0, 0, 0, 0.1), 0 10px 20px -5px rgba(0, 0, 0, 0.2);\n  z-index: 2;\n  position: relative;\n  height: 100%;\n  overflow: hidden; }\n\ncontainer > header {\n  position: absolute;\n  top: 0;\n  margin: 0 auto;\n  left: 0;\n  right: 0;\n  height: 56px;\n  background-color: transparent;\n  z-index: 2; }\n  container > header button {\n    height: 50px;\n    color: white;\n    margin: 0 5px;\n    line-height: 36px;\n    padding: 0 16px;\n    cursor: pointer;\n    vertical-align: top;\n    cursor: pointer; }\n    container > header button icon {\n      margin: 6px; }\n    container > header button:hover {\n      background-color: rgba(255, 255, 255, 0.1); }\n\ncontainer > main {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  height: 100%;\n  width: 100%;\n  max-height: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  overflow-x: hidden;\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch;\n  /* lets it scroll lazy */ }\n  container > main .nav-section-container {\n    display: flex;\n    flex-direction: column;\n    align-items: flex-start;\n    justify-content: flex-start;\n    z-index: 4;\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    min-height: 100%;\n    min-width: 100%; }\n  container > main .nav-background-container {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    min-height: 100%;\n    min-width: 100%;\n    z-index: 1; }\n\n.profile-background {\n  background-color: #F44336; }\n\n.technology-background {\n  background-color: #9E9E9E; }\n\n.projects-background {\n  background-color: #2196F3; }\n\n.experience-background {\n  background-color: #4CAF50; }\n\n.education-background {\n  background-color: #ffC107; }\n\n.app-title {\n  background-color: white; }\n  .app-title-header {\n    background-color: white; }\n\n.app-profile {\n  background-color: #F44336; }\n  .app-profile .profile-image {\n    flex: 1;\n    margin-right: 24px;\n    margin-left: 24px;\n    text-align: right; }\n  .app-profile .profile-info {\n    flex: 3;\n    margin-right: 24px; }\n    .app-profile .profile-info ul {\n      margin: 0;\n      padding: 0;\n      list-style: none; }\n      .app-profile .profile-info ul li {\n        margin-bottom: 12px;\n        border-bottom: 1px solid rgba(0, 0, 0, 0.87);\n        padding-bottom: 5px; }\n        .app-profile .profile-info ul li label {\n          font-size: 12px;\n          font-weight: normal;\n          color: rgba(0, 0, 0, 0.87);\n          margin-bottom: 5px; }\n        .app-profile .profile-info ul li p {\n          margin: 0;\n          color: white;\n          font-size: 18px;\n          font-weight: normal;\n          line-height: 1.3; }\n  .app-profile-header {\n    background-color: #F44336; }\n    .app-profile-header icon {\n      color: white; }\n    .app-profile-header .header-title {\n      color: white; }\n  .app-profile .header-title {\n    color: white; }\n\n.app-technology {\n  background-color: #9E9E9E; }\n  .app-technology h1 {\n    font-size: 32px;\n    padding-left: 24px; }\n  .app-technology ul {\n    list-style: none;\n    margin: 0 12px;\n    padding: 0;\n    display: flex;\n    flex-wrap: wrap;\n    flex-direction: row;\n    align-items: flex-start;\n    justify-content: flex-start;\n    max-width: 100%; }\n    .app-technology ul li {\n      display: inline-block;\n      margin: 12px;\n      max-width: 100px;\n      min-width: 100px;\n      max-height: 136px;\n      min-height: 136px;\n      background-color: white;\n      box-shadow: 0 3px 4px -3px rgba(0, 0, 0, 0.2), 0 3px 4px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.1); }\n      .app-technology ul li img {\n        display: block;\n        width: inherit;\n        max-width: inherit; }\n      .app-technology ul li span {\n        display: block;\n        text-align: center;\n        font-size: 18px;\n        font-weight: bold;\n        line-height: 24px; }\n  .app-technology-header {\n    background-color: #9E9E9E; }\n\n.app-projects {\n  background-color: #2196F3; }\n  .app-projects article {\n    margin-bottom: 24px; }\n  .app-projects .project-image {\n    margin-left: 24px;\n    width: 100px;\n    height: 100px;\n    position: relative;\n    flex: 0 0 auto;\n    height: 108px;\n    width: 108px;\n    background-color: white;\n    box-shadow: 0 4px 4px -3px rgba(0, 0, 0, 0.1), 0 3px 4px rgba(0, 0, 0, 0.2); }\n    .app-projects .project-image img {\n      display: block;\n      max-height: 80px;\n      max-width: 80px;\n      margin: 10px auto; }\n  .app-projects .project-heading {\n    display: flex;\n    flex-direction: row;\n    align-items: flex-start;\n    justify-content: flex-start;\n    border-top: 1px solid rgba(0, 0, 0, 0.12);\n    margin-bottom: 12px;\n    padding-top: 12px;\n    align-items: flex-end; }\n  .app-projects .project-title {\n    flex: 1;\n    font-weight: normal;\n    font-size: 36px;\n    color: rgba(0, 0, 0, 0.54);\n    padding-left: 24px;\n    padding-right: 12px; }\n  .app-projects .project-date {\n    margin-left: auto;\n    text-align: right;\n    font-size: 14px;\n    padding-right: 12px;\n    letter-spacing: 1.34px;\n    font-weight: bold;\n    color: rgba(0, 0, 0, 0.54);\n    padding-right: 24px;\n    padding-left: 12px; }\n  .app-projects ul.project-details {\n    list-style: none;\n    margin: 0;\n    padding: 0; }\n    .app-projects ul.project-details li {\n      min-height: 36px;\n      display: flex;\n      flex-direction: row;\n      align-items: flex-start;\n      justify-content: flex-start;\n      padding-left: 24px;\n      padding-right: 24px; }\n    .app-projects ul.project-details icon {\n      color: rgba(0, 0, 0, 0.54);\n      flex: 0 0 auto;\n      margin: 6px;\n      font-size: 16px; }\n    .app-projects ul.project-details span.text {\n      flex: 0 1 auto;\n      padding-top: 4px;\n      line-height: 1.34;\n      font-size: 16px;\n      font-weight: normal;\n      color: rgba(0, 0, 0, 0.87); }\n  .app-projects-header {\n    background-color: #2196F3; }\n\n.app-experience {\n  background-color: #4CAF50; }\n  .app-experience article {\n    margin-bottom: 24px; }\n  .app-experience .xp-heading {\n    display: flex;\n    flex-direction: row;\n    align-items: flex-start;\n    justify-content: flex-start;\n    border-top: 1px solid rgba(0, 0, 0, 0.12);\n    margin-bottom: 12px;\n    padding-top: 12px; }\n  .app-experience .xp-title {\n    flex: 1;\n    font-weight: normal;\n    font-size: 36px;\n    color: rgba(0, 0, 0, 0.54);\n    padding-left: 24px;\n    padding-right: 12px; }\n  .app-experience .xp-date {\n    margin-left: auto;\n    text-align: right;\n    font-size: 14px;\n    padding-right: 12px;\n    letter-spacing: 1.34px;\n    font-weight: bold;\n    color: rgba(0, 0, 0, 0.54);\n    padding-right: 24px;\n    padding-left: 12px; }\n  .app-experience ul.xp-details {\n    list-style: none;\n    margin: 0;\n    padding: 0; }\n    .app-experience ul.xp-details li {\n      min-height: 36px;\n      display: flex;\n      flex-direction: row;\n      align-items: flex-start;\n      justify-content: flex-start;\n      padding-left: 24px;\n      padding-right: 24px; }\n    .app-experience ul.xp-details icon {\n      color: rgba(0, 0, 0, 0.54);\n      flex: 0 0 auto;\n      margin: 6px;\n      font-size: 16px; }\n    .app-experience ul.xp-details span.text {\n      flex: 0 1 auto;\n      padding-top: 4px;\n      line-height: 1.34;\n      font-size: 16px;\n      font-weight: normal;\n      color: rgba(0, 0, 0, 0.87); }\n  .app-experience ul.xp-tech {\n    margin: 0;\n    padding: 0;\n    list-style: none; }\n    .app-experience ul.xp-tech li {\n      display: inline;\n      padding: 6px 12px;\n      font-size: 12px;\n      font-weight: normal;\n      color: #2196F3;\n      margin: 4px; }\n  .app-experience-header {\n    background-color: #4CAF50; }\n\n.app-education {\n  background-color: #ffC107; }\n  .app-education article {\n    margin-bottom: 24px; }\n  .app-education .edu-heading {\n    display: flex;\n    flex-direction: row;\n    align-items: flex-start;\n    justify-content: flex-start;\n    border-top: 1px solid rgba(0, 0, 0, 0.12);\n    margin-bottom: 12px;\n    padding-top: 12px; }\n  .app-education .edu-title {\n    flex: 1;\n    font-weight: normal;\n    font-size: 36px;\n    color: rgba(0, 0, 0, 0.54);\n    padding-left: 24px;\n    padding-right: 12px; }\n  .app-education .edu-date {\n    margin-left: auto;\n    text-align: right;\n    font-size: 14px;\n    padding-right: 12px;\n    letter-spacing: 1.34px;\n    font-weight: bold;\n    color: rgba(0, 0, 0, 0.54);\n    padding-right: 24px;\n    padding-left: 12px; }\n  .app-education ul.edu-details {\n    list-style: none;\n    margin: 0;\n    padding: 0; }\n    .app-education ul.edu-details li {\n      min-height: 36px;\n      display: flex;\n      flex-direction: row;\n      align-items: flex-start;\n      justify-content: flex-start;\n      padding-left: 24px;\n      padding-right: 24px; }\n    .app-education ul.edu-details icon {\n      color: rgba(0, 0, 0, 0.54);\n      flex: 0 0 auto;\n      margin: 6px;\n      font-size: 16px; }\n    .app-education ul.edu-details span.text {\n      flex: 0 1 auto;\n      padding-top: 4px;\n      line-height: 1.34;\n      font-size: 16px;\n      font-weight: normal;\n      color: rgba(0, 0, 0, 0.87); }\n  .app-education-header {\n    background-color: #ffC107; }\n\ncontainer {\n  border-radius: 0;\n  max-height: 100%;\n  margin: 0; }\n\n@media screen and (max-width: 1200px) {\n  .platform-ios container navigation {\n    opacity: 0;\n    visibility: hidden;\n    transition: opacity 0.3s ease 0s; }\n  .platform-ios container.offset-main-right navigation {\n    opacity: 1;\n    visibility: visible; }\n  .platform-ios container.animate-main-right navigation {\n    opacity: 1;\n    visibility: visible; }\n  .platform-ios container.animate-main-default navigation {\n    opacity: 0;\n    visibility: hidden; } }\n\n@media screen and (min-width: 1440px) {\n  container icon.menu-icon {\n    display: none !important; }\n  container nav-section .section-container {\n    margin-left: 200px; }\n  container > header.nav-section-header {\n    margin-left: 200px;\n    border-top-left-radius: 0; }\n    container > header.nav-section-header .header-title {\n      padding-left: 24px; } }\n"; });
define('text!modules/education/education.html', ['module'], function(module) { module.exports = "<template><template repeat.for=\"edu of props.educations\"><article><div class=edu-image if.bind=edu.image><img src.bind=edu.image alt.bind=edu.name></div><div class=edu-heading><div class=edu-title>${edu.name}</div><div class=edu-date>${edu.date}</div></div><ul class=edu-details><li repeat.for=\"note of edu.notes\"><icon ico=check_circle></icon><span class=text>${note}</span></li></ul></article></template></template>"; });
define('text!modules/experience/experience.html', ['module'], function(module) { module.exports = "<template><template repeat.for=\"xp of props.experiences\"><article><div class=xp-image if.bind=xp.image><img src.bind=xp.image alt.bind=xp.name></div><div class=xp-heading><div class=xp-title>${xp.name}</div><div class=xp-date>${xp.date}</div></div><ul class=xp-details><li repeat.for=\"note of xp.notes\"><icon ico=check_circle></icon><span class=text>${note}</span></li></ul><ul class=xp-tech><li repeat.for=\"tech of xp.tech\">${tech}</li></ul></article></template></template>"; });
define('text!modules/footer/footer.html', ['module'], function(module) { module.exports = "<template><nav></nav></template>"; });
define('text!modules/header/header.html', ['module'], function(module) { module.exports = "<template><nav><button><icon ico=home></icon></button><button click.delegate=\"setActiveTab('profile')\">Profile</button><button click.delegate=\"setActiveTab('projects')\">Projects</button><button click.delegate=\"setActiveTab('experience')\">Experience</button><button click.delegate=\"setActiveTab('educuation')\">Educuation</button></nav></template>"; });
define('text!modules/nav/nav.html', ['module'], function(module) { module.exports = "<template><ul><li repeat.for=\"items of leftNav\" click.delegate=\"navigateToItem($event, item)\"><a>${item.name}</a></li></ul><button click.delegate=buttonClicked($event)></button><ul><li repeat.for=\"items of rightNav\" click.delegate=\"navigateToItem($event, item)\"><a>${item.name}</a></li></ul></template>"; });
define('text!modules/nav-bar/nav-bar.html', ['module'], function(module) { module.exports = "<template><button class=static-button><span class=text>${currentTitle}</span></button><ul class=slider><li repeat.for=\"section of sections\"><span class=text>${section.heading}</span><span class=icon></span></li></ul></template>"; });
define('text!modules/nav-section/nav-section.html', ['module'], function(module) { module.exports = "<template class=\"${view.isActive ? 'active' : ''} ${view.isScrolling ? 'scrolling' : ''} ${view.isPeeking ? 'peeking' : ''} ${view.isVisible ? 'visible' : ''}\"><section class=section-container><header ref=header click.delegate=headerClicked($event) class=\"${positionClass} nav-section-header ${view.isActive ? 'active' : ''} ${view.isScrolling ? 'scrolling' : ''} ${view.isPeeking ? 'peeking' : ''} ${view.isVisible ? 'visible' : ''}\"><icon class=direction-icon ico=arrow_back></icon><span class=header-title>${view.title}</span></header><compose containerless view-model.bind=view.viewModel></compose><header ref=fixedheader class=\"${positionClass} nav-section-header fixed app-${view.name}-header ${view.isActive ? 'active' : ''} ${view.isScrolling ? 'scrolling' : ''} ${view.isPeeking ? 'peeking' : ''} ${view.isVisible ? 'visible' : ''}\"><icon class=menu-icon click.delegate=toggleNavigation($event) ico=menu></icon><icon if.bind=\"view.viewIndex > 0\" class=direction-icon click.delegate=navigateDirection($event) ico=arrow_back></icon><span if.bind=\"view.viewIndex > 0\" class=header-title>${view.title}</span></header></section></template>"; });
define('text!modules/navigation/navigation.html', ['module'], function(module) { module.exports = "<template><header></header><section><ul class=navigation-list><li repeat.for=\"view of views\" class=\"${view === State.view ? 'active' : ''}\" click.delegate=navigateToView(view)><icon ico.bind=view.icon></icon><span class=text>${view.title}</span></li></ul></section></template>"; });
define('text!modules/projects/projects.html', ['module'], function(module) { module.exports = "<template><template repeat.for=\"project of props.projects\"><article><div class=project-heading><div class=project-image if.bind=project.image><img src.bind=project.image alt.bind=project.name></div><div class=project-title>${project.name}</div><div class=project-date>${project.date}</div></div><ul class=project-details><li repeat.for=\"note of project.notes\"><icon ico=check_circle></icon><span class=text>${note}</span></li></ul><ul class=project-tech><li repeat.for=\"tech of project.tech\">${tech}</li></ul></article></template></template>"; });
define('text!modules/profile/profile.html', ['module'], function(module) { module.exports = "<template><style>@media screen and (max-width:1200px){.app-profile .row{flex-direction:column}.app-profile .row .profile-info{width:100%}.app-profile .row .profile-info ul{margin:24px}}</style><div class=row><div class=profile-image><img src=http://placehold.it/350x450 alt=\"\"></div><div class=profile-info><ul><li><label>Name</label><p>${props.name}</p></li><li><label>Birthday</label><p>${props.birthday}</p></li><li><label>Titles</label><p repeat.for=\"title of props.titles\">${title}</p></li><li><label>Locations</label><p repeat.for=\"loc of props.locations\">${loc}</p></li><li><label>Info</label><p>${props.info}</p></li></ul></div></div></template>"; });
define('text!modules/technology/technology.html', ['module'], function(module) { module.exports = "<template><template repeat.for=\"tech of props.technologies\"><article><h1>${tech.title}</h1><ul><li repeat.for=\"item of tech.list\"><img src.bind=item.img alt.bind=item.name><span class=text>${item.title}</span></li></ul></article></template></template>"; });
define('text!modules/title/title.html', ['module'], function(module) { module.exports = "<template><style>.app-title .title-image{height:450px;width:350px;display:block;float:left;margin:75px 75px 0 75px}.app-title .title-text h1{margin-top:75px;margin-bottom:75px;text-align:center;font-size:56px}.app-title .title-text{display:block;width:100%;text-align:center}</style><div class=title-text><h1>${title}</h1><h3>${summary}</h3></div></template>"; });
//# sourceMappingURL=app-bundle.js.map