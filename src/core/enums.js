import { inject } from 'aurelia-framework';
import { ProfileEnums } from './profile';
import { ProjectEnums } from './projects';
import { ExperienceEnums } from './experience';
import { EducationEnums } from './education';
import { TechnologyEnums } from './technology';
import {ConnectEnums} from './connect';

@inject(ProfileEnums, TechnologyEnums, ExperienceEnums, ProjectEnums, EducationEnums, ConnectEnums)
export class Enums {
    static Module = {
        Type: {
            Input: 1,
            Output: 2
        }
    };

    static profile = {

    };

    static projects = [{
            name: 'Aurelia Interface',
            from: '',
            to: '',
            description: '',
            points: [],
            tech: '',
        },
        {
            name: 'UI Materialize | depricated',
            from: '',
            to: '',
            description: '',
            points: [

            ],
            tech: ''
        },
        {
            name: 'Slush-y Generator',
            from: '',
            to: '',
            description: '',
            points: [

            ],
            tech: ''
        },
        {
            name: 'Iris',
            from: '',
            to: '',
            description: '',
            points: [

            ],
            tech: ''
        },
        {
            name: 'Plateful | depricated',
            from: '',
            to: '',
            description: '',
            points: [

            ],
            tech: ''
        },
        {
            name: 'TraCom | Private',
            from: '',
            to: '',
            description: '',
            points: [

            ],
            tech: ''
        }
    ];

    static experience = [{
            name: 'mParticle',
            year: '',
            position: '',
            points: [],
            tech: []
        },
        {
            name: 'Wolters Kluwer',
            year: '',
            position: '',
            points: [],
            tech: []
        },
        {
            name: 'Aurelia',
            year: '',
            position: '',
            points: [],
            tech: []
        },
        {
            name: 'Plus AMP',
            year: '',
            position: '',
            points: [],
            tech: []
        },
        {
            name: 'Undisclosed',
            year: '',
            position: '',
            points: [],
            tech: []
        },
        {
            name: 'Hack Reactor',
            year: '',
            position: '',
            points: [],
            tech: []
        },
        {
            name: 'Hourglass Events',
            year: '',
            position: '',
            points: [],
            tech: []
        },
        {
            name: 'H-I-S Coatings',
            year: '',
            position: '',
            points: [],
            tech: []
        },
    ];

    static education = [{
            name: 'Hack Reactor',
            location: '',
            points: [

            ]
        },
        {
            name: 'College at Southwestern',
            location: '',
            points: [

            ]
        },
        {
            name: 'University of Central Oklahoma',
            location: '',
            points: [

            ]
        }
    ];

    constructor(profile, technology, experience, projects, education, connect) {
        
        this.Profile = profile;
        this.Technology = technology;
        this.Experience = experience;
        this.Projects = projects;
        this.Education = education;
        this.Connect = connect;
    }
}