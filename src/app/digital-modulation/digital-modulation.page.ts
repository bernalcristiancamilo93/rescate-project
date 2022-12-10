import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-digital-modulation',
  templateUrl: './digital-modulation.page.html',
  styleUrls: ['./digital-modulation.page.scss'],
})
export class DigitalModulationPage implements OnInit {
  // Forms
  public modulationForm: FormGroup;

  // Chart element
  public sineWaveChart: any;

  // Selector de datos
  public modulationTypes = [
    {
      label: '1024 QAM',
      value: '1024qam',
      numBits: 10,
    },
    {
      label: '256 QAM',
      value: '256qam',
      numBits: 8,
    },
    {
      label: '64 QAM',
      value: '64qam',
      numBits: 6,
    },
    {
      label: '16 QAM',
      value: '16qam',
      numBits: 4,
    },
  ];

  // Vectores con datos
  public timeUnits = [
    {
      label: 'Seconds (s)',
      value: 1,
      text: 's',
    },
    {
      label: 'Miliseconds (ms)',
      value: 1e3,
      text: 'ms',
    },
    {
      label: 'Microseconds (us)',
      value: 1e6,
      text: 'us',
    },
    {
      label: 'Nanoseconds (ns)',
      value: 1e9,
      text: 'ns',
    },
  ];

  constructor(private alertCtrl: AlertController) {}

  ngOnInit() {
    this.modulationForm = new FormGroup({
      modulationType: new FormControl(null, Validators.required),
      bitFrame: new FormControl(null, Validators.required),
      symbolRate: new FormControl(9600, [
        Validators.required,
        Validators.min(1),
      ]),
      amplitude: new FormControl(1.161, [
        Validators.required,
        Validators.min(1),
      ]),
      timeUnit: new FormControl(1e3, Validators.required),
      numraRandSymbols: new FormControl(2, [
        Validators.required,
        Validators.min(1),
      ]),
      carrierFreq: new FormControl(19200, [
        Validators.required,
        Validators.min(1),
      ]),
    });
  }

  // Hace el cálculo de modulación según el esquema escogido
  calculate() {
    const bitsPerSymbol = this.bitsPerSymbol();
    // Separar el vector de entrada en bloques del tamaño de cada símbolo
    const symbolsVector = this.formatInput(
      this.getRawMessage(),
      this.bitsPerSymbol()
    );
    // console.log('symbolsVector', symbolsVector);

    // Separa en Q e I cada símbolo del vector total.
    const qiVector = [];
    for (const item of symbolsVector) {
      const qVector = item.slice(0, item.length / 2);
      const iVector = item.slice(item.length / 2, item.length + 1);
      qiVector.push([qVector, iVector]);
    }
    // console.log('qiVector', qiVector);

    // Crea la tabla de amplitudes con la que se hará la multiplexación. Se
    // calcula teniendo en cuenta la amplitud mínima unitaria calculada.
    const maxAmplitude = this.modulationForm.get('amplitude').value;
    const unitValue =
      (maxAmplitude * Math.SQRT1_2) / (2 ** (bitsPerSymbol / 2) - 1);

    // console.log(unitValue);

    const amplitudesVectorQ = [];
    const amplitudesVectorI = [];

    const datosTotales = 2 ** (bitsPerSymbol / 2);
    for (let i = 0; i < datosTotales; i++) {
      amplitudesVectorQ.push(unitValue * (datosTotales - (1 + 2 * i)));
      amplitudesVectorI.push(unitValue * (1 + 2 * i - datosTotales));
    }
    console.log(amplitudesVectorQ);
    // console.log(amplitudesVectorI);

    // Multiplexa cada Q e I y retorna un vector con el valor de las amplitudes
    // correspondientes.
    const multiplexVector = [];
    for (const item of qiVector) {
      // Halla el valor decimal de lo contenido en Q e I.
      const qAmplitude =
        amplitudesVectorQ[parseInt(item[0].toString().replace(/,/g, ''), 2)];
      const iAmplitude =
        amplitudesVectorI[parseInt(item[1].toString().replace(/,/g, ''), 2)];
      multiplexVector.push([qAmplitude, iAmplitude]);
    }
    console.log('multiplexVector', multiplexVector);
  }

  // Toma un array de bits y lo descompone en vectores más pequeño del tamaño pedido
  formatInput(message: string, numBits: number) {
    const messageVector = message.split('');
    const result = [];

    for (let i = 0; i < messageVector.length; i += numBits) {
      result.push(messageVector.slice(i, i + numBits));
    }
    return result;
  }

  // Función que crea un evenly spaced vector.
  linspace(start, stop, num, endpoint = true) {
    const div = endpoint ? num - 1 : num;
    const step = (stop - start) / div;
    return Array.from({ length: num }, (_, i) => start + step * i);
  }

  // Garantiza que la entrada sea un binario. Si no, emite un alert y borra lo
  // que hay en el input. Hace que la info en pantalla se deje de mostrar.
  checkIfBinary() {
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
              .then(() => this.modulationForm.get('bitFrame').patchValue(null));
          });
      }
    }
  }

  checkIfCorrect() {
    const message = this.getRawMessage();
    const bits = this.bitsPerSymbol();

    if (!message) {
      return;
    }

    if (message.length % bits !== 0) {
      this.alertCtrl
        .create({
          header: 'Invalid bit amount on Message!',
          message: `Your message must contain at least ${bits} bits or a multiple of it. Your
            message will be errased!`,
          buttons: ['Okay'],
        })
        .then((alertElement) => {
          alertElement.present();
          alertElement
            .onWillDismiss()
            .then(() => this.modulationForm.get('bitFrame').patchValue(null));
        });
    }
  }

  // Retorna el mensaje original.
  getRawMessage() {
    return this.modulationForm.get('bitFrame').value;
  }

  // Retorna el bits para el método de modulación seleccionado.
  bitsPerSymbol() {
    return this.modulationTypes.find(
      ({ value }) => value === this.modulationForm.get('modulationType').value
    ).numBits;
  }

  // Creación del vector con símbolos random. El vector de resultado lo formatea
  // para luego ponerlo en el BitFrame.
  generateRandomBitFrame() {
    const numSymbols = this.modulationForm.get('numraRandSymbols').value;

    const vector = [];
    for (let i = 0; i < numSymbols * this.bitsPerSymbol(); i++) {
      vector.push(Math.round(Math.random()));
    }

    this.modulationForm
      .get('bitFrame')
      .patchValue(vector.toString().replace(/,/g, ''));
  }

  checkFreq() {
    const baudRate = this.modulationForm.get('symbolRate').value;
    const carrierFreq = this.modulationForm.get('carrierFreq').value;

    if (!carrierFreq) {
      return;
    }

    if (carrierFreq < 2 * baudRate) {
      this.alertCtrl
        .create({
          header: 'Invalid carrier frequency!',
          message: `The carrier frequency must be al least twice the baud rate. Your
          message will be errased!`,
          buttons: ['Okay'],
        })
        .then((alertElement) => {
          alertElement.present();
          alertElement
            .onWillDismiss()
            .then(() =>
              this.modulationForm.get('carrierFreq').patchValue(null)
            );
        });
    }
  }
}
