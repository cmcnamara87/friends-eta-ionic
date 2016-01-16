// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('friendsEta', ['ionic', 'ngOpenFB', 'templates', 'ngCordova'])

    .run(function ($ionicPlatform, $http, ENV, ngFB, $state,
                   autoupdate, friendsService) {
        // if not logged in, go to login page

        // Check for updates
        autoupdate.bootstrapOk();

        $ionicPlatform.ready(function () {
            // facebook
            ngFB.init({
                appId: '1045435845519655',
                tokenStore: window.localStorage
            });

            console.log('Checking login status');
            ngFB.getLoginStatus().then(function(status) {
                console.log('Status ', status);
                if(status.status !== 'connected') {
                    console.log('Going to intro');
                    $state.go('intro');
                }
            });

            $ionicPlatform.on('resume', function(){
                friendsService.updateFriendsFromFacebook();
            });

            // in app browser
            if (window.cordova) {
                // Add in app browser open
                window.open = cordova.InAppBrowser.open;
            }
            if (navigator.splashscreen) {
                navigator.splashscreen.hide();
            }

            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }

            if(window.cordova && window.BackgroundGeolocation) {
                // Get a reference to the plugin.
                var bgGeo = window.BackgroundGeolocation;


                // debug geo
                var debug = localStorage.debug == 'true' ? true : false;
                /**
                 * This callback will be executed every time a geolocation is recorded in the background.
                 */
                var callbackFn = function(location, taskId) {
                    var coords = location.coords;
                    var lat    = coords.latitude;
                    var lng    = coords.longitude;

                    console.log(lat, lng);
                    var coords = location.coords;
                    var lat = coords.latitude;
                    var long = coords.longitude;

                    if (window.localStorage['userId']) {
                        console.log('Has user id, so sending lat long');
                        var userId = window.localStorage['userId'];
                        $http.post(ENV.apiEndpoint + 'locations', {'user_id': userId, 'lat': lat, 'long': long}).then(function() {
                            bgGeo.finish(taskId); // <-- execute #finish when your work in callbackFn is complete
                        });
                    } else {
                        console.log('no user id');
                    }
                };

                var failureFn = function(error) {
                    console.log('BackgroundGeoLocation error');
                };

                // BackgroundGeoLocation is highly configurable.
                bgGeo.configure(callbackFn, failureFn, {
                    // Geolocation config
                    desiredAccuracy: 100, // 0 10 100 100
                    stationaryRadius: 50, // min 50 meters from stationary before change is detected
                    distanceFilter: 200, // detect change every 200m when walking
                    disableElasticity: false, // <-- [iOS] Default is 'false'.  Set true to disable speed-based distanceFilter elasticity
                    locationUpdateInterval: 120000, // every 2 minutes
                    minimumActivityRecognitionConfidence: 80,   // 0-100%.  Minimum activity-confidence for a state-change
                    //fastestLocationUpdateInterval: 30000, //
                    activityRecognitionInterval: 300000, // 5 minutes between updates
                    stopDetectionDelay: 1,  // Wait x minutes to engage stop-detection system
                    stopTimeout: 2,  // Wait x miutes to turn off location system after stop-detection
                    activityType: 'AutomotiveNavigation',

                    // Application config
                    debug: debug // <-- enable this hear sounds for background-geolocation life-cycle.
                    //forceReloadOnLocationChange: false,  // <-- [Android] If the user closes the app **while location-tracking is started** , reboot app when a new location is recorded (WARNING: possibly distruptive to user)
                    //forceReloadOnMotionChange: false,    // <-- [Android] If the user closes the app **while location-tracking is started** , reboot app when device changes stationary-state (stationary->moving or vice-versa) --WARNING: possibly distruptive to user)
                    //forceReloadOnGeofence: false,        // <-- [Android] If the user closes the app **while location-tracking is started** , reboot app when a geofence crossing occurs --WARNING: possibly distruptive to user)
                    //stopOnTerminate: false,              // <-- [Android] Allow the background-service to run headless when user closes the app.
                    //startOnBoot: true,                   // <-- [Android] Auto start background-service in headless mode when device is powered-up.

                    // HTTP / SQLite config
                    //url: 'http://posttestserver.com/post.php?dir=cordova-background-geolocation',
                    //method: 'POST',
                    //batchSync: true,       // <-- [Default: false] Set true to sync locations to server in a single HTTP request.
                    //autoSync: true,         // <-- [Default: true] Set true to sync each location to server as it arrives.
                    //maxDaysToPersist: 1,    // <-- Maximum days to persist a location in plugin's SQLite database when HTTP fails
                    //headers: {
                    //    "X-FOO": "bar"
                    //},
                    //params: {
                    //    "auth_token": "maybe_your_server_authenticates_via_token_YES?"
                    //}
                });

                // Turn ON the background-geolocation system.  The user will be tracked whenever they suspend the app.
                bgGeo.start();

                // If you wish to turn OFF background-tracking, call the #stop method.
                // bgGeo.stop()
            }
        });
    })
    .constant('ENV', {apiEndpoint: 'http://128.199.104.251/friendseta.com/current/public/'})

    .config(function ($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            .state('intro', {
                url: '/intro',
                controller: 'IntroController as vm',
                templateUrl: 'templates/intro.html'
            })
            .state('login', {
                url: '/login',
                controller: 'LoginController as vm',
                templateUrl: 'templates/login.html'
            })
            .state('login-success', {
                url: '/login-success',
                controller: 'LoginSuccessController as vm',
                templateUrl: 'templates/login-success.html'
            })
            // setup an abstract state for the tabs directive
            .state('tab', {
                url: '/tab',
                abstract: true,
                templateUrl: 'templates/tabs.html'
            })

            // Each tab has its own nav history stack:

            .state('tab.dash', {
                url: '/dash',
                views: {
                    'tab-dash': {
                        templateUrl: 'templates/tab-dash.html',
                        controller: 'EtasController as vm'
                    }
                }
            })

            .state('tab.chats', {
                url: '/chats',
                views: {
                    'tab-chats': {
                        templateUrl: 'templates/tab-chats.html',
                        controller: 'ChatsCtrl'
                    }
                }
            })
            .state('tab.chat-detail', {
                url: '/chats/:chatId',
                views: {
                    'tab-chats': {
                        templateUrl: 'templates/chat-detail.html',
                        controller: 'ChatDetailCtrl'
                    }
                }
            })

            .state('tab.account', {
                url: '/account',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/tab-account.html',
                        controller: 'AccountsController as vm'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/dash');

    });

setTimeout(function() {
    angular.element(document).ready(function() {
        angular.bootstrap(document, ['friendsEta']);
    });
}, 0);