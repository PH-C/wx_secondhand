'use strict';

module.exports = app => {
   // upload
   app.post('/api/upload', 'upload.create')
   app.post('/api/uploads', 'upload.multiple')
   app.delete('/api/upload/:id', 'upload.destroy')
   app.put('/api/upload/:id', 'upload.update')
   app.post('/api/upload/:id', 'upload.update')
   app.put('/api/upload/:id/extra', 'upload.extra')
   app.get('/api/upload/:id', 'upload.show')
   app.get('/api/upload', 'upload.index')
   app.delete('/api/upload', 'upload.removes')
};

