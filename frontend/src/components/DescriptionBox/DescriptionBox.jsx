import "./DescriptionBox.css";

const DescriptionBox = () => {
  return (
    <div className="descriptionBox">
      <div className="descriptionBox-navigator">
        <div className="descriptionBox-navBox">Description</div>
        <div className="descriptionBox-navBox fade">Reviews(122)</div>
      </div>
      <div className="descriptionBox-description">
        <p>
          Looking for a comfortable and stylish shirt to wear out or to lounge
          around in? Look no further than the Keep On Smiling Shirt! This trendy
          oversized vintage shirt is made from 100% cotton, which makes it
          comfortable to wear. It is the most versatile piece in my wardrobe.
        </p>
        <p>
          Whether you‘re running errands or just want to relax at home, this
          shirt is perfect for any occasion. I can also wear it to the beach
          with shorts, to the mall with jeans, or even to bed! It’s super comfy
          and always makes me feel good when I put it on.
        </p>
      </div>
    </div>
  );
};

export default DescriptionBox;
