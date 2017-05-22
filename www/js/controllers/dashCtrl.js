app.controller('DashCtrl', function($scope, $firebaseArray) {
  $scope.data = {
    dato1 : "",
    dato2 : ""
  }

  $scope.addAlgo = function(data) {
    var refAdd = firebase.database().ref("algo");
    var xcosa = refAdd.push();
    xcosa.set(data, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log("exito");
      }

    });
  }
})
