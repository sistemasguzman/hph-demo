(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('ClientController', ClientController)
        .directive('clientDirective', ClientDirective)
        .directive('myDropKick', myDropKick);

    ClientController.$inject = ['ClientService'];

    function myDropKick() {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                console.log(attrs);
            }
        };
    }

    function ClientDirective() {
        return {
            restrict: 'A',
            scope: {
                text: '@myText',
                twoWayBind: '=myTwoWayBind',
                oneWayBind: '&myOneWayBind',
                reverse: '&reverse'
            },
            link: function (scope, element, attrs) {
                //scope.twoWayBind.name = 'Sushi';
                scope.oneWayBind();
                var res = scope.reverse();
                console.log(res);

            }
        };
    }

    function ClientController(ClientService) {
        var vm = this;
        vm.name = 'Esteban Guzmán Zerafín';
        vm.foo = { name: 'Umur' };
        vm.color = 'red';
        vm.terminals = [];
        vm.terminal = {};
        vm.brokersAssociated = [];
        vm.countries = [];

        vm.activate = activate;
        vm.getPatentesByTerminalRfc = getPatentesByTerminalRfc;
        vm.associate = associate;
        vm.desassociate = desassociate;
        vm.viewValue = viewValue;
        vm.reverse = reverse;

        function reverse() {
            return vm.name.split('').reverse().join('');
        }

        function viewValue() {
            console.log(vm.foo);
        }


        function activate() {
            vm.terminals = ClientService.getTerminals();
            ClientService.getCountries()
                .then(function (response) {
                    vm.countries = response;
                    $('#countries').dropkick({
                        mobile: true
                    });
                })
        }

        function associate(broker, terminalName, index) {
            if (!existsBrokerAssociated(broker.Code)) {
                vm.terminal.Brokers.splice(index, 1);
                vm.brokersAssociated.push({ broker: broker, terminalName: terminalName });
            } else {
                swal({
                    text: 'Ya has asociado esta patente..',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    type: 'info'
                });
            }
        }

        function desassociate(index) {
            vm.brokersAssociated.splice(index, 1);
        }

        function existsBrokerAssociated(code) {
            for (var i = 0; i < vm.brokersAssociated.length; i++) {
                if (vm.brokersAssociated[i].broker.Code === code) {
                    return true;
                }
            }
            return false;
        }

        function getPatentesByTerminalRfc(rfc, terminalCode) {
            vm.terminal = ClientService.getPatentesByTerminalRfc(rfc, terminalCode);
            console.log(vm.terminal);
        }

        activate();

    }
})();