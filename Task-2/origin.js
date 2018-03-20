"use strict";

class Fridge {
   constructor(model) {
      this._state = false;
      this._model = model;
      this._currentTemp = 0;
   }
   
   on() {
      this._state = true;
   }
   off() {
      this._state = false;
   }
   get state() {
      return this._state;
   }
   
   get model() {
      return this._model;
   }
   
   increaseTemp() {
      if (this._currentTemp < 6) {
         this._currentTemp += 2;
      }
   }
   decreaseTemp() {
      if (this._currentTemp > -10) {
         this._currentTemp -= 2;
      }
   }
   get currentTemp() {
      return this._currentTemp;
   }
}

class ViewFridge {
   constructor(fridge, rootElement) {
      this._fridge = fridge;
      this._rootElement = rootElement;
      this._state = document.createElement("div");
   }
   
   stateChange() {
      this._state.innerText = `Состояние: ${this._fridge.state ? "вкл." : "выкл."}`;
   }
   
   render() {
      let fridge = document.createElement("div");
      fridge.className = "fridge";
      
      let temp = document.createElement("div");
      temp.innerText = `Темп.: ${this._fridge.currentTemp}`;
      
      let model = document.createElement("div");
      model.innerText = `Модель: ${this._fridge.model}`;
      
      let onBtn = document.createElement("button");
      onBtn.type = "button";
      onBtn.innerHTML = "Вкл.";
      onBtn.className = "on";
      onBtn.addEventListener("click", () => {
         this._fridge.on();
         this.stateChange();
      });
      
      let offBtn = document.createElement("button");
      offBtn.type = "button";
      offBtn.innerHTML = "Выкл.";
      offBtn.className = "off";
      offBtn.addEventListener("click", () => {
         this._fridge.off();
         this.stateChange();
      });
      
      this.stateChange();
      fridge.appendChild(this._state);
      fridge.appendChild(temp);
      fridge.appendChild(model);
      fridge.appendChild(onBtn);
      fridge.appendChild(offBtn);
      this._rootElement.innerHTML = "";
      this._rootElement.appendChild(fridge);
   }
}

let f = new Fridge("NORD");
let vf = new ViewFridge(f, document.getElementById("root"));
vf.render();


