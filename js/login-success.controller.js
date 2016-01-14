(function () {

    'use strict';
    angular
        .module('friendsEta')
        .controller('LoginSuccessController', LoginSuccessController);

    /* @ngInject */
    function LoginSuccessController(ngFB, ENV, $state, $http) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.title = 'LoginSuccess';

        activate();

        ////////////////

        function activate() {
            // get user profile
            getProfile()
                .then(function (user) {
                    // fix up user id
                    user.fb_id = user.id;
                    delete user.id;

                    // save the user
                    return loginUser(user);
                })
                .then(getFriendsUsingApp)
                .then(saveFriends)
                .then(goToDash);
        }

        function getProfile() {
            return ngFB.api({
                path: '/me', params: {
                    fields: 'email,name'
                }
            });
        }

        function getFriendsUsingApp() {
            return ngFB.api({
                path: '/me/friends'
            });
        }
        function saveFriends(friendsData) {
            console.log('Should save friends', friendsData);
            var friends = _.map(friendsData.data, function(fbFriend) {
                return {
                    fb_id: fbFriend.id
                };
            });
            // post friends to server
            var userId = window.localStorage['userId'];
            return $http.post(ENV.apiEndpoint + 'users/'+ userId + '/friends', friends);
        }

        function loginUser(user) {
            // creates user, or gets existing user
            return $http.post(ENV.apiEndpoint + 'users', user).then(function (response) {
                window.localStorage['userId'] = response.data.id;
                return response.data;
            });
        }

        function goToDash() {
            setTimeout(function() {
                $state.go('tab.dash');
            }, 1000);
        }
    }

})();
