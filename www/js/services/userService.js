(function() {
  'use strict';
  angular
    .module('starter')
    .service('UserSrv', loadService);
  loadService.$inject = ['$document', '$q', '$timeout', '$firebaseArray'];

  function loadService($document, $q, $timeout, $firebaseArray) {


    var _createUser = function(user) {
      return $q(function(resolve, reject) {
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then(function(firebaseUser) {
          _addUser(firebaseUser.uid, user); // el uid es la URL que crea en el auth del firebase
          resolve(firebaseUser);
        }).catch(function(error) {
          reject(error);
        });
      })
    }

    // Aqui agrega la informacion restante del usuario
    var _addUser = function(uid, user) {
      return $q(function(resolve, reject) {
        firebase.database().ref().child('users/' + uid).update({
          name: user.name,
          resident: user.resident,
          photoUrl: user.photo
        }).catch(function(error) {
          reject(error);
        });
      });
    }

    var _deleteUser = function(id) {
      return $q(function(resolve, reject) {
        firebase.database().ref().child('users/' + id).remove();
      });
    }

    var _updateUser = function(id, array) {
      return $q(function(resolve, reject) {
        firebase.database().ref().child('users/' + id).update({
          lastName: array.lastName,
          name: array.name,
          phoneNumber: array.phoneNumber
        });
      });
    }

    var _loadUsers = function() {
      return $q(function(resolve, reject) {
        var users = [];
        var lista = $firebaseArray(firebase.database().ref("users"));
        lista.$loaded()
          .then(function() {
            angular.forEach(lista, user => {
              if (user.status != "inactivo") {
                users.push(user);
              }

            })
            resolve(users)
          });
      });
    }


    return {
      createUser: _createUser,
      deleteUser: _deleteUser,
      updateUser: _updateUser,
      loadUsers: _loadUsers
    }

  }




})();
