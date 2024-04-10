import React, { useState } from "react";
import { TASKS } from "../Data";
import Task from "../Task/Task";
import "../ToDoList/ToDoList.css";
import Dialog from "@mui/material/Dialog";
import Button from '@mui/material/Button';
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

const ToDoList = () => {
  const [tasks, tasksSet] = useState(TASKS);
  const [open, setOpen] = useState(false);
  const [delTask, setdelTask] = useState(tasks[0]);
   
  function handleClickOpen(id){
    setOpen(true);
    setdelTask(tasks.find(x=>x.id === id));
  };

  function handleClose(value){
    setOpen(false);
    if(value === true && delTask){
      const index = tasks.indexOf(delTask);
      const copy = [...tasks];
      copy.splice(index, 1);
      tasksSet(copy);
    }
 };

  return (
    <div className="todo-list">
      <h1 className="fw-bold">My To Do List</h1>
      {
      tasks.length > 0 
        ? <div className="list">
             {tasks.map((item) =><Task key={item.id} {...item} deleteHendler={handleClickOpen} />)}
          </div>
        :  <h2>To do list is empty</h2>
      }
       <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description" >
        <DialogTitle id="alert-dialog-title">
          {`Are you sure you want to delete task "${delTask.title}"?`}
        </DialogTitle>
        <DialogActions>
           <Button onClick={()=>handleClose(true)}> Agree</Button>
           <Button onClick={()=>handleClose(false)}  autoFocus>Disagree</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ToDoList;
