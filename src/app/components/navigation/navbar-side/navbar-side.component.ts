import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';
import { SideNavbarItem } from 'src/app/common/side-navbar-item';

@Component({
  selector: 'app-navbar-side',
  templateUrl: './navbar-side.component.html',
  styleUrls: ['./navbar-side.component.css']
})
export class NavbarSideComponent implements OnInit {

  sideNavbarItems: SideNavbarItem[] = [];

  constructor(private navigationService: NavigationService) { }

  ngOnInit(): void {

    this.navbarServiceListener();
  }

  navbarServiceListener(){

    this.sideNavbarItems = this.navigationService.sideNavbarItemsCustomer;
    this.navigationService.sideNavbarItems.subscribe(
      data => this.sideNavbarItems = data
    );
  }

  openOption(sideNavbarItem: string){

    this.navigationService.routeTo(sideNavbarItem);
  }
}
