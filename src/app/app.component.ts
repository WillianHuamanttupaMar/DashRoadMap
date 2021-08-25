import { Component, OnInit } from '@angular/core';
import { JsonService } from './json.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'DashRoadMap';
  camiones: any[] = [];
  empresas: any[] = [];
  bks: any[] = [];
  databk: any[] = [];
  months: any[] = [];
  selectP: boolean = false;


  // Preguntas e indicadores
  preguntas: any[] = [];
  provideSelect: any[] = [];
  meses: any[] = [];


  pruebatempora: any[] = [];

  constructor(public jsonService: JsonService) { }

  ngOnInit() {
    this.getData();
  }


  groupBy(objectArray: any, property: any) {
    return objectArray.reduce((acc: any, obj: any) => {
      var key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
  }

  groupByPercente(array: any) {
    const resMonth = array.reduce((a: any, data: any) => {
      a[data.preguntas] = a[data.preguntas] || { pregunta: data.preguntas, valor: 0, contador: 0, porcentaje: 0, mes: data.mes }
      a[data.preguntas].valor += data.respuesta_valor
      a[data.preguntas].contador += data.contador
      a[data.preguntas].porcentaje = (a[data.preguntas].valor * 100) / a[data.preguntas].contador;
      return a;
    }, []);

    const resultados: any = [];
    for (const key in resMonth) {
      resultados.push(resMonth[key])
    }


    resultados.sort(function (a: any, b: any) {
      return a[0] - b[0];
    });


    return resultados;
  }

  groupByTwo(array: any, key: any) {
    return Array.from(array
      .reduce((m: any, o: any) => m.set(o[key], [...(m.get(o[key]) || []), o]), new Map)
      .values()
    );
  }

  getData() {
    this.jsonService.getJson().subscribe(({ SalidaCamiones }) => {
      console.log(SalidaCamiones);
      this.camiones = SalidaCamiones;
      this.preguntas = [...new Set(this.camiones.map(c => c.preguntas))];
      this.empresas = [...new Set(this.camiones.map(c => c.empresa))];
      // const meses = [...new Set(this.camiones.map(c => c.mes))];
      // console.log(meses);

      // const unique = this.camiones.filter((set => (f:any) => !set.has(f.preguntas) && set.add(f.preguntas))(new Set));
      // console.log('hola mundo',unique);

      this.camiones = SalidaCamiones.map((temp: any) => ({ ...temp, contador: Number(temp.contador), respuesta_valor: Number(temp.respuesta_valor) }));

      //  console.log(this.camiones);

      // const res = this.camiones.reduce((a, {preguntas, contador}) => (a[preguntas] = (a[preguntas] || 0) + +contador, a), {});
      // console.log(res)


      // const temporal = SalidaCamiones.map((temp: any) => {
      //   const mes:any = {};
      //   switch (temp.mes) {
      //     case 'January':
      //       console.log('Enero',temp);
      //       break;
      //     case 'February':
      //       console.log('Febrero',temp);
      //       break;
      //     case 'March':
      //       console.log('Marzo',temp);
      //       break;
      //     case 'April':
      //       console.log('Abril',temp);
      //       break;
      //     case 'May':
      //       console.log('Mayo',temp);
      //       break;
      //     case 'June':
      //       console.log('Junio',temp);
      //       break;
      //     case 'July':
      //       console.log('Julio',temp);
      //       break;
      //     case 'August':
      //       console.log('Agosto',temp);
      //       break;
      //     case 'September':
      //       console.log('Setiembre',temp);
      //       break;
      //     case 'October':
      //       console.log('Octubre',temp);
      //       break;
      //     case 'November':
      //       console.log('Noviembre',temp);
      //       break;
      //     case 'December':
      //       console.log('Diciembre',temp);
      //       break;
      //     default:
      //         console.log('hola mudno')
      //   }

      // });



      const groupQuestions = this.groupBy(this.camiones, 'mes');
      // console.log(groupQuestions)
      // const groupQuestionsTwo = this.groupByTwo(this.camiones, 'preguntas');
      // console.log(...groupQuestionsTwo)

      const enero = groupQuestions['January'];
      // const febrero = groupQuestions['February'];
      const marzo = groupQuestions['March'];
      const abril = groupQuestions['April'];
      const mayo = groupQuestions['May'];
      const junio = groupQuestions['June'];
      const julio = groupQuestions['July'];
      const agosto = groupQuestions['August'];
      // const septiembre = groupQuestions['September'];
      // const octubre = groupQuestions['October'];
      // const noviembre = groupQuestions['November'];
      // const diciembre = groupQuestions['December'];

      console.log(enero)
      let eneroResultados
      if (enero) eneroResultados = this.groupByPercente(enero);
      // const febreroResultados = this.groupByPercente(febrero);
      const marzoResultados = this.groupByPercente(marzo);
      const abrilResultados = this.groupByPercente(abril);
      const mayoResultados = this.groupByPercente(mayo);
      const junioResultados = this.groupByPercente(junio);
      const julioResultados = this.groupByPercente(julio);
      let agostoResultados
      if (agosto) agostoResultados = this.groupByPercente(agosto);
      // const septiembreResultados = this.groupByPercente(septiembre);
      // const octubreResultados = this.groupByPercente(octubre);
      // const noviembreResultados = this.groupByPercente(noviembre);
      // const diciembreResultados = this.groupByPercente(diciembre);

      console.log(agostoResultados)

      const todos = [
        // ...eneroResultados,
        // ...febreroResultados,
        ...marzoResultados,
        ...abrilResultados,
        ...mayoResultados,
        ...junioResultados,
        ...julioResultados,
        ...agostoResultados,
        // ...septiembreResultados,
        // ...octubreResultados,
        // ...noviembreResultados,
        // ...diciembreResultados
      ];
      // console.log(abrilResultados);
      // console.log(agostoResultados);

      const temporal = this.groupBy(todos, 'pregunta');
      // console.log(temporal);

      for (const pregunta in temporal) {
        // this.pruebatempora.push({pregunta: pregunta, meses: temporal[pregunta]});
        // console.log(temporal[pregunta])
        const data = [];
        for (const key in temporal[pregunta]) {
          // console.log(temporal[pregunta][key].mes);
          data.push({ mes: temporal[pregunta][key].mes, valor: temporal[pregunta][key].valor, porcentaje: Math.round(temporal[pregunta][key].porcentaje * 100) / 100, contador: temporal[pregunta][key].contador })
        }
        data.unshift({ mes: 'January', valor: 0, porcentaje: 0, contador: 0}, { mes: 'February', valor: 0, porcentaje: 0, contador: 0});
        // console.log(mes)
        this.pruebatempora.push({ pregunta, data })
      }

      console.log(this.pruebatempora)



      // console.log(this.pruebatempora)

      // const oficial = [
      //   {
      //     name: 'Abril',
      //     mes: abrilResultados,
      //   },
      //   {
      //     name: 'Agosto',
      //     mes: agostoResultados,
      //   }
      // ]

      // console.log(oficial)


      // console.log(groupQuestions)
      // const groupMonths = this.groupBy(groupQuestions['1. ¿El conductor cumplió con la inspección física de la unidad y llenado del check list de inspección?'], 'mes');
      // console.log(groupMonths);
      // const temporal:any = [];

      // console.log(groupQuestions)
      // for (const key in groupQuestions) {
      //   const meses = this.groupBy(groupQuestions[key], 'mes');
      //   this.preguntas.push({pregunta: key, meses});
      // }

      // console.log(this.preguntas)
    });

  }

  /*groupByQuestions( data: any) {
    data.reduce( (res:any, value:any) => {
      console.log(value);
    });
  }*/

  selectProvider($event: any) {
    this.provideSelect = this.camiones.filter(({ empresa }, i) => empresa === $event.target.value);
    this.selectP = true;
    this.bks = [...new Set(this.provideSelect.map(b => b.bk))];
    this.months = [...new Set(this.provideSelect.map(b => b.mes))]
  }

  selectBk($event: any) {
    console.log($event.target.value);
    this.databk = this.provideSelect.filter((dato, i) => {
      const { bk } = dato;
      return bk === $event.target.value;
    });
  }

  selectMonth($event: any) {
    console.log($event.target.value);
  }

}
