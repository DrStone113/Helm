import Workspace from "../models/workspaceModel.js";
import User from "../models/userModel.js";

export const createWorkspace = async (req, res) => {
  try {
    const { name, description, color } = req.body;
    const { userId } = req.user;

    const newWorkspace = await Workspace.create({
      name,
      description,
      color,
      owner: userId,
      members: [userId],
    });

    await User.findByIdAndUpdate(userId, {
      $push: { workspaces: newWorkspace._id },
    });

    res
      .status(201)
      .json({ status: true, message: "Workspace created successfully." });
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const deleteWorkspace = async (req, res) => {
  try {
    const { id } = req.params;
    const workspace = await Workspace.findById(id);

    await User.updateMany(
      { _id: { $in: workspace.members } },
      { $pull: { workspaces: id } }
    );

    await Workspace.findByIdAndDelete(id);

    res
      .status(200)
      .json({ status: true, message: "Workspace deleted successfully." });
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const getUserWorkspaces = async (req, res) => {
  try {
    const { userId } = req.user;

    const user = await User.findById(userId).populate({
      path: "workspaces",
      options: { sort: { _id: -1 } },
    });

    res.status(200).json({
      status: true,
      workspaces: user.workspaces,
    });
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const getWorkspace = async (req, res) => {
  try {
    const { id } = req.params;
    const workspace = await Workspace.findById(id).populate({
      path: "projects",
      options: { sort: { _id: -1 } },
    });

    res.status(200).json({
      status: true,
      workspace,
    });
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};
