"use strict";

/*
Задание №1. ECMAScript 5. Объектно-ориентированное программирование. Работа с DOM
1. Разработайте архитектуру программного обеспечения, реализующего моделирование системы управления компонентами "умного дома".
2. Функциональные требования к системе моделирования компонентов "умного дома":
– в системе должно быть смоделировано не менее 3 типов компонент "умного дома", например: светильник, обогрев, жалюзи, сигнализация и др.;
– интерфейс программы: Web-интерфейс на основе работы с DOM;
– управление программой: с помощью графического Web-интерфейса, который должен позволять:
а) конфигурировать "умный дом" (добавлять, удалять компоненты);
б) управлять состоянием компонент "умного дома" (включать/выключать, закрывать/открывать компоненты и другие команды);
в) приветствуются дополнительные команды по усмотрению разработчика;
– в процессе выполнения, программа выдает информацию о текущем состоянии всех компонент "умного дома".
3. Разработайте программу, которая моделирует работу системы управления компонентами "умного дома".
4. Не функциональные требования к программе:
– при разработке программы должен использоваться объектно-ориентированный подход с поддержкой всех возможностей ООП, принципы SOLID.
5. Система моделирования (управления) умным домом в составе минимум 3 типов компонентов (как указано в функциональных требованиях) 
должна включать 1 обязательный компонент с расширенными возможностями управления. Например, телевизор, программная модель которого 
включает все возможные состояния сущности "телевизор" и возможности по управлению им, например: включение/выключение, получение 
списка каналов, переключение каналов, поиск каналов, настройки телевизора и т.д.
*/



function Obj (a,b) {
      this._type = a;
      this._model = b;
      this._state = false;
}
Obj.prototype.on = function() {
    this._state = true;
}
Obj.prototype.off = function() {
    this._state = false;
}
Obj.prototype.getState = function() {
    return this._state;
}
Obj.prototype.getModel = function() {
    return this._model;
}
Obj.prototype.getType = function() {
    return this._type;
}  

//-------------------------------------------

function ObjFridge (a,b) {
    Obj.call(this, a, b);
    this._currentTemp = 0;
}

ObjFridge.prototype = Object.create(Obj.prototype);
ObjFridge.prototype.constructor = ObjFridge;

ObjFridge.prototype.on = function() {
    Obj.prototype.on.call(this);
    var self = this;
    if(this._currentTemp > -19) {     
        setTimeout(function(){
            self._currentTemp -=2;
        }, 500)
    }
};

ObjFridge.prototype.off = function(){
    Obj.prototype.off.call(this);
    var self = this;
    if(this._currentTemp < 0) {    
        setTimeout(function(){          
            self._currentTemp +=2;
        }, 500)
    }  
};

ObjFridge.prototype.getCurrentTemp = function() {
    return this._currentTemp;
};

//---------------------------------------------

function ObjTV (a,b) {
    Obj.call(this, a, b);
    this._curentChannel = 0;
    this._channels = ["Новый Канал", "1+1", "ТЕТ"];
};

ObjTV.prototype = Object.create(Obj.prototype); 
ObjTV.prototype.constructor = ObjTV;

ObjTV.prototype.changeChannel = function(a) {
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

ObjTV.prototype.chageChannelList = function(a) {
    for (var i =0; i <= this._channels.length -1 ; i ++) {      
        if (a == this._channels[i]){
            this._curentChannel = i;
        }
    }
}

ObjTV.prototype.setChannel = function(chanel) {
    for (var i in this._channels) {
        if(this._channels[i] == chanel || chanel == "" || chanel == " "){
            return;       
        }
    }
    this._channels.push(chanel); 
}

ObjTV.prototype.getChannel = function() {
    return this._channels[this._curentChannel];
}

ObjTV.prototype.getListChannel = function () {
    return this._channels;
}

//---------------------------------------------

function ObjLight (a,b) {
    Obj.call(this, a, b);
    this._light = 0;
}

ObjLight.prototype = Object.create(Obj.prototype); 
ObjLight.prototype.constructor = ObjLight;

ObjLight.prototype.setLight = function(a) {
    this._light = a;
}

ObjLight.prototype.getLight = function() {
    return this._light;
}

//----------------------------------------------
//View:

function View (obg, rootElement){
    this._objModel = obg;
    this._rootElement = rootElement;
    this._type = document.createElement("div");
    this._state = document.createElement("div");
    this._btnOnOff = document.createElement("div");
}

View.prototype._stateChange = function() {
    this._type.innerText = "Объект: " + this._objModel.getType();
    this._state.innerText = "Состояние: " + (this._objModel.getState() ? "вкл." : "выкл.");
}
   
View.prototype.render = function() {
    var self = this;
  
    this.element = document.createElement("div");
    this.element.className = "element " + this._objModel.getType();
    
    var model = document.createElement("div");
    model.innerText = "Модель: " + this._objModel.getModel();

    var onBtn = document.createElement("button");
    onBtn.type = "button";
    onBtn.innerHTML = "Вкл.";
    onBtn.className = "on";
    onBtn.onclick = function(){
        self._objModel.on();
        self._stateChange();
    };
    
    var offBtn = document.createElement("button");
    offBtn.type = "button";
    offBtn.innerHTML = "Выкл.";
    offBtn.className = "off";
    offBtn.onclick = function(){
        self._objModel.off();
        self._stateChange();
    };

    this._stateChange();

    this.element.appendChild(this._type);
    this.element.appendChild(model);
    this.element.appendChild(this._state);
    this._btnOnOff.appendChild(onBtn);
    this._btnOnOff.appendChild(offBtn);
    this.element.appendChild(this._btnOnOff);
    //this.element.appendChild(onBtn);
    //this.element.appendChild(offBtn);
    this._rootElement.appendChild(this.element);
};

//-----------------------------------------------------

function ViewFridge (obg, rootElement) {
    View.call(this, obg, rootElement);
    this.ObjFridge = obg;
    this._temp = document.createElement("div");
}

ViewFridge.prototype = Object.create(View.prototype); 
ViewFridge.prototype.constructor = ViewFridge;

ViewFridge.prototype._stateChange = function () {
    View.prototype._stateChange.call(this);
    this._temp.innerText = "Темп.: " + this.ObjFridge.getCurrentTemp();
};

ViewFridge.prototype.render = function () {
    View.prototype.render.call(this);
    var count = this.element.children.length;
    this.element.insertBefore(this._temp, this.element.children[count - 2]);
};


//--------------------------------------------------------


function ViewTV (obg, rootElement) {
    View.call(this, obg, rootElement);
    this.ObjTV = obg;
    this._channel = document.createElement("div");
    this._createSelect = document.createElement("select");
}

ViewTV.prototype = Object.create(View.prototype); 
ViewTV.prototype.constructor = ViewTV;

ViewTV.prototype._stateChange = function () {
    View.prototype._stateChange.call(this);
    this._channel.innerText = "Канал: " + (this.ObjTV.getState() ? this.ObjTV.getChannel() : "" );
}

ViewTV.prototype.render = function () {
    View.prototype.render.call(this);
    var _formAddChannel = document.createElement("form");
    var self1 = this.ObjTV;
    var self = this; 

    var addListChannel = function() {
        var masChannel = self.ObjTV.getListChannel(); 
        var children = self._createSelect.childNodes;
        
        for (var i = 0; i < masChannel.length; i++) {
            
            if (children[i+1] != undefined && children[i+1].value == masChannel[i]) {                 
                continue;
            }

            var option = document.createElement("option"); 
            option.value = masChannel[i];
            option.innerHTML = masChannel[i];
            self._createSelect.appendChild(option);  
        }

        if (self._createSelect[0].value != "Выберите Канал:"){
            var option = document.createElement("option");
            option.disabled = true;
            option.selected = true;
            option.innerHTML = "Выберите Канал:"
            self._createSelect.insertBefore(option, self._createSelect.firstChild);
        }

        self._createSelect.onchange = function(){
                self.ObjTV.on();
                self.ObjTV.chageChannelList(self._createSelect.value);
                self._stateChange();
        }
    }

    var chanelInput = function(){   
        var button = document.createElement("input");
        var addIn = document.createElement("input");
        button.type = "button";
        button.name = "addChannel"
        button.value = "Добавить канал: ";
        addIn.name = "addChanel";
        addIn.id = "addChanel";
        _formAddChannel.className = "addChannel"
        _formAddChannel.appendChild(button);
        _formAddChannel.appendChild(addIn); 
        button.onclick = function(){
            self1.setChannel(_formAddChannel.elements.addChanel.value);
            addIn.value = "";
            addListChannel();
        }  
    }

    var nextChangeBtn = document.createElement("button");
    nextChangeBtn.type = "button";
    nextChangeBtn.innerHTML = "Следующий канал";
    //nextChangeBtn.className = "on";
    nextChangeBtn.onclick = function(){
        //if (self.ObjTV.getState() == true){
            self.ObjTV.on();
            self.ObjTV.changeChannel("next")
            self._stateChange();
        //}
    };

    var backChangeBtn = document.createElement("button");
    backChangeBtn.type = "button";
    backChangeBtn.innerHTML = "Предыдущий канал";
    backChangeBtn.onclick = function(){
            self.ObjTV.on();
            self.ObjTV.changeChannel("back");
            self._stateChange();
    };

    chanelInput();
    addListChannel();
    var count = this.element.children.length;     
    this.element.insertBefore(backChangeBtn, this.element.children[count - 1]);
    this.element.insertBefore(nextChangeBtn, this.element.children[count -1]);
    this.element.insertBefore(_formAddChannel, this.element.children[count - 1]);
    this.element.insertBefore(this._createSelect,this.element.children[count - 1]);
    this.element.insertBefore(this._channel, this.element.children[count -2]);  
}


//---------------------------------------------------------------

function ViewLight (obg, rootElement) {
    View.call(this, obg, rootElement);
    this.ObjLight = obg;
    this._light = document.createElement("div");
    
}
ViewLight.prototype = Object.create(View.prototype); 
ViewLight.prototype.constructor = ViewLight;

ViewLight.prototype._stateChange = function () {
    View.prototype._stateChange.call(this);
    this._light.innerText = "Процент Света: " + (this.ObjLight.getState() ? this.ObjLight.getLight() : "" );
}

ViewLight.prototype.render = function () {
    View.prototype.render.call(this);
    var self = this;
    var range = document.createElement("input");

    var rangLight = function () {
        range.type = "range";
        range.oninput = function(){
            self.ObjLight.on();
            self.ObjLight.setLight(range.value);
            self._stateChange();
            if (range.value == 0) {
                self.ObjLight.off();
                self._stateChange();
            }
        }
    }

    rangLight();
    this._stateChange();
    var count = this.element.children.length; 
    this.element.insertBefore(range, this.element.children[count -1]);
    this.element.insertBefore(this._light, this.element.children[count -1]);
        
}

//------------------------------------------------------------------

function FormAdd (){
    var _addElement = document.getElementById("add")
    var _form = document.createElement("form");
    _form.className = "form";
    _form.name = "form";

    var createButton = document.createElement("input");
    createButton.type = "button";
    createButton.value = "Создать";

    var createSelect = document.createElement("select");

    var addSelect = function(text) {
        var p = document.createElement("p");   
        var label = document.createElement("label")
        p.className = "field";
        label.innerHTML = text;
        
        var option = document.createElement("option")
        option.disabled = true;
        option.selected = true;
        option.innerHTML = "Выберите тип"

        var option1 = document.createElement("option");
        option1.value = "TV";
        option1.innerHTML = "TV";

        var option2 = document.createElement("option");
        option2.value = "Fridge";
        option2.innerHTML = "Fridge";

        var option3 = document.createElement("option");
        option3.value = "Light";
        option3.innerHTML = "Light";

        var option4 = document.createElement("option");
        option4.value = "My";
        option4.innerHTML = "Свой тип";

        createSelect.appendChild(option);
        createSelect.appendChild(option1);
        createSelect.appendChild(option2);
        createSelect.appendChild(option3);
        createSelect.appendChild(option4);
        p.appendChild(label)
        p.appendChild(createSelect)
        _form.appendChild(p);
    }

    var addInput = function(text, type) {
        var p = document.createElement("p");
        p.className = "field";
        p.id = type;
        var label = document.createElement("label")
        label.innerHTML = text;
        var addIn = document.createElement("input");
        addIn.name = type;
        addIn.id = type;
        p.appendChild(label)
        p.appendChild(addIn);
        if (type == "type") {
            _form.insertBefore(p, _form.firstElementChild.nextElementSibling);
        }
        else {
            _form.appendChild(p); 
        }     
    }

    createButton.onclick = function() {  
        var typeObj = _form.elements[0].value;
        var modelObj = _form.elements.model.value;

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
                if(_form.elements.type == undefined) return;            
                var createObject = new Obj(_form.elements.type.value, modelObj);
                var createView = new View(createObject, document.getElementById("root"));    
                break;
        }

        createView.render();     
    }

    createSelect.onchange = function(){
        if (_form.elements[0].value == "My") {
            addInput("Введите свой тип: ", "type")
        }
        if (_form.elements[0].value != "My" && document.getElementById("type") != null) {
            _form.removeChild(document.getElementById("type")); 
        }
    }

    addSelect("Выбирете тип обектв: ")
    addInput("Введите модель: ", "model");
    _form.appendChild(createButton);
    _addElement.innerHTML = "</br>";
    _addElement.appendChild(_form);
}

var formFromAddObject = new FormAdd();




