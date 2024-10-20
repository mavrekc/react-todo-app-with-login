import Row from "../../components/Row";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { GoPencil } from "react-icons/go";
import { BsEye } from "react-icons/bs";


const TaskTable = ({
  tasks,
  updateViewTask,
  editTask,
  onRemove,
  onToggle,
  updateTask,
}) => {
  const [eventValue, setEventValue] = useState("");
  const [eventCard, setEventCard] = useState(null);

  const handleAction = (action, task) => {
    if (action === "view") {
      updateViewTask(task);
    }
    if (action === "edit") {
      editTask(task); 
      updateTask();
    }
    if (action === "delete") {
      onRemove(task.id, task.title);
    }
    if (action === "reminder") {
      onToggle(task.id, task.title);
    }
  };

  const getModalDetails = (card) => {
    switch (eventValue.toLowerCase()) {
      case "reminder":
        return {
          title: "Task Reminder",
          description: card.reminder
            ? `Do you want to remove reminder on this Task "${card.title}"?`
            : `Do you want to set reminder on this Task "${card.title}"?`,
        };

      case "delete":
        return {
          title: "Task Remove",
          description: `Do you want to remove this task "${card.title}"`,
        };

      default:
        break;
    }

    return {
      title: "",
      description: "",
    };
  };

  return (
    <div id="users-table">
      <table className="table table-striped table-hover" style={{ margin: '5px 0px'}}>
        {/* <thead>
					<tr>
					<th scope="col">#</th>
					<th scope="col">First Name</th>
					<th scope="col">Last Name</th>
					<th scope="col">Email</th>
					<th scope="col">Password</th>
					<th scope="col">Confirm</th>
					<th scope="col">Date</th>
					<th scope="col">Number</th>
					<th scope="col">Address</th>
					<th scope="col">Gender</th>
					</tr>
				</thead> */}

        <thead>
          <tr>
            <th style={{ padding: "10px 7px" }} scope="col">
              #
            </th>
            <th style={{ padding: "10px 7px" }} scope="col">
              Title
            </th>
            <th style={{ padding: "10px 7px" }} scope="col">
              Description
            </th>
            <th style={{ padding: "10px 7px" }} scope="col">
              Priority
            </th>
            <th style={{ padding: "10px 7px" }} scope="col">
              From
            </th>
            <th style={{ padding: "10px 7px" }} scope="col">
              To
            </th>
            <th style={{ padding: "10px 7px" }} scope="col">
              Actions
            </th>
            {/* <th scope="col">Address</th>
					<th scope="col">Gender</th> */}
          </tr>
        </thead>
        {/* <tbody>
					{users.map((user, index) => <Row key={user.id} index={index} user={user} />)}
				</tbody> */}

        <tbody>
          {/* {tasks.map((task, index) => <Row key={task.id} index={index} task={task} />)} */}
          {tasks.map((task, index) => {
            return (
              <tr key={task.id} style={{ textAlign: "start"}}>
                <th style={{ padding: "10px 10px" }} scope="row">{index + 1}</th>
                <td style={{ padding: "10px 5px" }}>{task.title}</td>
                <td style={{ padding: "10px 5px" }}>{task.text}</td>
                {/* <td style={{ padding: "10px 5px" }}>{task.reminder ? "Yes" : "No"}</td> */}
                <td style={{ padding: "10px 5px" }}>{task.priority !== '' ? task.priority : "-"}</td>
                <td style={{ padding: "10px 5px" }}>{task.from !== "" ? task.from : "-"}</td>
                <td style={{ padding: "10px 5px" }}>{task.to !== "" ? task.to : "-"}</td>
                {/* <td style={{ padding: "10px 5px" }}>{task.email}</td> */}
                <td style={{ padding: "10px 5px" }}>
                  <GoPencil
                    className="table-action-icon"
                    style={{ marginRight: "4px", padding: "3px" }}
                    onClick={() => {
                      handleAction("edit", task);
                    }}
                  />
                  <RxCross2
                    className="table-action-icon"
                    style={{ margin: "0 4px" }}
                    data-bs-toggle="modal"
                    data-bs-target="#tableModal"
                    onClick={() => {
                      setEventValue("delete");
                      setEventCard(task);
                    }}
                  />
                  <BsEye
                    className="table-action-icon"
                    style={{ margin: "0 4px", padding: "3px" }}
                    onClick={() => {
                      handleAction("view", task);
                    }}
                  />
                  <input
                    type="checkbox"
                    value={task.reminder}
                    checked={task.reminder}
                    style={{
                      // marginLeft: '100%',
                      display: 'inline-block',
                      height: '15px',
                      width: '15px',
                      minWidth: '15px',
                      verticalAlign: 'middle',
                      cursor: 'pointer',
                      marginLeft: '4px',
                      marginRight: '2px'

                    }}
                    data-bs-toggle="modal"
                    data-bs-target="#tableModal"
                    onChange={() => {
                      setEventValue("reminder");
                      setEventCard(task);
                    }}
                  />
                </td>
                {/* <td>{task.address}</td>
								<td>{task.gender}</td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div
        className="modal fade"
        id="tableModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              {/* <h1 class="modal-title fs-5" id="exampleModalLabel">{eventValue === 'delete' ? "Remove Task" : "Task Reminder"}</h1> */}
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {getModalDetails(eventCard).title}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body" style={{ textAlign: 'start'}}>
              {
                getModalDetails(eventCard).description
                // eventValue === "detete" ? (
                //   "Do you want to remove this"
                // ) :
                // (

                // )
              }
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary btn-md btn-dark"
                style={{ paddingLeft: "19px", paddingRight: "19px" }}
                onClick={() => handleAction(eventValue, eventCard)}
                data-bs-dismiss="modal"
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskTable;
