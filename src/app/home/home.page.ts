import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public pages = [
    {
      title: 'Line Coding',
      description: `A line code is the code used for data transmission of a
        digital signal over a transmission line. This process of coding is
        chosen so as to avoid overlap and distortion of signal such as
        inter-symbol interference.`,
      disabled: false,
      url: ['/', 'line-codes'],
    },
    {
      title: 'Channel coding',
      description: `The strategy of a channel encoder is to add redundancy to
        the transmitted signal, so that errors caused by noise during
        transmission can be corrected at the receiver. The process of encoding
        for protection against channel errors is called error-control coding.
        Error-control codes are used in a variety of applications, including
        satellite communication, deep-space communication, mobile radio
        communication, and computer networking.`,
      disabled: false,
      url: ['/', 'hamming'],
    },
    {
      title: 'Conformación banda base',
      description: ``,
      disabled: false,
      url: ['/'],
    },
    {
      title: 'Modulación digital',
      description: ``,
      disabled: false,
      url: ['/'],
    },
    {
      title: 'Multiplexación: OFMD',
      description: ``,
      disabled: false,
      url: ['/'],
    },
    {
      title: 'Esquemas de acceso múltiple',
      description: ``,
      disabled: false,
      url: ['/'],
    },
  ];

  constructor() {}
}
