import AddTask from "./AddTask";
import Tasks from "./Tasks";

const TaskHandlerForm = (props) => {
  const addTaskProps = {
    show: props.show,
    setShow: props.setShow,
    onAdd: props.addTask,
    checkSameEntry: props.checkSameEntry,
    setAddedTask: props.setAddedTask,
    editTask: props.editTask,
    taskEdit: props.taskEdit,
    taskToEdit: props.taskToEdit,
    doneEditTask: props.doneEditTask,
    updateTask: props.updateTask,
    viewTask: props.viewTask,
    updateViewTask: props.updateViewTask,
    taskToView: props.taskToView,
    setTaskToView: props.setTaskToView,
  };

  const taskProps = {
    tasks: props.tasks ? props.tasks : [],
    onRemove: props.removeTask,
    onToggle: props.toggleReminder,
    editTask: props.editTask,
    updateViewTask: props.updateViewTask,
  };
  return (
    <>
      <AddTask {...addTaskProps} />
      {/* {
        !props.show &&
          (props.tasks && props.tasks.length > 0 ? (
            <Tasks {...taskProps} />
          ) : (
            <p className="task-container task-container-center">
              {" "}
              'Nothing to Show Here'
            </p>
          ))
        // {tasks.length > 0 ? (<Tasks tasks={tasks} onRemove={removeTask} onToggle={toggleReminder}/>) : ('Nothing to Show Here')}
      } */}
    </>
  );
};

export default TaskHandlerForm;
