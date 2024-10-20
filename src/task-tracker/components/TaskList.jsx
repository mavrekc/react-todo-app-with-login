import './Card.css'
import { useState, useEffect } from 'react';
import { FaUserLarge, FaPenToSquare } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { PiDotOutlineFill } from "react-icons/pi";
import { RxCross2 } from "react-icons/rx";
import { GoPencil } from "react-icons/go";

import Divider from './Divider';

function TaskList({
  tasks,
  showProfile,
  setShowProfile,
  updateViewTask,
  editTask,
  onRemove,
  onToggle,
  updateTask,
  user
}) {

  // console.log('tasks from parent', tasks);
  
  // const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('login')));
  const [eventValue, setEventValue] = useState('');
  const [eventCard, setEventCard] = useState(null);

  const [imgFailedToLoad, setImgFailedToLoad] = useState(false);
  // const [imgURL, setImgURL] = useState(() => {

  //   const currentUser = JSON.parse(localStorage.getItem('users')).find((item) => user.email === item.email);

  //   const fileObject = currentUser.image;

  //   const file = new File([fileObject.data], fileObject.name, { type: fileObject.type, lastModified: fileObject.lastModified });

  //   console.log(currentUser);

  //   return URL.createObjectURL(file);

  // });
  // const [currTasks, setCurrTasks] = useState(tasks.filter((task) => task.email === user.email));

  // console.log(currTasks);

  useEffect(() => {
    // updateTask();
    // setCurrTasks(JSON.parse(localStorage.getItem('tasks')).filter((task) => task.email === user.email));
    // setCurrTasks(tasks.filter((task) => task.email === user.email));
    // checkFileLoads(user.image !== undefined && imgURL);

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
      // updateTask();
    }
    if (action === "delete") {
      onRemove(task.id, task.title);
    }
    if (action === "reminder") {
      onToggle(task.id, task.title);
    }
  };

  const checkFileLoads = (fileUrl) => {
    const response = fetch(fileUrl).then((data) => {
      console.log("Success: ", data);
        setImgFailedToLoad(false);
    }).catch((error) => {
      console.log(error)
        setImgFailedToLoad(true);
    });
    console.log(response);
  }

  const getModalDetails = (card) => {
    switch (eventValue.toLowerCase()) {
      case "reminder":
        return {
          title: 'Task Reminder',
          description: card.reminder ? `Do you want to remove reminder on this Task "${card.title}"?` : `Do you want to set reminder on this Task "${card.title}"?`
        }
      
      case "delete":

        return {
          title: 'Task Remove',
          description: `Do you want to remove this task "${card.title}"`
        }
    
      default:
        break;
    }

    return {
      title: '',
      description: ''
    }
  }

  const changeBorderAlt = (task) => {
    if (task.priority !== '' && task.priority !== undefined) {
      let value = '';
      switch (task.priority.toLowerCase()) {
        case 'low':
          value = '13, 110, 253';
          break;
      
        case 'medium':
          value = '25, 135, 84';
          break;

        case 'high':
          value = '230, 226, 28';
          break;

        case 'critical':
          value = '255, 193, 7';
          break;

        case 'urgent':
          value = '220, 53, 69';
          break;
        default:
          value = '0, 0, 0';
          break;
      }
      return value;
    }
    else {
      return '0, 0, 0';
    }
  }
  const changeBorder = (task) => {
    if (task.priority !== '' && task.priority !== undefined) {
      let value = [];
      switch (task.priority.toLowerCase()) {
        case 'low':
          value = ['rgba(13, 110, 253, 0.85)', 'rgba(13, 110, 253, 0.24)'];
          break;
      
        case 'medium':
          value = ['rgba(25, 135, 84, 0.85)', 'rgba(25, 135, 84, 0.24)'];
          break;

        case 'high':
          value = ['rgba(230, 226, 28, 0.85)', 'rgba(230, 226, 28, 0.24)'];
          break;

        case 'critical':
          value = ['rgba(255, 193, 7, 0.85)', 'rgba(255, 193, 7, 0.24)'] ;
          break;

        case 'urgent':
          value = ['rgba(220, 53, 69, 0.85)', 'rgba(220, 53, 69, 0.24)'];
          break;
        default:
          // value = ['rgba(0, 0, 0, 0.24)', 'rgba(0, 0, 0, 0.24)'];
          break;
      }
      return value;
    }
    else {
      // return ['rgba(0, 0, 0, 0.24)', 'rgba(0, 0, 0, 0.24)'];
      return [''];
    }
  }



  return (
    <>
        {tasks.map((card) => {
          return (
            <div key={card.id} className='card-container' style={(card.priority !== '' && changeBorder(card)[0] !== '') ? { borderTopColor: changeBorder(card)[0], borderTopStyle: 'solid' } : {}}>
            {/* <div key={card.id} className='card-container' style={{ borderColor: `rgba(${changeBorderAlt(card)}, 0.85)`, boxShadow: `rgba(${changeBorderAlt(card)}, 0.24) 0px 2px 8px 0.5px`}}> */}
                {/* {console.log("user-image", user.image)}
                {console.log("image url and load", imgURL, imgFailedToLoad)} */}
              <div className='card-header'>
                {/* <div className='card-header-left'> */}
                  {/* <FaUserLarge className='card-icon' /> */}
                  {user.image !== null && user.image !== undefined ? (
                      // imgFailedToLoad ? (
                      //   <span className='card-icon' style={{ textAlign: 'center'}} onClick={() => setShowProfile(!showProfile)}>{user.fName.slice(0, 1)}</span> 

                      // ) : (
                        <img src={user.image.data} className='img-fluid profile-image' alt="img" onClick={() => setShowProfile(!showProfile)} />
                      // )
                  ) : (
                    <span className='card-icon' style={{ textAlign: 'center'}} onClick={() => setShowProfile(!showProfile)}>{user.fName.slice(0, 1)}</span> 
                  )} 
                  <div className='card-header-left-text' onClick={() => setShowProfile(!showProfile)}>
                    <span className='company-name'>{`${user.fName} ${user.lName}`}</span>
                    <span className='post-date'>{card.email}</span>
                    {/* <p style={{ verticalAlign: "middle", marginBottom: 0 }}>
                      {card.from}{" "}
                      {card.from && card.to && (
                        <PiDotOutlineFill
                          style={{ fontSize: 12, color: "gray", paddingTop: "0" }}
                        />
                      )}{" "}
                      {card.to}
                    </p> */}
                  </div>
                  <GoPencil className="edit-icon" onClick={() => handleAction("edit", card)}/>
                  <RxCross2 className="cross-icon" data-bs-toggle="modal" data-bs-target="#customModal" onClick={() => {
                    setEventValue("delete");
                    setEventCard(card);
                    }} />
                {/* </div> */}
              </div>
              <Divider style={{
                height: '1px',
                width: '100%',
                margin: '8px 0px 7px 0px',
                border: '1px solid rgba(173, 173, 173, 1)'
              }} />
              {/* <div className="card-description"> */}
                <div className='card-title' >
                  <p className='title-text' style={{ cursor: 'pointer', height: '100%' }} onClick={() => handleAction("view", card)}>{card.title}</p> 
                  <p className='title-sub'>
                    <span style={{ minWidth: '90%'}}>{card.text}</span>
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
                      data-bs-toggle="modal"
                      data-bs-target="#customModal"
                      onChange={() => {
                        setEventValue("reminder");
                        setEventCard(card);
                      }}
                    />
                  </p>
                  {/* <Divider style={{
                      height: '1px',
                      width: '100%',
                      margin: '6px 0px 0px 0px',
                      border: '1px solid rgba(173, 173, 173, 1)'
                  }} /> */}
                  <div className='task-date'>
                    {
                      (card.from !== '' || card.to !== '') && (
                        <Divider style={{
                            height: '1px',
                            width: '100%',
                            margin: '6px 0px 5px 0px',
                            border: '1px solid rgba(173, 173, 173, 1)'
                        }} />
                      )
                    }

                    <div className='date-container'>

                      <p style={{ margin: '0', minHeight: '18px'}}>
                        <span style={{ display: 'inline-block', width: '100%', textAlign: 'start', fontWeight: '600'}}>{card.from && "From:"}</span>
                        {/* {" "}
                        {card.from && card.to && (
                          <PiDotOutlineFill
                            style={{ fontSize: 12, color: "gray", paddingTop: "0" }}
                          />
                        )}
                        {" "} */}
                        <span style={{ display: 'inline-block', width: '100%', textAlign: 'start'}}>{card.from && `${card.from}`}</span>
                      </p>
                      <p style={{ margin: '0', minHeight: '18px'}}>
                        <span style={{ display: 'inline-block', width: '100%', textAlign: 'start', fontWeight: '600' }}>{card.to && "To:"}</span>
                        {/* {" "}
                        {card.from && card.to && (
                          <PiDotOutlineFill
                            style={{ fontSize: 12, color: "gray", paddingTop: "0" }}
                          />
                        )}
                        {" "} */}
                        <span style={{ display: 'inline-block', width: '100%', textAlign: 'start' }}>{card.to && `${card.to}`}</span>
                      </p>
                    </div>
                  </div>
                </div>
              {/* </div> */}
              {/* <div className='card-footer'> */}
                {/* <div className="icons"> */}
                  {/* <FaPenToSquare className="edit-icon" onClick={() => handleAction("edit", card)}/> */}
                {/* </div> */}
              {/* </div> */}
            </div>
          )
        })}

      <div className="modal fade" id="customModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              {/* <h1 class="modal-title fs-5" id="exampleModalLabel">{eventValue === 'delete' ? "Remove Task" : "Task Reminder"}</h1> */}
              <h1 className="modal-title fs-5" id="exampleModalLabel">{getModalDetails(eventCard).title}</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
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
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary btn-md btn-dark" style={{ paddingLeft: '19px', paddingRight: '19px' }} onClick={() => handleAction(eventValue, eventCard)} data-bs-dismiss="modal">Ok</button>
              </div>
            </div>
          </div>
        </div>
      </>
  )
}

export default TaskList;
