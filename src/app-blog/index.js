

export class Blog {
    constructor(httpClient) {

        httpClient.configure((config)=> {

        });
        
        this.http = httpClient;
    }

    configureRouter(config, router) {
        config.map([
            {
                route: ['', 'toc'],
                moduleId: 'blog/toc',
                name: 'toc',
                title: 'Blog'
            },
            {
                route: [':id'],
                moduleId: 'blog/blog',
                name: 'article',
                title: null,
            }
        ])

        this.router = router;
    }

    loadArticles() {}
}