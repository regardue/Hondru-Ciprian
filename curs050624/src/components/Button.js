function Button(props){
    return(
        <button className="button" onClick={props.handleClick}>{props.text}</button>
    )
}

export default Button