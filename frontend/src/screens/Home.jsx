import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/user.context";
import axios from "../config/axios";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Input, Card, Typography, Space } from "antd";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import logo from '../assets/logo.jpg'; 

import '../screens/Home.css'

const { Title, Text } = Typography;

const Home = () => {
  useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  function createProject(e) {
    e.preventDefault();
    axios.post("/projects/create", { name: projectName })
      .then((res) => {
        setProjects([...projects, res.data.project]);
        setIsModalOpen(false);
        setProjectName('');
      })
      .catch((err) => {
        console.error("Error creating project:", err);
        alert("An error occurred while creating the project. Please try again.");
      });
  }

  useEffect(() => {
    axios.get("/projects/all")
      .then((res) => {
        setProjects(res.data.projects || []);
      })
      .catch((err) => {
        console.error("Error fetching projects:", err);
        alert("An error occurred while fetching projects. Please try again.");
      });
  }, []);

  return (
    <main className="home-container">
      <div className="text-center mb-4">
        <img src={logo} alt="QuantumTalk Logo" className=  "logo" />
        <Title level={2} style={{ color: '#ff6347' }}>Welcome to QuantumTalk</Title>
        <Text style={{ color: '#4682b4' }} className="block mb-4">Collaborate and manage your projects effortlessly</Text>
      </div>
      <div className="projects flex flex-wrap gap-3 justify-center">
        <Card
          className="project-card"
          hoverable
          onClick={() => setIsModalOpen(true)}
          style={{ width: 300, textAlign: 'center', border: '2px dashed #1890ff', backgroundColor: '#f0f8ff' }}
        >
          <PlusOutlined style={{ fontSize: '2rem', color: '#1890ff' }} />
          <Title level={4} style={{ color: '#ff6347' }}>Create New Project</Title>
        </Card>

        {projects.map((project, index) => (
          <Card
            key={project?._id}
            className="project-card"
            hoverable
            onClick={() => navigate(`/project`, { state: { project } })}
            style={{ width: 300, backgroundColor: '#f0f8ff' }}
          >
            <Title level={4} style={{ color: '#4682b4' }}>{project?.name}</Title>
            <Space>
              <UserOutlined />
              <Text style={{ color: '#4682b4' }}>{project?.users?.length} Collaborator</Text>
            </Space>
          </Card>
        ))}
      </div>

      <Modal
        title="Create New Project"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <form onSubmit={createProject}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Project Name
            </label>
            <Input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end">
            <Button
              type="default"
              className="mr-2"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
            >
              Create
            </Button>
          </div>
        </form>
      </Modal>
    </main>
  );
};

export default Home;