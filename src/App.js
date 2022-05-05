import React from 'react'
import './App.css'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      board: Array(9).fill(null),
      boxes: [2, 2, 2, 2, 2, 2, 2, 2, 2],
      turn: 0,
      winner: 2
    }
  }
  render() {
    const clicked = (indexOfBox) => {
      const myPromise = new Promise((resolve, reject) => {
        if (this.state.winner === 2 & this.state.boxes.indexOf(2) != -1) {
          let board = [...this.state.board],
            boxes = [...this.state.boxes]
          board[indexOfBox] = this.state.turn == 0 ? 'X' :
            this.state.turn == 1 ? 'O' : ''
          boxes[indexOfBox] = this.state.turn == 0 ? 0 : 1
          this.setState({ board: [...board], boxes: [...boxes] })
          resolve()
        }
      })
      myPromise.then(() => check())

    }
    const reset = () => {
      this.setState({
        board: Array(9).fill(null),
        boxes: [2, 2, 2, 2, 2, 2, 2, 2, 2],
        turn: 0,
        winner: 2
      })
    }

    const check = async () => {
      let boxes = await [...this.state.boxes]
      const winnerArr = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 4, 8], [2, 4, 6],
        [0, 3, 6], [1, 4, 7], [2, 5, 8]
      ]

      for (let i = 0; i < winnerArr.length; i++) {
        if (boxes[winnerArr[i][0]] !== 2 & boxes[winnerArr[i][1]] !== 2 &
          boxes[winnerArr[i][2]] !== 2)
          if ((boxes[winnerArr[i][0]] == boxes[winnerArr[i][1]]) &
            (boxes[winnerArr[i][0]] == boxes[winnerArr[i][2]])) {
            this.setState({ winner: boxes[winnerArr[i][0]] == 0 ? 0 : 1 })
            break
          }
      }
      if (this.state.winner === 2)
        this.setState({ turn: this.state.turn == 0 ? 1 : 0 })
    }
    return (
      <>
        <div className="App">
          <div className='header'><h2>XOX</h2></div>
        </div>
        <div className='content'>
          {this.state.boxes.map((el, index) => (
            <div className='box' key={index} onClick={() => clicked(index)}>
              <span id="boxTxt">{this.state.board[index]}</span>
            </div>
          ))}
          <button id='clickBtn' onClick={() => reset()}>Sıfırla</button>
        </div>
        {this.state.winner !== 2 ? (
          <div id='footer'>
            <h2>{this.state.winner == 0 ? 'P1 Kazandı' :
              this.state.winner == 1 ? 'P2 Kazandı' : ''}</h2>
            <h2>{this.state.boxes.indexOf(2) == -1 ? this.state.winner == 2 ? 'Oyun Bitti Berabere' : '' : ''}</h2>
          </div>
        ) : <></>}

      </>
    );

  }
}




export default App;
