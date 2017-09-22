import React from 'react';

function Square(props) {

  var squareStyles =  {
    border: '1px',
    float: 'left',
    fontSize: '24px',
    fontWeight: 'bold',
    lineHeight: '34px',
    height: '34px',
    marginRight: '-1px',
    marginTop: '-1px',
    padding: '0',
    textAlign: 'center',
    width: '34px',
  }

  return (
    <button style={squareStyles} className="square"
      onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default Square;
