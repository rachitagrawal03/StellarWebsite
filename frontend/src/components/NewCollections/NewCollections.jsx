import "./NewCollections.css";
// import new_collections from "../../assets/new_collections";
import Item from "../Item/Item";
import { useEffect, useState } from "react";
// import BASE_URL from "../../../config";

const NewCollections = () => {
  const [new_collections, setNewCollections] = useState([]);

  const url = import.meta.env.VITE_BASE_URL;

  useEffect(()=>{
    fetch(`${url}/api/product/newcollection`) 
    .then((res) => res.json())
    .then((resData) =>{ 
      const arrayData = Object.values(resData.data);
      setNewCollections(arrayData);
    })    
  }, [])
  
  return (
    <div className="new-collections" id="new-collection">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {new_collections.map((item) => {
          return (
            <Item
              key={item.id}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default NewCollections;
