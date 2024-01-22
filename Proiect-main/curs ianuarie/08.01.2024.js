// let colors = ["red", "green", "blue"];
// let numbers = [1,2,3,4,5,6,7,8,9,10];
// let aa = [1, "text", 2,3,4,5,6];

// console.log(colors);
// console.log(colors[0]);
// console.log(colors.length);
// console.log(colors[colors.length-1]);

// let dogs=[];
// dogs[0]="pitbull";
// dogs[1]="bulldog";
// console.log(dogs);

// for(let i=0;i<5;i++){
//     console.log(colors[i]);
// }

// for(let element of numbers){
//     console.log(element);
// }

// let numbersEven=[2,4,6,8,10];
// for(let i=0;i<numbersEven.length;i++){
//     // numbersEven[i]=numbersEven[i]*2;
//     console.log(numbersEven[i]);
// }


let colors = ["red", "green", "blue"];
let numbers = [1,2,3,4,5,6,7,8,9,10];
let test = [5,9,2,1,88,125];

// numbers.pop(); // scoate ultimul element din array;
// numbers.push(1000) // adauga in array elementul 1000 pe ultima pozitie
// console.log(numbers);


// let all = colors.concat(numbers).concat(test);
// console.log(all);

// let sentence = ["hello" , "world"];
// let text = sentence.join(" ");
// console.log(text);

// let text2="Afara ninge";
// let arr=text2.split(" ");
// console.log(arr);

// numbers.reverse() // schimba ordinea din array
// console.log(numbers);
// let numbers2=numbers.reverse();

// test.sort();
// test.sort((a,b)=>{return a-b}); // ordonare corecta dpdv matematic
// test.sort((a,b)=>{return b-a}); // sortare descendenta
// console.log(test); // sortare practic alfabetica (se uita doar la prima cifra si le sorteaza in functie de prima cifra)

// console.log(colors.shift()) // scoate + iti arata in consola primul element din array

// let indexOfBlue=colors.indexOf("blue");
// console.log(indexOfBlue); // iti cauta elementul "blue" din array si iti arata pe ce pozitie se afla
// let index2=colors.indexOf("magenta");
// console.log(index2);

// colors.splice(0,2); // scoate un element de pe pozitia x (in cazul de fata 2)
// console.log(colors);

// let index=colors.indexOf("green"); // scoate elementul green din array, iti arata restul elementelor
// // colors.splice(index,1);
// console.log(colors);

// colors.splice(index,1,"Hello"); // scoate elementul de pe pozitia 1 din lista si il inlocuieste cu elementul "Hello"

// // SPLICE MODIFICA DEFINITIV ARRAY-UL PE CARE LUCREZI
// // SLICE NU MODIFICA ARRAY-UL

// let colors2=colors.slice(0,1) // incepe de la pozitia 0 si se termina la pozitia 1
// console.log(colors2)

// slice = incepe de la pozitia 0 si se termina la pozitia 0 si se termina la pozitia 1
// splice = incepe de la pozitia 0 si se termina inainte de pozitia 1

// let arr = [4,7,2]

// arr.sort((a,b) => a-b);
// console.log(arr);


let rezultate=[];
for(let i=0;i<5;i++){
    rezultate.push(prompt("scrie ceva numere b0$$"));

}
    console.log(rezultate);

// tema --- practice array + for de pe blossom--- //
// provocare - incearca sa faci si exercitiile cu while //
