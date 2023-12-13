// // 3 variabile 
// // a=string
// // b=numar
// // c=numar
// // declarati variabilele

// let test="George";
// let a=10;
// let b=20;

// inmultim a*b si scriem in consola
// console.log(a*b);

// let a=12;
// let b=23;
// //daca a este par sau impar si daca b este par sau impar

// console.log(a%2);
// console.log(b%2);

// console.log("Prima valoare este:" +a%2+ ",iar a doua valoare este" +b%2);

// console.log(`Valorile sunt: ${a%2} si ${b%2}`)

// let div1=document.getElementById("div1");
// div1.innerText = "am fost aici!";
// div1.style.width = "200px";
// div1.style.height = "200px";
// div1.style.backgroundColor = "lightgreen";

// div1.innerHTML = `<p id="p1">Aici este un paragraf</p>`;

// let test = document.getElementById("p1");
// test.innerText = "Bla bla bla";

// function printName() {
//     console.log("ceva");
// }
// function sum(a,b,c){
//     return a+b+c;
// }
// console.log(sum(2,5,7));
// function printName(){
//     let tiberiu = document.getElementById("name_input").value;
//     console.log(tiberiu)
// }

// function printName(){
//     let a=15;
//     if(a<5){
//         console.log('a este mai mic decat 5');
//     }



//      else if(a>5){
//         console.log('a este mai mare decat 5')
//     }

//     console.log(a)
// }

// Operatori logici: 
// Si = &&
// Sau = ||

// true && true = true
// true && false = false

// true || true = true
// true || false = true
// false || false = false

// function printName(){
//     let input = document.getElementById("name_input").value;
//     if(input=="Tiberiu"){
//         alert("Hello Tiberiu")
//     }
//     if(input!="Tiberiu"){
//         alert("Hello other person")
//     }
// }

// function printName(){
//     let a=document.getElementById("name_input").value;
//     let b=document.getElementById("email_input").value;
//     let div1=document.getElementById("div1");
//     let c=document.getElementById("avdnajgamgdag");
// //!c = c==null
//     if(!c)
//     {
//         alert("nu am gasit div c");
//     }

//     if(a>b){
//         alert(`${a} este mai mare ca ${b}`)
//     }
//     else if(a==b){
//         alert(`${a} este egal cu ${b}`)
//     }
//     else{
//         alert(`${a} este mai mic decat ${b}`)
//     }
//     if(div1.style.width=="200px")
//     {
//         div1.style.width="600px";
//     }
//     else{
//         div1.style.width="200px";
//     }
// }

function clic(){
    let div1=document.getElementById("div1");
    let div2=document.getElementById("div2");
    let div3=document.getElementById("div3");
    console.log("Hello!")

    if(div1.style.backgroundColor=="red" && div2.style.backgroundColor=="blue" && div3.style.backgroundColor=="lightgreen")
    {
        div1.innerText=div1.style.backgroundColor;
        div2.innerText=div2.style.backgroundColor;
        div3.innerText=div3.style.backgroundColor;
    }
}

// tema pentru acasa
// js -- js home practice > 1-2-3-4 + 1-2

// intrebare mircea - cine e adana?