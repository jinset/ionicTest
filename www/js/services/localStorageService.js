/**
 * Created by JA on 09/22/2016.
 */

app.factory('localStorageSrv', [function(){
    return {
        set:function(object,value){
            return localStorage.setItem(object,JSON.stringify(value));
        },
        get:function(object){
            return JSON.parse(localStorage.getItem(object));
        },
        destroy:function(object){
            return localStorage.removeItem(object);
        },
    };
}]);
