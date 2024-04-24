import vine from '@vinejs/vine'

export const createCateogoryValidator = vine.compile (
    vine.object({
        name : vine.string().minLength(4),
        budget: vine.number().positive(),
    })
)