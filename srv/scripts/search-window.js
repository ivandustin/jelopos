app

.directive('searchWindow', function(assignVirtualId, getSelectedVirtualId, transpose) {
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
        }
    }
})
