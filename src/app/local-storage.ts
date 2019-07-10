import { Article } from "./article";

export class LocalStorage {

    constructor(){
    }

    postSuggestion(suggestion:string):void{
        let suggestions: string[] = JSON.parse(localStorage.getItem('suggestions')) || [];
        suggestions.push(suggestion);
        localStorage.setItem('suggestions',JSON.stringify(suggestions));
    }

    getSuggestions(input:string|number):string[]{
        let suggestions = (JSON.parse(localStorage.getItem('suggestions')) || []) as string[];        
        if(typeof input == 'string'){
            return suggestions.filter(x=>x.match(`^${input}.*$`))
        }else if(typeof input == 'number'){
            return suggestions.slice(0,input);
        }
    }
    
    getArticles(input:string):Article[]{
        let articles = (JSON.parse(localStorage.getItem('articles')) || []) as Article[];
        return articles;
    }

    getArticle(articleId):Article{
        let articles = (JSON.parse(localStorage.getItem('articles')) || []) as Article[];
        return articles.find(article=> article.id == articleId);
    }

    postArticles(articles:Article[]):Article[]{
        let articulos = (JSON.parse(localStorage.getItem('articles')) || []) as Article[];
        localStorage.setItem('articles',JSON.stringify(articulos.concat(articles)));
        return articles;
    }


    
}