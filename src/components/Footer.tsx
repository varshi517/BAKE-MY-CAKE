export default function Footer() {
  return (
<footer className="footer">
  <div className="footer-brand">
    <h2>🍰 Bake Palace</h2>

    <p>
      A little place for big sweet moments.
    </p>
  </div>

  <div className="footer-column">
    <h3>Explore</h3>

    <a href="#home">Home</a>
    <a href="#cakes">Treats</a>
    <a href="#custom">
      Create Your Own
    </a>
    <a href="#favorites">
      My Picks
    </a>
  </div>

  <div className="footer-column">
    <h3>Bakery</h3>

    <p>Fresh Cakes</p>
    <p>Cookies</p>
    <p>Brownies</p>
    <p>Custom Bakes</p>
  </div>

  <div className="footer-column">
    <h3>Say Hello</h3>

    <p>📧 hello@bakepalace.com</p>
    <p>📞 +91 98765 43210</p>
    <p>📍 lb nagar, Hyderabad</p>
  </div>

  <div className="footer-bottom">
    <p>
      © 2026 Bake Palace. Made with ❤️ and sugar.
    </p>
  </div>
</footer>

  );
}
