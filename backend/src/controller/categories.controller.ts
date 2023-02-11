import { Request, Response } from "express";
import Categories from "../models/categories";

export const createCategory = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.body.category) {
    return res
      .status(400)
      .json({ msg: "Some fields are invalid." });
  }

  const newCategory = new Categories(req.body);
  await newCategory.save();
  return res.status(201).json(newCategory);
};

export const getCategories = async (req: Request, res: Response) => {
  const categories = await Categories.find();
  res.json(categories);
};

export const getCategoryByOwner = async (req: Request, res: Response) => {
  const categories = await Categories.find({owner: req.params.owner});
  return res.json(categories);
};

export const deleteCategoryById = async (req: Request, res: Response) => {
  const { categoryId } = req.params;

  await Categories.findByIdAndDelete(categoryId);

  res.status(200).json();
};
