import Project from "../models/projectModel.js";
import Workspace from "../models/workspaceModel.js";

export const createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      status,
      startDate,
      dueDate,
      tags,
      members,
      workspaceId,
    } = req.body;

    const newProject = await Project.create({
      title,
      description,
      status,
      startDate,
      dueDate,
      tags,
      members,
      workspace: workspaceId,
    });

    await Workspace.findByIdAndUpdate(workspaceId, {
      $push: { projects: newProject._id },
    });

    res
      .status(201)
      .json({ status: true, message: "Project created successfully." });
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const getProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id)
      .populate({
        path: "tasks",
        options: { sort: { _id: -1 } },
      })
      .populate("members");

    res.status(200).json({
      status: true,
      project,
    });
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};
