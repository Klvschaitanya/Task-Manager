import React, { useState } from 'react';

const Nav = () => {
  const [modelInput, setModelInput] = useState('');
  const [modelInputDes, setModelInputDES] = useState('');
  const [openn,setOpenn] = useState(false)

  const modelInputFunction = (e) => {
    setModelInput(e.target.value);
  };

  const modelInputFunctionDES = (e) => {
    setModelInputDES(e.target.value);
  };



  const DataTransfer = async () => {
    if (!modelInput.trim() || !modelInputDes.trim()) {
      alert('Both Title and Description are required!');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Title: modelInput,
          Description: modelInputDes,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add task');
      }

     
      setModelInput('');
      setModelInputDES('');
      
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding task. Please try again.');
    }
  };

  return (
    <div>
      <h1 style={{textAlign:"center"}}>Task Manager</h1>

      <nav className="navbar navbar-expand-lg navbar-light" style={{ display: 'flex', justifyContent: 'center', }}>
       

        <div className="modeldiv">
          <button type="button" className="btn btn-primary" onClick={()=>{setOpenn(true)}}>
            Add task
          </button>

          </div>
      </nav>

    

      {/* <h2>Preview</h2>
      <p>Title: {modelInput}</p>
      <p>Description: {modelInputDes}</p> */}


      {openn && <div style={{display:'flex',flexDirection:'column',alignItems:'center', minHeight: '35vh',border:'1px solid'}}>
        <div style={{display:'flex',flexDirection:'column',alignItems:'center'}} >
                <label> Title :
                <input
                    type="text"
                    value={modelInput}
                    onChange={modelInputFunction}
                    className="form-control w-100 m-2"
                    placeholder="Enter the Title"
                  />
                </label>
                 <label> Description : <textarea
                    value={modelInputDes}
                    onChange={modelInputFunctionDES}
                    className="form-control w-100 m-2"
                    placeholder="Enter the description"
                  /></label>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', width:'20%' }}>
                  <button type="button" className="btn btn-secondary"  onClick={()=>setOpenn(false)}>
                    Close
                  </button>
                  <button type="button" className="btn btn-primary" onClick={DataTransfer}>
                    Submit
                  </button>
                </div></div>}
    </div>
  );
};

export default Nav;
