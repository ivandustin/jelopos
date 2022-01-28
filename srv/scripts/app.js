var app = angular.module('app', ['ngResource', 'ngRoute', 'ui.utils.masks'])

.config(function($locationProvider, $resourceProvider, $routeProvider) {
    $resourceProvider.defaults.actions.update = { method: 'PUT' }
    $locationProvider.html5Mode(true)
    $routeProvider
        .when('/sale', {
            templateUrl: '/templates/order-slip.html',
            controller: 'OrderSlip'
        })
        .when('/sale/:id', {
            templateUrl: '/templates/order-slip.html',
            controller: 'OrderSlip'
        })
        .when('/inventory/coil', {
            templateUrl: '/templates/inventory.html',
            controller: 'InventoryCoil'
        })
        .when('/inventory/precut_coil', {
            templateUrl: '/templates/inventory.html',
            controller: 'InventoryPreCutCoil'
        })
        .when('/form/coil', {
            templateUrl: '/templates/form.html',
            controller: 'FormCoil'
        })
        .when('/new/coil', {
            templateUrl: '/templates/form.html',
            controller: 'NewCoil'
        })
})

.controller('FormCoil', function($scope, $route, $routeParams, focus, Api) {
    $scope.getValues = function() {
        var object = {}
        $scope.fields.forEach(function(field) {
            object[field.name] = field.value
        })
        return object
    }
    $scope.title = 'coil reduction'
    $scope.fields = [
        {
            name: 'job order',
            type: 'integer'
        },
        {
            name: 'serial',
            type: 'text'
        },
        {
            name: 'length',
            type: 'real'
        }
    ]
    function computedWeight(newLength, length, weight) {
        return +((newLength / length) * weight).toFixed(2)
    }
    $scope.submit = function(form) {
        var Coil            = Api['coil']
        var JobOrderCoil    = Api['job_order_coil']
        var coil            = new Coil({id: form.serial})
        coil.$get({serial: true}).then(function() {
            coil.id     = null
            coil.weight = -computedWeight(form.length, Math.abs(coil.length), Math.abs(coil.weight))
            coil.length = -form.length
            if (confirm('Are you sure it is correct?')) {
                coil.$save().then(function() {
                    var jo = new JobOrderCoil({
                        coil_id: coil.id,
                        job_order: form['job order']
                    })
                    jo.$save().then(function() {
                        $route.reload()
                        focus()
                    })
                })
            }
        }).catch(function() {
            alert('Serial number not found.')
        })
    }
})

.controller('NewCoil', function($scope, $route, $routeParams, focus, Api) {
    $scope.getValues = function() {
        var object = {}
        $scope.fields.forEach(function(field) {
            object[field.name] = field.value
        })
        return object
    }
    $scope.title = 'add new coil'
    $scope.fields = [
        {
            name: 'color',
            type: 'text'
        },
        {
            name: 'thickness',
            type: 'real'
        },
        {
            name: 'width',
            type: 'real'
        },
        {
            name: 'length',
            type: 'real'
        },
        {
            name: 'weight',
            type: 'real'
        },
        {
            name: 'code',
            type: 'text'
        },
        {
            name: 'serial',
            type: 'text'
        }
    ]
    $scope.submit = function(form) {
        var Coil = Api['coil']
        var coil = new Coil({id: form.serial})
        coil.$get({serial: true}).then(function() {
            alert('Serial number already exists.')
        }).catch(function() {
            var coil = new Coil(form)
            if (confirm('Are you sure all fields are correct?')) {
                coil.$save().then(function() {
                    $route.reload()
                    focus()
                })
            }
        })
    }
})

.controller('InventoryCoil', function($scope, Api) {
    var api = Api['coil']
    $scope.title = 'coil inventory'
    $scope.rows = api.query({inventory: true})
    $scope.fields = [
        {
            name: 'color'
        },
        {
            name: 'thickness'
        },
        {
            name: 'width'
        },
        {
            name: 'serial'
        },
        {
            name: 'code'
        },
        {
            name: 'last_updated',
            fn: $scope.datetime
        },
        {
            name: 'weight'
        },
        {
            name: 'length'
        }
    ]
    $scope.filters = [
        {
            name: 'available',
            filterfn: function(coil) {
                return coil.length > 0
            }
        },
        {
            name: 'unavailable',
            filterfn: function(coil) {
                return coil.length <= 0
            }
        },
        {
            name: 'all',
            filterfn: function() {
                return true
            }
        }
    ]
    $scope.selected_filter = $scope.filters[0]
    $scope.select_filter = function(filter) {
        $scope.selected_filter = filter
    }
})

.controller('InventoryPreCutCoil', function($scope, Api) {
    var api = Api['precut_coil']
    $scope.title = 'precut coil inventory'
    $scope.rows = api.query({inventory: true})
    $scope.fields = [
        {
            name: 'design'
        },
        {
            name: 'color'
        },
        {
            name: 'thickness'
        },
        {
            name: 'width'
        },
        {
            name: 'length'
        },
        {
            name: 'code'
        },
        {
            name: 'last_updated',
            fn: $scope.datetime
        },
        {
            name: 'qty'
        }
    ]
})

.controller('OrderSlip', function($scope, $routeParams, $route, $timeout, focus, Api) {
    var Customer        = Api['customer']
    var Sale            = Api['sale']
    var Coil            = Api['coil']
    var SaleItem        = Api['sale_item']
    var SaleCoil        = Api['sale_coil']
    var Item            = Api['item']
    var Coil            = Api['coil']
    var CoilDesign      = Api['coil_design']
    var voidFlag        = false
    $scope.sale         = new Sale({terms: 'Cash'})
    $scope.sale.username = setUser()
    $scope.customers    = Customer.query()
    $scope.customer     = new Customer()
    $scope.designs      = CoilDesign.query()
    $scope.coils        = Coil.query({list: true})
    $scope.items        = Item.query({inventory: true})
    $scope.coilFields   = [
        {
            name: 'color',
            type: 'text'
        },
        {
            name: 'thickness',
            type: 'real'
        },
        {
            name: 'width',
            type: 'integer'
        }
    ]
    $scope.designColumns = ['design']
    $scope.coilColumns  = ['color', 'thickness', 'width', 'code']
    $scope.itemColumns  = ['name', 'size', 'unit', 'qty']
    $scope.customerColumns = ['name', 'address', 'contact']
    $scope.saleColumns  = ['id', 'created_at']
    $scope.searchDesigns = false
    $scope.searchCoils  = false
    $scope.searchItems  = false
    $scope.searchCustomers = false
    $scope.searchSales  = false
    $scope.saleItems    = []
    $scope.saleCoils    = []
    $scope.sales        = []
    $scope.selectedDesign = null
    if ($routeParams.id) {
        $scope.sale = new Sale({id: $routeParams.id})
        $scope.sale.$get().then(function() {
            $scope.customer = new Customer({id: $scope.sale.customer_id})
            $scope.customer.$get()

            $scope.saleItems = SaleItem.query({sale_id: $scope.sale.id})
            $scope.saleCoils = SaleCoil.query({sale_id: $scope.sale.id})
            $scope.saleItems.$promise.then(function() {
                $scope.saleCoils.$promise.then(function() {
                    $scope.sales = $scope.saleItems.concat($scope.saleCoils)
                })
            })
        })
    }
    function setUser() {
        var username = localStorage['username']
        while(!username)
            username = prompt('Please enter your name')
        localStorage['username'] = username
        return username
    }
    $scope.findCustomer = function(name) {
        var result = $scope.customers.find(function(object) {
            return object.name == name
        })
        if (result)
            $scope.customer = result
    }
    $scope.selectDesign = function(design) {
        $scope.searchDesigns    = false
        $scope.searchCoils      = true
        $scope.selectedDesign   = design
    }
    $scope.selectCoil = function(coil) {
        $scope.searchCoils = false
        var sale        = new SaleCoil(coil)
        sale.design     = $scope.selectedDesign.design
        sale.sale_id    = $routeParams.id
        sale.qty        = 0
        sale.price      = 0
        sale.length     = prompt('Enter coil length.')
        sale.void       = 0
        if (!sale.length)
            return
        $scope.sales.push(sale)
        sale.$save()
        setTimeout(function() {
            document.getElementById('sale-' + $scope.sales.length).select()
        }, 0)
    }
    $scope.selectItem = function(item) {
        $scope.searchItems = false
        var item    = new Item(item)
        item.qty    = 0
        item.weight = 0
        item.$save().then(function() {
            var sale        = new SaleItem()
            sale.name       = item.name
            sale.size       = item.size
            sale.sale_id    = $scope.sale.id
            sale.item_id    = item.id
            sale.qty        = 0
            sale.price      = 0
            sale.void       = 0
            sale.$save()
            $scope.sales.push(sale)
            setTimeout(function() {
                document.getElementById('sale-' + $scope.sales.length).select()
            }, 0)
        })
    }
    $scope.selectCustomer = function(customer) {
        $scope.searchCustomers = false
        $scope.searchSales = true
        $scope.searchSalesEntries = Sale.query({ customer_id: customer.id })
    }
    $scope.submit = function() {
        if ($scope.sale.void && !voidFlag)
            return

        function updateItems() {
            $scope.sales.forEach(function(sale) {
                sale.$update()
                if (sale.item_id) {
                    var item = new Item({id: sale.item_id})
                    item.$get().then(function() {
                        if (sale.void)
                            item.qty = 0
                        else
                            item.qty = -sale.qty
                        item.$update()
                    })
                }
            })
        }

        function save() {
            if (!$routeParams.id) {
                $scope.sale.customer_id = $scope.customer.id
                $scope.sale.void        = 0
                $scope.sale.$save().finally(function() {
                    $route.updateParams({id: $scope.sale.id})
                    $route.reload()
                })
            } else {
                $scope.sale.$update().then(updateItems).then(function() {
                    document.activeElement.blur()
                })
            }
        }

        if (!$scope.customer.id)
            $scope.customer.$save().then(save)
        else
            $scope.customer.$update().then(save)
    }
    $scope.description = function(sale) {
        if (sale.design) {
            return [
                sale.design,
                sale.color, 
                '(' + sale.code + ')',
                'x',
                sale.length
            ].join(' ')
        } else {
            return [sale.name, sale.size].join(' ')
        }
    }
    $scope.total = function() {
        var sum = 0
        $scope.sales.forEach(function(sale) {
            if (sale.void == 0)
                sum += sale.price * sale.qty
        })
        return sum
    }
    $scope.$on('keypress i', function() {
        if ($scope.sale.void)
            return

        if ($routeParams.id)
            $scope.searchItems = true
    })
    $scope.$on('keypress c', function() {
        if ($scope.sale.void)
            return

        if ($routeParams.id)
            $scope.searchDesigns = true
    })
    $scope.$on('keydown escape', function() {
        $scope.searchDesigns = false
        $scope.searchCoils = false
        $scope.searchItems = false
        $scope.searchCustomers = false
        $scope.searchSales = false
        document.activeElement.blur()
    })
    $scope.$on('keypress g', function() {
        var id = prompt('Enter order ID')
        gotoSaleById(id)
    })
    $scope.$on('keypress s', function() {
        $scope.searchCustomers = true
    })
    $scope.$on('keydown f9', function(e) {
        localStorage.removeItem('username')
        $scope.sale.username = setUser()
        focus()
    })
    $scope.$on('keypress n', function() {
        $route.updateParams({id: null})
        $route.reload()
        focus()
    })
    $scope.$on('keypress v', function() {
        if ($scope.sale.void)
            return
        
        var answer = prompt('Please enter order ID to void. To void this whole order, type "VOID".', '')
        if (answer == 'VOID') {
            voidOrder()
        } else {
            var orderId = parseInt(answer)
            if (orderId <= $scope.sales.length && orderId > 0) {
                var sale = $scope.sales[orderId - 1]
                sale.void = 1
                $scope.submit()
            }
        }
    })
    $scope.gotoSale = function(sale) {
        gotoSaleById(sale.id)
    }
    function voidOrder() {
        voidFlag            = true
        $scope.sale.void    = 1
        $scope.sales.forEach(function(sale) {
            sale.void = 1
        })
        $scope.submit()
    }
    function gotoSaleById(id) {
        if (!id)
            return
        $route.updateParams({id: id})
        $route.reload()
    }
})
