import React, { useEffect, useState } from 'react';

const Home = () => {
  const [data, recData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState({
    Title: '',
    Description: '',
    id: ''
  });
 const [isDeleteModalOpen,setIsDeleteModalOpen] = useState(false);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/tasks');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseData = await response.json();
        recData(responseData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [data]);

  const openModal = (task) => {
   
    setCurrentTask({
      Title: task.Title,
      Description:task.Description,
      id:task._id
    });
    setIsModalOpen(true);
  };


  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentTask({
      Title: '',
      Description: '',
     id:'',
    });
  };

  const handleEdit = (e) => {
    const { name, value } = e.target; 
    setCurrentTask({ ...currentTask, [name]: value });
  }

  const saveChanges = async () => {
    try {
      const UpdateData = await fetch('http://localhost:5000/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Id: currentTask.id,
          Title: currentTask.Title,
          Description: currentTask.Description,
        }),
      });
  
      if (!UpdateData.ok) {
        throw new Error('Failed to update task');
      }
  
      closeModal();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };
  


  const openDeleteModal = (task) => {
   
    setCurrentTask({
      Title: task.Title,
      id:task._id
    });
    setIsDeleteModalOpen(true);
  };

  const handleDelete =async()=>{
    try {
   const response = await fetch('http://localhost:5000/delete',{
        method:"DELETE",
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify({
          Id:currentTask.id
        })
      })
      if(!response.ok){
        throw new Error ('Failed to delete task');
      }
      setIsDeleteModalOpen(false)
    } catch (error) {
      console.error('Error at deleting Task',error)
    }

  }

  return (
    <center>

      <div>
        <h1>Task List</h1>
        <div>
          <table style={{ backgroundColor: 'lightslategray', width: '50%', borderCollapse: 'collapse' }} >
            <thead><tr>

              <th>Title</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
            </thead>

            {data.length > 0 ?(
              data.map((item) => (
                <tbody style={{ backgroundColor:"lightblue" ,border:"1px solid" }} >
                  <tr key={item.id}>
                    <td style={{ backgroundColor: "initial", border: "1px,solid", textAlign: 'center' }}>{item.Title}</td>

                    <td style={{ backgroundColor: "linen", border: "1px,solid", textAlign: 'center' }}>{item.Description}</td>
                    <td style={{ padding: '2px', display: 'flex', justifyContent: 'space-evenly' }}>
                      <button style={{backgroundColor:"tomato"}} onClick={()=>openDeleteModal(item)}>Delete</button>
                      <input style={{backgroundColor:"mintcream"}} type='button' value='Edit'  onClick={() => openModal(item)}  />
                      </td>
                      
                      
                  </tr>

                </tbody>








              ))
        ) : (
              <td>No data records</td>
            )}</table>

         
         </div>








          {isModalOpen && (
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'white',
              padding: '20px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              zIndex: 1000,
              
            }}
          >
            <h2>Edit Task</h2>
            <label>
              Title:
              <input
                type="text"
                name="Title"
                value={currentTask.Title || ""}
                onChange={handleEdit}
                style={{ margin: '5px 0', width: '100%' }}
              />
            </label>
            <label>
              Description:
              <input
                type="text"
                name="Description"
                value={currentTask.Description  || ""}
                onChange={handleEdit}
                style={{ margin: '5px 0', width: '100%' }}
              />
            </label>
            <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={saveChanges} style={{ backgroundColor: 'green', color: 'white' }}>
                Save
              </button>
              <button onClick={closeModal} style={{ backgroundColor: 'red', color: 'white' }}>
                Cancel
              </button>
            </div>
          </div>
        )}






{isDeleteModalOpen && (
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'white',
              padding: '20px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              zIndex: 1000,
            }}
          >
            <h2>Are you sure you want to delete this task?</h2>
            <h1>{currentTask.Title}</h1>
            <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={handleDelete} style={{ backgroundColor: 'red', color: 'white' }}>
                Yes, Delete
              </button>
              <button onClick={() => setIsDeleteModalOpen(false)} style={{ backgroundColor: 'gray', color: 'white' }}>
                Cancel
              </button>
            </div>
          </div>
        )}


      </div>
    </center>
  );
};


export default Home;
