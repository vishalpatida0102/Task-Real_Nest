import Subscriber from "../models/Subscriber.js";

export async function getSubscribers(_req, res, next) {
  try {
    const items = await Subscriber.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    next(err);
  }
}

export async function createSubscriber(req, res, next) {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Missing email" });
    }
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return res.json(existing);
    }
    const item = await Subscriber.create({ email });
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
}

