import { FaTimes } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";
// import { FaArrowRight } from 'react-icons/fa6';
import { PiDotOutlineFill } from "react-icons/pi";

const Task = ({ task, onDelete, onToggle, editTask, updateViewTask }) => {
  const handleAction = (action) => {
    if (action === "view") {
      updateViewTask(task);
    }
    if (action === "edit") {
      editTask(task);
    }
    if (action === "delete") {
      onDelete(task.id, task.title);
    }
    if (action === "reminder") {
      onToggle(task.id, task.title);
    }
  };
  return (
    <div className={`task ${task.reminder ? "reminder" : ""}`}>
      <div className="task-text" onClick={(e) => handleAction("view")}>
        <h3>{task.title}</h3>
        <p>{task.text}</p>
        <p style={{ verticalAlign: "middle", marginTop: "10px" }}>
          {task.from}{" "}
          {task.from && task.to && (
            <PiDotOutlineFill
              style={{ fontSize: 20, color: "gray", paddingTop: "0" }}
            />
          )}{" "}
          {task.to}
        </p>
      </div>
      {/* <div>
				<p>{task.from}</p>
				<p>{task.to}</p>
			</div> */}
      <div className="icons">
        <FaTimes className="cross-icon" onClick={() => handleAction("delete")} />
        <FaPenToSquare className="edit-icon" onClick={() => handleAction("edit")}/>
        <input
          type="checkbox"
          value={task.reminder}
          checked={task.reminder}
          onChange={() => handleAction("reminder")}
        />
      </div>
    </div>
  );
};

export default Task;
