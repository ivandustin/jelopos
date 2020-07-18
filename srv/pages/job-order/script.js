angular.module('app')

.config(function($locationProvider, $resourceProvider, $routeProvider) {
    $routeProvider
        .when('/job-order', {
            templateUrl: '/pages/job-order/index.html',
            controller: 'JobOrder'
        })
})

.controller('JobOrder', function($scope, Api) {
    var api = Api['job_order_coil']
    api.query({complete: true}).$promise.then(function(rows) {
        $scope.days = build(rows)
    })
    function build(rows) {
        class Day {
            constructor(id) {
                this.id         = id
                this.jobOrders  = []
            }
        }
        class JobOrder {
            constructor(id) {
                this.id     = id
                this.coils  = []
            }
        }
        var days = []
        rows.forEach(function(entry) {
            var createdAt   = entry.created_at
            var date        = new Date(createdAt * 1000)
            var dayId       = date.toDateString()
            var jobOrderId  = entry.job_order
            var day         = days.find(day => day.id == dayId)
            if (!day) {
                day = new Day(dayId)
                days.push(day)
            }
            var jobOrder    = day.jobOrders.find(jobOrder => jobOrder.id == jobOrderId)
            if (!jobOrder) {
                jobOrder = new JobOrder(jobOrderId)
                day.jobOrders.push(jobOrder)
            }
            jobOrder.coils.push(entry)
        })
        return days
    }
})
