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

let inputName = document.getElementById('name');
console.log(inputName);

let inputByClass = document.getElementsByClassName(`test`)
console.log(inputByClass);

let inputByTag = document.getElementsByTagName('input');
console.log(inputByTag);