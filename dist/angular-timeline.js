'use strict';
angular.module('angular-timeline', []);// Source: src/timeline-badge-directive.js
/**
 * @ngdoc directive
 * @name angular-timeline.directive:timeline-badge
 * @restrict AE
 *
 * @description
 * Shown in the centre pane (or left on narrow devices) to indicate the activity.
 */
angular.module('angular-timeline').directive('timelineBadge', function() {
  return {
    require: '^timelineEvent',
    restrict: 'AE',
    transclude: true,
    template: '<div ng-transclude class="timeline-badge"></div>'
  };
});

// Source: src/timeline-directive.js
/**
 * @ngdoc directive
 * @name angular-timeline
 * @restrict AE
 *
 * @description
 * Primary container for displaying a vertical set of timeline events.
 */
angular.module('angular-timeline').directive('timeline', function() {
  return {
    restrict: 'AE',
    transclude: true,
    scope: {
      side: '@'
    },
    controller: function() {},
    template: '<ul class="timeline"><li class="timeline-beginning"></li><div ng-transclude></div></ul>'
  };
});

// Source: src/timeline-event-directive.js
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
    element.children().css('top', (-100.0 * prog).toString() + 'px');
    element.children().css('opacity', 1.0 - prog);
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
        else if (imagePos - $window.pageYOffset < 100) {
          progress = 1.0 - ((imagePos - $window.pageYOffset) / 100);
        }
        element.animationProgress = progress;
        anim(element, progress);
      });
    }
  };
});

// Source: src/timeline-footer-directive.js
/**
 * @ngdoc directive
 * @name angular-timeline.directive:timeline-footer
 * @restrict AE
 *
 * @description
 * Optional element to add a footer section to the `timeline-panel` for links or other actions.
 */
angular.module('angular-timeline').directive('timelineFooter', function() {
  return {
    require: '^timelinePanel',
    restrict: 'AE',
    transclude: true,
    template: '<div class="timeline-footer" ng-transclude></div>'
  };
});

// Source: src/timeline-heading-directive.js
/**
 * @ngdoc directive
 * @name angular-timeline.directive:timeline-heading
 * @restrict AE
 *
 * @description
 * Optional element to show the heading for a `timeline-panel`.
 */
angular.module('angular-timeline').directive('timelineHeading', function() {
  return {
    require: '^timelinePanel',
    restrict: 'AE',
    transclude: true,
    template: '<div class="timeline-heading" ng-transclude></div>'
  };
});

// Source: src/timeline-panel-directive.js
/**
 * @ngdoc directive
 * @name angular-timeline.directive:timeline-panel
 * @restrict AE
 *
 * @description
 * An panel inside the `timeline-event` which shows detailed information about the event.
 */
angular.module('angular-timeline').directive('timelinePanel', function() {
  return {
    require: '^timeline',
    restrict: 'AE',
    transclude: true,
    template: '<div class="timeline-panel" ng-transclude></div>'
  };
});
