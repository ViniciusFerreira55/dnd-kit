import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { DndContext, closestCenter} from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable"
import {useState} from 'react';
import { SortableItem } from './SortableItem';
import { act } from 'react-dom/test-utils';


function App() {
  const [languages, setLanguages] = useState(["Js", "Python", "Cobol"]);

  return (
   <DndContext
   collisionDetection={closestCenter}
   onDragEnd={handleDragEnd}>
    <Container className="p-3" style={{"width": "50%"}} align="center"><h3>As linguas usadas por diferentes pessoas</h3>
    <SortableContext 
    items={languages}
    strategy={verticalListSortingStrategy}
    >
      {languages.map(language => <SortableItem key={language} id={language}/>)}
    </SortableContext>
    </Container>
    
   </DndContext>
  );
  function handleDragEnd(event) {
    console.log("Drag end called");
    const {active, over} = event;
    console.log("ACTIVE: " + active.id);
    console.log("OVER :" + over.id);

    if(active.id !== over.id) {
      setLanguages((items) => {
        const activeIndex = items.indexOf(active.id);
        const overIndex = items.indexOf(over.id);
        console.log(arrayMove(items, activeIndex, overIndex));
        return arrayMove(items, activeIndex, overIndex);
        // items: [2, 3, 1]   0  -> 2
        // [1, 2, 3] oldIndex: 0 newIndex: 2  -> [2, 3, 1] 
      });
    }
  }
}

export default App;
