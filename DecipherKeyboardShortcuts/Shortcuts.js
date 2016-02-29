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
    var tableCSS = {};
    



    // var url2 = window.location.href;
    var url2 = window.location.protocol +'//' + window.location.host + window.location.pathname;

    function injectJs(srcFile) {
        var src = document.createElement('script');
        src.textContent = srcFile;
        document.body.appendChild(src);
    }

    var gotoquota = "function gotoquota(el){" +
        "var eel = $(el);" +
        "var eli = eel.attr('class');" +
        "var elid = $('#'+eli);" +
        "var elgo = eel.data('goto');" +
        "var elgoto = document.getElementById(elgo);" +

        "if (elid.is(':visible')){" +
            "window.location.hash = '#'+elgo;" +
        "}else{" +
            "var _thisclick = elid.prev('h2').find('a').get(0);" +
            "_thisclick.click();" +
            "window.location.hash = '#'+elgo;" +
        "}" +
    "}";


    //Some constructor here might be nice
    function hideAll(){
        var allDivs = $('div[id^="div"]'); 
        allDivs.each(function(){
            var _thisDiv = $(this);
            if (_thisDiv.is(':visible')){
                var thisclick = _thisDiv.prev('h2').find('a').get(0);
                thisclick.click();
            }
        });
    }

    function showAll(){
        var allDivs = $('div[id^="div"]'); 
        allDivs.each(function(){
            var _thisDiv = $(this);
            if (_thisDiv.is(':hidden')){
                var thisclick = _thisDiv.prev('h2').find('a').get(0);
                thisclick.click();
            }
        });
    }

    function searchQuotas(){
        var searchVal = $(this).val().toLowerCase();
        var searchTRs = $('#qbTable table tr');
        searchTRs.each(function(){
            var _this = $(this);
            var _thisVal = _this.find('a').text().toLowerCase();
            if (_thisVal.indexOf(searchVal) > -1){
                _this.show();
            }else{
                _this.hide();
            }

                
            
        });
    }

    //start quota stuff
    //quotaBuddy
    if (url2.indexOf('tab=quota')!=-1){ 

        $('<div id="quotaBuddy">'+
            '<div id="qbHead">'+
                '<div id="qbSearch"><input type="text" name="quotaLU" placeholder="Quota Buddy" /></div>'+
                '<div class="spQB">'+
                    '<button id="hideAll" class="spQBa qbred">-</button>'+
                    '<button id="showAll" class="spQBa qbgreen">+</button>'+
                '</div>'+
                '<div class="clear"></div>'+
            '</div>'+
            '<div id="qbTable">'+
                '<table></table>'+
            '</div>'+
        '</div>' +
        '<div id="toggleQuotabuddy" class="qbshow">&gt;</div>').insertAfter('#fwheader');

        $('#hideAll').on('click', hideAll);
        $('#showAll').on('click', showAll);
        injectJs(gotoquota);

        var qBuddy = $('div#quotaBuddy');
        var qBuddyTdiv = $('#qbTable');
        var qBuddyT = $('#qbTable table');
        var qTables = $('table.nquota');
        var tabContent = document.getElementById("tab-content").getBoundingClientRect();
        var qWidth = (tabContent.left - 10);

        qBuddy.css({
            'position': 'absolute',
            'height': ($(window).height() - 33) + "px",
            'width': qWidth + "px"
        });
        qBuddyTdiv.css({'height': ($(window).height() - 58) + "px"});

        

        (function(){
            $('#toggleQuotabuddy').on('click', function(){
                var togQB = $(this);

                if (togQB.hasClass('qbshow')){
                    //I am horrible at animating...Send help
                    qBuddy.hide();
                    togQB.hide();
                    togQB.text('>');
                    togQB.css({
                        'opacity': 0.5,
                        'left': 0
                        });
                    togQB.show('slide', {
                        direction: 'left'
                        }, 500);
                    togQB.toggleClass('qbshow');

                }else {
                    togQB.css({'left': qWidth});
                    togQB.toggleClass('qbshow');
                    togQB.text('<');
                    qBuddy.show();

                }
            }).trigger('click');
        })();

        qTables.each(function(){
            var _this = $(this);
            var _thisid = $(this).get(0).id;
            var _thisSheet = $(this).parent('div').prev().find('span').text();
            var _thisHidDiv = _this.parent('div').get(0).id;
            var _thisText = _this.find('.nquotaDescription').text();

            qBuddyT.append('<tr><td><a href=\"javascript:void(0)\" class=\"'+_thisHidDiv+'\" title=\"'+_thisSheet+'\" data-goto=\"'+_thisid+'\"onclick=\"gotoquota(this)\">'+_thisText+'</a></td></tr>');

        });

        var qbSearch = $('#qbSearch input');
        qbSearch.on('keyup',searchQuotas);
    }



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
        // url = window.location.href;
        url = window.location.protocol +'//' + window.location.host + window.location.pathname;
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
