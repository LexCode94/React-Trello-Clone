import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import TrelloList from './components/TrelloList';
import TrelloActionButton from './components/TrelloActionButton';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { sort } from "./actions/listActions"
import styled from "styled-components";


const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
`

function App() {
  const dispatch = useDispatch()

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    if (!destination){
      return;
    }
    dispatch(sort(
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index,
      draggableId,
      type
    ))

  }
  const lists = useSelector(state => state.lists)

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <h3>React App</h3>
        <Droppable droppableId='all-lists' direction="horizontal" type='list'>
          {provided => (
            <ListContainer 
            {...provided.droppableProps} 
            ref={provided.innerRef}>
            {lists.map((list, index) => {
              return <TrelloList 
              listID={list.id} 
              title={list.title} 
              cards={list.cards} 
              key={list.id}
              index={index} />
              })}
              {provided.placeholder}
            <TrelloActionButton list />
          </ListContainer>
          )}
        </Droppable>
        
      </div>
    </DragDropContext>
  );
}

const styles = {
  listsContainer: {
    display: "flex",
    flexDirection: "row",
    marginRight: 8
  }
}
export default App;
