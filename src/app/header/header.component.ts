import { Component } from '@angular/core';
import { routes as navLinks } from '../config/nav-links'


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  navLinks = navLinks;

  constructor() { }

}
