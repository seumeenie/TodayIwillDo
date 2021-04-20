/**
 * 유저의 Location 좌표 정보를 읽어 저장하는 js 파일(저장되어있다면 요청)
 */

const weather = document.querySelector(".js-weather .weather_text");

const API_KEY = "dd58d0e2809a292d1e02f21a1a1ce6d1";
const COORDS = "coords";
//fetch를 사용해 api데이터를 불러옴
function getWeather(lat, lng){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
    .then(function(response){ //이전 작업이 완전히 끝나면 괄호 안 함수를 호출시키는 then 사용(사용하지 않았을 시 이전 작업이 다 완료되지 않았어도 그 다음 함수가 실행됨. ->오류 발생)
        return response.json();
    }).then(function(json){ //json 데이터가 잘 준비되면
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature}˚C, ${place}`;
    });
}
//좌표를 저장
function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}
//좌표를 가져오는데 성공했을때를 처리하는 함수
function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = { //객체에 변수의 이름과 객체의 key이름을 같게 저장 할때 
        latitude, // = latitude =latitude,
        longitude // = longitude = longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(){
    console.log("Cant access geo location");
}
//좌표를 요청하는 함수 (navigator api 사용)
//getCurrentPosition(a,b) : 유저의 현재 위치를 요청하고 성공시 handleGeoSuccess, 실패시 handleGeoError 함수를 실행 
function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS); //저장된 좌표 가져옴
    if(loadedCoords === null){
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords); // string값을 object화 시킴
        //console.log(parseCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude); //object화 된 위도,경도를 가져옴
    }
}

function init() {
    loadCoords();
}

init();