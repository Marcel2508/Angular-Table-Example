var app = angular.module("yourApplication",[]);//Initiating your Angular App

app.controller("yourTableController",["$scope","$http",function($scope,$http){ // Initiating your Table contoller (needs $scope (for Template interaction and $http for xhr Requests)


  $scope.data = null;//Array containing your Table Data Rows
  $scope.meta = null;//Object containing Meta information for rendering your Table
  $scope.reverseSort = false;//When true -> Reverse sorting of your Table (abc -> cba)
  $scope.sortByCol = null;//Column Name which should be used to sort the table
  $scope.categorySelected = -1;//Selected Category (buttons above)
  $scope.limit = null;//How much rows to show


  $scope.categoryFilter = function(x){//This function filters rows for Category
    if($scope.categorySelected===-1)return true;
    else return x._category===$scope.categorySelected;
  };

  $scope.setCategory = function(id){//This function  sets the selected Category on button click
    if($scope.categorySelected===id)$scope.categorySelected=-1;
    else $scope.categorySelected=id;
  };

  $scope.sortFunction = function(a,b){//This function is the Comparator for Sorting by COlumn
    return a.value.localeCompare(b.value);
  };

  $scope.setSortOrder = function(key){//this function sets the column to sort by (inverse)
    if($scope.sortByCol===key)$scope.reverseSort=!$scope.reverseSort;
    else $scope.sortByCol = key;
  };

  $scope.init = function(){//Initiate the table by loading JSON data
    $scope.data = null;
    $scope.meta = null;
    $scope.reverseSort = false;
    $scope.sortBy = "";
    $scope.categorySelected = -1;

    ////// THIS IS ONLY BECAUSE I TESTED IT WITHOUT A WEBSERVER
    ////// AND CHROME BLOCKS CORS ON file:// REQUESTS -.- ^^
    ///// YOU CAN REMOVE THE COMPLETE BLOCK BETWEEN THIS TWO COMMENTS ... (1)
    var res = { "data":[ { "command":"123", "description":"hello world", "usage":"/test123", "permission":"test-perm", "_category":1 }, { "command":"germany", "description":"hallo welt", "usage":"/Deutschland<3", "permission":"germany", "_category":2 }, { "command":"fufu", "description":"yuyu", "usage":"/mumu", "permission":"dudu", "_category":3 } ], "meta":{ "cols":[ {"display":"Command","key":"command"}, {"display":"Description","key":"description"}, {"display":"Usage","key":"usage"}, {"display":"Permission","key":"permission"} ], "defaultSortOrder":"command", "defaultLimitIndex":0, "categories":[ {"display":"Core","id":1}, {"display":"Info","id":2}, {"display":"Games","id":3} ], "limits":[ {"display":"2","amount":2}, {"display":"5","amount":5}, {"display":"10","amount":10}, {"display":"20","amount":20}, {"display":"50","amount":50}, {"display":"100","amount":100} ] } };
    $scope.sortByCol = res.meta.defaultSortOrder;
    $scope.limit = res.meta.limits[res.meta.defaultLimitIndex];
    $scope.data = res.data;
    $scope.meta = res.meta;
    return;
    ///// YOU CAN REMOVE THE COMPLETE BLOCK BETWEEN THIS TWO COMMENTS ... (2)

    //HTTP request to data.json. -- not working with file://
    $http({url:"data.json",method:"GET"}).then(function(res){
      $scope.sortByCol = res.data.meta.defaultSortOrder;
      $scope.limit = res.data.meta.limits[res.data.meta.defaultLimitIndex];

      $scope.data = res.data.data;
      $scope.meta = res.data.meta;

      console.log("DATA LOADED...")

    }).catch(function(err){
      console.error(err);
      alert("Error while loading data!!! See console for details!");
    });
  };

  $scope.init();//Calling the init function
}]);
