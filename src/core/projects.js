export class ProjectEnums {
    Aurelia = {
        name: 'Aurelia Interface',
        date: '2015-Today',
        occupation: 'Lead UX Engineer',
        link: 'http://blog.durandal.io/2015/11/20/aurelia-beta-week-day-5-aurelia-interface/',
        image: '/scripts/logos/aurelia-logo.png',
        notes: [
            'Developing not only a cross-browser, but also a cross-platform UX framework call aurelia-interface',
            'Integrated multiple industry-level design guidelines per-platform',
            'Developed UI/UX infrastructure for Web All Browsers, All IOS Devices, All Android Devices, and All Windows Devices.',
            'Worked with the aurelia-framework team, creating solutions for complex UX scenarios.'
        ]
    }

    uimaterialize = {
        name: 'UI-Materialize | depricated',
        date: '2014',
        occupation: 'Project Founder',
        link: 'http://ui-materialize.com',
        notes: [
            'Designed UX/UI Library using Googl\'s Material Design guidelines',
            'Leveraging Angular JS to create custom cross-browser Directives',
            'Using Photoshop and Illustrator, developed Mockups of components before implementation',
            'Project depricated due to Angular no longer supporting AngularJS version 1'
        ]
    }
    slushy = {
        name: 'Slush-y',
        date: '2014',
        occupation: 'Project Founder',
        link: 'http://www.npmjs.com/package/slush-y',
        image: '/scripts/logos/slushy-logo.png',
        notes: [
            'Developed a strategy to provide a good resource for best coding practices.',
            'Integrated a gulp & a Yeoman-Generator into a system called slushy, allowing the full functionality of either technology.',
            'Generates a full working application template with OAuth system, and user stories.',
            'Using Angular, Gulp, Socket.io, NodeJS, ExpressJS, along with Google Material.'
        ]
    }

    platfeful = {
        name: 'PlateFul | depricated',
        date: '2014-2015',
        occupation: 'Co-Founder Lead UX Engineer',
        link: 'https://github.com/Plateful',
        image: '/scripts/logos/plateful-logo.png',
        notes: [
            'Identified competitive opportunity to exploit shortcomings in incumbent restaurant item recommendation services.', 'Developed from the ground up: photo-centric iOS & Android app to compete against Yelp among foodies.', 'Instituted a continuously integrated test and behavior driven development strategy and workflow.', 'Oversaw transition of the team to agile development, adhering to best-practice scrum methodologies.', 'Deployed RESTful API server and Neo4j graph-oriented database on scalable coordinating virtual machines.'
        ]
    }

    tracom = {
        name: 'TraCom | Private',
        date: '2010-Today',
        occupation: 'Developer & Designer',
        image: '/scripts/logos/tracom-logo.png',
        notes: [
            'Custom-developed a real-time Customer Relations Platform with rich Enerprise Resource Planning integration for H-I-S Coatings company.', 'Implemented full featured OAuth system using Laravel and PHP backend with Angular and jQuery on front end.', 'Employed Google API’s for strategic delivery, routing and just-in-time order scheduling, and platform-wide notifications.', 'Integrated SQL database to communicate with SQL data store, structured by current Point-of-Sale system.', 'Engaged company employees with continual A-B testing to improve UX design.', 'Provided fequent application feedback sessions for overall application health.', 'TraCom is also used as the sole communications platform between Customer Relations and the Production Management team.'
        ]
    }

    constructor() {
        this.list = [this.Aurelia, this.uimaterialize, this.slushy, this.platfeful, this.tracom];
    }

}