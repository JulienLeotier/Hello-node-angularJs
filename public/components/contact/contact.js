'use strict';

angular.module("helping")
    .component("contact", {
        templateUrl: "components/contact/contact.html",
        controller: Contact
    })
    .directive('file', function () {
        return {
            scope: {
                file: '='
            },
            link: function (scope, el, attrs) {
                el.bind('change', function (event) {
                    var files = event.target.files;
                    var file = files[0];
                    scope.file = file ? file.name : undefined;
                    scope.$apply();
                });
            }
        };
    });

function Contact($scope, $http, $resource) {
    this.ok = "hello"
    const vm = this
    this.Envoie = function () {
        var data = {
            tel: vm.tel,
            mail: vm.mail,
            back: userPhoto + '-' + Date.now()
        }
        $http.post("/contact", data).then(function (Succes) {
            console.log(Succes);
        })
    }

}