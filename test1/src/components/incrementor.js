import { useState } from "react";

function Incrementor(){

    const [counter, setCounter] = useState(1);
    const [name, setName] = useState("Ciprian")
    function Plus(){
        let newCounter = counter+1;
        if(newCounter>=10){
            setName("George");
        }
        setCounter(newCounter);
    }
    function Minus(){
        let newCounter = counter-1;
        if(newCounter<10){
            setName("Ciprian");
        }
        setCounter(newCounter);
    }
    return(
        <>
            <button onClick={Plus}>-</button>
            <p>{counter<18 ? "Esti prea tanar" : counter} {counter} {name}</p>
            <button onClick={Minus}>+</button>
        </>
    )
}

export default Incrementor