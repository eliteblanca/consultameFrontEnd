import { Component, OnInit } from '@angular/core';

type categories = {
  name:string,
  order:number,
  desplegado:boolean,
  subcategories?:categories
}[];

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  public categories:categories = [
      {
        name:"categoria 1",
        order:1,
        desplegado:true,
        subcategories:[{
            name:"sub Categoria 1",
            order:1,
            desplegado:true
          },{
            name:"sub Categoria 2",
            order:1,
            desplegado:true
          }
        ]
      },{
        name:"categoria 2",
        order:1,
        desplegado:true,
        subcategories:[{
            name:"sub Categoria 1",
            order:1,
            desplegado:true
          },{
            name:"sub Categoria 2",
            order:1,
            desplegado:true
          }
        ]
      },{
        name:"categoria 3",
        order:1,
        desplegado:true,
        subcategories:[{
            name:"sub Categoria 1",
            order:1,
            desplegado:true,
            subcategories:[{
              name:"sub Categoria 1",
              order:1,
              desplegado:true,
              subcategories:[{
                name:"sub Categoria 1",
                order:1,
                desplegado:true
              },{
                name:"sub Categoria 2",
                order:1,
                desplegado:true
              }
            ]
            },{
              name:"sub Categoria 2",
              order:1,
              desplegado:true
            }
          ]
          },{
            name:"sub Categoria 2",
            order:1,
            desplegado:true
          }
        ]
      },
    ];

  constructor() { }

  ngOnInit() {
  }

}