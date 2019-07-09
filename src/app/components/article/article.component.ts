import { Component, OnInit, Input, Renderer2, ElementRef, ViewChild , AfterViewInit} from '@angular/core';
import { Article } from '../../article';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit, AfterViewInit {

  @ViewChild("imgHeader", {static:false}) imgHeader: ElementRef;
  @ViewChild("resume", {static:false}) resume: ElementRef;
  @ViewChild("resumeLists", {static:false}) resumeLists: ElementRef;
  @ViewChild("links", {static:false}) links: ElementRef;

  @Input() Article:Article;
  private document:DocumentFragment;
  private Images:NodeList;
  private lists:NodeList;
  private headings:NodeList;
  private text:NodeList;
  private attached:NodeList;
  public listDissmised = true;
  public hasLongList;

  constructor(private renderer:Renderer2) { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.document = this.stringToDocument(this.Article.content);
      this.Images = this.document.querySelectorAll('img');
      this.lists = this.document.querySelectorAll('ol, ul');
      this.headings = this.document.querySelectorAll('h1,h2,h3,h4,h5,h6');
      this.text = this.document.querySelectorAll('p');
      this.attached = this.document.querySelectorAll('a');
      this.buildCard();
    })
  }

  getTextNodesIn(elem:Node, opt_fnFilter?): Node[] {
    var textNodes = [];
    if (elem) {
      for (var nodes = elem.childNodes, i = nodes.length; i--;) {
        var node = nodes[i], nodeType = node.nodeType;
        if (nodeType == 3) {
          if (!opt_fnFilter || opt_fnFilter(node, elem)) {
            textNodes.push(node);
          }
        }
        else if (nodeType == 1 || nodeType == 9 || nodeType == 11) {
          textNodes = textNodes.concat(this.getTextNodesIn(node, opt_fnFilter));
        }
      }
    }
    return textNodes;
  }

  stringToDocument(htmlString:string):DocumentFragment{
    let template = document.createElement('template');
    template.innerHTML = htmlString.trim();
    return template.content;
  }

  buildCard():void{
    if(this.Images.length){
      this.renderer.appendChild(this.imgHeader.nativeElement,this.Images[0]);
    }

    if(this.Article.resume){
      let p = document.createElement('p');      
      p.innerText = this.Article.resume;
      this.renderer.appendChild(this.resume.nativeElement,p);
    }

    else if(this.text.length ){
      if(this.text[0].textContent.length > 27){
          this.renderer.appendChild(this.resume.nativeElement,this.text[0]);
      }
    }

    if(this.lists.length){
      if(this.lists[0].childNodes.length > 5){
        setTimeout(()=>{
          let el = this.lists[0];
          while(this.lists[0].childNodes.length > 5){
            el.removeChild(el.childNodes[el.childNodes.length-1])
          }
          this.hasLongList = true;
        },1000)
      }
      this.renderer.appendChild(this.resumeLists.nativeElement,this.lists[0]);
    }

    if(this.attached.length){
      for(var i = 0; i<this.attached.length && i<5; i++){
        let linkContainer = document.createElement("div");
        linkContainer.classList.add('linkContainer');
        linkContainer.appendChild(this.attached[i]);
        this.renderer.appendChild(this.links.nativeElement,linkContainer);
      }
    }
  }

  expandList(){
    const childElements = this.resumeLists.nativeElement.childNodes;
    for (let child of childElements) {
      this.renderer.removeChild(this.resumeLists.nativeElement, child);
    }

    this.listDissmised = false;
    this.document = this.stringToDocument(this.Article.content);
    this.lists = this.document.querySelectorAll('ol, ul');
    this.renderer.appendChild(this.resumeLists.nativeElement,this.lists[0]);
  }

  dismissList(){
    this.renderer.removeChild(this.resumeLists.nativeElement ,this.lists[0]);
    this.listDissmised = true;
    if(this.lists[0].childNodes.length > 5){
      let el = this.lists[0]; 
      while(this.lists[0].childNodes.length > 5){          
        el.removeChild(el.childNodes[el.childNodes.length-1])
      }
      this.hasLongList = true;
    }
    this.renderer.appendChild(this.resumeLists.nativeElement,this.lists[0]);
  }

}