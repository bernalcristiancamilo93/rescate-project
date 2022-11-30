import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-line-codes',
  templateUrl: './line-codes.page.html',
  styleUrls: ['./line-codes.page.scss'],
})
export class LineCodesPage implements OnInit {
  // Forms
  public encodingForm: FormGroup;

  // Selector values
  public encoders = [
    {
      label: 'NRZ',
      value: 'NRZ',
      disabled: false,
    },
    {
      label: 'AMI NRZ',
      value: 'AMI NRZ',
      disabled: false,
    },
    {
      label: 'AMI RZ',
      value: 'AMI RZ',
      disabled: false,
    },
    {
      label: 'Manchester',
      value: 'Manchester',
      disabled: false,
    },
    {
      label: 'B8ZS',
      value: 'B8ZS',
      disabled: false,
    },
  ];

  constructor() {}

  ngOnInit() {
    this.encodingForm = new FormGroup({
      bitStream: new FormControl(null, Validators.required),
      numRandBits: new FormControl(8, [Validators.required, Validators.min(1)]),
      encondingType: new FormControl(null, Validators.required),
      lastBit: new FormControl('0', Validators.required),
      txRate: new FormControl(1000, [Validators.required, Validators.min(1)]),
      amplitude: new FormControl(1, [Validators.required, Validators.min(1)]),
    });
  }
}
