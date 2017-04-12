$(function(){
	
	var kb = KeyBinds;
    var afm = AnswerForMe;
    var sc = ShortCuts;

	
    if (afm.GM_getValue("question")){
        afm.gotoPage();
    }
    else if ($('.devToggle.expanded').length){
        $('.surveyInfo, .survey-info').toggle();
    }


	function escape() {
		if (sc.url1().indexOf('tab=quota') != -1) {
			$("#saveCancel").find('button.secondary').click();
		}
        else {
            afm.clearValues();
        }
	}
	
	function keyFunctions() {
        
		if      ( kb.test_keys('esc')) { escape(); }
		else if ( kb.test_keys('ctrl', 'shift', 'alt')) {}
		else if ( kb.test_keys('shift', 'alt')) {}
		else if ( kb.test_keys('ctrl', 'shift')) {}
		else if ( kb.test_keys('ctrl', 'alt')) {}
		else if ( kb.test_keys('shift')) {
            
            if      ( kb.test_keys('right') ) { kb.foundMatch(afm.fillNext.bind(afm)); }
            else if ( kb.test_keys('up')    ) { kb.foundMatch(afm.fillPage.bind(afm)); }
            else if ( kb.test_keys('down')  ) { kb.foundMatch(afm.nextPage.bind(afm)); }
            
		}
		else if (kb.test_keys('ctrl')) {}
		else if (kb.test_keys('alt')) {
            
            // Straight line a question
            if      ( kb.test_keys('1')) { kb.foundMatch( afm.straightLine.bind(afm, 1) ); }
            else if ( kb.test_keys('2')) { kb.foundMatch( afm.straightLine.bind(afm, 2) ); }
            else if ( kb.test_keys('3')) { kb.foundMatch( afm.straightLine.bind(afm, 3) ); }
            else if ( kb.test_keys('4')) { kb.foundMatch( afm.straightLine.bind(afm, 4) ); }
            else if ( kb.test_keys('5')) { kb.foundMatch( afm.straightLine.bind(afm, 5) ); }
            else if ( kb.test_keys('6')) { kb.foundMatch( afm.straightLine.bind(afm, 6) ); }
            else if ( kb.test_keys('7')) { kb.foundMatch( afm.straightLine.bind(afm, 7) ); }
            else if ( kb.test_keys('8')) { kb.foundMatch( afm.straightLine.bind(afm, 8) ); }
            else if ( kb.test_keys('9')) { kb.foundMatch( afm.straightLine.bind(afm, 9) ); }
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
            else if ( kb.test_keys('w')) { kb.foundMatch(sc.goTO.bind(sc, 'admin/sst/list?survey=', '')); }
            // Go to survey upload manager
            else if ( kb.test_keys('u')) { kb.foundMatch(sc.goTO.bind(sc, 'apps/filemanager', '')); }
            // Go to survey version history
            else if ( kb.test_keys('v')) { kb.foundMatch(sc.goTO.bind(sc, 'admin/vc/list?file=', '/survey.xml')); }
            // Set the survey to flow mode
            else if ( kb.test_keys('f')) { kb.foundMatch(sc.goTO.bind(sc, 'survey', '?&debug=flow')); }
            // Does the survey for you up until the question you enter
            else if ( kb.test_keys('g')) { kb.foundMatch(afm.AutoMate.bind(afm)); }
        }
        return;
        
    }
    
    document.addEventListener('keydown', function(e){
        kb.mapKeys(e, keyFunctions);
    });
    
    document.addEventListener('keyup', function(e){
        kb.mapKeys(e, keyFunctions);
    });
    
    
});

/*


        
        document.addEventListener('keydown', function(e) {
            // pressed alt+g
            if (e.keyCode == 71 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) {//alt g
                var value = '';
                clearValues();
                value = prompt('Which question do I stop at?', 'Q');
                if (value) {
                    var d = new Date();
                    var n = d.getTime();
                    GM_setValue("time",n);
                    GM_setValue("question",value);
                    gotoPage();
                }
                else{
                    return;
                }
                
                
                else if (e.keyCode == 68 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) {//alt d
                    toggleRandomization();
                }
                else if (e.keyCode == 70 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) {//alt f
                    e
                    url = window.location.href;
                    url = url + '?&debug=flow';
                    window.location.href = url;
                }
            }, false);
            */