/**
 * Created by Andro on 09 апреля.
 */

myApp = angular.module('myApp', ['ui.bootstrap', 'smart-table']);

(function(app) {
    app.controller('BooksListController', function ($scope, $http, $timeout, $log, $uibModal, $q) {
        $scope.books = [];
        $scope.messageText = "Loading..";

        $http({
            method: 'GET',
            url: '/books'
        }).then(
            (request) => {
                $scope.books = request.data;
                $scope.messageText = "";
            },
            (err) => {
                $log.error("Something bad happened", err);
                $scope.messageText = "Can't load books. Internal error.";
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

        $scope.delete = function(book) {
            $http({
                method: 'DELETE',
                url: '/books/' + book.isbn
            }).then(
                (request) => {
                    const id = $scope.books.findIndex((b, z, zz) => b.isbn === book.isbn);
                    $scope.books.splice(id, 1);
                },
                (err) => {
                    $log.error("Something bad happened", err);
                    $scope.messageText = "Can't delete book. Internal error.";
                    $timeout(() => $scope.messageText = "", 5000);
                }
            );
        };

        function saveBook(result) {
            $scope.messageText = "Saving book..";

            let promise = $q.when({data: {id: null}});
            if(typeof result.file !== 'undefined') {
                const fd = new FormData();
                fd.append('file', result.file);

                promise = $http.post('books/files', fd, {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined
                    },
                });
            }

            promise.then((response) => {
                result.book.fileId = response.data.id;
                return $http({
                    method: 'POST',
                    url: '/books',
                    data: result.book,
                })
            }
            ).then(
                () => {
                    $scope.books.push(result.book);
                    $scope.messageText = "";
                }
            ).catch((err) => {
                $log.error("Can't add book, err:", err);
                $scope.messageText = "Can't save book. Internal error.";
                $timeout(() => $scope.messageText = "", 5000);
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
