import React from "react";
import './Column.scss';
import Task from "components/Task/Task";
function Column() {
    return (
        <div className="column">
            <header>
                Bran
            </header>
            <ul className="task-list">
                <Task />
                {/* <li className="task-item">Add what you'd like to work</li>
                <li className="task-item">Add what you'd like to work</li>
                <li className="task-item">Add what you'd like to work</li>
                <li className="task-item">Add what you'd like to work</li>
                <li className="task-item">Add what you'd like to work</li> */}
            </ul>
            <footer>
                Add an other card
            </footer>
        </div>
    )
}

export default Column;