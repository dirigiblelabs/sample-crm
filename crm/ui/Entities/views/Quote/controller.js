angular.module('page', ['ngAnimate', 'ui.bootstrap']);
angular.module('page')
.factory('httpRequestInterceptor', function () {
	var csrfToken = null;
	return {
		request: function (config) {
			config.headers['X-Requested-With'] = 'Fetch';
			config.headers['X-CSRF-Token'] = csrfToken ? csrfToken : 'Fetch';
			return config;
		},
		response: function(response) {
			var token = response.headers()['x-csrf-token'];
			if (token) {
				csrfToken = token;
			}
			return response;
		}
	};
})
.config(['$httpProvider', function($httpProvider) {
	$httpProvider.interceptors.push('httpRequestInterceptor');
}])
.factory('$messageHub', [function(){
	var messageHub = new FramesMessageHub();

	var message = function(evtName, data){
		messageHub.post({data: data}, 'crm.Entities.Quote.' + evtName);
	};

	var on = function(topic, callback){
		messageHub.subscribe(callback, topic);
	};

	return {
		message: message,
		on: on,
		onEntityRefresh: function(callback) {
			on('crm.Entities.Quote.refresh', callback);
		},
		onAccountModified: function(callback) {
			on('crm.Entities.Account.modified', callback);
		},
		onProductModified: function(callback) {
			on('crm.Entities.Product.modified', callback);
		},
		onUoMModified: function(callback) {
			on('crm.Entities.UoM.modified', callback);
		},
		messageEntityModified: function() {
			message('modified');
		}
	};
}])
.controller('PageController', function ($scope, $http, $messageHub) {

	var api = '../../../../../../../../services/v4/js/crm/api/Entities/Quote.js';
	var accountOptionsApi = '../../../../../../../../services/v4/js/crm/api/Entities/Account.js';
	var productOptionsApi = '../../../../../../../../services/v4/js/crm/api/Entities/Product.js';
	var uomOptionsApi = '../../../../../../../../services/v4/js/crm/api/Configurations/UoM.js';

	$scope.accountOptions = [];

	$scope.productOptions = [];

	$scope.uomOptions = [];

	$scope.dateOptions = {
		startingDay: 1
	};
	$scope.dateFormats = ['yyyy/MM/dd', 'dd-MMMM-yyyy', 'dd.MM.yyyy', 'shortDate'];
	$scope.dateFormat = $scope.dateFormats[0];

	function accountOptionsLoad() {
		$http.get(accountOptionsApi)
		.success(function(data) {
			$scope.accountOptions = data;
		});
	}
	accountOptionsLoad();

	function productOptionsLoad() {
		$http.get(productOptionsApi)
		.success(function(data) {
			$scope.productOptions = data;
		});
	}
	productOptionsLoad();

	function uomOptionsLoad() {
		$http.get(uomOptionsApi)
		.success(function(data) {
			$scope.uomOptions = data;
		});
	}
	uomOptionsLoad();

	$scope.dataPage = 1;
	$scope.dataCount = 0;
	$scope.dataOffset = 0;
	$scope.dataLimit = 10;

	$scope.getPages = function() {
		return new Array($scope.dataPages);
	};

	$scope.nextPage = function() {
		if ($scope.dataPage < $scope.dataPages) {
			$scope.loadPage($scope.dataPage + 1);
		}
	};

	$scope.previousPage = function() {
		if ($scope.dataPage > 1) {
			$scope.loadPage($scope.dataPage - 1);
		}
	};

	$scope.loadPage = function(pageNumber) {
		$scope.dataPage = pageNumber;
		$http.get(api + '/count')
		.success(function(data) {
			$scope.dataCount = data;
			$scope.dataPages = Math.ceil($scope.dataCount / $scope.dataLimit);
			$http.get(api + '?$offset=' + ((pageNumber - 1) * $scope.dataLimit) + '&$limit=' + $scope.dataLimit)
			.success(function(data) {
				$scope.data = data;
			});
		});
	};
	$scope.loadPage($scope.dataPage);

	$scope.openNewDialog = function() {
		$scope.actionType = 'new';
		$scope.entity = {};
		toggleEntityModal();
	};

	$scope.openEditDialog = function(entity) {
		$scope.actionType = 'update';
		$scope.entity = entity;
		toggleEntityModal();
	};

	$scope.openDeleteDialog = function(entity) {
		$scope.actionType = 'delete';
		$scope.entity = entity;
		toggleEntityModal();
	};

	$scope.close = function() {
		$scope.loadPage($scope.dataPage);
		toggleEntityModal();
	};

	$scope.create = function() {
		$http.post(api, JSON.stringify($scope.entity))
		.success(function(data) {
			$scope.loadPage($scope.dataPage);
			toggleEntityModal();
			$messageHub.messageEntityModified();
		}).error(function(data) {
			alert(JSON.stringify(data));
		});
			
	};

	$scope.update = function() {
		$http.put(api + '/' + $scope.entity.Id, JSON.stringify($scope.entity))

		.success(function(data) {
			$scope.loadPage($scope.dataPage);
			toggleEntityModal();
			$messageHub.messageEntityModified();
		}).error(function(data) {
			alert(JSON.stringify(data));
		})
	};

	$scope.delete = function() {
		$http.delete(api + '/' + $scope.entity.Id)
		.success(function(data) {
			$scope.loadPage($scope.dataPage);
			toggleEntityModal();
			$messageHub.messageEntityModified();
		}).error(function(data) {
			alert(JSON.stringify(data));
		});
	};

	$scope.updateCalculatedProperties = function() {
		var entity = $scope.entity;
	};

	$scope.accountOptionValue = function(optionKey) {
		for (var i = 0 ; i < $scope.accountOptions.length; i ++) {
			if ($scope.accountOptions[i].Id === optionKey) {
				return $scope.accountOptions[i].Name;
			}
		}
		return null;
	};
	$scope.productOptionValue = function(optionKey) {
		for (var i = 0 ; i < $scope.productOptions.length; i ++) {
			if ($scope.productOptions[i].Id === optionKey) {
				return $scope.productOptions[i].Name;
			}
		}
		return null;
	};
	$scope.uomOptionValue = function(optionKey) {
		for (var i = 0 ; i < $scope.uomOptions.length; i ++) {
			if ($scope.uomOptions[i].Id === optionKey) {
				return $scope.uomOptions[i].Name;
			}
		}
		return null;
	};

	$messageHub.onEntityRefresh($scope.loadPage($scope.dataPage));
	$messageHub.onAccountModified(accountOptionsLoad);
	$messageHub.onProductModified(productOptionsLoad);
	$messageHub.onUoMModified(uomOptionsLoad);

	function toggleEntityModal() {
		$('#entityModal').modal('toggle');
	}
});
