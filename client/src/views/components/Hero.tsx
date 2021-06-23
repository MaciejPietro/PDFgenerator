import Blogging from "./animations/Blogging";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__content">
        <h2>Lakes</h2>
        <p>
          A river is a natural flowing watercourse, usually freshwater, flowing
          towards an ocean, sea, lake or another river. In some cases a river
          flows into the ground and becomes dry at the end of its course without
          reaching another body of water.
        </p>
      </div>
      <div className="hero__img">
        <div className="hero__img__inner">
          <Blogging />
        </div>
      </div>
      <div className="hero__more"></div>
      <div className="hero__facts"></div>
    </section>
  );
};

export default Hero;
