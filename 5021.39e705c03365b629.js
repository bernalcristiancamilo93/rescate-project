"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[5021],{5021:(f,u,a)=>{a.r(u),a.d(u,{LineCodesPageModule:()=>Z});var d=a(9808),o=a(4182),n=a(9250),s=a(2292),e=a(2096);function m(i,l){if(1&i&&(e.TgZ(0,"ion-select-option",16),e._uU(1),e.qZA()),2&i){const t=l.$implicit;e.Q6J("value",t.value),e.xp6(1),e.hij(" ",t.label," ")}}const c=function(){return["/","home"]},g=[{path:"",component:(()=>{class i{constructor(){this.encoders=[{label:"NRZ",value:"NRZ",disabled:!1},{label:"AMI NRZ",value:"AMI NRZ",disabled:!1},{label:"AMI RZ",value:"AMI RZ",disabled:!1},{label:"Manchester",value:"Manchester",disabled:!1},{label:"B8ZS",value:"B8ZS",disabled:!1}]}ngOnInit(){this.encodingForm=new o.cw({bitStream:new o.NI(null,o.kI.required),numRandBits:new o.NI(8,[o.kI.required,o.kI.min(1)]),encondingType:new o.NI(null,o.kI.required),lastBit:new o.NI("0",o.kI.required),txRate:new o.NI(1e3,[o.kI.required,o.kI.min(1)]),amplitude:new o.NI(1,[o.kI.required,o.kI.min(1)])})}}return i.\u0275fac=function(t){return new(t||i)},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-line-codes"]],decls:54,vars:6,consts:[["slot","end"],["slot","icon-only",3,"routerLink"],["name","home-outline"],[3,"formGroup"],["position","floating"],["formControlName","bitStream","placeholder","Type your message","autoGrow","true","rows","1"],[3,"disabled"],["fill","outline",3,"disabled"],["type","number","formControlName","numRandBits"],["placeholder","Select encoding","formControlName","encondingType"],[3,"value",4,"ngFor","ngForOf"],["placeholder","Select last bit","formControlName","lastBit"],["value","0"],["value","1"],["type","number","formControlName","txRate"],["type","number","formControlName","amplitude"],[3,"value"]],template:function(t,r){1&t&&(e.TgZ(0,"ion-header")(1,"ion-toolbar")(2,"ion-buttons",0)(3,"ion-button",1),e._UZ(4,"ion-icon",2),e.qZA()(),e.TgZ(5,"ion-title"),e._uU(6,"Line Codes"),e.qZA()()(),e.TgZ(7,"ion-content")(8,"ion-grid")(9,"form",3)(10,"ion-row")(11,"ion-col")(12,"ion-row")(13,"ion-item")(14,"ion-label",4),e._uU(15," Bits stream "),e.qZA(),e._UZ(16,"ion-textarea",5),e.qZA()(),e.TgZ(17,"ion-row")(18,"ion-col")(19,"ion-button",6),e._uU(20," Calculate "),e.qZA(),e.TgZ(21,"ion-button",7),e._uU(22," Generate bit stream "),e.qZA(),e.TgZ(23,"ion-item")(24,"ion-label",4),e._uU(25," Number of random bits "),e.qZA(),e._UZ(26,"ion-input",8),e.qZA()()()(),e.TgZ(27,"ion-col")(28,"ion-row")(29,"ion-col")(30,"ion-list")(31,"ion-item")(32,"ion-label",4),e._uU(33," Encoding type "),e.qZA(),e.TgZ(34,"ion-select",9),e.YNc(35,m,2,2,"ion-select-option",10),e.qZA()(),e.TgZ(36,"ion-item")(37,"ion-label",4),e._uU(38," Last bit sent "),e.qZA(),e.TgZ(39,"ion-select",11)(40,"ion-select-option",12),e._uU(41," 0 "),e.qZA(),e.TgZ(42,"ion-select-option",13),e._uU(43," 1 "),e.qZA()()(),e.TgZ(44,"ion-item")(45,"ion-label",4),e._uU(46," Data transmission rate (bps) "),e.qZA(),e._UZ(47,"ion-input",14),e.qZA(),e.TgZ(48,"ion-item")(49,"ion-label",4),e._uU(50," Signal amplitude (V) "),e.qZA(),e._UZ(51,"ion-input",15),e.qZA()()()()()(),e.TgZ(52,"ion-row"),e._UZ(53,"ion-col"),e.qZA()()()()),2&t&&(e.xp6(3),e.Q6J("routerLink",e.DdM(5,c)),e.xp6(6),e.Q6J("formGroup",r.encodingForm),e.xp6(10),e.Q6J("disabled",!r.encodingForm.valid),e.xp6(2),e.Q6J("disabled",!r.encodingForm.valid),e.xp6(14),e.Q6J("ngForOf",r.encoders))},dependencies:[d.sg,o._Y,o.JJ,o.JL,n.YG,n.Sm,n.wI,n.W2,n.jY,n.Gu,n.gu,n.pK,n.Ie,n.Q$,n.q_,n.Nd,n.t9,n.n0,n.g2,n.wd,n.sr,n.as,n.QI,n.j9,n.YI,s.rH,o.sg,o.u]}),i})()}];let p=(()=>{class i{}return i.\u0275fac=function(t){return new(t||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({imports:[s.Bz.forChild(g),s.Bz]}),i})(),Z=(()=>{class i{}return i.\u0275fac=function(t){return new(t||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({imports:[d.ez,o.u5,n.Pc,p,o.UX]}),i})()}}]);