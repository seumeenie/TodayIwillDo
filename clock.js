/**
 * clock info for using realtime clock
 */
// index.html에서 클래스명이 js-clock인 div태그를 찾아내고 요소를 반환하는 변수 생성(const라 가변적x)
const clockContainer = document.querySelector(".js-clock"),
// 위 변수(div공간)에서 태그 h4를 찾아내고 요소를 반환하는 변수 생성
    clockTitle = clockContainer.querySelector("h4"); 

function getTime() {
    const date = new Date(); //객체 생성
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
        minutes < 10 ? `0${minutes}` : minutes
        }:${seconds < 10 ?`0${seconds}`: seconds}`; // 화면에 표시될 시각의 내용
    }
// 초기화
function init() {
    getTime(); //시,분,초 정보 받아옴. 
    setInterval(getTime, 1000); //realtime 
}

init();