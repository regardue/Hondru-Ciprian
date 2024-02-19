// let people1 = {
//   names: [
//     ["a", "b", "c", "d"],
//     ["e", "f", "g", "h"],
//   ],
// };
// let [a, b] = [...people1.names];
// console.log(a);
// console.log(b);
// const allPeople = [...a, ...b];
// for (let person of allPeople) {
//   console.log(person);
// }

// [index,person] = [0,"a"];
// for (let [index, person] of allPeople.entries()) {
// //   console.log(person);
// //   console.log(person);
//   if(index%2==0)
//   {
//     console.log(person);
//   }
// }

// let people2={
//     name:"Tiberiu",
//     city:"Bucuresti"
// }

// const properties = Object.keys(people2);
// console.log(properties);
// const values = Object.values(people2);
// console.log(values);

// let obj={
//     textbox:"jngdanga",
//     button:"baehjgnadgjadga"
// }

let set1 = new Set();
let o = { a: 2, b: 6 };
set1.add(1);
set1.add(10);
set1.add(10);
set1.add(o);
o.a = 4;
o.b = 7;
set1.add(o);
set1.delete(1);

// console.log(set1.has(1))
// console.log(set1.size)

// for (let item of set1) {
//   console.log(item);
// }

// let array = [1, 5, 9, 3, 1];
// const set2 = new Set("array");
// console.log(set2);
// let uniqueArray = [...set2]
// console.log(uniqueArray);

// map

const map1 = new Map();
// map1.set("name","Tiberiu");
// map1.set("name1","Valeriu");
// console.log(map1.get("name"));

// map1.delete("name1");
// console.log(map1);

map1.set("obj1", { a: 5, b: 6 });
map1.set("obj2", { a: 2, b: 99 });
console.log(map1);

let map2 = new Map();
map2.set(2, 6);

const mergedMap = [...map1, ...map2];
console.log(mergedMap); 

// for (let [key,value] of map1){
//     console.log(key);
//     console.log(value);
// }
