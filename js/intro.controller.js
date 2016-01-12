(function () {

    'use strict';
    angular
        .module('friendsEta')
        .controller('IntroController', IntroController);

    /* @ngInject */
    function IntroController($state) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.title = 'Intro';
        vm.next = next;

        activate();

        ////////////////

        function activate() {
        }

        function next() {
            $state.go('login');
        }
    }

})();
