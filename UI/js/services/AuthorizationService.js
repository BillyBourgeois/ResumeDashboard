var AuthorizationService = angular.module('AuthorizationService', []);

AuthorizationService.factory('Authorization', ['$location', 'CurrentUser',
    function ($location, CurrentUser) {
        var defaultMinVisibility = 5;
        var defaultallowActingAs = false;
        var defaultAllowAnonymous = false;

        function newAuthorization(minVisibility, allowActingAs, allowAnonymous) {
            this.minVisibility = angular.isDefined(minVisibility) ? minVisibility : defaultMinVisibility;
            this.allowActingAs = angular.isDefined(allowActingAs) ? allowActingAs : defaultallowActingAs;
            this.allowAnonymous = angular.isDefined(allowAnonymous) ? allowAnonymous : defaultAllowAnonymous;
            this.isAuthorized = checkAuthorization;
            this.setMinVisibility = setMinVisibility;
            this.setAllowActingAs = setAllowActingAs;
            this.setAllowAnonymous = setAllowAnonymous
            return this;
        };
        function setMinVisibility(minVisibility) {
            this.minVisibility = angular.isDefined(minVisibility) ? minVisibility : defaultMinVisibility;
        }
        function setAllowActingAs(allowActingAs) {
            this.allowActingAs = angular.isDefined(allowActingAs) ? allowActingAs : defaultallowActingAs;
        }
        function setAllowAnonymous(allowAnonymous) {
            this.allowAnonymouse = angular.isDefined(allowAnonymous) ? allowAnonymous : defaultAllowAnonymous;
        }

        function checkAuthorization() {
            var authorized = true;
            var currentUser = CurrentUser.get();
            if (this.allowActingAs == false && currentUser.actingAs_Id != null) {
                $location.path('/inbox').replace();
                authorized = false;
            } else
                if (currentUser.userDetails.visibility < this.minVisibility) {
                    $location.path('/error/403').replace();
                    authorized = false;
                } else
                    if (this.allowAnonymous == false && currentUser.firstName == 'Unknown User') {
                        $location.path('/error/403').replace();
                        authorized = false;
                    }
            return authorized;
        }

        return {
            new: newAuthorization            
        };
    }]);


