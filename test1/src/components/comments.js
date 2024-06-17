import { useState, useEffect } from "react";

function Comments(){
    const [id,setId] = useState(1);

    return(
        <>
        <button onClick={()=>setId(Math.floor(Math.random()*100))}>Show new comment</button>
        <CommentsText id={id}></CommentsText>
        </>
    )
}

function CommentsText(props){
    const[text,setText] = useState("")

    useEffect(()=>{

        fetch(`https://dummyjson.com/posts/${props.id}`).then(res=>
            res.json()
        ).then(data=>setText(data.body));
    },[props.id])

    return(
        <>
        <p>{text}</p>
        </>
    )
}


export default Comments()