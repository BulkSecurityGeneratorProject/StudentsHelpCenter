'use strict';

angular.module('studentshelpcenterApp')
    .controller('QuestionTagDetailController', function ($scope, $stateParams, QuestionTag) {
        $scope.questionTag = {};
        $scope.load = function (id) {
            QuestionTag.get({id: id}, function(result) {
              $scope.questionTag = result;
            });
        };
        $scope.load($stateParams.id);
    });
