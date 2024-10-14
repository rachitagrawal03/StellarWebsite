import "./Hero.css";
import hand_icon from "../../assets/hand_icon.png"
import arrow_icon from "../../assets/arrow.png"

const Hero = () => {
  const hero_img="https://res.cloudinary.com/doaux8dg1/image/upload/v1728900918/hero_image_kyfdwi.png";
  return (
    <div className="hero">
        <div className="hero-left">
            <h2>NEW ARRIVALS ONLY</h2>
            <div>
                <div className="hero-hand-icon">
                    <p>new</p>
                    <img src={hand_icon} alt="" />
                </div>
                <p>collections</p>
                <p>for everyone</p>
            </div>
            <a style={{textDecoration: "none"}} href="#new-collection">
              <div className="hero-latest-btn" >
                <div>Latest Collection</div>
                <img src={arrow_icon} alt="" />
              </div>
            </a>
        </div>

        <div className="hero-right">
          <img src={hero_img} alt="Hero banner image" />
        </div>
      
    </div>
  )
};

export default Hero;
