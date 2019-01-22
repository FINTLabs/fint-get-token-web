exports.TextArea = props => {
  const propTypes = {
    name: props.name,
    autoFocus: props.autoFocus || false,
    value: props.value,
    onChange: props.onChange,
    readOnly: props.readOnly 
  };
  return (
    <div style={{ width: "100%" }}>
      <textarea {...propTypes} />
      <style jsx>
        {`
          textarea {
            width: 100%;
            height: 200px;
            padding: 10px 18px 0 18px;
            background: #eee;
            border: 1px solid #666;
            font-size: 12px;
            font-family: monospace;
            color: #666;
            outline: none;
            border-radius: 4px;
            box-sizing: border-box;
          }
        `}
      </style>
    </div>
  );
};
