"use strict";

//--------------------------
//Objects:

class Obj  {
    constructor (a,b) {
        this._type = a;
        this._model = b;
        this._state = false;
    }

    on() {
      this._state = true;
    }
    off(){
      this._state = false;
     }
    get state () {
       return this._state;
    }
    get model (){
        return this._model;
    }
    get type () {
        return this._type;
    }  
}

class ObjFridge extends Obj {
    constructor (a, b) {
        super (a, b);
        this._currentTemp = 0;
    }
    on() {
        super.on();
        self = this;
        if(this._currentTemp > -19) {     
            setTimeout(function(){
                self._currentTemp -=2;
            }, 500)
        }
    }

    off() {
        super.off();
        if(this._currentTemp < 0) {    
            setTimeout(function(){
                self._currentTemp +=2;
            }, 500)
        }  
    }

    get currentTemp() {
        return this._currentTemp;
    }
}

class ObjTV extends Obj {
    constructor (a,b) {
       super(a, b);
        this._curentChannel = 0;
        this._channels = ["Новый Канал", "1+1", "ТЕТ"];
    }

    changeChannel(a) {
        if (this._channels.length -1 <= this._curentChannel && a == "next"){
            this._curentChannel = 0;
            return this._channels[this._curentChannel];
        }
        else if (this._curentChannel <= 0 && a == "back"){
            this._curentChannel = this._channels.length - 1;
            return this._channels[this._curentChannel];
        }
        else if (a == "next")
        {
            this._curentChannel++;
            return this._channels[this._curentChannel];
        }
        else {
            this._curentChannel --;
            return this._channels[this._curentChannel];
        }
    }

    chageChannelList(a) {
        for (let i = 0; i <= this._channels.length -1 ; i ++) {      
            if (a == this._channels[i]){
                this._curentChannel = i;
            }
        }
    }

    set channel(chanel) {
        for (let i in this._channels) {
            if(this._channels[i] == chanel || chanel == "" || chanel == " "){
                return;       
            }
        }
        this._channels.push(chanel); 
    }

    get channel() {
        return this._channels[this._curentChannel];
    }

    get listChannel() {
        return this._channels;
    }
}

class ObjLight extends Obj {
    constructor(a, b) {
        super(a,b);
        this._light = 0;
    }

    set light(a) {
        this._light = a;
    }

    get light() {
        return this._light;
    }
}

//---------------------------
//Views:

class View {
    constructor (obg, rootElement) {
        this._objModel = obg;
        this._rootElement = rootElement;
        this._type = document.createElement("div");
        this._state = document.createElement("div");
        this._btnOnOff = document.createElement("div");
        this._element = document.createElement("div");
    }

    stateChange () {
        this._type.innerText = `Объект: ${this._objModel.type}`;
        this._state.innerText = `Состояние: ${this._objModel.state ? "вкл." : "выкл."}`;
    }
   
    render () {
        let self = this;
        this._element.className = "element " + this._objModel.type;  
        let model = document.createElement("div");
        model.innerText = `Модель: ${this._objModel.model}`;

        let onBtn = document.createElement("button");
        onBtn.type = "button";
        onBtn.innerHTML = "Вкл.";
        onBtn.className = "on";
        onBtn.addEventListener("click", () => {     
            this._objModel.on();
            this.stateChange();
        });
        
        let offBtn = document.createElement("button");
        offBtn.type = "button";
        offBtn.innerHTML = "Выкл.";
        offBtn.className = "off";
        offBtn.addEventListener("click", () => {
            this._objModel.off();
            this.stateChange();
        });

        this.stateChange();
        this._element.appendChild(this._type);
        this._element.appendChild(model);
        this._element.appendChild(this._state);
        this._btnOnOff.appendChild(onBtn);
        this._btnOnOff.appendChild(offBtn);
        this._element.appendChild(this._btnOnOff);
        this._rootElement.appendChild(this._element);
    }
}

class ViewFridge extends View {
    constructor (obg, rootElement) {
        super(obg, rootElement);
        this._ObjFridge = obg;
        this._temp = document.createElement("div");
    } 

    stateChange() {
        super.stateChange();
        this._temp.innerText = `Темп.: ${this._ObjFridge.currentTemp}`;
    }

    render() {
        super.render();
        let count = this._element.children.length;
        this._element.insertBefore(this._temp, this._element.children[count - 2]);
    }
}

class ViewTV extends View {
    constructor(obg, rootElement) {
        super(obg, rootElement);
        this._ObjTV = obg;
        this._channel = document.createElement("div");
        this._createSelect = document.createElement("select");
    }

    stateChange() {
        super.stateChange();
        this._channel.innerText = `Канал: ${this._ObjTV.state ? this._ObjTV.channel : ""}` ;
    }

    render() {
        super.render();
        let _formAddChannel = document.createElement("form");
        let self1 = this._ObjTV;
        let self = this; 

        let addListChannel = function() {

            let masChannel = self._ObjTV.listChannel; 
            let children = self._createSelect.childNodes;
            
            for (let i = 0; i < masChannel.length; i++) {
                
                if (children[i+1] != undefined && children[i+1].value == masChannel[i]) {                 
                    continue;
                }

                let option = document.createElement("option"); 
                option.value = masChannel[i];
                option.innerHTML = masChannel[i];
                self._createSelect.appendChild(option);  
            }

            if (self._createSelect[0].value != "Выберите Канал:"){
                let option = document.createElement("option");
                option.disabled = true;
                option.selected = true;
                option.innerHTML = "Выберите Канал:"
                self._createSelect.insertBefore(option, self._createSelect.firstChild);
            }

            self._createSelect.onchange = function(){
                    self._ObjTV.on();
                    self._ObjTV.chageChannelList(self._createSelect.value);
                    self.stateChange();
            }
        }

        let chanelInput = function(){   
            let button = document.createElement("input");
            let addIn = document.createElement("input");
            button.type = "button";
            button.name = "addChannel"
            button.value = "Добавить канал: ";
            addIn.name = "addChanel";
            addIn.id = "addChanel";
            _formAddChannel.className = "addChannel"
            _formAddChannel.appendChild(button);
            _formAddChannel.appendChild(addIn); 
            button.addEventListener("click", () => { 
                self1.channel = _formAddChannel.elements.addChanel.value;
                addIn.value = "";
                addListChannel();
            });  
        }

        let nextChangeBtn = document.createElement("button");
        nextChangeBtn.type = "button";
        nextChangeBtn.innerHTML = "Следующий канал";
        nextChangeBtn.addEventListener("click", () => { 
                self._ObjTV.on();
                self._ObjTV.changeChannel("next")
                self.stateChange();
        });

        let backChangeBtn = document.createElement("button");
        backChangeBtn.type = "button";
        backChangeBtn.innerHTML = "Предыдущий канал";
        backChangeBtn.addEventListener("click", () => { 
                self._ObjTV.on();
                self._ObjTV.changeChannel("back");
                self.stateChange();
        });

        chanelInput();
        addListChannel();
        let count = this._element.children.length;     
        this._element.insertBefore(backChangeBtn, this._element.children[count - 1]);
        this._element.insertBefore(nextChangeBtn, this._element.children[count -1]);
        this._element.insertBefore(_formAddChannel, this._element.children[count - 1]);
        this._element.insertBefore(this._createSelect,this._element.children[count - 1]);
        this._element.insertBefore(this._channel, this._element.children[count -2]);  
    }
}

class ViewLight extends View {
    constructor (obg, rootElement) {
        super (obg, rootElement);
        this._ObjLight = obg;
        this._light = document.createElement("div");
    }

    stateChange () {
        super.stateChange();
        this._light.innerText = `Процент Света: ${this._ObjLight.state ? this._ObjLight.light : "" }`;
    }

    render () {
        super.render();
        let self = this;
        let range = document.createElement("input");

        let rangLight = function () {
            range.type = "range";
            range.oninput = function(){
                self._ObjLight.on();
                self._ObjLight.light = range.value;
                self.stateChange();
                if (range.value == 0) {
                    self._ObjLight.off();
                    self.stateChange();
                }
            }
        }

        rangLight();
        this.stateChange();
        let count = this._element.children.length; 
        this._element.insertBefore(range, this._element.children[count -1]);
        this._element.insertBefore(this._light, this._element.children[count -1]);
        
    }
}

//------------------------------

class FormAdd {
    constructor () {
        this._addElement = document.getElementById("add")
        this._form = document.createElement("form");
        this._form.className = "form";
        this._form.name = "form";
        this._createButton = document.createElement("input");
        this._createButton.type = "button";
        this._createButton.value = "Создать";
        this._createSelect = document.createElement("select");
        
    }
    
    addSelect(text) {
        let p = document.createElement("p");   
        let label = document.createElement("label")
        p.className = "field";
        label.innerHTML = text;
        
        let option = document.createElement("option")
        option.disabled = true;
        option.selected = true;
        option.innerHTML = "Выберите тип"

        let option1 = document.createElement("option");
        option1.value = "TV";
        option1.innerHTML = "TV";

        let option2 = document.createElement("option");
        option2.value = "Fridge";
        option2.innerHTML = "Fridge";

        let option3 = document.createElement("option");
        option3.value = "Light";
        option3.innerHTML = "Light";

        let option4 = document.createElement("option");
        option4.value = "My";
        option4.innerHTML = "Свой тип";

        this._createSelect.appendChild(option);
        this._createSelect.appendChild(option1);
        this._createSelect.appendChild(option2);
        this._createSelect.appendChild(option3);
        this._createSelect.appendChild(option4);
        p.appendChild(label)
        p.appendChild(this._createSelect)
        this._form.appendChild(p);
    }

    addInput(text, type) {
        let p = document.createElement("p");
        p.className = "field";
        p.id = type;
        let label = document.createElement("label")
        label.innerHTML = text;
        let addIn = document.createElement("input");
        addIn.name = type;
        addIn.id = type;
        p.appendChild(label)
        p.appendChild(addIn);
        if (type == "type") {
            this._form.insertBefore(p, this._form.firstElementChild.nextElementSibling);
        }
        else {
            this._form.appendChild(p); 
        }     
    }

    addListenerEvent() {
        this._createButton.addEventListener("click", () => {   
            let typeObj = this._form.elements[0].value;
            let modelObj = this._form.elements.model.value;
    
            switch(typeObj) {
                case "TV":
                    var createObject = new ObjTV("TV", modelObj);
                    var createView = new ViewTV(createObject, document.getElementById("root"));
                    break;
                case "Fridge":
                    var createObject = new ObjFridge("Fridge", modelObj);
                    var createView = new ViewFridge(createObject, document.getElementById("root"));
                    break;
                case "Light":
                    var createObject = new ObjLight("Light", modelObj);
                    var createView = new ViewLight(createObject, document.getElementById("root"));
                    break;
                default :
                    if(this._form.elements.type == undefined) return;            
                    var createObject = new Obj(this._form.elements.type.value, modelObj);
                    var createView = new View(createObject, document.getElementById("root"));    
                    break;
            }
    
            createView.render();     
        });

        this._createSelect.addEventListener("change", () => { 
            if (this._form.elements[0].value == "My") {
                this.addInput("Введите свой тип: ", "type")
            }
            if (this._form.elements[0].value != "My" && document.getElementById("type") != null) {
                this._form.removeChild(document.getElementById("type")); 
            }
        });
    };

    create() {
        this.addListenerEvent();
        this.addSelect("Выбирете тип обектв: ");
        this.addInput("Введите модель: ", "model");
        this._form.appendChild(this._createButton);
        this._addElement.innerHTML = "</br>";
        this._addElement.appendChild(this._form);
    }
}

let formFromAddObject = new FormAdd();
formFromAddObject.create();




