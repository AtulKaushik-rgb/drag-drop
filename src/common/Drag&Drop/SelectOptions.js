import React, { useState, useEffect } from "react";
//import "./SelectOptions.css";
import useStyles from '../../dragTheme';
import {GreenCheckbox,StyledButton} from '../../dragTheme';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Button } from "@material-ui/core";
import uuid from "react-uuid";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import PropTypes from 'prop-types';

const SelectOptions = ({ data }) => {
  const [choicesCount, setChoicesCount] = useState(0);
  const [chosenCount, setChosenCount] = useState(0);
  const [choices, setChoices] = useState([]);
  const [chosen, setChosen] = useState([]);

  const classes = useStyles();

  //get random 10 users and add it to available choices
  useEffect(() => {
    if (data) {
      data.forEach((element) => {
        element.checked = false;
      });

      let dataObj = data.map((obj) => {
        return {
          title: obj.first,
          checked: obj.checked,
        };
      });

      setChoices(dataObj);
    }

    setChosen([]);
  }, [data]);

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

    if (e.target.checked) {
      // allCheckBox.current.checked = false;

      setChoicesCount(newArray.length);
    } else setChoicesCount(0);

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

    if (e.target.checked) {
      setChosenCount(newArray.length);
    } else setChosenCount(0);

    setChosen(newArray);
  };

  return (
    <div className={classes.dragContainer}>
      <div className={classes.dndContainer}>
        <div className={classes.checkboxes}>
          <div className={classes.allSection}>
            <div>
              <GreenCheckbox
                onChange={updateAllChoices}
                checked={
                  choicesCount === choices.length && choices.length > 0
                    ? true
                    : false
                }
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
                  <ul
                    className={classes.container}
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
                              className={classes.checkboxContainer}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                            >
                              <GreenCheckbox
                                className={classes.checkbox_style}
                                checked={choice.checked}
                                name={choice.title}
                                onChange={onCheckedChoicesHandler}
                                // inputProps={{
                                //   "aria-label": "secondary checkbox",
                                // }}
                              />
                              <label>{choice.title}</label>
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

        <div className={classes.btnContainer}>
          <Button
            className={classes.greenButton}
            variant="contained"
            disabled={!choicesCount}
            onClick={transferToRight}
          >
            <ChevronRightIcon />
          </Button>
          <Button
            className={classes.greenButton}
            variant="contained"
            disabled={!chosenCount}
            onClick={transferToLeft}
          >
            <ChevronLeftIcon />
          </Button>
        </div>

        <div className={classes.checkboxes}>
          <div className={classes.allSection}>
            <div>
              <GreenCheckbox
                //inputProps={{ "aria-label": "secondary checkbox" }}
                onChange={updateAllChosen}
                checked={
                  chosenCount === chosen.length && chosen.length ? true : false
                }
              />
              <label>Chosen</label>
            </div>
            <p className='count-label'>
              {chosenCount}/{chosen.length} selected
            </p>
          </div>

          <DragDropContext onDragEnd={onDragEndHandlerForChosen}>
            <Droppable droppableId={uuid()}>
              {(provided) => (
                <div>
                  <ul
                    className={classes.container}
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
                              className={classes.checkboxContainer}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                            >
                              <GreenCheckbox
                              className={classes.checkbox_style}
                                checked={chosen.checked}
                                name={chosen.title}
                                onChange={onCheckedChosenHandler}
                                // inputProps={{
                                //   "aria-label": "primary checkbox",
                                // }}
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

SelectOptions.propTypes = {
  data: PropTypes.array.isRequired
};

export default SelectOptions;
