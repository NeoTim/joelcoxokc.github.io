export class ProjectEnums {

    DOMX = {
        name: 'DOMX',
        date: '2016-today',
        id: 'domx',
        link: 'http://github.com/joelcoxokc/domx',
        className: 'domx-logo',
        position: 'Project Owner | Architect | Engineer | Designer',
        order: new Date('12-1-2016'),
        custom: true,
        badges: [
            'Library',
            'open-src',
            'in-progress'
        ],
        notes: [
            'Developing cross-browser cross-platform Vanilla Javascript Web Component Library',
            'Built with everything I am current learning',
            'Built with my knowledge of the web over the past several years'
        ]
    }

    AureliaHub = {
        name: 'Aurelia Hub & Documentation',
        date: '2015-2016',
        id: 'aurelia-hub',
        link: 'http://aurelia.io/hub',
        image: 'aurelia-logo.png',
        position: 'Lead Architect | Engineer',
        order: new Date('12-1-2014'),
        badges: [
            'Application',
            'Documentation',
            'open-src'
        ],
        notes: [
            'Developed dynamic navigation conforming to Aurelia\'s generated documentation structure',
            'Implemented cross-browser and cross-platform support',
            'Pixel pushed my way to perfectly matching creative design comps',
            'Used components developed for the Aurelia Interface UX library',
        ]
    }    
    
    Aurelia = {
        name: 'Aurelia Interface',
        date: '2015-2016',
        id: 'aurelia-interface',
        occupation: 'Lead UX Engineer',
        link: 'http://blog.durandal.io/2015/11/20/aurelia-beta-week-day-5-aurelia-interface/',
        image: 'aurelia-logo.png',
        position: 'Lead Architect | Engineer | Designer',
        order: new Date('9-1-2014'),
        badges: [
            'Library',
            'Framework',
            'Deprecated',
            'open-src'
        ],
        notes: [
            'Developing not only a cross-browser, but also a cross-platform UX framework call aurelia-interface',
            'Integrated multiple industry-level design guidelines per-platform',
            'Developed UI/UX infrastructure for Web All Browsers, All IOS Devices, All Android Devices, and All Windows Devices.',
            'Worked with the aurelia-framework team, creating solutions for complex UX scenarios.'
        ]
    }

    uimaterialize = {
        name: 'UI-Materialize',
        date: '2014',
        id: 'ui-materialize',
        occupation: 'Project Founder',
        link: 'http://ui-materialize.com',
        className: 'ui-materialize-logo',
        custom: true,
        position: 'Project Owner | Architect | Engineer | Designer',
        order: new Date('6-1-2014'),
        badges: [
            'Library',
            'Deprecated',
            'open-src'
        ],
        notes: [
            'Designed UX/UI Library using Googl\'s Material Design guidelines',
            'Leveraging Angular JS to create custom cross-browser Directives',
            'Using Photoshop and Illustrator, developed Mockups of components before implementation',
            'Project deprecated due to Angular no longer supporting AngularJS version 1'
        ]
    }
    slushy = {
        name: 'Slush-y',
        date: '2014',
        id: 'slush-y',
        occupation: 'Project Founder',
        link: 'http://www.npmjs.com/package/slush-y',
        image: 'slushy-logo.png',
        position: 'Project Owner | Architect | Engineer | Designer',
        order: new Date('5-1-2014'),
        badges: [
            'Generator',
            'open-src'
        ],
        notes: [
            'Developed a strategy to provide a good resource for best coding practices.',
            'Integrated a gulp & a Yeoman-Generator into a system called slushy, allowing the full functionality of either technology.',
            'Generates a full working application template with OAuth system, and user stories.',
            'Using Angular, Gulp, Socket.io, NodeJS, ExpressJS, along with Google Material.'
        ]
    }
    platfeful = {
        name: 'PlateFul',
        date: '2014-2015',
        id: 'plateful',
        link: 'https://github.com/Plateful',
        image: 'plateful-logo.png',
        order: new Date('4-1-2014'),
        position: 'Co-Founder | Architect | Engineer | Designer',
        badges: [
            'private',
            'Application',
            'Deprecated'
        ],
        notes: [
            'Identified competitive opportunity to exploit shortcomings in incumbent restaurant item recommendation services.', 'Developed from the ground up: photo-centric iOS & Android app to compete against Yelp among foodies.', 'Instituted a continuously integrated test and behavior driven development strategy and workflow.', 'Oversaw transition of the team to agile development, adhering to best-practice scrum methodologies.', 'Deployed RESTful API server and Neo4j graph-oriented database on scalable coordinating virtual machines.'
        ]
    }

    tracom = {
        name: 'TraCom',
        date: '2010-Today',
        id: 'tracom',
        occupation: 'Developer & Designer',
        image: 'tracom-logo.png',
        order: new Date('1-1-2014'),
        position: 'Project Owner | Architect | Engineer | Designer',
        badges: [
            'Contract',
            'Application',
            'Private'
        ],
        notes: [
            'Custom-developed a real-time Customer Relations Platform with rich Enerprise Resource Planning integration for H-I-S Coatings company.', 'Implemented full featured OAuth system using Laravel and PHP backend with Angular and jQuery on front end.', 'Employed Google API’s for strategic delivery, routing and just-in-time order scheduling, and platform-wide notifications.', 'Integrated SQL database to communicate with SQL data store, structured by current Point-of-Sale system.', 'Engaged company employees with continual A-B testing to improve UX design.', 'Provided fequent application feedback sessions for overall application health.', 'TraCom is also used as the sole communications platform between Customer Relations and the Production Management team.'
        ]
    }

    constructor() {
        this.list = [this.DOMX, this.AureliaHub, this.Aurelia, this.uimaterialize, this.slushy, this.platfeful, this.tracom];
    }
}