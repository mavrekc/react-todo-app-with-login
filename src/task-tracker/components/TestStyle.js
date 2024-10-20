import './TestStyle.css'
import { useState, useEffect } from 'react';
import { FaUserLarge, FaPenToSquare } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { PiDotOutlineFill } from "react-icons/pi";

function Cards({ tasks, updateViewTask, editTask, onRemove, onToggle, updateTask }) {

  console.log('tasks from parent', tasks);
  
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('login')));
  // const [currTasks, setCurrTasks] = useState(tasks.filter((task) => task.email === user.email));

  // console.log(currTasks);

  useEffect(() => {
    // updateTask();
    // setCurrTasks(JSON.parse(localStorage.getItem('tasks')).filter((task) => task.email === user.email));
    // setCurrTasks(tasks.filter((task) => task.email === user.email));
  }, [])

  // useEffect(() => {
  //   setCurrTasks(tasks.filter((task) => task.email === user.email));
  // }, [tasks])

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

  return (

		<div className='container-fluid main-container'>
			{/* <div className='row justify-content-center row-col-sm-12 row-col-md-6 row-col-lg-3 row-col-xl-3 row-col-xxl-3'> */}
			<div className='row justify-content-center align-items-center row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-3 row-cols-xxl-3'>
        {tasks.map((card) => {
          return (
            <div key={card.id} className='col col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4'>
            <div className='card-container'>
            {/* // <div key={card.id} className='card-container col'> */}
              <div className='card-header'>
                {/* <div className='card-header-left'> */}
                  <FaUserLarge className='card-icon' />
                  <div className='card-header-left-text'>
                    <span className='company-name'>{`${user.fName} ${user.lName}`}</span>
                    <span className='post-date'>{card.email}</span>
                    <p style={{ verticalAlign: "middle", marginBottom: 0 }}>
                      {card.from}{" "}
                      {card.from && card.to && (
                        <PiDotOutlineFill
                          style={{ fontSize: 12, color: "gray", paddingTop: "0" }}
                        />
                      )}{" "}
                      {card.to}
                    </p>
                  </div>
                  <FaTimes className="cross-icon" onClick={() => handleAction("delete", card)} />
                {/* </div> */}
              </div>
              <div className='card-title' >
                <p className='title-text' >
                  <p style={{ cursor: 'pointer', height: '100%' }} onClick={() => handleAction("view", card)}>{card.title}</p> 
                  <input
                    type="checkbox"
                    value={card.reminder}
                    checked={card.reminder}
                    style={{
                      // marginLeft: '100%',
                      display: 'inline-block',
                      height: '21px',
                      width: '21px',
                      minWidth: '21px',
                      verticalAlign: 'middle',
                      cursor: 'pointer'

                    }}
                    onChange={() => handleAction("reminder", card)}
                  />
                </p>
                <p className='title-sub'>
                  {card.text}
                </p>
              </div>
              {/* <div className='card-footer'> */}
                <div className="icons">
                  <FaPenToSquare className="edit-icon" onClick={() => handleAction("edit", card)}/>
                </div>
              {/* </div> */}
            </div>
			</div>
          )
        })}
		</div>
		</div>
  )
}

export default Cards;
