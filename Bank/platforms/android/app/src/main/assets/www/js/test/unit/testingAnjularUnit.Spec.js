describe('Sample test', function() {
  it('Condition is true', function() {
    expect('AngularJS').toBe('AngularJS');
  });
});

describe("AppController", function() {
    var $scope;
    var controller;

    beforeEach(function() {

         module("BankApp");

        inject(function(_$rootScope_, $controller) {

            $scope = _$rootScope_.$new();
            controller = $controller("AppController", {$scope: $scope});

        });

    });

    it("Should say hello", function() {
        expect($scope.Id).toBe(5);
    });

});
/*describe('AppController', function() {
  beforeEach(module('BankApp'));

  var $controller, $rootScope;

  beforeEach(inject(function(_$controller_, _$rootScope_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
    $rootScope = _$rootScope_;
  }));

  describe('$scope.grade', function() {
    it('sets the strength to "strong" if the password length is >8 chars', function() {
      var $scope = $rootScope.$new();
      var controller = $controller('AppController', { $scope: $scope });
      $scope.password = 'longerthaneightchars';
      $scope.grade();
      expect($scope.strength).toEqual('strong');
    });
  });
});*/