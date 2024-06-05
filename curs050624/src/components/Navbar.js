import Button from "./Button";
import Message from "./Message";

function Navbar(props){
    let buttonArray = [];
    buttonArray=props.buttonArray;
    return(
        <div>
            <Message name={props.name}></Message>
            {props.buttonArray.map(btn => {
                return(<Button handleClick={btn.handleClick} text={btn.text}></Button>)
            })}
        </div>
    )
}

export default Navbar