import Hero from "../components/Hero/Hero";
import Offers from "../components/Offers/Offers";
import Popular from "../components/Popular/Popular";
import NewCollections from "../components/NewCollections/NewCollections";
import Newsletter from "../components/Newsletter/Newsletter";

const Shop = () => {
  return (
    <>
      <Hero />
      <Popular />
      <Offers/>
      <NewCollections/>
      <Newsletter/>
    </>
  );
};

export default Shop;
