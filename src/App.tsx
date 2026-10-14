import "./App.css";
import useBakeryState from "./components/useBakeryState";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Intro from "./components/Intro";
import Catalog from "./components/Catalog";
import WhatsBaking from "./components/WhatsBaking";
import Insights from "./components/Insights";
import MyPicks from "./components/MyPicks";
import CreateYourOwn from "./components/CreateYourOwn";
import SweetBasket from "./components/SweetBasket";
import Footer from "./components/Footer";
import OrderSuccess from "./components/OrderSuccess";

function App() {
  const state = useBakeryState();

  if (state.orderPlaced) {
    return <OrderSuccess continueShopping={state.continueShopping} />;
  }

  return (
    <div className="app">
      <Header cartCount={state.cartCount} />

      {state.message && (
        <div className="toast-message">
          🍰 {state.message}
        </div>
      )}

      <main>
        <Hero />
        <Intro />

        <Catalog
          treats={state.treats}
          loading={state.loading}
          error={state.error}
          filteredTreats={state.filteredTreats}
          searchTerm={state.searchTerm}
          setSearchTerm={state.setSearchTerm}
          selectedType={state.selectedType}
          setSelectedType={state.setSelectedType}
          egglessOnly={state.egglessOnly}
          setEgglessOnly={state.setEgglessOnly}
          sortOrder={state.sortOrder}
          setSortOrder={state.setSortOrder}
          showPicksOnly={state.showPicksOnly}
          setShowPicksOnly={state.setShowPicksOnly}
          favorites={state.favorites}
          toggleFavorite={state.toggleFavorite}
          addToCart={state.addToCart}
          resetFilters={state.resetFilters}
        />

        <WhatsBaking
          bakingCategory={state.bakingCategory}
          setBakingCategory={state.setBakingCategory}
          filteredBakerySpecials={state.filteredBakerySpecials}
          favorites={state.favorites}
          toggleFavorite={state.toggleFavorite}
          addBakerySpecialToCart={state.addBakerySpecialToCart}
        />

        <Insights
         mostPickedType={state.mostPickedType}
         averagePickPrice={state.averagePickPrice}
         pickedCount={state.pickedCount}
         totalCount={state.totalCount}
         pickPercentage={state.pickPercentage}
        />

        <MyPicks
         treats={state.treats}
         bakerySpecials={state.bakerySpecials}
         favorites={state.favorites}
         addToCart={state.addToCart}
         addBakerySpecialToCart={state.addBakerySpecialToCart}
         />

        <CreateYourOwn
          customTreat={state.customTreat}
          setCustomTreat={state.setCustomTreat}
          customFlavor={state.customFlavor}
          setCustomFlavor={state.setCustomFlavor}
          secondFlavor={state.secondFlavor}
          setSecondFlavor={state.setSecondFlavor}
          halfAndHalf={state.halfAndHalf}
          setHalfAndHalf={state.setHalfAndHalf}
          customFilling={state.customFilling}
          setCustomFilling={state.setCustomFilling}
          selectedToppings={state.selectedToppings}
          toggleTopping={state.toggleTopping}
          decoration={state.decoration}
          setDecoration={state.setDecoration}
          personalMessage={state.personalMessage}
          setPersonalMessage={state.setPersonalMessage}
          specialInstructions={state.specialInstructions}
          setSpecialInstructions={state.setSpecialInstructions}
          customPrice={state.customPrice}
          addCustomBakeToCart={state.addCustomBakeToCart}
        />

        <SweetBasket
          cart={state.cart}
          cartCount={state.cartCount}
          subtotal={state.subtotal}
          deliveryFee={state.deliveryFee}
          total={state.total}
          increaseQuantity={state.increaseQuantity}
          decreaseQuantity={state.decreaseQuantity}
          removeFromCart={state.removeFromCart}
          placeOrder={state.placeOrder}
        />

        <Footer />
      </main>
    </div>
  );
}

export default App;
