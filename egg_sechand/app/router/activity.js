'use strict';

module.exports = app => {
  app.get('/api/activity', 'activity.list');
  // app.get('/api/activity/banner', 'activity.banner');
  app.post('/api/activity',app.jwt, 'activity.create');
  app.get('/api/activity/:id', 'activity.find');
 
  app.del('/api/activity/:id',app.jwt, 'activity.destroy');
  app.put('/api/activity/:id',app.jwt, 'activity.update');
  
};
