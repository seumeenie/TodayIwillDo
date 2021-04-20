/**
 * forEach를 이용해 array 안 각각에 대해 function을 실행시켜 해야 할 일 리스트를 만들어 주고 다양한 기능을 넣어 준 js파일
 */

const toDoForm = document.querySelector(".js-toDoForm"), //HTML에서 필요한 것들을 얻는 것
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

let toDos = []; //해야 할 일을 생성할 때마다 toDos라는 array에 추가되도록 함

//id가 있는 li를 이용해 삭제 버튼 활성화 역할
// *****filter : forEach와 같이 array의 모든 아이템을 위한 함수를 실행해 리턴이 true인 아이템들만 갖고 새로운 array를 만듬
function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function(toDo) {
    return toDo.id !== parseInt(li.id); //모든 toDos가 li의 id와 같지 않을 때
  }); // toDos를 교체 (교체가능하게하기위해 toDos array를 let으로 선언)
  toDos = cleanToDos;
  saveToDos();
}
// 위 toDos를 가져와 localStorage에 저장하는 역할
function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); // 자바스크립트는 localStorage에 있는 모든 데이터를 string으로 저장하려고 함 -> object인 toDos를 string이 되도록 JSON.stringify()를 이용해 바꿔줌
}

function paintToDo(text){
    const li = document.createElement("li"); //li 엘리먼트 생성 
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerText = "❌";
    delBtn.className = "toDo_button";
    delBtn.addEventListener("click", deleteToDo); //delBtn에 event를 만듬. event는 클릭으로, 함수는 deleteToDo
    span.innerText = text //submit function에서 온 text
    li.appendChild(delBtn); //appendChild : 뭔가(~)를 부모 element(여기선 li)안에 넣는 것
    li.appendChild(span);
    li.id = newId; //li에게 id 할당 : 삭제 버튼을 클릭 했을 때 어떤 li를 지워야 하는지 알 수 있게 하기 위함
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj); // push 사용 : array안에 element 하나를 넣어줌 (toDos array안에 toDoObj를 넣게 됨)
    saveToDos();
}
//text를 input에 넣고 enter를 누르면 정보가 사라지는 기본 동작 = event
function handleSubmit(event){
    event.preventDefault(); //preventDefault를 이용해 막음
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

//JSON : JavaScript Object Notation의 준말. 데이터를 전달할 때, 자바스크립트가 그걸 다룰 수 있도록 object로 바꿔주는 기능
// forEach : array에 담겨있는 것들 각각에 한번씩 함수를 실행시켜 줌
function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS); //toDos를 가져옴
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos); //가져온 toDos를 자바스크립트 object로 변환
        parsedToDos.forEach(function(toDo) { 
        paintToDo(toDo.text); //각각에 대해서 paintToDo라는 function이 실행 -> 한줄 한줄 리스트를 만들어 줌(그 한줄 마다 li,btn,span이 포함 됨)
    });
}
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit)
}

init();