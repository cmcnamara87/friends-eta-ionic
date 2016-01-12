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

    activate();

    ////////////////

    function activate() {
        $scope.autoupdate = autoupdate;
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
            $state.go('login');
        })
    }



    function changeUser(userId){
        console.log(userId);
        window.localStorage['userId'] = userId;
        $state.go('tab.dash');
    }
}

})();