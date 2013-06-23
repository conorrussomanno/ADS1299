/* 
 * Cross-browser event handling, by Scott Andrew
 */
function addEvent(element, eventType, lamdaFunction, useCapture) {
    if (element.addEventListener) {
        element.addEventListener(eventType, lamdaFunction, useCapture);
        return true;
    } else if (element.attachEvent) {
        var r = element.attachEvent('on' + eventType, lamdaFunction);
        return r;
    } else {
        return false;
    }
}

/* 
 * Kills an event's propagation and default action
 */
function knackerEvent(eventObject) {
    if (eventObject && eventObject.stopPropagation) {
        eventObject.stopPropagation();
    }
    if (window.event && window.event.cancelBubble ) {
        window.event.cancelBubble = true;
    }
    
    if (eventObject && eventObject.preventDefault) {
        eventObject.preventDefault();
    }
    if (window.event) {
        window.event.returnValue = false;
    }
}

/* 
 * Safari doesn't support canceling events in the standard way, so we must
 * hard-code a return of false for it to work.
 */
function cancelEventSafari() {
    return false;        
}

/* 
 * Cross-browser style extraction, from the JavaScript & DHTML Cookbook
 * <http://www.oreillynet.com/pub/a/javascript/excerpt/JSDHTMLCkbk_chap5/index5.html>
 */
function getElementStyle(elementID, CssStyleProperty) {
    var element = document.getElementById(elementID);
    if (element.currentStyle) {
        return element.currentStyle[toCamelCase(CssStyleProperty)];
    } else if (window.getComputedStyle) {
        var compStyle = window.getComputedStyle(element, '');
        return compStyle.getPropertyValue(CssStyleProperty);
    } else {
        return '';
    }
}

/* 
 * CamelCases CSS property names. Useful in conjunction with 'getElementStyle()'
 * From <http://dhtmlkitchen.com/learn/js/setstyle/index4.jsp>
 */
function toCamelCase(CssProperty) {
    var stringArray = CssProperty.toLowerCase().split('-');
    if (stringArray.length == 1) {
        return stringArray[0];
    }
    var ret = (CssProperty.indexOf("-") == 0)
              ? stringArray[0].charAt(0).toUpperCase() + stringArray[0].substring(1)
              : stringArray[0];
    for (var i = 1; i < stringArray.length; i++) {
        var s = stringArray[i];
        ret += s.charAt(0).toUpperCase() + s.substring(1);
    }
    return ret;
}

/*
 * Disables all 'test' links, that point to the href '#', by Ross Shannon
 */
function disableTestLinks() {
  var pageLinks = document.getElementsByTagName('a');
  for (var i=0; i<pageLinks.length; i++) {
    if (pageLinks[i].href.match(/[^#]#$/)) {
      addEvent(pageLinks[i], 'click', knackerEvent, false);
    }
  }
}

/* 
 * Cookie functions
 */
function createCookie(name, value, days) {
    var expires = '';
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        var expires = '; expires=' + date.toGMTString();
    }
    document.cookie = name + '=' + value + expires + '; path=/';
}

function readCookie(name) {
    var cookieCrumbs = document.cookie.split(';');
    var nameToFind = name + '=';
    for (var i = 0; i < cookieCrumbs.length; i++) {
        var crumb = cookieCrumbs[i];
        while (crumb.charAt(0) == ' ') {
            crumb = crumb.substring(1, crumb.length); /* delete spaces */
        }
        if (crumb.indexOf(nameToFind) == 0) {
            return crumb.substring(nameToFind.length, crumb.length);
        }
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, '', -1);
}

/**************************************************************************/

/*
 * Clear Default Text: functions for clearing and replacing default text in
 * <input> elements.
 *
 * by Ross Shannon, http://www.yourhtmlsource.com/
 */

addEvent(window, 'load', init, false);

function init() {
    var formInputs = document.getElementsByTagName('input');
    for (var i = 0; i < formInputs.length; i++) {
        var theInput = formInputs[i];
        
        if (theInput.type == 'text' && theInput.className.match(/\bcleardefault\b/)) {  
            /* Add event handlers */          
            addEvent(theInput, 'focus', clearDefaultText, false);
            addEvent(theInput, 'blur', replaceDefaultText, false);
            
            /* Save the current value */
            if (theInput.value != '') {
                theInput.defaultText = theInput.value;
            }
        }
    }
}

function clearDefaultText(e) {
    var target = window.event ? window.event.srcElement : e ? e.target : null;
    if (!target) return;
    
    if (target.value == target.defaultText) {
        target.value = '';
    }
}

function replaceDefaultText(e) {
    var target = window.event ? window.event.srcElement : e ? e.target : null;
    if (!target) return;
    
    if (target.value == '' && target.defaultText) {
        target.value = target.defaultText;
    }
}


// <script>

// Copyright (C) 2005 Ilya S. Lyubinskiy. All rights reserved.
// Technical support: http://www.php-development.ru/
//
// YOU MAY NOT
// (1) Remove or modify this copyright notice.
// (2) Distribute this code, any part or any modified version of it.
//     Instead, you can link to the homepage of this code:
//     http://www.php-development.ru/javascripts/form-validation.php.
//
// YOU MAY
// (1) Use this code on your website.
// (2) Use this code as a part of another product provided that
//     its main use is not html form processing.
//
// NO WARRANTY
// This code is provided "as is" without warranty of any kind, either
// expressed or implied, including, but not limited to, the implied warranties
// of merchantability and fitness for a particular purpose. You expressly
// acknowledge and agree that use of this code is at your own risk.


function display(x)
{
  win = window.open();
  for (var i in x) win.document.write(i+' = '+x[i]+'<br>');
}

// ***** Data Arrays ***********************************************************

// ***** Options *****

var form_validation_options =
  {
    "override_enter"    : true,
    "override_bksp"     : true
  };


// ***** Messages *****

var form_validation_alerts =
  {
    '>'      : "%%Name%% should be more than %%num%%!",
    '<'      : "%%Name%% should be less than %%num%%!",
    '>='     : "%%Name%% should be more or equal to %%num%%!",
    '<='     : "%%Name%% should be less or equal to %%num%%!",
    'ch'     : "%%Name%% contains invalid characters!",
    'chnum_' : "%%Name%% contains invalid characters!",
    'cnt >'  : "You should select more than %%num%% %%name%%!",
    'cnt <'  : "You should select less than %%num%% %%name%%!",
    'cnt >=' : "You should select at least %%num%% %%name%%!",
    'cnt <=' : "You should select at most %%num%% %%name%%!",
    'cnt ==' : "You should select %%num%% %%name%%!",
    'date'   : "Please, enter a valid %%name%%!",
    'email'  : "Please, enter a valid e-mail address!",
    'empty'  : "Please, enter %%name%%!",
    'len >'  : "%%Name%% should contain more than %%num%% characters!",
    'len <'  : "%%Name%% should contain less than %%num%% characters!",
    'len >=' : "%%Name%% should contain at least %%num%% characters!",
    'len <=' : "%%Name%% should contain at most %%num%% characters!",
    'len ==' : "%%Name%% should contain %%num%% characters!",
    'num'    : "%%Name%% is not a valid number!",
    'radio'  : "Please, select %%name%%!",
    'select' : "Please, select %%name%%!",
    'terms'  : "You must agree to the terms first!"
  };

// ***** Form field types *****

var form_validation_nonedit = ' button hidden reset submit ';
var form_validation_edit    = ' checkbox file password radio select select-multiple select-one text textarea ';
var form_validation_type    = ' file password text textarea ';
var form_validation_check   = ' checkbox radiox select select-multiple select-one ';


// ***** Alert *****************************************************************

function form_validation_alert(type, name, num)
{
  name = name.replace(/^\W*(\w*)\W*$/, "$1");

  msg = form_validation_alerts[type];
  msg = msg.replace('%%Name%%', name.substr(0, 1).toUpperCase()+name.substr(1, name.length-1).toLowerCase());
  msg = msg.replace('%%name%%', name.toLowerCase());
  msg = msg.replace('%%num%%', num);

  alert(msg);

  return false;
}


// ***** Behave ****************************************************************

function form_validation_behave(control, key, rules)
{
  rules = form_validation_rules2array(rules);

  for (var i = 0; i < rules.length; i++)
  {
    var rule = rules[i].split(/\s*:\s*/);

    if (rule.length < 2) continue;
    if (!form_validation_instring(' '+rule[0]+' ', control.name)) continue;

    rule[1] = rule[1].split(/\s+/);

    switch (rule[1][0])
    {
      // ***** count *****

      case 'count':
        document.getElementById(rule[1][1]).innerHTML = control.value.length;
        if (rule[1].length >= 5)
          if (control.value.length < rule[1][2])
               document.getElementById(rule[1][1]).style.color = rule[1][3];
          else document.getElementById(rule[1][1]).style.color = rule[1][4];
        break;

      // ***** next *****

      case 'next':
        if (control.value.length == rule[1][1]) form_validation_focusNext(control);
        break;

      // ***** prev *****

      case 'prev':
        if (control.value.length == 0 && key == 8) form_validation_focusPrev(control);
        break;
    }
  }

  return true;
}


// ***** getElement ************************************************************

function form_validation_getElement(tag, name)
{
  for (var i = 0; i < tag.elements.length; i++)
    if (tag.elements[i].name == name) return tag.elements[i];
  return undefined;
}


// ***** inString **************************************************************

function form_validation_instring(str, val)
{
  return str.indexOf(' '+val+' ') >= 0;
}


// ***** focusNext *************************************************************

function form_validation_focusNext(tag)
{
  for (var i = 0; i < tag.form.elements.length; i++)
    if (tag.form.elements[i] == tag)
      for (var j = i+1; j < tag.form.elements.length; j++)
        if (form_validation_instring(form_validation_edit, tag.form.elements[j].type))
        {
          if (form_validation_instring(form_validation_type, tag.form.elements[j].type))
               form_validation_setSelection(tag.form.elements[j], 0, 0, 'frEnd');
          else tag.form.elements[j].focus();
          return false;
        }

  return true;
}


// ***** focusPrev *************************************************************

function form_validation_focusPrev(tag)
{
  for (var i = 0; i < tag.form.elements.length; i++)
    if (tag.form.elements[i] == tag)
      for (var j = i-1; j >= 0; j--)
        if (form_validation_instring(form_validation_edit, tag.form.elements[j].type))
        {
          if (form_validation_instring(form_validation_type, tag.form.elements[j].type))
               form_validation_setSelection(tag.form.elements[j], 0, 0, 'frEnd');
          else tag.form.elements[j].focus();
          return false;
        }

  return true;
}


// ***** Initialize ************************************************************

function form_validation_initialize(control, rules)
{
  rules = form_validation_rules2array(rules);

  for (var i = 0; i < rules.length; i++)
  {
    var rule = rules[i].split(/\s*:\s*/);

    if (rule.length < 2) continue;
    if (!form_validation_instring(' '+rule[0]+' ', control.name)) continue;

    rule[1] = rule[1].split(/\s+/);

    switch (rule[1][0])
    {
      // ***** count *****

      case 'count':
        document.getElementById(rule[1][1]).innerHTML = control.value.length;
        if (rule[1].length >= 5)
          if (control.value.length < rule[1][2])
               document.getElementById(rule[1][1]).style.color = rule[1][3];
          else document.getElementById(rule[1][1]).style.color = rule[1][4];
        break;
    }
  }

  return true;
}


// ***** onChange **************************************************************

function form_validation_onchange(e)
{
  var ie  = navigator.appName == "Microsoft Internet Explorer";
  var tag = ie ? window.event.srcElement : e.target;

  return true;
}


// ***** onKeypress ************************************************************

function form_validation_onkeypress(e)
{
  var ie  = navigator.appName == "Microsoft Internet Explorer";
  var tag = ie ? window.event.srcElement : e.target;
  var key = ie ? window.event.keyCode    : e.which;

  if (form_validation_options['override_backspace'])
    if (key == 8)
      return form_validation_instring(form_validation_type, tag.type);

  if (form_validation_options['override_enter'])
    if (key == 13 && tag.type != 'textarea')
      return form_validation_focusNext(tag);

  return true;
}


// ***** onKeyup ***************************************************************

function form_validation_onkeyup(e)
{
  var ie  = navigator.appName == "Microsoft Internet Explorer";
  var tag = ie ? window.event.srcElement : e.target;
  var key = ie ? window.event.keyCode    : e.which;

  var behaviours = form_validation_getElement(tag.form, 'form_validation_behaviours');

  if (behaviours !== undefined) form_validation_behave(tag, key, behaviours.value);
}


// ***** onSubmit **************************************************************

function form_validation_onsubmit(e)
{
  var ie  = navigator.appName == "Microsoft Internet Explorer";
  var tag = ie ? window.event.srcElement : e.target;
  if (tag.tagName != 'FORM') tag = tag.form;

  // ***** Validate fields *****

  var rules = form_validation_getElement(tag, 'form_validation_rules');

  if (rules !== undefined)
    for (var i = 0; i < tag.elements.length; i++)
      if (!form_validation_validate(tag.elements[i], rules.value))
      {
        tag.elements[i].focus();
        if (tag.elements[i].select !== undefined) tag.elements[i].select();
        return false;
      }

  // ***** Unset fields *****

  for (var i = 0; i < tag.elements.length; i++)
  {
    if (tag.elements[i].name == 'form_validation_rules')      tag.elements[i].value = '';
    if (tag.elements[i].name == 'form_validation_behaviours') tag.elements[i].value = '';
  }

  return true;
}


// ***** Register **************************************************************

function form_validation_register()
{
  for (var i = 0; i < document.forms.length; i++)
    with (document.forms[i])
    {
      var rules      = form_validation_getElement(document.forms[i], 'form_validation_rules');
      var behaviours = form_validation_getElement(document.forms[i], 'form_validation_behaviours');

      if (rules === undefined && behaviours === undefined) continue;

      onsubmit = form_validation_onsubmit;

      for (var j = 0; j < elements.length; j++)
      {
        if (behaviours !== undefined) form_validation_initialize(elements[j], behaviours.value);

        elements[j].onchange   = form_validation_onchange;
        elements[j].onkeypress = form_validation_onkeypress;
        elements[j].onkeyup    = form_validation_onkeyup;
      }
    }
}


// ***** rules2array ***********************************************************

function form_validation_rules2array(rules)
{
  rules = rules.replace(/^(\s*)(\S.*)/, "$2");
  rules = rules.replace(/(.*\S)(\s*)$/, "$1");
  return rules.split(/\s*;\s*/);
}


// ***** setSelection **********************************************************

function form_validation_setSelection(control, start, end, mode)
{
  if (control.focus) control.focus();

  // ***** Netscape *****

  if (control.selectionStart !== undefined &&
      control.selectionEnd   !== undefined)
  {
    offset = control.selectionStart;
    if (mode == 'frStart') offset = 0;
    if (mode ==   'frEnd') offset = control.textLength;

    control.selectionStart = offset+start;
    control.selectionEnd   = offset+end;

    return true;
  }

  // ***** IE *****

  if (control.select                 !== undefined &&
      document.selection             !== undefined &&
      document.selection.createRange !== undefined)
  {
    if (mode == 'frStart' || mode == 'frEnd') control.select();

    range = document.selection.createRange();

    if (mode == 'frStart') range.moveEnd  ("character", -range.text.length);
    if (mode == 'frEnd')   range.moveStart("character",  range.text.length);

    range.moveStart("character", start);
    range.moveEnd  ("character", end);
    range.select();

    return true;
  }

  return false;
}


// ***** Validate **************************************************************

function form_validation_validate(control, rules)
{
  rules = form_validation_rules2array(rules);

  for (var i = 0; i < rules.length; i++)
  {
    var rule = rules[i].split(/\s*:\s*/);

    if (rule.length < 2) continue;
    if (!form_validation_instring(' '+rule[0]+' ', control.name)) continue;

    rule[1] = rule[1].split(/\s+/);

    switch (rule[1][0])
    {
      // ***** Comparison *****

      case '>':
        if (control.value == '' || isNaN(control.value))
          return form_validation_alert('num', control.name, 0);
        if (control.value <= rule[1][1])
          return form_validation_alert('>', control.name, rule[1][1]);
        break;

      case '<':
        if (control.value == '' || isNaN(control.value))
          return form_validation_alert('num', control.name, 0);
        if (control.value >= rule[1][1])
          return form_validation_alert('<', control.name, rule[1][1]);
        break;

      case '>=':
        if (control.value == '' || isNaN(control.value))
          return form_validation_alert('num', control.name, 0);
        if (control.value < rule[1][1])
          return form_validation_alert('>=', control.name, rule[1][1]);
        break;

      case '<=':
        if (control.value == '' || isNaN(control.value))
          return form_validation_alert('num', control.name, 0);
        if (control.value > rule[1][1])
          return form_validation_alert('<=', control.name, rule[1][1]);
        break;

      // ***** Ch *****

      case 'ch':
        if (!/^([A-Za-z]+)$/.test(control.value))
          return form_validation_alert('ch', control.name, 0);
        break;

      // ***** Chnum_ *****

      case 'chnum_':
        if (!/^(\w+)$/.test(control.value))
          return form_validation_alert('chnum_', control.name, 0);
        break;

      // ***** Cnt *****

      case 'cnt':
        var cnt = 0;

        if (control.type == 'select-multiple')
          for (var k = 0; k < control.options.length; k++)
            if (control.options[k].selected) cnt++;

        if (control.type == 'checkbox')
          with (control.form)
            for (var k = 0; k < elements.length; k++)
              if (elements[k].name == control.name && elements[k].checked) cnt++;

        if (rule[1][1] == '>' && cnt <= rule[1][2])
          return form_validation_alert('cnt >', control.name, rule[1][2]);
        if (rule[1][1] == '<' && cnt >= rule[1][2])
          return form_validation_alert('cnt <', control.name, rule[1][2]);
        if (rule[1][1] == '>=' && cnt < rule[1][2])
          return form_validation_alert('cnt >=', control.name, rule[1][2]);
        if (rule[1][1] == '<=' && cnt > rule[1][2])
          return form_validation_alert('cnt >=', control.name, rule[1][2]);
        if (rule[1][1] == '==' && cnt != rule[1][2])
          return form_validation_alert('cnt ==', control.name, rule[1][2]);

        break;

      // ***** Date *****

      case 'date':
        rule[0] = rule[0].split(/\s+/);

        if (rule[0].length == 3)
        {
          var year;
          var month;
          var day;

          with (control.form)
            for (var k = 0; k < elements.length; k++)
            {
              if (elements[k].name == rule[0][0]) year  = elements[k];
              if (elements[k].name == rule[0][1]) month = elements[k];
              if (elements[k].name == rule[0][2]) day   = elements[k];
            }

          if (year !== undefined && month !== undefined && day !== undefined)
          {
            if (control == year)
              if (year.value  == '' || isNaN(year.value))
                return form_validation_alert('date', year.name, 0);
            if (control == month)
              if (month.value == '' || isNaN(month.value) || month.value < 0 || month.value > 12)
                return form_validation_alert('date', month.name, 0);
            if (control == day)
            {
              if (day.value   == '' || isNaN(day.value)   || day.value   < 0 || day.value   > 31)
                return form_validation_alert('date', day.name, 0);
              date = new Date(year.value, month.value, day.value);
              if (date.getDate() != day.value)
                return form_validation_alert('date', day.name, 0);
            }
          }
        }

        break;

      // ***** Email *****

      case 'email':
        if (!/^(\w+\.)*(\w+)@(\w+\.)+(\w+)$/.test(control.value))
          return form_validation_alert('email', control.name, 0);
        break;

      // ***** Empty *****

      case 'empty':
        if (form_validation_instring(form_validation_type, control.type) && control.value == '')
          return form_validation_alert('empty', control.name, 0);
        break;

      // ***** Len *****

      case 'len':
        if (rule[1][1] == '>' && control.value.length <= rule[1][2])
          return form_validation_alert('len >', control.name, rule[1][2]);
        if (rule[1][1] == '<' && control.value.length >= rule[1][2])
          return form_validation_alert('len <', control.name, rule[1][2]);
        if (rule[1][1] == '>=' && control.value.length < rule[1][2])
          return form_validation_alert('len >=', control.name, rule[1][2]);
        if (rule[1][1] == '<=' && control.value.length > rule[1][2])
          return form_validation_alert('len <=', control.name, rule[1][2]);
        if (rule[1][1] == '==' && control.value.length != rule[1][2])
          return form_validation_alert('len ==', control.name, rule[1][2]);
        break;

      // ***** Num *****

      case 'num':
        if (control.value == '' || isNaN(control.value))
          return form_validation_alert('num', control.name, 0);
        break;

      // ***** Radio *****

      case 'radio':
        var checked = false;
        with (control.form)
          for (var k = 0; k < elements.length; k++)
            if (elements[k].name == control.name && elements[k].checked)
              checked = true;
        if (!checked) return form_validation_alert('radio', control.name, 0);

      // ***** Select *****

      case 'select':
        if (control.value == rule[1][1])
          return form_validation_alert('select', control.name, 0);
        break;

      // ***** Terms *****

      case 'terms':
        if (!control.checked)
          return form_validation_alert('terms', control.name, 0);
        break;
    }
  }

  return true;
}


// ***** Initialize Forms ******************************************************

form_validation_register();
