import {inject, Factory} from 'aurelia-framework';
import {Title} from './title/title';
import {Profile} from './profile/profile';
import {Projects} from './projects/projects';
import {Experience} from './experience/experience';
import {Education} from './education/education';
import {Technology} from './technology/technology';
import {Connect} from './connect/connect';
import {Enums} from 'core/enums';
import {State} from 'state';
import {View} from 'core/view';
import {Color} from 'core/color';

@inject(
    Enums,
    State,
    Factory.of(Title),
    Factory.of(Profile),
    Factory.of(Projects),
    Factory.of(Experience),
    Factory.of(Education),
    Factory.of(Technology),
    Factory.of(Connect),
)
export class Resume {
    constructor(Enums, State, Title, Profile, Projects, Experience, Education, Technology, Connect) {
        this.State = State;
        this.State.title = 'Resume';
        this.views = [
            new View({
                name: 'title',
                icon: 'home',
                shade: Color.tan,
                viewModel: Title({
                    title: 'Joel Cox',
                    summary: 'UI & UX Architect, Engineer & Designer'
                })
            }),
            new View({
                title: 'Profile',
                name: 'profile',
                icon: 'person',
                shade: Color.blue,
                viewModel: Profile(Enums.Profile, State)
            }),
            new View({
                title: 'Projects',
                name: 'projects',
                icon: 'screen_share',
                shade: Color.tan,
                viewModel: Projects(Enums.Projects, State)
            }),
            new View({
                title: 'Experience',
                name: 'experience',
                icon: 'verified_user',
                shade: Color.teal,
                viewModel: Experience(Enums.Experience, State)
            }),
            new View({
                title: 'Education',
                name: 'education',
                icon: 'school',
                shade: Color.tan,
                viewModel: Education(Enums.Education, State)
            }),
            new View({
                title: 'Technology',
                name: 'technology',
                icon: 'layers',
                shade: Color.brown,
                viewModel: Technology(Enums.Technology, State)
            }),
            new View({
                title: 'Connect',
                name: 'connect',
                icon: 'share',
                shade: Color.tan,
                viewModel: Connect(Enums.Connect, State)
            })
        ]
    }

    attached() {
        this.views.forEach(view => {
            if (!view.element) {
                view.element = document.querySelector(`.app-${view.name}`);
            }
        })
    }
}