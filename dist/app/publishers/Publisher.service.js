(function(){
	'use strict';

	var ipc = require('ipc');

	angular.module('cloudbrain.publishers').
	service('Publisher', [Publisher]);

	function Publisher() {

		function publish(device) {
      ipc.send('publish-device', device);
		}

		return {
			publish: publish
		};
	}
})();
