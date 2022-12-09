"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[9184],{9184:(v,h,c)=>{c.r(h),c.d(h,{ReceiverPageModule:()=>Z});var l=c(9808),a=c(4182),r=c(9250),u=c(2292),e=c(2096);function f(o,t){if(1&o&&(e.TgZ(0,"ion-col"),e._UZ(1,"ion-row"),e.TgZ(2,"ion-row")(3,"ion-col"),e._uU(4),e.qZA()(),e.TgZ(5,"ion-row")(6,"ion-col"),e._uU(7),e.qZA()()()),2&o){const i=t.$implicit,n=t.index,s=e.oxw(2);e.xp6(4),e.hij(" ",s.bitsRxData.length-n," "),e.xp6(3),e.hij(" ",i," ")}}function d(o,t){if(1&o&&(e.TgZ(0,"ion-row",9)(1,"ion-col"),e._uU(2),e.qZA(),e.TgZ(3,"ion-col",11),e._uU(4),e.qZA()()),2&o){const i=t.$implicit,n=t.index,s=e.oxw(3);e.xp6(2),e.hij(" ",i," = "),e.xp6(2),e.hij(" ",s.onesRxBinary[n]," ")}}function p(o,t){if(1&o&&(e.TgZ(0,"ion-row")(1,"ion-col")(2,"ion-row")(3,"ion-col",9),e.YNc(4,d,5,2,"ion-row",10),e.qZA()(),e.TgZ(5,"ion-row")(6,"ion-col"),e._uU(7," Error place "),e.qZA(),e.TgZ(8,"ion-col",11),e._uU(9),e.qZA()()()()),2&o){const i=e.oxw(2);e.xp6(4),e.Q6J("ngForOf",i.onesRx.reverse()),e.xp6(5),e.hij(" ",i.errorPosBin," ")}}function R(o,t){if(1&o&&(e.TgZ(0,"ion-row")(1,"ion-col")(2,"ion-row")(3,"ion-col"),e._uU(4," Data in receiver "),e.qZA()(),e.TgZ(5,"ion-row"),e.YNc(6,f,8,2,"ion-col",8),e.qZA(),e.TgZ(7,"ion-row")(8,"ion-col"),e._uU(9," Error bits "),e.qZA()(),e.TgZ(10,"ion-row")(11,"ion-col"),e._uU(12),e.qZA()(),e.YNc(13,p,10,2,"ion-row",7),e.qZA()()),2&o){const i=e.oxw();e.xp6(6),e.Q6J("ngForOf",i.bitsRxData.reverse()),e.xp6(6),e.hij(" ",i.errorMsg," "),e.xp6(1),e.Q6J("ngIf",0!==i.errorPos)}}const x=function(){return["/","hamming"]},_=[{path:"",component:(()=>{class o{constructor(i){this.alertCtrl=i,this.isHammingRxCalculated=!1,this.bitsRxData=[],this.onesRx=[],this.onesRxBinary=[],this.errorPos=0,this.errorPosBin=[],this.errorMsg=""}ngOnInit(){this.decodificarForm=new a.cw({message:new a.NI(null,[a.kI.required,a.kI.minLength(3)])})}checkIfBinary(){this.isHammingRxCalculated=!1;const i=this.getRawMessage();if(i)for(const n of i)"0"!==n&&"1"!==n&&this.alertCtrl.create({header:"Invalid Character on Message!",message:"Your message will be errased!",buttons:["Okay"]}).then(s=>{s.present(),s.onWillDismiss().then(()=>this.decodificarForm.get("message").patchValue(null))})}getRawMessage(){return this.decodificarForm.get("message").value}calculateRxHamming(){this.alertCtrl.create({header:"Read before continuing!",message:"Keep in mind that Hamming Codes only check one-bit errors!",buttons:["Okay"]}).then(i=>{i.present(),i.onDidDismiss().then(()=>{const n=this.formatMessage(this.getRawMessage());this.bitsRxData=n;const s=this.findOnes(n);let g;this.onesRx=s;for(const m of s)g^=m;this.errorPos=g,this.errorMsg=0===this.errorPos?"There was no error on transmission!":`There is an error on bit ${this.errorPos}`;for(const m of this.onesRx)this.onesRxBinary.push((m>>>0).toString(2).split(""));this.onesRxBinary.reverse(),this.errorPosBin=(this.errorPos>>>0).toString(2).split("").reverse(),this.isHammingRxCalculated=!0})})}formatMessage(i){return i.split("").reverse()}findOnes(i){const n=[];for(const[s,g]of i.entries())"1"===g&&n.push(s+1);return n}}return o.\u0275fac=function(i){return new(i||o)(e.Y36(r.Br))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-receiver"]],decls:21,vars:5,consts:[["slot","end"],["slot","icon-only",3,"routerLink"],["name","arrow-back-outline"],[3,"formGroup"],["position","floating"],["formControlName","message","placeholder","Type your message","autoGrow","true","rows","1",3,"ionChange"],[3,"disabled","click"],[4,"ngIf"],[4,"ngFor","ngForOf"],[1,"ion-no-margin","ion-no-padding"],["class","ion-no-margin ion-no-padding",4,"ngFor","ngForOf"],[1,"ion-text-right"]],template:function(i,n){1&i&&(e.TgZ(0,"ion-header")(1,"ion-toolbar")(2,"ion-buttons",0)(3,"ion-button",1),e._UZ(4,"ion-icon",2),e.qZA()(),e.TgZ(5,"ion-title"),e._uU(6,"Hamming Receiver"),e.qZA()()(),e.TgZ(7,"ion-content")(8,"ion-grid")(9,"ion-row")(10,"ion-col")(11,"h2"),e._uU(12,"Receiver"),e.qZA(),e.TgZ(13,"form",3)(14,"ion-item")(15,"ion-label",4),e._uU(16," Message "),e.qZA(),e.TgZ(17,"ion-textarea",5),e.NdJ("ionChange",function(){return n.checkIfBinary()}),e.qZA()(),e.TgZ(18,"ion-button",6),e.NdJ("click",function(){return n.calculateRxHamming()}),e._uU(19," Check for errors "),e.qZA()()()(),e.YNc(20,R,14,3,"ion-row",7),e.qZA()()),2&i&&(e.xp6(3),e.Q6J("routerLink",e.DdM(4,x)),e.xp6(10),e.Q6J("formGroup",n.decodificarForm),e.xp6(5),e.Q6J("disabled",!n.decodificarForm.valid),e.xp6(2),e.Q6J("ngIf",n.isHammingRxCalculated))},dependencies:[l.sg,l.O5,a._Y,a.JJ,a.JL,r.YG,r.Sm,r.wI,r.W2,r.jY,r.Gu,r.gu,r.Ie,r.Q$,r.Nd,r.g2,r.wd,r.sr,r.j9,r.YI,u.rH,a.sg,a.u]}),o})()}];let w=(()=>{class o{}return o.\u0275fac=function(i){return new(i||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[u.Bz.forChild(_),u.Bz]}),o})(),Z=(()=>{class o{}return o.\u0275fac=function(i){return new(i||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[l.ez,a.u5,r.Pc,w,a.UX]}),o})()}}]);