import Hero from "src/models/api/heroSchema";
import { HeroModel } from "src/models/client/heroModel";

export const heroFind = async (): Promise<HeroModel[]> => {
  try {
    return await Hero.find().exec();
  } catch (e) {
    throw e;
  }
};

export const heroFindByIdAndRemove = async (id: string): Promise<void> => {
  try {
    // Hero.deleteOne({ _id: req.params.id }).exec(); // does not return what has been deleted
    return await Hero.findByIdAndRemove(id).exec();
  } catch (e) {
    throw e;
  }
};

export const heroSave = async (body: HeroModel): Promise<HeroModel> => {
  try {
    const response = await new Hero(body).save();
    return response._doc as HeroModel;
  } catch (e) {
    throw e;
  }
};

export const heroFindByIdAndUpdate = async (
  id: string,
  body: HeroModel
): Promise<void> => {
  try {
    return await Hero.findByIdAndUpdate(id, { ...body }, { new: true }).exec();
  } catch (e) {
    throw e;
  }
};

export const heroFindById = async (id: string): Promise<HeroModel> => {
  try {
    return await Hero.findById(id).exec();
  } catch (e) {
    throw e;
  }
};
