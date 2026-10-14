export default function Header({ cartCount }: { cartCount: number }) {
  return (
<header className="navbar">
  <div className="logo">
    <span>🍰</span>

    <div>
      <h2>Bake Palace</h2>
      <p>Made with a little sweetness</p>
    </div>
  </div>

  <nav>
    <a href="#home">Home</a>
    <a href="#cakes">Treats</a>
    <a href="#whats-baking">What’s Baking</a>
    <a href="#custom">Create Your Own</a>
    <a href="#insights">Insights</a>
    <a href="#favorites">My Picks</a>
    <a href="#basket">Basket</a>
  </nav>

  <a href="#basket"className="cart-button">
    🛒 Cart <span>{cartCount}</span>
  </a>
</header>


  );
}
