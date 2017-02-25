export class Color {
    static blue      = '#284B63';
    static teal      = '#77A0A2';
    static white     = '#FFFFFF';
    static tan       = '#D9D9D9';
    static brown     = '#353535';

    static light         = {
        primary   : 'rgba(255,255,255,1)',
        secondary : 'rgba(255,255,255,0.70)',
        disabled  : 'rgba(255,255,255,0.50)',
        divider   : 'rgba(255,255,255, 0.12)',
        key       : 'light'
    };

    static dark = {
        primary   : 'rgba(0,0,0,1)',
        secondary : 'rgba(0,0,0,0.70)',
        disabled  : 'rgba(0,0,0,0.50)',
        divider   : 'rgba(0,0,0, 0.12)',
        key       : 'dark',
    };

    constructor() {
        
    }

}

Color.blue  = makeColor(Color.blue);
Color.teal  = makeColor(Color.teal);
Color.white = makeColor(Color.white);
Color.tan   = makeColor(Color.tan);
Color.brown = makeColor(Color.brown);

function  makeColor(fill) {
    let shade = {fill};

    if (isLight(fill)) {
        Object.assign(shade, Color.light);
    } else {
        Object.assign(shade, Color.dark);
    }
    return shade;
}

function isLight(color) {
    if (color === Color.brown || color === Color.blue) {
        return true;
    }
    return false;
}