/**
 * 사용자의 이름을 기억하게 하는 js파일
 * *****localstorage : 작은 자바스크립트 정보를 내 컴퓨터에 저장하는 방법. 브라우저에서 inspect-application-Storage-localStorage로 가면 있는 key-value 값들임
 */

const form = document.querySelector(".js-form"), //querySelector : 아이디나 클래스나 css방식으로 찾은 첫번째 엘리먼트를 가져옴
    input = document.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
    SHOWING_CN = "showing";
//새로고침하면 정보가 사라짐(저장 못함)->이 함수로 저장
function saveName(text){
    localStorage.setItem(USER_LS, text);
}
//text를 input에 넣고 enter를 누르면 정보가 사라지는 기본 동작 = event
function handleSubmit(event){
    event.preventDefault(); //preventDefault를 이용해 막음
    const currentValue = input.value; //정보를 불러옴
    paintGreeting(currentValue); //이 function을 다시 부름 (*****paintGreeting은 text를 필요로 함!)
    saveName(currentValue); //이 함수 불러와 이름도 저장(위 input으로 불러온 value)
}
//유저의 이름 요청
function askForname() {
    form.classList.add(SHOWING_CN); // 클래스가 폼에 이걸 보여줌
    form.addEventListener("submit", handleSubmit);
}
//유저 정보를 화면에 보여줌
function paintGreeting(text){
    form.classList.remove(SHOWING_CN); // 텍스트를 색칠하기 위해 form을 지움
    greeting.classList.add(SHOWING_CN); // greeting을 보여줌
    greeting.className = "greetings_text"; 
    greeting.innerText = `Hello ${text}`; // 보낸 text를 넣음
}
//브라우저 콘솔에 찍히는 정보들을 가져오는 역할
// 로컬 스토리지에서 정보가 저장되면(새로고침 등) 유저를 찾고 있으면 else아래 함수를 실행 
function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){ //if문으로 함수를 부름(null로 있나없나 체크)
        askForname();
    } else { 
        paintGreeting(currentUser); 
    }
}

function init(){
    loadName();
}

init();