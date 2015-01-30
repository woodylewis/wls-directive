'use strict';

// Declare app level module which depends on views, and components
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
			handle1:'=',
			handle2:'=',
		},
		templateUrl: 'templates/wls-chart1.html',

		link: function($scope, element, attrs) {
			d3Service.d3().then(function(d3) {

			var data1 = $scope.handle1.range;
			
			var width = 420,
			    barHeight = 20;

			var x = d3.scale.linear()
			    .domain([0, d3.max(data1)])
			    .range([0, width]);

			var chart = d3.select(".wls-chart1")
			    .attr("width", width)
			    .attr("height", barHeight * data1.length);

			var bar = chart.selectAll("g")
			    .data(data1)
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

			var data2 = $scope.handle2.range;
			
			var width = 420,
			    barHeight = 20;

			var x = d3.scale.linear()
			    .domain([0, d3.max(data2)])
			    .range([0, width]);

			var chart = d3.select(".wls-chart2")
			    .attr("width", width)
			    .attr("height", barHeight * data2.length);

			var bar = chart.selectAll("g")
			    .data(data2)
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
			});
		}
	};
}])
/*
.directive('wlsBarchart2', ['d3Service', function(d3Service) {
	return {
		restrict: 'E',
		scope: {
			handle2:'=',
		},
		templateUrl: 'templates/wls-chart2.html',

		link: function($scope, element, attrs) {
			d3Service.d3().then(function(d3) {

			var data = $scope.handle2.range;
			
			var width = 420,
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
			    .attr("x", function(d) { return x(d) - 16; })
			    .attr("y", barHeight / 2)
			    .attr("dy", ".35em")
			    .text(function(d) { return d; });
			});
		}
	};
}])*/;