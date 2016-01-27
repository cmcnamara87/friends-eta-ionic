(function () {

    'use strict';
    angular
        .module('friendsEta')
        .controller('LoginSuccessController', LoginSuccessController);

    /* @ngInject */
    function LoginSuccessController(ngFB, ENV, $state, $http, friendsService) {
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

                    // fix up pictures
                    user.picture = user.picture.data.url;

                    // save the user
                    return loginUser(user);
                })
                .then(friendsService.updateFriendsFromFacebook)
                .then(goToDash);
        }

        function getProfile() {
            return ngFB.api({
                path: '/me', params: {
                    fields: 'email,name,picture'
                }
            });
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
