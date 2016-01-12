angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("templates/chat-detail.html","<!--\n  This template loads for the \'tab.friend-detail\' state (app.js)\n  \'friend\' is a $scope variable created in the FriendsCtrl controller (controllers.js)\n  The FriendsCtrl pulls data from the Friends service (service.js)\n  The Friends service returns an array of friend data\n-->\n<ion-view view-title=\"{{chat.name}}\">\n  <ion-content class=\"padding\">\n    <img ng-src=\"{{chat.face}}\" style=\"width: 64px; height: 64px\">\n    <p>\n      {{chat.lastText}}\n    </p>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("templates/intro.html","<ion-view view-title=\"Intro\">\n    <ion-content class=\"padding\">\n        <!-- Show login button -->\n        <h1>Friends ETA</h1>\n        <p>Friends ETA helps you see how far away you and your friends are from each other.</p>\n        <button class=\"button button-block button-positive\" ng-click=\"vm.next()\">Add Friends</button>\n    </ion-content>\n</ion-view>");
$templateCache.put("templates/login.html","<ion-view view-title=\"Login\">\n    <ion-content class=\"padding\">\n        <!-- Show login button -->\n        <h1>Facebook Time!</h1>\n        <p>FriendsETA works with your Facebook Friends.</p>\n        <button class=\"button button-block button-positive\" ng-click=\"vm.login()\">Login with Facebook</button>\n        <p><a ng-click=\"vm.loginDemo()\">Try the demo account</a></p>\n    </ion-content>\n</ion-view>");
$templateCache.put("templates/tab-account.html","<ion-view view-title=\"Account\">\n    <ion-content>\n\n        <div class=\"list\">\n            <div class=\"item\">\n                <button class=\"button button-positive button-block\" ng-click=\"vm.logout()\">\n                    Logout\n                </button>\n            </div>\n            <a class=\"item\" ng-click=\"autoupdate.check()\">\n                <h2>\n                    {{ autoupdate.state }}\n                </h2>\n                <p>\n                    App Status\n                </p>\n            </a>\n            <!--<ion-radio ng-repeat=\"user in vm.users\" ng-model=\"vm.chosenUser\" ng-value=\"{{user.id}}\"-->\n                       <!--ng-click=\"vm.changeUser(user.id)\">-->\n                <!--{{user.name}}-->\n            <!--</ion-radio>-->\n        </div>\n\n    </ion-content>\n</ion-view>\n");
$templateCache.put("templates/tab-chats.html","<ion-view view-title=\"Chats\">\n  <ion-content>\n    <ion-list>\n      <ion-item class=\"item-remove-animate item-avatar item-icon-right\" ng-repeat=\"chat in chats\" type=\"item-text-wrap\" href=\"#/tab/chats/{{chat.id}}\">\n        <img ng-src=\"{{chat.face}}\">\n        <h2>{{chat.name}}</h2>\n        <p>{{chat.lastText}}</p>\n        <i class=\"icon ion-chevron-right icon-accessory\"></i>\n\n        <ion-option-button class=\"button-assertive\" ng-click=\"remove(chat)\">\n          Delete\n        </ion-option-button>\n      </ion-item>\n    </ion-list>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("templates/tab-dash.html","<ion-view view-title=\"ETAs\">\n  <ion-content class=\"padding\">\n      <ion-refresher\n              pulling-text=\"Pull to refresh...\"\n              on-refresh=\"vm.doRefresh()\">\n      </ion-refresher>\n   <ion-list>\n     <ion-item ng-repeat=\"friend in vm.friends\">\n       {{friend.name}}\n         {{friend.eta.eta / 60 | number:0}} Minutes\n     </ion-item>\n       <ion-item>\n           <button class=\"button button-balanced button-block\"\n                   ng-click=\"vm.invite()\">\n               Invite Friends to Use App\n           </button>\n       </ion-item>\n   </ion-list>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("templates/tabs.html","<!--\nCreate tabs with an icon and label, using the tabs-positive style.\nEach tab\'s child <ion-nav-view> directive will have its own\nnavigation history that also transitions its views in and out.\n-->\n<ion-tabs class=\"tabs-icon-top tabs-color-active-positive\">\n\n  <!-- Dashboard Tab -->\n  <ion-tab title=\"Status\" icon-off=\"ion-ios-pulse\" icon-on=\"ion-ios-pulse-strong\" href=\"#/tab/dash\">\n    <ion-nav-view name=\"tab-dash\"></ion-nav-view>\n  </ion-tab>\n\n  <!-- Chats Tab -->\n  <!--<ion-tab title=\"Chats\" icon-off=\"ion-ios-chatboxes-outline\" icon-on=\"ion-ios-chatboxes\" href=\"#/tab/chats\">-->\n    <!--<ion-nav-view name=\"tab-chats\"></ion-nav-view>-->\n  <!--</ion-tab>-->\n\n  <!-- Account Tab -->\n  <ion-tab title=\"Account\" icon-off=\"ion-ios-gear-outline\" icon-on=\"ion-ios-gear\" href=\"#/tab/account\">\n    <ion-nav-view name=\"tab-account\"></ion-nav-view>\n  </ion-tab>\n\n\n</ion-tabs>\n");}]);