var app = angular.module("cakeBot",[]);//Initiating your Angular App

app.directive("interactiveTable",["$http",function($http){ // Initiating your Table directive (needs $scope (for Template interaction and $http for xhr Requests)
  return {
    restrict: "A",
    templateUrl:"table-template.html",
    replace:true,
    scope:{
      interactiveTable:"@"
    },
    link:function($scope,$element,attr){
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

      $scope.init = function(url){//Initiate the table by loading JSON data
        $scope.data = null;
        $scope.meta = null;
        $scope.reverseSort = false;
        $scope.sortBy = "";
        $scope.categorySelected = -1;

        //HTTP request to data.json. -- not working with file://
        $http({url:url,method:"GET"}).then(function(res){
          $scope.sortByCol = res.data.meta.defaultSortOrder;
          $scope.limit = res.data.meta.limits[res.data.meta.defaultLimitIndex];
          $scope.categorySelected = res.data.meta.defaultCategory;

          $scope.data = res.data.data;
          $scope.meta = res.data.meta;

          console.log("DATA LOADED...")

        }).catch(function(err){
          console.error(err);
          alert("Error while loading data!!! See console for details!");
        });
      };

      //$scope.init();//Calling the init function

      $scope.$watch(attr.interactiveTable,function(val){
        $scope.init($scope.interactiveTable.replace(/'/gim,"").trim());
      });
    }
  };
}]);
