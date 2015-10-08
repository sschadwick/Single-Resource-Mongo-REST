module.exports = function(app) {
  app.filter('sentencify', function() {
    return function(input) {
      var punctuation = (input[-1] === '.' || input[-1] === '?' || input[-1] === '!') ? '' : '.';

      var out = input[0].toUpperCase() + input.slice(1, input.length) + punctuation;
      return out;
    };
  });
};
