/**
 * Created by Andro on 09 апреля.
 */

myApp = angular.module('myApp', []);

(function(app) {
    app.controller('BooksListController', function ($scope, $http) {
        $scope.books = [];

        $http({
            method: 'GET',
            url: '/books'
        }).then(
            (request) => {
                $scope.books = request.data;
            },
            (err) => {
                console.error("Something bad happened", err)
            }
        );
    });
})(myApp);
