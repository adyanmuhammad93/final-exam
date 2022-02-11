import React from 'react';

const TextField = (props) => {
  return (
    <>
      <input
        value={props.query}
        onChange={props.onChange}

        type="text"
        name=""
        id=""
        className="form-control"
        placeholder="Keyword"

        required
      />
    </>
  );
};

export default TextField;
