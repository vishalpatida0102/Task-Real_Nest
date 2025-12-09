import Contact from "../models/Contact.js";

export async function getContacts(_req, res, next) {
  try {
    const items = await Contact.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    next(err);
  }
}

export async function createContact(req, res, next) {
  try {
    const { fullName, email, phone, city } = req.body;
    if (!fullName || !email || !phone || !city) {
      return res.status(400).json({ message: "Missing fields" });
    }
    const item = await Contact.create({ fullName, email, phone, city });
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
}

