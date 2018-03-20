"use strict";

function Obj (a,b) {
      var _type = a;
      var _model = b;
      var _state = false;

    this.on = function() {
      _state = true;
    }
    this.off = function() {
      _state = false;
     }
    this.getState = function() {
       return _state;
    }
    this.getModel = function() {
        return _model;
    }
    this.getType = function() {
        return _type;
    }  
}

function View (obg, rootElement){
    this._objModel = obg;
    this._rootElement = rootElement;
    var _type = document.createElement("div");
    var _state = document.createElement("div");
    var _btnOnOff = document.createElement("div");
   
    this._stateChange = function() {
        _type.innerText = "Объект: " + this._objModel.getType();
        _state.innerText = "Состояние: " + (this._objModel.getState() ? "вкл." : "выкл.");
    }
   
    this.render = function() {
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

        this.element.appendChild(_type);
        this.element.appendChild(model);
        this.element.appendChild(_state);
        _btnOnOff.appendChild(onBtn);
        _btnOnOff.appendChild(offBtn);
        this.element.appendChild(_btnOnOff);
        //this.element.appendChild(onBtn);
        //this.element.appendChild(offBtn);
        this._rootElement.appendChild(this.element);
    }
}

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

function ObjFridge (a,b) {
    Obj.call(this, a, b);
    var _currentTemp = 0;

    var parentOn = this.on;
    this.on = function() {
        parentOn.call(this);
        if(_currentTemp > -19) {     
            setTimeout(function(){
                _currentTemp -=2;
            }, 500)
        }
    }

    var parentOff = this.off;
    this.off = function(){
        parentOff.call(this);
        if(_currentTemp < 0) {    
            setTimeout(function(){
                _currentTemp +=2;
            }, 500)
        }  
    }



    this.getCurrentTemp = function() {
        return _currentTemp;
    }
}

function ViewFridge (obg, rootElement) {
    View.call(this, obg, rootElement);
    this.ObjFridge = obg;
    var _temp = document.createElement("div");
    
    var parentStateChange = this._stateChange;
    this._stateChange = function () {
        parentStateChange.call(this);
        _temp.innerText = "Темп.: " + this.ObjFridge.getCurrentTemp();
    }

    var parentRender = this.render;
    this.render = function () {
        parentRender.call(this);
        var count = this.element.children.length;
        this.element.insertBefore(_temp, this.element.children[count - 2]);
    }
}

function ObjTV (a,b) {
    Obj.call(this, a, b);
    var _curentChannel = 0;
    var _channels = ["Новый Канал", "1+1", "ТЕТ"];

    var parentOff = this.off;
    this.off = function(){
        parentOff.call(this);
    }

    this.changeChannel = function(a) {
        if (_channels.length -1 <= _curentChannel && a == "next"){
            _curentChannel = 0;
            return _channels[_curentChannel];
        }
        else if (_curentChannel <= 0 && a == "back"){
            _curentChannel = _channels.length - 1;
            return _channels[_curentChannel];
        }
        else if (a == "next")
        {
            _curentChannel++;
            return _channels[_curentChannel];
        }
        else {
            _curentChannel --;
            return _channels[_curentChannel];
        }
    }

    this.chageChannelList = function(a) {
        for (var i =0; i <= _channels.length -1 ; i ++) {      
            if (a == _channels[i]){
                _curentChannel = i;
            }
        }
    }

    this.setChannel = function(chanel) {
        for (var i in _channels) {
            if(_channels[i] == chanel || chanel == "" || chanel == " "){
                return;       
            }
        }
        _channels.push(chanel); 
    }

    this.getChannel = function() {
        return _channels[_curentChannel];
    }

    this.getListChannel = function () {
        return _channels;
    }
}

function ViewTV (obg, rootElement) {
    View.call(this, obg, rootElement);
    this.ObjTV = obg;
    var _channel = document.createElement("div");
    var createSelect = document.createElement("select");

    var parentStateChange = this._stateChange;
    this._stateChange = function () {
        parentStateChange.call(this);
        _channel.innerText = "Канал: " + (this.ObjTV.getState() ? this.ObjTV.getChannel() : "" );
    }

    var parentRender = this.render;
    this.render = function () {
        parentRender.call(this);
        var _formAddChannel = document.createElement("form");
        var self1 = this.ObjTV;
        var self = this; 

        var addListChannel = function() {
            var masChannel = self.ObjTV.getListChannel(); 
            var children = createSelect.childNodes;
            
            for (var i = 0; i < masChannel.length; i++) {
                
                if (children[i+1] != undefined && children[i+1].value == masChannel[i]) {                 
                    continue;
                }

                var option = document.createElement("option"); 
                option.value = masChannel[i];
                option.innerHTML = masChannel[i];
                createSelect.appendChild(option);  
            }

            if (createSelect[0].value != "Выберите Канал:"){
                var option = document.createElement("option");
                option.disabled = true;
                option.selected = true;
                option.innerHTML = "Выберите Канал:"
                createSelect.insertBefore(option, createSelect.firstChild);
            }

            createSelect.onchange = function(){
                    self.ObjTV.on();
                    self.ObjTV.chageChannelList(createSelect.value);
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
        //backChangeBtn.className = "off";
        backChangeBtn.onclick = function(){
            //if (self.ObjTV.getState() == true){
                self.ObjTV.on();
                self.ObjTV.changeChannel("back");
                self._stateChange();
            //}
        };

        chanelInput();
        addListChannel();
        var count = this.element.children.length;     
        this.element.insertBefore(backChangeBtn, this.element.children[count - 1]);
        this.element.insertBefore(nextChangeBtn, this.element.children[count -1]);
        this.element.insertBefore(_formAddChannel, this.element.children[count - 1]);
        this.element.insertBefore(createSelect,this.element.children[count - 1]);
        this.element.insertBefore(_channel, this.element.children[count -2]);  
    }
}

function ObjLight (a,b) {
    Obj.call(this, a, b);

    var _light = 0;

    this.setLight = function(a) {
        _light = a;
    }

    this.getLight = function() {
        return _light;
    }
}

function ViewLight (obg, rootElement) {
    View.call(this, obg, rootElement);
    this.ObjLight = obg;
    var _light = document.createElement("div");

    var parentStateChange = this._stateChange;
    this._stateChange = function () {
        parentStateChange.call(this);
        _light.innerText = "Процент Света: " + (this.ObjLight.getState() ? this.ObjLight.getLight() : "" );
    }

    var parentRender = this.render;
    this.render = function () {
        parentRender.call(this);
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
        this.element.insertBefore(_light, this.element.children[count -1]);
        
    }
}
var formFromAddObject = new FormAdd();




