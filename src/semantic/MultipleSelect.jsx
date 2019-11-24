import React, {useState} from 'react';
import arrayMove from 'array-move';

import SortableList from './List.jsx';
let curIndex = 0;
function generateItems(length) {
    return Array.from(Array(length), (_, index) => {
        ++curIndex;
        return {no: curIndex+1, subject: `${(curIndex+1).toString()} 회차`};
    });
  }

  const episodeList = generateItems(10);
export default () => {
    const [selectedItemKeys, setSelectedItemKeys] = useState([]);
    const [items, setItems] = useState(episodeList);
    const [sortingItemKey, setSortingItemKey] = useState(null);
    const [isSorting, setIsSorting] = useState(false);
    
    const add = () => {
        setItems(prev => prev.concat(generateItems(10)));
    };

    const filterItems = (item) => {
    
        // Do not hide the ghost of the element currently being sorted
        if (sortingItemKey === item.no) {
          return true;
        }
    
        // Hide the other items that are selected
        if (isSorting && selectedItemKeys.includes(item.no)) {
          return false;
        }
    
        // Do not hide any other items
        return true;
      };
    
      const handleUpdateBeforeSortStart = ({index}) => {
        return new Promise((resolve) => {
            const item = items[index];

            setSortingItemKey(item.no);
            setIsSorting(true);
            resolve();
           
        });
      };
    
      const handleSortStart = () => {
        document.body.style.cursor = 'grabbing';
      }
    
      const handleSortEnd = ({oldIndex, newIndex}) => {
        let newItems;

        const makeMovedWrapper = (item, oldIndex, newIndex) => {
            let {originIndex} = item;

            if(!originIndex) {
              originIndex = oldIndex;
            }

            return {
              ...item, 
              originIndex,
              moved: originIndex !== newIndex,
            };
        }
        
        if (selectedItemKeys.length) {
          const existItems = items.filter(
            (item) => !selectedItemKeys.includes(item.no)
          );

          const insertedItems = items
          .filter((item) => selectedItemKeys.includes(item.no))
          .map((item, index) => {
              return makeMovedWrapper(item, oldIndex + index, newIndex + index);
          });
    
          newItems = [
            ...existItems.slice(0, newIndex),
            ...insertedItems,
            ...existItems.slice(newIndex, existItems.length),
          ];
        } else {
            const item = items[oldIndex];

            items[oldIndex] = makeMovedWrapper(item, oldIndex, newIndex);
            newItems = arrayMove(items, oldIndex, newIndex);
        }
    
        setItems(newItems);
        setIsSorting(false);
        setSortingItemKey(null);
    
        document.body.style.cursor = '';
      };
    
      const handleItemSelect = (item) => {
        setSelectedItemKeys(prev => {
            if (prev.includes(item.no)) {
                return prev.filter((selectedItemKey) => selectedItemKey !== item.no);
              }
              return [...prev, item.no];
        });
      };
    
      const handleShouldCancelStart = (event) => {
        const item = items[event.target.sortableInfo.index];
    
        // Never cancel start if there are no selected items
        if (!selectedItemKeys.length) {
          return false;
        }
    
        // If there are selected items, we want to cancel sorting
        // from starting when dragging elements that are not selected
        return !selectedItemKeys.includes(item.no);
      };

    return <>
    <button onClick={()=>{
        add();
    }}>+</button>
    <button onClick={()=>{
        setSelectedItemKeys([]);
    }}>선택 해제</button>
    <button onClick={()=>{

    }}>초기화</button>
    <SortableList
    items={items.filter(filterItems)}
    isSorting={isSorting}
    distance={3}
    sortingItemKey={sortingItemKey}
    selectedItemKeys={selectedItemKeys}
    onItemSelect={handleItemSelect}
    shouldCancelStart={handleShouldCancelStart}
    updateBeforeSortStart={handleUpdateBeforeSortStart}
    onSortStart={handleSortStart}
    onSortEnd={handleSortEnd}
  /></>;
};