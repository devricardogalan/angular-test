import { Component, OnInit} from '@angular/core';
import { ListService } from '../../services/list.service';
import { List } from '../../services/list.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls:['header.component.scss']
})
export class HeaderComponent implements OnInit{

  isAccordion=false;
  isMenu=false;
  list:List[];

  constructor(private listService:ListService) {}

  ngOnInit() {
    this.listService.getList().subscribe(console.log);
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
