(function () {

    'use strict';
    angular
        .module('friendsEta')
        .controller('EtasController', EtasController);

    /* @ngInject */
    function EtasController($http, ENV, $ionicPlatform, $scope,
                            $state,
                            $q) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.title = 'Etas';
        vm.doRefresh = doRefresh;
        vm.state = 'LOADING';
        vm.invite = invite;

        var userId = 1;

        activate();

        ////////

        function activate() {
            if (!window.localStorage['userId']) {
                $state.go('intro');
                return
            }
            userId = window.localStorage['userId'];
            $ionicPlatform.ready(function () {
                loadData(userId);
            });
        }

        function invite() {
            if(window.socialmessage) {
                var message = {
                    text: "Checkout this app, FriendsETA. It let's you know how far away your friends are.",
                    url: "http://friendseta.com/app"
                };
                window.socialmessage.send(message);
            }
        }

        function loadData(userId) {
            getFriends()
                .then(getLocation)
                .then(sendLocation.bind(this, userId))
                .then(getEtas.bind(this, userId));
        }

        function getLocation() {
            vm.state = 'Getting Your Location';
            var deferred = $q.defer();

            navigator.geolocation.getCurrentPosition(onSuccess, onError);
            function onSuccess(position) {
                deferred.resolve(position);
            }

            function onError(error) {
                alert('code: ' + error.code + '\n' +
                'message: ' + error.message + '\n');
                deferred.reject(error);
            }
            return deferred.promise;
        }


        function sendLocation(userId, position) {
            vm.state = 'Sending Your Location';
            var lat = position.coords.latitude;
            var long = position.coords.longitude;
            console.log('Sending location', lat, long);
            return $http.post(ENV.apiEndpoint + 'locations', {'user_id': userId, 'lat': lat, 'long': long});
        }

        function getEtas(userId) {
            vm.state = 'Calculating ETAs';
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
            vm.state = 'Gettinh Friends';
            console.log('Getting friends');
            return $http.get(ENV.apiEndpoint + 'users/'+ userId + '/friends').then(function (response) {
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