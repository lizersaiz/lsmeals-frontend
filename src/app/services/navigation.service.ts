import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { SideNavbarItem } from '../common/side-navbar-item';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  navbarItems = ["Customers", "Products", "Events", "Statistics", "Version and development"];

  sideNavbarItems: Subject<SideNavbarItem[]>;
  sideNavbarItemsCustomer: SideNavbarItem[];
  sideNavbarItemsProduct: SideNavbarItem[];
  sideNavbarItemsEvent: SideNavbarItem[];
  sideNavbarItemsStatistis: SideNavbarItem[];
  sideNavbarItemsVD: SideNavbarItem[];

  // used for not navigating to the same form twice
  lastSelectedForm: string;

  constructor(private router: Router) {

    this.sideNavbarItems = new Subject<SideNavbarItem[]>();

    this.sideNavbarItemsCustomer = [new SideNavbarItem("View Customers", "customer/list"),
                                    new SideNavbarItem("Create Customer", "customer/create"),
                                    new SideNavbarItem("Customer Statistics", "")];

    this.sideNavbarItemsProduct = [new SideNavbarItem("View Products", ""),
                                    new SideNavbarItem("Create Product", ""),
                                    new SideNavbarItem("Product Statistics", "")];

    this.sideNavbarItemsEvent = [new SideNavbarItem("View Events", ""),
                                  new SideNavbarItem("Create Event", "")];

    this.sideNavbarItemsStatistis = [new SideNavbarItem("General statistics", "statistics/view"),
                                      new SideNavbarItem("Custom statistics", ""),
                                      new SideNavbarItem("Manage statistics", "")];

    this.sideNavbarItemsVD = [new SideNavbarItem("General view", ""),
                              new SideNavbarItem("View by version", "")];
  }

  populateNavbar(): string[] {

    return this.navbarItems;
  }

  populateSideNavbar(navbarType: string){

    // check if we are not already in that form
    if (navbarType !== this.lastSelectedForm){

      let selectedForm: SideNavbarItem[];
      if (navbarType === this.navbarItems[0]){
        selectedForm = this.sideNavbarItemsCustomer;
      }
      else if(navbarType === this.navbarItems[1]){
        selectedForm = this.sideNavbarItemsProduct;
      }
      else if(navbarType === this.navbarItems[2]){
        selectedForm = this.sideNavbarItemsEvent;
      }
      else if(navbarType === this.navbarItems[3]){
        selectedForm = this.sideNavbarItemsStatistis;
      }
      else if(navbarType === this.navbarItems[4]){
        selectedForm = this.sideNavbarItemsVD;
      }

      // repopulate side navbar
      this.sideNavbarItems.next(selectedForm);
      // store current page position
      this.lastSelectedForm = navbarType;
      // route to it
      this.router.navigateByUrl(selectedForm[0].itemUrl);
    }
  }

  /**
   * Asks the router to navigate to a url
   * @param url The url to navigate to
   */
  routeTo(url: string) {

    this.router.navigateByUrl(url);
  }
}
