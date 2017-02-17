export class TechnologyEnums {
    languages     = ['es6', 'javascript', 'typescript', 'html5',  'css3', 'apps-script', 'php', 'cypher', 'bash'];
    preprocessors = ['flow', 'babel', 'jade', 'coffeescript', 'sass', 'less', 'stylus', 'postcss'];
    frameworks    = ['aurelia', 'angular2.0', 'angular', 'react', 'polymer', 'ionic', 'backbone', 'laravel', 'express'];
    tools         = ['node', 'jspm', 'gulp', 'webpack', 'aurelia-cli', 'grunt', 'slush', 'yeoman'];
    data          = ['redis', 'neo4j', 'mongo', 'sql'];
    design        = ['ai', 'ps', 'sketch', 'zeplin'];
    rolanguages   = ['C#', '.Net', '.Net core', 'java', 'Python']
    
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
                let ref = item.replace(/\.|\#|core|\s/ig, '').toLowerCase();
                return {
                    img: `/scripts/logos/${ref}-logo.png`,
                    name: ref,
                    title: item[0].toUpperCase() + item.slice(1)
                }
            })
            return listset;
        })
    }
}