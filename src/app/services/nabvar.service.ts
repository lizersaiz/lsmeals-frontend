import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { SideNavbarItem } from '../common/side-navbar-item';

@Injectable({
  providedIn: 'root'
})
export class NabvarService {

  navbarItems = ["Customers", "Events", "Statistics", "Version and development", "Language"];

  sideNavbarItems: Subject<SideNavbarItem[]> = new Subject<SideNavbarItem[]>();
  sideNavbarItemsUser: SideNavbarItem[] = [new SideNavbarItem("View Customer", "customer/list"),
                                            new SideNavbarItem("Create Customer", "customer/create"),
                                            new SideNavbarItem("Customer Statistics", "")];
  sideNavbarItemsEvent: SideNavbarItem[] = [new SideNavbarItem("View Events", ""),
                                            new SideNavbarItem("Create Event", "")];
  sideNavbarItemsStatistis: SideNavbarItem[] = [new SideNavbarItem("General statistics", "statistics/view"),
                                                new SideNavbarItem("Custom statistics", ""),
                                                new SideNavbarItem("Manage statistics", "")];
  sideNavbarItemsVD: SideNavbarItem[] = [new SideNavbarItem("General view", ""),
                                          new SideNavbarItem("View by version", "")];
  sideNavbarItemsLanguage: SideNavbarItem[] = [new SideNavbarItem("English", "")];

  // used for not navigating to the same form twice
  lastSelectedForm: string;

  constructor(private router: Router) {

  }

  populateNavbar(): string[] {

    return this.navbarItems;
  }

  populateSideNavbar(navbarType: string){

    // check if we are not already in that form
    if (navbarType !== this.lastSelectedForm){

      let selectedForm: SideNavbarItem[];
      if (navbarType === this.navbarItems[0]){
        selectedForm = this.sideNavbarItemsUser;
      }
      else if(navbarType === this.navbarItems[1]){
        selectedForm = this.sideNavbarItemsEvent;
      }
      else if(navbarType === this.navbarItems[2]){
        selectedForm = this.sideNavbarItemsStatistis;
      }
      else if(navbarType === this.navbarItems[3]){
        selectedForm = this.sideNavbarItemsVD;
      }
      else if(navbarType === this.navbarItems[4]){
        selectedForm = this.sideNavbarItemsLanguage;
      }

      // repopulate side navbar
      this.sideNavbarItems.next(selectedForm);
      // store current page position
      this.lastSelectedForm = navbarType;
      // route to it
      this.router.navigateByUrl(selectedForm[0].itemUrl);
    }
  }

  routeToSideNavbarOption(sideNavbarUrl: string) {

    this.router.navigateByUrl(sideNavbarUrl);
  }
}
