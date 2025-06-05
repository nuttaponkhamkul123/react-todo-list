function Task(props) {
  const onTaskTextChanges = (event) => {
    const text = event.currentTarget.textContent;
    // console.log('sdasdasdasd' , )
     props.onTaskTextChanges(text , props.index);
    console.log('props' ,)
  }
    return (
    <>
    <div className="task-card">

      text : <span contentEditable="true" onInput={onTaskTextChanges}>{ props.text }</span>
    </div>
    </>
  )
}
export default Task;