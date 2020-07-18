app

.factory('assignVirtualId', function() {
    return function(rows) {
        var id = 0
        rows.forEach(function(row) {
            row.__virtual_id__ = id++
        })
    }
})

.factory('getSelectedVirtualId', function() {
    return function() {
        var el = document.querySelector('.selected')
        if (!el)
            return -1
        return +el.getAttribute('virtual-id')
    }
})

.factory('focus', function() {
    return function() {
        setTimeout(function() {
            document.querySelector('input').focus()
        })
    }
})

.factory('transpose', function() {
    return function(rows) {
        if (!rows.length)
            return {}
        var keys = Object.keys(rows[0])
        var out = {}
        keys.forEach(function(key) {
            out[key] = []
        })
        rows.forEach(function(row) {
            keys.forEach(function(key) {
                out[key].push(row[key])
            })
        })
        return out
    }
})

.filter('datetime', function() {
    return function(unix_epoch) {
        if (!unix_epoch)
            return null
        return new Date(unix_epoch * 1000).toLocaleString()
    }
})

.filter('orderid', function() {
    return function(id) {
        if (!id)
            return null
        return 'DR' + 
            (new Date().getFullYear().toString().substr(2)) + 
            id.toString().padStart(5, '0')
    }
})

.run(function($rootScope, $routeParams) {
    $rootScope.$routeParams = $routeParams
    $rootScope.broadcastKeyPress = function(e) {
        if (document.activeElement.tagName != 'INPUT')
            $rootScope.$broadcast('keypress ' + e.key.toLowerCase(), e)
    }
    $rootScope.broadcastKeyDown = function(e) {
        $rootScope.$broadcast('keydown ' + e.key.toLowerCase(), e)
    }
    $rootScope.date = function(unix_epoch) {
        if (!unix_epoch)
            return null
        return new Date(unix_epoch * 1000).toLocaleDateString()
    }
    $rootScope.datetime = function(unix_epoch) {
        if (!unix_epoch)
            return null
        return new Date(unix_epoch * 1000).toLocaleString()
    }
    $rootScope.sortBy = function(property) {
        if ($rootScope.sortProperty !== property) {
            $rootScope.sortProperty = property
            $rootScope.sortOrder    = false
        } else {
            $rootScope.sortOrder = !$rootScope.sortOrder
        }  
    }
})
