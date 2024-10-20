import Task from './Task';

const Tasks = ({ tasks, onRemove, onToggle, editTask, updateViewTask, show, doneViewTask, viewTask}) => {
	return (
		<div className='task-container'>
			{tasks.map((task) => <Task key={task.id} task={task} onDelete={onRemove} onToggle={onToggle} editTask={editTask} updateViewTask={updateViewTask} show={show} doneViewTask={doneViewTask} viewTask={viewTask}/>)}
		</div>
	);
};

export default Tasks;