import {inject, Factory} from 'aurelia-framework';
import {Article} from 'blog/article'; 
import {ArticleService} from 'core/article-service';

@inject(ArticleService, Factory.of(Article))
export class Blog {
    constructor(ArticleService, Article) {
        this.articleService = ArticleService;
        this.Article = Article;
    }

    activate(params) {
        this.loadArticle(params.slug).then(article => {
            this.article = article;
        });
    }

    _loadArticle(slug) {
        return this.articleService.load(slug).then((data)=> {
            return this.Article(data);
        });
    }
}