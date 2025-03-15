import React, { useState,useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Modal, Button } from "antd";
import axios from '../config/axios'

const Project = () => {
  const location = useLocation();
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState([]);
  const [users, setUsers] = useState([])

  const handleUserClick = (id) => {
   
    setSelectedUserId(prevSelectedUserId => {
      const newSelectedUserId = new Set(prevSelectedUserId);
      if (newSelectedUserId.has(id)) {
        newSelectedUserId.delete(id);
      } else {
        newSelectedUserId.add(id);
      }
      console.log(Array.from(newSelectedUserId))
      return newSelectedUserId;
    });
  };
  
  useEffect(()=>{
    axios.get('/users/all').then(res=>setUsers(res.data.users)).catch(err=>{
        console.log(err)
    })


  },[]
    )

  return (
    <main className="h-screen w-screen flex">
      <section className="left relative flex flex-col h-full min-w-80 bg-red-300">
        <header className="flex justify-end p-2 px-4 w-full bg-blue-400 gap-40">
          <button
            className="p-2 bg-red-200 rounded flex"
            onClick={() => setIsModalOpen(true)}
          >
            <i className="ri-user-add-fill mr-1"></i>
            <p>Add Collaborator</p>
          </button>
          <button
            onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
            className="p-2 bg-red-200 rounded"
          >
            <i className="ri-group-fill"></i>
          </button>
        </header>
        <div className="conversion-area flex-grow flex flex-col">
          <div className="message-box p-1 flex flex-col gap-2 ">
            <div className="message max-w-64 flex flex-col p-2 bg-slate-50 w-fit rounded-md shadow-lg">
              <small className="opacity-65 text-xs">example@gmail.com</small>
              <p className="text-sm">lorem ipsum dolor sit amet.</p>
            </div>
            <div className="ml-auto message max-w-64 flex flex-col p-2 bg-slate-50 w-fit rounded-md shadow-lg">
              <small className="opacity-65 text-xs">example@gmail.com</small>
              <p className="text-sm">lorem ipsum dolor sit amet.</p>
            </div>
          </div>
          <div className="inputField w-full flex mt-auto">
            <input
              className="p-3 px-9 border-none outline-none flex-grow"
              type="text"
              placeholder="Enter message..."
            />
            <button className="p-2 bg-red-400 bg-slate-950 text-white">
              <i className="ri-send-plane-fill"></i>
            </button>
          </div>
        </div>

        <div
          className={`sidePanel w-full h-full flex flex-col gap-2 bg-slate-300 absolute transition-transform duration-300 ${
            isSidePanelOpen ? "translate-x-0" : "-translate-x-full"
          } top-0 left-0`}
        >
          <header className="flex justify-end p-3 px-5 bg-slate-500">
            <button onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}>
              <i className="ri-close-fill"></i>
            </button>
          </header>
          <div className="users flex flex-col gap-2 ">
            <div className="user cursor-pointer hover:bg-slate-400 p-2 flex gap-2 items-center">
              <div className="aspect-square rounded-full w-fit h-fit flex items-center justify-center p-4 text-white bg-slate-600">
                <i className="ri-user-5-fill absolote"></i>
              </div>
              <h1 className="font-semibold text-lg">username</h1>
            </div>
          </div>
        </div>
      </section>

      <Modal
        title="Select User"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <div className="users-list flex flex-col gap-2 max-h-96 overflow-auto">
          {users.map((user) => (
            <div
              key={user.id} 
              className={`user cursor-pointer hover:bg-slate-400 ${Array.from(selectedUserId).indexOf(user._id)!=-1?'bg-slate-200':""} p-2 flex gap-2 items-center`}
              onClick={() => handleUserClick(user._id)}
            >
              <div className="aspect-square relative rounded-full w-fit h-fit flex items-center justify-center p-4 text-white bg-slate-600">
                <i className="ri-user-5-fill"></i>
              </div>
              <h1 className="font-semibold text-lg">{user.email}</h1>
            </div>
          ))}
        </div>
        <Button
          type="primary"
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
          onClick={() => setIsModalOpen(false)}
        >
          Add Collaborators
        </Button>
      </Modal>
    </main>
  );
};

export default Project;