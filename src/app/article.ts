export interface articleConf{
    title:string;
    content:string;
    tags?:string[];
    resume?:string;
    attached?:string[];
    likes?:string[];//user ids
    disLikes?:string[];//user ids
    favorites?:string[];//user ids
    role?:"noticia"|"articulo";
    publicationDate?:Date;
    modificationDate?:Date;
    modificationUser?:string;
    creator?:string;
    commentsList?:string;
}

export class Article implements articleConf{
    public title:string;
    public content:string;
    public tags:string[];
    public resume?:string;
    public attached:string[];
    public likes:string[];//user ids
    public disLikes:string[];//user ids
    public favorites:string[];//user ids
    public role:"noticia"|"articulo";
    public publicationDate:Date;
    public modificationDate:Date;
    public modificationUser:string;
    public creator:string;
    public commentsList:string;

    constructor(private conf:articleConf){
        this.title = conf.title;
        this.content = conf.content;
        if(conf.tags){
            this.tags = conf.tags;
        }
        if(conf.resume){
            this.resume = conf.resume;
        }
        if(conf.attached){
            this.attached = conf.attached;
        }
        if(conf.likes){
            this.likes = conf.likes;
        }
        if(conf.disLikes){
            this.disLikes = conf.disLikes;
        }
        if(conf.favorites){
            this.favorites = conf.favorites;
        }
        if(conf.role){
            this.role = conf.role;
        }
        if(conf.publicationDate){
            this.publicationDate = conf.publicationDate;
        }
        if(conf.modificationDate){
            this.modificationDate = conf.modificationDate;
        }
        if(conf.modificationUser){
            this.modificationUser = conf.modificationUser;
        }
        if(conf.creator){
            this.creator = conf.creator;
        }
        if(conf.commentsList){
            this.commentsList = conf.commentsList
        }
    }
}