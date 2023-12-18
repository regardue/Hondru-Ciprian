// function clickMe(){
//     let a=parseInt(prompt());
//     let b=parseInt(prompt());
//     let c=parseInt(prompt());
//     let p=document.getElementById("details")
//     if (a==b && b==c){
//         p.innerText=a+b+c;
//         p.style.color="blue";
//     }
//     else{
//         p.innerText=a+b+c;
//         p.style.color="red";
//     }
// }

// function printName(){
//     document.getElementById("btn_submit").style.backgroundColor="red";
// }

// function disco(){
//     let btn=document.getElementById("btn_submit")
//     let random1 = Math.floor(Math.random()*100);
//     let random2 = Math.floor(Math.random()*100);
//     let random3 = Math.floor(Math.random()*100);
//     // btn.stlyle.color="rgb(" + random1 + "," + random2 + "," +random3 + ")";
//     btn.style.backgroundColor=`rgb(${random1},${random2},${random3})`;
//     console.log(random1);
//     console.log(random2);
//     console.log(random3);
// }

function clickMe(){
    let a=prompt();
    if(a%2==0){
        document.getElementById("Btn").style.backgroundColor="red";
    }
    else{
        document.getElementById("Btn").style.backgroundColor="blue";
    }
}