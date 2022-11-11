import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public pages = [
    {
      title: 'Codificación de línea',
      description: 'Card description',
      disabled: false,
      url: ['/'],
    },
    {
      title: 'Channel coding',
      description: 'Card description',
      disabled: false,
      url: ['/', 'hamming'],
    },
    {
      title: 'Conformación banda base',
      description: 'Card description',
      disabled: false,
      url: ['/'],
    },
    {
      title: 'Modulación digital',
      description: 'Card description',
      disabled: false,
      url: ['/'],
    },
    {
      title: 'Multiplexación: OFMD',
      description: 'Card description',
      disabled: false,
      url: ['/'],
    },
    {
      title: 'Esquemas de acceso múltiple',
      description: 'Card description',
      disabled: false,
      url: ['/'],
    },
  ];

  constructor() {}
}
