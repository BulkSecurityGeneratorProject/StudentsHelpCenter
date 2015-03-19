'use strict';

angular.module('studentshelpcenterApp')
    .controller('AddNewController', function ($scope, $location, $state, $http, Auth, Question, Tag) {
        $scope.question = {};

        $scope.queue = [];

        Dropzone.autoDiscover = false;
        var myDropzone = new Dropzone("div#images-dropzone", {
            url: "/api/questions/upload-images",
            autoProcessQueue: false,
            init: function() {
                this.on("success", function(file, responseText) {
                    console.log(responseText);
                });
            }
        });

        //Save question
        $scope.create = function () {
            $scope.question.setUser = -1;
            $scope.question.solved = false;


            Question.save($scope.question,
                function (question) {
                    myDropzone.on('sending', function(file, xhr, formData) {
                        formData.append('id', question.id);
                        formData.append('_csrf', $.cookie('CSRF-TOKEN'));
                    });
                    myDropzone.processQueue();
                });

        };

        //Load tags for autocomplete
        $scope.loadTags = function (query) {
            return Tag.query().$promise;
        };
    });
