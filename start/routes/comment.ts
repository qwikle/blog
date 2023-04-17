import Route from '@ioc:Adonis/Core/Route'

// Route Comments
Route.group(() => {
  Route.get('/create', 'CommentsController.create')
  Route.post('/create', 'CommentsController.store')
  Route.get('/:id', 'CommentsController.show')
  Route.get('/:id/edit', 'CommentsController.edit')
  Route.put('/:id/edit', 'CommentsController.update')
  Route.delete('/:id/delete', 'CommentsController.destroy')
})
  .prefix('/comments')
  .middleware('auth')
