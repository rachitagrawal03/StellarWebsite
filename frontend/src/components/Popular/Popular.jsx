import "./Popular.css";
import Item from "../Item/Item";
import { useEffect, useState, useContext } from "react";
import BASE_URL from "../../../config";

const Popular = () => {
  const [popularInMen, setPopularInMen] = useState([]);

  useEffect(()=>{
    fetch(`${BASE_URL}/api/product/popularinmen`) 
    .then((res) => res.json())
    .then((resData) =>{
      const arrayData = Object.values(resData.data);
      setPopularInMen(arrayData);
    })    
  }, [])

  // console.log(popularInMen);
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
