import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Article } from "../../article";
import { ArticlesApiService } from "../../api/articles-api.service";
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-article-editable',
  templateUrl: './article-editable.component.html',
  styleUrls: ['./article-editable.component.css']
})
export class ArticleEditableComponent implements OnInit {

  @Input() article:Article;
  @Output() onArticleDeleted = new EventEmitter();

  constructor(
    private articlesApi:ArticlesApiService,
    private router:Router
  ) { }
  
  ngOnInit() {
  }

  deleteArticle(){
    this.articlesApi.deleteArticle(this.article.id).subscribe(result => {
        console.log(result)
        this.onArticleDeleted.next(this.article.id)
    })
  }

  goToArticleEdition(){
    this.router.navigate(['/app/articlecreation'],{ queryParams: { articleId: this.article.id }, queryParamsHandling: 'merge' })
  }

}