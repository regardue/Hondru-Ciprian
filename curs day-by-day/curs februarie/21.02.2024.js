// map
// let arr = [1, 5, 1234, 462, 14];
// let arr2 = arr.map((x) => x * 2);
// console.log(arr2);
// let arr3 = arr.map((x) => {
//   x = x * 2;
//   x = x + 1;
//   return x;
// });
// console.log(arr3);

// filter

// let arr4 = arr.filter(x => x%3==0);
// console.log(arr4);

// let arr5 = [0,1,2,3,4,5,6,7,8,9,10,11,12,13];
// let result = arr5.filter(isPrime);
// function isPrime(x){
//     for(i=2;i<x;i++){
//         if(x%i==0){
//             return false;
//         }
//     }
//     return x>0;
// }

// console.log(result)

// reduce

// let array = [0,1,2,3,4,5,6,7,8,9,10,11,12,13];
// let result = array.reduce((a,b) => a+b);
// console.log(result);

// let getMax = (a,b) => Math.max(a,b)
// let result2 = array.reduce(getMax,5)
// console.log(result2);

// let array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
// let result = array.find(x => x>7)
// console.log(result)

// let arr = [{name:"cris"},{name:"cris2"}]
// let name = arr.findIndex(x => x.name == "cris2") // findIndex intoarce pozitia
// console.log(name)

// some

// let some=[0,1,2,3,4,5,6,7,8,9,10,11,12,13].some(x => x>4)
// console.log(some)

// let arr=[{name:"andrei"},{name:"calin"}].some(x=>x.name == "calin")
// console.log(arr);

// every

// let array=[0,1,2,3,4,5,6,7,8,9,10,11,12,13];
// let every = array.every(x => x>=0);
// console.log(every);

