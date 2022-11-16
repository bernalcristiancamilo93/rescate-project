/* eslint-disable no-bitwise */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-receiver',
  templateUrl: './receiver.page.html',
  styleUrls: ['./receiver.page.scss'],
})
export class ReceiverPage implements OnInit {
  // Forms
  public decodificarForm: FormGroup;

  // Flags
  public isHammingRxCalculated = false;

  // Data
  public bitsRxData = [];
  public onesRx = [];
  public onesRxBinary = [];
  public errorPos = 0;
  public errorPosBin = [];
  public errorMsg = '';

  constructor(private alertCtrl: AlertController) {}

  ngOnInit() {
    this.decodificarForm = new FormGroup({
      message: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  // Garantiza que la entrada sea un binario. Si no, emite un alert y borra lo
  // que hay en el input. Hace que la info en pantalla se deje de mostrar.
  checkIfBinary() {
    this.isHammingRxCalculated = false;

    const message = this.getRawMessage();

    if (!message) {
      return;
    }

    for (const bit of message) {
      if (bit !== '0' && bit !== '1') {
        this.alertCtrl
          .create({
            header: 'Invalid Character on Message!',
            message: 'Your message will be errased!',
            buttons: ['Okay'],
          })
          .then((alertElement) => {
            alertElement.present();
            alertElement
              .onWillDismiss()
              .then(() => this.decodificarForm.get('message').patchValue(null));
          });
      }
    }
  }

  // Retorna el mensaje original.
  getRawMessage() {
    return this.decodificarForm.get('message').value;
  }

  // Verifica si hay errores en la recepción
  calculateRxHamming() {
    this.alertCtrl
      .create({
        header: 'Read before continuing!',
        message: 'Keep in mind that Hamming Codes only check one-bit errors!',
        buttons: ['Okay'],
      })
      .then((alertElement) => {
        alertElement.present();
        alertElement.onDidDismiss().then(() => {
          const message = this.formatMessage(this.getRawMessage());
          this.bitsRxData = message;
          const onesArray = this.findOnes(message);
          this.onesRx = onesArray;
          let xor;

          for (const num of onesArray) {
            xor ^= num;
          }
          this.errorPos = xor;

          if (this.errorPos === 0) {
            this.errorMsg = 'There was no error on transmission!';
          } else {
            this.errorMsg = `There is an error on bit ${this.errorPos}`;
          }

          for (const num of this.onesRx) {
            this.onesRxBinary.push((num >>> 0).toString(2).split(''));
          }
          this.onesRxBinary.reverse();

          this.errorPosBin = (this.errorPos >>> 0)
            .toString(2)
            .split('')
            .reverse();

          this.isHammingRxCalculated = true;
        });
      });
  }

  // Formatea el mensaje en un vector, dejando el LSB en la pos 0 del vector.
  formatMessage(message) {
    return message.split('').reverse();
  }

  // Crea un array donde se almacenan las posiciones en donde hay un 1 en el
  // vector de datos completos.
  findOnes(message) {
    const array = [];
    for (const [i, value] of message.entries()) {
      if (value === '1') {
        array.push(i + 1);
      }
    }
    return array;
  }
}
