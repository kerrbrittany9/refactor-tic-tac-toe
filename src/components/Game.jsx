import React from "react";
import Board from './Board';
import { connect } from "react-redux";
import c from "../constants";

class Game extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick(i) {
    const history = this.props.history.slice(0,this.props.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.props.xIsNext ? 'X' : 'O';

    const { dispatch } = this.props;
    const action1 = {
      type: c.CHANGE_HISTORY,
      history: history.concat([{
        squares: squares,
        }]),
      }

    const action2 = {
      type: c.CHANGE_STEP,
      stepNumber: history.length,
    }

    const action3 = {
      type: c.CHANGE_XISNEXT,
      xIsNext: !this.props.masterGame.xIsNext,
    }
    dispatch(action1);
    dispatch(action2);
    dispatch(action3);
  }

  jumpTo(step) {
    const { dispatch } = this.props;

    const action1 = {
      type: c.JUMP_STEP,
      stepNumber: step,
    }

    const action2 = {
      type: c.JUMP,
      xIsNext: (step % 2) === 0,
    }
    dispatch(action2);
    dispatch(action1);
  }

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  render() {
    const history = this.props.history;
    const current = history[this.props.stepNumber];
    const winner = this.calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? "Move #" + move : "Game start";
      return (
        <li key={move}>
          <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next Player: ' + (this.props.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    masterGame: state;
  }
}

export default connect(mapStateToProps)(Game);
