import mongoose from 'mongoose';
import projectModel from '../models/project.model.js';

export const createProject = async ({
    name, userId
    
}) => {
    if (!name){
        throw new Error('Name is required');

    }
    if (!userId){
        throw new Error('User is required');
    }
    const project = await projectModel.create({
        name, users: [userId]
    });
    return project;
}

export const getAllProjectByUserId = async ({userId}) => {
    if (!userId){
        throw new Error('User is required');
    }
    const allUserProjects = await projectModel.find({
        users: userId
    })
    return allUserProjects;
}

export const addUsersToProject = async ({projectId, users, userId}) => {
    if (!projectId) {
        throw new Error('Project ID is required');
    }
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new Error('Invalid Project ID');
    }
    if (!users) {
        throw new Error('Users is required');
    }
    if (!Array.isArray(users) || users.some(user => !mongoose.Types.ObjectId.isValid(user))) {
        throw new Error('Invalid User ID in users array');

    }
    if (!userId){
        throw new Error('User is required');
    }
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error('Invalid User ID');
    }
    const project = await projectModel.findOne({
        _id: projectId,users: userId
    })
    if (!project){
        throw new Error('User not belong to this project');
    }
     const updatedProject = await projectModel.findOneAndUpdate({
        _id: projectId
    },{
        $addToSet: {
            users: {
                $each: users
            }
        }
    },{
        new: true
    })
    return updatedProject;
}

export const getProjectById = async ({ projectId}) => {
    if (!projectId) {
        throw new Error('Project ID is required');
    }   
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new Error('Invalid Project ID');
    }   
    const project = await projectModel.findOne({
        _id: projectId
        }).populate('users')
        return project;
    }