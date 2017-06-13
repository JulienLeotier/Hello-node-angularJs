'use strict';

const config = ["$stateProvider", "$urlRouterProvider", Config];

angular

    .module("helping", ["ui.router", "ngResource"])

    .config(config)


function Config($stateProvider, $urlRouterProvider) {
    var states = [
        {
            name: "contact",
            url: "/",
            component: "contact"
        }
    ];

    $urlRouterProvider.otherwise("/"); // Page par défaut
    states.forEach(function (state) {
        $stateProvider.state(state);
    });
};