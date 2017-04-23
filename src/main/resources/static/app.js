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

        function saveBook(result) {
            const fd = new FormData();
            fd.append('file', result.file);

            $http.post('books/files', fd, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                },
            }).then((response) => {
                result.book.fileId = response.data.id;
                $http({
                    method: 'POST',
                    url: '/books',
                    data: result.book,
                })
            }).then(
                () => {
                    $scope.books.push(result.book);
                },
                (err) => {
                    $log.error("Can't add book, err:", err.data)
                }
            ).catch(() => {
                console.error("Book creation error");
            });

        }
    });

    app.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance) {
        const $ctrl = this;
        $ctrl.book = { };

        $ctrl.ok = function () {
            $uibModalInstance.close({book: $ctrl.book, file: $ctrl.file});
        };

        $ctrl.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.setFiles = function(element) {
            $scope.$apply(function(scope) {
                $ctrl.file = element.files[0];
            });
        };
    });
})(myApp);
