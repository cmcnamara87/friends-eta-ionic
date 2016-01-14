(function() {

'use strict';
angular
    .module('friendsEta')
    .controller('AccountsController', AccountsController);

/* @ngInject */
function AccountsController ($http, ENV, $state, ngFB, $ionicPlatform, autoupdate) {
    /* jshint validthis: true */
    var vm = this;

    vm.activate = activate;
    vm.title = 'Accounts';
    vm.chosenUser;
    vm.changeUser = changeUser;
    vm.logout = logout;
    vm.debugGeolocation = debugGeolocation;

    activate();

    ////////////////

    function activate() {
        var debug = localStorage.debug == 'true' ? true : false;
        vm.debug = debug;

        vm.autoupdate = autoupdate;
        $ionicPlatform.ready(function () {
            console.log('fb access tplen', window.localStorage.fbAccessToken);

            if(window.localStorage['userId']){
                vm.chosenUser = window.localStorage['userId'];
            } else {
                vm.chosenUser = null;
            }

            $http.get(ENV.apiEndpoint + 'users').then(function(response) {
                vm.users = response.data;
                console.log(vm.users);
            });
        });
    }

    function logout() {
        ngFB.logout().then(function() {
            $state.go('intro');
        })
    }

    function debugGeolocation() {
        // invert it
        var debug = localStorage.debug == 'true' ? true : false;
        debug = !debug;
        localStorage.debug = debug;
        vm.debug = debug;
    }



    function changeUser(userId){
        console.log(userId);
        window.localStorage['userId'] = userId;
        $state.go('tab.dash');
    }
}

})();