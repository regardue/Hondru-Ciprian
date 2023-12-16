// if number > 3
// say hello
// else
// say goodbye

// const number=4;
// console.log (number>3);

// if(number>3  && number<5){
//     console.log("hello");
//     return;
//     console.log("xd");
// }
//     console.log("goodbye");
// const firstNumber="Hello";
// const secondNumber=100;

// function add(num1, num2){
//     if(typeof num1 !== "Number" || typeof num2 !== "Number"){
//         console.log("error");
//         return 0;
//     }
//     console.log(num1,num2);
//     console.log(num1+num2);
//     return num1 + num2;
// }

// const result = add(firstNumber,secondNumber);
// console.log(result);


// function increaseQuantity(initialQuantity, incrementQuantity){
//     return initialQuantity + incrementQuantity
// }
// console.log(increaseQuantity(1,3))

const produs = {
    greutate : 10,
    dimensiuni: 'mic'
}

function calculateTax(price, country, delivery, productDetails){
    // daca nu e in tara, +10%
    //daca "delivery" este express +25$
    //adauga +10$ pt fiecare kg
    //dimensiune produs: mic = lasa asa; mediu = +10$; mare = +20$;
    //daca pretul este mai mare de 1000$, nu mai calculam country + delivery
    
    let finalPrice = price;
    
    if(price<1000){
        if(country !== "Romania"){
            finalPrice = finalPrice + finalPrice/10;
        }
        if(delivery == "express"){
            finalPrice = finalPrice + 25;
        }
    }
    finalPrice = finalPrice + productDetails.greutate * 10;

    if(productDetails.dimensiuni == "mediu"){
        finalPrice = finalPrice + 10;
    }
    else if(productDetails.dimensiuni == "mare"){
        finalPrice = finalPrice + 20;
    }
    return finalPrice;
    
}
console.log(calculateTax(1001, "Poland", "express", produs)) 