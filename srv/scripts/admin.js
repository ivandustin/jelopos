app

.config(function($routeProvider) {
    $routeProvider
        .when('/admin/:id', {
            templateUrl: '/templates/admin.html',
            controller: 'Admin'
        })
})

.factory('Api', function($resource) {
    return {
        customer: $resource('/api/customer/:id', { id: '@id' }) ,
        sale: $resource('/api/sale/:id', { id: '@id' }) ,
        item: $resource('/api/item/:id', { id: '@id' }) ,
        coil_design: $resource('/api/coil_design/:id', { id: '@id' }) ,
        coil: $resource('/api/coil/:id', { id: '@id' }) ,
        precut_coil: $resource('/api/precut-coil/:id', { id: '@id' }) ,
        sale_item: $resource('/api/sale-item/:id', { id: '@id' }) ,
        sale_coil: $resource('/api/sale-coil/:id', { id: '@id' }) ,
        job_order_coil: $resource('/api/job_order_coil/:id', { id: '@id' }) ,
        job_order_precut_coil: $resource('/api/job_order_precut_coil/:id', { id: '@id' }) ,
    }
})

.controller('Admin', function($scope, $routeParams, Api) {
    var Resource    = Api[$routeParams.id]
    $scope.entry    = null
    $scope.entries  = Resource.query()
    saved           = true
    $scope.select   = function(entry) {
        $scope.entry = entry
    }
    $scope.submit   = function() {
        var entry = $scope.entry
        if (!entry)
            return
        if (entry.id) {
            entry.$update()
        } else {
            entry.$save()
            saved = true
        }
        document.activeElement.blur()
    }
    $scope.add = function() {
        setTimeout(function() {
            document.querySelector('table > tbody > tr > td > input').focus()
        }, 0)
        if (!saved)
            return
        $scope.entries.unshift(new Resource())
        saved = false
    }
    $scope.$on('keypress +', $scope.add)
    $scope.$on('keypress =', $scope.add)
})
