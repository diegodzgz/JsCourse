//Variables
let cities =["london","mexico city","miami","los angeles","new york city","tokyo","madrid","berlin","paris","rome"]
var modal = document.getElementById("myModal");
var weatherIcons = {Clear:"sunny",Clouds:"cloudy",Rain:"rain"};
var typeChange = 'farenheit';
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

//onChange de los campos
var onChange = function (event,type){
    
    let dato = event.value;
    let temperatureChange=calculate(event.value, type);
    let isNumber = validateNumber(temperatureChange);
    if(type==='celsius'&&isNumber){
        document.getElementById("celcius").value = temperatureChange;
        changeColor(temperatureChange,type);
    }else if(type==="farenheit"&&isNumber){
        document.getElementById("farenheit").value = temperatureChange;
        changeColor(temperatureChange,type);
    }
}

//calcular temperatura
function calculate(number,type){
    let isNumber = validateNumber(number);
    let temperatura =0;
    if(isNumber && type==='celsius'){
        temperatura = (number - 32)/ 1.8;
        temperatura = parseFloat(temperatura).toFixed(2);
        return temperatura;
        
    }else if(isNumber && type==="farenheit"){
        temperatura = (number * 1.8) + 32;
        temperatura = parseFloat(temperatura).toFixed(2);
        return temperatura;
        
    }else{
        document.getElementById('farenheit').disabled = true;
        document.getElementById('celcius').disabled = true;
        modal.style.display = "block";
        setTimeout(function(){modal.style.display = "none"}, 5000);
        enableText();
    }
}

//Validación de datos
function validateNumber(number){
    let value = false;
    if(!isNaN(number) && (number>=0 || number<= 0)&& number!=""){
        value = true
    }

    return value;
}


//funcionalidad del Modal
function closeModal(){
    modal.style.display="none";
    enableText();
    
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
  enableText();
}

//   When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    enableText();
  }
}

//habilitar campos
function enableText(){
    document.getElementById('farenheit').disabled = false;
    document.getElementById('celcius').disabled = false;
}

//Api de temperaturas
var ciudad = cities[Math.floor(Math.random() * 10)];
fetch("https://community-open-weather-map.p.rapidapi.com/find?q="+ciudad+"&cnt=1&mode=null&lon=0&type=link%2C%20accurate&lat=0&units=metric", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "fe2b4b0ca7msh95b88547479254dp193573jsn15f4614a9754",
		"x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
	}
})
.then(response => response.json())
.then(data=>{

        let title = document.getElementById("titleTemp");
        let label = document.getElementById("tempLabel");
        let fecha = document.getElementById("dateSpan");
        let weatherStatus = document.getElementById("weatherStatus"); 
        let date = new Date();
        var dd = date.getDate();

        document.getElementById("weatherIcon").classList.remove('wi-day-cloudy');
        let status = weatherIcons[data["list"][0]["weather"][0]["main"] ];
        document.getElementById("weatherIcon").classList.add('wi-day-'+status);

        title.textContent =  ciudad;
        label.textContent = data["list"][0]["main"]["temp"] + " " + label.textContent;
        fecha.textContent = dd + monthNames[date.getMonth()];
        weatherStatus.textContent = data["list"][0]["weather"][0]["main"];
    }
);

//cambio de color del background
function changeColor(temperatura,type){
    if((((temperatura>=0&&temperatura<10)||(temperatura<=0&&temperatura>-10))&& type==="celsius")||(((temperatura>=32&&temperatura<50)||(temperatura<=32&&temperatura>14))&& type==="farenheit")){
        document.body.style.background = "linear-gradient(to right, rgb(41, 128, 185), rgb(109, 213, 250), rgb(255, 255, 255))";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundSize = "inital";
    }else{
        if((temperatura>0 && type ==="celsius")||(temperatura>32 && type ==="farenheit")){
            
            if(((temperatura >=10 && temperatura<=30)&&type ==="celsius")||((temperatura >=50 && temperatura<=86)&&type ==="farenheit")){
                document.body.style.background = "linear-gradient(to right, rgb(226 224 138), rgb(230 171 120), rgb(236 211 211)";
            }else if(((temperatura >30 && temperatura<=50)&&type ==="celsius")||((temperatura >86 && temperatura<=122)&&type ==="farenheit")){
                document.body.style.background = "linear-gradient(to right, rgb(236 173 31), rgb(224 106 61), rgb(232 112 112))";
            }else{
                document.body.style.background = "linear-gradient(to right, rgb(247 123 123), rgb(247 57 48), rgb(162 10 10))";
                
            }
        }else if((temperatura<0 &&type=='celsius')||(temperatura<32 &&type=='farenheit')){
            if(((temperatura <=-10 && temperatura>=-30)&&type ==="celsius")||((temperatura <=14 && temperatura>=-22)&&type ==="farenheit")){
                document.body.style.background = "linear-gradient(to right, rgb(119 189 234), rgb(162 219 239), rgb(255, 255, 255))";
            }else if(((temperatura <-30 && temperatura >=-50)&&type ==="celsius")||((temperatura <14 && temperatura >=-58)&&type ==="farenheit")){
                document.body.style.background = "linear-gradient(to right, rgb(152 202 234), rgb(209 235 245), rgb(232 244 249))";
            }else{
                document.body.style.background = "linear-gradient(to right, rgb(223 236 245), rgb(233 243 249), rgb(255 255 255))";           
            }
            
        }
    }
    
}

//change weather temperature option
var temperatureWidget = document.getElementById("tempLabel");


temperatureWidget.onclick = function() {
    let label = document.getElementById("tempLabel");
    let numericValue = label.textContent;
    if(typeChange==="farenheit"){
        label.textContent = calculate(numericValue.slice(0,-1),typeChange);
        typeChange="celsius"
    }else if(typeChange==="celsius"){
        label.textContent = calculate(numericValue.slice(0,-1),typeChange);
        typeChange="farenheit"
    }
    
}
