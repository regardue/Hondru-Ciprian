
import { collection, getDocs } from 'firebase/firestore'
import { useState,useEffect } from 'react'
import {db} from "./firebase"

function App() {

  const [apartments,setApartments] = useState([]);

  const apartmentsCollection = collection(db,"apartments");
  const getApartments = async () => {
    const data = await getDocs(apartmentsCollection);
    // data.docs.map((map)=>{
    //   let test = map.data();
    //   console.log(test);
    // })
    setApartments(data.docs.map((doc)=>({...doc.data(),id:doc.id})));
  }

  useEffect(()=>{
    getApartments();
  },[])

  function tralala(){

  }

  async function tralala2(){

  }

  return (
    <>
    {apartments.map((ap)=>{
      return(
        <div>
          Apartment number: {ap.ap_number}, 
          Apartment size: {ap.ap_size},          
          Street: {ap.street}
          <hr />
        </div>
      )
    })}
    </>
  )
}

export default App
