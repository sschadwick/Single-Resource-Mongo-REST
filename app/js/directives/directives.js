module.exports = function(app) {
  require('./dummy_directive')(app);
  require('./bobsled_directive')(app);
};
