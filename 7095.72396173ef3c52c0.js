"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[7095],{7095:(V,A,h)=>{h.r(A),h.d(A,{DigitalModulationPageModule:()=>j});var Z=h(9808),a=h(4182),r=h(9250),y=h(2292),F=h(9301),t=h(2096);function P(i,u){if(1&i&&(t.TgZ(0,"ion-select-option",21),t._uU(1),t.qZA()),2&i){const o=u.$implicit;t.Q6J("value",o.value),t.xp6(1),t.hij(" ",o.label," ")}}function U(i,u){if(1&i&&(t.TgZ(0,"ion-select-option",21),t._uU(1),t.qZA()),2&i){const o=u.$implicit;t.Q6J("value",o.value),t.xp6(1),t.hij(" ",o.label," ")}}function Q(i,u){if(1&i&&(t.TgZ(0,"ion-row")(1,"ion-col")(2,"ion-text"),t._uU(3),t.qZA()(),t.TgZ(4,"ion-col")(5,"ion-text"),t._uU(6),t.qZA()()()),2&i){const o=u.$implicit;t.xp6(3),t.hij(" ",o[0]," "),t.xp6(3),t.hij(" ",o[1]," ")}}function S(i,u){if(1&i&&(t.TgZ(0,"ion-row")(1,"ion-col")(2,"ion-text"),t._uU(3),t.qZA()(),t.TgZ(4,"ion-col")(5,"ion-text"),t._uU(6),t.qZA()()()),2&i){const o=u.$implicit;t.xp6(3),t.hij(" ",o[0]," "),t.xp6(3),t.hij(" ",o[1]," ")}}function D(i,u){if(1&i&&(t.TgZ(0,"ion-grid",22)(1,"ion-row",23)(2,"ion-col")(3,"ion-title")(4,"ion-text",24),t._uU(5," ADC Converter Truth Table "),t.qZA()()()(),t.TgZ(6,"ion-row")(7,"ion-col",23)(8,"ion-row")(9,"ion-col")(10,"ion-text"),t._uU(11),t.qZA()(),t.TgZ(12,"ion-col")(13,"ion-text"),t._uU(14," Output (V) "),t.qZA()()(),t.YNc(15,Q,7,2,"ion-row",25),t.qZA(),t.TgZ(16,"ion-col",23)(17,"ion-row")(18,"ion-col")(19,"ion-text"),t._uU(20),t.qZA()(),t.TgZ(21,"ion-col")(22,"ion-text"),t._uU(23," Output (V) "),t.qZA()()(),t.YNc(24,S,7,2,"ion-row",25),t.qZA()()()),2&i){const o=t.oxw();t.xp6(11),t.hij(" ",o.bitsQTruthTable.join("")," "),t.xp6(4),t.Q6J("ngForOf",o.outAmplitudeQ),t.xp6(5),t.hij(" ",o.bitsITruthTable.join("")," "),t.xp6(4),t.Q6J("ngForOf",o.outAmplitudeI)}}function k(i,u){if(1&i&&(t.TgZ(0,"ion-row")(1,"ion-col")(2,"ion-text"),t._uU(3),t.qZA()(),t.TgZ(4,"ion-col")(5,"ion-text"),t._uU(6),t.qZA()(),t.TgZ(7,"ion-col")(8,"ion-text"),t._uU(9),t.qZA()()()),2&i){const o=u.$implicit;t.xp6(3),t.hij(" ",o[0]," "),t.xp6(3),t.hij(" ",o[1]," "),t.xp6(3),t.hij(" ",o[2]," ")}}function N(i,u){if(1&i&&(t.TgZ(0,"ion-grid",22)(1,"ion-row",23)(2,"ion-col")(3,"ion-title")(4,"ion-text",24),t._uU(5),t.qZA()()()(),t.TgZ(6,"ion-row")(7,"ion-col",23)(8,"ion-row")(9,"ion-col")(10,"ion-text"),t._uU(11),t.qZA()(),t.TgZ(12,"ion-col")(13,"ion-text"),t._uU(14," Out Amplitude (V) "),t.qZA()(),t.TgZ(15,"ion-col")(16,"ion-text"),t._uU(17," Out Phase (\xb0) "),t.qZA()()(),t.YNc(18,k,10,3,"ion-row",25),t.qZA()()()),2&i){const o=t.oxw();t.xp6(5),t.hij(" Output Table ",o.numModulationType," QAM "),t.xp6(6),t.AsE(" ",o.bitsQTruthTable.join("")," ",o.bitsITruthTable.join("")," "),t.xp6(7),t.Q6J("ngForOf",o.outTable)}}const R=function(){return["/","home"]},J=[{path:"",component:(()=>{class i{constructor(o){this.alertCtrl=o,this.bitsQTruthTable=[],this.bitsITruthTable=[],this.outAmplitudeQ=[],this.outAmplitudeI=[],this.outTable=[],this.numModulationType=0,this.isTableReady=!1,this.modulationTypes=[{label:"1024 QAM",value:"1024qam",numBits:10},{label:"256 QAM",value:"256qam",numBits:8},{label:"64 QAM",value:"64qam",numBits:6},{label:"16 QAM",value:"16qam",numBits:4}],this.timeUnits=[{label:"Seconds (s)",value:1,text:"s"},{label:"Miliseconds (ms)",value:1e3,text:"ms"},{label:"Microseconds (us)",value:1e6,text:"us"},{label:"Nanoseconds (ns)",value:1e9,text:"ns"}]}ngOnInit(){this.modulationForm=new a.cw({modulationType:new a.NI(null,a.kI.required),bitFrame:new a.NI(null,a.kI.required),symbolRate:new a.NI(9600,[a.kI.required,a.kI.min(1)]),amplitude:new a.NI(1.161,[a.kI.required,a.kI.min(1)]),timeUnit:new a.NI(1e3,a.kI.required),numraRandSymbols:new a.NI(4,[a.kI.required,a.kI.min(1)]),carrierFreq:new a.NI(19200,[a.kI.required,a.kI.min(1)])})}calculate(){const o=this.bitsPerSymbol(),e=this.formatInput(this.getRawMessage(),this.bitsPerSymbol()),n=[];for(const s of e){const b=s.slice(0,s.length/2),f=s.slice(s.length/2,s.length+1);n.push([b,f])}const l=this.modulationForm.get("amplitude").value*Math.SQRT1_2/(Math.pow(2,o/2)-1),d=[],g=[],c=Math.pow(2,o/2);for(let s=0;s<c;s++)d.push(l*(c-(1+2*s))),g.push(l*(1+2*s-c));this.createTruthTables(d,g);const M=this.modulationForm.get("timeUnit").value/this.modulationForm.get("symbolRate").value,p=this.modulationForm.get("carrierFreq").value,_=p/this.modulationForm.get("symbolRate").value*100,x=this.linspace(0,M,_,!1),w=[],C=[];for(let s=0;s<_;s++)w.push(Math.sin(2*Math.PI*p*(x[s]/this.modulationForm.get("timeUnit").value))),C.push(Math.sin(2*Math.PI*p*(x[s]/this.modulationForm.get("timeUnit").value)+Math.PI/2));const v=[];for(const s of n){const b=d[parseInt(s[0].join(""),2)],f=g[parseInt(s[1].join(""),2)];v.push([b,f])}const I=[];for(const s of v){const b=C.map(T=>T*s[0]),f=w.map(T=>T*s[1]);I.push(b.map((T,O)=>T+f[O]))}let q=[];for(const s of I)q=q.concat(s);this.createSineWaveChart(q),this.createPhasorChart(v)}formatInput(o,e){const n=o.split(""),m=[];for(let l=0;l<n.length;l+=e)m.push(n.slice(l,l+e));return m}linspace(o,e,n,m=!0){const d=(e-o)/(m?n-1:n);return Array.from({length:n},(g,c)=>o+d*c)}checkIfBinary(){const o=this.getRawMessage();if(o)for(const e of o)"0"!==e&&"1"!==e&&this.alertCtrl.create({header:"Invalid Character on Message!",message:"Your message will be errased!",buttons:["Okay"]}).then(n=>{n.present(),n.onWillDismiss().then(()=>this.modulationForm.get("bitFrame").patchValue(null))})}checkIfCorrect(){const o=this.getRawMessage(),e=this.bitsPerSymbol();!o||o.length%e!=0&&this.alertCtrl.create({header:"Invalid bit amount on Message!",message:`Your message must contain at least ${e} bits or a\n            multiple of it. Your message will be errased!`,buttons:["Okay"]}).then(n=>{n.present(),n.onWillDismiss().then(()=>this.modulationForm.get("bitFrame").patchValue(null))})}getRawMessage(){return this.modulationForm.get("bitFrame").value}bitsPerSymbol(){return this.modulationTypes.find(({value:o})=>o===this.modulationForm.get("modulationType").value).numBits}generateRandomBitFrame(){const o=this.modulationForm.get("numraRandSymbols").value,e=[];for(let n=0;n<o*this.bitsPerSymbol();n++)e.push(Math.round(Math.random()));this.modulationForm.get("bitFrame").patchValue(e.toString().replace(/,/g,""))}checkFreq(){const o=this.modulationForm.get("symbolRate").value,e=this.modulationForm.get("carrierFreq").value;!e||e<2*o&&this.alertCtrl.create({header:"Invalid carrier frequency!",message:"The carrier frequency must be al least twice the baud rate.\n           Your message will be errased!",buttons:["Okay"]}).then(n=>{n.present(),n.onWillDismiss().then(()=>this.modulationForm.get("carrierFreq").patchValue(null))})}createSineWaveChart(o){this.sineWaveChart&&this.sineWaveChart.destroy(),o.push(o.slice(-1)[0]);const e=this.modulationForm.get("bitFrame").value.length/this.bitsPerSymbol(),n=this.modulationForm.get("timeUnit").value/this.modulationForm.get("symbolRate").value*e,l=this.modulationForm.get("carrierFreq").value/this.modulationForm.get("symbolRate").value*100*e+1,g={labels:this.linspace(0,n,l,!0),datasets:[{label:"Modulated Signal",data:o,fill:!1,pointRadius:0,borderColor:"#3880ff",backgroundColor:"#4c8dff"}]};this.sineWaveChart=new F.kL("sineWaveChart",{type:"line",data:g,options:{responsive:!0,interaction:{intersect:!1,axis:"x"},scales:{x:{title:{display:!0,text:`Time (${this.timeUnits.find(({value:c})=>c===this.modulationForm.get("timeUnit").value).text})`}},y:{title:{display:!0,text:"Amplitude (V)"}}}}})}createPhasorChart(o){this.phasorChart&&this.phasorChart.destroy(),o=o.map(e=>e.reverse()),this.phasorChart=new F.kL("phasorChart",{type:"scatter",data:{datasets:[{label:"Phasor Chart",data:o,borderColor:"#3880ff",backgroundColor:"#4c8dff"}]},options:{responsive:!0,interaction:{intersect:!1,axis:"x"},scales:{x:{type:"linear",title:{display:!0,text:"I"}},y:{type:"linear",title:{display:!0,text:"Q"}}},aspectRatio:1}})}createTruthTables(o,e){this.isTableReady=!0;const n=this.bitsPerSymbol();this.numModulationType=Math.pow(2,n),this.bitsQTruthTable=[],this.bitsITruthTable=[],this.outAmplitudeQ=[],this.outAmplitudeI=[],this.outTable=[];for(let l=0;l<n/2;l++)this.bitsQTruthTable.push(`Q${n/2-l} `),this.bitsITruthTable.push(`I${n/2-l} `);for(let l=0;l<Math.pow(2,n/2);l++)this.outAmplitudeQ[l]=[l.toString(2),o[l].toFixed(4)],this.outAmplitudeI[l]=[l.toString(2),e[l].toFixed(4)];let m=0;for(const[l,d]of o.entries())for(const[g,c]of e.entries()){const M=m.toString(2),p=Math.sqrt(Math.pow(d,2)+Math.pow(c,2)).toFixed(4),_=(180*Math.atan2(d,c)/Math.PI).toFixed(4);this.outTable.push([M,p,_]),m++}}}return i.\u0275fac=function(o){return new(o||i)(t.Y36(r.Br))},i.\u0275cmp=t.Xpm({type:i,selectors:[["app-digital-modulation"]],decls:74,vars:13,consts:[["slot","end"],["slot","icon-only",3,"routerLink"],["name","home-outline"],[3,"formGroup"],["position","floating"],["placeholder","Select modulation scheme","formControlName","modulationType",3,"ionChange"],[3,"value",4,"ngFor","ngForOf"],["type","number","formControlName","symbolRate","placeholder","Enter a value",3,"ionBlur"],["type","number","formControlName","amplitude"],["type","number","formControlName","carrierFreq","placeholder","Enter a value",3,"disabled","ionBlur"],["placeholder","Select a time unit","formControlName","timeUnit"],["formControlName","bitFrame","placeholder","Type your message","autoGrow","true","rows","1",3,"disabled","ionChange","ionBlur"],[1,"ion-align-items-center"],["fill","outline",3,"disabled","click"],["type","number","formControlName","numraRandSymbols","placeholder","Enter a value"],[3,"disabled","click"],["size","10","offset","1"],[1,"chart-container"],["id","sineWaveChart"],["id","phasorChart"],["class","ion-text-center truth-table",4,"ngIf"],[3,"value"],[1,"ion-text-center","truth-table"],[1,"ion-margin"],[1,"ion-text-wrap"],[4,"ngFor","ngForOf"]],template:function(o,e){1&o&&(t.TgZ(0,"ion-header")(1,"ion-toolbar")(2,"ion-buttons",0)(3,"ion-button",1),t._UZ(4,"ion-icon",2),t.qZA()(),t.TgZ(5,"ion-title"),t._uU(6,"Digital Modulation"),t.qZA()()(),t.TgZ(7,"ion-content")(8,"ion-grid")(9,"form",3)(10,"ion-row")(11,"ion-col")(12,"ion-list")(13,"ion-item")(14,"ion-label",4),t._uU(15," Modulation type "),t.qZA(),t.TgZ(16,"ion-select",5),t.NdJ("ionChange",function(){return e.checkIfCorrect()}),t.YNc(17,P,2,2,"ion-select-option",6),t.qZA()(),t.TgZ(18,"ion-item")(19,"ion-label",4),t._uU(20," Symbol transmission rate (Bd) "),t.qZA(),t.TgZ(21,"ion-input",7),t.NdJ("ionBlur",function(){return e.checkFreq()}),t.qZA()(),t.TgZ(22,"ion-item")(23,"ion-label",4),t._uU(24," Modulated signal maximum amplitude (V) "),t.qZA(),t._UZ(25,"ion-input",8),t.qZA(),t.TgZ(26,"ion-item")(27,"ion-label",4),t._uU(28," Carrier frequency (Hz) "),t.qZA(),t.TgZ(29,"ion-input",9),t.NdJ("ionBlur",function(){return e.checkFreq()}),t.qZA()(),t.TgZ(30,"ion-item")(31,"ion-label",4),t._uU(32," Plotting Time Unit "),t.qZA(),t.TgZ(33,"ion-select",10),t.YNc(34,U,2,2,"ion-select-option",6),t.qZA()()()(),t.TgZ(35,"ion-col")(36,"ion-row")(37,"ion-col")(38,"ion-item")(39,"ion-label",4),t._uU(40," Bit frame "),t.qZA(),t.TgZ(41,"ion-textarea",11),t.NdJ("ionChange",function(){return e.checkIfBinary()})("ionBlur",function(){return e.checkIfCorrect()}),t.qZA()()()(),t.TgZ(42,"ion-row",12)(43,"ion-col")(44,"ion-button",13),t.NdJ("click",function(){return e.generateRandomBitFrame()}),t._uU(45," Generate random symbol "),t.qZA()(),t.TgZ(46,"ion-col")(47,"ion-item")(48,"ion-label",4),t._uU(49," Number of random symbols "),t.qZA(),t._UZ(50,"ion-input",14),t.qZA()()()()(),t.TgZ(51,"ion-row")(52,"ion-col")(53,"ion-button",15),t.NdJ("click",function(){return e.calculate()}),t._uU(54," Calculate "),t.qZA()()(),t.TgZ(55,"ion-row")(56,"ion-col",16)(57,"div",17)(58,"canvas",18),t._uU(59),t.qZA()()()(),t.TgZ(60,"ion-row")(61,"ion-col",16)(62,"ion-row")(63,"ion-col")(64,"div",17)(65,"canvas",19),t._uU(66),t.qZA()()(),t.TgZ(67,"ion-col"),t.YNc(68,D,25,4,"ion-grid",20),t.qZA()()()(),t.TgZ(69,"ion-row")(70,"ion-col",16)(71,"ion-row")(72,"ion-col"),t.YNc(73,N,19,4,"ion-grid",20),t.qZA()()()()()()()),2&o&&(t.xp6(3),t.Q6J("routerLink",t.DdM(12,R)),t.xp6(6),t.Q6J("formGroup",e.modulationForm),t.xp6(8),t.Q6J("ngForOf",e.modulationTypes),t.xp6(12),t.Q6J("disabled",!e.modulationForm.get("symbolRate").valid),t.xp6(5),t.Q6J("ngForOf",e.timeUnits),t.xp6(7),t.Q6J("disabled",!e.modulationForm.get("modulationType").valid),t.xp6(3),t.Q6J("disabled",!e.modulationForm.get("numraRandSymbols").valid||!e.modulationForm.get("modulationType").valid),t.xp6(9),t.Q6J("disabled",!e.modulationForm.valid),t.xp6(6),t.Oqu(e.sineWaveChart),t.xp6(7),t.Oqu(e.phasorChart),t.xp6(2),t.Q6J("ngIf",e.isTableReady),t.xp6(5),t.Q6J("ngIf",e.isTableReady))},dependencies:[Z.sg,Z.O5,a._Y,a.JJ,a.JL,r.YG,r.Sm,r.wI,r.W2,r.jY,r.Gu,r.gu,r.pK,r.Ie,r.Q$,r.q_,r.Nd,r.t9,r.n0,r.yW,r.g2,r.wd,r.sr,r.as,r.QI,r.j9,r.YI,y.rH,a.sg,a.u],styles:[".truth-table[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%]{border:1px solid #dedede}"]}),i})()}];let B=(()=>{class i{}return i.\u0275fac=function(o){return new(o||i)},i.\u0275mod=t.oAB({type:i}),i.\u0275inj=t.cJS({imports:[y.Bz.forChild(J),y.Bz]}),i})(),j=(()=>{class i{}return i.\u0275fac=function(o){return new(o||i)},i.\u0275mod=t.oAB({type:i}),i.\u0275inj=t.cJS({imports:[Z.ez,a.u5,r.Pc,B,a.UX]}),i})()}}]);