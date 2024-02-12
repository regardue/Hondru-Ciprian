// let x,y,l,m,n,a;
// let array = [1,5];
// let array = [2,5,8,9,10]; // x=2 / y=5
// [x,y] = array;
// console.log (x);
// console.log (y);

// [x,y,l,m,n,a] = [2,5,8,9,10];

// let test = {a:1,b:4}
// ({a,b}=test)
// console.log(x);
// console.log(y);
// console.log(l);
// console.log(m);
// console.log(n);
// console.log(a);

// let test = ['unu','doi','trei'];
// let [a,b,c]=test;
// console.log(a);
// console.log(b);
// console.log(c);

// let a,b;
// [a=1,b=2] = [4,8,9];
// console.log (a,b);

// let stud1,stud2,stud3,stud4;
// let array = [12,15,18,22,1,45];
// stud1=array[0];
// stud2=array[1];
// stud3=array[2];
// stud4=array[3];

// [stud1,stud2,stud3,stud4]=array;

// let a=1;
// let b=3;

// let c;
// c=a;
// a=b;
// b=c;
// console.log(a,b)

// [a,b]=[b,a]

// let c=6;
// let d=3;

// [a,b,c,d] = [b,c,d,a]
// console.log(a,b,c,d)
// let array = [1,4,8];
// [array[0],array[1],array[2]]=[array[1],array[2],array[0]];
// console.log(array);

// function test()
// {
//     return [1,4];
// }

// let a,b,c;
// [a,b]=test();
// [c]=test();
// console.log(a,b,c)

// let arr=[1,5,9];
// let oldarr=[10,12,arr[0],arr[1],arr[2]];  // oldarr = [10,12,...arr];
// // console.log(oldarr);
// console.log(...arr) // = console.log(arr) 

// let newArr=[];
// for(let ele of arr){
//     newArr.push(ele);
// }

// newArr=[...arr];
// console.log(newArr);

// let arr1=[1,5,9];
// let arr2=[7,9,10];
// let newArr=[];
// newArr=[...arr1,...arr2];


// let newArr=[];
// let country="Romania";
// newArr=[...country];
// console.log(newArr) // array cu fiecare litera in parte ca fiind un membru

// function sum(a,b,c)
// {
//     return a+b+c;
// }
// let array=[5,8,987,5315135,141244626,412365]; 
// // sum(array[0],array[1],array[2]);
// sum(...array);
// console.log(sum(...array)) // arata suma primelor 3 elemente din array;

// let obj1={a:50,b:100};
// let obj2={c:200,d:400};
// let obj3={...obj1,...obj2};
// console.log(obj3);


// function test(a,b,...c){ // parametrul ...c trebuie sa fie mereu ultimul element, pentru ca programul nu stie cum se termina c-ul;
//     console.log(a);
//     console.log(b);
//     console.log(c);
// }
// test(5,3,2,5,1,12,642,24,745,14)


let a=20;
let b=5;
let c=2;
// function test(a,b,c)
// {
//     return a || (b>c); // a=20, return 20, valoare 'truefi'
// }
// console.log(test(a,b,c));


let d=a?b:c;
// if(a!=null){
//     d=b;
// }
// else{
//     d=c;
// }
let f=a??b;
console.log(f)