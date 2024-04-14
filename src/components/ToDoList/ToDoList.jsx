import React, { useState } from "react";
import { TASKS } from "../Data";
import Task from "../Task/Task";
import "../ToDoList/ToDoList.css";
import Dialog from "@mui/material/Dialog";
import Button from '@mui/material/Button';
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import CreateForm from "../CreateForm/CreateForm";

const ToDoList = () => {
    const [tasks, tasksSet] = useState(TASKS);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [delTask, setDelTask] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
   
    function handleClickOpen(value) {
        setIsDialogOpen(x=>true);
        if(value) 
          setDelTask(tasks.find(x => x.id === value));
    };

    function addNewTask(task){
        setIsFormOpen(false);
        if(task == null) return;
        tasksSet([...tasks,new TaskModel(task)])
    }

    function handleClose(value) {
        setIsDialogOpen(false);
        if(value){
            if (delTask) {
            const index = tasks.indexOf(delTask);
            const copy = [...tasks];
            copy.splice(index, 1);
            tasksSet(copy);
            }
            else tasksSet([]);
        }
        setDelTask(null);
    };

    return (
        <div className="todo-list">
            <h1 className="fw-bold">My To Do List</h1>
            <div className="d-flex flex-column gap-2 mx-5">
                {!isFormOpen 
                 ? <Button onClick={()=>{setIsFormOpen(true)}} variant="contained">Add new task</Button>
                 : <CreateForm addTaskHandle={addNewTask}/>}
                <Button variant="contained" onClick={()=>{handleClickOpen()}}>Clear task list</Button>
            </div>
            {
                tasks.length > 0
                    ? <div className="list">
                        {tasks.map((item) => <Task key={item.id} {...item} deleteHendler={handleClickOpen} />)}
                    </div>
                    : <h2>To do list is empty</h2>
            }
            <Dialog
                open={isDialogOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description" >
                <DialogTitle id="alert-dialog-title">
                    {delTask
                     ?`Are you sure you want to delete task "${delTask.title}"?`
                     :'Are you sure you want to clear task list ?'}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={() => handleClose(true)}> Agree</Button>
                    <Button onClick={() => handleClose(false)} autoFocus>Disagree</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ToDoList;

class TaskModel{
    static globalId = TASKS.length;
    constructor({title,priority,deadline}){
        this.id = ++TaskModel.globalId;
        this.title = title;
        this.priority = priority;
        this.deadline = deadline;
    }
}