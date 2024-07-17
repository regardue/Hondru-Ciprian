
import { collection, getDocs, doc, getDoc, query, where, updateDoc, deleteDoc, addDoc, setDoc } from 'firebase/firestore'
import { useState,useEffect } from 'react'
import {db} from "./firebase"

function App() {

  const [apartments,setApartments] = useState([]);
  // Get all documents from apartments
  // const apartmentsCollection = collection(db,"apartments");

  // Get specific documents from apartments
  
  // const apartmentsCollection = query(collection(db,"apartments"),where('ap_number',"==",1))


  // Get a document based on a document id

  const apartmentsCollection = doc(db,'apartments','48thykoIQC6NuLzHU6H4')
  const getApartments = async () => {
    // functioneaza pt toate documentele sau filtrare co query
    
    // const data = await getDocs(apartmentsCollection);

    //pt documentele preluate prin id:

    // const data = await getDoc(apartmentsCollection);
    // const apartments = data.data()

    // data.docs.map((map)=>{
    //   let test = map.data();
    //   console.log(test);
    // })
    // setApartments(data.docs.map((doc)=>({...doc.data(),id:doc.id})));

    // Update apartments data

    // let apartmentToUpdate = doc(db,'apartments', '48thykoIQC6NuLzHU6H4');

    // await updateDoc(apartmentToUpdate,{ap_number:99,ap_size:9999});
    // let ap = doc(db,'apartments', '48thykoIQC6NuLzHU6H4');
    // let data = await getDoc(ap);
    // let apartments = data.data();

    // Delete document by id

    // let apartmentToDelete = doc(db,'apartments', '48thykoIQC6NuLzHU6H4');
    // await deleteDoc(apartmentToDelete);

    // Inserare document nou

    // const apartmentsCollection = collection(db,"apartments");
    // await addDoc(apartmentsCollection,{ap_number:12,ap_size:90,city:"Bucuresti"});

    // Inserare doc nou cu id setat de noi 

    await setDoc(doc(db, "apartments", "Tibi"),{ap_number:12,ap_size:90,city:"Bucuresti"})

    setApartments([{...apartments}])
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
