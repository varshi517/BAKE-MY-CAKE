export default function Hero() {
  return (
<section
  className="hero"
  id="home"
>
  <div className="hero-content">
    <p className="small-heading">
      A LITTLE PIECE OF HAPPINESS
    </p>

    <h1>
      Your treat,
      <br />
      <span>your way.</span>
    </h1>

    <p className="hero-description">
      Choose your favorite flavor, discover delicious
      treats, or create something completely your own.
      At Bake Palace, every sweet moment starts with you.
    </p>

    <div className="hero-buttons">
      <a
        href="#cakes"
        className="primary-button"
      >
        Explore Our Treats
      </a>

      <a
        href="#custom"
        className="secondary-button"
      >
        ✨ Create Your Own
      </a>
    </div>
  </div>

  <div className="hero-image">
    <div className="image-circle">
      <img
        src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80"
        alt="Beautiful chocolate cake"
      />
    </div>

    <div className="floating-card">
      <span>🍓</span>

      <div>
        <strong>Made just for you</strong>
        <p>Pick it. Decorate it. Love it.</p>
      </div>
    </div>
  </div>
</section>


  );
}
