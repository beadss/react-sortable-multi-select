import React, {useState} from 'react';
import {SortableContainer} from "react-sortable-hoc";
import Item from "./Item";
import {Table} from "semantic-ui-react";


export default SortableContainer(({items, isSorting, selectedItemKeys, sortingItemKey, onItemSelect}) => {
    return (
      <Table className={"List"}>
        {items.map((item, index) => {
          const isSelected = selectedItemKeys.includes(item.no);
          const itemIsBeingDragged = sortingItemKey === item.no;
          const moved = !!item.moved;
  
          return (
            <Item
              key={`item-${item.no}`}
              selected={isSelected}
              dragging={itemIsBeingDragged}
              sorting={isSorting}
              index={index}
              item={item}
              onClick={onItemSelect}
              moved={moved}
              selectedItemsCount={selectedItemKeys.length}
            />
          );
        })}
      </Table>
    );
  });
  