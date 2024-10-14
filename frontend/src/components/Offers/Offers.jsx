import "./Offers.css";
// import exclusive_image from "../../assets/exclusive_image.png";

const Offers = () => {
  const exclusive_image="https://res.cloudinary.com/doaux8dg1/image/upload/v1728902682/exclusive_image_ggtsok.png";
  return (
    <div className="offers">
      <div className="offers-left">
        <h1>Exclusive</h1>
        <h1>Offers For You</h1>
        <p>ONLY BEST SELLERS PRODUCTS</p>
        <button>Check Now</button>
      </div>

      <div className="offers-right">
        <img src={exclusive_image} alt="" />
      </div>
    </div>
  );
};

export default Offers;
