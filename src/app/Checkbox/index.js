import "./style.scss";

function Checkbox(props) {
  const { id, label, name, value, classes, hideLabel, onChange, labelClasses } =
    props;
  return (
    <div className="checkbox-container d-flex align-items-center">
      {/* <label className="container" htmlFor={id}> */}
      <input
        type="checkbox"
        id={id || ""}
        name={name || ""}
        value={value || label}
        className={`input-checkbox ${classes}`}
        onChange={onChange}
      />
      {/* <span className="checkmark"></span> */}
      {/* </label> */}
      {!hideLabel && (
        <label className={`checkbox-label ${labelClasses}`} htmlFor={id}>
          {label}
        </label>
      )}
    </div>
  );
}

export default Checkbox;
