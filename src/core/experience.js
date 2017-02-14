export class ExperienceEnums {
    Aurelia = {
        name: 'Aurelia',
        date: '2015-Today',
        occupation: 'Lead UX Engineer for Aurelia Interface',
        link: 'http://aurelia.io',
        notes: [
            'Developing not only a cross-browser, but also a cross-platform UX framework call aurelia-interface',
            'Designed UX, Strictly following Google’s Material Design, Apple’s Humanize design, and Windows-guidelines.',
            'Along with following standard design guidelines, I have created my own UI/UX Design standard.',
        ]
    }

    plusAmp = {
        name: 'PlusAMP',
        date: '2015',
        occupation: 'Lead UX Engineer',
        notes: [
            'Strategically crafted an open source platform similar to Github, for data-scientist to share Algorithms.',
            'Through inspiring visual effects, designed a way for consumers to visually and creatively create Algorithms.',
            'Though this was a remote position, our team collaborated at a frequent rate, executing prime scrum methodologies.',
            'Design a full featured UX/UI patterns/Sketch file as a guide for implementation in css.'
        ]
    }
    secret = {
        name: 'Undisclosed',
        date: '2014-2015',
        occupation: 'Lead Javascript Engineer & Manager',
        notes: [
            'Optimized massive browser load time by 6 seconds.',
            'Engineered a build system that saved over $30 million in 6 years from improving programmer time.',
            'Developed and maintained a relational corporative team environment.'
        ]
    }

    hackreactor = {
        name: 'Hack Reactor',
        date: '2014-2015',
        occupation: 'Instructor',
        link: 'http://hackreactor.com',
        notes: [
            'Engaged in the development of current HR students by being an available educational resource.', 'Took advantage of time, diving into several technologies that extend the possibilities of programming.', 'Honored to be a Hacker in Residence under three month contract with HR.'
        ]
    }

    hourglass = {
        name: 'Hourglass Events',
        occupation: 'Senior Graphic Artist & Application Developer',
        date: '2013-Today',
        notes: [
            'Stimulated the FAAMA\'s Annual Conventions with extraordinary graphics.', 'Promoted convention Exhibitors thoughout each year, with continual email blasts, and mobile app ads.', 'Accelerated attendee envolvement with simple and intuative mobile application.', 'Engaged Exhibitors and FAAMA members with A-B Testing on event graphics and convention mobile app.', 'Assisted event managment team with graphics & mobile app.', 'Accompanied event team managment during each convention.'
        ]
    }

    his = {
        name: 'H-I-S Coatings',
        date: '2010-Today',
        occupation: 'Developer & Designer',
        notes: [
            'Custom-developed a real-time Customer Relations Platform with rich Enerprise Resource Planning integration for H-I-S Coatings company.', 'Implemented full featured OAuth system using Laravel and PHP backend with Angular and jQuery on front end.', 'Employed Google API’s for strategic delivery, routing and just-in-time order scheduling, and platform-wide notifications.', 'Integrated SQL database to communicate with SQL data store, structured by current Point-of-Sale system.', 'Engaged company employees with continual A-B testing to improve UX design.', 'Provided fequent application feedback sessions for overall application health.', 'TraCom is also used as the sole communications platform between Customer Relations and the Production Management team.'
        ]
    }

    graphics = {
        name: 'Graphic Artist',
        date: '2006-Today',
        occupation: 'Contract & Freelance',
        notes: [
            'UI Design, PhotoGraphics, Illustrations, Vector Art, Logo\'s, Business Cards . . . And much more.', 'Artwork created using Adobe Photoshop, Adobe Illustrator, and Adobe Fireworks.'
        ]
    }


    dfwprint = {
        name: 'DFW Print',
        date: '2011-2013',
        occupation: 'Senior Designer & Developer',
        notes: [
            'Improved customer sales and company reputation, by providing rich stationary designs.', 'Exposed Adobe\'s design software to the company, by teaching the team how to affectively use Photoshop, Illustrator & InDesign.', 'Discovered a true passion for engaging customer\'s, inorder to provide the design that would best fit their need.'
        ]
    }

    photographer = {
        name: 'Photographer',
        date: '2008-2013',
        occupation: 'Contract & Freelance',
        notes: [
            'Business Events, Conventions, Parties, Weddings, Portraits . . . etc', 'Final Proofs created with Adobe Photoshop'
        ]
    }

    hisService = {
        name: 'H-I-S Coatings',
        date: '2001-2010',
        occupation: 'Customer Service & Many other Hats',
        notes: [
            'Established a firm understanding of customer relations, by working closely with serveral hundred customers.', 'Provided support between Customer Relations, the Delivery Team, and the Small Batch Production team.', 'Took the initiative to reorganize in house stocking system.', 'Explored several positions, wearing several hats, as my father requested.'
        ]
    }

    constructor() {
        this.list = [this.Aurelia, this.plusAmp, this.secret, this.hackreactor, this.hourglass, this.his, this.graphics, this.dfwprint, this.photographer, this.hisService];
    }

}