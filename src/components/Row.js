import { RxCross2 } from "react-icons/rx";
import { GoPencil } from "react-icons/go";

const Row = ({ task, index }) => {
	console.log("task in row", task)
	return (
		<tr style={{ textAlign: 'start'}}>
			<th style={{ padding: '10px 5px' }} scope="row">{index + 1}</th>
			<td style={{ padding: '10px 5px' }}>{task.title}</td>
			<td style={{ padding: '10px 5px' }}>{task.text}</td>
			<td style={{ padding: '10px 5px' }}>{task.reminder ? 'Yes' : 'No'}</td>
			<td style={{ padding: '10px 5px' }}>{task.priority}</td>
			<td style={{ padding: '10px 5px' }}>{task.from !== '' ? task.from : '-'}</td>
			<td style={{ padding: '10px 5px' }}>{task.to !== '' ? task.to : '-'}</td>
			<td style={{ padding: '10px 5px' }}>{task.email}</td>
			<td style={{ padding: '10px 5px' }}>
                  <GoPencil className="table-action-icon" style={{ marginRight: '4px', padding: '3px'}} onClick={() => {}}/>
                  <RxCross2 className="table-action-icon" style={{ marginLeft: '4px' }} data-bs-toggle="modal" data-bs-target="#customModal" onClick={() => {
                    // setEventValue("delete");
                    // setEventCard(card);
                    }} />
			</td>
			{/* <td>{task.address}</td>
			<td>{task.gender}</td> */}
		</tr>
	);
};

export default Row;