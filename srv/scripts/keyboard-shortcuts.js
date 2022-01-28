app
.directive('keyboardShortcuts', function() {
    return {
        templateUrl: '/templates/keyboard-shortcuts.html',
        scope: {
            data: '='
        },
        controller: function($scope) {
            $scope.shortcuts = $scope.data.split(',').map(function(entry) {
                var a   = entry.split(':')
                var key = a[0]
                var description = a[1]
                return { key: key, description: description }
            })
        }
    }
})
