import React, {useState} from 'react';
import classNames from 'classnames';
import {SortableElement} from "react-sortable-hoc";
import {Table} from "semantic-ui-react";
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
      <Table.Row
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
      <Table.Cell>
        {item.no} | {item.subject}
        {shouldRenderItemCountBadge ? <Badge count={selectedItemsCount} /> : null}
        </Table.Cell>
        </Table.Row>
    );
  });
  
  function Badge(props) {
    return <div className={"Badge"}>{props.count}</div>;
  }
  