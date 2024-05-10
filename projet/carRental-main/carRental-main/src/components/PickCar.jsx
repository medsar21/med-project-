import { useState } from "react";
import CarBox from "./CarBox";
import { CAR_DATA } from "./CarData";

function PickCar() {
  const [active, setActive] = useState(null);
  const [colorBtn, setColorBtn] = useState("");

  const btnID = (id) => {
    setColorBtn(colorBtn === id ? "" : id);
  };

  const coloringButton = (id) => {
    return colorBtn === id ? "colored-button" : "";
  };

  return (
    <>
      <section className="pick-section">
        <div className="container">
          <div className="pick-container">
            <div className="pick-container__title">
              <h3>Vehicle Models</h3>
              <h2>Our rental fleet</h2>
              <p>
                Choose from a variety of our amazing vehicles to rent for your
                next adventure or business trip
              </p>
            </div>
            <div className="pick-container__car-content">
              {/* pick car */}
              <div className="pick-box">
                {CAR_DATA.map((cardData) => {
                  return (
                    <button
                      key={cardData[0].id}
                      className={`${coloringButton(`btn${cardData[0].id}`)}`}
                      onClick={() => {
                        setActive(cardData[0].name);
                        btnID(`btn${cardData[0].id}`);
                      }}
                    >
                      {cardData[0].name}
                    </button>
                  );
                })}
              </div>

              {active && <CarBox data={CAR_DATA.find(carData => carData[0].name === active)} />}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default PickCar;
