import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'
import CategoryValidator from 'App/Validators/CategoryValidator'
export default class CategoriesController {
  public async index({ view }: HttpContextContract) {
    return view.render('categories/index')
  }

  public async create({ view }: HttpContextContract) {
    return view.render('categories/create')
  }

  public async store({ request, response }: HttpContextContract) {
    const { name } = await request.validate(CategoryValidator)
    try {
      await Category.create({
        name,
      })
      return response.redirect('/categories')
    } catch (error) {
      return response.redirect('/categories/create')
    }
  }

  public async show({ view, params }: HttpContextContract) {
    const category = await Category.findOrFail(params.id)
    await category.load('articles')
    return view.render('categories/show', { category })
  }

  public async edit({ view, params }: HttpContextContract) {
    const category = await Category.findOrFail(params.id)
    return view.render('categories/edit', { category })
  }

  public async update({ request, response, params }: HttpContextContract) {
    const { name } = request.all()
    const category = await Category.findOrFail(params.id)
    try {
      category.name = name
      await category.save()
      return response.redirect('/categories')
    } catch (error) {
      return response.redirect('/categories')
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    const category = await Category.findOrFail(params.id)
    try {
      await category.delete()
      return response.redirect('/categories')
    } catch (error) {
      return response.redirect('/categories')
    }
  }
}
