'use strict';

angular.module('wlsApp', [
	'ui.router',
	'ui.bootstrap',
	'ui.bootstrap.tpls',
	'd3'
])
.controller('wlsController', ['$scope', 'd3Service', function($scope, d3Service) {
	$scope.alpha = { range: [4, 8, 15, 42, 23, 16 ], two: 'Data Set 1' };
	$scope.beta = { range: [8, 3, 19, 16, 7, 26 ], two: 'Data Set 2' };
}])
.directive('wlsBarchart1', ['d3Service', function(d3Service) {
	return {
		restrict: 'E',
		scope: {
			alpha:'=',
			beta:'='
		},
		templateUrl: 'templates/wls-chart1.html',

		link: function($scope, element, attrs) {
			d3Service.d3().then(function(d3) {

			function barChart(data, svgRegion, width, barHeight) {
				var x = d3.scale.linear()
				    .domain([0, d3.max(data)])
				    .range([0, width]);

				var chart = d3.select(svgRegion)
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
				    .attr("x", function(d) { return x(d) - 16; })
				    .attr("y", barHeight / 2)
				    .attr("dy", ".35em")
				    .text(function(d) { return d; });
			}
			
			barChart($scope.alpha.range, ".wls-chart1", 420, 20);			
			barChart($scope.beta.range, ".wls-chart2", 420, 20);
			});
		}
	};
}]);