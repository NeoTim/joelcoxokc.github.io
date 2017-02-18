
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

        let iAnim;
        let xAnim;
        let uixAnim;
        let aAnim;
        let dAnim;
        let eAnim;
        let fill = 'forwards';
        let duration = 300;

        let iEl = this.nodes.i;
        let xEl = this.nodes.x;
        let aEl = this.nodes.architect;
        let dEl = this.nodes.designer;
        let eEl = this.nodes.engineer;
        let uixEl = this.nodes.uix;

        iAnim = iEl.animate(
            [
                {
                    opacity: 1,
                    transform: 'rotate(0deg)'
                },
                {
                    opacity: 0,
                    transform: 'rotate(180deg)'
                }
            ], {
                duration: duration,
                delay: 1000,
                fill: fill
            }
        );

        xAnim = xEl.animate(
            [
                {
                    opacity: 0,
                    transform: 'rotate(-180deg)'
                },
                {
                    opacity: 1,
                    transform: 'rotate(0deg)'
                }
            ], {
                duration: duration,
                delay: 1000,
                fill: fill
            }
        );

        xAnim.onfinish = ()=> {
            

            uixAnim = uixEl.animate(
                [
                    {
                        transform: 'translateX(145px)'
                    },
                    {
                        transform: 'translateX(0)'
                    }
                ], {
                    duration: 1000,
                    fill: fill
                }
            );

            iEl.animate(
                [
                    {transform: 'rotate(180deg)'},
                    {transform: 'rotate(0deg)'}
                ],{
                    fill: fill,
                    duration: 0
                }
            );

            iAnim = iEl.animate(
                [
                    {
                        opacity: 0
                    }, 
                    {
                        opacity: 1
                    }
                ], {
                    duration: 300,
                    delay: 700,
                    fill: fill
                }
            );

            xAnim = xEl.animate(
                [
                    {
                        left: '15px',
                    },
                    {
                        left: '22px'
                    }
                ], {
                    duration: 300,
                    fill: fill,
                    delay: 700
                }
            );

            aEl.animate(
                [
                    {
                        opacity: 0,
                    },
                    {
                        opacity: 1,
                    }
                ], {
                    duration: 200,
                    fill: fill
                }
            );

            aEl.animate(
                [
                    {transform: 'translateX(110px)'},
                    {transform: 'translateX(0px)'}
                ],
                {
                    duration: 800,
                    fill: fill,
                    delay: 200
                }
            );

            dAnim = dEl.animate(
                [
                    {opacity: 0},
                    {opacity: 1}
                ],{
                    duration: 200,
                    fill: fill,
                    delay: 300
                }
            );

            dEl.animate(
                [
                    {transform: 'translateX(80px)'},
                    {transform: 'translateX(0px)'}
                ], {
                    duration: 600,
                    delay: 400,
                    fill: fill
                }
            );

            eEl.animate(
                [
                    {opacity: 0},
                    {opacity: 1},
                ], {
                    duration: 200,
                    delay: 500,
                    fill: fill
                }
            );

            eEl.animate(
                [
                    {transform: 'translateX(50px)'},
                    {transform: 'translateX(0)'}
                ], {
                    duration: 400,
                    delay: 600,
                    fill: fill
                }
            );
        }

        return Promise.all([iAnim.finished, xAnim.finished]).then(()=> {
        })


        const uframes = [
            // {opacity: 0},
            // {opacity: 1}
        ];

        const iframes = [
            {
                opacity: 1,
                transform: `rotate(0deg)`
            },
            {
                opacity: 0,
                transform: `rotate(180deg)`
            }
        ];

        const xframes = [
            {
                opacity: 0,
                transform: `rotate(-180deg)`
            },
            {
                opacity: 1,
                transform: `rotate(0deg)`
            }
        ];

        let wordFrames = [
            {
                opacity:0
            },
            {
                opacity: 1
            }
        ]

        let ixoptions = {
            duration: 300,
            fill: fill,
            delay: 1000
        }

        this.nodes.i.animate(iframes, ixoptions);
        this.nodes.x.animate(xframes, ixoptions);

        this.nodes.architect.animate(wordFrames, {
            fill: fill, 
            duration: 300,
            delay: 1300
        });

        this.nodes.designer.animate(wordFrames, {
            fill: fill,
            duration: 300,
            delay: 1400
        });

        this.nodes.engineer.animate(wordFrames, {
            fill: fill,
            duration: 300,
            delay: 1600
        });
    }

    _startAnimation() {
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
                    arr.shift();
                    // tEl.innerHTML += arr.shift().replace(/\-/, '&nbsp;');
                } else {
                    startReset();
                    clearInterval(intId);
                }
            }, 50);
        }

        // iEl.addEventListener('animationend', iAnimEnd);
        // xEl.addEventListener('animationend', xAnimEnd);

        if (ux.classList.contains('animate')) {
            // ux.addEventListener('animationend', uxAnimEnd);
            // ux.classList.add('animate-out');
            // ux.classList.remove('animate');
        } else {
            // ux.classList.add('animate');
        }
    }
}