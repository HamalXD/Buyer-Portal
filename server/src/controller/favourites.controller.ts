import { Favourite } from "../models/Favourite";

export const getFavourites = async (req: any, res: any, next: any) => {
  try {
    const userId = req.user.id;

    const favourites = await Favourite.find({
      user: userId,
    }).populate("property");

    res.json(favourites);
  } catch (error) {
    next(error);
  }
};

export const addFavourite = async (req: any, res: any, next: any) => {
  try {
    const propertyId = req.params.id;
    const userId = req.user.id;

    const exists = await Favourite.findOne({
      user: userId,
      property: propertyId,
    });

    if (exists) {
      return res.status(400).json({
        message: "Already favourited",
      });
    }

    await Favourite.create({
      user: userId,
      property: propertyId,
    });

    res.json({
      message: "Added to favourites",
    });
  } catch (error) {
    next(error);
  }
};

export const removeFavourite = async (req: any, res: any, next: any) => {
  try {
    const propertyId = req.params.id;
    const userId = req.user.id;

    await Favourite.findOneAndDelete({
      user: userId,
      property: propertyId,
    });

    res.json({
      message: "Removed from favourites",
    });
  } catch (error) {
    next(error);
  }
};
