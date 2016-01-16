(function () {

    'use strict';
    angular
        .module('friendsEta')
        .factory('friendsService', friendsService);

    /* @ngInject */
    function friendsService($http, ngFB, ENV, $q) {
        var service = {
            updateFriendsFromFacebook: updateFriendsFromFacebook
        };

        return service;

        ////////////////

        function updateFriendsFromFacebook() {
            console.log('Friend Service: Updating from Facebook');
            if(!localStorage.fbAccessToken || !localStorage.userId) {
                return $q.reject('No access tokens or user id stored');
            }
            return getFriendsUsingApp()
                .then(saveFriends);
        }

        function getFriendsUsingApp() {
            return ngFB.api({
                path: '/me/friends'
            });
        }

        function saveFriends(friendsData) {
            console.log('Should save friends', friendsData);
            var friends = _.map(friendsData.data, function (fbFriend) {
                return {
                    fb_id: fbFriend.id
                };
            });
            // post friends to server
            var userId = window.localStorage['userId'];
            return $http.post(ENV.apiEndpoint + 'users/' + userId + '/friends', friends);
        }


    }

})
();
