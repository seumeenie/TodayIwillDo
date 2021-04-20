/**
 * clock info for using realtime clock
 */
// index.html에서 클래스명이 js-clock인 div태그를 찾아내 요소를 가져오는 변수 생성(const라 가변적x)
const clockContainer = document.querySelector(".js-clock"),
// index.html에서의 위 변수(div공간)에서 태그 h4를 찾아내 요소를 가져오는 변수 생성
    clockTitle = clockContainer.querySelector("h4"); 

function getTime() { //2. 얻은 시간을 가지고 시계 부분 HTML을 변경시킴(매초마다)
    const date = new Date(); //객체 생성
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${  //~<,? : ~가 10보다 작으면 ?뒤의 문자열인 '0${hours}'를 리턴 아니면 : 뒤의 hours를 리턴
        minutes < 10 ? `0${minutes}` : minutes
        }:${seconds < 10 ?`0${seconds}`: seconds}`; // 화면에 표시될 시각의 내용
    }
// 초기화
function init() { //1. 시간을 얻는 부분
    getTime(); //초기화 과정에서 시간 정보 받아옴. 
    setInterval(getTime, 1000); //realtime //setInterval : 두 인자값을 받음. 함수, 실행할 시간 간격
}

init();