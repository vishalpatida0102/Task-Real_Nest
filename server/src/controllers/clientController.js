import Client from "../models/Client.js";

export async function getClients(_req, res, next) {
  try {
    const items = await Client.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    next(err);
  }
}

export async function createClient(req, res, next) {
  try {
    const { name, role, description, image } = req.body;
    if (!name || !role || !description || !image) {
      return res.status(400).json({ message: "Missing fields" });
    }
    const item = await Client.create({ name, role, description, image });
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
}

