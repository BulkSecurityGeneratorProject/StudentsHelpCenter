'use strict';

var url = 'api/questionImages';

angular.module('studentshelpcenterApp')
    .controller('AddNewController', function ($scope, $location, $state, $http, Auth, Question, Tag) {
        $scope.question = {};

        $scope.queue = [];

        $scope.tags = [];

        $scope.options = {
            url: url
        };

        //Save question
        $scope.create = function () {

        };

        //Autocomplete tags query
        $scope.loadTags = function(query) {
            return Tag.query();
        };
    })
    .controller('FileDestroyController', [
        '$scope', '$http',
        function ($scope, $http) {
            var file = $scope.file,
                state;
            if (file.url) {
                file.$state = function () {
                    return state;
                };
                file.$destroy = function () {
                    state = 'pending';
                    return $http({
                        url: file.deleteUrl,
                        method: file.deleteType
                    }).then(
                        function () {
                            state = 'resolved';
                            $scope.clear(file);
                        },
                        function () {
                            state = 'rejected';
                        }
                    );
                };
            } else if (!file.$cancel && !file._index) {
                file.$cancel = function () {
                    $scope.clear(file);
                };
            }
        }
    ]);