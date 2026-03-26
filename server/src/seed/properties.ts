import mongoose from "mongoose";
import dotenv from "dotenv";
import { Property } from "../models/Property";

dotenv.config();

const properties = [
  { title: "Modern Apartment", price: 120000, location: "Kathmandu, Nepal" },
  { title: "Luxury Villa", price: 350000, location: "Pokhara, Nepal" },
  { title: "Cozy Studio", price: 75000, location: "Lalitpur, Nepal" },
  { title: "Beach House", price: 500000, location: "Chitwan, Nepal" },
  { title: "Penthouse", price: 450000, location: "Kathmandu, Nepal" },
  { title: "Urban Loft", price: 150000, location: "Bhaktapur, Nepal" },
  { title: "Suburban House", price: 200000, location: "Dhulikhel, Nepal" },
  { title: "Country Cottage", price: 90000, location: "Nuwakot, Nepal" },
];

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI!);
  await Property.deleteMany({});
  await Property.insertMany(properties);
  console.log("Seeded properties!");
  process.exit(0);
};

seed();
