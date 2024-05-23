import "./Popular.css";
// import data_product from "../../assets/data";
import Item from "../Item/Item";
import { useEffect, useState } from "react";

const Popular = () => {
  const [popularInMen, setPopularInMen] = useState([]);
  
  useEffect(()=>{
    fetch('http://localhost:4000/popularinmen')
    .then((res) => res.json())
    .then((data) => setPopularInMen(data))
  }, [])

  return (
    <div className="popular">
      <h1>POPULAR IN MEN</h1>
      <hr />
      <div className="popular-item">
        {popularInMen.map((item) => {
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

export default Popular;
