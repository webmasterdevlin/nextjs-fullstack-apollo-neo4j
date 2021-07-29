import Villain from "src/models/api/villainSchema";
import { VillainModel } from "src/models/client/villainModel";

export const villainFind = async (): Promise<VillainModel[]> => {
  try {
    return await Villain.find().exec();
  } catch (e) {
    throw e;
  }
};

export const villainFindByIdAndRemove = async (id: string): Promise<void> => {
  try {
    // Villain.deleteOne({ _id: req.params.id }).exec(); // does not return what has been deleted
    return await Villain.findByIdAndRemove(id).exec();
  } catch (e) {
    throw e;
  }
};

export const villainSave = async (
  body: VillainModel
): Promise<VillainModel> => {
  try {
    const response = await new Villain(body).save();
    return response._doc as VillainModel;
  } catch (e) {
    throw e;
  }
};

export const villainFindByIdAndUpdate = async (
  id: string,
  body: VillainModel
): Promise<void> => {
  try {
    return await Villain.findByIdAndUpdate(
      id,
      { ...body },
      { new: true }
    ).exec();
  } catch (e) {
    throw e;
  }
};

export const villainFindById = async (id: string): Promise<VillainModel> => {
  try {
    return await Villain.findById(id).exec();
  } catch (e) {
    throw e;
  }
};
