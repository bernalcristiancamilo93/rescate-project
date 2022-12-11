import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public pages = [
    {
      title: 'Line encoding',
      description: `A line code is the code used for data transmission of a
        digital signal over a transmission line. This process of coding is
        chosen so as to avoid overlap and distortion of signal such as
        inter-symbol interference.`,
      disabled: false,
      url: ['/', 'line-codes'],
    },
    {
      title: 'Channel encoding',
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
      title: 'Baseband ',
      description: `The baseband is the range of frequencies occupied by a
        signal that has not been modulated to higher frequencies.`,
      disabled: true,
      url: ['/'],
    },
    {
      title: 'Digital modulation',
      description: `Digital modulation is the process of encoding a digital
        information signal into the amplitude, phase, or frequency of the
        transmitted signal.`,
      disabled: false,
      url: ['/', 'digital-modulation'],
    },
    {
      title: 'OFMD multiplexing',
      description: `Orthogonal frequency-division multiplexing (OFDM) is a type
        of digital transmission and a method of encoding digital data on
        multiple carrier frequencies. OFDM has developed into a popular scheme
        for wideband digital communication, used in applications such as
        digital television and audio broadcasting, DSL internet access,
        wireless networks, power line networks, and 4G/5G mobile
        communications.`,
      disabled: true,
      url: ['/'],
    },
    {
      title: 'Multiple access schemes',
      description: `Multiple access schemes are used whenever there is a need
        for a number of independent users to share a resource that may be
        scarce or expensive.`,
      disabled: true,
      url: ['/'],
    },
  ];

  constructor() {}
}
