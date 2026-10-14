import type { Dispatch, SetStateAction } from "react";
import { flavorPrices, fillingPrices, toppingPrices, decorationPrices } from "./bakeryData";

export type CreateYourOwnProps = {
  customTreat: string; setCustomTreat: Dispatch<SetStateAction<string>>;
  customFlavor: string; setCustomFlavor: Dispatch<SetStateAction<string>>;
  secondFlavor: string; setSecondFlavor: Dispatch<SetStateAction<string>>;
  halfAndHalf: boolean; setHalfAndHalf: Dispatch<SetStateAction<boolean>>;
  customFilling: string; setCustomFilling: Dispatch<SetStateAction<string>>;
  selectedToppings: string[]; toggleTopping: (topping: string) => void;
  decoration: string; setDecoration: Dispatch<SetStateAction<string>>;
  personalMessage: string; setPersonalMessage: Dispatch<SetStateAction<string>>;
  specialInstructions: string; setSpecialInstructions: Dispatch<SetStateAction<string>>;
  customPrice: number; addCustomBakeToCart: () => void;
};

export default function CreateYourOwn(props: CreateYourOwnProps) {
  const { customTreat, setCustomTreat, customFlavor, setCustomFlavor, secondFlavor, setSecondFlavor, halfAndHalf, setHalfAndHalf, customFilling, setCustomFilling, selectedToppings, toggleTopping, decoration, setDecoration, personalMessage, setPersonalMessage, specialInstructions, setSpecialInstructions, customPrice, addCustomBakeToCart } = props;
  return (
<section
  className="custom-section"
  id="custom"
>
  <div className="custom-header">
    <p className="small-heading">
      YOUR DESSERT. YOUR RULES.
    </p>

    <h2>
      Create Your
      <span> Own Bake</span>
    </h2>

    <p>
      Mix your favorite flavors, choose your toppings,
      add a personal message and create something that
      is completely yours.
    </p>
  </div>

  <div className="builder-layout">
    <div className="builder-card">
      {/* STEP 1 */}

      <div className="builder-step">
        <div className="step-number">1</div>

        <div className="step-content">
          <h3>Choose Your Treat</h3>

          <p>
            What would you like to create?
          </p>

          <div className="option-grid">
            {[
              "Cake",
              "Cookie",
              "Brownie",
            ].map((item) => (
              <button
                key={item}
                className={
                  customTreat === item
                    ? "option-button selected-option"
                    : "option-button"
                }
                onClick={() =>
                  setCustomTreat(item)
                }
              >
                <span>
                  {item === "Cake"
                    ? "🍰"
                    : item === "Cookie"
                    ? "🍪"
                    : "🍫"}
                </span>

                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* STEP 2 */}

      <div className="builder-step">
        <div className="step-number">2</div>

        <div className="step-content">
          <h3>Choose Your Flavor</h3>

          <p>
            Pick one flavor or make it half and half.
          </p>

          <div className="option-grid">
            {Object.keys(flavorPrices).map(
              (flavor) => (
                <button
                  key={flavor}
                  className={
                    customFlavor === flavor
                      ? "option-button selected-option"
                      : "option-button"
                  }
                  onClick={() =>
                    setCustomFlavor(flavor)
                  }
                >
                  {flavor}
                </button>
              )
            )}
          </div>

          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={halfAndHalf}
              onChange={(event) =>
                setHalfAndHalf(
                  event.target.checked
                )
              }
            />

            <span>
              Make it half {customFlavor} +
              another flavor
            </span>
          </label>

          {halfAndHalf && (
            <select
              className="custom-select"
              value={secondFlavor}
              onChange={(event) =>
                setSecondFlavor(
                  event.target.value
                )
              }
            >
              {Object.keys(flavorPrices)
                .filter(
                  (flavor) =>
                    flavor !== customFlavor
                )
                .map((flavor) => (
                  <option
                    key={flavor}
                    value={flavor}
                  >
                    {flavor}
                  </option>
                ))}
            </select>
          )}
        </div>
      </div>

      {/* STEP 3 */}

      <div className="builder-step">
        <div className="step-number">3</div>

        <div className="step-content">
          <h3>Choose Your Filling</h3>

          <p>
            Give your treat an extra layer of
            sweetness.
          </p>

          <select
            className="custom-select"
            value={customFilling}
            onChange={(event) =>
              setCustomFilling(
                event.target.value
              )
            }
          >
            {Object.keys(fillingPrices).map(
              (filling) => (
                <option
                  key={filling}
                  value={filling}
                >
                  {filling}
                </option>
              )
            )}
          </select>
        </div>
      </div>

      {/* STEP 4 */}

      <div className="builder-step">
        <div className="step-number">4</div>

        <div className="step-content">
          <h3>Add Your Toppings</h3>

          <p>
            You can choose more than one.
          </p>

          <div className="topping-grid">
            {Object.keys(toppingPrices).map(
              (topping) => (
                <button
                  key={topping}
                  className={
                    selectedToppings.includes(
                      topping
                    )
                      ? "topping-button selected-option"
                      : "topping-button"
                  }
                  onClick={() =>
                    toggleTopping(topping)
                  }
                >
                  {topping}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* STEP 5 */}

      <div className="builder-step">
        <div className="step-number">5</div>

        <div className="step-content">
          <h3>Choose Decoration</h3>

          <div className="option-grid">
            {Object.keys(
              decorationPrices
            ).map((item) => (
              <button
                key={item}
                className={
                  decoration === item
                    ? "option-button selected-option"
                    : "option-button"
                }
                onClick={() =>
                  setDecoration(item)
                }
              >
                ✨ {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* STEP 6 */}

      <div className="builder-step">
        <div className="step-number">6</div>

        <div className="step-content">
          <h3>Make It Personal</h3>

          <p>
            Add a message or special instructions.
          </p>

          <input
            className="custom-input"
            type="text"
            placeholder="Example: Happy Birthday Anu!"
            value={personalMessage}
            onChange={(event) =>
              setPersonalMessage(
                event.target.value
              )
            }
          />

          <textarea
            className="custom-textarea"
            placeholder="Any special instructions for our bakers?"
            value={specialInstructions}
            onChange={(event) =>
              setSpecialInstructions(
                event.target.value
              )
            }
          />
        </div>
      </div>
    </div>

    {/* CUSTOM SUMMARY */}

    <div className="custom-summary">
      <div className="summary-top">
        <span>✨</span>

        <div>
          <p>Your Creation</p>
          <h3>Sweet Preview</h3>
        </div>
      </div>

      <div className="summary-cake">
        <span>🍓</span>
        <div>🍰</div>
        <span>🍒</span>
      </div>

      <div className="summary-details">
        <div>
          <span>Treat</span>
          <strong>
            {customTreat}
          </strong>
        </div>

        <div>
          <span>Flavor</span>

          <strong>
            {halfAndHalf
              ? `${customFlavor} + ${secondFlavor}`
              : customFlavor}
          </strong>
        </div>

        <div>
          <span>Filling</span>

          <strong>
            {customFilling}
          </strong>
        </div>

        <div>
          <span>Decoration</span>

          <strong>
            {decoration}
          </strong>
        </div>

        <div>
          <span>Toppings</span>

          <strong>
            {selectedToppings.length > 0
              ? selectedToppings.join(", ")
              : "None selected"}
          </strong>
        </div>
      </div>

      {personalMessage && (
        <div className="message-preview">
          💌 "{personalMessage}"
        </div>
      )}

      {specialInstructions && (
        <div className="instructions-preview">
          📝 {specialInstructions}
        </div>
      )}

      <div className="price-box">
        <span>Estimated Price</span>

        <strong>
          ₹{customPrice}
        </strong>
      </div>

      <button
        className="custom-cart-button"
        onClick={addCustomBakeToCart}
      >
        🛒 Add My Creation to Basket
      </button>
    </div>
  </div>
</section>

  );
}
