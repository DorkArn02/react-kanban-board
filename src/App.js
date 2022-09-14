import { Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './components/Column';
import Header from "./components/Header"

function handleOnDragEnd(result, columns, setColumns) {
  if (!result.destination) return
  const { source, destination } = result

  if (source.droppableId !== destination.droppableId) {
    const sourceCol = columns[source.droppableId]
    const destCol = columns[destination.droppableId]
    const sourceItems = [...sourceCol.items]
    const destItems = [...destCol.items]
    const [removed] = sourceItems.splice(source.index, 1)
    destItems.splice(destination.index, 0, removed)

    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceCol,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destCol,
        items: destItems
      }
    });

  } else {
    const column = columns[source.droppableId]
    const copied = [...column.items]

    const [removed] = copied.splice(source.index, 1)
    copied.splice(destination.index, 0, removed)

    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copied
      }
    });
  }
}

const defaultColumns = {
  'ToDo': {
    id: 'ToDo',
    color: 'lightblue',
    items: []
  },
  'In Progress': {
    id: 'In Progress',
    color: 'orange',
    items: []
  },
  'Finished': {
    id: 'Finished',
    color: 'lightgreen',
    items: []
  }
}

function App() {
  const [c, setC] = useState(JSON.parse(localStorage.getItem("trello_board")) || defaultColumns)

  useEffect(() => {
    localStorage.setItem("trello_board", JSON.stringify(c))
  }, [c])

  const addItem = (title, item) => {
    const selectedCol = c[title]
    const selectedItems = [...selectedCol.items]
    selectedItems.push(item)

    setC({
      ...c,
      [title]: {
        ...selectedCol,
        items: selectedItems
      }
    })
  }



  const removeItem = (title, id) => {
    const selectedCol = c[title]
    const selectedItems = [...selectedCol.items]
    const filtered = selectedItems.filter(i => i.id !== id)

    setC({
      ...c,
      [title]: {
        ...selectedCol,
        items: filtered
      }
    })
  }

  return (
    <div style={{ userSelect: 'none' }}>
      <Header />
      <DragDropContext onDragEnd={result => handleOnDragEnd(result, c, setC)}>
        <Flex>
          {Object.entries(c).map(([colId, col]) => {
            return (
              <>
                <Column removeItem={removeItem} addItem={addItem} key={colId} colId={colId} col={col} />
              </>
            )
          })}
        </Flex >
      </DragDropContext >
    </div>
  );
}
export default App;