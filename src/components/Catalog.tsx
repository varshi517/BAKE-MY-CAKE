import type { Dispatch, SetStateAction } from "react";
import type { Treat } from "./bakeryData";


const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=700&q=80";

export type CatalogProps = {
  treats: Treat[]; loading: boolean; error: string; filteredTreats: Treat[];
  searchTerm: string; setSearchTerm: Dispatch<SetStateAction<string>>;
  selectedType: string; setSelectedType: Dispatch<SetStateAction<string>>;
  egglessOnly: boolean; setEgglessOnly: Dispatch<SetStateAction<boolean>>;
  sortOrder: string; setSortOrder: Dispatch<SetStateAction<string>>;
  showPicksOnly: boolean; setShowPicksOnly: Dispatch<SetStateAction<boolean>>;
  favorites: number[]; toggleFavorite: (id: number) => void;
  addToCart: (treat: Treat) => void; resetFilters: () => void;
};

export default function Catalog(props: CatalogProps) {
  const { treats, loading, error, filteredTreats, searchTerm, setSearchTerm, selectedType, setSelectedType, egglessOnly, setEgglessOnly, sortOrder, setSortOrder, showPicksOnly, setShowPicksOnly, favorites, toggleFavorite, addToCart, resetFilters } = props;
  void treats;
  return (
<section className="treats-section" id="cakes">
  <div className="section-heading">
    <p>OUR LITTLE BAKERY COLLECTION</p>
    <h2>Explore Our Treats</h2>
    <span>Search, filter, save your picks, and find your sweet choice quickly.</span>
  </div>

  <div className="catalog-controls">
    <div className="search-box">
      <span>🔎</span>
      <input
        type="text"
        placeholder="Search cakes, cookies, brownies..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
    </div>

    <div className="category-buttons">
      {["All", "Cake", "Cookie", "Brownie"].map((type) => (
        <button
          key={type}
          className={selectedType === type ? "active-category" : ""}
          onClick={() => setSelectedType(type)}
        >
          {type === "All" ? "All Items" : `${type}s`}
        </button>
      ))}
    </div>

    <div className="catalog-options">
      <label className="eggless-toggle">
        <input
          type="checkbox"
          checked={egglessOnly}
          onChange={(event) => setEgglessOnly(event.target.checked)}
        />
        <span>Eggless only</span>
      </label>

      <select
        className="sort-select"
        value={sortOrder}
        onChange={(event) => setSortOrder(event.target.value)}
      >
        <option value="default">Sort by price</option>
        <option value="low">Price: Low to High</option>
        <option value="high">Price: High to Low</option>
      </select>

      <button
        className={showPicksOnly ? "picks-filter active-category" : "picks-filter"}
        onClick={() => setShowPicksOnly((current) => !current)}
      >
        ♥ My Picks
      </button>
    </div>
  </div>

  {loading ? (
    <div className="treats-grid">
      {[1, 2, 3, 4].map((item) => (
        <div className="treat-card skeleton-card" key={item}>
          <div className="skeleton-image"></div>
          <div className="skeleton-lines">
            <span></span><span></span><span></span>
          </div>
        </div>
      ))}
    </div>
  ) : error ? (
    <div className="error-state">
      <span>🍰</span>
      <h3>Something went wrong</h3>
      <p>{error}</p>
      <button className="primary-button" onClick={() => window.location.reload()}>Try Again</button>
    </div>
  ) : (
    <div className="treats-grid">
      {filteredTreats.length > 0 ? (
        filteredTreats.map((treat) => (
          <div className="treat-card" key={treat.id}>
            <div className="treat-image">
              <img
                src={treat.image || PLACEHOLDER_IMAGE}
                alt={treat.name}
                onError={(event) => { event.currentTarget.src = PLACEHOLDER_IMAGE; }}
              />
              <button
                className={favorites.includes(treat.id) ? "favorite-button favorite-active" : "favorite-button"}
                onClick={() => toggleFavorite(treat.id)}
                aria-label={`Toggle ${treat.name} in My Picks`}
              >
                {favorites.includes(treat.id) ? "♥" : "♡"}
              </button>
            </div>

            <div className="treat-info">
              <div className="catalog-badges">
                <span className="type-badge">{treat.type}</span>
                {treat.eggless && <span className="dietary-badge">Eggless</span>}
              </div>
              <div className="rating">{treat.rating || "★★★★★"}</div>
              <h3>{treat.name}</h3>
              <p>{treat.description}</p>
              <div className="treat-bottom">
                <strong>₹{treat.price}</strong>
                <button className="add-button" onClick={() => addToCart(treat)}>+ Add</button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="no-results">
          <span>🧁</span>
          <h3>No sweet treats found</h3>
          <p>Try another search or change your filters.</p>
          <button className="primary-button" onClick={resetFilters}>Reset Filters</button>
        </div>
      )}
    </div>
  )}
</section>


  );
}
