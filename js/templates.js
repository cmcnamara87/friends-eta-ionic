angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("templates/chat-detail.html","<!--\n  This template loads for the \'tab.friend-detail\' state (app.js)\n  \'friend\' is a $scope variable created in the FriendsCtrl controller (controllers.js)\n  The FriendsCtrl pulls data from the Friends service (service.js)\n  The Friends service returns an array of friend data\n-->\n<ion-view view-title=\"{{chat.name}}\">\n  <ion-content class=\"padding\">\n    <img ng-src=\"{{chat.face}}\" style=\"width: 64px; height: 64px\">\n    <p>\n      {{chat.lastText}}\n    </p>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("templates/intro.html","\n<ion-view view-title=\"Intro\" hide-nav-bar=\"true\"\n          style=\"background-color: #4ECDC4;color: white;\" class=\"onboarding\">\n    <ion-content class=\"padding\">\n        <style>\n\n        </style>\n        <!-- Show login button -->\n        <div style=\"margin-top: -30px;\">\n            <div>\n                <!--<img src=\"http://cmcnamara87.github.io/friends-eta-ionic/img/icon.png\" alt=\"\" style=\"width:70px;margin-bottom: 10px;\"/>-->\n            </div>\n\n            <h1 style=\"color:white;font-weight:400;margin: 0;margin-bottom:10px;font-size:24px;\">FriendsETA</h1>\n\n            <div class=\"padding\">\n                <p style=\"font-size:18px;font-weight:lighter;line-height: 1.4\">Always know how far away your Facebook friends are, without revealing your locations.\n                </p>\n            </div>\n\n            <div class=\"padding\" style=\"margin-top:10px;\">\n                <p style=\"font-weight: bold;margin-bottom:10px;font-size:14px;\">Just like this!</p>\n                <p style=\"opacity:1\">💁 Where is Ankith? Should we just order?</p>\n                <div style=\"text-align:left;border: 1px solid #1db2b2;padding: 15px 15px; overflow: auto;border-radius:5px;background-color:white;color:#8093a8;\">\n\n                    <img style=\"width:40px;float:left;border-radius:50px;margin-right: 10px;\"\n                         src=\"http://cmcnamara87.github.io/friends-eta-ionic/img/ankith.jpg\"\n                         alt=\"\"/>\n\n                    <div style=\"overflow:auto\">\n                        <p style=\"font-weight: bold;margin-bottom:0;\">Ankith Honda</p>\n                        <p style=\"margin:0;\">🚗 15 minutes away</p>\n                    </div>\n                </div>\n                <p style=\"opacity:1;margin-top:10px;\">👨 15 mins? He is always late, lets order!</p>\n            </div>\n\n            <p>\n                <!--<img src=\"img/map-1.png\" alt=\"\" style=\"position:absolute;top:-10px;left:-10px;right:-10px;bottom:0;opacity:0.2;z-index:-1;\"/>-->\n            </p>\n        </div>\n    </ion-content>\n    <!-- align to the bottom of the page -->\n    <div style=\"position: absolute; bottom: 0px; width: 100%\">\n        <div style=\"text-align: center;padding:10px 20px;\">\n            <button class=\"button button-block button-positive\" ng-click=\"vm.next()\" >\n                Get Started\n            </button>\n        </div>\n    </div>\n</ion-view>");
$templateCache.put("templates/login-success.html","<ion-view view-title=\"Facebook Friends\" class=\"onboarding\">\n    <ion-content style=\"padding: 20px;color:#556270;\">\n\n        <h1 style=\"font-weight:400;margin: 0;margin-bottom:10px;font-size:24px;\">\n            You Did It!\n        </h1>\n        <p style=\"font-size:18px;font-weight:lighter;line-height: 1.4\">\n            We are just setting up some stuff. Won\'t be long!\n        </p>\n        <p style=\"text-align: center;\">\n            <img src=\"http://cmcnamara87.github.io/friends-eta-ionic/img/animat-customize-color.gif\" alt=\"\" style=\"max-width:70%;\"/>\n        </p>\n    </ion-content>\n</ion-view>");
$templateCache.put("templates/login.html","<ion-view view-title=\"Facebook Friends\" class=\"onboarding\">\n    <ion-content style=\"padding: 20px;color:#556270;\" >\n\n        <div style=\"margin-top: -120px;\">\n            <!-- Show login button -->\n            <h1 style=\"font-weight:400;margin: 0;margin-bottom:10px;font-size:24px;\">\n                Find Your Friends\n            </h1>\n\n            <p style=\"font-size:18px;font-weight:lighter;line-height: 1.4\">\n                We let you know how far away your Facebook Friends are that use this app.\n            </p>\n            <p style=\"opacity:0.7;\">We won\'t ever share your location, just your ETA - far less creepy.</p>\n        </div>\n    </ion-content>\n    <div style=\"position: absolute; bottom: 0px; width: 100%\">\n        <div style=\"text-align: center;padding:10px 20px;\">\n            <button class=\"button button-block button-calm\" ng-click=\"vm.login()\">Login with Facebook</button>\n            <p style=\"opacity: 0.5;\">Don\'t worry, we won\'t post stuff on your Facebook. We hate that too!</p>\n            <p><a href=\"\" ng-click=\"vm.loginWithDemo()\">Login with Demo Account</a></p>\n        </div>\n    </div>\n\n</ion-view>");
$templateCache.put("templates/tab-account.html","<ion-view view-title=\"Account\">\n    <ion-content>\n\n        <div class=\"list\">\n            <div class=\"item\">\n                <button class=\"button button-balanced button-block\" ng-click=\"vm.logout()\">\n                    Logout\n                </button>\n            </div>\n            <a class=\"item\" ng-click=\"vm.autoupdate.check()\">\n                <h2>\n                    {{ vm.autoupdate.state }}\n                </h2>\n                <p>\n                    App Status\n                </p>\n            </a>\n            <a class=\"item\" ng-click=\"vm.debugGeolocation()\">\n                <h2>Debug Geolocation</h2>\n                <p>{{ vm.debug }}</p>\n            </a>\n            <div class=\"item\">\n                App Icon - Time Flies by Andreas Wikström from the Noun Project.\n            </div>\n        </div>\n\n    </ion-content>\n</ion-view>\n");
$templateCache.put("templates/tab-chats.html","<ion-view view-title=\"Chats\">\n  <ion-content>\n    <ion-list>\n      <ion-item class=\"item-remove-animate item-avatar item-icon-right\" ng-repeat=\"chat in chats\" type=\"item-text-wrap\" href=\"#/tab/chats/{{chat.id}}\">\n        <img ng-src=\"{{chat.face}}\">\n        <h2>{{chat.name}}</h2>\n        <p>{{chat.lastText}}</p>\n        <i class=\"icon ion-chevron-right icon-accessory\"></i>\n\n        <ion-option-button class=\"button-assertive\" ng-click=\"remove(chat)\">\n          Delete\n        </ion-option-button>\n      </ion-item>\n    </ion-list>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("templates/tab-dash.html","<ion-view view-title=\"{{ vm.state }}\">\n    <ion-content>\n        <ion-refresher\n                pulling-text=\"Pull to refresh...\"\n                on-refresh=\"vm.doRefresh()\">\n        </ion-refresher>\n        <ion-list>\n            <ion-item ng-repeat=\"friend in vm.friends\">\n                <h2>{{friend.name}}</h2>\n                <p ng-hide=\"friend.eta\">\n                    No ETA available.\n                </p>\n                <p ng-show=\"friend.eta\">\n                    {{friend.eta.eta / 60 | number:0}} min away (<span am-time-ago=\"friend.eta.last_seen_at * 1000\"></span>)\n                </p>\n            </ion-item>\n            <ion-item>\n                <button class=\"button button-balanced button-block\"\n                        ng-click=\"vm.invite()\">\n                    Invite Friends to Use App\n                </button>\n            </ion-item>\n        </ion-list>\n    </ion-content>\n</ion-view>\n");
$templateCache.put("templates/tabs.html","<!--\nCreate tabs with an icon and label, using the tabs-positive style.\nEach tab\'s child <ion-nav-view> directive will have its own\nnavigation history that also transitions its views in and out.\n-->\n<ion-tabs class=\"tabs-icon-top tabs-color-active-balanced\">\n\n  <!-- Dashboard Tab -->\n  <ion-tab title=\"Friends\" icon-off=\"ion-person-stalker\" icon-on=\"ion-person-stalker\" href=\"#/tab/dash\">\n    <ion-nav-view name=\"tab-dash\"></ion-nav-view>\n  </ion-tab>\n\n  <!-- Chats Tab -->\n  <!--<ion-tab title=\"Chats\" icon-off=\"ion-ios-chatboxes-outline\" icon-on=\"ion-ios-chatboxes\" href=\"#/tab/chats\">-->\n    <!--<ion-nav-view name=\"tab-chats\"></ion-nav-view>-->\n  <!--</ion-tab>-->\n\n  <!-- Account Tab -->\n  <ion-tab title=\"Account\" icon-off=\"ion-ios-gear-outline\" icon-on=\"ion-ios-gear\" href=\"#/tab/account\">\n    <ion-nav-view name=\"tab-account\"></ion-nav-view>\n  </ion-tab>\n\n\n</ion-tabs>\n");}]);