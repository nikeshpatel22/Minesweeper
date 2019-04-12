import React from 'react';
import PropTypes from 'prop-types';
import MinesweeperCell from './MinesweeperCell';

export default class MinesweeperBoard extends React.Component
{
  state =
  {
    boardData: this.setupBoard(this.props.height, this.props.width),
  };


  // Set up the board
  setupBoard(height, width)
  {
    let boardData = this.setBoardData(height, width);
    boardData = this.setMines(height, width, boardData);
    boardData = this.getNearbyMineCount(height, width, boardData);
    return boardData;
  }

  // initialize empty board
  setBoardData(height, width)
  {
    let boardData = [];
    for (let i = 0; i < height; i++)
    {
      boardData.push([]);
      for (let j = 0; j < width; j++)
      {
        boardData[i][j] =
        {
          x: i,
          y: j,
          nearbyMineCount: 0,
          isMine: false,
          isRevealed: false,
          isEmpty: false,
          isFlagged: false,
        };
      }
    }
    return boardData;
  }

  // get random number for mine placement
  getRandomInt(max)
  {
    return Math.floor(Math.random() * Math.floor(max));
  }

  // set mines on the board
  setMines(height, width, boardData)
  {
    let x = 0;
    let y = 0;
    let mines = 0;

    while (mines < 10)
    {
      x = this.getRandomInt(8);
      y = this.getRandomInt(8);
      if (!boardData[x][y].isMine)
      {
        boardData[x][y].isMine = true;
        mines++;
      }
    }

    return (boardData);
  }

  // count the nearby mines for each cell
  getNearbyMineCount(height, width, boardData)
  {
    let mineCount = 0
    for (let i = 0; i < height; i++)
    {
      for (let j = 0; j < width; j++)
      {
        mineCount = this.mineCounter(i, j, boardData);
        boardData[i][j].nearbyMineCount = mineCount

        if (mineCount == 0)
        {
          boardData[i][j].isEmpty = true
        }

      }
    }
    return boardData;
  }

  // count the mines next to the cell
  mineCounter(x, y, boardData)
  {
    let mineCount = 0;
    //top
    if (x > 0 && boardData[x-1][y].isMine == true)
    {
      mineCount++;
    }
    //bottom
    if (x < 7 && boardData[x+1][y].isMine == true)
    {
      mineCount++;
    }
    //left
    if (y > 0 && boardData[x][y-1].isMine == true)
    {
      mineCount++;
    }
    //right
    if (y < 7 && boardData[x][y+1].isMine == true)
    {
      mineCount++;
    }
    //top-left
    if (x > 0 && y > 0 && boardData[x-1][y-1].isMine == true)
    {
      mineCount++;
    }
    //top-right
    if (x > 0 && y < 7 && boardData[x-1][y+1].isMine == true)
    {
      mineCount++;
    }
    //bottom-left
    if (x < 7 && y > 0 && boardData[x+1][y-1].isMine == true)
    {
      mineCount++;
    }
    //bottom-right
    if (x < 7 && y < 7 && boardData[x+1][y+1].isMine == true)
    {
      mineCount++;
    }

    return mineCount;
  }

  // reveal the whole board
  showBoard()
  {
    let update = this.state.boardData;
    for (let i = 0; i < 8; i++)
    {
      for (let j = 0; j < 8; j++)
      {
        update[i][j].isRevealed = true;
      }
    }
    this.setState({
      boardData: update
    })
  }

  // reveal all empty cells
  showEmpty(x, y, boardData)
  {
    if (x > 0 && (!boardData[x-1][y].isFlagged && !boardData[x-1][y].isRevealed && (boardData[x-1][y].isEmpty || !boardData[x-1][y].isMine)))
    {
      boardData[x-1][y].isRevealed = true;
      if (boardData[x-1][y].isEmpty)
      {
        this.showEmpty(x-1, y, boardData);
      }
    }
    //bottom
    if (x < 7 && (!boardData[x+1][y].isFlagged && !boardData[x+1][y].isRevealed && (boardData[x+1][y].isEmpty || !boardData[x+1][y].isMine)))
    {
      boardData[x+1][y].isRevealed = true;
      if (boardData[x+1][y].isEmpty)
      {
        this.showEmpty(x+1, y, boardData);
      }
    }
    //left
    if (y > 0 && (!boardData[x][y-1].isFlagged && !boardData[x][y-1].isRevealed && (boardData[x][y-1].isEmpty || !boardData[x][y-1].isMine)))
    {
      boardData[x][y-1].isRevealed = true;
      if (boardData[x][y-1].isEmpty)
      {
        this.showEmpty(x, y-1, boardData);
      }
    }
    //right
    if (y < 7 && (!boardData[x][y+1].isFlagged && !boardData[x][y+1].isRevealed && (boardData[x][y+1].isEmpty || !boardData[x][y+1].isMine)))
    {
      boardData[x][y+1].isRevealed = true;
      if (boardData[x][y+1].isEmpty)
      {
        this.showEmpty(x, y+1, boardData);
      }
    }
    //top-left
    if (x > 0 && y > 0 && (!boardData[x-1][y-1].isFlagged && !boardData[x-1][y-1].isRevealed && (boardData[x-1][y-1].isEmpty || !boardData[x-1][y-1].isMine)))
    {
      boardData[x-1][y-1].isRevealed = true;
      if (boardData[x-1][y-1].isEmpty)
      {
        this.showEmpty(x-1, y-1, boardData);
      }
    }
    //top-right
    if (x > 0 && y < 7 && (!boardData[x-1][y+1].isFlagged && !boardData[x-1][y+1].isRevealed && (boardData[x-1][y+1].isEmpty || !boardData[x-1][y+1].isMine)))
    {
      boardData[x-1][y+1].isRevealed = true;
      if (boardData[x-1][y+1].isEmpty)
      {
        this.showEmpty(x-1, y+1, boardData);
      }
    }
    //bottom-left
    if (x < 7 && y > 0 && (!boardData[x+1][y-1].isFlagged && !boardData[x+1][y-1].isRevealed && (boardData[x+1][y-1].isEmpty || !boardData[x+1][y-1].isMine)))
    {
      boardData[x+1][y-1].isRevealed = true;
      if (boardData[x+1][y-1].isEmpty)
      {
        this.showEmpty(x+1, y-1, boardData);
      }
    }
    //bottom-right
    if (x < 7 && y < 7 && (!boardData[x+1][y+1].isFlagged && !boardData[x+1][y+1].isRevealed && (boardData[x+1][y+1].isEmpty || !boardData[x+1][y+1].isMine)))
    {
      boardData[x+1][y+1].isRevealed = true;
      if (boardData[x+1][y+1].isEmpty)
      {
        this.showEmpty(x+1, y+1, boardData);
      }
    }

    return boardData;
  }

  // count the hidden cells
  hiddenCells(boardData)
  {
    let hiddenCount = 0;
    for (let i = 0; i < 8; i++)
    {
      for (let j = 0; j < 8; j++)
      {
        if (!boardData[i][j].isRevealed)
        {
          hiddenCount++;
        }
      }
    }
    return hiddenCount;
  }

  // handle when user clicks on a cell
  handleClick(x, y)
  {
    if (this.state.boardData[x][y].isRevealed || this.state.boardData[x][y].isFlagged)
    {
      return null;
    }

    // found a mine
    if (this.state.boardData[x][y].isMine)
    {
      this.showBoard();
      alert("game over, you lost");
    }

    let updated = this.state.boardData;
    updated[x][y].isFlagged = false;
    updated[x][y].isRevealed = true;

    // reveal all adjacent empty cells
    if (updated[x][y].isEmpty)
    {
      updated = this.showEmpty(x, y, updated);
    }

    // check for win
    if (this.hiddenCells(updated) == 10)
    {
      this.showBoard();
      alert("You Win");
    }

    this.setState({
      boardData: updated,
    });
  }

  // check if user flagged all mines
  checkFlagWin(boardData)
  {
    let flagMineCount = 0;
    for (let i = 0; i < 8; i++)
    {
      for (let j = 0; j < 8; j++)
      {
        if (boardData[i][j].isFlagged && boardData[i][j].isMine)
        {
          flagMineCount++;
        }
      }
    }

    let win = 0

    if (flagMineCount == 10)
    {
      win = 1
    }

    return win;
  }

  // when user flags a cell
  handleFlagging(e, x, y)
  {
    e.preventDefault();
    let board = this.state.boardData;

    if (board[x][y].isRevealed)
    {
      return;
    }

    if (board[x][y].isFlagged)
    {
      board[x][y].isFlagged = false;
    }
    else
    {
      board[x][y].isFlagged = true;
    }

    if (this.checkFlagWin(board) == 1)
    {
      this.showBoard();
      alert("You Win");
    }

    this.setState({
      boardData: board,
    });

  }

  renderBoard(boardData)
  {
    return boardData.map((rows) => {
      return rows.map((cell) => {
        return (
          <div>
            <MinesweeperCell
              onClick={() => this.handleClick(cell.x, cell.y)}
              cMenu={(e) => this.handleFlagging(e, cell.x, cell.y)}
              value={cell}
            />
          </div>);
      })
    });
  }

  render()
  {
    return (
      <div>
        <h1>
          MINESWEEPER
        </h1>

        <div className="board">
          {
            this.renderBoard(this.state.boardData)
          }
        </div>
      </div>
    );
  }
}

MinesweeperBoard.propTypes =
{
  height: PropTypes.number,
  width: PropTypes.number,
}
