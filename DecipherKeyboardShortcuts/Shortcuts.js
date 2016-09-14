(function main() {


    console.log('Decipher Survey Helper loaded.');


    var url1 = window.location.href;
    var url2 = window.location.protocol +'//' + url_host + url_path + url_search;

    var url_host = window.location.host;
    var url_path = window.location.pathname;
    var url_search = window.location.search;

    function injectJs(srcFile) {
        var src = document.createElement('script');
        src.textContent = srcFile;
        document.body.appendChild(src);
    }

    function gotoquota(el){
        var eel = $(el);
        var eli = eel.attr('class');
        var elid = $('#'+eli);
        var elgo = eel.data('goto');
        var elgoto = document.getElementById(elgo);

        if (elid.is(':visible')){
            window.location.hash = '#'+elgo;
        }else{
            var _thisclick = elid.prev('h2').find('a').get(0);
            _thisclick.click();
            window.location.hash = '#'+elgo;
        }
    }



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
    if (url1.indexOf('tab=quota')!=-1){

        var quotaBuddyHtml =`<div id="quotaBuddy">
            <div id="qbHead">
                <div id="qbSearch"><input type="text" name="quotaLU" placeholder="Quota Buddy" /></div>
                <div class="spQB">
                    <button id="hideAll" class="spQBa qbred">-</button>
                    <button id="showAll" class="spQBa qbgreen">+</button>
                </div>
                <div class="clear"></div>
            </div>
            <div id="qbTable">
                <table></table>
            </div>
        </div>
        <div id="toggleQuotabuddy" class="qbshow">&gt;</div>`;
        $(quotaBuddyHtml).insertAfter('#fwheader');

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


            $('#toggleQuotabuddy').on('click', function(){
                var togQB = $(this);

                if (togQB.hasClass('qbshow')){
                    qBuddy.hide();
                    togQB.hide();
                    togQB.text('>');
                    togQB.css({
                        'opacity': 0.5,
                        'left': 0
                        });
                    togQB.show('slide');
                    togQB.toggleClass('qbshow');

                }else {
                    togQB.css({'left': qWidth});
                    togQB.toggleClass('qbshow');
                    togQB.text('<');
                    qBuddy.show();

                }
        }).trigger('click');

        var quotaSheets = [];
        qTables.each(function(){
            var _this = $(this);
            var _thisid = _this.get(0).id;
            var _thisSheet = _this.parent('div').prev().find('span').text();
            var _thisHidDiv = _this.parent('div').get(0).id;
            var _thisText = _this.find('.nquotaDescription').text();

            var rowtext =   `<tr>
                                <td class="quotaTogglers">
                                    <a  href="javascript:void(0)" 
                                        class="`+_thisHidDiv+`" 
                                        data-goto="`+_thisid+`" 
                                        onclick="gotoquota(this)"
                                    >`+_thisText+`</a>
                                </td>
                            </tr>`;
            if (quotaSheets.indexOf(_thisSheet) == -1){
                var sheetText = `<tr class="quotaTogglersHead"><td>` + _thisSheet.replace(/^sheet: /, '') + `</td></tr>`;
                quotaSheets.push(_thisSheet);
                rowtext = sheetText + rowtext;
            }
            qBuddyT.append(rowtext);
        });

        var qbSearch = $('#qbSearch input');
        qbSearch.on('keyup',searchQuotas);
    }



    //cancel editing cell
    function escape(){
        if (url1.indexOf('tab=quota')!=-1){
            $("#_cancel").click();
        }
    }

    //edit quotas
    function edit(){
        if (url1.indexOf('tab=quota')!=-1){
            $("#editQuotas").click();
        }
    }

    if (url1.indexOf('tab=quota')!=-1){

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
            goTO('survey','?_dj');
        }
        else if (e.keyCode == 82 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) {//alt r
            goTO('report','');
        }
        else if (e.keyCode == 80 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) {//alt p
            goTO('apps/portal/#/projects/detail','');
        }
        else if (e.keyCode == 81 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) {//alt q
            goTO('rep',':dashboard?tab=quota&split=none');
        }
        else if (e.keyCode == 87 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) {//alt w
            goTO('admin/sst/list?survey=','');
        }
        else if (e.keyCode == 85 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) {//alt u
            goTO('apps/filemanager','');
        }
        else if (e.keyCode == 86 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) {//alt v
            goTO('admin/vc/list?file=','/survey.xml');
        }
        else if (e.keyCode == 72 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) {//alt H
            goToPage();
        }
        else if (e.keyCode == 83 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) {//alt s
            startAtPage();
        }

    }, false);

    var baseURL = window.location.protocol +'//' + url_host + '/';

    function goTO(front,back){
        projectAddress = getProject();

        if (projectAddress){
            url = baseURL + front + projectAddress + back;
            window.location.href = url;
        }
    }

    function startAtPage(){
      value = prompt('Which question should I start at?', 'Q');
      if (value) {
        goTO('survey','?&start-at='+value);
      }
    }

    function goToPage(){
      value = prompt('Which question should I go to?', 'Q');
      if (value) {
        goTO('survey','?&start-at='+value+'&stop-at='+value+'&debug=flow');
      }
    }

    function getProject(){
        url = window.location.href;
        // url = window.location.protocol +'//' + window.location.host + window.location.pathname + window.location.hash;

        if (url.match(/(takesurvey\/|survey\/|report\/|rep\/|filemanager\/)/)){
            url = window.location.protocol +'//' + window.location.host + window.location.pathname;
            urlback = url.split(/\/filemanager|\/report|\/rep|\/survey|\/takesurvey/)[1];
            urlback = urlback.split('?')[0];
            urlback = urlback.split(':')[0];

            return urlback;

        }else if(url.match(/(\/admin\/vc\/list|detail\/|admin\/sst\/list)/)){
            url = window.location.href;
            urlback = url.split(/file\=|survey\=|\/detail/)[1]

            if (url.match(/(\/admin\/vc\/list)/)){
                urlback = urlback.substring(0,urlback.lastIndexOf("/"));
            }

            //Ensuring that we only have 1 leading "/"
            return "/" + urlback.replace(/^[\/]+|[\/]+$/, '');
        }

        return "";
    }


})();
