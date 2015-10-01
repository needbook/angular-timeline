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
    element.children().css('top', (-100.0 * prog).toString() + 'px');
    element.children().css('opacity', 1.0 - prog);
  };

  return {
    require: '^timeline',
    restrict: 'AE',
    transclude: true,
    template: '<li ng-transclude></li>',
    link: function(scope, element, attrs) {
      var containerYOffset = getElementOffset(element.parent().parent()[0]).top;
      angular.element($window).bind('scroll', function() {
        var offset = $window.pageYOffset - containerYOffset;
        var imagePos = getElementOffset(element[0]).top;
        var progress = 0.0;
        if (imagePos - offset < 0) {
          progress = 1.0;
        }
        else if (imagePos - offset < 180) {
          progress = 1.0 - ((imagePos - offset) / 180);
        }
        element.animationProgress = progress;
        anim(element, progress);
      });
    }
  };
});
