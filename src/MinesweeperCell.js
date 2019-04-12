import React from 'react';
import PropTypes from 'prop-types';

export default class MinesweeperCell extends React.Component
{
  // get value of the cell
  getValue()
  {
    const { value } = this.props;


    if (!value.isRevealed)
    {
      return this.props.value.isFlagged ? "🚩" : null;
    }
    if (value.isMine)
    {
      return "💣";
    }
    if (value.nearbyMineCount === 0)
    {
      return null;
    }
    return value.nearbyMineCount;
  }

  render()
  {
    const { value, onClick, cMenu } = this.props;
    let className =
      "cell" +
      (value.isRevealed ? "" : " hidden") +
      (value.isMine ? " is-mine" : "") +
      (value.isFlagged ? " is-flag" : "");

    return (
      <div
        onClick={onClick}
        className={className}
        onContextMenu={cMenu}
      >
        {this.getValue()}
      </div>
    );
  }
}

const cellItemShape =
{
    isRevealed: PropTypes.bool,
    isMine: PropTypes.bool,
    isFlagged: PropTypes.bool
}

MinesweeperCell.propTypes =
{
  value: PropTypes.objectOf(PropTypes.shape(cellItemShape)),
  onClick: PropTypes.func,
  cMenu: PropTypes.func
}
