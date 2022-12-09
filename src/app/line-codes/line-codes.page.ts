import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-line-codes',
  templateUrl: './line-codes.page.html',
  styleUrls: ['./line-codes.page.scss'],
})
export class LineCodesPage implements OnInit {
  // Forms
  public encodingForm: FormGroup;

  // Chart elements
  public clockChart: any;
  public rawDataChart: any;
  public encodedDataChart: any;

  // Selector values
  public encoders = [
    {
      label: 'Bipolar NRZ',
      value: 'BNRZ',
      disabled: false,
    },
    {
      label: 'Bipolar RZ',
      value: 'BRZ',
      disabled: false,
    },
    {
      label: 'AMI NRZ',
      value: 'AMINRZ',
      disabled: false,
    },
    {
      label: 'AMI RZ',
      value: 'AMIRZ',
      disabled: false,
    },
    {
      label: 'OG Manchester',
      value: 'OGManchester',
      disabled: false,
    },
    {
      label: 'Manchester IEEE 802.3',
      value: 'ManchesterIEEE',
      disabled: false,
    },
    {
      label: 'Differential Manchester',
      value: 'ManchesterDif',
      disabled: false,
    },
    {
      label: 'CMI',
      value: 'CMI',
      disabled: false,
    },
    {
      label: ' AMI NRZ With B8ZS',
      value: 'B8ZS',
      disabled: false,
    },
    {
      label: ' AMI NRZ With B6ZS',
      value: 'B6ZS',
      disabled: false,
    },
    {
      label: ' AMI NRZ With B3ZS',
      value: 'B3ZS',
      disabled: false,
    },
  ];

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

  // Vectores de reemplazo
  public b8zsPositive = ['0', '0', '0', '1', '-1', '0', '-1', '1'];
  public b8zsNegative = ['0', '0', '0', '-1', '1', '0', '1', '-1'];
  public b6zsPositive = ['0', '1', '-1', '0', '-1', '1'];
  public b6zsNegative = ['0', '-1', '1', '0', '1', '-1'];
  public b3zsPositiveEven = ['-1', '0', '-1'];
  public b3zsNegativeEven = ['1', '0', '1'];
  public b3zsPositiveOdd = ['0', '0', '1'];
  public b3zsNegativeOdd = ['0', '0', '-1'];

  constructor(private alertCtrl: AlertController) {}

  ngOnInit() {
    this.encodingForm = new FormGroup({
      bitStream: new FormControl(null, Validators.required),
      numRandBits: new FormControl(8, [Validators.required, Validators.min(1)]),
      encondingType: new FormControl(null, Validators.required),
      lastBit: new FormControl('-1', Validators.required),
      txRate: new FormControl(1000, [Validators.required, Validators.min(1)]),
      timeUnit: new FormControl(1000, Validators.required),
      amplitude: new FormControl(1, [Validators.required, Validators.min(1)]),
    });
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
              .then(() => this.encodingForm.get('bitStream').patchValue(null));
          });
      }
    }
  }

  // Retorna el mensaje original.
  getRawMessage() {
    return this.encodingForm.get('bitStream').value;
  }

  // Creación del vector con bits random. El vector de resultado lo formatea
  // para luego ponerlo en el BitStream.
  generateRandomBitStream() {
    const numBits = this.encodingForm.get('numRandBits').value;

    const vector = [];
    for (let i = 0; i < numBits; i++) {
      vector.push(Math.round(Math.random()));
    }

    this.encodingForm
      .get('bitStream')
      .patchValue(vector.toString().replace(/,/g, ''));
  }

  // Hace el cálculo de lo que necesita ser representado en pantalla para cada código de línea
  calculate() {
    this.createClockChart();
    this.createRawDataChart();
    this.createEncondedDataChart(this.encodingForm.get('encondingType').value);
  }

  // Crea la gráfica para los datos codificados
  createEncondedDataChart(typeChart) {
    const numBitsMessage = this.encodingForm.get('bitStream').value.length;
    const timeTxRate =
      this.encodingForm.get('timeUnit').value /
      this.encodingForm.get('txRate').value;

    let multiplicador;
    if (
      typeChart === 'BNRZ' ||
      typeChart === 'AMINRZ' ||
      typeChart === 'B8ZS' ||
      typeChart === 'B6ZS' ||
      typeChart === 'B3ZS'
    ) {
      multiplicador = 1;
    } else if (
      typeChart === 'BRZ' ||
      typeChart === 'AMIRZ' ||
      typeChart === 'OGManchester' ||
      typeChart === 'ManchesterIEEE' ||
      typeChart === 'ManchesterDif' ||
      typeChart === 'CMI'
    ) {
      multiplicador = 2;
    }

    // Crea el vector de tiempo
    const timeArray = this.linspace(
      0,
      timeTxRate * numBitsMessage,
      numBitsMessage * multiplicador + 1,
      true
    );

    const rawData = this.encodingForm.get('bitStream').value.split('');
    const amplitud = this.encodingForm.get('amplitude').value;

    const encodedData = [];

    if (typeChart === 'BNRZ') {
      // Si el dato es un 1, pone un voltaje positivo.
      // Si el dato es un 0, pone un voltaje negativo.
      for (const item of rawData) {
        if (item === '1') {
          encodedData.push(amplitud);
        } else {
          encodedData.push(amplitud * -1);
        }
      }
    } else if (typeChart === 'BRZ') {
      // Si el dato es un 1, pone un voltaje positivo y retorna a cero.
      // Si el dato es un 0, pone un voltaje negativo y retorna a cero.
      for (const item of rawData) {
        if (item === '1') {
          encodedData.push(amplitud);
          encodedData.push('0');
        } else {
          encodedData.push(-1 * amplitud);
          encodedData.push('0');
        }
      }
    } else if (typeChart === 'AMINRZ') {
      // Si el dato es un 1, el resultado depende de la marca anterior.
      // Si el dato es un 0, se deja como 0.
      let lastMark = this.encodingForm.get('lastBit').value;
      for (const item of rawData) {
        if (item === '1' && lastMark === '1') {
          encodedData.push(amplitud * -1);
          lastMark = '-1';
        } else if (item === '1' && lastMark === '-1') {
          encodedData.push(amplitud);
          lastMark = '1';
        } else {
          encodedData.push('0');
        }
      }
    } else if (typeChart === 'AMIRZ') {
      // Si el dato es un 1, el resultado depende de la marca anterior y
      // retorna a cero.
      // Si el dato es un 0, se deja como 0.
      let lastMark = this.encodingForm.get('lastBit').value;
      for (const item of rawData) {
        if (item === '1' && lastMark === '1') {
          encodedData.push(-1 * amplitud);
          encodedData.push('0');
          lastMark = '-1';
        } else if (item === '1' && lastMark === '-1') {
          encodedData.push(amplitud);
          encodedData.push('0');
          lastMark = '1';
        } else {
          encodedData.push('0');
          encodedData.push('0');
        }
      }
    } else if (typeChart === 'OGManchester') {
      // Si el dato es un 1, hay cambio de Alto a Bajo a mitad del CLK.
      // Si el dato es un 0, hay cambio de Bajo a Alto a mitad del CLK.
      for (const item of rawData) {
        if (item === '1') {
          encodedData.push(1 * amplitud);
          encodedData.push(-1 * amplitud);
        } else {
          encodedData.push(-1 * amplitud);
          encodedData.push(1 * amplitud);
        }
      }
    } else if (typeChart === 'ManchesterIEEE') {
      // Si el dato es un 1, hay cambio de Bajo a Alto a mitad del CLK.
      // Si el dato es un 0, hay cambio de Alto a Bajo a mitad del CLK.
      for (const item of rawData) {
        if (item === '1') {
          encodedData.push(-1 * amplitud);
          encodedData.push(1 * amplitud);
        } else {
          encodedData.push(1 * amplitud);
          encodedData.push(-1 * amplitud);
        }
      }
    } else if (typeChart === 'ManchesterDif') {
      // Si el dato es un 1, hay cambio a mitad del CLK.
      // Si el dato es un 0, hay cambio al inicio del CLK.
      let datoAnterior = this.encodingForm.get('lastBit').value;
      for (const item of rawData) {
        if (item === '1' && datoAnterior === '-1') {
          encodedData.push(-1 * amplitud);
          encodedData.push(1 * amplitud);
          datoAnterior = '1';
        } else if (item === '1' && datoAnterior === '1') {
          encodedData.push(1 * amplitud);
          encodedData.push(-1 * amplitud);
          datoAnterior = '-1';
        } else if (item === '0' && datoAnterior === '-1') {
          encodedData.push(1 * amplitud);
          encodedData.push(-1 * amplitud);
          datoAnterior = '-1';
        } else if (item === '0' && datoAnterior === '1') {
          encodedData.push(-1 * amplitud);
          encodedData.push(1 * amplitud);
          datoAnterior = '1';
        }
      }
    } else if (typeChart === 'CMI') {
      // Si el dato es un 1, se invierte la marca.
      // Si el dato es un 0, hay cambio de Bajo a Alto a mitad del CLK.
      let lastMark = this.encodingForm.get('lastBit').value;
      for (const item of rawData) {
        if (item === '1' && lastMark === '1') {
          encodedData.push(-1 * amplitud);
          encodedData.push(-1 * amplitud);
          lastMark = '-1';
        } else if (item === '1' && lastMark === '-1') {
          encodedData.push(1 * amplitud);
          encodedData.push(1 * amplitud);
          lastMark = '1';
        } else {
          encodedData.push(-1 * amplitud);
          encodedData.push(1 * amplitud);
        }
      }
    } else if (typeChart === 'B8ZS') {
      // Funciona como AMINRZ.
      // Si hay ocho ceros seguidos, esa secuencia se reemplaza por una cadena
      // diferente que produce varias violaciones en las marcas.
      let lastMark = this.encodingForm.get('lastBit').value;
      let cantCeros = 0;
      for (const item of rawData) {
        if (item === '1' && lastMark === '1') {
          encodedData.push(-1 * amplitud);
          lastMark = '-1';
        } else if (item === '1' && lastMark === '-1') {
          encodedData.push(1 * amplitud);
          lastMark = '1';
        } else {
          encodedData.push('0');
        }

        // Lleva cuenta de la cantidad de ceros.
        if (item === '0') {
          cantCeros++;
        } else {
          cantCeros = 0;
        }

        // Si la cantidad de ceros es de ocho, reemplaza los últimos ocho
        // bits con la cadena, dependiendo de la marca anterior.
        if (cantCeros >= 8) {
          for (let i = 0; i < 8; i++) {
            encodedData.pop();
          }
          if (lastMark === '1') {
            for (const elemento of this.b8zsPositive) {
              encodedData.push(+elemento * amplitud);
            }
          } else {
            for (const elemento of this.b8zsNegative) {
              encodedData.push(+elemento * amplitud);
            }
          }
          cantCeros = 0;
        }
      }
    } else if (typeChart === 'B6ZS') {
      // Funciona como AMINRZ.
      // Si hay seis ceros seguidos, esa secuencia se reemplaza por una cadena
      // diferente que produce varias violaciones en las marcas.
      let lastMark = this.encodingForm.get('lastBit').value;
      let cantCeros = 0;
      for (const item of rawData) {
        if (item === '1' && lastMark === '1') {
          encodedData.push(-1 * amplitud);
          lastMark = '-1';
        } else if (item === '1' && lastMark === '-1') {
          encodedData.push(1 * amplitud);
          lastMark = '1';
        } else {
          encodedData.push('0');
        }

        // Lleva cuenta de la cantidad de ceros.
        if (item === '0') {
          cantCeros++;
        } else {
          cantCeros = 0;
        }

        // Si la cantidad de ceros es de seis, reemplaza los últimos seis
        // bits con la cadena, dependiendo de la marca anterior.
        if (cantCeros >= 6) {
          for (let i = 0; i < 6; i++) {
            encodedData.pop();
          }
          if (lastMark === '1') {
            for (const elemento of this.b6zsPositive) {
              encodedData.push(+elemento * amplitud);
            }
          } else {
            for (const elemento of this.b6zsNegative) {
              encodedData.push(+elemento * amplitud);
            }
          }
          cantCeros = 0;
        }
      }
    } else if (typeChart === 'B3ZS') {
      // Funciona como AMINRZ.
      // Si hay seis tres seguidos, esa secuencia se reemplaza por una cadena
      // diferente que produce varias violaciones en las marcas.
      let lastMark = this.encodingForm.get('lastBit').value;
      let cantCeros = 0;
      let cantMarcas = 0;
      for (const item of rawData) {
        if (item === '1' && lastMark === '1') {
          encodedData.push(-1 * amplitud);
          lastMark = '-1';
          cantMarcas++;
        } else if (item === '1' && lastMark === '-1') {
          encodedData.push(1 * amplitud);
          lastMark = '1';
          cantMarcas++;
        } else {
          encodedData.push('0');
        }

        // Lleva cuenta de la cantidad de ceros.
        if (item === '0') {
          cantCeros++;
        } else {
          cantCeros = 0;
        }

        // Si la cantidad de ceros es de tres, reemplaza los últimos tres
        // bits con la cadena, dependiendo de la marca anterior y su cantidad.
        if (cantCeros >= 3) {
          for (let i = 0; i < 3; i++) {
            encodedData.pop();
          }
          if (lastMark === '1' && cantMarcas % 2 === 0) {
            for (const elemento of this.b3zsPositiveEven) {
              encodedData.push(+elemento * amplitud);
            }
          } else if (lastMark === '1' && cantMarcas % 2 === 1) {
            for (const elemento of this.b3zsPositiveOdd) {
              encodedData.push(+elemento * amplitud);
            }
          } else if (lastMark === '-1' && cantMarcas % 2 === 0) {
            for (const elemento of this.b3zsNegativeEven) {
              encodedData.push(+elemento * amplitud);
            }
          } else if (lastMark === '-1' && cantMarcas % 2 === 1) {
            for (const elemento of this.b3zsNegativeOdd) {
              encodedData.push(+elemento * amplitud);
            }
          }
          cantCeros = 0;
          cantMarcas = 0;
        }
      }
    }

    encodedData.push(encodedData.slice(-1)[0]);

    if (this.encodedDataChart) {
      this.encodedDataChart.destroy();
    }

    // Data de la gráfica
    const data = {
      labels: timeArray,
      datasets: [
        {
          label: 'Encoded Data',
          data: encodedData,
          fill: false,
          stepped: true,
          pointRadius: 0,
          borderColor: '#3880ff',
          backgroundColor: '#4c8dff',
        },
      ],
    };

    this.encodedDataChart = new Chart('encodedDataChart', {
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
                    value === this.encodingForm.get('timeUnit').value
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

  // Crea la gráfica de los datos sin codificar
  createRawDataChart() {
    const numBitsMessage = this.encodingForm.get('bitStream').value.length;
    const timeTxRate =
      this.encodingForm.get('timeUnit').value /
      this.encodingForm.get('txRate').value;

    // Crea el vector de tiempo
    const timeArray = this.linspace(
      0,
      timeTxRate * numBitsMessage,
      numBitsMessage + 1,
      true
    );

    const rawData = this.encodingForm.get('bitStream').value.split('');
    rawData.push(rawData.slice(-1)[0]);

    const rawDataScaled = [];

    rawData.forEach((item) => rawDataScaled.push(+item * 5));

    if (this.rawDataChart) {
      this.rawDataChart.destroy();
    }

    // Data de la gráfica
    const data = {
      labels: timeArray,
      datasets: [
        {
          label: 'Data',
          data: rawDataScaled,
          fill: false,
          stepped: true,
          pointRadius: 0,
          borderColor: '#3880ff',
          backgroundColor: '#4c8dff',
        },
      ],
    };

    this.rawDataChart = new Chart('rawDataChart', {
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
                    value === this.encodingForm.get('timeUnit').value
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

  // Crea la gráfica del Clock
  createClockChart() {
    const numBitsMessage = this.encodingForm.get('bitStream').value.length;
    const timeTxRate =
      this.encodingForm.get('timeUnit').value /
      this.encodingForm.get('txRate').value;

    // Crea el vector de tiempo
    const timeArray = this.linspace(
      0,
      timeTxRate * numBitsMessage,
      numBitsMessage * 2 + 1,
      true
    );

    // Crea el vector con la info del clk
    const clkSignal = [];
    timeArray.forEach(() => {
      clkSignal.push(0);
      clkSignal.push(1);
    });

    if (this.clockChart) {
      this.clockChart.destroy();
    }

    // Data de la gráfica
    const data = {
      labels: timeArray,
      datasets: [
        {
          label: 'Clock',
          data: clkSignal,
          fill: false,
          stepped: true,
          pointRadius: 0,
          borderColor: '#3880ff',
          backgroundColor: '#4c8dff',
        },
      ],
    };

    this.clockChart = new Chart('clockChart', {
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
                    value === this.encodingForm.get('timeUnit').value
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

  // Función que crea un evenly spaced vector.
  linspace(start, stop, num, endpoint = true) {
    const div = endpoint ? num - 1 : num;
    const step = (stop - start) / div;
    return Array.from({ length: num }, (_, i) => start + step * i);
  }
}
