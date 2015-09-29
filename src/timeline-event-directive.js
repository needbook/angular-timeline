'use strict';

/**
 * @ngdoc directive
 * @name angular-timeline.directive:timeline
 * @restrict AE
 *
 * @description
 * Represents an event occuring at a point in time, displayed on the left or the right
 * of the timeline line.
 *
 * You typically embed a `timeline-badge` and `timeline-panel` element within a `timeline-event`.
 */
var id = 0;
angular.module('angular-timeline').directive('timelineEvent', function($window) {

  function getElementOffset(element) {
    var de = document.documentElement;
    var box = element.getBoundingClientRect();
    var top = box.top + $window.pageYOffset - de.clientTop;
    var left = box.left + $window.pageXOffset - de.clientLeft;
    return {
      top: top,
      left: left
    };
  }

  var anim = function(element, prog) {
    if (prog === 1.0) {
      element.addClass('hidden');
    }
    else {
      element.removeClass('hidden');
    }
    element.children().css('top', (-60.0 * prog).toString() + 'px');
  };

  return {
    require: '^timeline',
    restrict: 'AE',
    transclude: true,
    template: '<li ng-transclude></li>',
    link: function(scope, element, attrs) {
      var i = id++;
      angular.element($window).bind('scroll', function() {
        var imagePos = getElementOffset(element[0]).top;
        var progress = 0.0;
        if (imagePos - $window.pageYOffset < 0) {
          progress = 1.0;
        }
        else if (imagePos - $window.pageYOffset < 60) {
          progress = 1.0 - ((imagePos - $window.pageYOffset) / 60);
        }
        element.animationProgress = progress;
        anim(element, progress);
      });
    }
  };
});
