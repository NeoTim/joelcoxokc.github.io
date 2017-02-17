
const chars = 'Architect,-Engineer-&-Designer';
export class Title {
    constructor(props) {
        this.title = props.title;
        this.summary = props.summary;
    }

    bind() {
        this.startAnimation();
    }

    startAnimation() {
        let ux = this.uxAnimation;
        let iAnimEnd;
        let xAnimEnd;
        let startType;
        let uxAnimEnd;
        let startReset;


        let iEl = ux.querySelector('.i');
        let xEl = ux.querySelector('.x');
        let tEl = ux.querySelector('.type');

        startReset = ()=> {
            let id = setTimeout(()=> {
                this.startAnimation();
                clearTimeout(id);
            }, 3000);
        }

        uxAnimEnd = (event)=> {
            ux.classList.remove('animate-out');
            ux.classList.remove('split-ix');
            tEl.innerHTML = '';
            ux.removeEventListener('animationend', uxAnimEnd);

            let id = setTimeout(()=> {
                ux.classList.add('animate');
                clearTimeout(id);
            }, 1000);
        }

        iAnimEnd = (event)=> {
            iEl.removeEventListener('animationend', iAnimEnd);
        }

        xAnimEnd = (event)=> {
            ux.classList.add('split-ix');
            startType();
            xEl.removeEventListener('animationend', xAnimEnd);
        }

        startType = ()=> {
            let arr = chars.split('');
            let intId = setInterval(()=> {
                if (arr.length) {
                    tEl.innerHTML += arr.shift().replace(/\-/, '&nbsp;');
                } else {
                    startReset();
                    clearInterval(intId);
                }
            }, 50);
        }

        iEl.addEventListener('animationend', iAnimEnd);
        xEl.addEventListener('animationend', xAnimEnd);

        if (ux.classList.contains('animate')) {
            ux.addEventListener('animationend', uxAnimEnd);
            ux.classList.add('animate-out');
            ux.classList.remove('animate');
        } else {
            ux.classList.add('animate');
        }
    }
}