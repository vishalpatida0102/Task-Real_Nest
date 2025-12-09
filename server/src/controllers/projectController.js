import Project from "../models/Project.js";

export async function getProjects(_req, res, next) {
  try {
    const items = await Project.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    next(err);
  }
}

export async function createProject(req, res, next) {
  try {
    const { title, description, image } = req.body;
    if (!title || !description || !image) {
      return res.status(400).json({ message: "Missing fields" });
    }
    const item = await Project.create({ title, description, image });
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
}

