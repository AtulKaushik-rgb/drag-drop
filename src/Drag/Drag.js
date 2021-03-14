import React, { useState,useEffect } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import "./Drag.css";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Button} from "@material-ui/core";
import uuid from "react-uuid";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import axios from 'axios';
import Loader from 'react-loader-spinner'

const Drag = () => {
  
  const [choicesCount, setChoicesCount] = useState(0);
  const [chosenCount, setChosenCount] = useState(0);
  const [loading, setLoading] = useState(false);


  //get random 10 users and add it to available choices
  useEffect(async()=>{
    try {
      setLoading(true);
      const data = await axios.get('https://randomuser.me/api?page=1&results=10');
      let names = data.data.results.map(obj=>obj.name)
      names.forEach( element=> {
        element.checked = false;
      });
      let nameObj = names.map(obj=>{
        return{
          title:obj.first,
          checked:obj.checked
        }
      })



      
      setChoices(nameObj);
      setLoading(false);
    } catch (err) {
    //  alert(err)
    }
    

  },[])


  const [choices, setChoices] = useState([]);
  const [chosen, setChosen] = useState([]);

  const onDragEndHandlerForChoices = (result) => {
    if (!result.destination) return;

    const items = Array.from(choices);
    const [newItems] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, newItems);

    setChoices(items);
  };

  let transferToRight = () => {
    //get all checked and unchecked of choices

    let checkedArray = Array.from(choices).filter(
      (obj) => obj.checked === true
    );
    let unCheckedArray = Array.from(choices).filter(
      (obj) => obj.checked === false
    );

    setChoices(unCheckedArray);

    //set checked to false and add it to chosen
    checkedArray = checkedArray.map((obj) => {
      obj.checked = false;

      return obj;
    });


    setChoicesCount((choicesCount) => choicesCount - checkedArray.length);
    setChosen([...checkedArray, ...chosen]);
  };

  let transferToLeft = () => {
    //get all checked and unchecked of choices

    let checkedArray = Array.from(chosen).filter((obj) => obj.checked === true);
    let unCheckedArray = Array.from(chosen).filter(
      (obj) => obj.checked === false
    );

    setChosen(unCheckedArray);

    //set checked to false and add it to chosen
    checkedArray = checkedArray.map((obj) => {
      obj.checked = false;

      return obj;
    });


    setChosenCount((chosenCount) => chosenCount - checkedArray.length);
    setChoices([...checkedArray, ...choices]);
  };

  const onDragEndHandlerForChosen = (result) => {
    if (!result.destination) return;

    const items = Array.from(chosen);
    const [newItems] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, newItems);

    setChosen(items);
  };

  const onCheckedChoicesHandler = (e) => {

    let newArray = Array.from(choices).map((obj) => {
      if (obj.title === e.target.name) obj.checked = !obj.checked;

      return obj;
    });

    if (e.target.checked) setChoicesCount(choicesCount + 1);
    else setChoicesCount(choicesCount - 1);

    setChoices(newArray);
  };

  const onCheckedChosenHandler = (e) => {
    let newArray = Array.from(chosen).map((obj) => {
      if (obj.title === e.target.name) obj.checked = !obj.checked;

      return obj;
    });

    if (e.target.checked) setChosenCount(chosenCount + 1);
    else setChosenCount(chosenCount - 1);

    setChosen(newArray);
  };

  const updateAllChoices = (e) => {
    let newArray = null;
    if (e.target.checked) {
      newArray = Array.from(choices).map((obj) => {
        obj.checked = true;
        return obj;
      });
    } else {
      newArray = Array.from(choices).map((obj) => {
        obj.checked = false;
        return obj;
      });
    }

    

    if (e.target.checked)
    {

     // allCheckBox.current.checked = false;
      
      setChoicesCount(newArray.length);
    } 
    else setChoicesCount(0);


    setChoices(newArray);
  };

  const updateAllChosen = (e) => {
    let newArray = null;
    if (e.target.checked) {
      newArray = Array.from(chosen).map((obj) => {
        obj.checked = true;
        return obj;
      });
    } else {
      newArray = Array.from(chosen).map((obj) => {
        obj.checked = false;
        return obj;
      });
    }

    

    if (e.target.checked)
    {
      setChosenCount(newArray.length);
    } 
    else setChosenCount(0);

    setChosen(newArray);
  };


  return (
    <div className='drag-container'>
      <div className="dnd-container">
        <div className="checkboxes">
          <div className="all-section">
            <div>
              <Checkbox
                onChange={updateAllChoices}
                inputProps={{ "aria-label": "primary checkbox" }}
                checked={choicesCount===choices.length && choices.length > 0?true:false}
                
              />
              <label>Choices</label>
            </div>
            <p>
              {choicesCount}/{choices.length} selected
            </p>
          </div>

          <DragDropContext onDragEnd={onDragEndHandlerForChoices}>
            <Droppable droppableId={uuid()}>
              {(provided) => (
                <div>
                  {loading && <div className='loader'>
                    <Loader
                    type="ThreeDots"
                    ></Loader>
                    Loading Choices...
                    </div>}
                  {!loading&&
                  <ul
                    className="container"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {choices.map((choice, index) => {
                      return (
                        <Draggable
                          draggableId={choice.title}
                          key={choice.title}
                          index={index}
                        >
                          {(provided) => (
                            <li
                              className="checkbox-container"
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                            >
                              <Checkbox
                                checked={choice.checked}
                                name={choice.title}
                                onChange={onCheckedChoicesHandler}
                                inputProps={{
                                  "aria-label": "primary checkbox",
                                }}
                              />
                              <label>{choice.title}</label>
                            </li>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </ul>
                  }
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>

        <div className="btn-container">
          <Button
            variant="contained"
            disabled={!choicesCount}
            color="primary"
            onClick={transferToRight}
          >
            <ChevronRightIcon />
          </Button>
          <Button
            variant="contained"
            disabled={!chosenCount}
            color="primary"
            onClick={transferToLeft}
          >
            <ChevronLeftIcon />
          </Button>
        </div>

        <div className="checkboxes">
          <div className="all-section">
            <div>
              <Checkbox
                inputProps={{ "aria-label": "primary checkbox" }}
                onChange={updateAllChosen}
                checked={chosenCount===chosen.length && chosen.length?true:false}
                
              />
              <label>Chosen</label>
            </div>
            <p>
              {chosenCount}/{chosen.length} selected
            </p>
          </div>

          <DragDropContext onDragEnd={onDragEndHandlerForChosen}>
            <Droppable droppableId={uuid()}>
              {(provided) => (
                <div>
                  <ul
                    className="container"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {chosen.map((chosen, index) => {
                      return (
                        <Draggable
                          draggableId={chosen.title}
                          key={chosen.title}
                          index={index}
                        >
                          {(provided) => (
                            <li
                              className="checkbox-container"
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                            >
                              <Checkbox
                                checked={chosen.checked}
                                name={chosen.title}
                                onChange={onCheckedChosenHandler}
                                inputProps={{
                                  "aria-label": "primary checkbox",
                                }}
                              />
                              <label>{chosen.title}</label>
                            </li>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </ul>
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
};

export default Drag;
