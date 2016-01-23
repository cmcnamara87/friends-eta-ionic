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
        vm.loginWithDemo = loginWithDemo;

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

        function loginWithDemo() {
            // register with the server
            window.localStorage['userId'] = 1;
            $state.go('tab.dash');
        }



        function login() {
            // get friends
            console.log('logging into facebook');

            ngFB.login({scope: 'email,user_friends,public_profile'}).then(
                function (response) {
                    if (response.status === 'connected') {
                        console.log('Facebook login succeeded');
                        $state.go('login-success');
                    } else {
                        alert('Facebook login failed');
                    }
                });
        }


    }

})();
