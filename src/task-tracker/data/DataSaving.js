
//  const saveFile = async () => {
//     // if (!user) {
//     //   alert('You must be logged in to save tasks.');
//     //   return;
//     // }

//     console.log(user);

//     const fileName = `${user.name}_tasks.json`;
//     const fileContent = JSON.stringify(tasks, null, 2);

//     try {
//       const options = {
//         suggestedName: fileName,
//         types: [
//           {
//             description: 'JSON Files',
//             accept: { 'application/json': ['.json'] },
//           },
//         ],
//       };

//       const handle = await window.showSaveFilePicker(options);
//       const writableStream = await handle.createWritable();
//       await writableStream.write(fileContent);
//       await writableStream.close();

//       alert('Tasks saved successfully!');
//     } catch (error) {
//       console.error('Failed to save tasks to file:', error);
//     }
//   };

//     const loadFromFile = async () => {
//     try {
//       const [fileHandle] = await window.showOpenFilePicker({
//         types: [
//           {
//             description: 'JSON Files',
//             accept: { 'application/json': ['.json'] },
//           },
//         ],
//       });

//       const file = await fileHandle.getFile();
//       const fileContent = await file.text();
//       const loadedTasks = JSON.parse(fileContent);

//       if (Array.isArray(loadedTasks)) {
//         setTasks(loadedTasks);
//         alert('Tasks loaded successfully!');
//       } else {
//         alert('Invalid file format.');
//       }
//     } catch (error) {
//       console.error('Failed to load tasks from file:', error);
//     }
//   };
