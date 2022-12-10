"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[7095],{7095:(A,y,m)=>{m.r(y),m.d(y,{DigitalModulationPageModule:()=>I});var Z=m(9808),n=m(4182),a=m(9250),p=m(2292),e=m(2096);function _(l,s){if(1&l&&(e.TgZ(0,"ion-select-option",16),e._uU(1),e.qZA()),2&l){const o=s.$implicit;e.Q6J("value",o.value),e.xp6(1),e.hij(" ",o.label," ")}}function q(l,s){if(1&l&&(e.TgZ(0,"ion-select-option",16),e._uU(1),e.qZA()),2&l){const o=s.$implicit;e.Q6J("value",o.value),e.xp6(1),e.hij(" ",o.label," ")}}const T=function(){return["/","home"]},v=[{path:"",component:(()=>{class l{constructor(o){this.alertCtrl=o,this.modulationTypes=[{label:"1024 QAM",value:"1024qam",numBits:10},{label:"256 QAM",value:"256qam",numBits:8},{label:"64 QAM",value:"64qam",numBits:6},{label:"16 QAM",value:"16qam",numBits:4}],this.timeUnits=[{label:"Seconds (s)",value:1,text:"s"},{label:"Miliseconds (ms)",value:1e3,text:"ms"},{label:"Microseconds (us)",value:1e6,text:"us"},{label:"Nanoseconds (ns)",value:1e9,text:"ns"}]}ngOnInit(){this.modulationForm=new n.cw({modulationType:new n.NI(null,n.kI.required),bitFrame:new n.NI(null,n.kI.required),symbolRate:new n.NI(9600,[n.kI.required,n.kI.min(1)]),amplitude:new n.NI(1.161,[n.kI.required,n.kI.min(1)]),timeUnit:new n.NI(1e3,n.kI.required),numraRandSymbols:new n.NI(2,[n.kI.required,n.kI.min(1)]),carrierFreq:new n.NI(19200,[n.kI.required,n.kI.min(1)])})}calculate(){const o=this.bitsPerSymbol(),t=this.formatInput(this.getRawMessage(),this.bitsPerSymbol()),i=[];for(const r of t){const b=r.slice(0,r.length/2),f=r.slice(r.length/2,r.length+1);i.push([b,f])}const u=this.modulationForm.get("amplitude").value*Math.SQRT1_2/(Math.pow(2,o/2)-1),d=[],h=[],g=Math.pow(2,o/2);for(let r=0;r<g;r++)d.push(u*(g-(1+2*r))),h.push(u*(1+2*r-g));console.log(d);const M=[];for(const r of i){const b=d[parseInt(r[0].toString().replace(/,/g,""),2)],f=h[parseInt(r[1].toString().replace(/,/g,""),2)];M.push([b,f])}console.log("multiplexVector",M)}formatInput(o,t){const i=o.split(""),c=[];for(let u=0;u<i.length;u+=t)c.push(i.slice(u,u+t));return c}linspace(o,t,i,c=!0){const d=(t-o)/(c?i-1:i);return Array.from({length:i},(h,g)=>o+d*g)}checkIfBinary(){const o=this.getRawMessage();if(o)for(const t of o)"0"!==t&&"1"!==t&&this.alertCtrl.create({header:"Invalid Character on Message!",message:"Your message will be errased!",buttons:["Okay"]}).then(i=>{i.present(),i.onWillDismiss().then(()=>this.modulationForm.get("bitFrame").patchValue(null))})}checkIfCorrect(){const o=this.getRawMessage(),t=this.bitsPerSymbol();!o||o.length%t!=0&&this.alertCtrl.create({header:"Invalid bit amount on Message!",message:`Your message must contain at least ${t} bits or a multiple of it. Your\n            message will be errased!`,buttons:["Okay"]}).then(i=>{i.present(),i.onWillDismiss().then(()=>this.modulationForm.get("bitFrame").patchValue(null))})}getRawMessage(){return this.modulationForm.get("bitFrame").value}bitsPerSymbol(){return this.modulationTypes.find(({value:o})=>o===this.modulationForm.get("modulationType").value).numBits}generateRandomBitFrame(){const o=this.modulationForm.get("numraRandSymbols").value,t=[];for(let i=0;i<o*this.bitsPerSymbol();i++)t.push(Math.round(Math.random()));this.modulationForm.get("bitFrame").patchValue(t.toString().replace(/,/g,""))}checkFreq(){const o=this.modulationForm.get("symbolRate").value,t=this.modulationForm.get("carrierFreq").value;!t||t<2*o&&this.alertCtrl.create({header:"Invalid carrier frequency!",message:"The carrier frequency must be al least twice the baud rate. Your\n          message will be errased!",buttons:["Okay"]}).then(i=>{i.present(),i.onWillDismiss().then(()=>this.modulationForm.get("carrierFreq").patchValue(null))})}}return l.\u0275fac=function(o){return new(o||l)(e.Y36(a.Br))},l.\u0275cmp=e.Xpm({type:l,selectors:[["app-digital-modulation"]],decls:64,vars:9,consts:[["slot","end"],["slot","icon-only",3,"routerLink"],["name","home-outline"],[3,"formGroup"],["position","floating"],["placeholder","Select modulation scheme","formControlName","modulationType",3,"ionChange"],[3,"value",4,"ngFor","ngForOf"],["type","number","formControlName","symbolRate","placeholder","Enter a value"],["type","number","formControlName","amplitude"],["type","number","formControlName","carrierFreq","placeholder","Enter a value",3,"disabled","ionBlur"],["placeholder","Select a time unit","formControlName","timeUnit"],["formControlName","bitFrame","placeholder","Type your message","autoGrow","true","rows","1",3,"disabled","ionChange","ionBlur"],[1,"ion-align-items-center"],["fill","outline",3,"disabled","click"],["type","number","formControlName","numraRandSymbols","placeholder","Enter a value"],[3,"disabled","click"],[3,"value"]],template:function(o,t){1&o&&(e.TgZ(0,"ion-header")(1,"ion-toolbar")(2,"ion-buttons",0)(3,"ion-button",1),e._UZ(4,"ion-icon",2),e.qZA()(),e.TgZ(5,"ion-title"),e._uU(6,"Digital Modulation"),e.qZA()()(),e.TgZ(7,"ion-content")(8,"ion-grid")(9,"form",3)(10,"ion-row")(11,"ion-col")(12,"ion-list")(13,"ion-item")(14,"ion-label",4),e._uU(15," Modulation type "),e.qZA(),e.TgZ(16,"ion-select",5),e.NdJ("ionChange",function(){return t.checkIfCorrect()}),e.YNc(17,_,2,2,"ion-select-option",6),e.qZA()(),e.TgZ(18,"ion-item")(19,"ion-label",4),e._uU(20," Symbol transmission rate (Bd) "),e.qZA(),e._UZ(21,"ion-input",7),e.qZA(),e.TgZ(22,"ion-item")(23,"ion-label",4),e._uU(24," Modulated signal maximum amplitude (V) "),e.qZA(),e._UZ(25,"ion-input",8),e.qZA(),e.TgZ(26,"ion-item")(27,"ion-label",4),e._uU(28," Carrier frequency (Hz) "),e.qZA(),e.TgZ(29,"ion-input",9),e.NdJ("ionBlur",function(){return t.checkFreq()}),e.qZA()(),e.TgZ(30,"ion-item")(31,"ion-label",4),e._uU(32," Plotting Time Unit "),e.qZA(),e.TgZ(33,"ion-select",10),e.YNc(34,q,2,2,"ion-select-option",6),e.qZA()()()(),e.TgZ(35,"ion-col")(36,"ion-row")(37,"ion-col")(38,"ion-item")(39,"ion-label",4),e._uU(40," Bit frame "),e.qZA(),e.TgZ(41,"ion-textarea",11),e.NdJ("ionChange",function(){return t.checkIfBinary()})("ionBlur",function(){return t.checkIfCorrect()}),e.qZA()()()(),e.TgZ(42,"ion-row",12)(43,"ion-col")(44,"ion-button",13),e.NdJ("click",function(){return t.generateRandomBitFrame()}),e._uU(45," Generate random symbol "),e.qZA()(),e.TgZ(46,"ion-col")(47,"ion-item")(48,"ion-label",4),e._uU(49," Number of random symbols "),e.qZA(),e._UZ(50,"ion-input",14),e.qZA()()()()(),e.TgZ(51,"ion-row")(52,"ion-col")(53,"ion-button",15),e.NdJ("click",function(){return t.calculate()}),e._uU(54," Calculate "),e.qZA()()(),e.TgZ(55,"ion-row"),e._UZ(56,"ion-col")(57,"ion-col"),e.qZA(),e.TgZ(58,"ion-row"),e._UZ(59,"ion-col")(60,"ion-col"),e.qZA(),e.TgZ(61,"ion-row"),e._UZ(62,"ion-col")(63,"ion-col"),e.qZA()()()()),2&o&&(e.xp6(3),e.Q6J("routerLink",e.DdM(8,T)),e.xp6(6),e.Q6J("formGroup",t.modulationForm),e.xp6(8),e.Q6J("ngForOf",t.modulationTypes),e.xp6(12),e.Q6J("disabled",!t.modulationForm.get("symbolRate").valid),e.xp6(5),e.Q6J("ngForOf",t.timeUnits),e.xp6(7),e.Q6J("disabled",!t.modulationForm.get("modulationType").valid),e.xp6(3),e.Q6J("disabled",!t.modulationForm.get("numraRandSymbols").valid||!t.modulationForm.get("modulationType").valid),e.xp6(9),e.Q6J("disabled",!t.modulationForm.valid))},dependencies:[Z.sg,n._Y,n.JJ,n.JL,a.YG,a.Sm,a.wI,a.W2,a.jY,a.Gu,a.gu,a.pK,a.Ie,a.Q$,a.q_,a.Nd,a.t9,a.n0,a.g2,a.wd,a.sr,a.as,a.QI,a.j9,a.YI,p.rH,n.sg,n.u]}),l})()}];let F=(()=>{class l{}return l.\u0275fac=function(o){return new(o||l)},l.\u0275mod=e.oAB({type:l}),l.\u0275inj=e.cJS({imports:[p.Bz.forChild(v),p.Bz]}),l})(),I=(()=>{class l{}return l.\u0275fac=function(o){return new(o||l)},l.\u0275mod=e.oAB({type:l}),l.\u0275inj=e.cJS({imports:[Z.ez,n.u5,a.Pc,F,n.UX]}),l})()}}]);