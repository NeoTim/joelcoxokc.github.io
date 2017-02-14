import { bindable, customElement, inject, inlineView } from 'aurelia-framework';



const Template = `
<template>
    \${ico}
</template>
`;


@customElement('icon')
@inlineView(Template)
@inject(Element)
export class Icon {

    @bindable ico = null;

    constructor(element) {
        element.classList.add('material-icons');
    }
}