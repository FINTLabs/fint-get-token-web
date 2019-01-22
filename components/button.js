exports.Button = props => {
  const propTypes = {
    onClick: props.onClick,
    disabled: props.disabled,
    value: props.value,
    type: props.type || "button",
    name: props.name,
    autoFocus: props.autoFocus
  };

  return (
    <div>
      <input {...propTypes} />
      <style jsx>
        {`
          input {
            /*width: ${props.width || "200px"};
            height: ${props.height || "50px"};*/
            border: 1px solid #8cc640;
            font-size: ${props.fontSize || "12px"};
            text-transform: uppercase;
            transition: all 200ms;
            color: ${props.color || "white"};
            background: #8cc640;
            border-radius: 5px;
            cursor: pointer;
            padding: 10px 20px;
            margin: 10px;
          }
          input:disabled {
            background: #eaeaea;
            color: #cccccc;
            border-color: white;
          }
          input:focus {
            outline: none;
          }
        `}
      </style>
    </div>
  );
};
