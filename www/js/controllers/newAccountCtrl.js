app.controller('NewAccountCtrl', function($scope, $firebaseArray, localStorageSrv, UserSrv) {
  $scope.user = {
    password: "",
    resident: "",
    email: "",
    password: "",
    photo: ""
  }

  $scope.newUser = function(user){
    console.log(user);
    UserSrv.createUser(user);
  }
})
