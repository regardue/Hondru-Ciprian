import Header from './components/Navbar';
import './App.css';

function App() {
  const name = "Ciprian";
  const buttonArray = [{handleClick: (e) => {alert(e.target)}, text:"Home"},
    {handleClick: (e) => {alert(e.target)}, text:"Contact"}];
  return (
    <div className="App">
      <Header buttonArray={buttonArray} name={name} ></Header>
    </div>
  );
}

export default App;
