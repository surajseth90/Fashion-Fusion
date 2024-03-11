import { useEffect, useState } from "react";
import "./style.scss";

function Radio(props) {
  const {
    id,
    label,
    name,
    value,
    classes,
    hideLabel,
    onChange,
    defaultChecked,
    required,
    labelClass
  } = props;
  const [randomId, setRandomId] = useState("");

  useEffect(() => {
    setRandomId(makeid());
  }, []);

  function makeid() {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 4) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  return (
    <div className="radio-container">
      <div>
        <input
          className={`radio-btn ${classes}`}
          type="radio"
          id={id || randomId}
          name={name || "radio"}
          value={value || ""}
          onChange={onChange}
          defaultChecked={defaultChecked}
          required={required}
        />
        <label className="radio-label" htmlFor={id || randomId}></label>
      </div>
      <label
        className={`label ${labelClass} ${hideLabel ? "d-none" : ""}`}
        htmlFor={id || randomId}
      >
        {label}
      </label>
    </div>
  );
}

export default Radio;
