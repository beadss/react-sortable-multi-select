import React, {useState} from 'react';
import classNames from 'classnames';
import {SortableElement} from "react-sortable-hoc";
const ENTER_KEY = 13;

export default SortableElement(({
    dragging,
    sorting,
    onClick,
    selected,
    selectedItemsCount,
    moved,
    item,
  }) => {
    const shouldRenderItemCountBadge = dragging && selectedItemsCount > 1;
  
    return (
      <div
        className={classNames(
          "Item",
          selected && !dragging && "selected",
          dragging && "dragging",
          sorting && "sorting",
          moved && "moved",
        )}
        onClick={() => onClick(item)}
        onKeyPress={(event) => {
          if (event.which === ENTER_KEY) {
            onClick(item);
          }
        }}
        tabIndex={0}
      >
        {item.no} | {item.subject}
        {shouldRenderItemCountBadge ? <Badge count={selectedItemsCount} /> : null}
      </div>
    );
  });
  
  function Badge(props) {
    return <div className={"Badge"}>{props.count}</div>;
  }
  