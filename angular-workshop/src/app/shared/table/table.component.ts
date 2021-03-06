import { Component, OnInit,OnDestroy } from '@angular/core';
import { ListService } from 'src/app/shared/services/list.service';
import { List } from 'src/app/shared/services/list.interface';
import {ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {

  publications;
  isLoaded=false;
  numPages:any []=[];
  pageActive:number=1;
  pagesNumber;
  isAuthorUrl: Boolean;
  sub:Subscription;
  routerSub: Subscription;
  param;

  constructor(private listService: ListService, private router:ActivatedRoute) {

  }

  ngOnInit() {
    //Watch for router params so when there's a change it loads the publication of authors
    this.router.paramMap.subscribe(
      params=>{
        this.param=params.get('name');
        this.loadPublications();
      }
    )
  }

  

  displayRows(i){
    //displays rows depending on page
    let numberOfRow=Math.ceil((i+1)/10)
    if(this.pageActive==numberOfRow){
      return 'table-row';
    }else{
      return 'none';
    }
  }

  changePages(param){
    //changes pages 
    const num=Math.ceil(param/2);
    this.numPages=[];
    for(let i=1; i<=num; i++){
      this.numPages.push({'value':i});
    }
  }

  onClickPagination(e){
    //sets active page
    this.pageActive=parseInt(e.srcElement.innerHTML);
  }

  onClickNext(limit){
    //goes to next page
    if(this.pageActive+1 > limit){
      this.pageActive=1;
    }
    else{
      this.pageActive+=1;
    }

  }

  onClickPrevious(limit){
    //goes to previous page
    if(this.pageActive-1 < 1){
      this.pageActive= limit;
    }
    else{
      this.pageActive-=1;
    }
  }

  checkPageActive(num){
    //checks if page active
    if(this.pageActive==num){
      return "page-active";
    }else{
      return "";
    }
  }

  public sortByDueDate(): void {
    //sorts date when header clicked
    this.publications.sort((a: List, b: List) => {
        let dateA=new Date(a.date);
        let dateB=new Date(b.date);
        return dateA.getTime() - dateB.getTime();
    });
}

public loadPublications(){
  //loads publications depending if is for all authors or just one
  this.isAuthorUrl=window.location.pathname.split('/').includes('authors');
  if(this.isAuthorUrl===false){
    this.sub=this.listService.getList().subscribe(
    val=>{
      this.isLoaded=true;
      this.publications=val;
      this.pagesNumber=Math.ceil((this.publications.length)/10);
      this.numPages=[];
      for(let i =1; i<=this.pagesNumber; i++){
        this.numPages.push(i);
      }
    }
   );
  }else{
    this.sub=this.listService.getList().subscribe(
      val=>{
        this.isLoaded=true;
        let fullname=window.location.pathname.split("/").pop();
        const authorfirstname=fullname.split('%20')[0];
        const authorlastname=fullname.split('%20')[1];
        this.publications=val.filter(a=>a.firstname==authorfirstname && a.lastname==authorlastname);
        this.pagesNumber=Math.ceil((this.publications.length)/10);
        this.numPages=[];
        for(let i =1; i<=this.pagesNumber; i++){
          this.numPages.push(i);
        }
      }
    )
    }
  }
  ngOnDestroy() {
    //destroys subscription
    this.sub.unsubscribe();
  }
}
