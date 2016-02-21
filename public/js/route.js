(function(){
    angular.module('LICY')
        .config(function($stateProvider, $urlRouterProvider){
            $stateProvider
                .state('home',{
                    url: '/',
                    templateUrl: '../views/templates/home.html'
                })
                .state('goals',{
                    url: '/goals',
                    templateUrl: '../views/templates/goal/index.html',
                    controller: 'GoalController'
                })
                .state('goals.create',{
                    url: '/goals/create',
                    templateUrl: '../views/templates/goal/create.html'
                })
        });
})();
            
