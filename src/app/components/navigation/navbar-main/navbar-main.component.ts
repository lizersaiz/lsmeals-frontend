import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';


@Component({
  selector: 'app-navbar-main',
  templateUrl: './navbar-main.component.html',
  styleUrls: ['./navbar-main.component.css']
})
export class NavbarMainComponent implements OnInit {


  navbarItems: string[] = [];

  constructor(private navigationService: NavigationService) { }

  ngOnInit(): void {

    this.populateNavbar();
  }

  populateNavbar(){

    this.navbarItems = this.navigationService.populateNavbar();
  }

  populateSideNavbar(navbarType: string){

    this.navigationService.populateSideNavbar(navbarType);
  }
}
