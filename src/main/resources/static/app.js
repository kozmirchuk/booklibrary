/**
 * Created by Andro on 09 апреля.
 */

myApp = angular.module('myApp', ['ui.bootstrap']);

(function(app) {
    app.controller('BooksListController', function ($scope, $http, $log, $uibModal) {
        $scope.books = [];

        $http({
            method: 'GET',
            url: '/books'
        }).then(
            (request) => {
                $scope.books = request.data;
            },
            (err) => {
                $log.error("Something bad happened", err)
            }
        );

        $scope.addBook = function (size) {
            const modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                controllerAs: '$ctrl',
                size: size,
                resolve: { }
            });

            modalInstance.result.then(saveBook, () => {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        function saveBook(book) {
            $http({
                method: 'POST',
                url: '/books',
                data: book,
            }).then(
                () => {
                    $scope.books.push(book);
                },
                (err) => {
                    $log.error("Can't add book, err:", err.data)
                }
            );
        }
    });

    app.controller('ModalInstanceCtrl', function ($uibModalInstance) {
        const $ctrl = this;
        $ctrl.book = { };

        $ctrl.ok = function () {
            $uibModalInstance.close($ctrl.book);
        };

        $ctrl.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });
})(myApp);
