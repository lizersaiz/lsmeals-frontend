import { Component, OnInit } from '@angular/core';
import { NabvarService } from 'src/app/services/nabvar.service';
import { SideNavbarItem } from 'src/app/common/side-navbar-item';

@Component({
  selector: 'app-navbar-side',
  templateUrl: './navbar-side.component.html',
  styleUrls: ['./navbar-side.component.css']
})
export class NavbarSideComponent implements OnInit {

  sideNavbarItems: SideNavbarItem[] = [];

  constructor(private navbarService: NabvarService) { }

  ngOnInit(): void {

    this.navbarServiceListener();
  }

  navbarServiceListener(){

    this.sideNavbarItems = this.navbarService.sideNavbarItemsUser;
    this.navbarService.sideNavbarItems.subscribe(
      data => this.sideNavbarItems = data
    );
  }

  openOption(sideNavbarItem: string){

    this.navbarService.routeToSideNavbarOption(sideNavbarItem);
  }
}
