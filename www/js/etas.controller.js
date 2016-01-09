(function () {

    'use strict';
    angular
        .module('friendsEta')
        .controller('EtasController', EtasController);

    /* @ngInject */
    function EtasController($http, ENV, $ionicPlatform, $scope, $state) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.title = 'Etas';
        vm.doRefresh = doRefresh;

        var userId = 1;

        activate();

        ////////

        function activate() {
            if (window.localStorage['userId']) {
                userId = window.localStorage['userId'];
            }
            else {
                $state.go('tab.account');
            }

            $ionicPlatform.ready(function () {
                loadData(userId);
            });


        }

        function loadData(userId) {
            navigator.geolocation.getCurrentPosition(onSuccess, onError);

            function onSuccess(position) {
                var firstLat = position.coords.latitude;
                var firstLong = position.coords.longitude;

                getFriends()
                    .then(sendLocation.bind(this, userId, firstLat, firstLong))
                    .then(getEtas.bind(this, userId))
            }

            // onError Callback receives a PositionError object
            //
            function onError(error) {
                alert('code: ' + error.code + '\n' +
                'message: ' + error.message + '\n');
            }
        }

        function sendLocation(userId, lat, long) {
            console.log('Sending location', lat, long);
            return $http.post(ENV.apiEndpoint + 'locations', {'user_id': userId, 'lat': lat, 'long': long});
        }

        function getEtas(userId) {
            console.log('Getting user ETAs for user', userId);
            return $http.get(ENV.apiEndpoint + 'users/'+ userId + '/etas').then(function(response){
                vm.etas = response.data;
                console.log('ETAs', vm.etas);
                vm.friends = _.map(vm.friends, function(friend){
                    friend.eta = _.find(vm.etas, {user_id: friend.id});
                    return friend;
                });
                $scope.$broadcast('scroll.refreshComplete');
            });
        }

        function getFriends() {
            console.log('Getting friends');
            return $http.get(ENV.apiEndpoint + 'users').then(function (response) {
                vm.friends = response.data;
                console.log('Friends', vm.friends);
                return vm.friends;
            });
        }


        function doRefresh() {
            userId = window.localStorage['userId'];
            console.log('Refresh locations');
            loadData(userId);
        }

    }

})();