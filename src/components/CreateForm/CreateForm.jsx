import React from 'react'
import { useForm } from 'react-hook-form'
import "../CreateForm/CreateForm.css";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';



const CreateForm = ({ addTaskHandle }) => {
    const {
        register,
        handleSubmit
    } = useForm()

    const create = (task) => {
        task.deadline = task.deadline ? new Date(task.deadline): null;
        addTaskHandle(task);
    }

    return (
        <>
            <h2>Create New Task</h2>
            <form onSubmit={handleSubmit(create)}>
                <TextField  {...register("title")} label="Title" variant="outlined" />
                <FormControlLabel {...register("priority")} control={<Checkbox />} label="Important" />
                <label>
                    <span>Deadline:</span>
                    <input {...register("deadline")} type="date" />
                </label>
                <div className='d-flex gap-5'>
                    <Button type='submit' variant="contained">Create</Button>
                    <Button type='button' onClick={() => { addTaskHandle(null) }} variant="contained">Cancel</Button>
                </div>
            </form>
        </>
    )
}

export default CreateForm