import React, { useContext, useState } from "react";
import { UserContext } from "../context/user.context";
import axios from "../config/axios"


const Home = () => {
  const { user } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState(null);
 

  function createProject(e) {
    e.preventDefault();
    console.log({projectName});
    axios.post("/projects/create", {name: projectName}).then((res) => {
      console.log(res);
      setIsModalOpen(false);
    }).catch((err) => console.log(err));
    
  }

  return (
    <main className="p-4">
      <div className="projects">
        <button
          className="project p-4 border border-slate-600 rounded-md"
          onClick={() => setIsModalOpen(true)}
        > 
          Create Chat Room
          <i class="ri-chat-new-fill ml-2"></i>
        </button>
        
        
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-xl mb-4">Create New Chat</h2>
            <form
              onSubmit={createProject}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Room Name
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="mr-2 px-4 py-2 bg-gray-300 rounded-md"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;
