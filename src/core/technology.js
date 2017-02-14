export class TechnologyEnums {
    languages     = ['es6', 'javascript','html5',  'css3', 'apps-script', 'php'];
    preprocessors = ['jade', 'coffeescript', 'sass', 'less', 'stylus', 'postcss'];
    frameworks    = ['aurelia', 'angular2.0', 'angular', 'react', 'polymer', 'ionic', 'backbone', 'laravel'];
    tools         = ['jspm', 'gulp', 'grunt', 'slush', 'yeoman'];
    data          = ['redis', 'neo4j', 'mongo', 'sql'];
    design        = ['ai'  , 'ps', 'sketch'];

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
            }
        ]
        
        this.list = list.map(listset => {
            listset.list = listset.list.map(item => {
                return {
                    img: `/scripts/logos/${item}-logo.png`,
                    name: item,
                    title: item[0].toUpperCase() + item.slice(1)
                }
            })
            return listset;
        })
    }
}