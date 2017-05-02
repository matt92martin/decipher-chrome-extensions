$(function(){

    function page(onPage, options){

        console.log(onPage);

        var onQuota = (window.location.href.indexOf('tab=quota') !== -1);

        if (onPage){
            var afm = AnswerForMe;
            var sc  = ShortCuts;
        }

        var kb  = KeyBinds;
        var sl  = SearchLight;
        sl.init();

        if ( onPage && afm.GM_getValue("question") ){
            afm.gotoPage();

        } else if (onPage && $('.devToggle.expanded').length){
            $('.surveyInfo, .survey-info').toggle();

        } else if (onQuota) {
            var qb = QuotaBuddy;
            qb.init();

        }


        function escape() {
            if (onQuota) {
                qb.cancel()

            } else if (onPage){
                sl.cancel();
                afm.clearValues();

            } else{
                sl.cancel();            

            }
        }

        chrome.runtime.onMessage.addListener(function(msg) {
            if ( msg.type === 'search_light' ){
                sl.showInput();
            }
        });

        
        function keyFunctions(e) {
            
            if ( e.keyCode === 27 ) { escape(); }
            if (onPage){
                if      ( e.ctrlKey && e.shiftKey && e.altKey && e.metaKey ) {}
                else if ( e.ctrlKey && e.shiftKey && e.altKey ) {}
                else if ( e.ctrlKey && e.altKey ) {}
                else if ( e.ctrlKey && e.shiftKey ) {}
                else if ( e.shiftKey && e.altKey ) {
                    if      ( kb.test_keys('s') ) { kb.foundMatch( sc.getState.bind(sc) ); }
                }
                else if ( e.shiftKey ) {
                    if      ( kb.test_keys('right') ) { kb.foundMatch(afm.fillNext.bind(afm)); }
                    else if ( kb.test_keys('down') ) { kb.foundMatch(afm.fillPage.bind(afm)); }
                    else if ( kb.test_keys('up') ) { kb.foundMatch(afm.nextPage.bind(afm)); }
                }
                else if ( e.ctrlKey ) {}
                else if ( e.altKey ) {
                    
                    // Straight line a question
                    if      ( kb.test_keys('1') ) { kb.foundMatch( afm.straightLine.bind(afm, 1) ); }
                    else if ( kb.test_keys('2') ) { kb.foundMatch( afm.straightLine.bind(afm, 2) ); }
                    else if ( kb.test_keys('3') ) { kb.foundMatch( afm.straightLine.bind(afm, 3) ); }
                    else if ( kb.test_keys('4') ) { kb.foundMatch( afm.straightLine.bind(afm, 4) ); }
                    else if ( kb.test_keys('5') ) { kb.foundMatch( afm.straightLine.bind(afm, 5) ); }
                    else if ( kb.test_keys('6') ) { kb.foundMatch( afm.straightLine.bind(afm, 6) ); }
                    else if ( kb.test_keys('7') ) { kb.foundMatch( afm.straightLine.bind(afm, 7) ); }
                    else if ( kb.test_keys('8') ) { kb.foundMatch( afm.straightLine.bind(afm, 8) ); }
                    else if ( kb.test_keys('9') ) { kb.foundMatch( afm.straightLine.bind(afm, 9) ); }
                    // Derandomize rows
                    else if ( kb.test_keys('d')) { kb.foundMatch( afm.toggleRandomization.bind(afm) ); }
                    // Go to survey start ( no variables )
                    else if ( kb.test_keys('t')) { kb.foundMatch(sc.goTO.bind(sc, 'survey', '?mm'));}
                    // Go to question in the survey (does not ignore conditions)
                    else if ( kb.test_keys('s')) { kb.foundMatch(sc.startAtPage.bind(sc)); }
                    // Go to question in the survey (ignores conditions)
                    else if ( kb.test_keys('h')) { kb.foundMatch(sc.goToPage.bind(sc)); }
                    // Edit quotas if on quota page
                    else if ( kb.test_keys('e')) { kb.foundMatch(sc.edit.bind(sc)); }
                    // Go to report 2010
                    else if ( kb.test_keys('r')) { kb.foundMatch(sc.goTO.bind(sc, 'report', '')); }
                    // Go to survey portal page
                    else if ( kb.test_keys('p')) { kb.foundMatch(sc.goTO.bind(sc, 'apps/portal/#/projects/detail', '')); }
                    // Go to survey quota page
                    else if ( kb.test_keys('q')) { kb.foundMatch(sc.goTO.bind(sc, 'rep', ':dashboard?tab=quota&split=none')); }
                    // Go to survey sst page
                    else if ( kb.test_keys('w')) { kb.foundMatch(sc.goTO.bind(sc, 'admin/sst/list?survey=', '', false)); }
                    // Go to survey upload manager
                    else if ( kb.test_keys('u')) { kb.foundMatch(sc.goTO.bind(sc, 'apps/filemanager', '')); }
                    // Go to survey version history
                    else if ( kb.test_keys('v')) { kb.foundMatch(sc.goTO.bind(sc, 'admin/vc/list?file=', '/survey.xml', false)); }
                    // Go to crosstabs
                    else if ( kb.test_keys('c')) { kb.foundMatch(sc.goTO.bind(sc, 'apps/report', '')); }
                    // Set the survey to flow mode
                    else if ( kb.test_keys('f')) { kb.foundMatch(sc.goTO.bind(sc, 'survey', '?&debug=flow')); }
                    // Does the survey for you up until the question you enter
                    else if ( kb.test_keys('g')) { kb.foundMatch(afm.AutoMate.bind(afm)); }
                }
            }
            return;
        }
        
        document.addEventListener('keydown', function(e){
            kb.mapKeys(e, keyFunctions);
        });
        
        document.addEventListener('keyup', function(e){
            kb.mapKeys(e, keyFunctions);
        });

    }
    
    function validSite(sites){
        var current_site = window.location.host;
        for (var i=0; i<sites.length; i++){
            var site = sites[i].trim();
            
            if ( site && current_site.indexOf(site) !== -1 ){
                return true;
            }
        }
        return false;
    }


    chrome.runtime.sendMessage({
        type: 'sites'
    },
    function(response){
        page(validSite(response.payload.sites)); 
    });
    
});
