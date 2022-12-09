/* eslint-disable no-bitwise */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-hamming',
  templateUrl: './hamming.page.html',
  styleUrls: ['./hamming.page.scss'],
})
export class HammingPage implements OnInit {
  public description = `Hamming code is a set of error-correction codes that
    can be used to detect and correct the errors that can occur when the data
    is moved or stored from the sender to the receiver. It is a technique
    developed by R.W. Hamming for error correction.`;

  public pages = [
    {
      title: 'Transmitter',
      description: 'Encode a bit frame',
      disabled: false,
      url: ['/', 'hamming', 'transmitter'],
    },
    {
      title: 'Receiver',
      description: 'Decode a Bit frame',
      disabled: false,
      url: ['/', 'hamming', 'receiver'],
    },
  ];

  constructor() {}

  ngOnInit() {}
}
