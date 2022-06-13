// let dataBase = [
//     {id: 1 , name:"ali", family: "ahmady",brithday: new Date(2001,1,5),"Math Grade":"15","social studies Grade":"12", "persian Grade": "19" },
//     {id: 2 , name:"ali", family: "ahmady",brithday: new Date(2001,1,5),"Math Grade":"15","social studies Grade":"12", "persian Grade": "19" },
//     {id: 3 , name:"ali", family: "ahmady",brithday: new Date(2001,1,5),"Math Grade":"15","social studies Grade":"12", "persian Grade": "19" },
//     {id: 4 , name:"ali", family: "ahmady",brithday: new Date(2001,1,5),"Math Grade":"15","social studies Grade":"12", "persian Grade": "19" },
//     {id: 5 , name:"ali", family: "ahmady",brithday: new Date(2001,1,5),"Math Grade":"15","social studies Grade":"12", "persian Grade": "19" },
//     {id: 6 , name:"ali", family: "ahmady",brithday: new Date(2001,1,5),"Math Grade":"15","social studies Grade":"12", "persian Grade": "19" },
//     {id: 7 , name:"ali", family: "ahmady",brithday: new Date(2001,1,5),"Math Grade":"15","social studies Grade":"12", "persian Grade": "19" },
//     {id: 8 , name:"ali", family: "ahmady",brithday: new Date(2001,1,5),"Math Grade":"15","social studies Grade":"12", "persian Grade": "19" },
//     {id: 9 , name:"ali", family: "ahmady",brithday: new Date(2001,1,5),"Math Grade":"15","social studies Grade":"12", "persian Grade": "19" },
//     {id: 10, name:"ali", family: "ahmady",brithday: new Date(2001,1,5),"Math Grade":"15","social studies Grade":"12", "persian Grade": "19" },
//     {id: 11, name:"ali", family: "ahmady",brithday: new Date(2001,1,5),"Math Grade":"15","social studies Grade":"12", "persian Grade": "19" },
//     {id: 12, name:"ali", family: "ahmady",brithday: new Date(2001,1,5),"Math Grade":"15","social studies Grade":"12", "persian Grade": "19" },
//     {id: 13, name:"ali", family: "ahmady",brithday: new Date(2001,1,5),"Math Grade":"15","social studies Grade":"12", "persian Grade": "19" },
//     {id: 14, name:"ali", family: "ahmady",brithday: new Date(2001,1,5),"Math Grade":"15","social studies Grade":"12", "persian Grade": "19" },
//     {id: 15, name:"ali", family: "ahmady",brithday: new Date(2001,1,5),"Math Grade":"15","social studies Grade":"12", "persian Grade": "19" },
// ]

const BASE_URL = "https://62a56925b9b74f766a39306d.mockapi.io/api/ex2/students";
;
async function fetchData(url){
   let result;
     await fetch(url).then((res) => {
        return res.json() }).then((arr) => { result = arr;}).catch((e) => {console.error("this is error =>",e);});
    console.log(11,result);
    return result;
}
let dataBase; 

let listTh = document.querySelector("tr");
 let creatArray = async () => {  dataBase = await fetchData(BASE_URL);
    creatTable();
    listTh.addEventListener("click",(event) => { sortAll(event)});
}
let tbody = document.getElementById("tbody");

let info ;
function editor(e){
   info = e.target.closest("tr").children;
    document.querySelector(".form").classList.toggle("hidden")
    
}
let btnE = document.querySelector(".button-E")
let btnC = document.querySelector(".button-C")
btnE.addEventListener("click", () => {
    edited(info)
})
btnC.addEventListener("click", () => {
   
    document.querySelector(".form").classList.add("hidden")
})
function edited(info){
    document.querySelector(".form").classList.add("hidden")
    let inputs = document.querySelectorAll(".input-cell");

        if(inputs[0].value !== ""){
            info[0].innerText = inputs[0].value

        } 
        if(inputs[1].value !== ""){
            info[1].innerText = inputs[1].value

        }
        if(inputs[2].value !== ""){
            info[2].innerText = inputs[2].value

        }
        
        inputs[0].value = "";
        inputs[1].value = "";
        inputs[2].value = "";
    }

function createButton(){
    const editButton = document.createElement("button");
    const deletButton = document.createElement("button");
    editButton.innerText = "Edit";

    deletButton.innerText = "Delet";
    editButton.classList.add("edit-button");
    deletButton.classList.add("delet-button");
    deletButton.addEventListener("click", (e) => {
        
        e.target.closest("tr").remove();
    });
    editButton.addEventListener("click", (e) => {
        editor(e)
    })
    return [editButton, deletButton]

}
 let  creatTable = async () => {
    console.log(13, dataBase);
    await dataBase.forEach( (item) => {
       let row = tbody.insertRow()
       
       
       const values = Object.values(item);
       let cellId = row.insertCell()
       cellId.innerHTML = values[values.length - 1];
       
       for (let i = 0; i < values.length - 1; i++) {
           let cell = row.insertCell()
              if(i === 2){
                cell.setAttribute("data-date",values[i])
                
                cell.innerHTML =` ${new Date(values[i]).getFullYear()}/ ${new Date(values[i]).getMonth()} / ${new Date(values[i]).getDate()}`
              } else{

                  cell.innerHTML = values[i]; 
              }  

            }
          
       const [edit, delet] = createButton()
       row.insertCell().appendChild(edit);
       row.insertCell().appendChild(delet);
   });
  
}
function delet(e){
    console.log(e)
}
function compareDate(date1, date2) {
    if (date1.getFullYear() > date2.getFullYear()) {
      return 1;
    } else if (date1.getFullYear() === date2.getFullYear()) {
      if (date1.getMonth() > date2.getMonth()) {
        return 1;
      } else if (date1.getMonth() === date2.getMonth()) {
        if (date1.getDate() > date2.getDate()) {
          return 1;
        } else if (date1.getDate() === date2.getDate()) {
          return 0;
        } else if (date1.getDate() < date2.getDate()) {
          return -1;
        }
      } else if (date1.getMonth() < date2.getMonth()) {
        return -1;
      }
    } else if (date1.getFullYear() < date2.getFullYear()) {
      return -1;
    }
  }
console.log(1,listTh);
let  isAscending = true;
function sortAll(e){
    let thNum = 0;
    switch (e.target.innerText) {
        case "id" :
            thNum = 0;
            sortType = "Number"
            break; 
            case "Name":
                thNum = 1;
                sortType = "string"
                break;
            case "Family":
                thNum = 2;
                sortType = "string"
                break;
            case "Birthday":
                thNum = 3;
                sortType = "Date"
                break;
            case "Math Grade":
                thNum = 4;
                sortType = "Number";
                break;
            case "Social studies Grade":
                thNum = 5;
                sortType = "Number";
                break;
            case "Persian Grade":
                thNum = 6;
                sortType = "Number";
                break;
        default:
            thNum = 0;
            break;
    }
   const trs = document.querySelectorAll("tr");
  
  let trsList = Array.from(trs);
  trsList.splice(0, 1)
  if(sortType === "Number"){
      
      if(isAscending){
          trsList.sort((a, b) => {return Number(a.children[thNum].innerText) - Number(b.children[thNum].innerText) });

          }else{
              trsList.sort((a, b) => {return Number(b.children[thNum].innerText) - Number(a.children[thNum].innerText) });
              
          }
  }else if(sortType === "string") {
    let textList = trsList.map((a) => {return a.children[thNum].innerText })
   let textTr = {}
   textList.forEach((item, i) => { 
       textTr[item] = trsList[i];
    })
    if(isAscending){
        
        textList.sort();
       
    }else{
        textList.sort();
        textList.reverse();
       
    }

    let newtrList = [] 
    textList.forEach((item) => {
        newtrList.push(textTr[item])
      })      
     trsList = newtrList     
  }else if(sortType === "Date"){
    if(isAscending){
        trsList.sort((a, b) => {return compareDate(new Date(Number(a.children[thNum].dataset.date)),new Date(Number(b.children[thNum].dataset.date)))});
        console.log("sort date-1");
    }else{
        trsList.sort((a, b) => {return compareDate(new Date(Number(b.children[thNum].dataset.date)),new Date(Number(a.children[thNum].dataset.date)))});
        console.log("sort date-2");
        
    }
  }
    
    let arraySort = []
    for (let i = 0; i < trsList.length ; i++) {
        
        arraySort.push(trsList[i].innerHTML);
    }
    for (let i = 0; i < trs.length - 1; i++) {
        
        trs[i + 1].innerHTML = arraySort[i]
        
    }
    isAscending = !isAscending;  
 }
//    let content = trs.map((item) => {return item.innerHTML});
//    trs.sort((a, b) => {return Number(a.childern[0].innerText) - Number(b.childern[0].innerText) })



creatArray()
