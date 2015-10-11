(function() {
	'use strict';

	angular.module('cloudbrain.publishers').
	directive('publisherCard', ['Publisher', publisherCard]);

	function publisherCard(Publisher) {

		function link(scope) {
			scope.device = {
				id: '',
				name: 'Muse',
				type: 'muse'
			};

			function publish() {
				Publisher.publish(scope.device);
			}
      scope.publish = publish;

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
