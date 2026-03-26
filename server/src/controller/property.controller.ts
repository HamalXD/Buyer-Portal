import { Property } from "../models/Property";

export const getProperties = async (req: any, res: any) => {
  try {
    const properties = await Property.find({});
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch properties" });
  }
};
