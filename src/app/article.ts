export interface articleConf{
    id?:string;
    title:string;
    content:string;
    obj:string;
    tags?:string[];
    resume?:string;
    attached?:string[];
    likes?:string[];//user ids
    disLikes?:string[];//user ids
    favorites?:string[];//user ids
    role?:"noticia"|"articulo";
    publicationDate?:number;
    modificationDate?:number;
    modificationUser?:string;
    creator?:string;
    commentsList?:string;
    line?:string;
    subLine?:string;
    category?:string;
    highlight: { content: string[] };
}

export class Article implements articleConf{
    public title:string;
    public content:string;
    public tags?:string[];
    public resume?:string;
    public attached?:string[];
    public likes?:string[];//user ids
    public disLikes?:string[];//user ids
    public favorites?:string[];//user ids
    public role?:"noticia"|"articulo";
    public publicationDate?:number;
    public modificationDate?:number;
    public modificationUser?:string;
    public creator?:string;
    public commentsList?:string;
    public id?:string;
    public subLine?:string;
    public line?:string;
    public category?:string;
    public obj:string;
    public highlight: { content: string[] };

    constructor(config:articleConf){
        this.title = config.title;
        this.content = config.content;
        if(config.tags){
            this.tags = config.tags;
        }
        if(config.resume){
            this.resume = config.resume;
        }
        if(config.attached){
            this.attached = config.attached;
        }
        if(config.likes){
            this.likes = config.likes;
        }
        if(config.disLikes){
            this.disLikes = config.disLikes;
        }
        if(config.favorites){
            this.favorites = config.favorites;
        }
        if(config.role){
            this.role = config.role;
        }
        if(config.publicationDate){
            this.publicationDate = config.publicationDate;
        }
        if(config.modificationDate){
            this.modificationDate = config.modificationDate;
        }
        if(config.modificationUser){
            this.modificationUser = config.modificationUser;
        }
        if(config.creator){
            this.creator = config.creator;
        }
        if(config.commentsList){
            this.commentsList = config.commentsList;
        }
        if(config.id){
            this.id = config.id;
        }
        if(config.line){
            this.line = config.line;
        }
        if(config.subLine){
            this.subLine = config.subLine;
        }
        if(config.subLine){
            this.category = config.category;
        }
        if(config.obj){
            this.obj = config.obj;
        }
        if(config.highlight){
            this.highlight = config.highlight;
        }
    }
}