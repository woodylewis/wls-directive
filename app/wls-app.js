'use strict';

// Declare app level module which depends on views, and components
angular.module('wlsApp', [
	'ui.router',
	'ui.bootstrap',
	'ui.bootstrap.tpls'
])
.controller('wlsController', ['$scope', function($scope) {
	$scope.alpha = { one: [4, 8, 15, 16, 23, 42], two: 'Alpha Value' };
}])
.directive('wlsChart1', function() {
	return {
		restrict: 'E',
		scope: {
			handle:'=',
		},
		templateUrl: 'templates/wls-chart1.html',

		link: function($scope, element, attrs) {
			var data = $scope.handle.one;
			
			var width = 500,
			    barHeight = 20;

			var x = d3.scale.linear()
			    .domain([0, d3.max(data)])
			    .range([0, width]);

			var chart = d3.select(".wls-chart")
			    .attr("width", width)
			    .attr("height", barHeight * data.length);

			var bar = chart.selectAll("g")
			    .data(data)
			  .enter().append("g")
			    .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

			bar.append("rect")
			    .attr("width", x)
			    .attr("height", barHeight - 1);

			bar.append("text")
			    .attr("x", function(d) { return x(d) - 3; })
			    .attr("y", barHeight / 2)
			    .attr("dy", ".35em")
			    .text(function(d) { return d; });
		}
	};
});
