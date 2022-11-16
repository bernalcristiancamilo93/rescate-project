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
  public pages = [
    {
      title: 'Transmitter',
      description: 'Card description',
      disabled: false,
      url: ['/', 'hamming', 'transmitter'],
    },
    {
      title: 'Receiver',
      description: 'Card description',
      disabled: false,
      url: ['/', 'hamming', 'receiver'],
    },
  ];

  constructor() {}

  ngOnInit() {}
}
