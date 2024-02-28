// Parse nr intreg

// console.log(Number("123"))
// console.log(parseInt("123a4")) // gaseste doar primul nr, aka 123
// console.log(+"123") // - functioneaza la fel, doar ca il face nr negativ


// console.log(parseFloat("2,5")); // 2
// console.log(parseFloat("2.5")); // 2.4, .!=,

// console.log(Number.isNaN(`20`)) //
// console.log(Number.isNaN(4/0)) // 
// console.log(Number.isNaN(`asdas`)) //


// console.log(Number.isFinite(20))
// console.log(Number.isFinite("20"))
// console.log(Number.isFinite(4/0))

// console.log(Number.isInteger(30.0))
// console.log(Number.isInteger(30/0))

// Math.round(40.23);
// Math.ceil(40.23);
// Math.floor(40.23);
// console.log((2.99).toFixed(0)) // 0= nr de zecimale dupa punct, dupa rotunjire
// console.log(Number.MAX_SAFE_INTEGER);

// let d = new Date(2024,6,32); // luna-1 data+1
// console.log(d);
// console.log(d.getFullYear());
// console.log(d.getMonth()); // luna e 2, o gaseste 1 , deoarece luna este un array, incepe de la 0
// console.log(d.getDate());
// console.log(d.getDay());
// console.log(d.getTime());

// let d = new Date(2024,6,32);
// let date_now = new Date();
// console.log(d);
// let now = new Date();
// let check = d.getTime() - now.getTime();
// console.log(check);

// function Log()
// {
//     console.log("Hello after some time!")
// }
// setTimeout(Log,2000) // ruleaza functia Log dupa 2000 de ms aka 2 secunde

// function Stop(){
//     clearInterval(id);
// } 

// let id=setInterval(Log,2000) // functia care o executa + timpul in milisecunde, deci ruleaza functia Log la fiecare 2 secunde

let start = 200;
function Stop()
{
    start --;
    if(start == 0){
        clearInterval(id);
    }
    console.log(start);
}
let id=setInterval(Stop,500)