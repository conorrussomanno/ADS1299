<!--
/*
 * THIS SOURCE FILE, ITS MACHINE READABLE FORM, AND ANY REPRESENTATION
 * OF THE MATERIAL CONTAINED HEREIN ARE OWNED BY GEOTRUST.
 * THESE MATERIALS ARE PROPRIETARY AND CONFIDENTIAL AND MAY NOT BE
 * REPRODUCED IN ANY FORM WITHOUT THE PRIOR WRITTEN PERMISSION OF
 * GeoTrust.
 * COPYRIGHT (C) 1999-2011 BY GEOTRUST, INC.
 * ALL RIGHTS RESERVED
 */
gt__ua=navigator.userAgent.toLowerCase();
gt__isie=(gt__ua.indexOf("msie")!=-1);
gt__isop=(gt__ua.indexOf("opera")!=-1);
gt__msg="Click for company profile";
gt__rcm="This icon is protected.\nPlease use left button to view company information.";
gt__bma=parseInt(navigator.appVersion);
gt__s="smarticon";
gt__si=gt__s+".geotrust.com/";
gt__hn=window.location.hostname;
gt__sip="https://"+gt__si+"smarticonprofile";
gt__rsip=gt__sip+"?Referer="+window.location.protocol+"//"+gt__hn;
gt__is="//"+gt__si+"smarticon?ref="+gt__hn;
gt__ph=600;
if(screen!=null)if(screen.height<670)gt__ph=screen.height-70;
gt__ws="status=1,location=0,scrollbars=1,resizeable=yes,width=400,height="+gt__ph;
gt__w=null;
var gt__ver=-1;
var gt__re=new RegExp("msie ([0-9]{1,}[\.0-9]{0,})");
if (gt__re.exec(gt__ua) != null)
 gt__ver = parseFloat( RegExp.$1 );
if ( gt__ver > 0 ) gt__bma=gt__ver;
function gt__sp(){
 gt__w=window.open(gt__rsip,'GT__SIP',gt__ws);
 if ((gt__w != null)&&(!gt__isie||(gt__bma >= 5))) gt__w.focus();
}
function gt__dc(e){
 if (gt__isop||document.addEventListener) {
  var eit=(e.target.name=="xhcekybu");
   if (eit){
    if (e.which==3){
    }
   }
 }else if(document.captureEvents) {
  var tgt=e.target.toString();
  var eit=(tgt.indexOf(gt__s)!=-1);
  if (eit){
   if (e.which==3){
   }
  }
 }
}
function gt__md(){
 if(typeof event != 'undefined'){  if (event.button==2){
  return false;
 }else if(event.button==1){
  if(gt__isie) {
   return true;
  }
 }}
 gt__sp();
 return false;
}
if(gt__isie&&(gt__bma<=4)) {
 document.write("<A TABINDEX=\"-1\" HREF=\""+gt__rsip+"\" onmousedown=\"return gt__md();\"><IMG NAME=\"xhcekybu\" HEIGHT=\"55\" WIDTH=\"115\" BORDER=\"0\" SRC=\""+gt__is+"\" ALT=\""+gt__msg+"\" oncontextmenu=\"return false;\"></A>");
}
else if(gt__isie&&(gt__bma>=5)&&!gt__isop) {
 document.write("<A HREF=\"javascript:gt__sp()\" TABINDEX=\"-1\" onmouseout=\"window.status='';\" onmouseover=\"this.style.cursor='hand'; window.status='"+gt__msg+"';\" onmousedown=\"return gt__md();\"><IMG NAME=\"xhcekybu\" HEIGHT=\"55\" WIDTH=\"115\" BORDER=\"0\" SRC=\""+gt__is+"\" ALT=\""+gt__msg+"\" oncontextmenu=\"return false;\"></A>");
}
else { 
 document.write("<A TABINDEX=\"-1\" HREF=\""+gt__rsip+"\" onclick=\"return gt__md();\" target=\"GT__SIP\"><IMG NAME=\"xhcekybu\" HEIGHT=\"55\" WIDTH=\"115\" BORDER=\"0\" SRC=\""+gt__is+"\" ALT=\""+gt__msg+"\" oncontextmenu=\"return false;\"></A>");
}
if (document.addEventListener){
 document.addEventListener('mouseup',gt__dc,true);
}
else {
 if (document.layers){
  document.captureEvents(Event.MOUSEDOWN);
 }
 document.onmousedown=gt__dc;
}
if( gt__isie && (gt__ver>=7)) {
 var gt__plat=-1;
 var gt__re=new RegExp("windows nt ([0-9]{1,}[\.0-9]{0,})");
 if (gt__re.exec(gt__ua) != null)
  gt__plat = parseFloat( RegExp.$1 );
 if (gt__plat >= 5.1) {
  document.write("<div style=\"display:none\">");
  document.write("<img src=\"https://extended-validation-ssl.geotrust.com/dot_clear.gif\" ALT=\"\" />");
  document.write("</div>");
 }
}
// -->
