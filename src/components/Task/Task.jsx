import React, { useState } from 'react'
import '../Task/Task.css';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import ClearIcon from '@mui/icons-material/Clear';

const Task = ({ id, title, status, priority, deadline, deleteHendler }) => {

    let [stat, setStat] = useState(status);
    function setStatus(event) {
        setStat(!stat);
    }
    return (
        <div className={`task ${stat ? 'task-done' : ''}`} >
            <input type="checkbox" onChange={setStatus} checked={stat} />
            {priority && <PriorityHighIcon className="text-danger" />}
            <span className={`title ${stat ? 'through' : ''}`}> {title}</span>
            {
                (deadline && !stat) &&
                <div className="date">
                    <span className="text-white">{deadline.toLocaleDateString()}</span>
                </div>
            }
            <ClearIcon onClick={() => { deleteHendler(id) }} className="close" />
        </div>
    )
}

export default Task