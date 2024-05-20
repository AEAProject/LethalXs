import { ObjectId } from "mongodb";

export type BaseCollectionObject = {
  _id?: ObjectId;
  createDate?: Date;
  updateDate?: Date;
};
