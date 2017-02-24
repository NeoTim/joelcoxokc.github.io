export class ConnectEnums {
    phone = {
        name: 'phone',
        title: 'Phone',
        icon: 'phone',
        value: '(405) 388 7691',
        html: true
    };

    email = {
        name: 'email',
        title: 'Email',
        icon: 'email',
        value: 'Joel.Cox.Dev@gmail.com',
        html: true
    };

    github = {
        name: 'github',
        title: 'Github',
        logo: '/scripts/logos/github-logo.png',
        url: 'http://github.com/joelcoxokc',
        html: true
    };

    linkedin = {
        name: 'linkedin',
        title: 'Linkedin',
        logo: '/scripts/logos/linkedin-logo.png',
        url: 'http://www.linkedin.com/in/joelcoxio',
        html: true
    };

    google = {
        name: 'google',
        title: 'Google',
        logo: '/scripts/logos/google-logo.png',
        url: 'http://plus.google.com/109302227492219897111',
        html: true        
    };

    npm = {
        name: 'npm',
        title: 'NPM',
        logo: '/scripts/logos/npmjs-logo.svg',
        url: 'https://www.npmjs.com/~joelcoxokc',
        html: true
    };

    twitter = {
        name: 'twitter',
        title: 'Twitter',
        logo: '/scripts/logos/tiwtter-logo.png',
        url: 'https://twitter.com/joelcoxokc',
        html: true,        
    };

    instagram = {
        name: 'instagram',
        title: 'Instagram',
        url: 'https://www.instagram.com/joelcoxokc',
        html: true
    };

    facebook = {};

    constructor() {
        this.list = [
            this.phone,
            this.email,
            this.github,
            this.npm,
            this.linkedin,
            this.twitter,
            this.instagram,
            this.google,
        ];

        this.phone.href = 'tel: 1-'+this.phone.value.replace(/\(|\)/g, '').replace(/\s+/g, '-');
        this.email.href = 'mailto: '+this.email.value;

        console.log(this.phone.href)
        this.private = [];
        this.public = [];

        this.list.forEach(item => {
            if (item.name === 'phone' || item.name === 'email') {
                this.private.push(item)
            } else {
                this.public.push(item);
            }
        });
    }
}