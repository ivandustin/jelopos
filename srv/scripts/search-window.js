app
.directive('searchWindow', function($filter, assignVirtualId, getSelectedVirtualId, transpose) {
    return {
        templateUrl: '/templates/search-window.html',
        scope: {
            rows: '=',
            columns: '=',
            onSubmit: '<',
            attributeSearch: '='
        },
        controller: function($scope) {
            $scope.selected             = 0
            $scope.getSelectedVirtualId = getSelectedVirtualId
            $scope.searchAttributes     = {}
            $scope.rows.$promise.then(assignVirtualId)
            $scope.rows.$promise.then(transformCreatedAt)
            setTimeout(function() {
                document.querySelectorAll('.search-window input')[0].focus()
            }, 0)
            if ($scope.attributeSearch) {
                $scope.rows.$promise.then(function(rows) {
                    $scope.transposed = transpose(rows)
                    for (var key in $scope.transposed)
                        $scope.transposed[key] = [ ...new Set($scope.transposed[key]) ].sort()
                })
            } else {
                $scope.$on('keydown arrowup', function() {
                    if ($scope.selected > 0)
                        $scope.selected--
                })
                $scope.$on('keydown arrowdown', function() {
                    if ($scope.selected < $scope.rows.length - 1)
                        $scope.selected++
                })
            }
            $scope.columns = $scope.columns.map(function(value) {
                return { name: value }
            })
            $scope.submit = function() {
                var id  = getSelectedVirtualId()
                var row = $scope.rows[id]
                if (row)
                    $scope.onSubmit(row)
            }
            function transformCreatedAt(rows) {
                rows.forEach(function(row) {
                    if (row['created_at'] !== undefined) {
                        row['created_at'] = $filter('datetime')(row['created_at'])
                    }
                })
            }
        }
    }
})
