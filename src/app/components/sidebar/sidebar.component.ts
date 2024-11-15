import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ChildComponent } from "../child/child.component";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, ChildComponent],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  isSidebarVisible: boolean = false; // Tracks sidebar visibility
  isDropdownOpen: boolean = false;  // Tracks dropdown visibility


  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    console.log(`Sidebar visibility toggled: ${this.isSidebarVisible}`);
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
    console.log(`Dropdown visibility toggled: ${this.isDropdownOpen}`);
  }
}
