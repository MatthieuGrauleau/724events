import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort(
    (evtA, evtB) =>
      // Event order is not right , it must be from latest to recent
      // We need to invert sort order and simplify code for better lisibility
      new Date(evtA.date) - new Date(evtB.date)
  );
  const nextCard = () => {
    // index start from 0 and byDateDesc.length = 3
    // index.js:18 Uncaught TypeError: Cannot read properties of undefined (reading 'length')
    // adding control
    setIndex(index < (byDateDesc && byDateDesc.length - 1) ? index + 1 : 0);
  };
  useEffect(() => {
    const timeoutSlider = setTimeout(() => {
      nextCard();
    }, 5000);
    return () => clearTimeout(timeoutSlider);
  }, [nextCard]);
  // useEffect will be called each time nexCard is called
  // case 1 : after timeout
  // case 2 : onChange radio button

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        // Warning: Each child in a list should have a unique "key" prop.
        // Check the render method of `Slider`. See https://reactjs.org/link/warning-keys for more information.
        <div key={Math.random()}>
          <div
            key={event.title}
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  // event has no id because event.id is udefined it do not exist in event collection.
                  // We need to give a unique index key to the input
                  key={`${Math.random()}`}
                  type="radio"
                  name="radio-button"
                  // We need to compare with the right index to update correctly
                  // slider pagination
                  checked={index === radioIdx}
                  // console error : Warning: You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.
                  onChange={() => setIndex(radioIdx)}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
