// ==UserScript==
// @name       Survey Shortcuts
// @namespace  http://use.i.E.your.homepage/2
// @version    0.1
// @description  enter something useful
// @match      https://v2.decipherinc.com/*
// @match      http://v2.decipherinc.com/*
// @copyright  2012+, You
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}



addJQuery(main);


// the guts of this userscript
function main() {
  


    var url2 = window.location.href;


    //start quota stuff

    //cancel editing cell
    function escape()
    {
        if (url2.indexOf('tab=quota')!=-1){        
            $("#_cancel").click();
        }
    }

    //edit quotas
    function edit()
    {
        if (url2.indexOf('tab=quota')!=-1){
            $("#editQuotas").click();

        }
    }

    if (url2.indexOf('tab=quota')!=-1){

        var curindex = 0;
        var previndex = 0;

        //when cell is clicked
        $("#editQuotas").click(
            function(){
                $('td.editable').click(
                    function() {
                        window.setTimeout(highlightText, 0);
                        //var index = $("td.editable").index(this);
                    }
                );
            }
        );



        //when tab is pressed move to next input
        $("#_editor").keydown(
            function (e) {
                if (e.keyCode==9){//tab
                    $('#_save').click();

                    newindex = curindex+1;
                    $('[tabindex=' + newindex +']').focus().click();

                    window.setTimeout(highlightText, 0);

                    if(e.preventDefault) {
                        e.preventDefault();
                    }
                    return false;
                }
            }
        );



        //move editor and highlight input
        function highlightText(){
            if (! $("#_editor").is(":focus")){
                previndex = curindex;
                curindex = document.activeElement.tabIndex;

                $('[tabindex=' + previndex +']').css("border","");
                $('[tabindex=' + curindex +']').css("border","5px black solid");

                $("#_editor").select();
                $("#editor").offset({ top: 100, left: 800});

            }
        }


        $("#_editor").focusout(function() {
            //$('[tabindex=' + curindex + ']').focus();
        });

        //selects cell
        clickit = function (event,that){
            if (event.keyCode==13){//enter
                $(that).click();
                window.setTimeout(highlightText, 0);
            }
        };

        //set up tab indexes
        $("td.editable").each(
            function (i) {
                $(this).attr('tabindex', i + 1);
                $(this).attr('onkeydown',"clickit(event,this)");
            }
        );

    }
    //endquotastuff


    document.addEventListener('keydown', function(e) {

      if (e.keyCode == 69 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) {//e
            edit();
      }
      if (e.keyCode == 27 && !e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey) {//escape
        escape();
        }
      if (e.keyCode == 84 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) {//alt t
         goTO('survey/selfserve/','?_dj');
      }
      else if (e.keyCode == 82 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) {//alt r
         goTO('report/selfserve/','');
      }
      else if (e.keyCode == 80 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) {//alt p
         goTO('apps/portal/#/projects/detail/selfserve/','');
      }
      else if (e.keyCode == 81 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) {//alt q
         goTO('rep/selfserve/',':dashboard?tab=quota&split=none');
      }
      else if (e.keyCode == 87 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) {//alt w
         goTO('/s/sst/sst.html?path=selfserve/','');
      }
      else if (e.keyCode == 85 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) {//alt u
         goTO('/apps/filemanager/selfserve/','');
      }
      else if (e.keyCode == 86 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) {//alt v
         goTO('/admin/vc/list?file=selfserve/','/survey.xml');
      }
      else if (e.keyCode == 72 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) {//alt H
        goToPage();
      }
      else if (e.keyCode == 83 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) {//alt s
        startAtPage();
      }

    }, false);

    var baseURL = 'https://v2.decipherinc.com/';

    function goTO(front,back){
        projectAddress = getProject();
        if (projectAddress){
            url = baseURL + front + projectAddress + back;
            //GM_openInTab(url);
            window.location.href = url;
        }
    }

    function startAtPage(){
      value = prompt('Which question should I start at?', 'Q');
      if (value) {
        goTO('survey/selfserve/','?&start-at='+value);
      }
    }

    function goToPage(){
      value = prompt('Which question should I go to?', 'Q');
      if (value) {
        goTO('survey/selfserve/','?&start-at='+value+'&stop-at='+value+'&debug=flow');
      }
    }

    function getProject(){
        url = window.location.href;
        if (url.indexOf('selfserve/')!=-1){
            urlback = url.split('selfserve/')[1];
            urlback = urlback.split('?')[0];
            urlback = urlback.split(':')[0];        
            if (url.indexOf('/admin/vc/list')!=-1){            
                urlback = urlback.substring(0,urlback.lastIndexOf("/"));                        
            }
            return urlback;
        }
        return "";
    }






}
