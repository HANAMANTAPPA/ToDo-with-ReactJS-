import "./App";
import cheked from "./Icons/cheked.png";
import circle_plus from "./Icons/circle_plus.svg";
import double_tick from "./Icons/double_tick.png";
import circle_xmark from "./Icons/circle_xmark.svg";
import React, { useEffect, useState } from "react";
// import React from "react";

function TodolistComponent() {
  let newtasksAPI = [];
  const [inputval, setInputval] = useState("");
  const [tasks, setTasks] = useState([
    {
      title: "Problem of the day by Coding Ninjas-studio",
      id: 1,
      completed: true,
    },
    { title: "FrontEnd Skill test-2", id: 2, completed: false },
    {
      title: "Start React Video lectures and Projects",
      id: 3,
      completed: false,
    },
    { title: "Daily DSA concepts", id: 4, completed: true },
    { title: "FrontEnd revision", id: 5, completed: false },
  ]);

  //  fetch function and get the data
  // useEffect(() => {
  const fetchTasks = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const data = await response.json();
      // console.log(data.slice(0, 10));
      newtasksAPI = data.slice(0, 10);
      setTasks(newtasksAPI);
    } catch (err) {
      console.error("Error exists as ----  ", err);
    }
  };
  // }, []);

  // set all tasks from API
  useEffect(() => {
    fetchTasks();
  }, []);

  function toggleTask(taskid) {
    let newtasks = [...tasks];
    for (let i of newtasks) {
      if (taskid === i.id) {
        i.completed = !i.completed;
        break;
      }
    }
    //     PUT method for modifying data
    // try {
    // const response = await fetch(
    //   "https://jsonplaceholder.typicode.com/todos" ,{
    //     method: "PUT", // or 'POST'
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //   });
    //   const data = await response.json();
    //   // console.log(data.slice(0, 10));
    //   newtasksAPI = data.slice(0, 10);
    //   setTasks(newtasksAPI);
    // } catch (err) {
    //   console.error("Error in putting the data ----  ", err);
    // }
    setTasks(newtasks);
    return;
  }

  function deleteTask(taskid) {
    console.log(taskid);
    const newtasks = tasks.filter(function (item) {
      return item.id !== taskid;
    });
    // console.log(tasks);

    //     DELETE method for deleting
    // try {
    // const response = await fetch(
    //   "https://jsonplaceholder.typicode.com/todos${id}`" ,{
    //     method: "DELETE",
    //   });
    //   const data = await response.json();
    //   // console.log(data.slice(0, 10));
    //   newtasksAPI = data.slice(0, 10);
    //   setTasks(newtasksAPI);
    // } catch (err) {
    //   console.error("Error in Deleting the data ----  ", err);
    // }
    setTasks(newtasks);
  }

  function addtask(text) {
    if (text.length !== 0) {
      const newtasks = [
        ...tasks,
        { title: text, id: Date.now(), ompleted: false },
      ];

      //     POST method for adding
      // try {
      // const response = await fetch(
      //   "https://jsonplaceholder.typicode.com/todos" ,{
      //     method: "POST", // or 'PUT'
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(data),
      //   });
      //   const data = await response.json();
      //   // console.log(data.slice(0, 10));
      //   newtasksAPI = data.slice(0, 10);
      //   setTasks(newtasksAPI);
      // } catch (err) {
      //   console.error("Errorin Posting the data ----  ", err);
      // }

      setTasks(newtasks);
    } else {
      console.log("input task can't be empty :  --  ");
    }
    return;
  }

  function handleAddbutton() {
    const text = inputval;
    console.log(text);
    if (text.length !== 0) {
      addtask(text);
      document.getElementById("inputbox").value = "";
      setInputval("");
    } else {
      console.log("input task can't be empty :  --  ");
    }
  }

  function handlekeyevent(e) {
    let text = e.target.value;
    if (e.key === "Enter") {
      addtask(text);
      e.target.value = "";
      setInputval("");
    } else {
      setInputval(text);
    }
  }

  let listitems = tasks.map((eachtask) => (
    <li key={eachtask.id} className="list">
      <input
        type="checkbox"
        className="idofTask"
        checked={eachtask.completed ? true : false}
        onChange={() => eachtask.completed}
      />
      <label
        htmlFor={eachtask.id}
        id={eachtask.id}
        onClick={() => toggleTask(eachtask.id)}
      >
        {eachtask.title}
      </label>
      <img
        src={circle_xmark}
        alt="XMark"
        className="XMark"
        id={eachtask.id}
        onClick={() => deleteTask(eachtask.id)}
      />
    </li>
  ));

  return (
    <div className="mainContainer">
      <div className="inputContainer">
        <img alt="icon" className="listImg" src={cheked}></img>
        <input
          type="text"
          className="textIP"
          placeholder="Enter ur task"
          // onChange={(e) => setInputval(e.target.value)}
          onKeyUp={handlekeyevent}
          //   style={{fontSize: 1.2rem}}

          id="inputbox"
        />
        <img
          alt="addbutton"
          src={circle_plus}
          className="addBtn"
          onClick={handleAddbutton}
        />
      </div>
      <div className="helpingText">
        <span>
          <img
            src={double_tick}
            alt="double-tick"
            className="doublecheckicon"
          />{" "}
          Complete all taks
        </span>
        <span className="clearBTN">Clear completed</span>
      </div>
      <hr />
      <ul>
        {/* <li>
          <input type="checkbox" className="idofTask" checked />
          <label className="label" for="idofTask">
            First List
          </label>
          <img src={circle_xmark} alt="XMark" className="XMark" />
        </li> */}
        {listitems}
      </ul>
      <hr />
      <div className="helpingText">
        <span>
          {" "}
          Total tasks <span className="counter">{tasks.length}</span>
        </span>
        <span>
          <span style={{ color: "black" }}> All </span> <span>Uncompleted</span>{" "}
          <span>completed</span>{" "}
        </span>
      </div>
    </div>
  );
}

export default TodolistComponent;

// <div className="mainContainer">
//     <div className="inputContainer">
//         <img src="Icons/cheked.png" alt="checked list" className="listImg">
//         <input type="text" className="textIP" placeholder="Enter ur task" style="font-size: 1.2rem;">
//         <img src="Icons/circle_plus.svg" alt="checked list" className="addBtn">
//     </div>
//     <div className="helping-text">
//          <span><img src="Icons/double_tick.png" alt="double-tick" className="doublecheckicon"> Complete all taks</span>
//          <span className="clearBTN">Clear completed</span>
//     </div>
//     <hr></hr>
//     <ul className="list">
//          <li>
//             <input type="checkbox"  className="idofTask"  checked >
//             <label for="idofTask">First List</label>
//             <img src="circle_xmark.svg" alt="XMark"  calss="XMark">
//         </li>
//     </ul>
//     <hr>
//     <div   className="helping-text">
//         <span> Total tasks <span className="counter">0</span></span>
//         <span><span  style="color: black;"> All </span> <span>Uncompleted</span> <span>completed</span> </span>
//     </div>

//                         </div>
