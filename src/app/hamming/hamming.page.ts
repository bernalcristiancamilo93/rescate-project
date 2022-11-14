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
  // Forms
  public codificarForm: FormGroup;
  public decodificarForm: FormGroup;

  // Data
  public bitsTxData = [];
  public bitsRxData = [];
  public hValue = [];
  public hammingArray = [];
  public posHammingBits = [];
  public posHammingBitsBinary = [];
  public onesRx = [];
  public onesRxBinary = [];
  public errorPos = 0;
  public errorPosBin = [];
  public errorMsg = '';

  // Flags
  public isHammingTxCalculated = false;
  public isHammingRxCalculated = false;

  constructor(private alertCtrl: AlertController) {}

  ngOnInit() {
    this.codificarForm = new FormGroup({
      message: new FormControl(null, Validators.required),
    });
    this.decodificarForm = new FormGroup({
      message: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  // Codifica una secuencia de bits usando Hamming.
  calculateTxHamming() {
    const message = this.formatMessage(this.getRawMessage('tx'));
    const numH = this.calculateNumParityBits(message);

    const data = this.createDataArray(message, numH);
    this.bitsTxData = data;
    const onesArray = this.findOnes(data);
    this.posHammingBits = onesArray;
    const arrayH = this.calculateXOR(onesArray, numH);
    this.hValue = arrayH;
    const finalData = this.replaceH(data, arrayH);
    this.hammingArray = finalData;

    this.convertDecToBin();

    this.isHammingTxCalculated = true;

    // console.log('Vector total con H:', data);
    // console.log('Posiciones de los 1:', onesArray);
    // console.log('Vector H calculado:', arrayH);
    // console.log('Vector final:', finalData);
  }

  // Convierte el vector de 1s de Dec a Bin
  convertDecToBin() {
    for (const num of this.posHammingBits) {
      this.posHammingBitsBinary.push((num >>> 0).toString(2).split(''));
    }
    this.posHammingBitsBinary.reverse();
  }

  // Crea el vector final, reemplazando las H por el valor correspondiente.
  replaceH(data, arrayH) {
    let i = 0;
    return data.map((item) => {
      if (item === 'H') {
        i++;
        return arrayH[i - 1];
      } else {
        return item;
      }
    });
  }

  // Calcula el resultado de la XOR para todas las posciones que eran 1.
  calculateXOR(array, numH) {
    let xor;

    // Hace la XOR sucesiva con las posciones de todos los 1.
    for (const num of array) {
      xor ^= num;
    }

    // Convierte el valor de decimal a binario y lo formatea a string.
    const value = (xor >>> 0).toString(2).split('').reverse();

    // Revisa que el vector tenga la longitud completa
    const originalSize = value.length;
    if (value.length !== numH) {
      for (let i = 0; i < numH; i++) {
        value.push('0');
      }
      for (let i = 0; i < originalSize; i++) {
        value.pop();
      }
    }

    return value;
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

  // Crea el array completo de datos y bits de paridad pero no lo calcula.
  createDataArray(message, numH) {
    const data = [];
    let posH = 0;
    let posM = 0;

    for (let i = 1; i < message.length + numH + 1; i++) {
      if (i === 2 ** posH) {
        data.push('H');
        posH++;
      } else {
        data.push(message[posM]);
        posM++;
      }
    }
    return data;
  }

  // Calcula la cantidad de bits de paridad necesarios.
  calculateNumParityBits(message) {
    for (let i = 0; i <= message.length + 1; i++) {
      if (2 ** i >= message.length + i + 1) {
        return i;
      }
    }
  }

  // Formatea el mensaje en un vector, dejando el LSB en la pos 0 del vector.
  formatMessage(message) {
    return message.split('').reverse();
  }

  // Retorna el mensaje original.
  getRawMessage(data) {
    if (data === 'tx') {
      return this.codificarForm.get('message').value;
    } else if (data === 'rx') {
      return this.decodificarForm.get('message').value;
    }
  }

  // Garantiza que la entrada sea un binario. Si no, emite un alert y borra lo
  // que hay en el input. Hace que la info en pantalla se deje de mostrar.
  checkIfBinary(data) {
    if (data === 'tx') {
      this.isHammingTxCalculated = false;
    } else if (data === 'rx') {
      this.isHammingRxCalculated = false;
    }
    const message = this.getRawMessage(data);

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
            alertElement.onWillDismiss().then(() => {
              if (data === 'tx') {
                this.codificarForm.get('message').patchValue(null);
              } else if (data === 'rx') {
                this.decodificarForm.get('message').patchValue(null);
              }
            });
          });
      }
    }
  }

  // Verifica si hay errores en la recepción
  calculateRxHamming() {
    this.alertCtrl
      .create({
        header: 'Read before continuing!',
        message:
          'Keep in mind that Hamming Codes only check one-bit errors!',
        buttons: ['Okay'],
      })
      .then((alertElement) => {
        alertElement.present();
        alertElement.onDidDismiss().then(() => {
          const message = this.formatMessage(this.getRawMessage('rx'));
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

          this.errorPosBin = (this.errorPos >>> 0).toString(2).split('').reverse();

          this.isHammingRxCalculated = true;
        });
      });
  }
}
