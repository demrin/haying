/**
 * Created by wp on 2016-08-31.
 */
var app = angular.module('App', []);

app.directive('showSelect',function(){
	return{
		scope: true,//共享父scope
		restrict: 'AC',
		replace: false,
		link: function($scope, element, attrs,ctrl) {
			element[0].onclick=function(event){
				$('.houseAbsolute').hide();
				$(".selectInput").hide();
				var $this=element;
				$this.next().show();
				event.stopPropagation();
			};
		}
	}
});