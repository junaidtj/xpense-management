/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import ExpensesController from '#controllers/expenses_controller'
import SessionController from '#controllers/session_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import CategoriesController from '../app/controllers/categories_controller.js'
import emitter from '@adonisjs/core/services/emitter'
import db from '@adonisjs/lucid/services/db'

emitter.on('db:query' , db.prettyPrint)

router.get('/',[ExpensesController, 'index']).use(middleware.auth())

router.on('/login').render('pages/login')
router.post('/login', [SessionController, 'store'])

router.resource('categories', CategoriesController).use('*' , middleware.auth())
router.resource('expenses', ExpensesController).use('*' , middleware.auth())
// router.get('/categories/create', [CategoriesController, 'create'])
// router.post('categories', [CategoriesController, 'store'])