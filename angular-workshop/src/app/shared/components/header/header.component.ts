import { Component, OnInit} from '@angular/core';
import { ListService } from '../../services/list.service';
import { List } from '../../services/list.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls:['header.component.scss']
})
export class HeaderComponent implements OnInit{
  authors;
  isAccordion=false;
  isMenu=false;
  list:List[];

  constructor(private listService:ListService, private router:Router) {}

  ngOnInit() {
    this.listService.getAuthors().subscribe(
      val=>{
        this.authors=val;
      }
    )
  }

  loadHome(){
    this.router.navigate(['/'])
  }

  loadAuthor(param){
    this.router.navigate(['/authors', param]);
  }

  openOrCloseAccordion() {
    this.isAccordion = !this.isAccordion;
  }

  openMenu() {
    this.isMenu = true;
  }

  closeMenu() {
    this.isMenu = false;
  }

}
