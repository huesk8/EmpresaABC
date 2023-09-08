//;(function(window, document, undefined) {
//  "use strict";
  
//  (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//'use strict';

//var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

//Object.defineProperty(exports, '__esModule', {
//  value: true
//});
//// SweetAlert
//// 2014-2015 (c) - Tristan Edwards
//// github.com/t4t5/sweetalert

///*
// * jQuery-like functions for manipulating the DOM
// */

//var _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation = require('./modules/handle-dom');

///*
// * Handy utilities
// */

//var _extend$hexToRgb$isIE8$logStr$colorLuminance = require('./modules/utils');

///*
// *  Handle sweetAlert's DOM elements
// */

//var _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition = require('./modules/handle-swal-dom');

//// Handle button events and keyboard events

//var _handleButton$handleConfirm$handleCancel = require('./modules/handle-click');

//var _handleKeyDown = require('./modules/handle-key');

//var _handleKeyDown2 = _interopRequireWildcard(_handleKeyDown);

//// Default values

//var _defaultParams = require('./modules/default-params');

//var _defaultParams2 = _interopRequireWildcard(_defaultParams);

//var _setParameters = require('./modules/set-params');

//var _setParameters2 = _interopRequireWildcard(_setParameters);

///*
// * Remember state in cases where opening and handling a modal will fiddle with it.
// * (We also use window.previousActiveElement as a global variable)
// */
//var previousWindowKeyDown;
//var lastFocusedButton;

///*
// * Global sweetAlert function
// * (this is what the user calls)
// */
//var sweetAlert, swal;

//exports['default'] = sweetAlert = swal = function () {
//  var customizations = arguments[0];

//  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.addClass(document.body, 'stop-scrolling');
//  _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.resetInput();

//  /*
//   * Use argument if defined or default value from params object otherwise.
//   * Supports the case where a default value is boolean true and should be
//   * overridden by a corresponding explicit argument which is boolean false.
//   */
//  function argumentOrDefault(key) {
//    var args = customizations;
//    return args[key] === undefined ? _defaultParams2['default'][key] : args[key];
//  }

//  if (customizations === undefined) {
//    _extend$hexToRgb$isIE8$logStr$colorLuminance.logStr('SweetAlert expects at least 1 attribute!');
//    return false;
//  }

//  var params = _extend$hexToRgb$isIE8$logStr$colorLuminance.extend({}, _defaultParams2['default']);

//  switch (typeof customizations) {

//    // Ex: swal("Hello", "Just testing", "info");
//    case 'string':
//      params.title = customizations;
//      params.text = arguments[1] || '';
//      params.type = arguments[2] || '';
//      break;

//    // Ex: swal({ title:"Hello", text: "Just testing", type: "info" });
//    case 'object':
//      if (customizations.title === undefined) {
//        _extend$hexToRgb$isIE8$logStr$colorLuminance.logStr('Missing "title" argument!');
//        return false;
//      }

//      params.title = customizations.title;

//      for (var customName in _defaultParams2['default']) {
//        params[customName] = argumentOrDefault(customName);
//      }

//      // Show "Confirm" instead of "OK" if cancel button is visible
//      params.confirmButtonText = params.showCancelButton ? 'Confirm' : _defaultParams2['default'].confirmButtonText;
//      params.confirmButtonText = argumentOrDefault('confirmButtonText');

//      // Callback function when clicking on "OK"/"Cancel"
//      params.doneFunction = arguments[1] || null;

//      break;

//    default:
//      _extend$hexToRgb$isIE8$logStr$colorLuminance.logStr('Unexpected type of argument! Expected "string" or "object", got ' + typeof customizations);
//      return false;

//  }

//  _setParameters2['default'](params);
//  _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.fixVerticalPosition();
//  _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.openModal(arguments[1]);

//  // Modal interactions
//  var modal = _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.getModal();

//  /*
//   * Make sure all modal buttons respond to all events
//   */
//  var $buttons = modal.querySelectorAll('button');
//  var buttonEvents = ['onclick', 'onmouseover', 'onmouseout', 'onmousedown', 'onmouseup', 'onfocus'];
//  var onButtonEvent = function onButtonEvent(e) {
//    return _handleButton$handleConfirm$handleCancel.handleButton(e, params, modal);
//  };

//  for (var btnIndex = 0; btnIndex < $buttons.length; btnIndex++) {
//    for (var evtIndex = 0; evtIndex < buttonEvents.length; evtIndex++) {
//      var btnEvt = buttonEvents[evtIndex];
//      $buttons[btnIndex][btnEvt] = onButtonEvent;
//    }
//  }

//  // Clicking outside the modal dismisses it (if allowed by user)
//  _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.getOverlay().onclick = onButtonEvent;

//  previousWindowKeyDown = window.onkeydown;

//  var onKeyEvent = function onKeyEvent(e) {
//    return _handleKeyDown2['default'](e, params, modal);
//  };
//  window.onkeydown = onKeyEvent;

//  window.onfocus = function () {
//    // When the user has focused away and focused back from the whole window.
//    setTimeout(function () {
//      // Put in a timeout to jump out of the event sequence.
//      // Calling focus() in the event sequence confuses things.
//      if (lastFocusedButton !== undefined) {
//        lastFocusedButton.focus();
//        lastFocusedButton = undefined;
//      }
//    }, 0);
//  };

//  // Show alert with enabled buttons always
//  swal.enableButtons();
//};

///*
// * Set default params for each popup
// * @param {Object} userParams
// */
//sweetAlert.setDefaults = swal.setDefaults = function (userParams) {
//  if (!userParams) {
//    throw new Error('userParams is required');
//  }
//  if (typeof userParams !== 'object') {
//    throw new Error('userParams has to be a object');
//  }

//  _extend$hexToRgb$isIE8$logStr$colorLuminance.extend(_defaultParams2['default'], userParams);
//};

///*
// * Animation when closing modal
// */
//sweetAlert.close = swal.close = function () {
//  var modal = _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.getModal();

//  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.fadeOut(_sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.getOverlay(), 5);
//  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.fadeOut(modal, 5);
//  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass(modal, 'showSweetAlert');
//  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.addClass(modal, 'hideSweetAlert');
//  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass(modal, 'visible');

//  /*
//   * Reset icon animations
//   */
//  var $successIcon = modal.querySelector('.sa-icon.sa-success');
//  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass($successIcon, 'animate');
//  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass($successIcon.querySelector('.sa-tip'), 'animateSuccessTip');
//  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass($successIcon.querySelector('.sa-long'), 'animateSuccessLong');

//  var $errorIcon = modal.querySelector('.sa-icon.sa-error');
//  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass($errorIcon, 'animateErrorIcon');
//  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass($errorIcon.querySelector('.sa-x-mark'), 'animateXMark');

//  var $warningIcon = modal.querySelector('.sa-icon.sa-warning');
//  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass($warningIcon, 'pulseWarning');
//  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass($warningIcon.querySelector('.sa-body'), 'pulseWarningIns');
//  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass($warningIcon.querySelector('.sa-dot'), 'pulseWarningIns');

//  // Reset custom class (delay so that UI changes aren't visible)
//  setTimeout(function () {
//    var customClass = modal.getAttribute('data-custom-class');
//    _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass(modal, customClass);
//  }, 300);

//  // Make page scrollable again
//  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass(document.body, 'stop-scrolling');

//  // Reset the page to its previous state
//  window.onkeydown = previousWindowKeyDown;
//  if (window.previousActiveElement) {
//    window.previousActiveElement.focus();
//  }
//  lastFocusedButton = undefined;
//  clearTimeout(modal.timeout);

//  return true;
//};

///*
// * Validation of the input field is done by user
// * If something is wrong => call showInputError with errorMessage
// */
//sweetAlert.showInputError = swal.showInputError = function (errorMessage) {
//  var modal = _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.getModal();

//  var $errorIcon = modal.querySelector('.sa-input-error');
//  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.addClass($errorIcon, 'show');

//  var $errorContainer = modal.querySelector('.sa-error-container');
//  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.addClass($errorContainer, 'show');

//  $errorContainer.querySelector('p').innerHTML = errorMessage;

//  setTimeout(function () {
//    sweetAlert.enableButtons();
//  }, 1);

//  modal.querySelector('input').focus();
//};

///*
// * Reset input error DOM elements
// */
//sweetAlert.resetInputError = swal.resetInputError = function (event) {
//  // If press enter => ignore
//  if (event && event.keyCode === 13) {
//    return false;
//  }

//  var $modal = _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.getModal();

//  var $errorIcon = $modal.querySelector('.sa-input-error');
//  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass($errorIcon, 'show');

//  var $errorContainer = $modal.querySelector('.sa-error-container');
//  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass($errorContainer, 'show');
//};

///*
// * Disable confirm and cancel buttons
// */
//sweetAlert.disableButtons = swal.disableButtons = function (event) {
//  var modal = _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.getModal();
//  var $confirmButton = modal.querySelector('button.confirm');
//  var $cancelButton = modal.querySelector('button.cancel');
//  $confirmButton.disabled = true;
//  $cancelButton.disabled = true;
//};

///*
// * Enable confirm and cancel buttons
// */
//sweetAlert.enableButtons = swal.enableButtons = function (event) {
//  var modal = _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.getModal();
//  var $confirmButton = modal.querySelector('button.confirm');
//  var $cancelButton = modal.querySelector('button.cancel');
//  $confirmButton.disabled = false;
//  $cancelButton.disabled = false;
//};

//if (typeof window !== 'undefined') {
//  // The 'handle-click' module requires
//  // that 'sweetAlert' was set as global.
//  window.sweetAlert = window.swal = sweetAlert;
//} else {
//  _extend$hexToRgb$isIE8$logStr$colorLuminance.logStr('SweetAlert is a frontend module!');
//}
//module.exports = exports['default'];

//},{"./modules/default-params":2,"./modules/handle-click":3,"./modules/handle-dom":4,"./modules/handle-key":5,"./modules/handle-swal-dom":6,"./modules/set-params":8,"./modules/utils":9}],2:[function(require,module,exports){
//'use strict';

//Object.defineProperty(exports, '__esModule', {
//  value: true
//});
//var defaultParams = {
//  title: '',
//  text: '',
//  type: null,
//  allowOutsideClick: false,
//  showConfirmButton: true,
//  showCancelButton: false,
//  closeOnConfirm: true,
//  closeOnCancel: true,
//  confirmButtonText: 'OK',
//  confirmButtonColor: '#8CD4F5',
//  cancelButtonText: 'Cancel',
//  imageUrl: null,
//  imageSize: null,
//  timer: null,
//  customClass: '',
//  html: false,
//  animation: true,
//  allowEscapeKey: true,
//  inputType: 'text',
//  inputPlaceholder: '',
//  inputValue: '',
//  showLoaderOnConfirm: false
//};

//exports['default'] = defaultParams;
//module.exports = exports['default'];

//},{}],3:[function(require,module,exports){
//'use strict';

//Object.defineProperty(exports, '__esModule', {
//  value: true
//});

//var _colorLuminance = require('./utils');

//var _getModal = require('./handle-swal-dom');

//var _hasClass$isDescendant = require('./handle-dom');

///*
// * User clicked on "Confirm"/"OK" or "Cancel"
// */
//var handleButton = function handleButton(event, params, modal) {
//  var e = event || window.event;
//  var target = e.target || e.srcElement;

//  var targetedConfirm = target.className.indexOf('confirm') !== -1;
//  var targetedOverlay = target.className.indexOf('sweet-overlay') !== -1;
//  var modalIsVisible = _hasClass$isDescendant.hasClass(modal, 'visible');
//  var doneFunctionExists = params.doneFunction && modal.getAttribute('data-has-done-function') === 'true';

//  // Since the user can change the background-color of the confirm button programmatically,
//  // we must calculate what the color should be on hover/active
//  var normalColor, hoverColor, activeColor;
//  if (targetedConfirm && params.confirmButtonColor) {
//    normalColor = params.confirmButtonColor;
//    hoverColor = _colorLuminance.colorLuminance(normalColor, -0.04);
//    activeColor = _colorLuminance.colorLuminance(normalColor, -0.14);
//  }

//  function shouldSetConfirmButtonColor(color) {
//    if (targetedConfirm && params.confirmButtonColor) {
//      target.style.backgroundColor = color;
//    }
//  }

//  switch (e.type) {
//    case 'mouseover':
//      shouldSetConfirmButtonColor(hoverColor);
//      break;

//    case 'mouseout':
//      shouldSetConfirmButtonColor(normalColor);
//      break;

//    case 'mousedown':
//      shouldSetConfirmButtonColor(activeColor);
//      break;

//    case 'mouseup':
//      shouldSetConfirmButtonColor(hoverColor);
//      break;

//    case 'focus':
//      var $confirmButton = modal.querySelector('button.confirm');
//      var $cancelButton = modal.querySelector('button.cancel');

//      if (targetedConfirm) {
//        $cancelButton.style.boxShadow = 'none';
//      } else {
//        $confirmButton.style.boxShadow = 'none';
//      }
//      break;

//    case 'click':
//      var clickedOnModal = modal === target;
//      var clickedOnModalChild = _hasClass$isDescendant.isDescendant(modal, target);

//      // Ignore click outside if allowOutsideClick is false
//      if (!clickedOnModal && !clickedOnModalChild && modalIsVisible && !params.allowOutsideClick) {
//        break;
//      }

//      if (targetedConfirm && doneFunctionExists && modalIsVisible) {
//        handleConfirm(modal, params);
//      } else if (doneFunctionExists && modalIsVisible || targetedOverlay) {
//        handleCancel(modal, params);
//      } else if (_hasClass$isDescendant.isDescendant(modal, target) && target.tagName === 'BUTTON') {
//        sweetAlert.close();
//      }
//      break;
//  }
//};

///*
// *  User clicked on "Confirm"/"OK"
// */
//var handleConfirm = function handleConfirm(modal, params) {
//  var callbackValue = true;

//  if (_hasClass$isDescendant.hasClass(modal, 'show-input')) {
//    callbackValue = modal.querySelector('input').value;

//    if (!callbackValue) {
//      callbackValue = '';
//    }
//  }

//  params.doneFunction(callbackValue);

//  if (params.closeOnConfirm) {
//    sweetAlert.close();
//  }
//  // Disable cancel and confirm button if the parameter is true
//  if (params.showLoaderOnConfirm) {
//    sweetAlert.disableButtons();
//  }
//};

///*
// *  User clicked on "Cancel"
// */
//var handleCancel = function handleCancel(modal, params) {
//  // Check if callback function expects a parameter (to track cancel actions)
//  var functionAsStr = String(params.doneFunction).replace(/\s/g, '');
//  var functionHandlesCancel = functionAsStr.substring(0, 9) === 'function(' && functionAsStr.substring(9, 10) !== ')';

//  if (functionHandlesCancel) {
//    params.doneFunction(false);
//  }

//  if (params.closeOnCancel) {
//    sweetAlert.close();
//  }
//};

//exports['default'] = {
//  handleButton: handleButton,
//  handleConfirm: handleConfirm,
//  handleCancel: handleCancel
//};
//module.exports = exports['default'];

//},{"./handle-dom":4,"./handle-swal-dom":6,"./utils":9}],4:[function(require,module,exports){
//'use strict';

//Object.defineProperty(exports, '__esModule', {
//  value: true
//});
//var hasClass = function hasClass(elem, className) {
//  return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
//};

//var addClass = function addClass(elem, className) {
//  if (!hasClass(elem, className)) {
//    elem.className += ' ' + className;
//  }
//};

//var removeClass = function removeClass(elem, className) {
//  var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, ' ') + ' ';
//  if (hasClass(elem, className)) {
//    while (newClass.indexOf(' ' + className + ' ') >= 0) {
//      newClass = newClass.replace(' ' + className + ' ', ' ');
//    }
//    elem.className = newClass.replace(/^\s+|\s+$/g, '');
//  }
//};

//var escapeHtml = function escapeHtml(str) {
//  var div = document.createElement('div');
//  div.appendChild(document.createTextNode(str));
//  return div.innerHTML;
//};

//var _show = function _show(elem) {
//  elem.style.opacity = '';
//  elem.style.display = 'block';
//};

//var show = function show(elems) {
//  if (elems && !elems.length) {
//    return _show(elems);
//  }
//  for (var i = 0; i < elems.length; ++i) {
//    _show(elems[i]);
//  }
//};

//var _hide = function _hide(elem) {
//  elem.style.opacity = '';
//  elem.style.display = 'none';
//};

//var hide = function hide(elems) {
//  if (elems && !elems.length) {
//    return _hide(elems);
//  }
//  for (var i = 0; i < elems.length; ++i) {
//    _hide(elems[i]);
//  }
//};

//var isDescendant = function isDescendant(parent, child) {
//  var node = child.parentNode;
//  while (node !== null) {
//    if (node === parent) {
//      return true;
//    }
//    node = node.parentNode;
//  }
//  return false;
//};

//var getTopMargin = function getTopMargin(elem) {
//  elem.style.left = '-9999px';
//  elem.style.display = 'block';

//  var height = elem.clientHeight,
//      padding;
//  if (typeof getComputedStyle !== 'undefined') {
//    // IE 8
//    padding = parseInt(getComputedStyle(elem).getPropertyValue('padding-top'), 10);
//  } else {
//    padding = parseInt(elem.currentStyle.padding);
//  }

//  elem.style.left = '';
//  elem.style.display = 'none';
//  return '-' + parseInt((height + padding) / 2) + 'px';
//};

//var fadeIn = function fadeIn(elem, interval) {
//  if (+elem.style.opacity < 1) {
//    interval = interval || 16;
//    elem.style.opacity = 0;
//    elem.style.display = 'block';
//    var last = +new Date();
//    var tick = (function (_tick) {
//      function tick() {
//        return _tick.apply(this, arguments);
//      }

//      tick.toString = function () {
//        return _tick.toString();
//      };

//      return tick;
//    })(function () {
//      elem.style.opacity = +elem.style.opacity + (new Date() - last) / 100;
//      last = +new Date();

//      if (+elem.style.opacity < 1) {
//        setTimeout(tick, interval);
//      }
//    });
//    tick();
//  }
//  elem.style.display = 'block'; //fallback IE8
//};

//var fadeOut = function fadeOut(elem, interval) {
//  interval = interval || 16;
//  elem.style.opacity = 1;
//  var last = +new Date();
//  var tick = (function (_tick2) {
//    function tick() {
//      return _tick2.apply(this, arguments);
//    }

//    tick.toString = function () {
//      return _tick2.toString();
//    };

//    return tick;
//  })(function () {
//    elem.style.opacity = +elem.style.opacity - (new Date() - last) / 100;
//    last = +new Date();

//    if (+elem.style.opacity > 0) {
//      setTimeout(tick, interval);
//    } else {
//      elem.style.display = 'none';
//    }
//  });
//  tick();
//};

//var fireClick = function fireClick(node) {
//  // Taken from http://www.nonobtrusive.com/2011/11/29/programatically-fire-crossbrowser-click-event-with-javascript/
//  // Then fixed for today's Chrome browser.
//  if (typeof MouseEvent === 'function') {
//    // Up-to-date approach
//    var mevt = new MouseEvent('click', {
//      view: window,
//      bubbles: false,
//      cancelable: true
//    });
//    node.dispatchEvent(mevt);
//  } else if (document.createEvent) {
//    // Fallback
//    var evt = document.createEvent('MouseEvents');
//    evt.initEvent('click', false, false);
//    node.dispatchEvent(evt);
//  } else if (document.createEventObject) {
//    node.fireEvent('onclick');
//  } else if (typeof node.onclick === 'function') {
//    node.onclick();
//  }
//};

//var stopEventPropagation = function stopEventPropagation(e) {
//  // In particular, make sure the space bar doesn't scroll the main window.
//  if (typeof e.stopPropagation === 'function') {
//    e.stopPropagation();
//    e.preventDefault();
//  } else if (window.event && window.event.hasOwnProperty('cancelBubble')) {
//    window.event.cancelBubble = true;
//  }
//};

//exports.hasClass = hasClass;
//exports.addClass = addClass;
//exports.removeClass = removeClass;
//exports.escapeHtml = escapeHtml;
//exports._show = _show;
//exports.show = show;
//exports._hide = _hide;
//exports.hide = hide;
//exports.isDescendant = isDescendant;
//exports.getTopMargin = getTopMargin;
//exports.fadeIn = fadeIn;
//exports.fadeOut = fadeOut;
//exports.fireClick = fireClick;
//exports.stopEventPropagation = stopEventPropagation;

//},{}],5:[function(require,module,exports){
//'use strict';

//Object.defineProperty(exports, '__esModule', {
//  value: true
//});

//var _stopEventPropagation$fireClick = require('./handle-dom');

//var _setFocusStyle = require('./handle-swal-dom');

//var handleKeyDown = function handleKeyDown(event, params, modal) {
//  var e = event || window.event;
//  var keyCode = e.keyCode || e.which;

//  var $okButton = modal.querySelector('button.confirm');
//  var $cancelButton = modal.querySelector('button.cancel');
//  var $modalButtons = modal.querySelectorAll('button[tabindex]');

//  if ([9, 13, 32, 27].indexOf(keyCode) === -1) {
//    // Don't do work on keys we don't care about.
//    return;
//  }

//  var $targetElement = e.target || e.srcElement;

//  var btnIndex = -1; // Find the button - note, this is a nodelist, not an array.
//  for (var i = 0; i < $modalButtons.length; i++) {
//    if ($targetElement === $modalButtons[i]) {
//      btnIndex = i;
//      break;
//    }
//  }

//  if (keyCode === 9) {
//    // TAB
//    if (btnIndex === -1) {
//      // No button focused. Jump to the confirm button.
//      $targetElement = $okButton;
//    } else {
//      // Cycle to the next button
//      if (btnIndex === $modalButtons.length - 1) {
//        $targetElement = $modalButtons[0];
//      } else {
//        $targetElement = $modalButtons[btnIndex + 1];
//      }
//    }

//    _stopEventPropagation$fireClick.stopEventPropagation(e);
//    $targetElement.focus();

//    if (params.confirmButtonColor) {
//      _setFocusStyle.setFocusStyle($targetElement, params.confirmButtonColor);
//    }
//  } else {
//    if (keyCode === 13) {
//      if ($targetElement.tagName === 'INPUT') {
//        $targetElement = $okButton;
//        $okButton.focus();
//      }

//      if (btnIndex === -1) {
//        // ENTER/SPACE clicked outside of a button.
//        $targetElement = $okButton;
//      } else {
//        // Do nothing - let the browser handle it.
//        $targetElement = undefined;
//      }
//    } else if (keyCode === 27 && params.allowEscapeKey === true) {
//      $targetElement = $cancelButton;
//      _stopEventPropagation$fireClick.fireClick($targetElement, e);
//    } else {
//      // Fallback - let the browser handle it.
//      $targetElement = undefined;
//    }
//  }
//};

//exports['default'] = handleKeyDown;
//module.exports = exports['default'];

//},{"./handle-dom":4,"./handle-swal-dom":6}],6:[function(require,module,exports){
//'use strict';

//var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

//Object.defineProperty(exports, '__esModule', {
//  value: true
//});

//var _hexToRgb = require('./utils');

//var _removeClass$getTopMargin$fadeIn$show$addClass = require('./handle-dom');

//var _defaultParams = require('./default-params');

//var _defaultParams2 = _interopRequireWildcard(_defaultParams);

///*
// * Add modal + overlay to DOM
// */

//var _injectedHTML = require('./injected-html');

//var _injectedHTML2 = _interopRequireWildcard(_injectedHTML);

//var modalClass = '.sweet-alert';
//var overlayClass = '.sweet-overlay';

//var sweetAlertInitialize = function sweetAlertInitialize() {
//  var sweetWrap = document.createElement('div');
//  sweetWrap.innerHTML = _injectedHTML2['default'];

//  // Append elements to body
//  while (sweetWrap.firstChild) {
//    document.body.appendChild(sweetWrap.firstChild);
//  }
//};

///*
// * Get DOM element of modal
// */
//var getModal = (function (_getModal) {
//  function getModal() {
//    return _getModal.apply(this, arguments);
//  }

//  getModal.toString = function () {
//    return _getModal.toString();
//  };

//  return getModal;
//})(function () {
//  var $modal = document.querySelector(modalClass);

//  if (!$modal) {
//    sweetAlertInitialize();
//    $modal = getModal();
//  }

//  return $modal;
//});

///*
// * Get DOM element of input (in modal)
// */
//var getInput = function getInput() {
//  var $modal = getModal();
//  if ($modal) {
//    return $modal.querySelector('input');
//  }
//};

///*
// * Get DOM element of overlay
// */
//var getOverlay = function getOverlay() {
//  return document.querySelector(overlayClass);
//};

///*
// * Add box-shadow style to button (depending on its chosen bg-color)
// */
//var setFocusStyle = function setFocusStyle($button, bgColor) {
//  var rgbColor = _hexToRgb.hexToRgb(bgColor);
//  $button.style.boxShadow = '0 0 2px rgba(' + rgbColor + ', 0.8), inset 0 0 0 1px rgba(0, 0, 0, 0.05)';
//};

///*
// * Animation when opening modal
// */
//var openModal = function openModal(callback) {
//  var $modal = getModal();
//  _removeClass$getTopMargin$fadeIn$show$addClass.fadeIn(getOverlay(), 10);
//  _removeClass$getTopMargin$fadeIn$show$addClass.show($modal);
//  _removeClass$getTopMargin$fadeIn$show$addClass.addClass($modal, 'showSweetAlert');
//  _removeClass$getTopMargin$fadeIn$show$addClass.removeClass($modal, 'hideSweetAlert');

//  window.previousActiveElement = document.activeElement;
//  var $okButton = $modal.querySelector('button.confirm');
//  $okButton.focus();

//  setTimeout(function () {
//    _removeClass$getTopMargin$fadeIn$show$addClass.addClass($modal, 'visible');
//  }, 500);

//  var timer = $modal.getAttribute('data-timer');

//  if (timer !== 'null' && timer !== '') {
//    var timerCallback = callback;
//    $modal.timeout = setTimeout(function () {
//      var doneFunctionExists = (timerCallback || null) && $modal.getAttribute('data-has-done-function') === 'true';
//      if (doneFunctionExists) {
//        timerCallback(null);
//      } else {
//        sweetAlert.close();
//      }
//    }, timer);
//  }
//};

///*
// * Reset the styling of the input
// * (for example if errors have been shown)
// */
//var resetInput = function resetInput() {
//  var $modal = getModal();
//  var $input = getInput();

//  _removeClass$getTopMargin$fadeIn$show$addClass.removeClass($modal, 'show-input');
//  $input.value = _defaultParams2['default'].inputValue;
//  $input.setAttribute('type', _defaultParams2['default'].inputType);
//  $input.setAttribute('placeholder', _defaultParams2['default'].inputPlaceholder);

//  resetInputError();
//};

//var resetInputError = function resetInputError(event) {
//  // If press enter => ignore
//  if (event && event.keyCode === 13) {
//    return false;
//  }

//  var $modal = getModal();

//  var $errorIcon = $modal.querySelector('.sa-input-error');
//  _removeClass$getTopMargin$fadeIn$show$addClass.removeClass($errorIcon, 'show');

//  var $errorContainer = $modal.querySelector('.sa-error-container');
//  _removeClass$getTopMargin$fadeIn$show$addClass.removeClass($errorContainer, 'show');
//};

///*
// * Set "margin-top"-property on modal based on its computed height
// */
//var fixVerticalPosition = function fixVerticalPosition() {
//  var $modal = getModal();
//  $modal.style.marginTop = _removeClass$getTopMargin$fadeIn$show$addClass.getTopMargin(getModal());
//};

//exports.sweetAlertInitialize = sweetAlertInitialize;
//exports.getModal = getModal;
//exports.getOverlay = getOverlay;
//exports.getInput = getInput;
//exports.setFocusStyle = setFocusStyle;
//exports.openModal = openModal;
//exports.resetInput = resetInput;
//exports.resetInputError = resetInputError;
//exports.fixVerticalPosition = fixVerticalPosition;

//},{"./default-params":2,"./handle-dom":4,"./injected-html":7,"./utils":9}],7:[function(require,module,exports){
//"use strict";

//Object.defineProperty(exports, "__esModule", {
//  value: true
//});
//var injectedHTML =

//// Dark overlay
//"<div class=\"sweet-overlay\" tabIndex=\"-1\"></div>" +

//// Modal
//"<div class=\"sweet-alert\">" +

//// Error icon
//"<div class=\"sa-icon sa-error\">\n      <span class=\"sa-x-mark\">\n        <span class=\"sa-line sa-left\"></span>\n        <span class=\"sa-line sa-right\"></span>\n      </span>\n    </div>" +

//// Warning icon
//"<div class=\"sa-icon sa-warning\">\n      <span class=\"sa-body\"></span>\n      <span class=\"sa-dot\"></span>\n    </div>" +

//// Info icon
//"<div class=\"sa-icon sa-info\"></div>" +

//// Success icon
//"<div class=\"sa-icon sa-success\">\n      <span class=\"sa-line sa-tip\"></span>\n      <span class=\"sa-line sa-long\"></span>\n\n      <div class=\"sa-placeholder\"></div>\n      <div class=\"sa-fix\"></div>\n    </div>" + "<div class=\"sa-icon sa-custom\"></div>" +

//// Title, text and input
//"<h2>Title</h2>\n    <p>Text</p>\n    <fieldset>\n      <input type=\"text\" tabIndex=\"3\" />\n      <div class=\"sa-input-error\"></div>\n    </fieldset>" +

//// Input errors
//"<div class=\"sa-error-container\">\n      <div class=\"icon\">!</div>\n      <p>Not valid!</p>\n    </div>" +

//// Cancel and confirm buttons
//"<div class=\"sa-button-container\">\n      <button class=\"cancel\" tabIndex=\"2\">Cancel</button>\n      <div class=\"sa-confirm-button-container\">\n        <button class=\"confirm\" tabIndex=\"1\">OK</button>" +

//// Loading animation
//"<div class=\"la-ball-fall\">\n          <div></div>\n          <div></div>\n          <div></div>\n        </div>\n      </div>\n    </div>" +

//// End of modal
//"</div>";

//exports["default"] = injectedHTML;
//module.exports = exports["default"];

//},{}],8:[function(require,module,exports){
//'use strict';

//Object.defineProperty(exports, '__esModule', {
//  value: true
//});

//var _isIE8 = require('./utils');

//var _getModal$getInput$setFocusStyle = require('./handle-swal-dom');

//var _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide = require('./handle-dom');

//var alertTypes = ['error', 'warning', 'info', 'success', 'input', 'prompt'];

///*
// * Set type, text and actions on modal
// */
//var setParameters = function setParameters(params) {
//  var modal = _getModal$getInput$setFocusStyle.getModal();

//  var $title = modal.querySelector('h2');
//  var $text = modal.querySelector('p');
//  var $cancelBtn = modal.querySelector('button.cancel');
//  var $confirmBtn = modal.querySelector('button.confirm');

//  /*
//   * Title
//   */
//  $title.innerHTML = params.html ? params.title : _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.escapeHtml(params.title).split('\n').join('<br>');

//  /*
//   * Text
//   */
//  $text.innerHTML = params.html ? params.text : _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.escapeHtml(params.text || '').split('\n').join('<br>');
//  if (params.text) _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.show($text);

//  /*
//   * Custom class
//   */
//  if (params.customClass) {
//    _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.addClass(modal, params.customClass);
//    modal.setAttribute('data-custom-class', params.customClass);
//  } else {
//    // Find previously set classes and remove them
//    var customClass = modal.getAttribute('data-custom-class');
//    _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.removeClass(modal, customClass);
//    modal.setAttribute('data-custom-class', '');
//  }

//  /*
//   * Icon
//   */
//  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.hide(modal.querySelectorAll('.sa-icon'));

//  if (params.type && !_isIE8.isIE8()) {
//    var _ret = (function () {

//      var validType = false;

//      for (var i = 0; i < alertTypes.length; i++) {
//        if (params.type === alertTypes[i]) {
//          validType = true;
//          break;
//        }
//      }

//      if (!validType) {
//        logStr('Unknown alert type: ' + params.type);
//        return {
//          v: false
//        };
//      }

//      var typesWithIcons = ['success', 'error', 'warning', 'info'];
//      var $icon = undefined;

//      if (typesWithIcons.indexOf(params.type) !== -1) {
//        $icon = modal.querySelector('.sa-icon.' + 'sa-' + params.type);
//        _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.show($icon);
//      }

//      var $input = _getModal$getInput$setFocusStyle.getInput();

//      // Animate icon
//      switch (params.type) {

//        case 'success':
//          _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.addClass($icon, 'animate');
//          _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.addClass($icon.querySelector('.sa-tip'), 'animateSuccessTip');
//          _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.addClass($icon.querySelector('.sa-long'), 'animateSuccessLong');
//          break;

//        case 'error':
//          _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.addClass($icon, 'animateErrorIcon');
//          _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.addClass($icon.querySelector('.sa-x-mark'), 'animateXMark');
//          break;

//        case 'warning':
//          _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.addClass($icon, 'pulseWarning');
//          _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.addClass($icon.querySelector('.sa-body'), 'pulseWarningIns');
//          _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.addClass($icon.querySelector('.sa-dot'), 'pulseWarningIns');
//          break;

//        case 'input':
//        case 'prompt':
//          $input.setAttribute('type', params.inputType);
//          $input.value = params.inputValue;
//          $input.setAttribute('placeholder', params.inputPlaceholder);
//          _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.addClass(modal, 'show-input');
//          setTimeout(function () {
//            $input.focus();
//            $input.addEventListener('keyup', swal.resetInputError);
//          }, 400);
//          break;
//      }
//    })();

//    if (typeof _ret === 'object') {
//      return _ret.v;
//    }
//  }

//  /*
//   * Custom image
//   */
//  if (params.imageUrl) {
//    var $customIcon = modal.querySelector('.sa-icon.sa-custom');

//    $customIcon.style.backgroundImage = 'url(' + params.imageUrl + ')';
//    _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.show($customIcon);

//    var _imgWidth = 80;
//    var _imgHeight = 80;

//    if (params.imageSize) {
//      var dimensions = params.imageSize.toString().split('x');
//      var imgWidth = dimensions[0];
//      var imgHeight = dimensions[1];

//      if (!imgWidth || !imgHeight) {
//        logStr('Parameter imageSize expects value with format WIDTHxHEIGHT, got ' + params.imageSize);
//      } else {
//        _imgWidth = imgWidth;
//        _imgHeight = imgHeight;
//      }
//    }

//    $customIcon.setAttribute('style', $customIcon.getAttribute('style') + 'width:' + _imgWidth + 'px; height:' + _imgHeight + 'px');
//  }

//  /*
//   * Show cancel button?
//   */
//  modal.setAttribute('data-has-cancel-button', params.showCancelButton);
//  if (params.showCancelButton) {
//    $cancelBtn.style.display = 'inline-block';
//  } else {
//    _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.hide($cancelBtn);
//  }

//  /*
//   * Show confirm button?
//   */
//  modal.setAttribute('data-has-confirm-button', params.showConfirmButton);
//  if (params.showConfirmButton) {
//    $confirmBtn.style.display = 'inline-block';
//  } else {
//    _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.hide($confirmBtn);
//  }

//  /*
//   * Custom text on cancel/confirm buttons
//   */
//  if (params.cancelButtonText) {
//    $cancelBtn.innerHTML = _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.escapeHtml(params.cancelButtonText);
//  }
//  if (params.confirmButtonText) {
//    $confirmBtn.innerHTML = _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.escapeHtml(params.confirmButtonText);
//  }

//  /*
//   * Custom color on confirm button
//   */
//  if (params.confirmButtonColor) {
//    // Set confirm button to selected background color
//    $confirmBtn.style.backgroundColor = params.confirmButtonColor;

//    // Set the confirm button color to the loading ring
//    $confirmBtn.style.borderLeftColor = params.confirmLoadingButtonColor;
//    $confirmBtn.style.borderRightColor = params.confirmLoadingButtonColor;

//    // Set box-shadow to default focused button
//    _getModal$getInput$setFocusStyle.setFocusStyle($confirmBtn, params.confirmButtonColor);
//  }

//  /*
//   * Allow outside click
//   */
//  modal.setAttribute('data-allow-outside-click', params.allowOutsideClick);

//  /*
//   * Callback function
//   */
//  var hasDoneFunction = params.doneFunction ? true : false;
//  modal.setAttribute('data-has-done-function', hasDoneFunction);

//  /*
//   * Animation
//   */
//  if (!params.animation) {
//    modal.setAttribute('data-animation', 'none');
//  } else if (typeof params.animation === 'string') {
//    modal.setAttribute('data-animation', params.animation); // Custom animation
//  } else {
//    modal.setAttribute('data-animation', 'pop');
//  }

//  /*
//   * Timer
//   */
//  modal.setAttribute('data-timer', params.timer);
//};

//exports['default'] = setParameters;
//module.exports = exports['default'];

//},{"./handle-dom":4,"./handle-swal-dom":6,"./utils":9}],9:[function(require,module,exports){
//'use strict';

//Object.defineProperty(exports, '__esModule', {
//  value: true
//});
///*
// * Allow user to pass their own params
// */
//var extend = function extend(a, b) {
//  for (var key in b) {
//    if (b.hasOwnProperty(key)) {
//      a[key] = b[key];
//    }
//  }
//  return a;
//};

///*
// * Convert HEX codes to RGB values (#000000 -> rgb(0,0,0))
// */
//var hexToRgb = function hexToRgb(hex) {
//  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
//  return result ? parseInt(result[1], 16) + ', ' + parseInt(result[2], 16) + ', ' + parseInt(result[3], 16) : null;
//};

///*
// * Check if the user is using Internet Explorer 8 (for fallbacks)
// */
//var isIE8 = function isIE8() {
//  return window.attachEvent && !window.addEventListener;
//};

///*
// * IE compatible logging for developers
// */
//var logStr = function logStr(string) {
//  if (window.console) {
//    // IE...
//    window.console.log('SweetAlert: ' + string);
//  }
//};

///*
// * Set hover, active and focus-states for buttons 
// * (source: http://www.sitepoint.com/javascript-generate-lighter-darker-color)
// */
//var colorLuminance = function colorLuminance(hex, lum) {
//  // Validate hex string
//  hex = String(hex).replace(/[^0-9a-f]/gi, '');
//  if (hex.length < 6) {
//    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
//  }
//  lum = lum || 0;

//  // Convert to decimal and change luminosity
//  var rgb = '#';
//  var c;
//  var i;

//  for (i = 0; i < 3; i++) {
//    c = parseInt(hex.substr(i * 2, 2), 16);
//    c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
//    rgb += ('00' + c).substr(c.length);
//  }

//  return rgb;
//};

//exports.extend = extend;
//exports.hexToRgb = hexToRgb;
//exports.isIE8 = isIE8;
//exports.logStr = logStr;
//exports.colorLuminance = colorLuminance;

//},{}]},{},[1])
////# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvVHJpc3Rhbi9kZXYvU3dlZXRBbGVydC9kZXYvc3dlZXRhbGVydC5lczYuanMiLCIvVXNlcnMvVHJpc3Rhbi9kZXYvU3dlZXRBbGVydC9kZXYvbW9kdWxlcy9kZWZhdWx0LXBhcmFtcy5qcyIsIi9Vc2Vycy9UcmlzdGFuL2Rldi9Td2VldEFsZXJ0L2Rldi9tb2R1bGVzL2hhbmRsZS1jbGljay5qcyIsIi9Vc2Vycy9UcmlzdGFuL2Rldi9Td2VldEFsZXJ0L2Rldi9tb2R1bGVzL2hhbmRsZS1kb20uanMiLCIvVXNlcnMvVHJpc3Rhbi9kZXYvU3dlZXRBbGVydC9kZXYvbW9kdWxlcy9oYW5kbGUta2V5LmpzIiwiL1VzZXJzL1RyaXN0YW4vZGV2L1N3ZWV0QWxlcnQvZGV2L21vZHVsZXMvaGFuZGxlLXN3YWwtZG9tLmpzIiwiL1VzZXJzL1RyaXN0YW4vZGV2L1N3ZWV0QWxlcnQvZGV2L21vZHVsZXMvaW5qZWN0ZWQtaHRtbC5qcyIsIi9Vc2Vycy9UcmlzdGFuL2Rldi9Td2VldEFsZXJ0L2Rldi9tb2R1bGVzL3NldC1wYXJhbXMuanMiLCIvVXNlcnMvVHJpc3Rhbi9kZXYvU3dlZXRBbGVydC9kZXYvbW9kdWxlcy91dGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7OztzSkNnQk8sc0JBQXNCOzs7Ozs7MkRBV3RCLGlCQUFpQjs7Ozs7O3dIQWNqQiwyQkFBMkI7Ozs7dURBSXdCLHdCQUF3Qjs7NkJBQ3hELHNCQUFzQjs7Ozs7OzZCQUl0QiwwQkFBMEI7Ozs7NkJBQzFCLHNCQUFzQjs7Ozs7Ozs7QUFNaEQsSUFBSSxxQkFBcUIsQ0FBQztBQUMxQixJQUFJLGlCQUFpQixDQUFDOzs7Ozs7QUFPdEIsSUFBSSxVQUFVLEVBQUUsSUFBSSxDQUFDOztxQkFFTixVQUFVLEdBQUcsSUFBSSxHQUFHLFlBQVc7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RyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3JFLE9BQUcsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUEsQ0FBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0dBQ3BDOztBQUVELFNBQU8sR0FBRyxDQUFDO0NBQ1osQ0FBQzs7UUFJQSxNQUFNLEdBQU4sTUFBTTtRQUNOLFFBQVEsR0FBUixRQUFRO1FBQ1IsS0FBSyxHQUFMLEtBQUs7UUFDTCxNQUFNLEdBQU4sTUFBTTtRQUNOLGNBQWMsR0FBZCxjQUFjIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vIFN3ZWV0QWxlcnRcbi8vIDIwMTQtMjAxNSAoYykgLSBUcmlzdGFuIEVkd2FyZHNcbi8vIGdpdGh1Yi5jb20vdDR0NS9zd2VldGFsZXJ0XG5cbi8qXG4gKiBqUXVlcnktbGlrZSBmdW5jdGlvbnMgZm9yIG1hbmlwdWxhdGluZyB0aGUgRE9NXG4gKi9cbmltcG9ydCB7XG4gIGhhc0NsYXNzLCBhZGRDbGFzcywgcmVtb3ZlQ2xhc3MsXG4gIGVzY2FwZUh0bWwsXG4gIF9zaG93LCBzaG93LCBfaGlkZSwgaGlkZSxcbiAgaXNEZXNjZW5kYW50LFxuICBnZXRUb3BNYXJnaW4sXG4gIGZhZGVJbiwgZmFkZU91dCxcbiAgZmlyZUNsaWNrLFxuICBzdG9wRXZlbnRQcm9wYWdhdGlvblxufSBmcm9tICcuL21vZHVsZXMvaGFuZGxlLWRvbSc7XG5cbi8qXG4gKiBIYW5keSB1dGlsaXRpZXNcbiAqL1xuaW1wb3J0IHtcbiAgZXh0ZW5kLFxuICBoZXhUb1JnYixcbiAgaXNJRTgsXG4gIGxvZ1N0cixcbiAgY29sb3JMdW1pbmFuY2Vcbn0gZnJvbSAnLi9tb2R1bGVzL3V0aWxzJztcblxuLypcbiAqICBIYW5kbGUgc3dlZXRBbGVydCdzIERPTSBlbGVtZW50c1xuICovXG5pbXBvcnQge1xuICBzd2VldEFsZXJ0SW5pdGlhbGl6ZSxcbiAgZ2V0TW9kYWwsXG4gIGdldE92ZXJsYXksXG4gIGdldElucHV0LFxuICBzZXRGb2N1c1N0eWxlLFxuICBvcGVuTW9kYWwsXG4gIHJlc2V0SW5wdXQsXG4gIGZpeFZlcnRpY2FsUG9zaXRpb25cbn0gZnJvbSAnLi9tb2R1bGVzL2hhbmRsZS1zd2FsLWRvbSc7XG5cblxuLy8gSGFuZGxlIGJ1dHRvbiBldmVudHMgYW5kIGtleWJvYXJkIGV2ZW50c1xuaW1wb3J0IHsgaGFuZGxlQnV0dG9uLCBoYW5kbGVDb25maXJtLCBoYW5kbGVDYW5jZWwgfSBmcm9tICcuL21vZHVsZXMvaGFuZGxlLWNsaWNrJztcbmltcG9ydCBoYW5kbGVLZXlEb3duIGZyb20gJy4vbW9kdWxlcy9oYW5kbGUta2V5JztcblxuXG4vLyBEZWZhdWx0IHZhbHVlc1xuaW1wb3J0IGRlZmF1bHRQYXJhbXMgZnJvbSAnLi9tb2R1bGVzL2RlZmF1bHQtcGFyYW1zJztcbmltcG9ydCBzZXRQYXJhbWV0ZXJzIGZyb20gJy4vbW9kdWxlcy9zZXQtcGFyYW1zJztcblxuLypcbiAqIFJlbWVtYmVyIHN0YXRlIGluIGNhc2VzIHdoZXJlIG9wZW5pbmcgYW5kIGhhbmRsaW5nIGEgbW9kYWwgd2lsbCBmaWRkbGUgd2l0aCBpdC5cbiAqIChXZSBhbHNvIHVzZSB3aW5kb3cucHJldmlvdXNBY3RpdmVFbGVtZW50IGFzIGEgZ2xvYmFsIHZhcmlhYmxlKVxuICovXG52YXIgcHJldmlvdXNXaW5kb3dLZXlEb3duO1xudmFyIGxhc3RGb2N1c2VkQnV0dG9uO1xuXG5cbi8qXG4gKiBHbG9iYWwgc3dlZXRBbGVydCBmdW5jdGlvblxuICogKHRoaXMgaXMgd2hhdCB0aGUgdXNlciBjYWxscylcbiAqL1xudmFyIHN3ZWV0QWxlcnQsIHN3YWw7XG5cbmV4cG9ydCBkZWZhdWx0IHN3ZWV0QWxlcnQgPSBzd2FsID0gZnVuY3Rpb24oKSB7XG4gIHZhciBjdXN0b21pemF0aW9ucyA9IGFyZ3VtZW50c1swXTtcblxuICBhZGRDbGFzcyhkb2N1bWVudC5ib2R5LCAnc3RvcC1zY3JvbGxpbmcnKTtcbiAgcmVzZXRJbnB1dCgpO1xuXG4gIC8qXG4gICAqIFVzZSBhcmd1bWVudCBpZiBkZWZpbmVkIG9yIGRlZmF1bHQgdmFsdWUgZnJvbSBwYXJhbXMgb2JqZWN0IG90aGVyd2lzZS5cbiAgICogU3VwcG9ydHMgdGhlIGNhc2Ugd2hlcmUgYSBkZWZhdWx0IHZhbHVlIGlzIGJvb2xlYW4gdHJ1ZSBhbmQgc2hvdWxkIGJlXG4gICAqIG92ZXJyaWRkZW4gYnkgYSBjb3JyZXNwb25kaW5nIGV4cGxpY2l0IGFyZ3VtZW50IHdoaWNoIGlzIGJvb2xlYW4gZmFsc2UuXG4gICAqL1xuICBmdW5jdGlvbiBhcmd1bWVudE9yRGVmYXVsdChrZXkpIHtcbiAgICB2YXIgYXJncyA9IGN1c3RvbWl6YXRpb25zO1xuICAgIHJldHVybiAoYXJnc1trZXldID09PSB1bmRlZmluZWQpID8gIGRlZmF1bHRQYXJhbXNba2V5XSA6IGFyZ3Nba2V5XTtcbiAgfVxuXG4gIGlmIChjdXN0b21pemF0aW9ucyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbG9nU3RyKCdTd2VldEFsZXJ0IGV4cGVjdHMgYXQgbGVhc3QgMSBhdHRyaWJ1dGUhJyk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIHBhcmFtcyA9IGV4dGVuZCh7fSwgZGVmYXVsdFBhcmFtcyk7XG5cbiAgc3dpdGNoICh0eXBlb2YgY3VzdG9taXphdGlvbnMpIHtcblxuICAgIC8vIEV4OiBzd2FsKFwiSGVsbG9cIiwgXCJKdXN0IHRlc3RpbmdcIiwgXCJpbmZvXCIpO1xuICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICBwYXJhbXMudGl0bGUgPSBjdXN0b21pemF0aW9ucztcbiAgICAgIHBhcmFtcy50ZXh0ICA9IGFyZ3VtZW50c1sxXSB8fCAnJztcbiAgICAgIHBhcmFtcy50eXBlICA9IGFyZ3VtZW50c1syXSB8fCAnJztcbiAgICAgIGJyZWFrO1xuXG4gICAgLy8gRXg6IHN3YWwoeyB0aXRsZTpcIkhlbGxvXCIsIHRleHQ6IFwiSnVzdCB0ZXN0aW5nXCIsIHR5cGU6IFwiaW5mb1wiIH0pO1xuICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICBpZiAoY3VzdG9taXphdGlvbnMudGl0bGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBsb2dTdHIoJ01pc3NpbmcgXCJ0aXRsZVwiIGFyZ3VtZW50IScpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHBhcmFtcy50aXRsZSA9IGN1c3RvbWl6YXRpb25zLnRpdGxlO1xuXG4gICAgICBmb3IgKGxldCBjdXN0b21OYW1lIGluIGRlZmF1bHRQYXJhbXMpIHtcbiAgICAgICAgcGFyYW1zW2N1c3RvbU5hbWVdID0gYXJndW1lbnRPckRlZmF1bHQoY3VzdG9tTmFtZSk7XG4gICAgICB9XG5cbiAgICAgIC8vIFNob3cgXCJDb25maXJtXCIgaW5zdGVhZCBvZiBcIk9LXCIgaWYgY2FuY2VsIGJ1dHRvbiBpcyB2aXNpYmxlXG4gICAgICBwYXJhbXMuY29uZmlybUJ1dHRvblRleHQgPSBwYXJhbXMuc2hvd0NhbmNlbEJ1dHRvbiA/ICdDb25maXJtJyA6IGRlZmF1bHRQYXJhbXMuY29uZmlybUJ1dHRvblRleHQ7XG4gICAgICBwYXJhbXMuY29uZmlybUJ1dHRvblRleHQgPSBhcmd1bWVudE9yRGVmYXVsdCgnY29uZmlybUJ1dHRvblRleHQnKTtcblxuICAgICAgLy8gQ2FsbGJhY2sgZnVuY3Rpb24gd2hlbiBjbGlja2luZyBvbiBcIk9LXCIvXCJDYW5jZWxcIlxuICAgICAgcGFyYW1zLmRvbmVGdW5jdGlvbiA9IGFyZ3VtZW50c1sxXSB8fCBudWxsO1xuXG4gICAgICBicmVhaztcblxuICAgIGRlZmF1bHQ6XG4gICAgICBsb2dTdHIoJ1VuZXhwZWN0ZWQgdHlwZSBvZiBhcmd1bWVudCEgRXhwZWN0ZWQgXCJzdHJpbmdcIiBvciBcIm9iamVjdFwiLCBnb3QgJyArIHR5cGVvZiBjdXN0b21pemF0aW9ucyk7XG4gICAgICByZXR1cm4gZmFsc2U7XG5cbiAgfVxuXG4gIHNldFBhcmFtZXRlcnMocGFyYW1zKTtcbiAgZml4VmVydGljYWxQb3NpdGlvbigpO1xuICBvcGVuTW9kYWwoYXJndW1lbnRzWzFdKTtcblxuICAvLyBNb2RhbCBpbnRlcmFjdGlvbnNcbiAgdmFyIG1vZGFsID0gZ2V0TW9kYWwoKTtcblxuXG4gIC8qXG4gICAqIE1ha2Ugc3VyZSBhbGwgbW9kYWwgYnV0dG9ucyByZXNwb25kIHRvIGFsbCBldmVudHNcbiAgICovXG4gIHZhciAkYnV0dG9ucyA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3JBbGwoJ2J1dHRvbicpO1xuICB2YXIgYnV0dG9uRXZlbnRzID0gWydvbmNsaWNrJywgJ29ubW91c2VvdmVyJywgJ29ubW91c2VvdXQnLCAnb25tb3VzZWRvd24nLCAnb25tb3VzZXVwJywgJ29uZm9jdXMnXTtcbiAgdmFyIG9uQnV0dG9uRXZlbnQgPSAoZSkgPT4gaGFuZGxlQnV0dG9uKGUsIHBhcmFtcywgbW9kYWwpO1xuXG4gIGZvciAobGV0IGJ0bkluZGV4ID0gMDsgYnRuSW5kZXggPCAkYnV0dG9ucy5sZW5ndGg7IGJ0bkluZGV4KyspIHtcbiAgICBmb3IgKGxldCBldnRJbmRleCA9IDA7IGV2dEluZGV4IDwgYnV0dG9uRXZlbnRzLmxlbmd0aDsgZXZ0SW5kZXgrKykge1xuICAgICAgbGV0IGJ0bkV2dCA9IGJ1dHRvbkV2ZW50c1tldnRJbmRleF07XG4gICAgICAkYnV0dG9uc1tidG5JbmRleF1bYnRuRXZ0XSA9IG9uQnV0dG9uRXZlbnQ7XG4gICAgfVxuICB9XG5cbiAgLy8gQ2xpY2tpbmcgb3V0c2lkZSB0aGUgbW9kYWwgZGlzbWlzc2VzIGl0IChpZiBhbGxvd2VkIGJ5IHVzZXIpXG4gIGdldE92ZXJsYXkoKS5vbmNsaWNrID0gb25CdXR0b25FdmVudDtcblxuICBwcmV2aW91c1dpbmRvd0tleURvd24gPSB3aW5kb3cub25rZXlkb3duO1xuXG4gIHZhciBvbktleUV2ZW50ID0gKGUpID0+IGhhbmRsZUtleURvd24oZSwgcGFyYW1zLCBtb2RhbCk7XG4gIHdpbmRvdy5vbmtleWRvd24gPSBvbktleUV2ZW50O1xuXG4gIHdpbmRvdy5vbmZvY3VzID0gZnVuY3Rpb24gKCkge1xuICAgIC8vIFdoZW4gdGhlIHVzZXIgaGFzIGZvY3VzZWQgYXdheSBhbmQgZm9jdXNlZCBiYWNrIGZyb20gdGhlIHdob2xlIHdpbmRvdy5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIFB1dCBpbiBhIHRpbWVvdXQgdG8ganVtcCBvdXQgb2YgdGhlIGV2ZW50IHNlcXVlbmNlLlxuICAgICAgLy8gQ2FsbGluZyBmb2N1cygpIGluIHRoZSBldmVudCBzZXF1ZW5jZSBjb25mdXNlcyB0aGluZ3MuXG4gICAgICBpZiAobGFzdEZvY3VzZWRCdXR0b24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBsYXN0Rm9jdXNlZEJ1dHRvbi5mb2N1cygpO1xuICAgICAgICBsYXN0Rm9jdXNlZEJ1dHRvbiA9IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9LCAwKTtcbiAgfTtcbiAgXG4gIC8vIFNob3cgYWxlcnQgd2l0aCBlbmFibGVkIGJ1dHRvbnMgYWx3YXlzXG4gIHN3YWwuZW5hYmxlQnV0dG9ucygpO1xufTtcblxuXG5cbi8qXG4gKiBTZXQgZGVmYXVsdCBwYXJhbXMgZm9yIGVhY2ggcG9wdXBcbiAqIEBwYXJhbSB7T2JqZWN0fSB1c2VyUGFyYW1zXG4gKi9cbnN3ZWV0QWxlcnQuc2V0RGVmYXVsdHMgPSBzd2FsLnNldERlZmF1bHRzID0gZnVuY3Rpb24odXNlclBhcmFtcykge1xuICBpZiAoIXVzZXJQYXJhbXMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3VzZXJQYXJhbXMgaXMgcmVxdWlyZWQnKTtcbiAgfVxuICBpZiAodHlwZW9mIHVzZXJQYXJhbXMgIT09ICdvYmplY3QnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCd1c2VyUGFyYW1zIGhhcyB0byBiZSBhIG9iamVjdCcpO1xuICB9XG5cbiAgZXh0ZW5kKGRlZmF1bHRQYXJhbXMsIHVzZXJQYXJhbXMpO1xufTtcblxuXG4vKlxuICogQW5pbWF0aW9uIHdoZW4gY2xvc2luZyBtb2RhbFxuICovXG5zd2VldEFsZXJ0LmNsb3NlID0gc3dhbC5jbG9zZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgbW9kYWwgPSBnZXRNb2RhbCgpO1xuXG4gIGZhZGVPdXQoZ2V0T3ZlcmxheSgpLCA1KTtcbiAgZmFkZU91dChtb2RhbCwgNSk7XG4gIHJlbW92ZUNsYXNzKG1vZGFsLCAnc2hvd1N3ZWV0QWxlcnQnKTtcbiAgYWRkQ2xhc3MobW9kYWwsICdoaWRlU3dlZXRBbGVydCcpO1xuICByZW1vdmVDbGFzcyhtb2RhbCwgJ3Zpc2libGUnKTtcblxuICAvKlxuICAgKiBSZXNldCBpY29uIGFuaW1hdGlvbnNcbiAgICovXG4gIHZhciAkc3VjY2Vzc0ljb24gPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcuc2EtaWNvbi5zYS1zdWNjZXNzJyk7XG4gIHJlbW92ZUNsYXNzKCRzdWNjZXNzSWNvbiwgJ2FuaW1hdGUnKTtcbiAgcmVtb3ZlQ2xhc3MoJHN1Y2Nlc3NJY29uLnF1ZXJ5U2VsZWN0b3IoJy5zYS10aXAnKSwgJ2FuaW1hdGVTdWNjZXNzVGlwJyk7XG4gIHJlbW92ZUNsYXNzKCRzdWNjZXNzSWNvbi5xdWVyeVNlbGVjdG9yKCcuc2EtbG9uZycpLCAnYW5pbWF0ZVN1Y2Nlc3NMb25nJyk7XG5cbiAgdmFyICRlcnJvckljb24gPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcuc2EtaWNvbi5zYS1lcnJvcicpO1xuICByZW1vdmVDbGFzcygkZXJyb3JJY29uLCAnYW5pbWF0ZUVycm9ySWNvbicpO1xuICByZW1vdmVDbGFzcygkZXJyb3JJY29uLnF1ZXJ5U2VsZWN0b3IoJy5zYS14LW1hcmsnKSwgJ2FuaW1hdGVYTWFyaycpO1xuXG4gIHZhciAkd2FybmluZ0ljb24gPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcuc2EtaWNvbi5zYS13YXJuaW5nJyk7XG4gIHJlbW92ZUNsYXNzKCR3YXJuaW5nSWNvbiwgJ3B1bHNlV2FybmluZycpO1xuICByZW1vdmVDbGFzcygkd2FybmluZ0ljb24ucXVlcnlTZWxlY3RvcignLnNhLWJvZHknKSwgJ3B1bHNlV2FybmluZ0lucycpO1xuICByZW1vdmVDbGFzcygkd2FybmluZ0ljb24ucXVlcnlTZWxlY3RvcignLnNhLWRvdCcpLCAncHVsc2VXYXJuaW5nSW5zJyk7XG5cbiAgLy8gUmVzZXQgY3VzdG9tIGNsYXNzIChkZWxheSBzbyB0aGF0IFVJIGNoYW5nZXMgYXJlbid0IHZpc2libGUpXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgdmFyIGN1c3RvbUNsYXNzID0gbW9kYWwuZ2V0QXR0cmlidXRlKCdkYXRhLWN1c3RvbS1jbGFzcycpO1xuICAgIHJlbW92ZUNsYXNzKG1vZGFsLCBjdXN0b21DbGFzcyk7XG4gIH0sIDMwMCk7XG5cbiAgLy8gTWFrZSBwYWdlIHNjcm9sbGFibGUgYWdhaW5cbiAgcmVtb3ZlQ2xhc3MoZG9jdW1lbnQuYm9keSwgJ3N0b3Atc2Nyb2xsaW5nJyk7XG5cbiAgLy8gUmVzZXQgdGhlIHBhZ2UgdG8gaXRzIHByZXZpb3VzIHN0YXRlXG4gIHdpbmRvdy5vbmtleWRvd24gPSBwcmV2aW91c1dpbmRvd0tleURvd247XG4gIGlmICh3aW5kb3cucHJldmlvdXNBY3RpdmVFbGVtZW50KSB7XG4gICAgd2luZG93LnByZXZpb3VzQWN0aXZlRWxlbWVudC5mb2N1cygpO1xuICB9XG4gIGxhc3RGb2N1c2VkQnV0dG9uID0gdW5kZWZpbmVkO1xuICBjbGVhclRpbWVvdXQobW9kYWwudGltZW91dCk7XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5cbi8qXG4gKiBWYWxpZGF0aW9uIG9mIHRoZSBpbnB1dCBmaWVsZCBpcyBkb25lIGJ5IHVzZXJcbiAqIElmIHNvbWV0aGluZyBpcyB3cm9uZyA9PiBjYWxsIHNob3dJbnB1dEVycm9yIHdpdGggZXJyb3JNZXNzYWdlXG4gKi9cbnN3ZWV0QWxlcnQuc2hvd0lucHV0RXJyb3IgPSBzd2FsLnNob3dJbnB1dEVycm9yID0gZnVuY3Rpb24oZXJyb3JNZXNzYWdlKSB7XG4gIHZhciBtb2RhbCA9IGdldE1vZGFsKCk7XG5cbiAgdmFyICRlcnJvckljb24gPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcuc2EtaW5wdXQtZXJyb3InKTtcbiAgYWRkQ2xhc3MoJGVycm9ySWNvbiwgJ3Nob3cnKTtcblxuICB2YXIgJGVycm9yQ29udGFpbmVyID0gbW9kYWwucXVlcnlTZWxlY3RvcignLnNhLWVycm9yLWNvbnRhaW5lcicpO1xuICBhZGRDbGFzcygkZXJyb3JDb250YWluZXIsICdzaG93Jyk7XG5cbiAgJGVycm9yQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ3AnKS5pbm5lckhUTUwgPSBlcnJvck1lc3NhZ2U7XG5cbiAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICBzd2VldEFsZXJ0LmVuYWJsZUJ1dHRvbnMoKTtcbiAgfSwgMSk7XG5cbiAgbW9kYWwucXVlcnlTZWxlY3RvcignaW5wdXQnKS5mb2N1cygpO1xufTtcblxuXG4vKlxuICogUmVzZXQgaW5wdXQgZXJyb3IgRE9NIGVsZW1lbnRzXG4gKi9cbnN3ZWV0QWxlcnQucmVzZXRJbnB1dEVycm9yID0gc3dhbC5yZXNldElucHV0RXJyb3IgPSBmdW5jdGlvbihldmVudCkge1xuICAvLyBJZiBwcmVzcyBlbnRlciA9PiBpZ25vcmVcbiAgaWYgKGV2ZW50ICYmIGV2ZW50LmtleUNvZGUgPT09IDEzKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyICRtb2RhbCA9IGdldE1vZGFsKCk7XG5cbiAgdmFyICRlcnJvckljb24gPSAkbW9kYWwucXVlcnlTZWxlY3RvcignLnNhLWlucHV0LWVycm9yJyk7XG4gIHJlbW92ZUNsYXNzKCRlcnJvckljb24sICdzaG93Jyk7XG5cbiAgdmFyICRlcnJvckNvbnRhaW5lciA9ICRtb2RhbC5xdWVyeVNlbGVjdG9yKCcuc2EtZXJyb3ItY29udGFpbmVyJyk7XG4gIHJlbW92ZUNsYXNzKCRlcnJvckNvbnRhaW5lciwgJ3Nob3cnKTtcbn07XG5cbi8qXG4gKiBEaXNhYmxlIGNvbmZpcm0gYW5kIGNhbmNlbCBidXR0b25zXG4gKi9cbnN3ZWV0QWxlcnQuZGlzYWJsZUJ1dHRvbnMgPSBzd2FsLmRpc2FibGVCdXR0b25zID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgdmFyIG1vZGFsID0gZ2V0TW9kYWwoKTtcbiAgdmFyICRjb25maXJtQnV0dG9uID0gbW9kYWwucXVlcnlTZWxlY3RvcignYnV0dG9uLmNvbmZpcm0nKTtcbiAgdmFyICRjYW5jZWxCdXR0b24gPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCdidXR0b24uY2FuY2VsJyk7XG4gICRjb25maXJtQnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgJGNhbmNlbEJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG59O1xuXG4vKlxuICogRW5hYmxlIGNvbmZpcm0gYW5kIGNhbmNlbCBidXR0b25zXG4gKi9cbnN3ZWV0QWxlcnQuZW5hYmxlQnV0dG9ucyA9IHN3YWwuZW5hYmxlQnV0dG9ucyA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gIHZhciBtb2RhbCA9IGdldE1vZGFsKCk7XG4gIHZhciAkY29uZmlybUJ1dHRvbiA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5jb25maXJtJyk7XG4gIHZhciAkY2FuY2VsQnV0dG9uID0gbW9kYWwucXVlcnlTZWxlY3RvcignYnV0dG9uLmNhbmNlbCcpO1xuICAkY29uZmlybUJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xuICAkY2FuY2VsQnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XG59O1xuXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgLy8gVGhlICdoYW5kbGUtY2xpY2snIG1vZHVsZSByZXF1aXJlc1xuICAvLyB0aGF0ICdzd2VldEFsZXJ0JyB3YXMgc2V0IGFzIGdsb2JhbC5cbiAgd2luZG93LnN3ZWV0QWxlcnQgPSB3aW5kb3cuc3dhbCA9IHN3ZWV0QWxlcnQ7XG59IGVsc2Uge1xuICBsb2dTdHIoJ1N3ZWV0QWxlcnQgaXMgYSBmcm9udGVuZCBtb2R1bGUhJyk7XG59XG4iLCJ2YXIgZGVmYXVsdFBhcmFtcyA9IHtcbiAgdGl0bGU6ICcnLFxuICB0ZXh0OiAnJyxcbiAgdHlwZTogbnVsbCxcbiAgYWxsb3dPdXRzaWRlQ2xpY2s6IGZhbHNlLFxuICBzaG93Q29uZmlybUJ1dHRvbjogdHJ1ZSxcbiAgc2hvd0NhbmNlbEJ1dHRvbjogZmFsc2UsXG4gIGNsb3NlT25Db25maXJtOiB0cnVlLFxuICBjbG9zZU9uQ2FuY2VsOiB0cnVlLFxuICBjb25maXJtQnV0dG9uVGV4dDogJ09LJyxcbiAgY29uZmlybUJ1dHRvbkNvbG9yOiAnIzhDRDRGNScsXG4gIGNhbmNlbEJ1dHRvblRleHQ6ICdDYW5jZWwnLFxuICBpbWFnZVVybDogbnVsbCxcbiAgaW1hZ2VTaXplOiBudWxsLFxuICB0aW1lcjogbnVsbCxcbiAgY3VzdG9tQ2xhc3M6ICcnLFxuICBodG1sOiBmYWxzZSxcbiAgYW5pbWF0aW9uOiB0cnVlLFxuICBhbGxvd0VzY2FwZUtleTogdHJ1ZSxcbiAgaW5wdXRUeXBlOiAndGV4dCcsXG4gIGlucHV0UGxhY2Vob2xkZXI6ICcnLFxuICBpbnB1dFZhbHVlOiAnJyxcbiAgc2hvd0xvYWRlck9uQ29uZmlybTogZmFsc2Vcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmF1bHRQYXJhbXM7XG4iLCJpbXBvcnQgeyBjb2xvckx1bWluYW5jZSB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHsgZ2V0TW9kYWwgfSBmcm9tICcuL2hhbmRsZS1zd2FsLWRvbSc7XG5pbXBvcnQgeyBoYXNDbGFzcywgaXNEZXNjZW5kYW50IH0gZnJvbSAnLi9oYW5kbGUtZG9tJztcblxuXG4vKlxuICogVXNlciBjbGlja2VkIG9uIFwiQ29uZmlybVwiL1wiT0tcIiBvciBcIkNhbmNlbFwiXG4gKi9cbnZhciBoYW5kbGVCdXR0b24gPSBmdW5jdGlvbihldmVudCwgcGFyYW1zLCBtb2RhbCkge1xuICB2YXIgZSA9IGV2ZW50IHx8IHdpbmRvdy5ldmVudDtcbiAgdmFyIHRhcmdldCA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudDtcblxuICB2YXIgdGFyZ2V0ZWRDb25maXJtID0gdGFyZ2V0LmNsYXNzTmFtZS5pbmRleE9mKCdjb25maXJtJykgIT09IC0xO1xuICB2YXIgdGFyZ2V0ZWRPdmVybGF5ID0gdGFyZ2V0LmNsYXNzTmFtZS5pbmRleE9mKCdzd2VldC1vdmVybGF5JykgIT09IC0xO1xuICB2YXIgbW9kYWxJc1Zpc2libGUgID0gaGFzQ2xhc3MobW9kYWwsICd2aXNpYmxlJyk7XG4gIHZhciBkb25lRnVuY3Rpb25FeGlzdHMgPSAocGFyYW1zLmRvbmVGdW5jdGlvbiAmJiBtb2RhbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaGFzLWRvbmUtZnVuY3Rpb24nKSA9PT0gJ3RydWUnKTtcblxuICAvLyBTaW5jZSB0aGUgdXNlciBjYW4gY2hhbmdlIHRoZSBiYWNrZ3JvdW5kLWNvbG9yIG9mIHRoZSBjb25maXJtIGJ1dHRvbiBwcm9ncmFtbWF0aWNhbGx5LFxuICAvLyB3ZSBtdXN0IGNhbGN1bGF0ZSB3aGF0IHRoZSBjb2xvciBzaG91bGQgYmUgb24gaG92ZXIvYWN0aXZlXG4gIHZhciBub3JtYWxDb2xvciwgaG92ZXJDb2xvciwgYWN0aXZlQ29sb3I7XG4gIGlmICh0YXJnZXRlZENvbmZpcm0gJiYgcGFyYW1zLmNvbmZpcm1CdXR0b25Db2xvcikge1xuICAgIG5vcm1hbENvbG9yICA9IHBhcmFtcy5jb25maXJtQnV0dG9uQ29sb3I7XG4gICAgaG92ZXJDb2xvciAgID0gY29sb3JMdW1pbmFuY2Uobm9ybWFsQ29sb3IsIC0wLjA0KTtcbiAgICBhY3RpdmVDb2xvciAgPSBjb2xvckx1bWluYW5jZShub3JtYWxDb2xvciwgLTAuMTQpO1xuICB9XG5cbiAgZnVuY3Rpb24gc2hvdWxkU2V0Q29uZmlybUJ1dHRvbkNvbG9yKGNvbG9yKSB7XG4gICAgaWYgKHRhcmdldGVkQ29uZmlybSAmJiBwYXJhbXMuY29uZmlybUJ1dHRvbkNvbG9yKSB7XG4gICAgICB0YXJnZXQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gY29sb3I7XG4gICAgfVxuICB9XG5cbiAgc3dpdGNoIChlLnR5cGUpIHtcbiAgICBjYXNlICdtb3VzZW92ZXInOlxuICAgICAgc2hvdWxkU2V0Q29uZmlybUJ1dHRvbkNvbG9yKGhvdmVyQ29sb3IpO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdtb3VzZW91dCc6XG4gICAgICBzaG91bGRTZXRDb25maXJtQnV0dG9uQ29sb3Iobm9ybWFsQ29sb3IpO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdtb3VzZWRvd24nOlxuICAgICAgc2hvdWxkU2V0Q29uZmlybUJ1dHRvbkNvbG9yKGFjdGl2ZUNvbG9yKTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAnbW91c2V1cCc6XG4gICAgICBzaG91bGRTZXRDb25maXJtQnV0dG9uQ29sb3IoaG92ZXJDb2xvcik7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ2ZvY3VzJzpcbiAgICAgIGxldCAkY29uZmlybUJ1dHRvbiA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5jb25maXJtJyk7XG4gICAgICBsZXQgJGNhbmNlbEJ1dHRvbiAgPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCdidXR0b24uY2FuY2VsJyk7XG5cbiAgICAgIGlmICh0YXJnZXRlZENvbmZpcm0pIHtcbiAgICAgICAgJGNhbmNlbEJ1dHRvbi5zdHlsZS5ib3hTaGFkb3cgPSAnbm9uZSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkY29uZmlybUJ1dHRvbi5zdHlsZS5ib3hTaGFkb3cgPSAnbm9uZSc7XG4gICAgICB9XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ2NsaWNrJzpcbiAgICAgIGxldCBjbGlja2VkT25Nb2RhbCA9IChtb2RhbCA9PT0gdGFyZ2V0KTtcbiAgICAgIGxldCBjbGlja2VkT25Nb2RhbENoaWxkID0gaXNEZXNjZW5kYW50KG1vZGFsLCB0YXJnZXQpO1xuXG4gICAgICAvLyBJZ25vcmUgY2xpY2sgb3V0c2lkZSBpZiBhbGxvd091dHNpZGVDbGljayBpcyBmYWxzZVxuICAgICAgaWYgKCFjbGlja2VkT25Nb2RhbCAmJiAhY2xpY2tlZE9uTW9kYWxDaGlsZCAmJiBtb2RhbElzVmlzaWJsZSAmJiAhcGFyYW1zLmFsbG93T3V0c2lkZUNsaWNrKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBpZiAodGFyZ2V0ZWRDb25maXJtICYmIGRvbmVGdW5jdGlvbkV4aXN0cyAmJiBtb2RhbElzVmlzaWJsZSkge1xuICAgICAgICBoYW5kbGVDb25maXJtKG1vZGFsLCBwYXJhbXMpO1xuICAgICAgfSBlbHNlIGlmIChkb25lRnVuY3Rpb25FeGlzdHMgJiYgbW9kYWxJc1Zpc2libGUgfHwgdGFyZ2V0ZWRPdmVybGF5KSB7XG4gICAgICAgIGhhbmRsZUNhbmNlbChtb2RhbCwgcGFyYW1zKTtcbiAgICAgIH0gZWxzZSBpZiAoaXNEZXNjZW5kYW50KG1vZGFsLCB0YXJnZXQpICYmIHRhcmdldC50YWdOYW1lID09PSAnQlVUVE9OJykge1xuICAgICAgICBzd2VldEFsZXJ0LmNsb3NlKCk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgfVxufTtcblxuLypcbiAqICBVc2VyIGNsaWNrZWQgb24gXCJDb25maXJtXCIvXCJPS1wiXG4gKi9cbnZhciBoYW5kbGVDb25maXJtID0gZnVuY3Rpb24obW9kYWwsIHBhcmFtcykge1xuICB2YXIgY2FsbGJhY2tWYWx1ZSA9IHRydWU7XG5cbiAgaWYgKGhhc0NsYXNzKG1vZGFsLCAnc2hvdy1pbnB1dCcpKSB7XG4gICAgY2FsbGJhY2tWYWx1ZSA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0JykudmFsdWU7XG5cbiAgICBpZiAoIWNhbGxiYWNrVmFsdWUpIHtcbiAgICAgIGNhbGxiYWNrVmFsdWUgPSAnJztcbiAgICB9XG4gIH1cblxuICBwYXJhbXMuZG9uZUZ1bmN0aW9uKGNhbGxiYWNrVmFsdWUpO1xuXG4gIGlmIChwYXJhbXMuY2xvc2VPbkNvbmZpcm0pIHtcbiAgICBzd2VldEFsZXJ0LmNsb3NlKCk7XG4gIH1cbiAgLy8gRGlzYWJsZSBjYW5jZWwgYW5kIGNvbmZpcm0gYnV0dG9uIGlmIHRoZSBwYXJhbWV0ZXIgaXMgdHJ1ZVxuICBpZiAocGFyYW1zLnNob3dMb2FkZXJPbkNvbmZpcm0pIHtcbiAgICBzd2VldEFsZXJ0LmRpc2FibGVCdXR0b25zKCk7XG4gIH1cbn07XG5cbi8qXG4gKiAgVXNlciBjbGlja2VkIG9uIFwiQ2FuY2VsXCJcbiAqL1xudmFyIGhhbmRsZUNhbmNlbCA9IGZ1bmN0aW9uKG1vZGFsLCBwYXJhbXMpIHtcbiAgLy8gQ2hlY2sgaWYgY2FsbGJhY2sgZnVuY3Rpb24gZXhwZWN0cyBhIHBhcmFtZXRlciAodG8gdHJhY2sgY2FuY2VsIGFjdGlvbnMpXG4gIHZhciBmdW5jdGlvbkFzU3RyID0gU3RyaW5nKHBhcmFtcy5kb25lRnVuY3Rpb24pLnJlcGxhY2UoL1xccy9nLCAnJyk7XG4gIHZhciBmdW5jdGlvbkhhbmRsZXNDYW5jZWwgPSBmdW5jdGlvbkFzU3RyLnN1YnN0cmluZygwLCA5KSA9PT0gJ2Z1bmN0aW9uKCcgJiYgZnVuY3Rpb25Bc1N0ci5zdWJzdHJpbmcoOSwgMTApICE9PSAnKSc7XG5cbiAgaWYgKGZ1bmN0aW9uSGFuZGxlc0NhbmNlbCkge1xuICAgIHBhcmFtcy5kb25lRnVuY3Rpb24oZmFsc2UpO1xuICB9XG5cbiAgaWYgKHBhcmFtcy5jbG9zZU9uQ2FuY2VsKSB7XG4gICAgc3dlZXRBbGVydC5jbG9zZSgpO1xuICB9XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaGFuZGxlQnV0dG9uLFxuICBoYW5kbGVDb25maXJtLFxuICBoYW5kbGVDYW5jZWxcbn07XG4iLCJ2YXIgaGFzQ2xhc3MgPSBmdW5jdGlvbihlbGVtLCBjbGFzc05hbWUpIHtcbiAgcmV0dXJuIG5ldyBSZWdFeHAoJyAnICsgY2xhc3NOYW1lICsgJyAnKS50ZXN0KCcgJyArIGVsZW0uY2xhc3NOYW1lICsgJyAnKTtcbn07XG5cbnZhciBhZGRDbGFzcyA9IGZ1bmN0aW9uKGVsZW0sIGNsYXNzTmFtZSkge1xuICBpZiAoIWhhc0NsYXNzKGVsZW0sIGNsYXNzTmFtZSkpIHtcbiAgICBlbGVtLmNsYXNzTmFtZSArPSAnICcgKyBjbGFzc05hbWU7XG4gIH1cbn07XG5cbnZhciByZW1vdmVDbGFzcyA9IGZ1bmN0aW9uKGVsZW0sIGNsYXNzTmFtZSkge1xuICB2YXIgbmV3Q2xhc3MgPSAnICcgKyBlbGVtLmNsYXNzTmFtZS5yZXBsYWNlKC9bXFx0XFxyXFxuXS9nLCAnICcpICsgJyAnO1xuICBpZiAoaGFzQ2xhc3MoZWxlbSwgY2xhc3NOYW1lKSkge1xuICAgIHdoaWxlIChuZXdDbGFzcy5pbmRleE9mKCcgJyArIGNsYXNzTmFtZSArICcgJykgPj0gMCkge1xuICAgICAgbmV3Q2xhc3MgPSBuZXdDbGFzcy5yZXBsYWNlKCcgJyArIGNsYXNzTmFtZSArICcgJywgJyAnKTtcbiAgICB9XG4gICAgZWxlbS5jbGFzc05hbWUgPSBuZXdDbGFzcy5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJyk7XG4gIH1cbn07XG5cbnZhciBlc2NhcGVIdG1sID0gZnVuY3Rpb24oc3RyKSB7XG4gIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgZGl2LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHN0cikpO1xuICByZXR1cm4gZGl2LmlubmVySFRNTDtcbn07XG5cbnZhciBfc2hvdyA9IGZ1bmN0aW9uKGVsZW0pIHtcbiAgZWxlbS5zdHlsZS5vcGFjaXR5ID0gJyc7XG4gIGVsZW0uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG59O1xuXG52YXIgc2hvdyA9IGZ1bmN0aW9uKGVsZW1zKSB7XG4gIGlmIChlbGVtcyAmJiAhZWxlbXMubGVuZ3RoKSB7XG4gICAgcmV0dXJuIF9zaG93KGVsZW1zKTtcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGVsZW1zLmxlbmd0aDsgKytpKSB7XG4gICAgX3Nob3coZWxlbXNbaV0pO1xuICB9XG59O1xuXG52YXIgX2hpZGUgPSBmdW5jdGlvbihlbGVtKSB7XG4gIGVsZW0uc3R5bGUub3BhY2l0eSA9ICcnO1xuICBlbGVtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG59O1xuXG52YXIgaGlkZSA9IGZ1bmN0aW9uKGVsZW1zKSB7XG4gIGlmIChlbGVtcyAmJiAhZWxlbXMubGVuZ3RoKSB7XG4gICAgcmV0dXJuIF9oaWRlKGVsZW1zKTtcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGVsZW1zLmxlbmd0aDsgKytpKSB7XG4gICAgX2hpZGUoZWxlbXNbaV0pO1xuICB9XG59O1xuXG52YXIgaXNEZXNjZW5kYW50ID0gZnVuY3Rpb24ocGFyZW50LCBjaGlsZCkge1xuICB2YXIgbm9kZSA9IGNoaWxkLnBhcmVudE5vZGU7XG4gIHdoaWxlIChub2RlICE9PSBudWxsKSB7XG4gICAgaWYgKG5vZGUgPT09IHBhcmVudCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIG5vZGUgPSBub2RlLnBhcmVudE5vZGU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxudmFyIGdldFRvcE1hcmdpbiA9IGZ1bmN0aW9uKGVsZW0pIHtcbiAgZWxlbS5zdHlsZS5sZWZ0ID0gJy05OTk5cHgnO1xuICBlbGVtLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXG4gIHZhciBoZWlnaHQgPSBlbGVtLmNsaWVudEhlaWdodCxcbiAgICAgIHBhZGRpbmc7XG4gIGlmICh0eXBlb2YgZ2V0Q29tcHV0ZWRTdHlsZSAhPT0gXCJ1bmRlZmluZWRcIikgeyAvLyBJRSA4XG4gICAgcGFkZGluZyA9IHBhcnNlSW50KGdldENvbXB1dGVkU3R5bGUoZWxlbSkuZ2V0UHJvcGVydHlWYWx1ZSgncGFkZGluZy10b3AnKSwgMTApO1xuICB9IGVsc2Uge1xuICAgIHBhZGRpbmcgPSBwYXJzZUludChlbGVtLmN1cnJlbnRTdHlsZS5wYWRkaW5nKTtcbiAgfVxuXG4gIGVsZW0uc3R5bGUubGVmdCA9ICcnO1xuICBlbGVtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIHJldHVybiAoJy0nICsgcGFyc2VJbnQoKGhlaWdodCArIHBhZGRpbmcpIC8gMikgKyAncHgnKTtcbn07XG5cbnZhciBmYWRlSW4gPSBmdW5jdGlvbihlbGVtLCBpbnRlcnZhbCkge1xuICBpZiAoK2VsZW0uc3R5bGUub3BhY2l0eSA8IDEpIHtcbiAgICBpbnRlcnZhbCA9IGludGVydmFsIHx8IDE2O1xuICAgIGVsZW0uc3R5bGUub3BhY2l0eSA9IDA7XG4gICAgZWxlbS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB2YXIgbGFzdCA9ICtuZXcgRGF0ZSgpO1xuICAgIHZhciB0aWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICBlbGVtLnN0eWxlLm9wYWNpdHkgPSArZWxlbS5zdHlsZS5vcGFjaXR5ICsgKG5ldyBEYXRlKCkgLSBsYXN0KSAvIDEwMDtcbiAgICAgIGxhc3QgPSArbmV3IERhdGUoKTtcblxuICAgICAgaWYgKCtlbGVtLnN0eWxlLm9wYWNpdHkgPCAxKSB7XG4gICAgICAgIHNldFRpbWVvdXQodGljaywgaW50ZXJ2YWwpO1xuICAgICAgfVxuICAgIH07XG4gICAgdGljaygpO1xuICB9XG4gIGVsZW0uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7IC8vZmFsbGJhY2sgSUU4XG59O1xuXG52YXIgZmFkZU91dCA9IGZ1bmN0aW9uKGVsZW0sIGludGVydmFsKSB7XG4gIGludGVydmFsID0gaW50ZXJ2YWwgfHwgMTY7XG4gIGVsZW0uc3R5bGUub3BhY2l0eSA9IDE7XG4gIHZhciBsYXN0ID0gK25ldyBEYXRlKCk7XG4gIHZhciB0aWNrID0gZnVuY3Rpb24oKSB7XG4gICAgZWxlbS5zdHlsZS5vcGFjaXR5ID0gK2VsZW0uc3R5bGUub3BhY2l0eSAtIChuZXcgRGF0ZSgpIC0gbGFzdCkgLyAxMDA7XG4gICAgbGFzdCA9ICtuZXcgRGF0ZSgpO1xuXG4gICAgaWYgKCtlbGVtLnN0eWxlLm9wYWNpdHkgPiAwKSB7XG4gICAgICBzZXRUaW1lb3V0KHRpY2ssIGludGVydmFsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH1cbiAgfTtcbiAgdGljaygpO1xufTtcblxudmFyIGZpcmVDbGljayA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgLy8gVGFrZW4gZnJvbSBodHRwOi8vd3d3Lm5vbm9idHJ1c2l2ZS5jb20vMjAxMS8xMS8yOS9wcm9ncmFtYXRpY2FsbHktZmlyZS1jcm9zc2Jyb3dzZXItY2xpY2stZXZlbnQtd2l0aC1qYXZhc2NyaXB0L1xuICAvLyBUaGVuIGZpeGVkIGZvciB0b2RheSdzIENocm9tZSBicm93c2VyLlxuICBpZiAodHlwZW9mIE1vdXNlRXZlbnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAvLyBVcC10by1kYXRlIGFwcHJvYWNoXG4gICAgdmFyIG1ldnQgPSBuZXcgTW91c2VFdmVudCgnY2xpY2snLCB7XG4gICAgICB2aWV3OiB3aW5kb3csXG4gICAgICBidWJibGVzOiBmYWxzZSxcbiAgICAgIGNhbmNlbGFibGU6IHRydWVcbiAgICB9KTtcbiAgICBub2RlLmRpc3BhdGNoRXZlbnQobWV2dCk7XG4gIH0gZWxzZSBpZiAoIGRvY3VtZW50LmNyZWF0ZUV2ZW50ICkge1xuICAgIC8vIEZhbGxiYWNrXG4gICAgdmFyIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdNb3VzZUV2ZW50cycpO1xuICAgIGV2dC5pbml0RXZlbnQoJ2NsaWNrJywgZmFsc2UsIGZhbHNlKTtcbiAgICBub2RlLmRpc3BhdGNoRXZlbnQoZXZ0KTtcbiAgfSBlbHNlIGlmIChkb2N1bWVudC5jcmVhdGVFdmVudE9iamVjdCkge1xuICAgIG5vZGUuZmlyZUV2ZW50KCdvbmNsaWNrJykgO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBub2RlLm9uY2xpY2sgPT09ICdmdW5jdGlvbicgKSB7XG4gICAgbm9kZS5vbmNsaWNrKCk7XG4gIH1cbn07XG5cbnZhciBzdG9wRXZlbnRQcm9wYWdhdGlvbiA9IGZ1bmN0aW9uKGUpIHtcbiAgLy8gSW4gcGFydGljdWxhciwgbWFrZSBzdXJlIHRoZSBzcGFjZSBiYXIgZG9lc24ndCBzY3JvbGwgdGhlIG1haW4gd2luZG93LlxuICBpZiAodHlwZW9mIGUuc3RvcFByb3BhZ2F0aW9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIH0gZWxzZSBpZiAod2luZG93LmV2ZW50ICYmIHdpbmRvdy5ldmVudC5oYXNPd25Qcm9wZXJ0eSgnY2FuY2VsQnViYmxlJykpIHtcbiAgICB3aW5kb3cuZXZlbnQuY2FuY2VsQnViYmxlID0gdHJ1ZTtcbiAgfVxufTtcblxuZXhwb3J0IHsgXG4gIGhhc0NsYXNzLCBhZGRDbGFzcywgcmVtb3ZlQ2xhc3MsIFxuICBlc2NhcGVIdG1sLCBcbiAgX3Nob3csIHNob3csIF9oaWRlLCBoaWRlLCBcbiAgaXNEZXNjZW5kYW50LCBcbiAgZ2V0VG9wTWFyZ2luLFxuICBmYWRlSW4sIGZhZGVPdXQsXG4gIGZpcmVDbGljayxcbiAgc3RvcEV2ZW50UHJvcGFnYXRpb25cbn07XG4iLCJpbXBvcnQgeyBzdG9wRXZlbnRQcm9wYWdhdGlvbiwgZmlyZUNsaWNrIH0gZnJvbSAnLi9oYW5kbGUtZG9tJztcbmltcG9ydCB7IHNldEZvY3VzU3R5bGUgfSBmcm9tICcuL2hhbmRsZS1zd2FsLWRvbSc7XG5cblxudmFyIGhhbmRsZUtleURvd24gPSBmdW5jdGlvbihldmVudCwgcGFyYW1zLCBtb2RhbCkge1xuICB2YXIgZSA9IGV2ZW50IHx8IHdpbmRvdy5ldmVudDtcbiAgdmFyIGtleUNvZGUgPSBlLmtleUNvZGUgfHwgZS53aGljaDtcblxuICB2YXIgJG9rQnV0dG9uICAgICA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5jb25maXJtJyk7XG4gIHZhciAkY2FuY2VsQnV0dG9uID0gbW9kYWwucXVlcnlTZWxlY3RvcignYnV0dG9uLmNhbmNlbCcpO1xuICB2YXIgJG1vZGFsQnV0dG9ucyA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3JBbGwoJ2J1dHRvblt0YWJpbmRleF0nKTtcblxuXG4gIGlmIChbOSwgMTMsIDMyLCAyN10uaW5kZXhPZihrZXlDb2RlKSA9PT0gLTEpIHtcbiAgICAvLyBEb24ndCBkbyB3b3JrIG9uIGtleXMgd2UgZG9uJ3QgY2FyZSBhYm91dC5cbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgJHRhcmdldEVsZW1lbnQgPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQ7XG5cbiAgdmFyIGJ0bkluZGV4ID0gLTE7IC8vIEZpbmQgdGhlIGJ1dHRvbiAtIG5vdGUsIHRoaXMgaXMgYSBub2RlbGlzdCwgbm90IGFuIGFycmF5LlxuICBmb3IgKHZhciBpID0gMDsgaSA8ICRtb2RhbEJ1dHRvbnMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoJHRhcmdldEVsZW1lbnQgPT09ICRtb2RhbEJ1dHRvbnNbaV0pIHtcbiAgICAgIGJ0bkluZGV4ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGlmIChrZXlDb2RlID09PSA5KSB7XG4gICAgLy8gVEFCXG4gICAgaWYgKGJ0bkluZGV4ID09PSAtMSkge1xuICAgICAgLy8gTm8gYnV0dG9uIGZvY3VzZWQuIEp1bXAgdG8gdGhlIGNvbmZpcm0gYnV0dG9uLlxuICAgICAgJHRhcmdldEVsZW1lbnQgPSAkb2tCdXR0b247XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEN5Y2xlIHRvIHRoZSBuZXh0IGJ1dHRvblxuICAgICAgaWYgKGJ0bkluZGV4ID09PSAkbW9kYWxCdXR0b25zLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgJHRhcmdldEVsZW1lbnQgPSAkbW9kYWxCdXR0b25zWzBdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJHRhcmdldEVsZW1lbnQgPSAkbW9kYWxCdXR0b25zW2J0bkluZGV4ICsgMV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgc3RvcEV2ZW50UHJvcGFnYXRpb24oZSk7XG4gICAgJHRhcmdldEVsZW1lbnQuZm9jdXMoKTtcblxuICAgIGlmIChwYXJhbXMuY29uZmlybUJ1dHRvbkNvbG9yKSB7XG4gICAgICBzZXRGb2N1c1N0eWxlKCR0YXJnZXRFbGVtZW50LCBwYXJhbXMuY29uZmlybUJ1dHRvbkNvbG9yKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKGtleUNvZGUgPT09IDEzKSB7XG4gICAgICBpZiAoJHRhcmdldEVsZW1lbnQudGFnTmFtZSA9PT0gJ0lOUFVUJykge1xuICAgICAgICAkdGFyZ2V0RWxlbWVudCA9ICRva0J1dHRvbjtcbiAgICAgICAgJG9rQnV0dG9uLmZvY3VzKCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChidG5JbmRleCA9PT0gLTEpIHtcbiAgICAgICAgLy8gRU5URVIvU1BBQ0UgY2xpY2tlZCBvdXRzaWRlIG9mIGEgYnV0dG9uLlxuICAgICAgICAkdGFyZ2V0RWxlbWVudCA9ICRva0J1dHRvbjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIERvIG5vdGhpbmcgLSBsZXQgdGhlIGJyb3dzZXIgaGFuZGxlIGl0LlxuICAgICAgICAkdGFyZ2V0RWxlbWVudCA9IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGtleUNvZGUgPT09IDI3ICYmIHBhcmFtcy5hbGxvd0VzY2FwZUtleSA9PT0gdHJ1ZSkge1xuICAgICAgJHRhcmdldEVsZW1lbnQgPSAkY2FuY2VsQnV0dG9uO1xuICAgICAgZmlyZUNsaWNrKCR0YXJnZXRFbGVtZW50LCBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gRmFsbGJhY2sgLSBsZXQgdGhlIGJyb3dzZXIgaGFuZGxlIGl0LlxuICAgICAgJHRhcmdldEVsZW1lbnQgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBoYW5kbGVLZXlEb3duO1xuIiwiaW1wb3J0IHsgaGV4VG9SZ2IgfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7IHJlbW92ZUNsYXNzLCBnZXRUb3BNYXJnaW4sIGZhZGVJbiwgc2hvdywgYWRkQ2xhc3MgfSBmcm9tICcuL2hhbmRsZS1kb20nO1xuaW1wb3J0IGRlZmF1bHRQYXJhbXMgZnJvbSAnLi9kZWZhdWx0LXBhcmFtcyc7XG5cbnZhciBtb2RhbENsYXNzICAgPSAnLnN3ZWV0LWFsZXJ0JztcbnZhciBvdmVybGF5Q2xhc3MgPSAnLnN3ZWV0LW92ZXJsYXknO1xuXG4vKlxuICogQWRkIG1vZGFsICsgb3ZlcmxheSB0byBET01cbiAqL1xuaW1wb3J0IGluamVjdGVkSFRNTCBmcm9tICcuL2luamVjdGVkLWh0bWwnO1xuXG52YXIgc3dlZXRBbGVydEluaXRpYWxpemUgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHN3ZWV0V3JhcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBzd2VldFdyYXAuaW5uZXJIVE1MID0gaW5qZWN0ZWRIVE1MO1xuXG4gIC8vIEFwcGVuZCBlbGVtZW50cyB0byBib2R5XG4gIHdoaWxlIChzd2VldFdyYXAuZmlyc3RDaGlsZCkge1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc3dlZXRXcmFwLmZpcnN0Q2hpbGQpO1xuICB9XG59O1xuXG4vKlxuICogR2V0IERPTSBlbGVtZW50IG9mIG1vZGFsXG4gKi9cbnZhciBnZXRNb2RhbCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgJG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihtb2RhbENsYXNzKTtcblxuICBpZiAoISRtb2RhbCkge1xuICAgIHN3ZWV0QWxlcnRJbml0aWFsaXplKCk7XG4gICAgJG1vZGFsID0gZ2V0TW9kYWwoKTtcbiAgfVxuXG4gIHJldHVybiAkbW9kYWw7XG59O1xuXG4vKlxuICogR2V0IERPTSBlbGVtZW50IG9mIGlucHV0IChpbiBtb2RhbClcbiAqL1xudmFyIGdldElucHV0ID0gZnVuY3Rpb24oKSB7XG4gIHZhciAkbW9kYWwgPSBnZXRNb2RhbCgpO1xuICBpZiAoJG1vZGFsKSB7XG4gICAgcmV0dXJuICRtb2RhbC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpO1xuICB9XG59O1xuXG4vKlxuICogR2V0IERPTSBlbGVtZW50IG9mIG92ZXJsYXlcbiAqL1xudmFyIGdldE92ZXJsYXkgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iob3ZlcmxheUNsYXNzKTtcbn07XG5cbi8qXG4gKiBBZGQgYm94LXNoYWRvdyBzdHlsZSB0byBidXR0b24gKGRlcGVuZGluZyBvbiBpdHMgY2hvc2VuIGJnLWNvbG9yKVxuICovXG52YXIgc2V0Rm9jdXNTdHlsZSA9IGZ1bmN0aW9uKCRidXR0b24sIGJnQ29sb3IpIHtcbiAgdmFyIHJnYkNvbG9yID0gaGV4VG9SZ2IoYmdDb2xvcik7XG4gICRidXR0b24uc3R5bGUuYm94U2hhZG93ID0gJzAgMCAycHggcmdiYSgnICsgcmdiQ29sb3IgKyAnLCAwLjgpLCBpbnNldCAwIDAgMCAxcHggcmdiYSgwLCAwLCAwLCAwLjA1KSc7XG59O1xuXG4vKlxuICogQW5pbWF0aW9uIHdoZW4gb3BlbmluZyBtb2RhbFxuICovXG52YXIgb3Blbk1vZGFsID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgdmFyICRtb2RhbCA9IGdldE1vZGFsKCk7XG4gIGZhZGVJbihnZXRPdmVybGF5KCksIDEwKTtcbiAgc2hvdygkbW9kYWwpO1xuICBhZGRDbGFzcygkbW9kYWwsICdzaG93U3dlZXRBbGVydCcpO1xuICByZW1vdmVDbGFzcygkbW9kYWwsICdoaWRlU3dlZXRBbGVydCcpO1xuXG4gIHdpbmRvdy5wcmV2aW91c0FjdGl2ZUVsZW1lbnQgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICB2YXIgJG9rQnV0dG9uID0gJG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5jb25maXJtJyk7XG4gICRva0J1dHRvbi5mb2N1cygpO1xuXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgIGFkZENsYXNzKCRtb2RhbCwgJ3Zpc2libGUnKTtcbiAgfSwgNTAwKTtcblxuICB2YXIgdGltZXIgPSAkbW9kYWwuZ2V0QXR0cmlidXRlKCdkYXRhLXRpbWVyJyk7XG5cbiAgaWYgKHRpbWVyICE9PSAnbnVsbCcgJiYgdGltZXIgIT09ICcnKSB7XG4gICAgdmFyIHRpbWVyQ2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICAkbW9kYWwudGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgZG9uZUZ1bmN0aW9uRXhpc3RzID0gKCh0aW1lckNhbGxiYWNrIHx8IG51bGwpICYmICRtb2RhbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaGFzLWRvbmUtZnVuY3Rpb24nKSA9PT0gJ3RydWUnKTtcbiAgICAgIGlmIChkb25lRnVuY3Rpb25FeGlzdHMpIHsgXG4gICAgICAgIHRpbWVyQ2FsbGJhY2sobnVsbCk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgc3dlZXRBbGVydC5jbG9zZSgpO1xuICAgICAgfVxuICAgIH0sIHRpbWVyKTtcbiAgfVxufTtcblxuLypcbiAqIFJlc2V0IHRoZSBzdHlsaW5nIG9mIHRoZSBpbnB1dFxuICogKGZvciBleGFtcGxlIGlmIGVycm9ycyBoYXZlIGJlZW4gc2hvd24pXG4gKi9cbnZhciByZXNldElucHV0ID0gZnVuY3Rpb24oKSB7XG4gIHZhciAkbW9kYWwgPSBnZXRNb2RhbCgpO1xuICB2YXIgJGlucHV0ID0gZ2V0SW5wdXQoKTtcblxuICByZW1vdmVDbGFzcygkbW9kYWwsICdzaG93LWlucHV0Jyk7XG4gICRpbnB1dC52YWx1ZSA9IGRlZmF1bHRQYXJhbXMuaW5wdXRWYWx1ZTtcbiAgJGlucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsIGRlZmF1bHRQYXJhbXMuaW5wdXRUeXBlKTtcbiAgJGlucHV0LnNldEF0dHJpYnV0ZSgncGxhY2Vob2xkZXInLCBkZWZhdWx0UGFyYW1zLmlucHV0UGxhY2Vob2xkZXIpO1xuXG4gIHJlc2V0SW5wdXRFcnJvcigpO1xufTtcblxuXG52YXIgcmVzZXRJbnB1dEVycm9yID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgLy8gSWYgcHJlc3MgZW50ZXIgPT4gaWdub3JlXG4gIGlmIChldmVudCAmJiBldmVudC5rZXlDb2RlID09PSAxMykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciAkbW9kYWwgPSBnZXRNb2RhbCgpO1xuXG4gIHZhciAkZXJyb3JJY29uID0gJG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5zYS1pbnB1dC1lcnJvcicpO1xuICByZW1vdmVDbGFzcygkZXJyb3JJY29uLCAnc2hvdycpO1xuXG4gIHZhciAkZXJyb3JDb250YWluZXIgPSAkbW9kYWwucXVlcnlTZWxlY3RvcignLnNhLWVycm9yLWNvbnRhaW5lcicpO1xuICByZW1vdmVDbGFzcygkZXJyb3JDb250YWluZXIsICdzaG93Jyk7XG59O1xuXG5cbi8qXG4gKiBTZXQgXCJtYXJnaW4tdG9wXCItcHJvcGVydHkgb24gbW9kYWwgYmFzZWQgb24gaXRzIGNvbXB1dGVkIGhlaWdodFxuICovXG52YXIgZml4VmVydGljYWxQb3NpdGlvbiA9IGZ1bmN0aW9uKCkge1xuICB2YXIgJG1vZGFsID0gZ2V0TW9kYWwoKTtcbiAgJG1vZGFsLnN0eWxlLm1hcmdpblRvcCA9IGdldFRvcE1hcmdpbihnZXRNb2RhbCgpKTtcbn07XG5cblxuZXhwb3J0IHsgXG4gIHN3ZWV0QWxlcnRJbml0aWFsaXplLFxuICBnZXRNb2RhbCxcbiAgZ2V0T3ZlcmxheSxcbiAgZ2V0SW5wdXQsXG4gIHNldEZvY3VzU3R5bGUsXG4gIG9wZW5Nb2RhbCxcbiAgcmVzZXRJbnB1dCxcbiAgcmVzZXRJbnB1dEVycm9yLFxuICBmaXhWZXJ0aWNhbFBvc2l0aW9uXG59O1xuIiwidmFyIGluamVjdGVkSFRNTCA9IFxuXG4gIC8vIERhcmsgb3ZlcmxheVxuICBgPGRpdiBjbGFzcz1cInN3ZWV0LW92ZXJsYXlcIiB0YWJJbmRleD1cIi0xXCI+PC9kaXY+YCArXG5cbiAgLy8gTW9kYWxcbiAgYDxkaXYgY2xhc3M9XCJzd2VldC1hbGVydFwiPmAgK1xuXG4gICAgLy8gRXJyb3IgaWNvblxuICAgIGA8ZGl2IGNsYXNzPVwic2EtaWNvbiBzYS1lcnJvclwiPlxuICAgICAgPHNwYW4gY2xhc3M9XCJzYS14LW1hcmtcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJzYS1saW5lIHNhLWxlZnRcIj48L3NwYW4+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwic2EtbGluZSBzYS1yaWdodFwiPjwvc3Bhbj5cbiAgICAgIDwvc3Bhbj5cbiAgICA8L2Rpdj5gICtcblxuICAgIC8vIFdhcm5pbmcgaWNvblxuICAgIGA8ZGl2IGNsYXNzPVwic2EtaWNvbiBzYS13YXJuaW5nXCI+XG4gICAgICA8c3BhbiBjbGFzcz1cInNhLWJvZHlcIj48L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cInNhLWRvdFwiPjwvc3Bhbj5cbiAgICA8L2Rpdj5gICtcblxuICAgIC8vIEluZm8gaWNvblxuICAgIGA8ZGl2IGNsYXNzPVwic2EtaWNvbiBzYS1pbmZvXCI+PC9kaXY+YCArXG5cbiAgICAvLyBTdWNjZXNzIGljb25cbiAgICBgPGRpdiBjbGFzcz1cInNhLWljb24gc2Etc3VjY2Vzc1wiPlxuICAgICAgPHNwYW4gY2xhc3M9XCJzYS1saW5lIHNhLXRpcFwiPjwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwic2EtbGluZSBzYS1sb25nXCI+PC9zcGFuPlxuXG4gICAgICA8ZGl2IGNsYXNzPVwic2EtcGxhY2Vob2xkZXJcIj48L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJzYS1maXhcIj48L2Rpdj5cbiAgICA8L2Rpdj5gICtcblxuICAgIGA8ZGl2IGNsYXNzPVwic2EtaWNvbiBzYS1jdXN0b21cIj48L2Rpdj5gICtcblxuICAgIC8vIFRpdGxlLCB0ZXh0IGFuZCBpbnB1dFxuICAgIGA8aDI+VGl0bGU8L2gyPlxuICAgIDxwPlRleHQ8L3A+XG4gICAgPGZpZWxkc2V0PlxuICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgdGFiSW5kZXg9XCIzXCIgLz5cbiAgICAgIDxkaXYgY2xhc3M9XCJzYS1pbnB1dC1lcnJvclwiPjwvZGl2PlxuICAgIDwvZmllbGRzZXQ+YCArXG5cbiAgICAvLyBJbnB1dCBlcnJvcnNcbiAgICBgPGRpdiBjbGFzcz1cInNhLWVycm9yLWNvbnRhaW5lclwiPlxuICAgICAgPGRpdiBjbGFzcz1cImljb25cIj4hPC9kaXY+XG4gICAgICA8cD5Ob3QgdmFsaWQhPC9wPlxuICAgIDwvZGl2PmAgK1xuXG4gICAgLy8gQ2FuY2VsIGFuZCBjb25maXJtIGJ1dHRvbnNcbiAgICBgPGRpdiBjbGFzcz1cInNhLWJ1dHRvbi1jb250YWluZXJcIj5cbiAgICAgIDxidXR0b24gY2xhc3M9XCJjYW5jZWxcIiB0YWJJbmRleD1cIjJcIj5DYW5jZWw8L2J1dHRvbj5cbiAgICAgIDxkaXYgY2xhc3M9XCJzYS1jb25maXJtLWJ1dHRvbi1jb250YWluZXJcIj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImNvbmZpcm1cIiB0YWJJbmRleD1cIjFcIj5PSzwvYnV0dG9uPmAgKyBcblxuICAgICAgICAvLyBMb2FkaW5nIGFuaW1hdGlvblxuICAgICAgICBgPGRpdiBjbGFzcz1cImxhLWJhbGwtZmFsbFwiPlxuICAgICAgICAgIDxkaXY+PC9kaXY+XG4gICAgICAgICAgPGRpdj48L2Rpdj5cbiAgICAgICAgICA8ZGl2PjwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PmAgK1xuXG4gIC8vIEVuZCBvZiBtb2RhbFxuICBgPC9kaXY+YDtcblxuZXhwb3J0IGRlZmF1bHQgaW5qZWN0ZWRIVE1MO1xuIiwidmFyIGFsZXJ0VHlwZXMgPSBbJ2Vycm9yJywgJ3dhcm5pbmcnLCAnaW5mbycsICdzdWNjZXNzJywgJ2lucHV0JywgJ3Byb21wdCddO1xuXG5pbXBvcnQge1xuICBpc0lFOFxufSBmcm9tICcuL3V0aWxzJztcblxuaW1wb3J0IHtcbiAgZ2V0TW9kYWwsXG4gIGdldElucHV0LFxuICBzZXRGb2N1c1N0eWxlXG59IGZyb20gJy4vaGFuZGxlLXN3YWwtZG9tJztcblxuaW1wb3J0IHtcbiAgaGFzQ2xhc3MsIGFkZENsYXNzLCByZW1vdmVDbGFzcyxcbiAgZXNjYXBlSHRtbCxcbiAgX3Nob3csIHNob3csIF9oaWRlLCBoaWRlXG59IGZyb20gJy4vaGFuZGxlLWRvbSc7XG5cblxuLypcbiAqIFNldCB0eXBlLCB0ZXh0IGFuZCBhY3Rpb25zIG9uIG1vZGFsXG4gKi9cbnZhciBzZXRQYXJhbWV0ZXJzID0gZnVuY3Rpb24ocGFyYW1zKSB7XG4gIHZhciBtb2RhbCA9IGdldE1vZGFsKCk7XG5cbiAgdmFyICR0aXRsZSA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJ2gyJyk7XG4gIHZhciAkdGV4dCA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJ3AnKTtcbiAgdmFyICRjYW5jZWxCdG4gPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCdidXR0b24uY2FuY2VsJyk7XG4gIHZhciAkY29uZmlybUJ0biA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5jb25maXJtJyk7XG5cbiAgLypcbiAgICogVGl0bGVcbiAgICovXG4gICR0aXRsZS5pbm5lckhUTUwgPSBwYXJhbXMuaHRtbCA/IHBhcmFtcy50aXRsZSA6IGVzY2FwZUh0bWwocGFyYW1zLnRpdGxlKS5zcGxpdCgnXFxuJykuam9pbignPGJyPicpO1xuXG4gIC8qXG4gICAqIFRleHRcbiAgICovXG4gICR0ZXh0LmlubmVySFRNTCA9IHBhcmFtcy5odG1sID8gcGFyYW1zLnRleHQgOiBlc2NhcGVIdG1sKHBhcmFtcy50ZXh0IHx8ICcnKS5zcGxpdCgnXFxuJykuam9pbignPGJyPicpO1xuICBpZiAocGFyYW1zLnRleHQpIHNob3coJHRleHQpO1xuXG4gIC8qXG4gICAqIEN1c3RvbSBjbGFzc1xuICAgKi9cbiAgaWYgKHBhcmFtcy5jdXN0b21DbGFzcykge1xuICAgIGFkZENsYXNzKG1vZGFsLCBwYXJhbXMuY3VzdG9tQ2xhc3MpO1xuICAgIG1vZGFsLnNldEF0dHJpYnV0ZSgnZGF0YS1jdXN0b20tY2xhc3MnLCBwYXJhbXMuY3VzdG9tQ2xhc3MpO1xuICB9IGVsc2Uge1xuICAgIC8vIEZpbmQgcHJldmlvdXNseSBzZXQgY2xhc3NlcyBhbmQgcmVtb3ZlIHRoZW1cbiAgICBsZXQgY3VzdG9tQ2xhc3MgPSBtb2RhbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY3VzdG9tLWNsYXNzJyk7XG4gICAgcmVtb3ZlQ2xhc3MobW9kYWwsIGN1c3RvbUNsYXNzKTtcbiAgICBtb2RhbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtY3VzdG9tLWNsYXNzJywgJycpO1xuICB9XG5cbiAgLypcbiAgICogSWNvblxuICAgKi9cbiAgaGlkZShtb2RhbC5xdWVyeVNlbGVjdG9yQWxsKCcuc2EtaWNvbicpKTtcblxuICBpZiAocGFyYW1zLnR5cGUgJiYgIWlzSUU4KCkpIHtcblxuICAgIGxldCB2YWxpZFR5cGUgPSBmYWxzZTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWxlcnRUeXBlcy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHBhcmFtcy50eXBlID09PSBhbGVydFR5cGVzW2ldKSB7XG4gICAgICAgIHZhbGlkVHlwZSA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghdmFsaWRUeXBlKSB7XG4gICAgICBsb2dTdHIoJ1Vua25vd24gYWxlcnQgdHlwZTogJyArIHBhcmFtcy50eXBlKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBsZXQgdHlwZXNXaXRoSWNvbnMgPSBbJ3N1Y2Nlc3MnLCAnZXJyb3InLCAnd2FybmluZycsICdpbmZvJ107XG4gICAgbGV0ICRpY29uO1xuXG4gICAgaWYgKHR5cGVzV2l0aEljb25zLmluZGV4T2YocGFyYW1zLnR5cGUpICE9PSAtMSkge1xuICAgICAgJGljb24gPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcuc2EtaWNvbi4nICsgJ3NhLScgKyBwYXJhbXMudHlwZSk7XG4gICAgICBzaG93KCRpY29uKTtcbiAgICB9XG5cbiAgICBsZXQgJGlucHV0ID0gZ2V0SW5wdXQoKTtcblxuICAgIC8vIEFuaW1hdGUgaWNvblxuICAgIHN3aXRjaCAocGFyYW1zLnR5cGUpIHtcblxuICAgICAgY2FzZSAnc3VjY2Vzcyc6XG4gICAgICAgIGFkZENsYXNzKCRpY29uLCAnYW5pbWF0ZScpO1xuICAgICAgICBhZGRDbGFzcygkaWNvbi5xdWVyeVNlbGVjdG9yKCcuc2EtdGlwJyksICdhbmltYXRlU3VjY2Vzc1RpcCcpO1xuICAgICAgICBhZGRDbGFzcygkaWNvbi5xdWVyeVNlbGVjdG9yKCcuc2EtbG9uZycpLCAnYW5pbWF0ZVN1Y2Nlc3NMb25nJyk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdlcnJvcic6XG4gICAgICAgIGFkZENsYXNzKCRpY29uLCAnYW5pbWF0ZUVycm9ySWNvbicpO1xuICAgICAgICBhZGRDbGFzcygkaWNvbi5xdWVyeVNlbGVjdG9yKCcuc2EteC1tYXJrJyksICdhbmltYXRlWE1hcmsnKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ3dhcm5pbmcnOlxuICAgICAgICBhZGRDbGFzcygkaWNvbiwgJ3B1bHNlV2FybmluZycpO1xuICAgICAgICBhZGRDbGFzcygkaWNvbi5xdWVyeVNlbGVjdG9yKCcuc2EtYm9keScpLCAncHVsc2VXYXJuaW5nSW5zJyk7XG4gICAgICAgIGFkZENsYXNzKCRpY29uLnF1ZXJ5U2VsZWN0b3IoJy5zYS1kb3QnKSwgJ3B1bHNlV2FybmluZ0lucycpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnaW5wdXQnOlxuICAgICAgY2FzZSAncHJvbXB0JzpcbiAgICAgICAgJGlucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsIHBhcmFtcy5pbnB1dFR5cGUpO1xuICAgICAgICAkaW5wdXQudmFsdWUgPSBwYXJhbXMuaW5wdXRWYWx1ZTtcbiAgICAgICAgJGlucHV0LnNldEF0dHJpYnV0ZSgncGxhY2Vob2xkZXInLCBwYXJhbXMuaW5wdXRQbGFjZWhvbGRlcik7XG4gICAgICAgIGFkZENsYXNzKG1vZGFsLCAnc2hvdy1pbnB1dCcpO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAkaW5wdXQuZm9jdXMoKTtcbiAgICAgICAgICAkaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBzd2FsLnJlc2V0SW5wdXRFcnJvcik7XG4gICAgICAgIH0sIDQwMCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqIEN1c3RvbSBpbWFnZVxuICAgKi9cbiAgaWYgKHBhcmFtcy5pbWFnZVVybCkge1xuICAgIGxldCAkY3VzdG9tSWNvbiA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5zYS1pY29uLnNhLWN1c3RvbScpO1xuXG4gICAgJGN1c3RvbUljb24uc3R5bGUuYmFja2dyb3VuZEltYWdlID0gJ3VybCgnICsgcGFyYW1zLmltYWdlVXJsICsgJyknO1xuICAgIHNob3coJGN1c3RvbUljb24pO1xuXG4gICAgbGV0IF9pbWdXaWR0aCA9IDgwO1xuICAgIGxldCBfaW1nSGVpZ2h0ID0gODA7XG5cbiAgICBpZiAocGFyYW1zLmltYWdlU2l6ZSkge1xuICAgICAgbGV0IGRpbWVuc2lvbnMgPSBwYXJhbXMuaW1hZ2VTaXplLnRvU3RyaW5nKCkuc3BsaXQoJ3gnKTtcbiAgICAgIGxldCBpbWdXaWR0aCA9IGRpbWVuc2lvbnNbMF07XG4gICAgICBsZXQgaW1nSGVpZ2h0ID0gZGltZW5zaW9uc1sxXTtcblxuICAgICAgaWYgKCFpbWdXaWR0aCB8fCAhaW1nSGVpZ2h0KSB7XG4gICAgICAgIGxvZ1N0cignUGFyYW1ldGVyIGltYWdlU2l6ZSBleHBlY3RzIHZhbHVlIHdpdGggZm9ybWF0IFdJRFRIeEhFSUdIVCwgZ290ICcgKyBwYXJhbXMuaW1hZ2VTaXplKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF9pbWdXaWR0aCA9IGltZ1dpZHRoO1xuICAgICAgICBfaW1nSGVpZ2h0ID0gaW1nSGVpZ2h0O1xuICAgICAgfVxuICAgIH1cblxuICAgICRjdXN0b21JY29uLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAkY3VzdG9tSWNvbi5nZXRBdHRyaWJ1dGUoJ3N0eWxlJykgKyAnd2lkdGg6JyArIF9pbWdXaWR0aCArICdweDsgaGVpZ2h0OicgKyBfaW1nSGVpZ2h0ICsgJ3B4Jyk7XG4gIH1cblxuICAvKlxuICAgKiBTaG93IGNhbmNlbCBidXR0b24/XG4gICAqL1xuICBtb2RhbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtaGFzLWNhbmNlbC1idXR0b24nLCBwYXJhbXMuc2hvd0NhbmNlbEJ1dHRvbik7XG4gIGlmIChwYXJhbXMuc2hvd0NhbmNlbEJ1dHRvbikge1xuICAgICRjYW5jZWxCdG4uc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snO1xuICB9IGVsc2Uge1xuICAgIGhpZGUoJGNhbmNlbEJ0bik7XG4gIH1cblxuICAvKlxuICAgKiBTaG93IGNvbmZpcm0gYnV0dG9uP1xuICAgKi9cbiAgbW9kYWwuc2V0QXR0cmlidXRlKCdkYXRhLWhhcy1jb25maXJtLWJ1dHRvbicsIHBhcmFtcy5zaG93Q29uZmlybUJ1dHRvbik7XG4gIGlmIChwYXJhbXMuc2hvd0NvbmZpcm1CdXR0b24pIHtcbiAgICAkY29uZmlybUJ0bi5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XG4gIH0gZWxzZSB7XG4gICAgaGlkZSgkY29uZmlybUJ0bik7XG4gIH1cblxuICAvKlxuICAgKiBDdXN0b20gdGV4dCBvbiBjYW5jZWwvY29uZmlybSBidXR0b25zXG4gICAqL1xuICBpZiAocGFyYW1zLmNhbmNlbEJ1dHRvblRleHQpIHtcbiAgICAkY2FuY2VsQnRuLmlubmVySFRNTCA9IGVzY2FwZUh0bWwocGFyYW1zLmNhbmNlbEJ1dHRvblRleHQpO1xuICB9XG4gIGlmIChwYXJhbXMuY29uZmlybUJ1dHRvblRleHQpIHtcbiAgICAkY29uZmlybUJ0bi5pbm5lckhUTUwgPSBlc2NhcGVIdG1sKHBhcmFtcy5jb25maXJtQnV0dG9uVGV4dCk7XG4gIH1cblxuICAvKlxuICAgKiBDdXN0b20gY29sb3Igb24gY29uZmlybSBidXR0b25cbiAgICovXG4gIGlmIChwYXJhbXMuY29uZmlybUJ1dHRvbkNvbG9yKSB7XG4gICAgLy8gU2V0IGNvbmZpcm0gYnV0dG9uIHRvIHNlbGVjdGVkIGJhY2tncm91bmQgY29sb3JcbiAgICAkY29uZmlybUJ0bi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBwYXJhbXMuY29uZmlybUJ1dHRvbkNvbG9yO1xuXG4gICAgLy8gU2V0IHRoZSBjb25maXJtIGJ1dHRvbiBjb2xvciB0byB0aGUgbG9hZGluZyByaW5nXG4gICAgJGNvbmZpcm1CdG4uc3R5bGUuYm9yZGVyTGVmdENvbG9yID0gcGFyYW1zLmNvbmZpcm1Mb2FkaW5nQnV0dG9uQ29sb3I7XG4gICAgJGNvbmZpcm1CdG4uc3R5bGUuYm9yZGVyUmlnaHRDb2xvciA9IHBhcmFtcy5jb25maXJtTG9hZGluZ0J1dHRvbkNvbG9yO1xuXG4gICAgLy8gU2V0IGJveC1zaGFkb3cgdG8gZGVmYXVsdCBmb2N1c2VkIGJ1dHRvblxuICAgIHNldEZvY3VzU3R5bGUoJGNvbmZpcm1CdG4sIHBhcmFtcy5jb25maXJtQnV0dG9uQ29sb3IpO1xuICB9XG5cbiAgLypcbiAgICogQWxsb3cgb3V0c2lkZSBjbGlja1xuICAgKi9cbiAgbW9kYWwuc2V0QXR0cmlidXRlKCdkYXRhLWFsbG93LW91dHNpZGUtY2xpY2snLCBwYXJhbXMuYWxsb3dPdXRzaWRlQ2xpY2spO1xuXG4gIC8qXG4gICAqIENhbGxiYWNrIGZ1bmN0aW9uXG4gICAqL1xuICB2YXIgaGFzRG9uZUZ1bmN0aW9uID0gcGFyYW1zLmRvbmVGdW5jdGlvbiA/IHRydWUgOiBmYWxzZTtcbiAgbW9kYWwuc2V0QXR0cmlidXRlKCdkYXRhLWhhcy1kb25lLWZ1bmN0aW9uJywgaGFzRG9uZUZ1bmN0aW9uKTtcblxuICAvKlxuICAgKiBBbmltYXRpb25cbiAgICovXG4gIGlmICghcGFyYW1zLmFuaW1hdGlvbikge1xuICAgIG1vZGFsLnNldEF0dHJpYnV0ZSgnZGF0YS1hbmltYXRpb24nLCAnbm9uZScpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBwYXJhbXMuYW5pbWF0aW9uID09PSAnc3RyaW5nJykge1xuICAgIG1vZGFsLnNldEF0dHJpYnV0ZSgnZGF0YS1hbmltYXRpb24nLCBwYXJhbXMuYW5pbWF0aW9uKTsgLy8gQ3VzdG9tIGFuaW1hdGlvblxuICB9IGVsc2Uge1xuICAgIG1vZGFsLnNldEF0dHJpYnV0ZSgnZGF0YS1hbmltYXRpb24nLCAncG9wJyk7XG4gIH1cblxuICAvKlxuICAgKiBUaW1lclxuICAgKi9cbiAgbW9kYWwuc2V0QXR0cmlidXRlKCdkYXRhLXRpbWVyJywgcGFyYW1zLnRpbWVyKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHNldFBhcmFtZXRlcnM7XG4iLCIvKlxuICogQWxsb3cgdXNlciB0byBwYXNzIHRoZWlyIG93biBwYXJhbXNcbiAqL1xudmFyIGV4dGVuZCA9IGZ1bmN0aW9uKGEsIGIpIHtcbiAgZm9yICh2YXIga2V5IGluIGIpIHtcbiAgICBpZiAoYi5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICBhW2tleV0gPSBiW2tleV07XG4gICAgfVxuICB9XG4gIHJldHVybiBhO1xufTtcblxuLypcbiAqIENvbnZlcnQgSEVYIGNvZGVzIHRvIFJHQiB2YWx1ZXMgKCMwMDAwMDAgLT4gcmdiKDAsMCwwKSlcbiAqL1xudmFyIGhleFRvUmdiID0gZnVuY3Rpb24oaGV4KSB7XG4gIHZhciByZXN1bHQgPSAvXiM/KFthLWZcXGRdezJ9KShbYS1mXFxkXXsyfSkoW2EtZlxcZF17Mn0pJC9pLmV4ZWMoaGV4KTtcbiAgcmV0dXJuIHJlc3VsdCA/IHBhcnNlSW50KHJlc3VsdFsxXSwgMTYpICsgJywgJyArIHBhcnNlSW50KHJlc3VsdFsyXSwgMTYpICsgJywgJyArIHBhcnNlSW50KHJlc3VsdFszXSwgMTYpIDogbnVsbDtcbn07XG5cbi8qXG4gKiBDaGVjayBpZiB0aGUgdXNlciBpcyB1c2luZyBJbnRlcm5ldCBFeHBsb3JlciA4IChmb3IgZmFsbGJhY2tzKVxuICovXG52YXIgaXNJRTggPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuICh3aW5kb3cuYXR0YWNoRXZlbnQgJiYgIXdpbmRvdy5hZGRFdmVudExpc3RlbmVyKTtcbn07XG5cbi8qXG4gKiBJRSBjb21wYXRpYmxlIGxvZ2dpbmcgZm9yIGRldmVsb3BlcnNcbiAqL1xudmFyIGxvZ1N0ciA9IGZ1bmN0aW9uKHN0cmluZykge1xuICBpZiAod2luZG93LmNvbnNvbGUpIHtcbiAgICAvLyBJRS4uLlxuICAgIHdpbmRvdy5jb25zb2xlLmxvZygnU3dlZXRBbGVydDogJyArIHN0cmluZyk7XG4gIH1cbn07XG5cbi8qXG4gKiBTZXQgaG92ZXIsIGFjdGl2ZSBhbmQgZm9jdXMtc3RhdGVzIGZvciBidXR0b25zIFxuICogKHNvdXJjZTogaHR0cDovL3d3dy5zaXRlcG9pbnQuY29tL2phdmFzY3JpcHQtZ2VuZXJhdGUtbGlnaHRlci1kYXJrZXItY29sb3IpXG4gKi9cbnZhciBjb2xvckx1bWluYW5jZSA9IGZ1bmN0aW9uKGhleCwgbHVtKSB7XG4gIC8vIFZhbGlkYXRlIGhleCBzdHJpbmdcbiAgaGV4ID0gU3RyaW5nKGhleCkucmVwbGFjZSgvW14wLTlhLWZdL2dpLCAnJyk7XG4gIGlmIChoZXgubGVuZ3RoIDwgNikge1xuICAgIGhleCA9IGhleFswXSArIGhleFswXSArIGhleFsxXSArIGhleFsxXSArIGhleFsyXSArIGhleFsyXTtcbiAgfVxuICBsdW0gPSBsdW0gfHwgMDtcblxuICAvLyBDb252ZXJ0IHRvIGRlY2ltYWwgYW5kIGNoYW5nZSBsdW1pbm9zaXR5XG4gIHZhciByZ2IgPSAnIyc7XG4gIHZhciBjO1xuICB2YXIgaTtcblxuICBmb3IgKGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgYyA9IHBhcnNlSW50KGhleC5zdWJzdHIoaSAqIDIsIDIpLCAxNik7XG4gICAgYyA9IE1hdGgucm91bmQoTWF0aC5taW4oTWF0aC5tYXgoMCwgYyArIGMgKiBsdW0pLCAyNTUpKS50b1N0cmluZygxNik7XG4gICAgcmdiICs9ICgnMDAnICsgYykuc3Vic3RyKGMubGVuZ3RoKTtcbiAgfVxuXG4gIHJldHVybiByZ2I7XG59O1xuXG5cbmV4cG9ydCB7XG4gIGV4dGVuZCxcbiAgaGV4VG9SZ2IsXG4gIGlzSUU4LFxuICBsb2dTdHIsXG4gIGNvbG9yTHVtaW5hbmNlXG59O1xuIl19

  
//  /*
//   * Use SweetAlert with RequireJS
//   */
  
//  if (typeof define === 'function' && define.amd) {
//    define(function () {
//      return sweetAlert;
//    });
//  } else if (typeof module !== 'undefined' && module.exports) {
//    module.exports = sweetAlert;
//  }

//})(window, document);

/*!
 * sweetalert2 v7.6.2
 * Released under the MIT License.
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Sweetalert2 = factory());
}(this, (function () {
    'use strict';

    var styles = "body.swal2-toast-shown.swal2-has-input > .swal2-container > .swal2-toast {\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-align: stretch;\n      -ms-flex-align: stretch;\n          align-items: stretch; }\n  body.swal2-toast-shown.swal2-has-input > .swal2-container > .swal2-toast .swal2-actions {\n    -webkit-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n    -ms-flex-item-align: stretch;\n        align-self: stretch;\n    -webkit-box-pack: end;\n        -ms-flex-pack: end;\n            justify-content: flex-end;\n    height: 2.2em; }\n  body.swal2-toast-shown.swal2-has-input > .swal2-container > .swal2-toast .swal2-loading {\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center; }\n  body.swal2-toast-shown.swal2-has-input > .swal2-container > .swal2-toast .swal2-input {\n    height: 2em;\n    font-size: 1em;\n    margin: .3125em auto; }\n  body.swal2-toast-shown.swal2-has-input > .swal2-container > .swal2-toast .swal2-validationerror {\n    font-size: 1em; }\n\nbody.swal2-toast-shown > .swal2-container {\n  position: fixed;\n  background-color: transparent; }\n  body.swal2-toast-shown > .swal2-container.swal2-shown {\n    background-color: transparent; }\n  body.swal2-toast-shown > .swal2-container.swal2-top {\n    top: 0;\n    left: 50%;\n    bottom: auto;\n    right: auto;\n    -webkit-transform: translateX(-50%);\n            transform: translateX(-50%); }\n  body.swal2-toast-shown > .swal2-container.swal2-top-end, body.swal2-toast-shown > .swal2-container.swal2-top-right {\n    top: 0;\n    left: auto;\n    bottom: auto;\n    right: 0; }\n  body.swal2-toast-shown > .swal2-container.swal2-top-start, body.swal2-toast-shown > .swal2-container.swal2-top-left {\n    top: 0;\n    left: 0;\n    bottom: auto;\n    right: auto; }\n  body.swal2-toast-shown > .swal2-container.swal2-center-start, body.swal2-toast-shown > .swal2-container.swal2-center-left {\n    top: 50%;\n    left: 0;\n    bottom: auto;\n    right: auto;\n    -webkit-transform: translateY(-50%);\n            transform: translateY(-50%); }\n  body.swal2-toast-shown > .swal2-container.swal2-center {\n    top: 50%;\n    left: 50%;\n    bottom: auto;\n    right: auto;\n    -webkit-transform: translate(-50%, -50%);\n            transform: translate(-50%, -50%); }\n  body.swal2-toast-shown > .swal2-container.swal2-center-end, body.swal2-toast-shown > .swal2-container.swal2-center-right {\n    top: 50%;\n    left: auto;\n    bottom: auto;\n    right: 0;\n    -webkit-transform: translateY(-50%);\n            transform: translateY(-50%); }\n  body.swal2-toast-shown > .swal2-container.swal2-bottom-start, body.swal2-toast-shown > .swal2-container.swal2-bottom-left {\n    top: auto;\n    left: 0;\n    bottom: 0;\n    right: auto; }\n  body.swal2-toast-shown > .swal2-container.swal2-bottom {\n    top: auto;\n    left: 50%;\n    bottom: 0;\n    right: auto;\n    -webkit-transform: translateX(-50%);\n            transform: translateX(-50%); }\n  body.swal2-toast-shown > .swal2-container.swal2-bottom-end, body.swal2-toast-shown > .swal2-container.swal2-bottom-right {\n    top: auto;\n    left: auto;\n    bottom: 0;\n    right: 0; }\n\n.swal2-popup.swal2-toast {\n  width: auto;\n  padding: 0.625em;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  overflow-y: hidden;\n  -webkit-box-shadow: 0 0 10px #d9d9d9;\n          box-shadow: 0 0 10px #d9d9d9; }\n  .swal2-popup.swal2-toast .swal2-header {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row; }\n  .swal2-popup.swal2-toast .swal2-title {\n    font-size: 1em;\n    -webkit-box-pack: start;\n        -ms-flex-pack: start;\n            justify-content: flex-start;\n    margin: 0 .6em; }\n  .swal2-popup.swal2-toast .swal2-close {\n    position: initial; }\n  .swal2-popup.swal2-toast .swal2-content {\n    font-size: 0.875em;\n    -webkit-box-pack: start;\n        -ms-flex-pack: start;\n            justify-content: flex-start; }\n  .swal2-popup.swal2-toast .swal2-icon {\n    width: 32px;\n    min-width: 32px;\n    height: 32px;\n    margin: 0; }\n    .swal2-popup.swal2-toast .swal2-icon.swal2-success .swal2-success-ring {\n      width: 32px;\n      height: 32px; }\n    .swal2-popup.swal2-toast .swal2-icon.swal2-info, .swal2-popup.swal2-toast .swal2-icon.swal2-warning, .swal2-popup.swal2-toast .swal2-icon.swal2-question {\n      font-size: 26px;\n      line-height: 32px; }\n    .swal2-popup.swal2-toast .swal2-icon.swal2-error [class^='swal2-x-mark-line'] {\n      top: 14px;\n      width: 22px; }\n      .swal2-popup.swal2-toast .swal2-icon.swal2-error [class^='swal2-x-mark-line'][class$='left'] {\n        left: 5px; }\n      .swal2-popup.swal2-toast .swal2-icon.swal2-error [class^='swal2-x-mark-line'][class$='right'] {\n        right: 5px; }\n  .swal2-popup.swal2-toast .swal2-actions {\n    margin: 0 .3125em;\n    height: auto; }\n  .swal2-popup.swal2-toast .swal2-styled {\n    margin: 0 .3125em;\n    padding: .3125em .625em;\n    font-size: 1em; }\n    .swal2-popup.swal2-toast .swal2-styled:focus {\n      -webkit-box-shadow: 0 0 0 1px #fff, 0 0 0 2px rgba(50, 100, 150, 0.4);\n              box-shadow: 0 0 0 1px #fff, 0 0 0 2px rgba(50, 100, 150, 0.4); }\n  .swal2-popup.swal2-toast .swal2-success {\n    border-color: #a5dc86; }\n    .swal2-popup.swal2-toast .swal2-success [class^='swal2-success-circular-line'] {\n      border-radius: 50%;\n      position: absolute;\n      width: 32px;\n      height: 45px;\n      -webkit-transform: rotate(45deg);\n              transform: rotate(45deg); }\n      .swal2-popup.swal2-toast .swal2-success [class^='swal2-success-circular-line'][class$='left'] {\n        border-radius: 64px 0 0 64px;\n        top: -4px;\n        left: -15px;\n        -webkit-transform: rotate(-45deg);\n                transform: rotate(-45deg);\n        -webkit-transform-origin: 32px 32px;\n                transform-origin: 32px 32px; }\n      .swal2-popup.swal2-toast .swal2-success [class^='swal2-success-circular-line'][class$='right'] {\n        border-radius: 0 64px 64px 0;\n        top: -5px;\n        left: 14px;\n        -webkit-transform-origin: 0 32px;\n                transform-origin: 0 32px; }\n    .swal2-popup.swal2-toast .swal2-success .swal2-success-ring {\n      width: 32px;\n      height: 32px; }\n    .swal2-popup.swal2-toast .swal2-success .swal2-success-fix {\n      width: 7px;\n      height: 43px;\n      left: 7px;\n      top: 0; }\n    .swal2-popup.swal2-toast .swal2-success [class^='swal2-success-line'] {\n      height: 5px; }\n      .swal2-popup.swal2-toast .swal2-success [class^='swal2-success-line'][class$='tip'] {\n        width: 12px;\n        left: 3px;\n        top: 18px; }\n      .swal2-popup.swal2-toast .swal2-success [class^='swal2-success-line'][class$='long'] {\n        width: 22px;\n        right: 3px;\n        top: 15px; }\n  .swal2-popup.swal2-toast.swal2-show {\n    -webkit-animation: showSweetToast .5s;\n            animation: showSweetToast .5s; }\n  .swal2-popup.swal2-toast.swal2-hide {\n    -webkit-animation: hideSweetToast .2s forwards;\n            animation: hideSweetToast .2s forwards; }\n  .swal2-popup.swal2-toast .swal2-animate-success-line-tip {\n    -webkit-animation: animate-toast-success-tip .75s;\n            animation: animate-toast-success-tip .75s; }\n  .swal2-popup.swal2-toast .swal2-animate-success-line-long {\n    -webkit-animation: animate-toast-success-long .75s;\n            animation: animate-toast-success-long .75s; }\n\n@-webkit-keyframes showSweetToast {\n  0% {\n    -webkit-transform: translateY(-10px) rotateZ(2deg);\n            transform: translateY(-10px) rotateZ(2deg);\n    opacity: 0; }\n  33% {\n    -webkit-transform: translateY(0) rotateZ(-2deg);\n            transform: translateY(0) rotateZ(-2deg);\n    opacity: .5; }\n  66% {\n    -webkit-transform: translateY(5px) rotateZ(2deg);\n            transform: translateY(5px) rotateZ(2deg);\n    opacity: .7; }\n  100% {\n    -webkit-transform: translateY(0) rotateZ(0);\n            transform: translateY(0) rotateZ(0);\n    opacity: 1; } }\n\n@keyframes showSweetToast {\n  0% {\n    -webkit-transform: translateY(-10px) rotateZ(2deg);\n            transform: translateY(-10px) rotateZ(2deg);\n    opacity: 0; }\n  33% {\n    -webkit-transform: translateY(0) rotateZ(-2deg);\n            transform: translateY(0) rotateZ(-2deg);\n    opacity: .5; }\n  66% {\n    -webkit-transform: translateY(5px) rotateZ(2deg);\n            transform: translateY(5px) rotateZ(2deg);\n    opacity: .7; }\n  100% {\n    -webkit-transform: translateY(0) rotateZ(0);\n            transform: translateY(0) rotateZ(0);\n    opacity: 1; } }\n\n@-webkit-keyframes hideSweetToast {\n  0% {\n    opacity: 1; }\n  33% {\n    opacity: .5; }\n  100% {\n    -webkit-transform: rotateZ(1deg);\n            transform: rotateZ(1deg);\n    opacity: 0; } }\n\n@keyframes hideSweetToast {\n  0% {\n    opacity: 1; }\n  33% {\n    opacity: .5; }\n  100% {\n    -webkit-transform: rotateZ(1deg);\n            transform: rotateZ(1deg);\n    opacity: 0; } }\n\n@-webkit-keyframes animate-toast-success-tip {\n  0% {\n    width: 0;\n    left: 1px;\n    top: 9px; }\n  54% {\n    width: 0;\n    left: 2px;\n    top: 2px; }\n  70% {\n    width: 26px;\n    left: -4px;\n    top: 10px; }\n  84% {\n    width: 8px;\n    left: 12px;\n    top: 17px; }\n  100% {\n    width: 12px;\n    left: 3px;\n    top: 18px; } }\n\n@keyframes animate-toast-success-tip {\n  0% {\n    width: 0;\n    left: 1px;\n    top: 9px; }\n  54% {\n    width: 0;\n    left: 2px;\n    top: 2px; }\n  70% {\n    width: 26px;\n    left: -4px;\n    top: 10px; }\n  84% {\n    width: 8px;\n    left: 12px;\n    top: 17px; }\n  100% {\n    width: 12px;\n    left: 3px;\n    top: 18px; } }\n\n@-webkit-keyframes animate-toast-success-long {\n  0% {\n    width: 0;\n    right: 22px;\n    top: 26px; }\n  65% {\n    width: 0;\n    right: 15px;\n    top: 20px; }\n  84% {\n    width: 18px;\n    right: 0;\n    top: 15px; }\n  100% {\n    width: 22px;\n    right: 3px;\n    top: 15px; } }\n\n@keyframes animate-toast-success-long {\n  0% {\n    width: 0;\n    right: 22px;\n    top: 26px; }\n  65% {\n    width: 0;\n    right: 15px;\n    top: 20px; }\n  84% {\n    width: 18px;\n    right: 0;\n    top: 15px; }\n  100% {\n    width: 22px;\n    right: 3px;\n    top: 15px; } }\n\nhtml.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown),\nbody.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown) {\n  overflow-y: hidden;\n  height: auto; }\n\nbody.swal2-iosfix {\n  position: fixed;\n  left: 0;\n  right: 0; }\n\nbody.swal2-no-backdrop .swal2-shown {\n  top: auto;\n  bottom: auto;\n  left: auto;\n  right: auto;\n  background-color: transparent; }\n  body.swal2-no-backdrop .swal2-shown > .swal2-modal {\n    -webkit-box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);\n            box-shadow: 0 0 10px rgba(0, 0, 0, 0.4); }\n  body.swal2-no-backdrop .swal2-shown.swal2-top {\n    top: 0;\n    left: 50%;\n    -webkit-transform: translateX(-50%);\n            transform: translateX(-50%); }\n  body.swal2-no-backdrop .swal2-shown.swal2-top-start, body.swal2-no-backdrop .swal2-shown.swal2-top-left {\n    top: 0;\n    left: 0; }\n  body.swal2-no-backdrop .swal2-shown.swal2-top-end, body.swal2-no-backdrop .swal2-shown.swal2-top-right {\n    top: 0;\n    right: 0; }\n  body.swal2-no-backdrop .swal2-shown.swal2-center {\n    top: 50%;\n    left: 50%;\n    -webkit-transform: translate(-50%, -50%);\n            transform: translate(-50%, -50%); }\n  body.swal2-no-backdrop .swal2-shown.swal2-center-start, body.swal2-no-backdrop .swal2-shown.swal2-center-left {\n    top: 50%;\n    left: 0;\n    -webkit-transform: translateY(-50%);\n            transform: translateY(-50%); }\n  body.swal2-no-backdrop .swal2-shown.swal2-center-end, body.swal2-no-backdrop .swal2-shown.swal2-center-right {\n    top: 50%;\n    right: 0;\n    -webkit-transform: translateY(-50%);\n            transform: translateY(-50%); }\n  body.swal2-no-backdrop .swal2-shown.swal2-bottom {\n    bottom: 0;\n    left: 50%;\n    -webkit-transform: translateX(-50%);\n            transform: translateX(-50%); }\n  body.swal2-no-backdrop .swal2-shown.swal2-bottom-start, body.swal2-no-backdrop .swal2-shown.swal2-bottom-left {\n    bottom: 0;\n    left: 0; }\n  body.swal2-no-backdrop .swal2-shown.swal2-bottom-end, body.swal2-no-backdrop .swal2-shown.swal2-bottom-right {\n    bottom: 0;\n    right: 0; }\n\n.swal2-container {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  position: fixed;\n  padding: 10px;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: transparent;\n  z-index: 1060; }\n  .swal2-container.swal2-top {\n    -webkit-box-align: start;\n        -ms-flex-align: start;\n            align-items: flex-start; }\n  .swal2-container.swal2-top-start, .swal2-container.swal2-top-left {\n    -webkit-box-align: start;\n        -ms-flex-align: start;\n            align-items: flex-start;\n    -webkit-box-pack: start;\n        -ms-flex-pack: start;\n            justify-content: flex-start; }\n  .swal2-container.swal2-top-end, .swal2-container.swal2-top-right {\n    -webkit-box-align: start;\n        -ms-flex-align: start;\n            align-items: flex-start;\n    -webkit-box-pack: end;\n        -ms-flex-pack: end;\n            justify-content: flex-end; }\n  .swal2-container.swal2-center {\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center; }\n  .swal2-container.swal2-center-start, .swal2-container.swal2-center-left {\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: start;\n        -ms-flex-pack: start;\n            justify-content: flex-start; }\n  .swal2-container.swal2-center-end, .swal2-container.swal2-center-right {\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: end;\n        -ms-flex-pack: end;\n            justify-content: flex-end; }\n  .swal2-container.swal2-bottom {\n    -webkit-box-align: end;\n        -ms-flex-align: end;\n            align-items: flex-end; }\n  .swal2-container.swal2-bottom-start, .swal2-container.swal2-bottom-left {\n    -webkit-box-align: end;\n        -ms-flex-align: end;\n            align-items: flex-end;\n    -webkit-box-pack: start;\n        -ms-flex-pack: start;\n            justify-content: flex-start; }\n  .swal2-container.swal2-bottom-end, .swal2-container.swal2-bottom-right {\n    -webkit-box-align: end;\n        -ms-flex-align: end;\n            align-items: flex-end;\n    -webkit-box-pack: end;\n        -ms-flex-pack: end;\n            justify-content: flex-end; }\n  .swal2-container.swal2-grow-fullscreen > .swal2-modal {\n    display: -webkit-box !important;\n    display: -ms-flexbox !important;\n    display: flex !important;\n    -webkit-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n    -ms-flex-item-align: stretch;\n        align-self: stretch;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center; }\n  .swal2-container.swal2-grow-row > .swal2-modal {\n    display: -webkit-box !important;\n    display: -ms-flexbox !important;\n    display: flex !important;\n    -webkit-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n    -ms-flex-line-pack: center;\n        align-content: center;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center; }\n  .swal2-container.swal2-grow-column {\n    -webkit-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column; }\n    .swal2-container.swal2-grow-column.swal2-top, .swal2-container.swal2-grow-column.swal2-center, .swal2-container.swal2-grow-column.swal2-bottom {\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center; }\n    .swal2-container.swal2-grow-column.swal2-top-start, .swal2-container.swal2-grow-column.swal2-center-start, .swal2-container.swal2-grow-column.swal2-bottom-start, .swal2-container.swal2-grow-column.swal2-top-left, .swal2-container.swal2-grow-column.swal2-center-left, .swal2-container.swal2-grow-column.swal2-bottom-left {\n      -webkit-box-align: start;\n          -ms-flex-align: start;\n              align-items: flex-start; }\n    .swal2-container.swal2-grow-column.swal2-top-end, .swal2-container.swal2-grow-column.swal2-center-end, .swal2-container.swal2-grow-column.swal2-bottom-end, .swal2-container.swal2-grow-column.swal2-top-right, .swal2-container.swal2-grow-column.swal2-center-right, .swal2-container.swal2-grow-column.swal2-bottom-right {\n      -webkit-box-align: end;\n          -ms-flex-align: end;\n              align-items: flex-end; }\n    .swal2-container.swal2-grow-column > .swal2-modal {\n      display: -webkit-box !important;\n      display: -ms-flexbox !important;\n      display: flex !important;\n      -webkit-box-flex: 1;\n          -ms-flex: 1;\n              flex: 1;\n      -ms-flex-line-pack: center;\n          align-content: center;\n      -webkit-box-pack: center;\n          -ms-flex-pack: center;\n              justify-content: center; }\n  .swal2-container:not(.swal2-top):not(.swal2-top-start):not(.swal2-top-end):not(.swal2-top-left):not(.swal2-top-right):not(.swal2-center-start):not(.swal2-center-end):not(.swal2-center-left):not(.swal2-center-right):not(.swal2-bottom):not(.swal2-bottom-start):not(.swal2-bottom-end):not(.swal2-bottom-left):not(.swal2-bottom-right) > .swal2-modal {\n    margin: auto; }\n  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {\n    .swal2-container .swal2-modal {\n      margin: 0 !important; } }\n  .swal2-container.swal2-fade {\n    -webkit-transition: background-color .1s;\n    transition: background-color .1s; }\n  .swal2-container.swal2-shown {\n    background-color: rgba(0, 0, 0, 0.4); }\n\n.swal2-popup {\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  background-color: #fff;\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  font-size: 1rem;\n  padding: 1.25em;\n  border-radius: .3125em;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  overflow-x: hidden;\n  overflow-y: auto;\n  display: none;\n  position: relative;\n  width: 32em;\n  max-width: 100%; }\n  .swal2-popup:focus {\n    outline: none; }\n  .swal2-popup.swal2-loading {\n    overflow-y: hidden; }\n  .swal2-popup .swal2-header {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center; }\n  .swal2-popup .swal2-title {\n    color: #595959;\n    font-size: 1.875em;\n    text-align: center;\n    font-weight: 600;\n    text-transform: none;\n    position: relative;\n    margin: 0 0 .4em;\n    padding: 0;\n    display: block;\n    word-wrap: break-word; }\n  .swal2-popup .swal2-actions {\n    height: 4em;\n    -webkit-box-align: end;\n        -ms-flex-align: end;\n            align-items: flex-end;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center; }\n    .swal2-popup .swal2-actions:not(.swal2-loading) .swal2-styled[disabled] {\n      opacity: .4;\n      cursor: no-drop; }\n    .swal2-popup .swal2-actions.swal2-loading .swal2-styled.swal2-confirm {\n      -webkit-box-sizing: border-box;\n              box-sizing: border-box;\n      border: .25em solid transparent;\n      border-color: transparent;\n      width: 2.5em;\n      height: 2.5em;\n      padding: 0;\n      margin: .46875em;\n      background-color: transparent !important;\n      color: transparent;\n      cursor: default;\n      border-radius: 100%;\n      -webkit-animation: rotate-loading 1.5s linear 0s infinite normal;\n              animation: rotate-loading 1.5s linear 0s infinite normal;\n      -webkit-user-select: none;\n         -moz-user-select: none;\n          -ms-user-select: none;\n              user-select: none; }\n    .swal2-popup .swal2-actions.swal2-loading .swal2-styled.swal2-cancel {\n      margin-left: 30px;\n      margin-right: 30px; }\n    .swal2-popup .swal2-actions.swal2-loading :not(.swal2-styled).swal2-confirm::after {\n      display: inline-block;\n      content: '';\n      margin-left: 5px;\n      height: 15px;\n      width: 15px;\n      border: 3px solid #999999;\n      -webkit-box-shadow: 1px 1px 1px #fff;\n              box-shadow: 1px 1px 1px #fff;\n      border-right-color: transparent;\n      border-radius: 50%;\n      -webkit-animation: rotate-loading 1.5s linear 0s infinite normal;\n              animation: rotate-loading 1.5s linear 0s infinite normal; }\n  .swal2-popup .swal2-styled {\n    border: 0;\n    border-radius: .25em;\n    -webkit-box-shadow: none;\n            box-shadow: none;\n    color: #fff;\n    cursor: pointer;\n    font-size: 1.0625em;\n    font-weight: 500;\n    margin: 0 .3125em;\n    padding: .625em 2em; }\n    .swal2-popup .swal2-styled:focus {\n      outline: none;\n      -webkit-box-shadow: 0 0 0 2px #fff, 0 0 0 4px rgba(50, 100, 150, 0.4);\n              box-shadow: 0 0 0 2px #fff, 0 0 0 4px rgba(50, 100, 150, 0.4); }\n    .swal2-popup .swal2-styled::-moz-focus-inner {\n      border: 0; }\n  .swal2-popup .swal2-image {\n    margin: 1.25em auto;\n    max-width: 100%; }\n  .swal2-popup .swal2-close {\n    background: transparent;\n    border: 0;\n    margin: 0;\n    padding: 0;\n    width: 1.2em;\n    min-width: 1.2em;\n    height: 1.2em;\n    font-size: calc(2.5em - 0.25em);\n    line-height: 1.2em;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    font-family: serif;\n    position: absolute;\n    top: 5px;\n    right: 8px;\n    cursor: pointer;\n    color: #cccccc;\n    -webkit-transition: color .1s ease;\n    transition: color .1s ease; }\n    .swal2-popup .swal2-close:hover {\n      color: #d55; }\n  .swal2-popup > .swal2-input,\n  .swal2-popup > .swal2-file,\n  .swal2-popup > .swal2-textarea,\n  .swal2-popup > .swal2-select,\n  .swal2-popup > .swal2-radio,\n  .swal2-popup > .swal2-checkbox {\n    display: none; }\n  .swal2-popup .swal2-content {\n    font-size: 1.125em;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    font-weight: 300;\n    margin: 0;\n    padding: 0;\n    line-height: normal;\n    color: #545454;\n    word-wrap: break-word; }\n  .swal2-popup #swal2-content {\n    text-align: center; }\n  .swal2-popup .swal2-input,\n  .swal2-popup .swal2-file,\n  .swal2-popup .swal2-textarea,\n  .swal2-popup .swal2-select,\n  .swal2-popup .swal2-radio,\n  .swal2-popup .swal2-checkbox {\n    margin: 1em auto; }\n  .swal2-popup .swal2-input,\n  .swal2-popup .swal2-file,\n  .swal2-popup .swal2-textarea {\n    width: 100%;\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n    font-size: 1.125em;\n    border-radius: 3px;\n    border: 1px solid #d9d9d9;\n    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.06);\n            box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.06);\n    -webkit-transition: border-color .3s, -webkit-box-shadow .3s;\n    transition: border-color .3s, -webkit-box-shadow .3s;\n    transition: border-color .3s, box-shadow .3s;\n    transition: border-color .3s, box-shadow .3s, -webkit-box-shadow .3s; }\n    .swal2-popup .swal2-input.swal2-inputerror,\n    .swal2-popup .swal2-file.swal2-inputerror,\n    .swal2-popup .swal2-textarea.swal2-inputerror {\n      border-color: #f27474 !important;\n      -webkit-box-shadow: 0 0 2px #f27474 !important;\n              box-shadow: 0 0 2px #f27474 !important; }\n    .swal2-popup .swal2-input:focus,\n    .swal2-popup .swal2-file:focus,\n    .swal2-popup .swal2-textarea:focus {\n      outline: none;\n      border: 1px solid #b4dbed;\n      -webkit-box-shadow: 0 0 3px #c4e6f5;\n              box-shadow: 0 0 3px #c4e6f5; }\n    .swal2-popup .swal2-input::-webkit-input-placeholder,\n    .swal2-popup .swal2-file::-webkit-input-placeholder,\n    .swal2-popup .swal2-textarea::-webkit-input-placeholder {\n      color: #cccccc; }\n    .swal2-popup .swal2-input:-ms-input-placeholder,\n    .swal2-popup .swal2-file:-ms-input-placeholder,\n    .swal2-popup .swal2-textarea:-ms-input-placeholder {\n      color: #cccccc; }\n    .swal2-popup .swal2-input::-ms-input-placeholder,\n    .swal2-popup .swal2-file::-ms-input-placeholder,\n    .swal2-popup .swal2-textarea::-ms-input-placeholder {\n      color: #cccccc; }\n    .swal2-popup .swal2-input::placeholder,\n    .swal2-popup .swal2-file::placeholder,\n    .swal2-popup .swal2-textarea::placeholder {\n      color: #cccccc; }\n  .swal2-popup .swal2-range input {\n    width: 80%; }\n  .swal2-popup .swal2-range output {\n    width: 20%;\n    font-weight: 600;\n    text-align: center; }\n  .swal2-popup .swal2-range input,\n  .swal2-popup .swal2-range output {\n    font-size: 1.125em;\n    height: 2.625em;\n    line-height: 2.625em;\n    margin: 1em auto;\n    padding: 0; }\n  .swal2-popup .swal2-input {\n    height: 2.625em;\n    padding: 0 .75em; }\n    .swal2-popup .swal2-input[type='number'] {\n      max-width: 10em; }\n  .swal2-popup .swal2-file {\n    font-size: 1.125em; }\n  .swal2-popup .swal2-textarea {\n    height: 6.75em;\n    padding: .75em; }\n  .swal2-popup .swal2-select {\n    color: #545454;\n    font-size: 1.125em;\n    padding: .375em .625em;\n    min-width: 50%;\n    max-width: 100%; }\n  .swal2-popup .swal2-radio,\n  .swal2-popup .swal2-checkbox {\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center; }\n    .swal2-popup .swal2-radio label,\n    .swal2-popup .swal2-checkbox label {\n      font-size: 1.125em;\n      margin: 0 .6em; }\n    .swal2-popup .swal2-radio input,\n    .swal2-popup .swal2-checkbox input {\n      margin: 0 .4em; }\n  .swal2-popup .swal2-validationerror {\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    background-color: #f0f0f0;\n    overflow: hidden;\n    padding: .625em;\n    color: gray;\n    font-size: 1em;\n    font-weight: 300;\n    display: none; }\n    .swal2-popup .swal2-validationerror::before {\n      content: '!';\n      display: inline-block;\n      width: 1.5em;\n      height: 1.5em;\n      border-radius: 50%;\n      background-color: #ea7d7d;\n      color: #fff;\n      line-height: 1.5em;\n      font-weight: 600;\n      text-align: center;\n      margin: 0 .625em; }\n\n@supports (-ms-accelerator: true) {\n  .swal2-range input {\n    width: 100% !important; }\n  .swal2-range output {\n    display: none; } }\n\n@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {\n  .swal2-range input {\n    width: 100% !important; }\n  .swal2-range output {\n    display: none; } }\n\n.swal2-icon {\n  width: 80px;\n  height: 80px;\n  line-height: 80px;\n  border: 4px solid transparent;\n  border-radius: 50%;\n  margin: 1.25em auto 1.875em;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  position: relative;\n  -webkit-box-sizing: content-box;\n          box-sizing: content-box;\n  cursor: default;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none; }\n  .swal2-icon.swal2-error {\n    border-color: #f27474; }\n    .swal2-icon.swal2-error .swal2-x-mark {\n      position: relative;\n      -webkit-box-flex: 1;\n          -ms-flex-positive: 1;\n              flex-grow: 1; }\n    .swal2-icon.swal2-error [class^='swal2-x-mark-line'] {\n      position: absolute;\n      height: 5px;\n      width: 47px;\n      background-color: #f27474;\n      display: block;\n      top: 37px;\n      border-radius: 2px; }\n      .swal2-icon.swal2-error [class^='swal2-x-mark-line'][class$='left'] {\n        -webkit-transform: rotate(45deg);\n                transform: rotate(45deg);\n        left: 17px; }\n      .swal2-icon.swal2-error [class^='swal2-x-mark-line'][class$='right'] {\n        -webkit-transform: rotate(-45deg);\n                transform: rotate(-45deg);\n        right: 16px; }\n  .swal2-icon.swal2-warning, .swal2-icon.swal2-info, .swal2-icon.swal2-question {\n    font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n    font-size: 3.75em;\n    margin: .333333em auto .5em; }\n  .swal2-icon.swal2-warning {\n    color: #f8bb86;\n    border-color: #facea8; }\n  .swal2-icon.swal2-info {\n    color: #3fc3ee;\n    border-color: #9de0f6; }\n  .swal2-icon.swal2-question {\n    color: #87adbd;\n    border-color: #c9dae1; }\n  .swal2-icon.swal2-success {\n    border-color: #a5dc86; }\n    .swal2-icon.swal2-success [class^='swal2-success-circular-line'] {\n      border-radius: 50%;\n      position: absolute;\n      width: 60px;\n      height: 120px;\n      -webkit-transform: rotate(45deg);\n              transform: rotate(45deg); }\n      .swal2-icon.swal2-success [class^='swal2-success-circular-line'][class$='left'] {\n        border-radius: 120px 0 0 120px;\n        top: -7px;\n        left: -33px;\n        -webkit-transform: rotate(-45deg);\n                transform: rotate(-45deg);\n        -webkit-transform-origin: 60px 60px;\n                transform-origin: 60px 60px; }\n      .swal2-icon.swal2-success [class^='swal2-success-circular-line'][class$='right'] {\n        border-radius: 0 120px 120px 0;\n        top: -11px;\n        left: 30px;\n        -webkit-transform: rotate(-45deg);\n                transform: rotate(-45deg);\n        -webkit-transform-origin: 0 60px;\n                transform-origin: 0 60px; }\n    .swal2-icon.swal2-success .swal2-success-ring {\n      width: 80px;\n      height: 80px;\n      border: 4px solid rgba(165, 220, 134, 0.2);\n      border-radius: 50%;\n      -webkit-box-sizing: content-box;\n              box-sizing: content-box;\n      position: absolute;\n      left: -4px;\n      top: -4px;\n      z-index: 2; }\n    .swal2-icon.swal2-success .swal2-success-fix {\n      width: 7px;\n      height: 90px;\n      position: absolute;\n      left: 26px;\n      top: 8px;\n      z-index: 1;\n      -webkit-transform: rotate(-45deg);\n              transform: rotate(-45deg); }\n    .swal2-icon.swal2-success [class^='swal2-success-line'] {\n      height: 5px;\n      background-color: #a5dc86;\n      display: block;\n      border-radius: 2px;\n      position: absolute;\n      z-index: 2; }\n      .swal2-icon.swal2-success [class^='swal2-success-line'][class$='tip'] {\n        width: 25px;\n        left: 14px;\n        top: 46px;\n        -webkit-transform: rotate(45deg);\n                transform: rotate(45deg); }\n      .swal2-icon.swal2-success [class^='swal2-success-line'][class$='long'] {\n        width: 47px;\n        right: 8px;\n        top: 38px;\n        -webkit-transform: rotate(-45deg);\n                transform: rotate(-45deg); }\n\n.swal2-progresssteps {\n  font-weight: 600;\n  padding: 0;\n  margin: 0 0 1.25em;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center; }\n  .swal2-progresssteps li {\n    display: inline-block;\n    position: relative; }\n  .swal2-progresssteps .swal2-progresscircle {\n    background: #3085d6;\n    border-radius: 2em;\n    color: #fff;\n    height: 2em;\n    line-height: 2em;\n    text-align: center;\n    width: 2em;\n    z-index: 20; }\n    .swal2-progresssteps .swal2-progresscircle:first-child {\n      margin-left: 0; }\n    .swal2-progresssteps .swal2-progresscircle:last-child {\n      margin-right: 0; }\n    .swal2-progresssteps .swal2-progresscircle.swal2-activeprogressstep {\n      background: #3085d6; }\n      .swal2-progresssteps .swal2-progresscircle.swal2-activeprogressstep ~ .swal2-progresscircle {\n        background: #add8e6; }\n      .swal2-progresssteps .swal2-progresscircle.swal2-activeprogressstep ~ .swal2-progressline {\n        background: #add8e6; }\n  .swal2-progresssteps .swal2-progressline {\n    background: #3085d6;\n    height: .4em;\n    width: 2.5em;\n    margin: 0 -1px;\n    z-index: 10; }\n\n[class^='swal2'] {\n  -webkit-tap-highlight-color: transparent; }\n\n@-webkit-keyframes showSweetAlert {\n  0% {\n    -webkit-transform: scale(0.7);\n            transform: scale(0.7); }\n  45% {\n    -webkit-transform: scale(1.05);\n            transform: scale(1.05); }\n  80% {\n    -webkit-transform: scale(0.95);\n            transform: scale(0.95); }\n  100% {\n    -webkit-transform: scale(1);\n            transform: scale(1); } }\n\n@keyframes showSweetAlert {\n  0% {\n    -webkit-transform: scale(0.7);\n            transform: scale(0.7); }\n  45% {\n    -webkit-transform: scale(1.05);\n            transform: scale(1.05); }\n  80% {\n    -webkit-transform: scale(0.95);\n            transform: scale(0.95); }\n  100% {\n    -webkit-transform: scale(1);\n            transform: scale(1); } }\n\n@-webkit-keyframes hideSweetAlert {\n  0% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n    opacity: 1; }\n  100% {\n    -webkit-transform: scale(0.5);\n            transform: scale(0.5);\n    opacity: 0; } }\n\n@keyframes hideSweetAlert {\n  0% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n    opacity: 1; }\n  100% {\n    -webkit-transform: scale(0.5);\n            transform: scale(0.5);\n    opacity: 0; } }\n\n.swal2-show {\n  -webkit-animation: showSweetAlert .3s;\n          animation: showSweetAlert .3s; }\n  .swal2-show.swal2-noanimation {\n    -webkit-animation: none;\n            animation: none; }\n\n.swal2-hide {\n  -webkit-animation: hideSweetAlert .15s forwards;\n          animation: hideSweetAlert .15s forwards; }\n  .swal2-hide.swal2-noanimation {\n    -webkit-animation: none;\n            animation: none; }\n\n[dir='rtl'] .swal2-close {\n  left: 8px;\n  right: auto; }\n\n@-webkit-keyframes animate-success-tip {\n  0% {\n    width: 0;\n    left: 1px;\n    top: 19px; }\n  54% {\n    width: 0;\n    left: 2px;\n    top: 17px; }\n  70% {\n    width: 50px;\n    left: -6px;\n    top: 35px; }\n  84% {\n    width: 17px;\n    left: 21px;\n    top: 48px; }\n  100% {\n    width: 25px;\n    left: 14px;\n    top: 45px; } }\n\n@keyframes animate-success-tip {\n  0% {\n    width: 0;\n    left: 1px;\n    top: 19px; }\n  54% {\n    width: 0;\n    left: 2px;\n    top: 17px; }\n  70% {\n    width: 50px;\n    left: -6px;\n    top: 35px; }\n  84% {\n    width: 17px;\n    left: 21px;\n    top: 48px; }\n  100% {\n    width: 25px;\n    left: 14px;\n    top: 45px; } }\n\n@-webkit-keyframes animate-success-long {\n  0% {\n    width: 0;\n    right: 46px;\n    top: 54px; }\n  65% {\n    width: 0;\n    right: 46px;\n    top: 54px; }\n  84% {\n    width: 55px;\n    right: 0;\n    top: 35px; }\n  100% {\n    width: 47px;\n    right: 8px;\n    top: 38px; } }\n\n@keyframes animate-success-long {\n  0% {\n    width: 0;\n    right: 46px;\n    top: 54px; }\n  65% {\n    width: 0;\n    right: 46px;\n    top: 54px; }\n  84% {\n    width: 55px;\n    right: 0;\n    top: 35px; }\n  100% {\n    width: 47px;\n    right: 8px;\n    top: 38px; } }\n\n@-webkit-keyframes rotatePlaceholder {\n  0% {\n    -webkit-transform: rotate(-45deg);\n            transform: rotate(-45deg); }\n  5% {\n    -webkit-transform: rotate(-45deg);\n            transform: rotate(-45deg); }\n  12% {\n    -webkit-transform: rotate(-405deg);\n            transform: rotate(-405deg); }\n  100% {\n    -webkit-transform: rotate(-405deg);\n            transform: rotate(-405deg); } }\n\n@keyframes rotatePlaceholder {\n  0% {\n    -webkit-transform: rotate(-45deg);\n            transform: rotate(-45deg); }\n  5% {\n    -webkit-transform: rotate(-45deg);\n            transform: rotate(-45deg); }\n  12% {\n    -webkit-transform: rotate(-405deg);\n            transform: rotate(-405deg); }\n  100% {\n    -webkit-transform: rotate(-405deg);\n            transform: rotate(-405deg); } }\n\n.swal2-animate-success-line-tip {\n  -webkit-animation: animate-success-tip .75s;\n          animation: animate-success-tip .75s; }\n\n.swal2-animate-success-line-long {\n  -webkit-animation: animate-success-long .75s;\n          animation: animate-success-long .75s; }\n\n.swal2-success.swal2-animate-success-icon .swal2-success-circular-line-right {\n  -webkit-animation: rotatePlaceholder 4.25s ease-in;\n          animation: rotatePlaceholder 4.25s ease-in; }\n\n@-webkit-keyframes animate-error-icon {\n  0% {\n    -webkit-transform: rotateX(100deg);\n            transform: rotateX(100deg);\n    opacity: 0; }\n  100% {\n    -webkit-transform: rotateX(0deg);\n            transform: rotateX(0deg);\n    opacity: 1; } }\n\n@keyframes animate-error-icon {\n  0% {\n    -webkit-transform: rotateX(100deg);\n            transform: rotateX(100deg);\n    opacity: 0; }\n  100% {\n    -webkit-transform: rotateX(0deg);\n            transform: rotateX(0deg);\n    opacity: 1; } }\n\n.swal2-animate-error-icon {\n  -webkit-animation: animate-error-icon .5s;\n          animation: animate-error-icon .5s; }\n\n@-webkit-keyframes animate-x-mark {\n  0% {\n    -webkit-transform: scale(0.4);\n            transform: scale(0.4);\n    margin-top: 26px;\n    opacity: 0; }\n  50% {\n    -webkit-transform: scale(0.4);\n            transform: scale(0.4);\n    margin-top: 26px;\n    opacity: 0; }\n  80% {\n    -webkit-transform: scale(1.15);\n            transform: scale(1.15);\n    margin-top: -6px; }\n  100% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n    margin-top: 0;\n    opacity: 1; } }\n\n@keyframes animate-x-mark {\n  0% {\n    -webkit-transform: scale(0.4);\n            transform: scale(0.4);\n    margin-top: 26px;\n    opacity: 0; }\n  50% {\n    -webkit-transform: scale(0.4);\n            transform: scale(0.4);\n    margin-top: 26px;\n    opacity: 0; }\n  80% {\n    -webkit-transform: scale(1.15);\n            transform: scale(1.15);\n    margin-top: -6px; }\n  100% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n    margin-top: 0;\n    opacity: 1; } }\n\n.swal2-animate-x-mark {\n  -webkit-animation: animate-x-mark .5s;\n          animation: animate-x-mark .5s; }\n\n@-webkit-keyframes rotate-loading {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg); }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg); } }\n\n@keyframes rotate-loading {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg); }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg); } }\n";

    var defaultParams = {
        title: '',
        titleText: '',
        text: '',
        html: '',
        type: null,
        toast: false,
        customClass: '',
        target: 'body',
        backdrop: true,
        animation: true,
        allowOutsideClick: true,
        allowEscapeKey: true,
        allowEnterKey: true,
        showConfirmButton: true,
        showCancelButton: false,
        preConfirm: null,
        confirmButtonText: 'OK',
        confirmButtonAriaLabel: '',
        confirmButtonColor: '#3085d6',
        confirmButtonClass: null,
        cancelButtonText: 'Cancel',
        cancelButtonAriaLabel: '',
        cancelButtonColor: '#aaa',
        cancelButtonClass: null,
        buttonsStyling: true,
        reverseButtons: false,
        focusConfirm: true,
        focusCancel: false,
        showCloseButton: false,
        closeButtonAriaLabel: 'Close this dialog',
        showLoaderOnConfirm: false,
        imageUrl: null,
        imageWidth: null,
        imageHeight: null,
        imageAlt: '',
        imageClass: null,
        timer: null,
        width: null,
        padding: null,
        background: '#fff',
        input: null,
        inputPlaceholder: '',
        inputValue: '',
        inputOptions: {},
        inputAutoTrim: true,
        inputClass: null,
        inputAttributes: {},
        inputValidator: null,
        grow: false,
        position: 'center',
        progressSteps: [],
        currentProgressStep: null,
        progressStepsDistance: null,
        onBeforeOpen: null,
        onOpen: null,
        onClose: null,
        useRejections: false,
        expectRejections: false
    };

    var deprecatedParams = ['useRejections', 'expectRejections'];

    var swalPrefix = 'swal2-';

    var prefix = function prefix(items) {
        var result = {};
        for (var i in items) {
            result[items[i]] = swalPrefix + items[i];
        }
        return result;
    };

    var swalClasses = prefix(['container', 'shown', 'iosfix', 'popup', 'modal', 'no-backdrop', 'toast', 'toast-shown', 'overlay', 'fade', 'show', 'hide', 'noanimation', 'close', 'title', 'header', 'content', 'actions', 'confirm', 'cancel', 'icon', 'image', 'input', 'has-input', 'file', 'range', 'select', 'radio', 'checkbox', 'textarea', 'inputerror', 'validationerror', 'progresssteps', 'activeprogressstep', 'progresscircle', 'progressline', 'loading', 'styled', 'top', 'top-start', 'top-end', 'top-left', 'top-right', 'center', 'center-start', 'center-end', 'center-left', 'center-right', 'bottom', 'bottom-start', 'bottom-end', 'bottom-left', 'bottom-right', 'grow-row', 'grow-column', 'grow-fullscreen']);

    var iconTypes = prefix(['success', 'warning', 'info', 'question', 'error']);

    var consolePrefix = 'SweetAlert2:';

    /*
     * Set hover, active and focus-states for buttons (source: http://www.sitepoint.com/javascript-generate-lighter-darker-color)
     */
    var colorLuminance = function colorLuminance(hex, lum) {
        // Validate hex string
        hex = String(hex).replace(/[^0-9a-f]/gi, '');
        if (hex.length < 6) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        lum = lum || 0;

        // Convert to decimal and change luminosity
        var rgb = '#';
        for (var i = 0; i < 3; i++) {
            var c = parseInt(hex.substr(i * 2, 2), 16);
            c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
            rgb += ('00' + c).substr(c.length);
        }

        return rgb;
    };

    /**
     * Filter the unique values into a new array
     * @param arr
     */
    var uniqueArray = function uniqueArray(arr) {
        var result = [];
        for (var i in arr) {
            if (result.indexOf(arr[i]) === -1) {
                result.push(arr[i]);
            }
        }
        return result;
    };

    /**
     * Standardise console warnings
     * @param message
     */
    var warn = function warn(message) {
        console.warn(consolePrefix + ' ' + message);
    };

    /**
     * Standardise console errors
     * @param message
     */
    var error = function error(message) {
        console.error(consolePrefix + ' ' + message);
    };

    /**
     * Private global state for `warnOnce`
     * @type {Array}
     * @private
     */
    var previousWarnOnceMessages = [];

    /**
     * Show a console warning, but only if it hasn't already been shown
     * @param message
     */
    var warnOnce = function warnOnce(message) {
        if (!(previousWarnOnceMessages.indexOf(message) !== -1)) {
            previousWarnOnceMessages.push(message);
            warn(message);
        }
    };

    /**
     * If `arg` is a function, call it (with no arguments or context) and return the result.
     * Otherwise, just pass the value through
     * @param arg
     */
    var callIfFunction = function callIfFunction(arg) {
        return typeof arg === 'function' ? arg() : arg;
    };

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
    } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };





















    var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }

        return target;
    };

    var popupParams = _extends({}, defaultParams);
    var queue = [];

    var previousWindowKeyDown = void 0;
    var windowOnkeydownOverridden = void 0;

    /*
     * Check for the existence of Promise
     * Hopefully to avoid many github issues
     */
    if (typeof Promise === 'undefined') {
        error('This package requires a Promise library, please include a shim to enable it in this browser (See: https://github.com/sweetalert2/sweetalert2/wiki/Migration-from-SweetAlert-to-SweetAlert2#1-ie-support)');
    }

    /**
     * Show relevant warnings for given params
     *
     * @param params
     */
    var showWarningsForParams = function showWarningsForParams(params) {
        for (var param in params) {
            if (!sweetAlert$1.isValidParameter(param)) {
                warn('Unknown parameter "' + param + '"');
            }
            if (sweetAlert$1.isDeprecatedParameter(param)) {
                warnOnce('The parameter "' + param + '" is deprecated and will be removed in the next major release.');
            }
        }
    };

    /**
     * Set type, text and actions on popup
     *
     * @param params
     * @returns {boolean}
     */
    var setParameters = function setParameters(params) {
        // If a custom element is set, determine if it is valid
        if (typeof params.target === 'string' && !document.querySelector(params.target) || typeof params.target !== 'string' && !params.target.appendChild) {
            warn('Target parameter is not valid, defaulting to "body"');
            params.target = 'body';
        }

        var popup = void 0;
        var oldPopup = getPopup();
        var targetElement = typeof params.target === 'string' ? document.querySelector(params.target) : params.target;
        // If the model target has changed, refresh the popup
        if (oldPopup && targetElement && oldPopup.parentNode !== targetElement.parentNode) {
            popup = init(params);
        } else {
            popup = oldPopup || init(params);
        }

        // Set popup width
        if (params.width) {
            popup.style.width = typeof params.width === 'number' ? params.width + 'px' : params.width;
        }

        // Set popup padding
        if (params.padding) {
            popup.style.padding = typeof params.padding === 'number' ? params.padding + 'px' : params.padding;
        }

        popup.style.background = params.background;
        var successIconParts = popup.querySelectorAll('[class^=swal2-success-circular-line], .swal2-success-fix');
        for (var i = 0; i < successIconParts.length; i++) {
            successIconParts[i].style.background = params.background;
        }

        var container = getContainer();
        var title = getTitle();
        var content = getContent().querySelector('#' + swalClasses.content);
        var actions = getActions();
        var confirmButton = getConfirmButton();
        var cancelButton = getCancelButton();
        var closeButton = getCloseButton();

        // Title
        if (params.titleText) {
            title.innerText = params.titleText;
        } else {
            title.innerHTML = params.title.split('\n').join('<br />');
        }

        if (!params.backdrop) {
            addClass([document.documentElement, document.body], swalClasses['no-backdrop']);
        }

        // Content
        if (params.text || params.html) {
            if (_typeof(params.html) === 'object') {
                content.innerHTML = '';
                if (0 in params.html) {
                    for (var _i = 0; _i in params.html; _i++) {
                        content.appendChild(params.html[_i].cloneNode(true));
                    }
                } else {
                    content.appendChild(params.html.cloneNode(true));
                }
            } else if (params.html) {
                content.innerHTML = params.html;
            } else if (params.text) {
                content.textContent = params.text;
            }
            show(content);
        } else {
            hide(content);
        }

        // Position
        if (params.position in swalClasses) {
            addClass(container, swalClasses[params.position]);
        }

        // Grow
        if (params.grow && typeof params.grow === 'string') {
            var growClass = 'grow-' + params.grow;
            if (growClass in swalClasses) {
                addClass(container, swalClasses[growClass]);
            }
        }

        // Close button
        if (params.showCloseButton) {
            closeButton.setAttribute('aria-label', params.closeButtonAriaLabel);
            show(closeButton);
        } else {
            hide(closeButton);
        }

        // Default Class
        popup.className = swalClasses.popup;
        if (params.toast) {
            addClass([document.documentElement, document.body], swalClasses['toast-shown']);
            addClass(popup, swalClasses.toast);
        } else {
            addClass(popup, swalClasses.modal);
        }

        // Custom Class
        if (params.customClass) {
            addClass(popup, params.customClass);
        }

        // Progress steps
        var progressStepsContainer = getProgressSteps();
        var currentProgressStep = parseInt(params.currentProgressStep === null ? sweetAlert$1.getQueueStep() : params.currentProgressStep, 10);
        if (params.progressSteps.length) {
            show(progressStepsContainer);
            empty(progressStepsContainer);
            if (currentProgressStep >= params.progressSteps.length) {
                warn('Invalid currentProgressStep parameter, it should be less than progressSteps.length ' + '(currentProgressStep like JS arrays starts from 0)');
            }
            params.progressSteps.forEach(function (step, index) {
                var circle = document.createElement('li');
                addClass(circle, swalClasses.progresscircle);
                circle.innerHTML = step;
                if (index === currentProgressStep) {
                    addClass(circle, swalClasses.activeprogressstep);
                }
                progressStepsContainer.appendChild(circle);
                if (index !== params.progressSteps.length - 1) {
                    var line = document.createElement('li');
                    addClass(line, swalClasses.progressline);
                    if (params.progressStepsDistance) {
                        line.style.width = params.progressStepsDistance;
                    }
                    progressStepsContainer.appendChild(line);
                }
            });
        } else {
            hide(progressStepsContainer);
        }

        // Icon
        var icons = getIcons();
        for (var _i2 = 0; _i2 < icons.length; _i2++) {
            hide(icons[_i2]);
        }
        if (params.type) {
            var validType = false;
            for (var iconType in iconTypes) {
                if (params.type === iconType) {
                    validType = true;
                    break;
                }
            }
            if (!validType) {
                error('Unknown alert type: ' + params.type);
                return false;
            }
            var icon = popup.querySelector('.' + swalClasses.icon + '.' + iconTypes[params.type]);
            show(icon);

            // Animate icon
            if (params.animation) {
                switch (params.type) {
                    case 'success':
                        addClass(icon, 'swal2-animate-success-icon');
                        addClass(icon.querySelector('.swal2-success-line-tip'), 'swal2-animate-success-line-tip');
                        addClass(icon.querySelector('.swal2-success-line-long'), 'swal2-animate-success-line-long');
                        break;
                    case 'error':
                        addClass(icon, 'swal2-animate-error-icon');
                        addClass(icon.querySelector('.swal2-x-mark'), 'swal2-animate-x-mark');
                        break;
                    default:
                        break;
                }
            }
        }

        // Custom image
        var image = getImage();
        if (params.imageUrl) {
            image.setAttribute('src', params.imageUrl);
            image.setAttribute('alt', params.imageAlt);
            show(image);

            if (params.imageWidth) {
                image.setAttribute('width', params.imageWidth);
            } else {
                image.removeAttribute('width');
            }

            if (params.imageHeight) {
                image.setAttribute('height', params.imageHeight);
            } else {
                image.removeAttribute('height');
            }

            image.className = swalClasses.image;
            if (params.imageClass) {
                addClass(image, params.imageClass);
            }
        } else {
            hide(image);
        }

        // Cancel button
        if (params.showCancelButton) {
            cancelButton.style.display = 'inline-block';
        } else {
            hide(cancelButton);
        }

        // Confirm button
        if (params.showConfirmButton) {
            removeStyleProperty(confirmButton, 'display');
        } else {
            hide(confirmButton);
        }

        // Actions (buttons) wrapper
        if (!params.showConfirmButton && !params.showCancelButton) {
            hide(actions);
        } else {
            show(actions);
        }

        // Edit text on confirm and cancel buttons
        confirmButton.innerHTML = params.confirmButtonText;
        cancelButton.innerHTML = params.cancelButtonText;

        // ARIA labels for confirm and cancel buttons
        confirmButton.setAttribute('aria-label', params.confirmButtonAriaLabel);
        cancelButton.setAttribute('aria-label', params.cancelButtonAriaLabel);

        // Set buttons to selected background colors
        if (params.buttonsStyling) {
            confirmButton.style.backgroundColor = params.confirmButtonColor;
            cancelButton.style.backgroundColor = params.cancelButtonColor;
        }

        // Add buttons custom classes
        confirmButton.className = swalClasses.confirm;
        addClass(confirmButton, params.confirmButtonClass);
        cancelButton.className = swalClasses.cancel;
        addClass(cancelButton, params.cancelButtonClass);

        // Buttons styling
        if (params.buttonsStyling) {
            addClass([confirmButton, cancelButton], swalClasses.styled);
        } else {
            removeClass([confirmButton, cancelButton], swalClasses.styled);

            confirmButton.style.backgroundColor = confirmButton.style.borderLeftColor = confirmButton.style.borderRightColor = '';
            cancelButton.style.backgroundColor = cancelButton.style.borderLeftColor = cancelButton.style.borderRightColor = '';
        }

        // CSS animation
        if (params.animation === true) {
            removeClass(popup, swalClasses.noanimation);
        } else {
            addClass(popup, swalClasses.noanimation);
        }

        // showLoaderOnConfirm && preConfirm
        if (params.showLoaderOnConfirm && !params.preConfirm) {
            warn('showLoaderOnConfirm is set to true, but preConfirm is not defined.\n' + 'showLoaderOnConfirm should be used together with preConfirm, see usage example:\n' + 'https://sweetalert2.github.io/#ajax-request');
        }
    };

    /**
     * Animations
     *
     * @param animation
     * @param onBeforeOpen
     * @param onComplete
     */
    var openPopup = function openPopup(animation, onBeforeOpen, onComplete) {
        var container = getContainer();
        var popup = getPopup();

        if (onBeforeOpen !== null && typeof onBeforeOpen === 'function') {
            onBeforeOpen(popup);
        }

        if (animation) {
            addClass(popup, swalClasses.show);
            addClass(container, swalClasses.fade);
            removeClass(popup, swalClasses.hide);
        } else {
            removeClass(popup, swalClasses.fade);
        }
        show(popup);

        // scrolling is 'hidden' until animation is done, after that 'auto'
        container.style.overflowY = 'hidden';
        if (animationEndEvent && !hasClass(popup, swalClasses.noanimation)) {
            popup.addEventListener(animationEndEvent, function swalCloseEventFinished() {
                popup.removeEventListener(animationEndEvent, swalCloseEventFinished);
                container.style.overflowY = 'auto';
            });
        } else {
            container.style.overflowY = 'auto';
        }

        addClass([document.documentElement, document.body, container], swalClasses.shown);
        if (isModal()) {
            fixScrollbar();
            iOSfix();
        }
        states.previousActiveElement = document.activeElement;
        if (onComplete !== null && typeof onComplete === 'function') {
            setTimeout(function () {
                onComplete(popup);
            });
        }
    };

    var fixScrollbar = function fixScrollbar() {
        // for queues, do not do this more than once
        if (states.previousBodyPadding !== null) {
            return;
        }
        // if the body has overflow
        if (document.body.scrollHeight > window.innerHeight) {
            // add padding so the content doesn't shift after removal of scrollbar
            states.previousBodyPadding = document.body.style.paddingRight;
            document.body.style.paddingRight = measureScrollbar() + 'px';
        }
    };

    var undoScrollbar = function undoScrollbar() {
        if (states.previousBodyPadding !== null) {
            document.body.style.paddingRight = states.previousBodyPadding;
            states.previousBodyPadding = null;
        }
    };

    // Fix iOS scrolling http://stackoverflow.com/q/39626302/1331425
    var iOSfix = function iOSfix() {
        var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        if (iOS && !hasClass(document.body, swalClasses.iosfix)) {
            var offset = document.body.scrollTop;
            document.body.style.top = offset * -1 + 'px';
            addClass(document.body, swalClasses.iosfix);
        }
    };

    var undoIOSfix = function undoIOSfix() {
        if (hasClass(document.body, swalClasses.iosfix)) {
            var offset = parseInt(document.body.style.top, 10);
            removeClass(document.body, swalClasses.iosfix);
            document.body.style.top = '';
            document.body.scrollTop = offset * -1;
        }
    };

    // SweetAlert entry point
    var sweetAlert$1 = function sweetAlert() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        // Prevent run in Node env
        if (typeof window === 'undefined') {
            return;
        }

        if (typeof args[0] === 'undefined') {
            error('SweetAlert2 expects at least 1 attribute!');
            return false;
        }

        var params = _extends({}, popupParams);

        switch (_typeof(args[0])) {
            case 'string':
                params.title = args[0];
                params.html = args[1];
                params.type = args[2];

                break;

            case 'object':
                showWarningsForParams(args[0]);
                _extends(params, args[0]);
                params.extraParams = args[0].extraParams;

                if (params.input === 'email' && params.inputValidator === null) {
                    var inputValidator = function inputValidator(email) {
                        return new Promise(function (resolve, reject) {
                            var emailRegex = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,24}$/;
                            if (emailRegex.test(email)) {
                                resolve();
                            } else {
                                reject('Invalid email address');
                            }
                        });
                    };
                    params.inputValidator = params.expectRejections ? inputValidator : sweetAlert.adaptInputValidator(inputValidator);
                }

                if (params.input === 'url' && params.inputValidator === null) {
                    var _inputValidator = function _inputValidator(url) {
                        return new Promise(function (resolve, reject) {
                            // taken from https://stackoverflow.com/a/3809435/1331425
                            var urlRegex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/;
                            if (urlRegex.test(url)) {
                                resolve();
                            } else {
                                reject('Invalid URL');
                            }
                        });
                    };
                    params.inputValidator = params.expectRejections ? _inputValidator : sweetAlert.adaptInputValidator(_inputValidator);
                }
                break;

            default:
                error('Unexpected type of argument! Expected "string" or "object", got ' + _typeof(args[0]));
                return false;
        }

        setParameters(params);

        var container = getContainer();
        var popup = getPopup();

        return new Promise(function (resolve, reject) {
            // functions to handle all resolving/rejecting/settling
            var succeedWith = function succeedWith(value) {
                sweetAlert.closePopup(params.onClose);
                if (params.useRejections) {
                    resolve(value);
                } else {
                    resolve({ value: value });
                }
            };
            var dismissWith = function dismissWith(dismiss) {
                sweetAlert.closePopup(params.onClose);
                if (params.useRejections) {
                    reject(dismiss);
                } else {
                    resolve({ dismiss: dismiss });
                }
            };
            var errorWith = function errorWith(error$$1) {
                sweetAlert.closePopup(params.onClose);
                reject(error$$1);
            };

            // Close on timer
            if (params.timer) {
                popup.timeout = setTimeout(function () {
                    return dismissWith('timer');
                }, params.timer);
            }

            // Get input element by specified type or, if type isn't specified, by params.input
            var getInput = function getInput(inputType) {
                inputType = inputType || params.input;
                if (!inputType) {
                    return null;
                }
                switch (inputType) {
                    case 'select':
                    case 'textarea':
                    case 'file':
                        return getChildByClass(content, swalClasses[inputType]);
                    case 'checkbox':
                        return popup.querySelector('.' + swalClasses.checkbox + ' input');
                    case 'radio':
                        return popup.querySelector('.' + swalClasses.radio + ' input:checked') || popup.querySelector('.' + swalClasses.radio + ' input:first-child');
                    case 'range':
                        return popup.querySelector('.' + swalClasses.range + ' input');
                    default:
                        return getChildByClass(content, swalClasses.input);
                }
            };

            // Get the value of the popup input
            var getInputValue = function getInputValue() {
                var input = getInput();
                if (!input) {
                    return null;
                }
                switch (params.input) {
                    case 'checkbox':
                        return input.checked ? 1 : 0;
                    case 'radio':
                        return input.checked ? input.value : null;
                    case 'file':
                        return input.files.length ? input.files[0] : null;
                    default:
                        return params.inputAutoTrim ? input.value.trim() : input.value;
                }
            };

            // input autofocus
            if (params.input) {
                setTimeout(function () {
                    var input = getInput();
                    if (input) {
                        focusInput(input);
                    }
                }, 0);
            }

            var confirm = function confirm(value) {
                if (params.showLoaderOnConfirm) {
                    sweetAlert.showLoading();
                }

                if (params.preConfirm) {
                    sweetAlert.resetValidationError();
                    var preConfirmPromise = Promise.resolve().then(function () {
                        return params.preConfirm(value, params.extraParams);
                    });
                    if (params.expectRejections) {
                        preConfirmPromise.then(function (preConfirmValue) {
                            return succeedWith(preConfirmValue || value);
                        }, function (validationError) {
                            sweetAlert.hideLoading();
                            if (validationError) {
                                sweetAlert.showValidationError(validationError);
                            }
                        });
                    } else {
                        preConfirmPromise.then(function (preConfirmValue) {
                            if (isVisible(getValidationError())) {
                                sweetAlert.hideLoading();
                            } else {
                                succeedWith(preConfirmValue || value);
                            }
                        }, function (error$$1) {
                            return errorWith(error$$1);
                        });
                    }
                } else {
                    succeedWith(value);
                }
            };

            // Mouse interactions
            var onButtonEvent = function onButtonEvent(event) {
                var e = event || window.event;
                var target = e.target || e.srcElement;
                var confirmButton = getConfirmButton();
                var cancelButton = getCancelButton();
                var targetedConfirm = confirmButton && (confirmButton === target || confirmButton.contains(target));
                var targetedCancel = cancelButton && (cancelButton === target || cancelButton.contains(target));

                switch (e.type) {
                    case 'mouseover':
                    case 'mouseup':
                        if (params.buttonsStyling) {
                            if (targetedConfirm) {
                                confirmButton.style.backgroundColor = colorLuminance(params.confirmButtonColor, -0.1);
                            } else if (targetedCancel) {
                                cancelButton.style.backgroundColor = colorLuminance(params.cancelButtonColor, -0.1);
                            }
                        }
                        break;
                    case 'mouseout':
                        if (params.buttonsStyling) {
                            if (targetedConfirm) {
                                confirmButton.style.backgroundColor = params.confirmButtonColor;
                            } else if (targetedCancel) {
                                cancelButton.style.backgroundColor = params.cancelButtonColor;
                            }
                        }
                        break;
                    case 'mousedown':
                        if (params.buttonsStyling) {
                            if (targetedConfirm) {
                                confirmButton.style.backgroundColor = colorLuminance(params.confirmButtonColor, -0.2);
                            } else if (targetedCancel) {
                                cancelButton.style.backgroundColor = colorLuminance(params.cancelButtonColor, -0.2);
                            }
                        }
                        break;
                    case 'click':
                        // Clicked 'confirm'
                        if (targetedConfirm && sweetAlert.isVisible()) {
                            sweetAlert.disableButtons();
                            if (params.input) {
                                var inputValue = getInputValue();

                                if (params.inputValidator) {
                                    sweetAlert.disableInput();
                                    var validationPromise = Promise.resolve().then(function () {
                                        return params.inputValidator(inputValue, params.extraParams);
                                    });
                                    if (params.expectRejections) {
                                        validationPromise.then(function () {
                                            sweetAlert.enableButtons();
                                            sweetAlert.enableInput();
                                            confirm(inputValue);
                                        }, function (validationError) {
                                            sweetAlert.enableButtons();
                                            sweetAlert.enableInput();
                                            if (validationError) {
                                                sweetAlert.showValidationError(validationError);
                                            }
                                        });
                                    } else {
                                        validationPromise.then(function (validationError) {
                                            sweetAlert.enableButtons();
                                            sweetAlert.enableInput();
                                            if (validationError) {
                                                sweetAlert.showValidationError(validationError);
                                            } else {
                                                confirm(inputValue);
                                            }
                                        }, function (error$$1) {
                                            return errorWith(error$$1);
                                        });
                                    }
                                } else {
                                    confirm(inputValue);
                                }
                            } else {
                                confirm(true);
                            }

                            // Clicked 'cancel'
                        } else if (targetedCancel && sweetAlert.isVisible()) {
                            sweetAlert.disableButtons();
                            dismissWith('cancel');
                        }
                        break;
                    default:
                }
            };

            var buttons = popup.querySelectorAll('button');
            for (var i = 0; i < buttons.length; i++) {
                buttons[i].onclick = onButtonEvent;
                buttons[i].onmouseover = onButtonEvent;
                buttons[i].onmouseout = onButtonEvent;
                buttons[i].onmousedown = onButtonEvent;
            }

            // Closing popup by close button
            getCloseButton().onclick = function () {
                dismissWith('close');
            };

            if (params.toast) {
                // Closing popup by overlay click
                popup.onclick = function (e) {
                    if (e.target !== popup || params.showConfirmButton || params.showCancelButton) {
                        return;
                    }
                    if (params.allowOutsideClick) {
                        sweetAlert.closePopup(params.onClose);
                        dismissWith('overlay');
                    }
                };
            } else {
                var ignoreOutsideClick = false;

                // Ignore click events that had mousedown on the popup but mouseup on the container
                // This can happen when the user drags a slider
                popup.onmousedown = function () {
                    container.onmouseup = function (e) {
                        container.onmouseup = undefined;
                        // We only check if the mouseup target is the container because usually it doesn't
                        // have any other direct children aside of the popup
                        if (e.target === container) {
                            ignoreOutsideClick = true;
                        }
                    };
                };

                // Ignore click events that had mousedown on the container but mouseup on the popup
                container.onmousedown = function () {
                    popup.onmouseup = function (e) {
                        popup.onmouseup = undefined;
                        // We also need to check if the mouseup target is a child of the popup
                        if (e.target === popup || popup.contains(e.target)) {
                            ignoreOutsideClick = true;
                        }
                    };
                };

                container.onclick = function (e) {
                    if (ignoreOutsideClick) {
                        ignoreOutsideClick = false;
                        return;
                    }
                    if (e.target !== container) {
                        return;
                    }
                    if (callIfFunction(params.allowOutsideClick)) {
                        dismissWith('overlay');
                    }
                };
            }

            var content = getContent();
            var actions = getActions();
            var confirmButton = getConfirmButton();
            var cancelButton = getCancelButton();

            // Reverse buttons (Confirm on the right side)
            if (params.reverseButtons) {
                confirmButton.parentNode.insertBefore(cancelButton, confirmButton);
            } else {
                confirmButton.parentNode.insertBefore(confirmButton, cancelButton);
            }

            // Focus handling
            var setFocus = function setFocus(index, increment) {
                var focusableElements = getFocusableElements(params.focusCancel);
                // search for visible elements and select the next possible match
                for (var _i3 = 0; _i3 < focusableElements.length; _i3++) {
                    index = index + increment;

                    // rollover to first item
                    if (index === focusableElements.length) {
                        index = 0;

                        // go to last item
                    } else if (index === -1) {
                        index = focusableElements.length - 1;
                    }

                    // determine if element is visible
                    var el = focusableElements[index];
                    if (isVisible(el)) {
                        return el.focus();
                    }
                }
            };

            var handleKeyDown = function handleKeyDown(event) {
                var e = event || window.event;

                var arrowKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Left', 'Right', 'Up', 'Down' // IE11
                ];

                if (e.key === 'Enter' && !e.isComposing) {
                    if (e.target === getInput()) {
                        if (['textarea', 'file'].indexOf(params.input) !== -1) {
                            return; // do not submit
                        }

                        sweetAlert.clickConfirm();
                        e.preventDefault();
                    }

                    // TAB
                } else if (e.key === 'Tab') {
                    var targetElement = e.target || e.srcElement;

                    var focusableElements = getFocusableElements(params.focusCancel);
                    var btnIndex = -1; // Find the button - note, this is a nodelist, not an array.
                    for (var _i4 = 0; _i4 < focusableElements.length; _i4++) {
                        if (targetElement === focusableElements[_i4]) {
                            btnIndex = _i4;
                            break;
                        }
                    }

                    if (!e.shiftKey) {
                        // Cycle to the next button
                        setFocus(btnIndex, 1);
                    } else {
                        // Cycle to the prev button
                        setFocus(btnIndex, -1);
                    }
                    e.stopPropagation();
                    e.preventDefault();

                    // ARROWS - switch focus between buttons
                } else if (arrowKeys.indexOf(e.key) !== -1) {
                    // focus Cancel button if Confirm button is currently focused
                    if (document.activeElement === confirmButton && isVisible(cancelButton)) {
                        cancelButton.focus();
                        // and vice versa
                    } else if (document.activeElement === cancelButton && isVisible(confirmButton)) {
                        confirmButton.focus();
                    }

                    // ESC
                } else if ((e.key === 'Escape' || e.key === 'Esc') && callIfFunction(params.allowEscapeKey) === true) {
                    dismissWith('esc');
                }
            };

            if (params.toast && windowOnkeydownOverridden) {
                window.onkeydown = previousWindowKeyDown;
                windowOnkeydownOverridden = false;
            }

            if (!params.toast && !windowOnkeydownOverridden) {
                previousWindowKeyDown = window.onkeydown;
                windowOnkeydownOverridden = true;
                window.onkeydown = handleKeyDown;
            }

            // Loading state
            if (params.buttonsStyling) {
                confirmButton.style.borderLeftColor = params.confirmButtonColor;
                confirmButton.style.borderRightColor = params.confirmButtonColor;
            }

            /**
             * Show spinner instead of Confirm button and disable Cancel button
             */
            sweetAlert.hideLoading = sweetAlert.disableLoading = function () {
                if (!params.showConfirmButton) {
                    hide(confirmButton);
                    if (!params.showCancelButton) {
                        hide(getActions());
                    }
                }
                removeClass([popup, actions], swalClasses.loading);
                popup.removeAttribute('aria-busy');
                popup.removeAttribute('data-loading');
                confirmButton.disabled = false;
                cancelButton.disabled = false;
            };

            sweetAlert.getTitle = function () {
                return getTitle();
            };
            sweetAlert.getContent = function () {
                return getContent();
            };
            sweetAlert.getInput = function () {
                return getInput();
            };
            sweetAlert.getImage = function () {
                return getImage();
            };
            sweetAlert.getButtonsWrapper = function () {
                return getButtonsWrapper();
            };
            sweetAlert.getActions = function () {
                return getActions();
            };
            sweetAlert.getConfirmButton = function () {
                return getConfirmButton();
            };
            sweetAlert.getCancelButton = function () {
                return getCancelButton();
            };
            sweetAlert.isLoading = function () {
                return isLoading();
            };

            sweetAlert.enableButtons = function () {
                confirmButton.disabled = false;
                cancelButton.disabled = false;
            };

            sweetAlert.disableButtons = function () {
                confirmButton.disabled = true;
                cancelButton.disabled = true;
            };

            sweetAlert.enableConfirmButton = function () {
                confirmButton.disabled = false;
            };

            sweetAlert.disableConfirmButton = function () {
                confirmButton.disabled = true;
            };

            sweetAlert.enableInput = function () {
                var input = getInput();
                if (!input) {
                    return false;
                }
                if (input.type === 'radio') {
                    var radiosContainer = input.parentNode.parentNode;
                    var radios = radiosContainer.querySelectorAll('input');
                    for (var _i5 = 0; _i5 < radios.length; _i5++) {
                        radios[_i5].disabled = false;
                    }
                } else {
                    input.disabled = false;
                }
            };

            sweetAlert.disableInput = function () {
                var input = getInput();
                if (!input) {
                    return false;
                }
                if (input && input.type === 'radio') {
                    var radiosContainer = input.parentNode.parentNode;
                    var radios = radiosContainer.querySelectorAll('input');
                    for (var _i6 = 0; _i6 < radios.length; _i6++) {
                        radios[_i6].disabled = true;
                    }
                } else {
                    input.disabled = true;
                }
            };

            // Show block with validation error
            sweetAlert.showValidationError = function (error$$1) {
                var validationError = getValidationError();
                validationError.innerHTML = error$$1;
                var popupComputedStyle = window.getComputedStyle(popup);
                validationError.style.marginLeft = '-' + popupComputedStyle.getPropertyValue('padding-left');
                validationError.style.marginRight = '-' + popupComputedStyle.getPropertyValue('padding-right');
                show(validationError);

                var input = getInput();
                if (input) {
                    input.setAttribute('aria-invalid', true);
                    input.setAttribute('aria-describedBy', swalClasses.validationerror);
                    focusInput(input);
                    addClass(input, swalClasses.inputerror);
                }
            };

            // Hide block with validation error
            sweetAlert.resetValidationError = function () {
                var validationError = getValidationError();
                hide(validationError);

                var input = getInput();
                if (input) {
                    input.removeAttribute('aria-invalid');
                    input.removeAttribute('aria-describedBy');
                    removeClass(input, swalClasses.inputerror);
                }
            };

            sweetAlert.getProgressSteps = function () {
                return params.progressSteps;
            };

            sweetAlert.setProgressSteps = function (progressSteps) {
                params.progressSteps = progressSteps;
                setParameters(params);
            };

            sweetAlert.showProgressSteps = function () {
                show(getProgressSteps());
            };

            sweetAlert.hideProgressSteps = function () {
                hide(getProgressSteps());
            };

            sweetAlert.enableButtons();
            sweetAlert.hideLoading();
            sweetAlert.resetValidationError();

            if (params.input) {
                addClass(document.body, swalClasses['has-input']);
            }

            // inputs
            var inputTypes = ['input', 'file', 'range', 'select', 'radio', 'checkbox', 'textarea'];
            var input = void 0;
            for (var _i7 = 0; _i7 < inputTypes.length; _i7++) {
                var inputClass = swalClasses[inputTypes[_i7]];
                var inputContainer = getChildByClass(content, inputClass);
                input = getInput(inputTypes[_i7]);

                // set attributes
                if (input) {
                    for (var j in input.attributes) {
                        if (input.attributes.hasOwnProperty(j)) {
                            var attrName = input.attributes[j].name;
                            if (attrName !== 'type' && attrName !== 'value') {
                                input.removeAttribute(attrName);
                            }
                        }
                    }
                    for (var attr in params.inputAttributes) {
                        input.setAttribute(attr, params.inputAttributes[attr]);
                    }
                }

                // set class
                inputContainer.className = inputClass;
                if (params.inputClass) {
                    addClass(inputContainer, params.inputClass);
                }

                hide(inputContainer);
            }

            var populateInputOptions = void 0;
            switch (params.input) {
                case 'text':
                case 'email':
                case 'password':
                case 'number':
                case 'tel':
                case 'url':
                    input = getChildByClass(content, swalClasses.input);
                    input.value = params.inputValue;
                    input.placeholder = params.inputPlaceholder;
                    input.type = params.input;
                    show(input);
                    break;
                case 'file':
                    input = getChildByClass(content, swalClasses.file);
                    input.placeholder = params.inputPlaceholder;
                    input.type = params.input;
                    show(input);
                    break;
                case 'range':
                    var range = getChildByClass(content, swalClasses.range);
                    var rangeInput = range.querySelector('input');
                    var rangeOutput = range.querySelector('output');
                    rangeInput.value = params.inputValue;
                    rangeInput.type = params.input;
                    rangeOutput.value = params.inputValue;
                    show(range);
                    break;
                case 'select':
                    var select = getChildByClass(content, swalClasses.select);
                    select.innerHTML = '';
                    if (params.inputPlaceholder) {
                        var placeholder = document.createElement('option');
                        placeholder.innerHTML = params.inputPlaceholder;
                        placeholder.value = '';
                        placeholder.disabled = true;
                        placeholder.selected = true;
                        select.appendChild(placeholder);
                    }
                    populateInputOptions = function populateInputOptions(inputOptions) {
                        for (var optionValue in inputOptions) {
                            var option = document.createElement('option');
                            option.value = optionValue;
                            option.innerHTML = inputOptions[optionValue];
                            if (params.inputValue.toString() === optionValue) {
                                option.selected = true;
                            }
                            select.appendChild(option);
                        }
                        show(select);
                        select.focus();
                    };
                    break;
                case 'radio':
                    var radio = getChildByClass(content, swalClasses.radio);
                    radio.innerHTML = '';
                    populateInputOptions = function populateInputOptions(inputOptions) {
                        for (var radioValue in inputOptions) {
                            var radioInput = document.createElement('input');
                            var radioLabel = document.createElement('label');
                            var radioLabelSpan = document.createElement('span');
                            radioInput.type = 'radio';
                            radioInput.name = swalClasses.radio;
                            radioInput.value = radioValue;
                            if (params.inputValue.toString() === radioValue) {
                                radioInput.checked = true;
                            }
                            radioLabelSpan.innerHTML = inputOptions[radioValue];
                            radioLabel.appendChild(radioInput);
                            radioLabel.appendChild(radioLabelSpan);
                            radioLabel.for = radioInput.id;
                            radio.appendChild(radioLabel);
                        }
                        show(radio);
                        var radios = radio.querySelectorAll('input');
                        if (radios.length) {
                            radios[0].focus();
                        }
                    };
                    break;
                case 'checkbox':
                    var checkbox = getChildByClass(content, swalClasses.checkbox);
                    var checkboxInput = getInput('checkbox');
                    checkboxInput.type = 'checkbox';
                    checkboxInput.value = 1;
                    checkboxInput.id = swalClasses.checkbox;
                    checkboxInput.checked = Boolean(params.inputValue);
                    var label = checkbox.getElementsByTagName('span');
                    if (label.length) {
                        checkbox.removeChild(label[0]);
                    }
                    label = document.createElement('span');
                    label.innerHTML = params.inputPlaceholder;
                    checkbox.appendChild(label);
                    show(checkbox);
                    break;
                case 'textarea':
                    var textarea = getChildByClass(content, swalClasses.textarea);
                    textarea.value = params.inputValue;
                    textarea.placeholder = params.inputPlaceholder;
                    show(textarea);
                    break;
                case null:
                    break;
                default:
                    error('Unexpected type of input! Expected "text", "email", "password", "number", "tel", "select", "radio", "checkbox", "textarea", "file" or "url", got "' + params.input + '"');
                    break;
            }

            if (params.input === 'select' || params.input === 'radio') {
                if (params.inputOptions instanceof Promise) {
                    sweetAlert.showLoading();
                    params.inputOptions.then(function (inputOptions) {
                        sweetAlert.hideLoading();
                        populateInputOptions(inputOptions);
                    });
                } else if (_typeof(params.inputOptions) === 'object') {
                    populateInputOptions(params.inputOptions);
                } else {
                    error('Unexpected type of inputOptions! Expected object or Promise, got ' + _typeof(params.inputOptions));
                }
            }

            openPopup(params.animation, params.onBeforeOpen, params.onOpen);

            if (!params.toast) {
                if (!callIfFunction(params.allowEnterKey)) {
                    if (document.activeElement) {
                        document.activeElement.blur();
                    }
                } else if (params.focusCancel && isVisible(cancelButton)) {
                    cancelButton.focus();
                } else if (params.focusConfirm && isVisible(confirmButton)) {
                    confirmButton.focus();
                } else {
                    setFocus(-1, 1);
                }
            }

            // fix scroll
            getContainer().scrollTop = 0;
        });
    };

    /*
     * Global function to determine if swal2 popup is shown
     */
    sweetAlert$1.isVisible = function () {
        return !!getPopup();
    };

    /*
     * Global function for chaining sweetAlert popups
     */
    sweetAlert$1.queue = function (steps) {
        queue = steps;
        var resetQueue = function resetQueue() {
            queue = [];
            document.body.removeAttribute('data-swal2-queue-step');
        };
        var queueResult = [];
        return new Promise(function (resolve, reject) {
            (function step(i, callback) {
                if (i < queue.length) {
                    document.body.setAttribute('data-swal2-queue-step', i);

                    sweetAlert$1(queue[i]).then(function (result) {
                        if (typeof result.value !== 'undefined') {
                            queueResult.push(result.value);
                            step(i + 1, callback);
                        } else {
                            resetQueue();
                            resolve({ dismiss: result.dismiss });
                        }
                    });
                } else {
                    resetQueue();
                    resolve({ value: queueResult });
                }
            })(0);
        });
    };

    /*
     * Global function for getting the index of current popup in queue
     */
    sweetAlert$1.getQueueStep = function () {
        return document.body.getAttribute('data-swal2-queue-step');
    };

    /*
     * Global function for inserting a popup to the queue
     */
    sweetAlert$1.insertQueueStep = function (step, index) {
        if (index && index < queue.length) {
            return queue.splice(index, 0, step);
        }
        return queue.push(step);
    };

    /*
     * Global function for deleting a popup from the queue
     */
    sweetAlert$1.deleteQueueStep = function (index) {
        if (typeof queue[index] !== 'undefined') {
            queue.splice(index, 1);
        }
    };

    /*
     * Global function to close sweetAlert
     */
    sweetAlert$1.close = sweetAlert$1.closePopup = sweetAlert$1.closeModal = sweetAlert$1.closeToast = function (onComplete) {
        var container = getContainer();
        var popup = getPopup();
        if (!popup) {
            return;
        }
        removeClass(popup, swalClasses.show);
        addClass(popup, swalClasses.hide);
        clearTimeout(popup.timeout);

        if (!isToast()) {
            resetPrevState();
            window.onkeydown = previousWindowKeyDown;
            windowOnkeydownOverridden = false;
        }

        var removePopupAndResetState = function removePopupAndResetState() {
            if (container.parentNode) {
                container.parentNode.removeChild(container);
            }
            removeClass([document.documentElement, document.body], [swalClasses.shown, swalClasses['no-backdrop'], swalClasses['has-input'], swalClasses['toast-shown']]);

            if (isModal()) {
                undoScrollbar();
                undoIOSfix();
            }
        };

        // If animation is supported, animate
        if (animationEndEvent && !hasClass(popup, swalClasses.noanimation)) {
            popup.addEventListener(animationEndEvent, function swalCloseEventFinished() {
                popup.removeEventListener(animationEndEvent, swalCloseEventFinished);
                if (hasClass(popup, swalClasses.hide)) {
                    removePopupAndResetState();
                }
            });
        } else {
            // Otherwise, remove immediately
            removePopupAndResetState();
        }
        if (onComplete !== null && typeof onComplete === 'function') {
            setTimeout(function () {
                onComplete(popup);
            });
        }
    };

    /*
     * Global function to click 'Confirm' button
     */
    sweetAlert$1.clickConfirm = function () {
        return getConfirmButton().click();
    };

    /*
     * Global function to click 'Cancel' button
     */
    sweetAlert$1.clickCancel = function () {
        return getCancelButton().click();
    };

    /**
     * Show spinner instead of Confirm button and disable Cancel button
     */
    sweetAlert$1.showLoading = sweetAlert$1.enableLoading = function () {
        var popup = getPopup();
        if (!popup) {
            sweetAlert$1('');
        }
        popup = getPopup();
        var actions = getActions();
        var confirmButton = getConfirmButton();
        var cancelButton = getCancelButton();

        show(actions);
        show(confirmButton, 'inline-block');
        addClass([popup, actions], swalClasses.loading);
        confirmButton.disabled = true;
        cancelButton.disabled = true;

        popup.setAttribute('data-loading', true);
        popup.setAttribute('aria-busy', true);
        popup.focus();
    };

    /**
     * Is valid parameter
     * @param {String} paramName
     */
    sweetAlert$1.isValidParameter = function (paramName) {
        return defaultParams.hasOwnProperty(paramName) || paramName === 'extraParams';
    };

    /**
     * Is deprecated parameter
     * @param {String} paramName
     */
    sweetAlert$1.isDeprecatedParameter = function (paramName) {
        return deprecatedParams.indexOf(paramName) !== -1;
    };

    /**
     * Set default params for each popup
     * @param {Object} userParams
     */
    sweetAlert$1.setDefaults = function (userParams) {
        if (!userParams || (typeof userParams === 'undefined' ? 'undefined' : _typeof(userParams)) !== 'object') {
            return error('the argument for setDefaults() is required and has to be a object');
        }

        showWarningsForParams(userParams);

        // assign valid params from userParams to popupParams
        for (var param in userParams) {
            if (sweetAlert$1.isValidParameter(param)) {
                popupParams[param] = userParams[param];
            }
        }
    };

    /**
     * Reset default params for each popup
     */
    sweetAlert$1.resetDefaults = function () {
        popupParams = _extends({}, defaultParams);
    };

    /**
     * Adapt a legacy inputValidator for use with expectRejections=false
     */
    sweetAlert$1.adaptInputValidator = function (legacyValidator) {
        return function adaptedInputValidator(inputValue, extraParams) {
            return legacyValidator.call(this, inputValue, extraParams).then(function () {
                return undefined;
            }, function (validationError) {
                return validationError;
            });
        };
    };

    sweetAlert$1.noop = function () { };

    sweetAlert$1.version = '7.6.2';

    sweetAlert$1.default = sweetAlert$1;

    /**
     * Set default params if `window._swalDefaults` is an object
     */
    if (typeof window !== 'undefined' && _typeof(window._swalDefaults) === 'object') {
        sweetAlert$1.setDefaults(window._swalDefaults);
    }

    // Remember state in cases where opening and handling a modal will fiddle with it.
    var states = {
        previousActiveElement: null,
        previousBodyPadding: null

        // Detect Node env
    }; var isNodeEnv = function isNodeEnv() {
        return typeof window === 'undefined' || typeof document === 'undefined';
    };

    /*
     * Add modal + overlay to DOM
     */
    var init = function init(params) {
        // Clean up the old popup if it exists
        var c = getContainer();
        if (c) {
            c.parentNode.removeChild(c);
            removeClass([document.documentElement, document.body], [swalClasses['no-backdrop'], swalClasses['has-input'], swalClasses['toast-shown']]);
        }

        if (isNodeEnv()) {
            error('SweetAlert2 requires document to initialize');
            return;
        }

        var container = document.createElement('div');
        container.className = swalClasses.container;
        container.innerHTML = sweetHTML;

        var targetElement = typeof params.target === 'string' ? document.querySelector(params.target) : params.target;
        targetElement.appendChild(container);

        var popup = getPopup();
        var content = getContent();
        var input = getChildByClass(content, swalClasses.input);
        var file = getChildByClass(content, swalClasses.file);
        var range = content.querySelector('.' + swalClasses.range + ' input');
        var rangeOutput = content.querySelector('.' + swalClasses.range + ' output');
        var select = getChildByClass(content, swalClasses.select);
        var checkbox = content.querySelector('.' + swalClasses.checkbox + ' input');
        var textarea = getChildByClass(content, swalClasses.textarea);

        // a11y
        popup.setAttribute('aria-live', params.toast ? 'polite' : 'assertive');

        var resetValidationError = function resetValidationError() {
            sweetAlert$1.isVisible() && sweetAlert$1.resetValidationError();
        };

        input.oninput = resetValidationError;
        file.onchange = resetValidationError;
        select.onchange = resetValidationError;
        checkbox.onchange = resetValidationError;
        textarea.oninput = resetValidationError;

        range.oninput = function () {
            resetValidationError();
            rangeOutput.value = range.value;
        };

        range.onchange = function () {
            resetValidationError();
            range.previousSibling.value = range.value;
        };

        return popup;
    };

    /*
     * Manipulate DOM
     */

    var sweetHTML = ('\n <div role="dialog" aria-modal="true" aria-labelledby="' + swalClasses.title + '" aria-describedby="' + swalClasses.content + '" class="' + swalClasses.popup + '" tabindex="-1">\n   <div class="' + swalClasses.header + '">\n     <ul class="' + swalClasses.progresssteps + '"></ul>\n     <div class="' + swalClasses.icon + ' ' + iconTypes.error + '">\n       <span class="swal2-x-mark"><span class="swal2-x-mark-line-left"></span><span class="swal2-x-mark-line-right"></span></span>\n     </div>\n     <div class="' + swalClasses.icon + ' ' + iconTypes.question + '">?</div>\n     <div class="' + swalClasses.icon + ' ' + iconTypes.warning + '">!</div>\n     <div class="' + swalClasses.icon + ' ' + iconTypes.info + '">i</div>\n     <div class="' + swalClasses.icon + ' ' + iconTypes.success + '">\n       <div class="swal2-success-circular-line-left"></div>\n       <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>\n       <div class="swal2-success-ring"></div> <div class="swal2-success-fix"></div>\n       <div class="swal2-success-circular-line-right"></div>\n     </div>\n     <img class="' + swalClasses.image + '" />\n     <h2 class="' + swalClasses.title + '" id="' + swalClasses.title + '"></h2>\n     <button type="button" class="' + swalClasses.close + '">\xD7</button>\n   </div>\n   <div class="' + swalClasses.content + '">\n     <div id="' + swalClasses.content + '"></div>\n     <input class="' + swalClasses.input + '" />\n     <input type="file" class="' + swalClasses.file + '" />\n     <div class="' + swalClasses.range + '">\n       <input type="range" />\n       <output></output>\n     </div>\n     <select class="' + swalClasses.select + '"></select>\n     <div class="' + swalClasses.radio + '"></div>\n     <label for="' + swalClasses.checkbox + '" class="' + swalClasses.checkbox + '">\n       <input type="checkbox" />\n     </label>\n     <textarea class="' + swalClasses.textarea + '"></textarea>\n     <div class="' + swalClasses.validationerror + '" id="' + swalClasses.validationerror + '"></div>\n   </div>\n   <div class="' + swalClasses.actions + '">\n     <button type="button" class="' + swalClasses.confirm + '">OK</button>\n     <button type="button" class="' + swalClasses.cancel + '">Cancel</button>\n   </div>\n </div>\n').replace(/(^|\n)\s*/g, '');

    var getContainer = function getContainer() {
        return document.body.querySelector('.' + swalClasses.container);
    };

    var getPopup = function getPopup() {
        return getContainer() ? getContainer().querySelector('.' + swalClasses.popup) : null;
    };

    var getIcons = function getIcons() {
        var popup = getPopup();
        return popup.querySelectorAll('.' + swalClasses.icon);
    };

    var elementByClass = function elementByClass(className) {
        return getContainer() ? getContainer().querySelector('.' + className) : null;
    };

    var getTitle = function getTitle() {
        return elementByClass(swalClasses.title);
    };

    var getContent = function getContent() {
        return elementByClass(swalClasses.content);
    };

    var getImage = function getImage() {
        return elementByClass(swalClasses.image);
    };

    var getProgressSteps = function getProgressSteps() {
        return elementByClass(swalClasses.progresssteps);
    };

    var getValidationError = function getValidationError() {
        return elementByClass(swalClasses.validationerror);
    };

    var getConfirmButton = function getConfirmButton() {
        return elementByClass(swalClasses.confirm);
    };

    var getCancelButton = function getCancelButton() {
        return elementByClass(swalClasses.cancel);
    };

    var getButtonsWrapper = function getButtonsWrapper() {
        warnOnce('swal.getButtonsWrapper() is deprecated and will be removed in the next major release, use swal.getActions() instead');
        return elementByClass(swalClasses.actions);
    };

    var getActions = function getActions() {
        return elementByClass(swalClasses.actions);
    };

    var getCloseButton = function getCloseButton() {
        return elementByClass(swalClasses.close);
    };

    var getFocusableElements = function getFocusableElements() {
        var focusableElementsWithTabindex = Array.prototype.slice.call(getPopup().querySelectorAll('[tabindex]:not([tabindex="-1"]):not([tabindex="0"])'))
        // sort according to tabindex
        .sort(function (a, b) {
            a = parseInt(a.getAttribute('tabindex'));
            b = parseInt(b.getAttribute('tabindex'));
            if (a > b) {
                return 1;
            } else if (a < b) {
                return -1;
            }
            return 0;
        });

        var otherFocusableElements = Array.prototype.slice.call(getPopup().querySelectorAll('button, input:not([type=hidden]), textarea, select, a, [tabindex="0"]'));

        return uniqueArray(focusableElementsWithTabindex.concat(otherFocusableElements));
    };

    var isModal = function isModal() {
        return !document.body.classList.contains(swalClasses['toast-shown']);
    };

    var isToast = function isToast() {
        return document.body.classList.contains(swalClasses['toast-shown']);
    };

    var isLoading = function isLoading() {
        return getPopup().hasAttribute('data-loading');
    };

    var hasClass = function hasClass(elem, className) {
        if (elem.classList) {
            return elem.classList.contains(className);
        }
        return false;
    };

    var focusInput = function focusInput(input) {
        input.focus();

        // place cursor at end of text in text input
        if (input.type !== 'file') {
            // http://stackoverflow.com/a/2345915/1331425
            var val = input.value;
            input.value = '';
            input.value = val;
        }
    };

    var addOrRemoveClass = function addOrRemoveClass(target, classList, add) {
        if (!target || !classList) {
            return;
        }
        if (typeof classList === 'string') {
            classList = classList.split(/\s+/).filter(Boolean);
        }
        classList.forEach(function (className) {
            if (target.forEach) {
                target.forEach(function (elem) {
                    add ? elem.classList.add(className) : elem.classList.remove(className);
                });
            } else {
                add ? target.classList.add(className) : target.classList.remove(className);
            }
        });
    };

    var addClass = function addClass(target, classList) {
        addOrRemoveClass(target, classList, true);
    };

    var removeClass = function removeClass(target, classList) {
        addOrRemoveClass(target, classList, false);
    };

    var getChildByClass = function getChildByClass(elem, className) {
        for (var i = 0; i < elem.childNodes.length; i++) {
            if (hasClass(elem.childNodes[i], className)) {
                return elem.childNodes[i];
            }
        }
    };

    var show = function show(elem, display) {
        if (!display) {
            display = elem.id === swalClasses.content ? 'block' : 'flex';
        }
        elem.style.opacity = '';
        elem.style.display = display;
    };

    var hide = function hide(elem) {
        elem.style.opacity = '';
        elem.style.display = 'none';
    };

    var empty = function empty(elem) {
        while (elem.firstChild) {
            elem.removeChild(elem.firstChild);
        }
    };

    // borrowed from jquery $(elem).is(':visible') implementation
    var isVisible = function isVisible(elem) {
        return elem && (elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
    };

    var removeStyleProperty = function removeStyleProperty(elem, property) {
        if (elem.style.removeProperty) {
            elem.style.removeProperty(property);
        } else {
            elem.style.removeAttribute(property);
        }
    };

    var animationEndEvent = function () {
        // Prevent run in Node env
        if (isNodeEnv()) {
            return false;
        }

        var testEl = document.createElement('div');
        var transEndEventNames = {
            'WebkitAnimation': 'webkitAnimationEnd',
            'OAnimation': 'oAnimationEnd oanimationend',
            'animation': 'animationend'
        };
        for (var i in transEndEventNames) {
            if (transEndEventNames.hasOwnProperty(i) && typeof testEl.style[i] !== 'undefined') {
                return transEndEventNames[i];
            }
        }

        return false;
    }();

    // Reset previous window keydown handler and focued element
    var resetPrevState = function resetPrevState() {
        if (states.previousActiveElement && states.previousActiveElement.focus) {
            var x = window.scrollX;
            var y = window.scrollY;
            states.previousActiveElement.focus();
            if (typeof x !== 'undefined' && typeof y !== 'undefined') {
                // IE doesn't have scrollX/scrollY support
                window.scrollTo(x, y);
            }
        }
    };

    // Measure width of scrollbar
    // https://github.com/twbs/bootstrap/blob/master/js/modal.js#L279-L286
    var measureScrollbar = function measureScrollbar() {
        var supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;
        if (supportsTouch) {
            return 0;
        }
        var scrollDiv = document.createElement('div');
        scrollDiv.style.width = '50px';
        scrollDiv.style.height = '50px';
        scrollDiv.style.overflow = 'scroll';
        document.body.appendChild(scrollDiv);
        var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        document.body.removeChild(scrollDiv);
        return scrollbarWidth;
    };

    /**
     * Inject a string of CSS into the page header
     *
     * @param {String} css
     */
    var injectCSS = function injectCSS() {
        var css = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

        // Prevent run in Node env
        if (isNodeEnv()) {
            return false;
        }

        var head = document.head || document.getElementsByTagName('head')[0];
        var style = document.createElement('style');
        style.type = 'text/css';
        head.appendChild(style);

        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
    };

    injectCSS(styles);

    return sweetAlert$1;

})));
if (typeof window !== 'undefined' && window.Sweetalert2) window.sweetAlert = window.swal = window.Sweetalert2;