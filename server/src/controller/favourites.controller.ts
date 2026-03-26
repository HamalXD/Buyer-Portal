import { Favourite } from "../models/Favourite";

export const getFavourites = async (req: any, res: any, next: any) => {
  try {
    const favourites = await Favourite.find({
      user: req.userId,
    }).populate("property");

    res.json(favourites);
  } catch (error) {
    next(error);
  }
};

export const addFavourite = async (req: any, res: any, next: any) => {
  try {
    const propertyId = req.param.id;

    const exists = await Favourite.findOne({
      user: req.userId,
      property: propertyId,
    });

    if (!exists) {
      return res.status(400).json({ message: "Already favourited" });
    }

    await Favourite.create({
      user: req.userId,
      property: propertyId,
    });

    res.json({ message: "Added to favourites" });
  } catch (error) {
    next(error);
  }
};

export const removeFavourite = async (req: any, res: any, next: any) => {
  try {
    const propertyId = req.params.id;

    await Favourite.findOneAndDelete({
      user: req.userId,
      property: propertyId,
    });

    res.json({ message: "Removed from favourites" });
  } catch (error) {
    next(error);
  }
};
