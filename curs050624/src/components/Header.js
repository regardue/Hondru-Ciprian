import Navbar from "./Navbar";

function Header(props){
    return(
        <>
          <Navbar buttonArray={props.buttonArray} name={props.name} ></Navbar>
        </>
    )
}

export default Header