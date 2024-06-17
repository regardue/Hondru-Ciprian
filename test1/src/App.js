import './App.css';
import Ticket from './components/ticket.js';
import Button from './components/button.js';
import Incrementor from './components/incrementor.js';
import Input from './components/input.js';
import Register from './components/login.js';
import Inc from './components/inc.js';
import comments from './components/comments.js';

import { useState } from 'react';
import Todolist from './components/todolist/todolist.js';
import Comments from './components/comments.js';


const message = "Hello from React";
const User = {name:"Hondru", surname:"Ciprian"}
const ticket = [
  {name:"Hondru", concertName:"Parazitii", time:"22:20"},
  {name:"Ciprian", concertName:"A&K", time:"20:20"}
]

function random() {
  return Math.floor(Math.random()*51) + 50;
} 

function Welcome(props){
  return <h1>Hello, {props.name=="Hondru"?"Hello":"La"} {props.surname}</h1>;
}

function App() {
  return (
    <div>
      {/* <Ticket name={ticket[0].name} concertName={ticket[0].concertName} time={ticket[0].time}></Ticket>
      <Ticket name={ticket[1].name} concertName={ticket[1].concertName} time={ticket[1].time}></Ticket>
      {ticket.map(tick=>{
        return <Ticket name={tick.name} concertName={tick.concertName} time={tick.time}></Ticket>
      })}
      <Welcome name={"abnjsaagad"} surname={User.surname} ></Welcome>
    <h1>{User.name},{User.surname}</h1>
    <h1>{message}</h1>
    <p>{random()}</p>
    <h3 className="test">12341234</h3> */}

    {/* <Incrementor></Incrementor> */}
    {/* <Input></Input> */}

    {/* <><Register></Register></> */}

    {/* <Todolist></Todolist> */}
    <Inc></Inc>
    {/* <Comments></Comments> */}


    </div>
  );
}

export default App;
