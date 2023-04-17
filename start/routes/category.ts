import Route from '@ioc:Adonis/Core/Route'

// Route Categories middleware admin will be removed in the future
// For now only admin can create, edit, delete categories
Route.group(() => {
  Route.get('/', 'CategoriesController.index')
  Route.get('/create', 'CategoriesController.create').middleware('admin')
  Route.post('/create', 'CategoriesController.store').middleware('admin')
  Route.get('/:id', 'CategoriesController.show')
  Route.get('/:id/edit', 'CategoriesController.edit').middleware('admin')
  Route.put('/:id/edit', 'CategoriesController.update').middleware('admin')
  Route.delete('/:id/delete', 'CategoriesController.destroy').middleware('admin')
}).prefix('/categories')
