/**
 * 이미지를 배경에 무작위로 넣는 js파일
 * 사진 출처 : unsplash.com
 */
const body = document.querySelector("body");

const IMG_NUMBER = 8;

function paintImage(imgNumber) {
    const image = new Image();
    image.src = `images/${imgNumber + 1}.jpg`;
    image.classList.add("bgImage"); //이미지 추가 
    body.appendChild(image)
}
//숫자 생성. Javasrcipt에 math 모듈을 이용
//Math.random : 임의의 숫자 생성
//Math.floor :소숫점 내림
function genRandom(){
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}

function init(){
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init();