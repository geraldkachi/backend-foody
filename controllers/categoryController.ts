import {Request, Response} from 'express'
const Category = require('../models/Category')
// import CategorySchema from '../models/Category'

module.exports = {
    createCategory: async (req: Request, res: Response) => {
        const newCategory = new Category(req.body);

        try {
            await newCategory.save()
            res.status(201).json({ status: true, messaging: 'Category created successfully' });
        } catch (error: any) {
            res.status(500).json({ status: false, messaging: error.message });
        }
    },
    getAllCategories: async (req: Request, res: Response) => {
        try {
            const categories = await Category.find({ title: { $ne: 'More' } }, { __v: 0 })

            res.status(200).json(categories);
        } catch (error: any) {
            res.status(500).json({ status: false, messaging: error.message });
        }
    },

    getRandomCategory: async (req: Request, res: Response) => {
        try {
            let categories = await Category.aggregate([
                { $match: { value: { $ne: 'more' } } },
                { $sample: { size: 4 } }
            ])

            const moreCategory = await Category.findOne({ value: { $ne: 'more' } }, { __v: 0 })
            if (moreCategory) {
                categories.push(moreCategory)
            }
        } catch (error: any) {
            res.status(500).json({ status: false, messaging: error.message });
        }
    }
}