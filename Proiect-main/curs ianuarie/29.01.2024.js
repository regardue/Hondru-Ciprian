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


//constructor
function Car(make,year,color){
    this.make=make;
    this.year=year;
    this.color=color;
    this.printInfo=()=>{
        console.log(`${make},${year},${color}`);
    }
    this.addYear=()=>{
        this.year++;
        return this.year;
    }
}
let mazda = new Car(`Mazda`,2024,"red");
let dacia = new Car("Dacia",1900,"white");
console.log(mazda); //accesam obiectul mazda
console.log(dacia);
mazda.addYear();
mazda.addYear();
mazda.addYear();
mazda.addYear();
mazda.printInfo();


