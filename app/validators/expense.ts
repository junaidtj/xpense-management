import vine from '@vinejs/vine'
// import { title } from 'process'

export const createExpenseValidator = vine.compile(
    vine.object({
        title: vine.string().minLength(4),
        amount: vine.number().positive(),
        transactionDate: vine.date(),
        categoryId: vine.number(),
    })
)