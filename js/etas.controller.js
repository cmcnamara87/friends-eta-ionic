(function () {

    'use strict';
    angular
        .module('friendsEta')
        .controller('EtasController', EtasController);

    /* @ngInject */
    function EtasController($http, ENV, $ionicPlatform, $scope,
                            $state,
                            $q,
                            $cordovaGeolocation) {
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
                    text: "Checkout this app, FriendsETA. It let's you know how many minutes far away your Facebook friends are. Search for FriendsETA in the App store."
                    //url: "http://friendseta.com/app"
                };
                window.socialmessage.send(message);
            }
        }

        function loadData(userId) {
            getFriends()
                .then(getLocation)
                .then(sendLocation.bind(null, userId))
                .then(getEtas.bind(null, userId))
                .then(finished);
        }

        function getLocation() {
            vm.state = 'Getting Your Location';
            var posOptions = {timeout: 10000, enableHighAccuracy: false};
            return $cordovaGeolocation
                .getCurrentPosition(posOptions);
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

        function finished() {
            vm.state = 'Friends';
        }

        function getFriends() {
            vm.state = 'Getting Friends';
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