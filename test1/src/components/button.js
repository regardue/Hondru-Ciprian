import "./button.css";

function Button(props){
    function handleClick(action){
        if(action == "delete")
        alert(props.text);
    }
    return(
        <button className={props.class} onClick={()=>handleClick(props.action)}>{props.label}</button>
    )
}

export default Button;