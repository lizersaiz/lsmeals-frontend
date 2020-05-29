import { Component, OnInit } from '@angular/core';
import { NabvarService } from 'src/app/services/nabvar.service';


@Component({
  selector: 'app-navbar-main',
  templateUrl: './navbar-main.component.html',
  styleUrls: ['./navbar-main.component.css']
})
export class NavbarMainComponent implements OnInit {


  navbarItems: string[] = [];

  constructor(private navbarService: NabvarService) { }

  ngOnInit(): void {

    this.populateNavbar();
  }

  populateNavbar(){

    this.navbarItems = this.navbarService.populateNavbar();
  }

  populateSideNavbar(navbarType: string){

    this.navbarService.populateSideNavbar(navbarType);
  }
}
