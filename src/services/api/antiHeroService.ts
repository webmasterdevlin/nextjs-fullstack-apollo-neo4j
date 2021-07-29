import AntiHero from "src/models/api/antiHeroSchema";
import { AntiHeroModel } from "src/models/client/antiHeroModel";

export const antiHeroFind = async (): Promise<AntiHeroModel[]> => {
  try {
    return await AntiHero.find().exec();
  } catch (e) {
    throw e;
  }
};

export const antiHeroFindByIdAndRemove = async (id: string): Promise<void> => {
  try {
    // AntiHero.deleteOne({ _id: req.params.id }).exec(); // does not return what has been deleted
    return await AntiHero.findByIdAndRemove(id).exec();
  } catch (e) {
    throw e;
  }
};

export const antiHeroSave = async (
  body: AntiHeroModel
): Promise<AntiHeroModel> => {
  try {
    const response = await new AntiHero(body).save();
    return response._doc as AntiHeroModel;
  } catch (e) {
    throw e;
  }
};

export const antiHeroFindByIdAndUpdate = async (
  id: string,
  body: AntiHeroModel
): Promise<void> => {
  try {
    return await AntiHero.findByIdAndUpdate(
      id,
      { ...body },
      { new: true }
    ).exec();
  } catch (e) {
    throw e;
  }
};

export const antiHeroFindById = async (id: string): Promise<AntiHeroModel> => {
  try {
    return await AntiHero.findById(id).exec();
  } catch (e) {
    throw e;
  }
};
