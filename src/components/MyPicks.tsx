import type { Treat, BakerySpecial } from "./bakeryData";

export type MyPicksProps = {
  treats: Treat[];
  bakerySpecials: BakerySpecial[];
  favorites: number[];
  addToCart: (treat: Treat) => void;
  addBakerySpecialToCart: (item: BakerySpecial) => void;
};

export default function MyPicks({
  treats,
  bakerySpecials,
  favorites,
  addToCart,
  addBakerySpecialToCart,
}: MyPicksProps) {
  const favoriteTreats = treats.filter((treat) =>
    favorites.includes(treat.id)
  );

  const favoriteBakerySpecials = bakerySpecials.filter((item) =>
    favorites.includes(item.id)
  );

  const hasFavorites =
    favoriteTreats.length > 0 || favoriteBakerySpecials.length > 0;

  return (
    <section
      className="favorites-section"
      id="favorites"
    >
      <div className="section-heading">
        <p>A LITTLE COLLECTION OF LOVE</p>

        <h2>My Picks</h2>

        <span>
          Keep the treats you love close by.
        </span>
      </div>

      {!hasFavorites ? (
        <div className="empty-favorites">
          <span>♡</span>

          <h3>
            Your sweet collection is waiting
          </h3>

          <p>
            Tap the heart on any treat you love and
            it will appear here.
          </p>

          <a
            href="#cakes"
            className="primary-button"
          >
            Explore Treats
          </a>
        </div>
      ) : (
        <div className="favorite-list">

          {/* Normal treats */}
          {favoriteTreats.map((treat) => (
            <div
              className="favorite-mini-card"
              key={treat.id}
            >
              <img
                src={treat.image}
                alt={treat.name}
              />

              <div>
                <h3>{treat.name}</h3>
                <p>₹{treat.price}</p>
              </div>

              <button
                onClick={() => addToCart(treat)}
              >
                + Add
              </button>
            </div>
          ))}

          {/* Bakery specials */}
          {favoriteBakerySpecials.map((item) => (
            <div
              className="favorite-mini-card"
              key={item.id}
            >
              <img
                src={item.image}
                alt={item.name}
              />

              <div>
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>
              </div>

              <button
                onClick={() =>
                  addBakerySpecialToCart(item)
                }
              >
                + Add
              </button>
            </div>
          ))}

        </div>
      )}
    </section>
  );
}