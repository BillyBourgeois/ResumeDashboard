'use strict';
Graphing.directive('barGraph', ['$filter', function ($filter) {
    return {
        restrict: 'E',
        require: '^ngModel',
        scope: {
            ngModel: '=',
            queryUrl: '@?'
        },
        link: function (scope, elem, attrs) {
            scope.ngModel = $filter('orderBy')(scope.ngModel, 'name')
            angular.forEach(scope.ngModel, function (item) {
                var en = item.count > 0
                item.enabled = item.count > 0;
            });
            var margin = { top: 20, right: 20, bottom: 30, left: 40 };
            var width = 250;
            var height = 250;
            var spinner = $(elem[0]).closest('.spinner');
            var minWidth = Math.min(Math.max($(elem[0]).width(), spinner.width()), 400);
            var svg = d3.select(elem[0]).append("svg")
                        .attr("width", minWidth)
                        .attr("height", minWidth)                        //.attr("height", $(minWidth - margin.bottom))
                        .classed('svg-container', true)
                        .attr('viewBox', '0 -4 ' + Math.min(width+4, height +4) + ' ' + Math.min(width+4, height+4))
                        .attr('preserveAspectRatio', 'xMinYMin')
            .append("g")
                        //.attr("transform", "translate(" + Math.min(width + margin.right, height + margin.top) / 2 + "," + Math.min(width + margin.right, height + margin.top) / 2 + ")")
                        .attr('viewBox', '0 0 ' + Math.min(width + margin.right, height + margin.top) + ' ' + Math.min(width + margin.right, height + margin.top))
                        .classed('svg-content-responsive', true);;

            var graphtip = d3.select("body").append("div")
                .attr("class", "graphtip")
                .style("opacity", 0);
            graphtip.append('div')
                    .attr('class', 'graphLabel bold');

            graphtip.append('div')
                    .attr('class', 'count');

            graphtip.append('div')
                    .attr('class', 'percent');
            scope.$watch(function () { return $(elem[0]).width(); }, function (newVal, oldVal) {
                if (newVal != oldVal && newVal != 0 && Math.abs(newVal - oldVal) > 30) {
                    if (newVal > 400) {
                        $(elem[0]).find('.svg-container').height(400);
                        $(elem[0]).find('.svg-container').width(400);
                    }
                    else {
                        $(elem[0]).find('.svg-container').height(newVal);
                    }
                }
            });

            scope.eraseGraph = function eraseGraph() {
                svg.selectAll('*').remove();
            };

            scope.barGraph = function barGraph() {
                var color = d3.scaleOrdinal(d3.schemeCategory20c);
                var xAxisHeight = 20;
                var yAxisWidth = 20;
                var x = d3.scaleBand()
                          .range([yAxisWidth, width-margin.right])
                          .padding(.1);

                x.domain(scope.ngModel.map(function (d) { return d.name; }));

                var y = d3.scaleLinear()
                        .range([height, xAxisHeight]);
                y.domain([0, d3.max(scope.ngModel, function (d) { return d.count; })]);


                var bars = svg.selectAll(".bar")
                                .data(scope.ngModel)
                                .enter().append("rect")
                                .attr("class", "bar")
                                .attr("x", function (d) {
                                    return x(d.name);
                                })
                                .attr('fill', function (d, i) {
                                    var colr;
                                    if (d.color) {
                                        var inputColor = d.color;
                                        var defaultColor = color(i);
                                        colr = inputColor;
                                    }
                                    else {
                                        colr = color(i);
                                    }
                                    var inputColor = d.color;
                                    var defaultColor = color(i);
                                    return  colr;

                                    //var inputColor = d.color;
                                    //var defaultColor = color(i);
                                    //return inputColor;
                                })
                                .attr("width", x.bandwidth())

                                .attr("y", function (d) { return y(d.count) - xAxisHeight; })
                                .attr("height", function (d) {
                                    return (height) - y(d.count);
                                });
                bars.classed('pointer', true);;

                bars.on('mouseover', function (d) {
                    var total = d3.sum(scope.ngModel.map(function (d) {
                        return (d.enabled) ? d.count : 0;
                    }));
                    var percent = Math.round(1000 * d.count / total) / 10;
                    graphtip.transition().duration(0).style("opacity", 0);
                    graphtip.transition().duration(200).style("opacity", .9);
                    graphtip.style("left", (d3.event.pageX) + "px");
                    graphtip.style("top", (d3.event.pageY + 28) + "px");
                    graphtip.select('.graphLabel').html(d.name);
                    graphtip.select('.count').html(d.count + ' ' + d.units);
                    graphtip.select('.percent').html(percent + '%');
                });
                bars.on('mouseout', function () {
                    graphtip.transition().duration(500).style("opacity", 0);
                });
                bars.on('mousemove', function (d) {
                    graphtip.style("left", (d3.event.pageX) + "px");
                    graphtip.style("top", (d3.event.pageY + 28) + "px");
                });

                if (angular.isDefined(scope.queryUrl)) {
                    bars.on('click', function (d) {
                        if (scope.queryUrl) {
                            window.open(scope.queryUrl + d.name);
                        }
                    });
                }

                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + (height - xAxisHeight) + ")")
                    .call(d3.axisBottom(x))
                    .selectAll("text")
                    .style('font-size', '8px')
                    .style("text-anchor", "start")
                    .attr("dx", "0em")
                    .attr("dy", ".5em")
                    .attr("transform", "rotate(10)")
                    .classed('light', function (d, i) {                        
                        return scope.ngModel[i].count == 0;
                    });
                svg.append("g")
                    .attr("transform", "translate(" + (yAxisWidth) + "," + (-xAxisHeight) + ")")
                    .call(d3.axisLeft(y))
                    .style('font-size', '8px');
            };
            scope.barGraph();
        }
    };
}]);

