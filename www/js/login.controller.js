(function () {

    'use strict';
    angular
        .module('friendsEta')
        .controller('LoginController', LoginController);

    /* @ngInject */
    function LoginController(ngFB, $state, $http, ENV) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.title = 'Login';
        vm.login = login;

        activate();

        ////////////////

        function activate() {
            getLoginStatus();
        }

        function getLoginStatus() {
            return ngFB.getLoginStatus().then(function (status) {
                vm.status = status;
                return status;
            });
        }

        function loginDemo() {
            // register with the server
            debugger;
            loginUser({}).then(goToDash);
        }

        function goToDash() {
            return $state.go('tab.dash');
        }

        function loginUser(user) {
            // creates user, or gets existing user
            return $http.post(ENV.apiEndpoint + 'users', user).then(function (response) {
                window.localStorage['userId'] = response.data.id;
                return response.data;
            });
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

        function login() {
            // get friends
            console.log('logging into facebook');

            ngFB.login({scope: 'email,user_friends,public_profile'}).then(
                function (response) {
                    if (response.status === 'connected') {
                        console.log('Facebook login succeeded');

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

                    } else {
                        alert('Facebook login failed');
                    }
                });
        }


    }

})();
