import { useState, useEffect, useMemo } from "react";
import { initialItems } from "./util";

function Inc() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState(initialItems);

  // const selectedItem = items.find((item) => item.isSelected);

  const selectedItem = useMemo(() => {
    console.log(Date.now());
    items.find((item) => item.isSelected);
    console.log(Date.now());
  }, [items]);

  useEffect(() => {
    //Aici e codul care se va executa
    console.log(count);

    //Putem sa facem o functie de return = ce se intampla
    return () => {
      console.log("Cleanup");
    };
  }, [count]);

  return (
    <>
      <h1>{count}</h1>
      <h1>{selectedItem?.id}</h1>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
    </>
  );
}

export default Inc;
