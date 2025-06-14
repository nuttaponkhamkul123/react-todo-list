
// import styles from './style.module.css';
import './style.css';



function Task(props) {


  // const onTaskTextChanges = (e, i) => {
  //   const valueAtIndex = mockData[i];
  //   valueAtIndex.text = e;
  //   setMockData(mockData);

  // }
  const onTaskTextChanges = (event) => {
    console.log('HELLO WORLD')
    // const text = event.currentTarget.textContent;
    // props.onTaskTextChanges(text, props.index);
    // console.log('props',)
  }
  return (
    <>
      <div className="task-card">

        text : <span contentEditable="true" onInput={onTaskTextChanges} className="task-input">{props.text}</span>
      </div>
    </>
  )
}
export default Task;