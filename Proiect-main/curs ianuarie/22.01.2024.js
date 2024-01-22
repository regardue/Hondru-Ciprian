// while(conditie){
//     codul care se executa;
// }

// let final=10;
// let i=0;
// while(i<final){
//     console.log(i);
//     i++;
// }

// let final=10;
// let i=0;
// let numarRandom = 1 
// while(numarRandom!=0){
//     if(numarRandom>80){
//         break;
//     }
//     numarRandom=Math.floor(Math.random()*100);
//     console.log(numarRandom);
// }

// console.log("a terminat while")

// let i=1;
// while(i<6){
//     console.log(i);
//     i++;
// }

// let i=10;
// while (i>0){
//     console.log(i);
//     i--;
// }


// function Denumire (a,b){
//     return a+b;
// }

// console.log(Denumire(1,2));

// const denumire= function(a,b){
//     console.log(a+b);
// }
// denumire(1,2);

const factorial=function(n)
{
    if(n>0 && n<=1){
        return 1
    }
    else{
        return n*factorial(n-1);
    }
}
console.log(factorial(4));