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
  public phasorChart: any;

  // Values on screen
  public bitsQTruthTable = [];
  public bitsITruthTable = [];
  public outAmplitudeQ = [];
  public outAmplitudeI = [];
  public outTable = [];
  public numModulationType = 0;

  // Flags
  public isTableReady = false;

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
      numraRandSymbols: new FormControl(4, [
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

    // Separa en Q e I cada símbolo del vector total.
    const qiVector = [];
    for (const item of symbolsVector) {
      const qVector = item.slice(0, item.length / 2);
      const iVector = item.slice(item.length / 2, item.length + 1);
      qiVector.push([qVector, iVector]);
    }

    // Crea la tabla de amplitudes con la que se hará la multiplexación. Se
    // calcula teniendo en cuenta la amplitud mínima unitaria calculada.
    const maxAmplitude = this.modulationForm.get('amplitude').value;
    const unitValue =
      (maxAmplitude * Math.SQRT1_2) / (2 ** (bitsPerSymbol / 2) - 1);

    const amplitudesVectorQ = [];
    const amplitudesVectorI = [];

    const datosTotales = 2 ** (bitsPerSymbol / 2);
    for (let i = 0; i < datosTotales; i++) {
      amplitudesVectorQ.push(unitValue * (datosTotales - (1 + 2 * i)));
      amplitudesVectorI.push(unitValue * (1 + 2 * i - datosTotales));
    }

    // Crea las tablas de verdad para el conversor ADC y de la salida.
    this.createTruthTables(amplitudesVectorQ, amplitudesVectorI);

    // Crea el vector de señales seno y coseno con las cuales se hará la
    // multiplexación.
    const stopTime =
      this.modulationForm.get('timeUnit').value /
      this.modulationForm.get('symbolRate').value;
    const carrierFreq = this.modulationForm.get('carrierFreq').value;
    const numMuestrasPorSymbol =
      100 * (carrierFreq / this.modulationForm.get('symbolRate').value);

    const vectorTiempo = this.linspace(
      0,
      stopTime,
      numMuestrasPorSymbol,
      false
    );
    const vectorSeno = [];
    const vectorCoseno = [];

    for (let i = 0; i < numMuestrasPorSymbol; i++) {
      vectorSeno.push(
        Math.sin(
          2 *
            Math.PI *
            carrierFreq *
            (vectorTiempo[i] / this.modulationForm.get('timeUnit').value)
        )
      );
      vectorCoseno.push(
        Math.sin(
          2 *
            Math.PI *
            carrierFreq *
            (vectorTiempo[i] / this.modulationForm.get('timeUnit').value) +
            Math.PI / 2
        )
      );
    }

    // Multiplexa cada Q e I y retorna un vector con el valor de las amplitudes
    // correspondientes.
    const multiplexVector = [];
    for (const item of qiVector) {
      // Halla el valor decimal de lo contenido en Q e I.
      const qAmplitude = amplitudesVectorQ[parseInt(item[0].join(''), 2)];
      const iAmplitude = amplitudesVectorI[parseInt(item[1].join(''), 2)];
      multiplexVector.push([qAmplitude, iAmplitude]);
    }

    const vectorSuma = [];
    for (const item of multiplexVector) {
      const nuevoCoseno = vectorCoseno.map((value) => value * item[0]);
      const nuevoSeno = vectorSeno.map((value) => value * item[1]);

      vectorSuma.push(nuevoCoseno.map((value, i) => value + nuevoSeno[i]));
    }

    let vectorTotal = [];
    for (const item of vectorSuma) {
      vectorTotal = vectorTotal.concat(item);
    }

    this.createSineWaveChart(vectorTotal);
    this.createPhasorChart(multiplexVector);
  }

  // Toma un array de bits y lo descompone en vectores más pequeño del tamaño
  // pedido.
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
          message: `Your message must contain at least ${bits} bits or a
            multiple of it. Your message will be errased!`,
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

  // Creación del vector con símbolos random. El vector de resultado lo
  // formatea para luego ponerlo en el BitFrame.
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
          message: `The carrier frequency must be al least twice the baud rate.
           Your message will be errased!`,
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

  // Crea la gráfica de los datos modulados en tiempo.
  createSineWaveChart(vectorIn) {
    if (this.sineWaveChart) {
      this.sineWaveChart.destroy();
    }

    vectorIn.push(vectorIn.slice(-1)[0]);

    const numSymbols =
      this.modulationForm.get('bitFrame').value.length / this.bitsPerSymbol();

    const stopTime =
      (this.modulationForm.get('timeUnit').value /
        this.modulationForm.get('symbolRate').value) *
      numSymbols;
    const carrierFreq = this.modulationForm.get('carrierFreq').value;
    const numMuestras =
      100 *
        (carrierFreq / this.modulationForm.get('symbolRate').value) *
        numSymbols +
      1;
    const arraytTiempo = this.linspace(0, stopTime, numMuestras, true);

    // Data de la gráfica
    const data = {
      labels: arraytTiempo,
      datasets: [
        {
          label: 'Modulated Signal',
          data: vectorIn,
          fill: false,
          pointRadius: 0,
          borderColor: '#3880ff',
          backgroundColor: '#4c8dff',
        },
      ],
    };
    this.sineWaveChart = new Chart('sineWaveChart', {
      type: 'line',
      data,
      options: {
        responsive: true,
        interaction: {
          intersect: false,
          axis: 'x',
        },
        scales: {
          x: {
            title: {
              display: true,
              text: `Time (${
                this.timeUnits.find(
                  ({ value }) =>
                    value === this.modulationForm.get('timeUnit').value
                ).text
              })`,
            },
          },
          y: {
            title: {
              display: true,
              text: 'Amplitude (V)',
            },
          },
        },
      },
    });
  }

  createPhasorChart(dataVector) {
    if (this.phasorChart) {
      this.phasorChart.destroy();
    }

    dataVector = dataVector.map((item) => item.reverse());

    this.phasorChart = new Chart('phasorChart', {
      type: 'scatter',
      data: {
        datasets: [
          {
            label: 'Phasor Chart',
            data: dataVector,
            borderColor: '#3880ff',
            backgroundColor: '#4c8dff',
          },
        ],
      },
      options: {
        responsive: true,
        interaction: {
          intersect: false,
          axis: 'x',
        },
        scales: {
          x: {
            type: 'linear',
            title: {
              display: true,
              text: 'I',
            },
          },
          y: {
            type: 'linear',
            title: {
              display: true,
              text: 'Q',
            },
          },
        },
        aspectRatio: 1,
      },
    });
  }

  createTruthTables(vectorQ, vectorI) {
    this.isTableReady = true;
    const bitsPerSymbol = this.bitsPerSymbol();
    this.numModulationType = 2 ** bitsPerSymbol;

    this.bitsQTruthTable = [];
    this.bitsITruthTable = [];
    this.outAmplitudeQ = [];
    this.outAmplitudeI = [];
    this.outTable = [];

    for (let i = 0; i < bitsPerSymbol / 2; i++) {
      this.bitsQTruthTable.push(`Q${bitsPerSymbol / 2 - i} `);
      this.bitsITruthTable.push(`I${bitsPerSymbol / 2 - i} `);
    }

    for (let i = 0; i < 2 ** (bitsPerSymbol / 2); i++) {
      this.outAmplitudeQ[i] = [i.toString(2), vectorQ[i].toFixed(4)];
      this.outAmplitudeI[i] = [i.toString(2), vectorI[i].toFixed(4)];
    }

    let contador = 0;
    for (const valueQ of vectorQ) {
      for (const valueI of vectorI) {
        const index = contador.toString(2);
        const magnitude = Math.sqrt(valueQ ** 2 + valueI ** 2).toFixed(4);
        const angle = ((Math.atan2(valueQ, valueI) * 180) / Math.PI).toFixed(4);
        this.outTable.push([index, magnitude, angle]);
        contador++;
      }
    }
  }
}
