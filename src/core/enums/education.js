export class EducationEnums {
    hackreactor = {
        name: 'Hack Reactor',
        id: 'hack-reactor',
        image: '/scripts/logos/hack-reactor-logo.png',
        site: 'http://hackreactor.com',
        date: '2014',
        location: 'San Francisco, California',
        studied: 'JavaScript Engineering & Product Development',
        notes: [
            'Immersive JavaScript Engineering program',
            'Studied Javascript Engineering, Product Development, Application Deployment, and Market Validation.'
        ]
    }

    swbts = {
        name: 'College at SouthWestern',
        id: 'southwestern',
        image: '/scripts/logos/southwestern-logo.png',
        site: 'http://college.swbts.edu/',
        location: 'Fort Worth, Texas',
        date: '2010-2013',
        studied: 'Hummanities & Liberal Arts',
        notes: [
            'Studied for Bachelor in History of Ideas',
            'Studied Humanities and ideas to structure and implement currently forming ideas.'
        ]
    }

    uco = {
        name: 'University of Central Oklahoma',
        site: 'http://www.uco.edu/',
        date: '2009-2010',
        location: 'Oklahoma City, Oklahoma',
        studied: 'Structural Engineering',
        notes: [
            'Studied Engineering, Photography, Graphic Arts',
            'Studied a variety of professions, trying to find what I am able to exceed in.'
        ]
    }
    constructor() {
        this.list = [this.hackreactor, this.swbts, this.uco];
    }
}