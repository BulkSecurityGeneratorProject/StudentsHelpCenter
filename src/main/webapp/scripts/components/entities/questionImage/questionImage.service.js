'use strict';

angular.module('studentshelpcenterApp')
    .factory('QuestionImage', function ($resource) {
        return $resource('api/questions/:id/images/:imageId', {id: '@id', imageId: '@imageId'}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            }
        });
    });
