import { useEffect, useState } from 'react';

import { RxCross2 } from "react-icons/rx";

const AddTask = ({ onAdd, show, setShow, checkSameEntry, setAddedTask, taskEdit, taskToEdit, doneEditTask, updateTask, viewTask, taskToView }) => {
	const [title, setTitle] = useState('');
	const [text, setText] = useState('');
	const [reminder, setReminder] = useState(false);
	const [priority, setPriority] = useState('');
	const [from, setFrom] = useState('');
	const [to, setTo] = useState('');
	const [submitStatus, setSubmitStatus] = useState(false);
	const [submitValue, setSubmitValue] = useState('');
	const [task, setTask] = useState();
	// const [borderPriority, setBorderPriority] = useState('');

	// let borderColorProp = taskToEdit ? taskToEdit.priority : '';
	// console.log(borderColorProp)

	useEffect(() => {
		// console.log("value of to:", to.length)
		if (taskEdit) {
			if (taskToEdit.from.length <= 10 && taskToEdit.from.length !== 0) {
				setFrom(taskToEdit.from.concat("T00:00"));
			}
			else {
				setFrom(taskToEdit.from);
			}
			
			if (taskToEdit.to.length <= 10 && taskToEdit.to.length !== 0) {
				setTo(taskToEdit.to.concat("T00:00"));
			}
			else {
				setTo(taskToEdit.to);
			}

			setTask(taskToEdit);
			setTitle(taskToEdit.title);
			setText(taskToEdit.text);
			setPriority(taskToEdit.priority);
			setReminder(taskToEdit.reminder);
		}
		else if (viewTask) {
			setTask(taskToView);
			setTitle(taskToView.title);
			setText(taskToView.text);
			setPriority(taskToView.priority);
			setReminder(taskToView.reminder);
			setFrom(taskToView.from);
			setTo(taskToView.to);
		}
		else {
			setTitle('');
			setText('');
			setPriority('');
			setReminder(false);
			setFrom('');
			setTo('');
		}
		// if (!taskToEdit) {
		// 	setShow(false);
		// }
	}, [])

	const submitHandler = (e) => {
		e.preventDefault();

		if (!text || !title) {
			setSubmitValue('Missing Fields');
			setSubmitStatus(false);

			setTimeout(() => {
				setSubmitValue('');
			}, 1500)
			
			return;
		}

		if (checkSameEntry(title).find((doesExist) => doesExist ? true : false)) {
			console.log(checkSameEntry(title).find((doesExist) => doesExist ? true : false))
			// alert(`Duplicate Title => "${title}"`);
			setSubmitStatus(false);
			setSubmitValue('Task Already Exists');
		}
		else {

			if (priority.toLowerCase() === "urgent" || priority.toLowerCase() === "critical") {
				setReminder(true);
			}

			onAdd({ title, text, priority, reminder, from, to });
			setAddedTask();
			// updateTasks();
			setTitle('');
			setText('');
			setReminder(false);
			setFrom('');
			setTo('');

			setSubmitStatus(true);
			setSubmitValue('Task Saved');

			setTimeout(() => setShow(!show), 1200);
		}

	}

	const changeBorderAlt = (priority) => {
		if (priority !== '' && priority !== undefined) {
		let value = [];
		// console.log(priority);
		switch (priority.toLowerCase()) {

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
			value = ['rgba(0, 0, 0, 0.24)', 'rgba(0, 0, 0, 0.24)'];
			break;
		}
		return value;
		}
		else {
			return [''];
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
			return [''];
		// return ['rgba(0, 0, 0, 0.24)', 'rgba(0, 0, 0, 0.24)'];
		}
	}

	// const updateBorderColor = (e) => {
	// 	setBorderPriority(e.target.value);
	// }

	const editTaskHandler = (e) => {
		e.preventDefault();

		if (!text || !title || (taskToEdit.from !== '' && !from) || (taskToEdit.to !== '' && !to)) {
			// alert('please insert the missing fields');
			setSubmitValue('Missing Fields');
			setSubmitStatus(false);

			setTimeout(() => {
				setSubmitValue('');
			}, 1500)
			
			return;
		}

		if (priority.toLowerCase() === "high" || priority.toLowerCase() === "urgent" || priority.toLowerCase() === "critical") {
			setReminder(true);
		}
		const tasksFromStorage = JSON.parse(localStorage.getItem('tasks'));

		const userEmail = JSON.parse(localStorage.getItem('login')).email;

		const userTaskList = tasksFromStorage.filter((item) => item.email === userEmail);

		// console.log(userTaskList);

		const taskToUpdate = userTaskList.find((item) => item.id === task.id);

		// console.log(taskToUpdate);

		const updatedTask = { ...taskToUpdate, title: title, text: text, priority: priority, reminder: reminder, from: from, to: to};

		const filteredList = tasksFromStorage.filter((item) => item.id !== taskToUpdate.id);

		const userFilteredList = filteredList.filter((item) => item.email === userEmail);

		console.log(userFilteredList);

		// const newFilteredList = .filter((task))

		console.log('Filtered Task in edit handler: ', filteredList);

		if (userFilteredList.find((task) => task.title === updatedTask.title)) {
			setSubmitValue('Task Already Exists');
			setSubmitStatus(false);

			setTimeout(() => {
				setSubmitValue('');
			}, 1500)
			
			return;
		}

		const updatedTaskList = tasksFromStorage.map((item) => {
			return item.id === task.id ? updatedTask : item;
		})

		localStorage.setItem('tasks', JSON.stringify(updatedTaskList));
		updateTask();


		setTitle('');
		setText('');
		setPriority('');
		setReminder(false);
		setFrom('');
		setTo('');

		setSubmitStatus(true);
		setSubmitValue('Task Edited');

		setTimeout(() => {
			doneEditTask();
			// setShow(!show);

		}, 1200);

	}

	return (
		<>
			{viewTask ? (

				// <div className="action-container" style={{ borderColor: changeBorder(taskToView)[0], boxShadow: `${changeBorder(taskToView)[1]} 0px 2px 8px 0.5px`}}>
				<div className="action-container" style={changeBorder(taskToView)[0] !== '' ? { borderTopColor: changeBorder(taskToView)[0], borderTopStyle: 'solid'} : {}}>
					<RxCross2 className="cross-icon-absolute" onClick={() => setShow(!show)} />
					<span id='task-header'>{"View Task"}</span>

					<form className="add-form">

						<div className="form-control adjust-spacing">
							<label>Task Title:</label>
							<p className="form-view-text adjust-spacing">{title}</p>
						</div>
						<div className="form-control adjust-spacing">
							<label>{"Task Description: "}</label>
							<p className="form-view-text adjust-spacing">{text}</p>
						</div>
						<div className="form-control form-control-check top-margin" style={{ height: '50px', marginBottom: '0px' }}>
							<label>Reminder</label>
							<p className="form-view-text" style={{ flex: 1, textAlign: 'end' }}>{reminder ? 'Yes' : 'No'}</p>
						</div>

						<div className="form-control form-control-check top-margin" style={{ height: '50px', marginBottom: '0px' }}> 
							<label style={{ flex: 5 }}>Priority</label>
							<p className="form-view-text" style={{ flex: 1, textAlign: 'end' }}>{priority !== '' && priority !== undefined ? priority : '-' }</p>
						</div>
						<div className="form-control form-control-date">
							<label style={{ width: '50%' }}>From</label>
							<p className="form-view-text" style={{ marginBottom: 0, width: '50%', textAlign: 'end'}}>{from !== '' ? from : '-'}</p>
							<label style={{ width: '50%' }}>To</label>
							<p className="form-view-text" style={{ marginBottom: 0, width: '50%', textAlign: 'end'}}>{to !== '' ? to : '-'}</p>
						</div>

					</form>
					</div>
			) : (
				// <div className="action-container" style={taskEdit ? { borderColor: changeBorderAlt(priority)[0], boxShadow: `${changeBorderAlt(priority)[1]} 0px 2px 8px 0.5px`} : {}}>
				<div className="action-container" style={(taskEdit && changeBorderAlt(priority)[0] !== '') ? { borderTopColor: changeBorderAlt(priority)[0], borderTopStyle: 'solid'} : {}}>
					<RxCross2 className="cross-icon-absolute" onClick={() => setShow(!show)} />
					<span id='task-header'>{taskEdit ? "Edit Task" : "Add Task"}</span>
					{/* {console.log(priority, taskEdit && changeBorder(priority)[0] !== '')} */}

					<form className="add-form" onSubmit={taskEdit ? editTaskHandler : submitHandler }>


						<div className="form-control">
							<label>Task Title: </label>
							<input type="text" placeholder="Add Title Here" value={title} onChange={(e) => setTitle(e.target.value)}/>
						</div>
						<div className="form-control">
							<label>{"Task Description: "}</label>
							<textarea placeholder="Add Descriptions here" rows={5} value={text} onChange={(e) => setText(e.target.value)} />
						</div>
						<div className="form-control form-control-check">
							<label style={{ flex: 5 }}>Priority</label>
							<select className="form-control-drop" value={priority} onChange={(e) => {
								setPriority(e.target.value);
								// if (taskToEdit.priority !== '' && taskToEdit.priority !== undefined && taskToEdit.priority !== null) {
								// if (taskEdit) {
								// 	taskToEdit.priority = e.target.value;
								// }
								// else {
								// 	taskToEdit.priority = taskToEdit.priority;
								// }
								// if (taskEdit) {
								// 	borderColorProp = e.target.value;
								// }
								if (e.target.value.toLowerCase() === 'high' || e.target.value.toLowerCase() === 'critical' || e.target.value.toLowerCase() === 'urgent') {
									setReminder(true);
								}
								else {
									setReminder(false);
								}
							}
							}>
								<option value="">None</option>
								<option value="Low">Low</option>
								<option value="Medium">Medium</option>
								<option value="High">High</option>
								<option value="Critical">Critical</option>
								<option value="Urgent">Urgent</option>
							</select>
						</div>
						<div className="form-control form-control-check">
							<label>Reminder</label>
							<input type="checkbox" value={reminder} checked={reminder} onChange={(e) => setReminder(e.currentTarget.checked)}/>
						</div>
						<div className="form-control form-control-date">
							<label>From</label>
							<input type="datetime-local" value={from} onChange={(e) => setFrom(e.target.value)}/>
							<label>To</label>
							<input type="datetime-local" value={to} onChange={(e) => setTo(e.target.value)}/>
						</div>

						<span className={submitStatus ? "task-success" : "task-error"} style={submitValue !== '' ? { padding: '5px' } : {}}>{submitValue}</span>

						<input type="submit" value="Save Task" className="add-task-btn btn-block" style={submitValue !== '' ? { marginTop: '8px' } : {}}/>
					</form>
				</div>
			)}

		</>

	);
};

export default AddTask;