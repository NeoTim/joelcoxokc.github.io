
const TECH_MAP = {
    'visual-studio': {
        name: 'visual-studio',
        title: 'Visual Studio',
    },
    'vs-code': {
        name: 'vs-code',
        title: 'VS Code'
    },
    'postgresql': {
        name: 'postgresql',
        title: 'PostgreSQL'
    }
}

export class TechnologyEnums {
    languages     = ['es6', 'javascript', 'typescript', 'html5',  'css3', 'apps-script', 'php', 'cypher', 'bash'];
    preprocessors = ['flow', 'babel', 'jade', 'coffeescript', 'sass', 'less', 'stylus', 'postcss'];
    frameworks    = ['aurelia', 'angular2.0', 'angular', 'react', 'polymer', 'ionic', 'backbone', 'laravel', 'express'];
    tools         = ['node', 'jspm', 'gulp', 'webpack', 'aurelia-cli', 'grunt', 'slush', 'yeoman', 'visual-studio', 'vs-code', 'sublime'];
    data          = ['redis', 'neo4j', 'mongo', 'sql', 'postgresql'];
    design        = ['ai', 'ps', 'dw', 'id', 'sketch', 'zeplin'];
    rolanguages   = ['C#', '.Net', '.Net core', 'java', 'Python'];
    
    constructor() {
        this.process();
    }

    process() {
        let list = [
            {
                title: 'Languages', 
                name: 'languages', 
                list: this.languages
            },
            {
                title: 'Preprocessors', 
                name: 'preprocessors', 
                list: this.preprocessors
            },
            {
                title: 'Frameworks', 
                name: 'frameworks', 
                list: this.frameworks
            },
            {
                title: 'Tools', 
                name: 'tools', 
                list: this.tools
            },
            {
                title: 'Data', 
                name: 'data', 
                list: this.data
            },
            {
                title: 'Design', 
                name: 'design', 
                list: this.design
            },
            {
                title: 'Read Only Languages',
                subtitle: 'Languages I can read and am willing to learn to write',
                list: this.rolanguages
            }
        ]
        
        this.list = list.map(listset => {
            listset.list = listset.list.map(item => {
                let name;
                let title;
                let image;

                if (item in TECH_MAP) {
                    name = TECH_MAP[item].name;
                    title = TECH_MAP[item].name;
                    image = TECH_MAP[item].image;
                }
                
                if (!name) {
                    name = item.replace(/\.|\#|core|\s/ig, '').toLowerCase();
                }
                
                if (!title) {
                    title = item[0].toUpperCase() + item.slice(1);
                }

                if (!image) {
                    image = `${name}-logo.png`;
                }

                if (!/\/scripts\//.test(image)) {
                    image = '/scripts/logos/' + image;
                }

                return {name, title, image};
            })
            return listset;
        })
    }
}