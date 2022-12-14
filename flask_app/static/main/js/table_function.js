function myFunc() {
    return info
}

table_information = myFunc()

var navLinks = document.getElementById("navLinks");

function showMenu() {
    navLinks.style.right = "0";
}

function hideMenu() {
    navLinks.style.right = "-200px";
}

let list_map = []
for (let i = 0; i < table_information.length; i++){
    const temp_map = new Map(Object.entries(table_information[i]));
    list_map.push(temp_map)
}
let table_size = list_map.length;
var target_list = [];
let list = Object.keys(table_information[0])

for(let i=1;i<list.length; ++i){
    if (sessionStorage.getItem(list[i])!== null){
        console.log(sessionStorage.getItem(list[i]))
        target_list.push(sessionStorage.getItem(list[i]))
    }
}


var table_need = new Map();
for (let i=0; i < table_size; ++i) {
    var temp_name = list_map[i].get('Team Members')
    let temp_map = new Map();

    if (target_list.includes(temp_name)){
        for(let j=0;j<target_list.length;++j){
            temp_map.set(target_list[j], list_map[i].get(target_list[j]))
        }
        table_need.set(temp_name, temp_map)
    }
}

window.onload = function(){
    table_display()
}
const table_container = document.getElementById("table_container");
function table_display(){
    var column_name = []
    const tbl = document.createElement("table");
    const tblBody = document.createElement("tbody");
    table_need.forEach((value1, key1) => {
        const row = document.createElement("tr");
        value1.forEach((value, key) => {
            column_name.push(key)
            const cell = document.createElement("td");
            const text = document.createTextNode(value)
            cell.appendChild(text);
            row.appendChild(cell);
        });
        var row_cell = row.insertCell(0);
        row_cell.innerHTML = key1;
        tblBody.appendChild(row);

    });

    tbl.appendChild(tblBody);
    document.body.appendChild(tbl);

    var row = tbl.insertRow(0);

    for (let i=0; i<column_name.length/table_need.size; ++i){
        var column_cell = row.insertCell(-1);
        column_cell.innerHTML = column_name[i];
    }
    var extra_cell = row.insertCell(0);
    extra_cell.innerHTML ='';

    tbl.setAttribute("border", "2");

    table_container.appendChild(tbl);
}


function transferBack(){
    sessionStorage.clear();
    location.href = "/selection_page";
}

function graph_page(){
    location.href = "/graph_page";
}