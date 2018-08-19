'use strict';
Graphing.directive('donutGraph', ['$filter', function ($filter) {
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
                        .attr("height", minWidth)
                        .classed('svg-container', true)
                        .attr('viewBox', '0 0 ' + Math.min(width + margin.right, height + margin.top) + ' ' + Math.min(width + margin.right, height + margin.top))
                        .attr('preserveAspectRatio', 'xMinYMin')
                        .append("g")
                        .attr("transform", "translate(" + Math.min(width + margin.right, height + margin.top) / 2 + "," + Math.min(width + margin.right, height + margin.top) / 2 + ")")
                        .attr('viewBox', '0 0 ' + Math.min(width + margin.right, height + margin.top) + ' ' + Math.min(width + margin.right, height + margin.top))
                        .classed('svg-content-responsive', true);
            var radius = Math.min(width, height) / 2;
            var donutWidth = width / 5;

            var graphtip = d3.select("body").append("div")
                .attr("class", "graphtip")
                .style("opacity", 0);
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

            scope.donutGraph = function donutGraph() {
                var color = d3.scaleOrdinal(d3.schemeCategory20c);
                var arc = d3.arc()
                            .innerRadius(radius - donutWidth)
                            .outerRadius(radius);
                var pie = d3.pie()
                            .value(function (d) { return d.count; })
                            .sort(null);

                var path = svg.selectAll('path')
                                .data(pie(scope.ngModel))
                                .enter()
                                .append('path')
                                .attr('d', arc)
                                .attr('id', function (d, i) {
                                    return d.data.name.replace(' ', '');
                                })
                                .attr('class', 'pointer')
                                .attr('fill', function (d, i) {
                                    if (d.data.color) {
                                        var inputColor = d.data.color;
                                        var defaultColor = color(i);
                                        return inputColor;
                                    }
                                    else {
                                        return color(i);
                                    }
                                })
                                .style("opacity", .85)
                                .each(function (d) { this._current = d; });
                graphtip.append('div')
                  .attr('class', 'graphLabel bold');

                graphtip.append('div')
                  .attr('class', 'count');

                graphtip.append('div')
                  .attr('class', 'percent');

                path.on('mouseover', function (d) {
                    if (d.data.enabled) {
                        var total = d3.sum(scope.ngModel.map(function (d) {
                            return (d.enabled) ? d.count : 0;
                        }));
                        var percent = Math.round(1000 * d.data.count / total) / 10;
                        graphtip.transition().duration(0).style("opacity", 0);
                        graphtip.transition().duration(200).style("opacity", .9);
                        graphtip.style("left", (d3.event.pageX) + "px");
                        graphtip.style("top", (d3.event.pageY + 28) + "px");
                        graphtip.select('.graphLabel').html(d.data.name);
                        graphtip.select('.count').html(d.data.count + ' ' +  d.data.units);
                        graphtip.select('.percent').html(percent + '%');
                        try{
                            if (!d3.select(this).classed('transitioning')) {
                                d3.select(this).transition().duration(200).style("opacity", 1);
                                legend.select('#' + d.data.name.replace(' ', '')).transition().duration(200).style("opacity", 1);
                            }
                        }
                        catch(e)
                        {
                            var temp = e;

                        }
                    }
                });

                path.on('mouseout', function (d) {
                    graphtip.transition().duration(500).style("opacity", 0);
                    try{
                        if (!d3.select(this).classed('transitioning')) {
                            d3.select(this).transition().duration(200).style("opacity", .85);
                            legend.select('#' + d.data.name.replace(' ', '')).transition().duration(200).style("opacity", .85);
                        }
                    }
                    catch (e) {
                        var temp = e;
                    }
                });
                path.on('mousemove', function (d) {
                    graphtip.style("left", (d3.event.pageX) + "px");
                    graphtip.style("top", (d3.event.pageY + 28) + "px");
                    try {
                        if (!d3.select(this).classed('transitioning')) {
                            d3.select(this).transition().duration(200).style("opacity", 1);
                            legend.select('#' + d.data.name.replace(' ', '')).transition().duration(200).style("opacity", 1);
                        }
                    }
                    catch (e) {
                        var temp = e;
                    }
                });

                if (angular.isDefined(scope.queryUrl)) {
                    path.on('click', function (d) {
                        if (scope.queryUrl) {
                            window.open(scope.queryUrl + d.data.name);
                        }
                    });
                }

                var legendRectSize = 16;
                var legendSpacing = 4;
                var legend = svg.selectAll('.legend')
                  .data(scope.ngModel)
                  .enter()
                  .append('g')
                  .attr('class', 'legend')
                  .attr('transform', function (d, i) {
                      var height = legendRectSize + legendSpacing;
                      var offset = height * color.domain().length / 2;
                      var horz = -2 * legendRectSize;
                      var vert = i * height - offset;
                      return 'translate(' + horz + ',' + vert + ')';
                  });

                legend.append('rect')
                    .classed('rect', true)
                    .attr('width', legendRectSize)
                    .attr('height', legendRectSize)
                    .style('opacity', .85)
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
                        return d.enabled ? colr : 'transparent';
                    })
                    .attr('id', function (d, i) {
                        return d.name.replace(' ', '');
                    })
                    .style('stroke', function (d, i) {
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


                        return d.enabled ? colr : 'rgba(133, 134, 136, 1)';
                    })
                    .classed('notAllowed', function (d, i) {
                        return !d.enabled;
                    })
                    .classed('disabled', function (d, i) {
                        return !d.enabled;
                    })
                    .classed('pointer', function (d, i) {
                        return d.enabled;
                    })
                    .on('click', function (label) {
                        try{
                            svg.select('#' + label.name.replace(' ', '')).transition().duration(0).style("opacity", .85);
                        }
                        catch(e)
                        {}
                        var rect = d3.select(this);
                        var enabled = true;
                        label.enabled = true;
                        var totalEnabled = d3.sum(scope.ngModel.map(function (d) {
                            return (d.enabled) ? 1 : 0;
                        }));
                        var temp = rect.attr('class');
                        if (rect.attr('class').indexOf('disabled') > -1) {
                            rect.classed('disabled', false)
                        } else {
                            if (totalEnabled < 2) return;
                            rect.classed('disabled', true)
                            enabled = false;
                            label.enabled = false;
                        }
                        pie.value(function (d) {
                            if (d.label === label) {
                                d.enabled = enabled;
                            }
                            return (d.enabled) ? d.count : 0;
                        });
                        path = path.data(pie(scope.ngModel));
                        path.classed('transitioning', true)
                            .transition()
                          .duration(750)
                          .attrTween('d', function (d) {
                              var interpolate = d3.interpolate(this._current, d);
                              this._current = interpolate(0);
                              return function (t, i) {
                                  return arc(interpolate(t));
                              };
                          })
                       .on("end", function (s) {
                           path.classed('transitioning', false)
                       });

                    });
                legend.append('text')
                      .attr('x', legendRectSize + legendSpacing)
                      .attr('y', legendRectSize - legendSpacing)
                      .text(function (d) {
                          return d.name;
                      })
                      .classed('light', function (d, i) {
                          return d.count == 0;
                      });
            };
            scope.donutGraph();
        }
    };
}]);


var GraphItem = function GraphItem(name, count, units, color) {
    this.name = name;
    this.count = parseInt(count);
    this.enabled = true;
    this.color = color;
    this.units = units;
};
