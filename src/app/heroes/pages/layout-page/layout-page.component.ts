import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [
  ]
})
export class LayoutPageComponent {

  public sideBarItems = [
    { label: 'Buscar', icon: 'search', url: './search' },
    { label: 'Lista', icon: 'label', url: './list' },
    { label: 'Añadir', icon: 'add', url: './new-hero' },
  ]

}
