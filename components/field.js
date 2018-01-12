exports.Field = ({ name, children }) => (
  <div className='field'>
    <label htmlFor={name}>
      {name.toUpperCase()}:
    </label>
    { children }
    <style jsx>
      {`
        .field {
          margin-bottom: 30px;
          border-bottom: 1px solid #d8d8d8;
          width: 100%;
          display: inline-flex;
        }
        .field:focus-within, .field:focus {
          border-bottom: 1px solid #000 !important;
        }
        label {
          margin-right: 2px;
          display: inline-block;
          width: 105px;
          font-size: 11px;
          font-weight: bold;
        }
      `}
    </style>
  </div>
)
