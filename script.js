const date = new Date();

const renderCalendar = () => {
  date.setDate(1);
// date.setMonth(7)
  const monthDays = document.querySelector(".days");

  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();

  const firstDayIndex = date.getDay();

  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();

  const nextDays = 7 - lastDayIndex - 1;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  document.querySelector(".date h1").innerHTML = months[date.getMonth()];

  document.querySelector(".date p").innerHTML = new Date().toDateString();

  let days = "";

  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDay; i++) {
    if (
      i === new Date().getDate() &&
      date.getMonth() === new Date().getMonth()
    ) {
      days += `<div class="today">${i}</div>`;
    } else {
      days += `<div>${i}</div>`;
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="next-date">${j}</div>`;
    monthDays.innerHTML = days;
  }
};

document.querySelector(".prev").addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

document.querySelector(".next").addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});

renderCalendar();

const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");

inputBox.onkeyup = ()=>{
    let userData = inputBox.value;//Getting user entered value
    if(userData.trim() !=0){ // if user values aren't only spaces
        addBtn.classList.add("active");//Active the add button
    }else{
        addBtn.classList.remove("active");//Unactive the add button
    }
}

addBtn.onclick = ()=>{
    let userData = inputBox.value;//Getting user entered value
    let getLocalStorage = localStorage.getItem("New Todo");//Getting local storage
    if(getLocalStorage == null){ //If local storage is null 
       listArr =[]; // Creating a blank array
    }else{
        listArr = JSON.parse(getLocalStorage); //Transforming  JSON string into a JS object
    }
    listArr.push(userData); //Pushing or adding user data 
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //Transforming JS object into a JSON string
    showTasks();//Calling show task function
    addBtn.classList.remove("active");
}
// Function to add task list inside ul
function showTasks(){
   let getLocalStorage = localStorage.getItem("New Todo"); //Getting local storage
   if(getLocalStorage == null){ //If local storage is null 
    listArr =[]; // Creating a blank array
 }else{
     listArr = JSON.parse(getLocalStorage); //Transforming  JSON string into a JS object
 }
 //Passing the length value in pendingNumber
 const pendingNumb = document.querySelector(".pendingNumb");
 pendingNumb.textContent = listArr.length;
 if(listArr.length > 0){ // If the array length > 0
     deleteAllBtn.classList.add("active");//active  the clear all button
 }else{
    deleteAllBtn.classList.remove("active");//unactive  the clear all button
 }
 let newLiTag='';
 listArr.forEach((element, index) => {
     newLiTag += `<li> ${element} <span onclick="deleteTask(${index})"; ><i class="fas fa-trash"></i></span></li>`;
 });
  todoList.innerHTML = newLiTag; //Adding new li tag inside ul tag
  inputBox.value = "";//once task added leave the input field blank
}

//Function to delete 
function deleteTask(index){
    let getLocalStorage = localStorage.getItem("New Todo");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1);//Delete or remove the particular indexed li
    //After remove the li again update the local storage
    localStorage.setItem("New Todo", JSON.stringify(listArr));//Transfoming JS object into a JSON string
    showTasks();//Calling showTask function
}

//deletes all tasks function
deleteAllBtn.onclick = ()=>{
    listArr = []; //Empty an array
    //After delete all the li again update the local storage
    localStorage.setItem("New Todo", JSON.stringify(listArr));//Transforming JS object into a JSON string
    showTasks();// Calling the showTask function
}
