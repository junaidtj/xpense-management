import { HttpContext } from "@adonisjs/core/http";
import { createCateogoryValidator } from "../validators/category.js";
import Category from "../models/category.js";

export default class CategoriesController {
    async create ({view}: HttpContext) {
        return view.render ('pages/categories/create')
    }
    async store ({request , response}: HttpContext) {
        const { name , budget } = await request.validateUsing(createCateogoryValidator)
        await Category.create ({ name , budget })
        response .redirect('/')
    }
}