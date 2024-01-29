// let car = new Object();
// car.make=`Mazda`;
// car.year=2024;
// car.color=`red`;

// console.log(car.make);

// let car ={
//     make:`Mazda`
//     year:2024
//     color:'red'
// }


// console.log(car);

// console.log(car.make);
// console.log(car['year']);


// let keys=Object.keys(car);
// let values = Object.entries(car);
// console.log(keys);
// console.log(values);


// constructor
// function Car(make,year,color){
//     this.make=make;
//     this.year=year;
//     this.color=color;
//     this.printInfo=()=>{
//         console.log(`${make},${year},${color}`);
//     }
//     this.addYear=()=>{
//         this.year++;
//         return this.year;
//     }
// }
// let mazda = new Car(`Mazda`,2024,"red");
// let dacia = new Car("Dacia",1900,"white");
// console.log(mazda); //accesam obiectul mazda
// console.log(dacia);
// mazda.addYear();
// mazda.addYear();
// mazda.addYear();
// mazda.addYear();
// mazda.printInfo();



// let firstObject = {
//     price:400,
//     color:"black"
// }

// function Computer(price,color){
//     this.price=price;
//     this.color=color;
// }

// let a = new Computer(300,"green");
// let b = new Computer(200,"purple");
// console.log(a)
// console.log(b)

// let inputName = document.getElementById('name');
// console.log(inputName);

// let inputByClass = document.getElementsByClassName(`test`)
// console.log(inputByClass);

// let inputByTag = document.getElementsByTagName('input');
// console.log(inputByTag);


// console.log(document.title);
// console.log(document.URL);
// console.log(document.body);


// //Select by class .
// let element1 = document.querySelector('.test') 
// // Select by id #
// let element2 = document.querySelector('#test')
// // select by tag 
// let element3 = document.querySelector('input')  

// let elements = document.querySelectorAll('input');

// let element = document.querySelector('#name')
// element.value="Hello";


// console.log(element)

// let element = document.querySelector('#table')
// let rows = table.querySelectorAll('td');

// console.log(rows[0].innerText) // textul din casuta 1
// console.log(rows[1].innerText) // textul din casuta 2
// console.log(rows);
// console.log(table);

// let newP=document.createElement('p');
// newP.innerText="Text in paragraf!";
// // document.body.appendChild(newP);
// let h=document.querySelector('h1'); // creez o functie noua h
// h.appendChild(newP); // cu functia h , inserez text`ul din newP in h-ul din html

// function Show(){
//     let h = document.querySelector("h1");
//     h.classList.remove("hidden");
// }
// function Hide(){
//     let h = document.querySelector("h1");
//     h.classList.add("hidden");
// }



function Hi(){
    // let ul = document.querySelector("ul");
    // let li = ul.querySelectorAll("li");
    // li[0].style.color="blue"
    // li[1].style.color="red"
    // li[2].style.color="green"

    // facem altfel

    // let li = document.querySelectorAll("li");
    // li[1].style.color="red"

    //merge daca este un singur "ul" in html

    // let li = document.getElementById("xd");
    // li.style.color="blue"

    let ul = document.querySelector("ul");
    let li = document.createElement("li");
    li.innerText = "Niste text, ce-o fi!"
    ul.appendChild(li)
}

function Remove(){
    let ul = document.querySelector("ul");
    let li = document.querySelectorAll("li");
    if(li.length>0){
        ul.removeChild(li[li.length-1])
    }
}

function addTable(){
    let table2 = document.querySelector('#table2')
    if(!table2){
let people=[{
    name:'Tiberiu'
},
{
    name:'Cristian'
},
{
    name:'George'
},
{
    name:'Marina'
},
{
    name:'Paula'
}]


let table = document.createElement("table")
table.id="table2"
for(i=0;i<people.length;i++){
    let tr = document.createElement("tr");
    let td = document.createElement("td");
    td.innerText = people[i].name;
    tr.appendChild(td);
    table.appendChild(tr);
}
document.body.appendChild(table);
}
}