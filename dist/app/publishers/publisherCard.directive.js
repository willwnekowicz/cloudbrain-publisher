(function() {
  'use strict';

  angular.module('cloudbrain.publishers').
  directive('publisherCard', [publisherCard]);

  function publisherCard() {

    function link(scope) {
      scope.device = {
        id: '',
        name: 'Muse',
        type: 'muse'
      };
    }

    return {
      scope: {},
      restrict: 'E',
      replace: true,
      templateUrl: '../dist/app/publishers/publisherCard.html',
      link: link
    };
  }
})();
