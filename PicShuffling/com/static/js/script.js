var myApp = angular.module("myApp",["ngAnimate"]);
myApp.controller("sliderCtrl",["$scope",function($scope){
    $scope.images = [];
    // 多少张图片
    for (var i = 1; i <= 5; i++) {
        $scope.images.push({
            "src":"./static/img/"+ i + ".jpg"
        });
    }
}]);
//
myApp.directive("slider",function($timeout){
    return  {
        restrict:"EA",
        replace:true,
        scope:{
            images:"="
        },
        templateUrl:"slider.tpl.html",
        link:function(scope,element,attrs){
            scope.current = 0;
            scope.totalNumber = scope.images.length;
            scope.next = function(){
                if(scope.current < scope.totalNumber - 1){
                    scope.current = scope.current + 1;
                }else{
                    scope.current = 0;
                }
            };
            scope.prev = function(){
                if(scope.current > 0){
                    scope.current = scope.current - 1;
                }else{
                    scope.current = scope.totalNumber - 1;
                }
            };
            //
            var timer = null;
            var autoPlay = function(){
                timer = $timeout(function(){
                    scope.next();
                    // time 1S
                    timer = $timeout(autoPlay,1000);
                },1000)
            };
            //autoPlay();
            if(attrs.auto == "true"){
                autoPlay();
            };
            //鼠标移上去停止播放
            element.on("mouseover",function(){
                $timeout.cancel(timer);
            });
            //鼠标移出继续播放
            element.on("mouseout",function(){
                autoPlay();
            });
            //
            scope.$on('$destroy',function(){
                $timeout.cancel(timer);
            });
        }
    }
});