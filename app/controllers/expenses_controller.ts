import { HttpContext } from "@adonisjs/core/http";
import Category from "../models/category.js";
import { createExpenseValidator } from "#validators/expense";
import { DateTime } from "luxon";
import Expense from "#models/expense";

export default class ExpensesController {
    async index ({view}:HttpContext) {
        const categories = await Category.all()
        const expenses = await Expense.query().preload('category')
        return view.render('pages/expenses/list',{
            categories,
            expenses,
        })
    }

    async create ({view}: HttpContext) {
        const categories = await Category.all()
        const expenses = await Expense.all()
        return view.render ('pages/expenses/create', { 
            categories,
            expenses,
         })
    }
    async store ({request, response}: HttpContext) {
       const payload = await request.validateUsing(createExpenseValidator)
       const category = await Category.findOrFail(payload.categoryId)

       await category.related('expenses').create({
        title: payload.title,
        amount: payload.amount,
        transactionDate: DateTime.fromJSDate(payload.transactionDate),

       })

       response.redirect('/')
    }
}