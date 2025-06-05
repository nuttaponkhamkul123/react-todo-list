// import './style.css'
import Task from './Task';
import CreateTaskBtn from './CreateTaskBtn';
import { useState } from 'react';
// import styles from './style.module.css';


function Content() {
  const [mockData, setMockData] = useState([]);
  const onTaskTextChanges = (e , i) => {
    console.log('E' , e)
    console.log('E' , i)
    const valueAtIndex = mockData[i];
    valueAtIndex.text = e;
    setMockData(mockData);
    console.log('mockData' , mockData)

  }
  const createTaskHandler = () => {
    console.log("CREATE TASK FROM PARENT")
    
    const newData = { 
        id : mockData.length + 1,
        text : 'test',
        done : false
    }
    setMockData([...mockData , newData])
    console.log('mockData ' , mockData)
  }
  return (
    <>
      {/* THIS IS CONTENT */}
      {mockData.map((data,index) => 
          <Task onTaskTextChanges={onTaskTextChanges} index={index} text={data.text} />
    
      )}
      <CreateTaskBtn onCreateTaskClick={createTaskHandler} />
    </>
  )
}

export default Content