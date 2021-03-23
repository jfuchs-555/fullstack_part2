import React from 'react'
import ReactDOM from 'react-dom'

const Course = (props) => {
    console.log(props.name)
    return (
      <div>
        <Header name={props.name} />
        <Content parts={props.parts} />
        <Total parts={props.parts} />
      </div>
    )
  
  }
  
  const Header = ({ name}) => {
    return (
      <h1>{name}</h1>
    )
  }
  
  const Content = ({parts}) => {
    console.log('this isparts', parts)
    return (
      <div>
        {parts.map((parts,i) => <Part key={i} name={parts.name} exercises={parts.exercises}/>
        )}
      </div>
  
   
    )
  }
  
  
  const Part = ({name,exercises}) => {
    return (
      <p >
        {name} {exercises}
      </p>    
    )
  }
  
  const Total = ({ parts }) => {
    
  
    var totalExeercises= parts.reduce(function (accumulator, part) {
      return accumulator + part.exercises;
    }, 0);
  
  
    return(
      <div style={{fontWeight: "bold"}}>
        Total Number of Exercises: {totalExeercises}
      </div>
       ) 
     }
  
      

export default Course