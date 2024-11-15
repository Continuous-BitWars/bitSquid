import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {SidebarComponent} from "../sidebar/sidebar.component";

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, RouterOutlet, RouterLinkActive, CommonModule, NavBarComponent, SidebarComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  isSidebarVisible: boolean = false; // Tracks sidebar visibility
  isDropdownOpen: boolean = false;  // Tracks dropdown visibility


  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    //console.log(`Sidebar visibility toggled: ${this.isSidebarVisible}`);
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
    // console.log(`Dropdown visibility toggled: ${this.isDropdownOpen}`);
  }
}
