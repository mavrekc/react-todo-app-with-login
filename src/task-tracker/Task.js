import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { FaTimes } from "react-icons/fa";
import { CiBoxList, CiGrid41 } from "react-icons/ci";

import Header from './components/Header';
// import Tasks from './components/Tasks';
// import AddTask from './components/AddTask';

import Footer from './components/Footer';
import About from './components/About';
import TaskList from './components/TaskList.jsx';
import Profile from './components/Profile.js';
// import Cards from './components/TestStyle.js';
import './Task.css';

import TaskTable from './components/TaskTable.js';
import TaskHandlerForm from './components/TaskHandlerForm.js';

function Task(props) {

  const location = useLocation();

  // [] - USER NAVIGATES TO TASK WITH LOGIN OR CHANGING URL
  // const [user, setUser] = useState(() => {
  //   // console.log(location);
  //   return (location.state !== undefined && location.state !== null) ?
  //     location.state :
  //     JSON.parse(localStorage.getItem('login'));
  // });

  const [user, setUser] = useState(() => {
    // console.log(location);

    const loginDetails = JSON.parse(localStorage.getItem('login'));

    const usersFromStorage = JSON.parse(localStorage.getItem('users'));

    return usersFromStorage.find((item) => item.email === loginDetails.email);

  });

  // [] - FOR DISPLAYING THE ADD TASK FORM
  const [show, setShow] = useState(false);

	const [submitValue, setSubmitValue] = useState('');
  const [submitStatus, setSubmitStatus] = useState(false);

  // [] - FOR EDITING THE CURRENT TASK
  const [taskEdit, setTaskEdit] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem('tasks')).filter((task) => task.email === user.email));
  const [taskAdded, setTaskAdded] = useState(false);
  const [viewTask, setViewTask] = useState(false);
  const [taskToView, setTaskToView] = useState(null);

  const [showProfile, setShowProfile] = useState(false);

  const [layout, setLayout] = useState('grid');
  
  const updateTasks = () => {
    const userFromStorage = JSON.parse(localStorage.getItem([user.email]));
    console.log(userFromStorage);

    if (userFromStorage !== undefined && userFromStorage !== null) {
      return userFromStorage.userTasks;
    }

    return [];
    };

  // const { user } = location.state || { user: null };
  // const user = location.state;

  useEffect(() => {

    console.log("user on component load: ", user)

    console.log('useEffect => initial => ', viewTask, taskEdit, show);
    const tasksFromStorage = JSON.parse(localStorage.getItem('tasks'));

    if (tasksFromStorage === null || tasksFromStorage === undefined) {
      localStorage.setItem('tasks', JSON.stringify([]));
    }
    else {

      const userTaskList = tasksFromStorage.filter((task) => {
        return task.email === user.email;
      });

      setTasks(userTaskList);

    }

  }, [])

  // [NOTE] ==> When closing Add Task with setting show property to false
  // ****** ==> without adding we need to reset the taskEdit property
  useEffect(() => {
    // console.log('useEffect => change in show => ', viewTask, taskEdit, show);

    if (!show && viewTask) {
      setViewTask(false);
    }

    if (!show && taskEdit) {
      setTaskEdit(false);
    }

    if (show) {
      setShowProfile(false);
    }

    // updateTask();
    
  }, [show])


  const handleTaskAdded = () => {
    setTaskAdded(!taskAdded);
  }

  const editTask = (task) => {
    setShow(true);
    setTaskEdit(true);
    setTaskToEdit(task);
  }

  const doneEditTask = (task) => {
    setShow(false);
    setTaskEdit(false);
    setTaskToEdit(null);
  }

  const updateTask = () => {
    setTasks((JSON.parse(localStorage.getItem('tasks')).filter((task) => task.email === user.email)));
  }

  const updateViewTask = (task) => {
    setShow(true);
    setViewTask(true);
    setTaskToView(task);
  }

  const updateUser = () => {
    console.log("update-user called", user);

    const loginDetails = JSON.parse(localStorage.getItem('login'));

    const usersFromStorage = JSON.parse(localStorage.getItem('users'));

    setUser(usersFromStorage.find((item) => item.email === loginDetails.email));

  }
  
  // const doneViewTask = () => {
  //   setShow(false);
  //   setViewTask(false);
  //   setTaskToEdit(null);
  // }

  // const [tasks, setTasks] = useState([
  //   {
  //     id: 1234,
  //     title: "Adventure",
  //     text: "Trip to Antartica",
  //     reminder: false,
  //     from: "2024-07-21",
  //     to: "2024-07-27"
  //   },
  //   {
  //     id: 2341,
  //     title: "Programming",
  //     text: "React JS",
  //     reminder: true,
  //     from: "2024-04-24",
  //     to: "2024-05-31"
  //   },
  //   {
  //     id: 4231,
  //     title: "Researching",
  //     text: "LLM's",
  //     reminder: false,
  //     from: "2024-07-21",
  //     to: "2024-07-27"
  //   },
  // ]);
  // const [showFooter, setShowFooter] = useState(false);
  // const location = useLocation();
  // const JSON_SERVER_ENDPOINT = 'http://localhost:8000/tasks/';

  // const fetchTasks = async () => {
  //   const res = await fetch(JSON_SERVER_ENDPOINT);

  //   const data = await res.json();

  //   return data;
  // }

  // const fetchTask = async (id) => {
  //   const res = await fetch(`${JSON_SERVER_ENDPOINT}${id}`);

  //   const data = await res.json();

  //   return data;
  // }

  const updateStorage = (newTask) => {

    const tasksFromStorage = JSON.parse(localStorage.getItem('tasks'));

    const updatedTasks = [ ...tasksFromStorage, newTask ];

    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    const userTaskList = JSON.parse(localStorage.getItem('tasks')).filter((task) => task.email === user.email);

    console.log(userTaskList);

    setTasks(userTaskList);

    // const updatedTaskObject = { ...taskObject, userTasks: updatedTaskList };

    // const tasksFromStorage = JSON.parse(localStorage.getItem('tasks'));

    // const updatedTasks = tasksFromStorage.map((task) => task.email === user.email ? updatedTaskObject : task);

    // localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    // const postTaskObject = (JSON.parse(localStorage.getItem('tasks'))).find((task) => task.email === user.email);

    // setTaskObject(postTaskObject);
    // setTasks(postTaskObject.userTasks);
  }

  // const updateStorage = (newTask) => {

  //   const updatedTaskList = [...taskObject.userTasks, newTask];

  //   const updatedTaskObject = { ...taskObject, userTasks: updatedTaskList };

  //   const tasksFromStorage = JSON.parse(localStorage.getItem('tasks'));

  //   const updatedTasks = tasksFromStorage.map((task) => task.email === user.email ? updatedTaskObject : task);

  //   localStorage.setItem('tasks', JSON.stringify(updatedTasks));

  //   const postTaskObject = (JSON.parse(localStorage.getItem('tasks'))).find((task) => task.email === user.email);

  //   setTaskObject(postTaskObject);
  //   setTasks(postTaskObject.userTasks);
  // }

  // const updateStorage = (newTask) => {
  //   const userFromStorage = JSON.parse(localStorage.getItem([user.email]));

  //   const updatedTaskList = [ ...userFromStorage.userTasks, newTask ];

  //   const updatedUser = { ...userFromStorage, userTasks: updatedTaskList };

  //   localStorage.setItem([user.email], JSON.stringify(updatedUser));
  // }

  const getTask = (id) => {

    return tasks.find((task) => task.id === id);

  }

  // const getTask = (id) => {
  //   const userFromStorage = JSON.parse(localStorage.getItem([user.email]));

  //   const taskList = userFromStorage.userTasks;

  //   return taskList.find((task) => task.id === id);
  // }

  const checkSameEntry = (text) => {
    return tasks.map((item) => {
      return item.title.toLowerCase() === text.toLowerCase();
    })
  }

  // useEffect(() => {
  //   const getTasks = async () => {
  //     const tasksFromServer = await fetchTasks();
  //     setTasks(tasksFromServer);
  //   }

  //   getTasks();
  // }, []);

  const addTask = async (task) => {

    const id = "id" + Math.random().toString(16).slice(2);

    const newTask = {email: user.email, id, ...task };

    console.log(newTask);

    updateStorage(newTask);

    // setTasks([...tasks, newTask]);


    // const res = await fetch(JSON_SERVER_ENDPOINT, {
    //   method: 'POST',
    //   headers: {
    //     'Content-type': 'application/json',
    //     // 'Access-Control-Allow-Origin': 'http://localhost:3000'
    //   },
    //   body: JSON.stringify(newUpdatedTask)
    // });

    // const data = await res.json();



    // const newTask = { id, ...task };
    // setTasks([...tasks, newTask]);
  };

  const removeTask = async (id, name, decision) => {
    // alert()
    // resetStates();

    // const decision = window.confirm(`Are you sure you want to remove this task => "${name}" ?`);

    // doneViewTask();

    // if (decision) {

      const tasksFromStorage = JSON.parse(localStorage.getItem('tasks'));

      console.log('TASKS FROM STORAGE: ', tasksFromStorage);

      const updatedTasks = tasksFromStorage.filter((task) => task.id !== id);

      console.log('TASKS FROM STORAGE: ', updatedTasks);

      localStorage.setItem('tasks', JSON.stringify(updatedTasks));

      const userTaskList = JSON.parse(localStorage.getItem('tasks')).filter((task) => task.email === user.email );

      console.log('TASKS FROM STORAGE: ', userTaskList);

      setTasks(userTaskList);


      setSubmitStatus(true);
      setSubmitValue(`Task Removed => "${name}"`);
      setTimeout(() => setSubmitValue(''), 1500);
      
      // await fetch(`${JSON_SERVER_ENDPOINT}${id}`, {
      //   method: "DELETE"
      // });

    // }
    // else {
    //   setSubmitStatus(false);
    //   setSubmitValue('User Canceled Action');

    //   setTimeout(() => {
    //     setSubmitValue('');
    //   }, 1500);

    // }
  };


  const toggleReminder = (id, name, decision) => {

    // resetStates();
    // const stringBasedOnReminder = taskToToggle.reminder ? `Are you sure you want to remove the reminder on this task => "${name}" ?` : `Are you sure you want to set the reminder on this task => "${name}" ?`
    // const decision = window.confirm(stringBasedOnReminder);


    // if (decision) {
        // console.log(taskObject);

        // const taskList = taskObject.userTasks;
      const taskToToggle = getTask(id);

      const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

      const tasksFromStorage = JSON.parse(localStorage.getItem('tasks'));

      const updatedTaskList = tasksFromStorage.map((task) => {
        return task.id === id ? updatedTask : task;
      });

      // const updatedTaskObject = { ...taskObject, userTasks: updatedTaskList };
      localStorage.setItem('tasks', JSON.stringify(updatedTaskList));

      const userTaskList = JSON.parse(localStorage.getItem('tasks')).filter((task) => task.email === user.email );

      setTasks(userTaskList);
      // const tasksFromStorage = JSON.parse(localStorage.getItem('tasks'));

      // const updatedTasks = tasksFromStorage.map((task) => task.email === user.email ? updatedTaskObject : task);

      // localStorage.setItem('tasks', JSON.stringify(updatedTasks));

      // const postTaskObject = (JSON.parse(localStorage.getItem('tasks'))).find((task) => task.email === user.email);

      // setTaskObject(postTaskObject);
      // setTasks(postTaskObject.userTasks);
      setSubmitStatus(true);
      if (taskToToggle.reminder) {
        setSubmitValue(`Reminder Removed On => "${name}"`);
      }
      else {
        setSubmitValue(`Reminder Set On => "${name}"`);
      }
      setTimeout(() => setSubmitValue(''), 1500);

    // }
    // else {
    //   setSubmitStatus(false);
    //   setSubmitValue('User Canceled Action');

    //   setTimeout(() => {
    //     setSubmitValue('');
    //   }, 1500);
    // }

  }


  const toggleOnClick = () => {
    setShow(!show);

    // if (viewTask )
  }

  let taskHandlerProps = {
    show: show,
    tasks: tasks,
    taskEdit: taskEdit,
    taskToEdit: taskToEdit, 
    viewTask: viewTask,
    taskToView: taskToView,
    setTaskToView: setTaskToView,
    updateViewTask: updateViewTask,
    addTask: addTask,
    removeTask: removeTask,
    toggleReminder: toggleReminder,
    setShow: setShow,
    checkSameEntry: checkSameEntry,
    setAddedTask: handleTaskAdded,
    editTask: editTask,
    updateTask: updateTask,
    doneEditTask: doneEditTask
  }

  let taskListProps = {
    user: user,
    tasks: tasks,
    showProfile: showProfile,
    setShowProfile: setShowProfile,
    updateViewTask: updateViewTask,
    editTask: editTask,
    onToggle: toggleReminder,
    onRemove: removeTask,
    updateTask: updateTask,
  }

  let taskTableProps = {
    tasks: tasks,
    updateViewTask: updateViewTask,
    editTask: editTask,
    onToggle: toggleReminder,
    onRemove: removeTask,
    updateTask: updateTask
  }

  return (
    <>
      <div className='test-container'>
      <Header onClick={() => setShow(!show)} showAddTask={show} setShowAddTask={setShow} layout={layout} setLayout={setLayout} setShowProfile={setShowProfile} showProfile={showProfile} {...props} />
      {show ? (
        <div className='parent-container-center'>
            {/* <span className={submitStatus ? "task-success" : "task-error"} style={submitValue !== '' ? { padding: '8px', margin: '0px 0px 10px 0px', boxShadow: submitStatus ? 'rgba(81, 255, 0, 0.16) 0px 1px 4px, rgba(81, 255, 0, 0.16) 0px 0px 0px 3px' : 'rgba(255, 8, 0, 0.16) 0px 1px 4px, rgba(255, 8, 0, 0.16) 0px 0px 0px 3px' } : {}}>{submitValue}</span> */}
            <TaskHandlerForm {...taskHandlerProps}/>
        </div>

      ) : (showProfile) ? (
        <div className='parent-container-center'>
          <Profile user={user} updateUser={updateUser}/>
        </div>
      ) : (

        // <div className='parent-container' style={{ placeContent: layout !== 'grid' ? 'normal' : 'center'}}>
        <div className='parent-container' style={{ placeContent: layout !== 'grid' && 'normal'}}>

        <div className="layout-button">
          {!show && (
            // <div className="header-left-container">
            <div
              className="btn-group btn-group-sm"
              style={{ borderRadius: '9px' }}
              role="group"
            >

              <button type="button" className="btn btn-light" disabled={layout === 'grid'}
                style={{
                  padding: '2.5px 13px',
                  borderBottomLeftRadius: '8px',
                  borderTopLeftRadius: '8px',
                  border: '1.5px solid black',
                  borderRight: '0.5px solid black'
                }}
                onClick={() => setLayout("grid")}>
                <CiGrid41
                  className="header-left-icon"
                  // style={true ? {
                  // 	backgroundColor: layout === "grid" && "#f6f6f6",
                  // 	color: layout === "grid" && "#000",
                  // 	borderColor: layout === "grid" && "#000",
                  // } : {}}
                />
              </button>
                    {/* <div style={{ height: '32px', margin: '0 8px', border: '1.26px solid #000', verticalAlign: 'middle' }}></div> */}
              <button type="button" className="btn btn-light" disabled={layout === 'list'}
                style={{
                  padding: '2.5px 13px',
                  borderBottomRightRadius: '8px',
                  borderTopRightRadius: '8px',
                  border: '1.5px solid black',
                  borderLeft: '0.5px solid black'
                }}
                onClick={() => setLayout("list")}
                >
                <CiBoxList
                  className="header-left-icon"
                  // style={{
                    // backgroundColor: layout === "list" && "#f6f6f6",
                    // color: layout === "list" && "#000",
                    // borderColor: layout === "list" && "#000",
                  // }}
                />
              </button>
            </div>
          )}
        </div>
        {/* <> */}
          {(tasks && tasks.length > 0) ? (
              layout === 'grid' ? (
                <div className='main-container'>
                  <TaskList  {...taskListProps}/>
                </div>
            ) : (

                <div className='main-container-list'>
                  <TaskTable {...taskTableProps}/>
                </div>
            )
          ) : (
              <p className="task-container task-container-center">
                {" "}
                'Nothing to Show Here'
              </p>
          )}
          {/* </> */}
          </div>

      )}
        {/*<Routes>
          <Route path="/" exact element={<RouteTest show={show} addTask={addTask} tasks={tasks} removeTask={removeTask} toggleReminder={toggleReminder} setShow={setShow} checkSameEntry={checkSameEntry} />} />
          <Route path="/" exact element={(props) => {
            <>
              {show && <AddTask onAdd={addTask}/>}
              {tasks.length > 0 ? (<Tasks tasks={tasks} onRemove={removeTask} onToggle={toggleReminder}/>) : ('Nothing to Show Here')}
            </>
          }}/>
          <Route path="/about" element={<About />} />
        </Routes>*/}
      <Footer {...props} />
      </div>
    </>
  );
}

export default Task;
