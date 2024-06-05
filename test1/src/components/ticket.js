import "./ticket.css";
import Button from "./button";

function Ticket(props){
    return(
        <div className="ticket">
            <p>Hello, {props.name}</p>
            <p>Your ticket for concert {props.concertName}</p>
            <p>Time of entry {props.time}</p>
            <Button action="delete" class="verde" text={`Do you really want to delete your ticket for:${props.concertName}`} label="Delete this ticket"></Button>
            <Button action="save" class="red" text={`Do you really want to save your ticket for:${props.concertName}`} label="Save this ticket"></Button>
            <Button action="favourite" class="yellow" text={`Do you really want to add to favourite your ticket for:${props.concertName}`} label="Favourite this ticket"></Button>
        </div>
    )
}


export default Ticket;