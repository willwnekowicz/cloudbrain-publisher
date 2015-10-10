(function() {
  'use strict';

  angular.module('cloudbrain.publishers').
  directive('publisherCard', [publisherCard]);

  function publisherCard() {

    function link() {

    }

    return {
      scope: {},
      restrict: 'E',
      template: '<h1>Publisher Card</h1>',
      link: link
    };
  }
})();
