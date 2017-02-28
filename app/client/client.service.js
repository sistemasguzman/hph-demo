(function () {
    'use strict';
    angular
        .module('myApp')
        .factory('ClientService', ClientService);

    ClientService.$inject = ['$http'];

    function ClientService($http) {
        return {
            getCountries: function () {
                return $http.get('app/client/countries.json')
                    .then(function (response) {
                        return response.data;
                    });
            },
            getTerminals: function () {
                var terminals = [
                    {
                        code: 'ICAVE', Name: 'Veracruz',
                    },
                    {
                        code: 'TIMZA', Name: 'Manzanillo'
                    }
                ];

                return terminals;
            },
            getPatentesByTerminalRfc: function (rfc, terminalCode) {
                var data = [
                    {
                        Code: 'ICAVE', Name: 'Veracruz', Rfc: '123',
                        Brokers: [
                            {
                                Code: 'abc', Name: 'brokerabc', Rfc: '123'
                            },
                            {
                                Code: 'abd', Name: 'brokerabd', Rfc: '123'
                            },
                            {
                                Code: 'abe', Name: 'brokerabe', Rfc: '123'
                            }
                        ]
                    },
                    {
                        Code: 'TIMZA', Name: 'Manzanillo', Rfc: '124',
                        Brokers: [
                            {
                                Code: 'bbc', Name: 'brokerbbc', Rfc: '124'
                            },
                            {
                                Code: 'bbd', Name: 'brokerbbd', Rfc: '124'
                            },
                            {
                                Code: 'bbe', Name: 'brokerbbe', Rfc: '124'
                            }
                        ]
                    }
                ];
                for (var i = 0; i < data.length; i++) {
                    if (data[i].Rfc === rfc && data[i].Code === terminalCode) {
                        return data[i];
                    }
                }
                return [];
            }
        }
    }
})();