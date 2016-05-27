module.exports = function(app) {
  require('./controllers/reviews_controller')(app);
  require('./directives/review_form_directive')(app);
};
