import "./Hero.css";
import hand_icon from "../../assets/hand_icon.png"
import arrow_icon from "../../assets/arrow.png"
import hero_image from "../../assets/hero_image.png"

const Hero = () => {
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
          <img src={hero_image} alt="" />
        </div>
      
    </div>
  )
};

export default Hero;
