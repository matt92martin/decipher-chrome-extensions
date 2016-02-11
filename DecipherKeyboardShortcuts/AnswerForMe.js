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

// load jQuery and execute the main function   
if (window.location.href.indexOf('.decipherinc.com/survey/')!=-1){        
    addJQuery(main);
}


// the guts of this userscript
function main() {
  
//if (!this.GM_getValue || (this.GM_getValue.toString &amp;&amp; this.GM_getValue.toString().indexOf("not supported")>-1)) {
  GM_getValue=function (key,def) {
      return localStorage[key] || def;
  };
  GM_setValue=function (key,value) {
      return localStorage[key]=value;
  };
  GM_deleteValue=function (key) {
      return delete localStorage[key];
  };
//}  
  
  

//Maximum Time between pages where goto script will quit
var timeout = 5000;

//Run script on page load
if (GM_getValue("question")){
    gotoPage();    
}
else if ($('.devToggle.expanded').length){
    //Expand python drop down menus in survey
    $('.surveyInfo, .survey-info').toggle();
}


function clearValues()
{
    GM_deleteValue("question");
    GM_deleteValue("qlabel");
    GM_deleteValue("dupecount");
    GM_deleteValue("time");
}


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
    

  }
  else if (e.keyCode == 39 && e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey) {//shift right
    fillNext();
  }
  else if (e.keyCode == 40 && e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey) {//shift up
    fillPage();
  }
  else if (e.keyCode == 38 && e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey) {//shift down
    nextPage();
  }
  else if (e.keyCode == 49 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) {//alt 1
    straightLine(1);
  }
  else if (e.keyCode == 50 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) {//alt 2
    straightLine(2);
  }
  else if (e.keyCode == 51 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) {//alt 3
    straightLine(3);
  }
  else if (e.keyCode == 52 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) {//alt 4
    straightLine(4);
  }
  else if (e.keyCode == 53 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) {//alt 5
    straightLine(5);
  }
  else if (e.keyCode == 54 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) {//alt 6
    straightLine(6);
  }
  else if (e.keyCode == 55 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) {//alt 7
    straightLine(7);
  }
  else if (e.keyCode == 56 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) {//alt 8
    straightLine(8);
  }
  else if (e.keyCode == 57 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) {//alt 9
    straightLine(9);
  }
  else if (e.keyCode == 58 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) {//alt 10
    straightLine(10);
  }
  else if (e.keyCode == 68 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) {//alt d
    toggleRandomization(5);
    return false;
  }
  else if (e.keyCode == 70 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) {//alt f
      url = window.location.href;
      url = url + '?&debug=flow';
      window.location.href = url;
      //GM_openInTab(url);
  }
}, false);



function gotoPage(){

    time = GM_getValue("time",0);

    var d = new Date();
    var n = d.getTime();

    GM_setValue("time",n);

    //quit if timed out
    if (!time || ((n - time) > timeout)){
        clearValues();
        return;
    }

    //quit if no question set to go to
    var value = '';
    if (!GM_getValue("question")){
        return;
    }
    else{
        value = GM_getValue("question");
    }

    //Check the new page against the old page to make sure we are progressing
    oldlabel = GM_getValue("qlabel",'');
    newlabel = $("dt a").text();

    if (!newlabel){
        newlabel = $("dt").text();
    }
    GM_setValue("qlabel",newlabel);

    var dupecount = GM_getValue("dupecount",0);

    //If fails to complete page 4 times then quit
    if (oldlabel == newlabel && newlabel.indexOf("Quota sheet:") == -1){
        if (dupecount < 3){
            dupecount = dupecount + 1;
            GM_setValue("dupecount",dupecount);
        }
        else{
            console.log("Failed to complete page");
            console.log(dupecount);
            return;
        }
    }
    else{
        GM_setValue("dupecount",0);
    }

    //if at page then stop
    if ($("dt a:contains('["+value+"]')").length){
        clearValues();
        return;
    }
    $(document).on('keypress',function(e) {
        if (e.keyCode == 27) { 
            return;
        }
    });

    fillNext();

}

//returns qacode value after the : so MRK:16 returns 16
function getQACode(letters){
    var temp = $("dd sup span:contains('"+letters+":')").first().text();
    return temp.replace(letters+":","");
}


function range(start, end)
{
    var array = new Array();
    for(var i = start; i < end; i++)
    {
        array.push(i);
    }
    return array;
}

function fillPage(){
    //Only fill dev questions if there is a term
    if ($(".devContainer:has(div.surveyQuestion, div.question)").length){
        if ($(".even, .odd").has("span:contains('TERM')").length){
            fillRadio();
        }
        $('input:submit').click();
        return;
    }

    var atmost = getQACode("ATM");
    var atleast = getQACode("ATL");
    var maxranks = getQACode("MRA");
    var range = getQACode("VRF");
    var amount = getQACode("AMT");
    var unique =  getQACode("UNI");
    var exactly =  getQACode("EX");
    var zipcode = false;
    if (range == 'zipcode'){
        zipcode=true;
    }
    else{
        //get number range
        if (range.length){
            range = range.replace('range(','');
            range = range.replace(')','');
            range = range.split(',');
        }
        else{
            //Default number range is 0-10
            range = [0,10]
        }
    }

    fillText();

    fillNumber(amount,range);
    
    fillFloat();

    fillCheckBox(atmost,atleast,exactly);

    fillSelect(maxranks,unique);

    fillRadio();

    fillTextArea();

    fillOpenSpecify();

}


function fillText(){

    var $text = $('.text').find(".element input:text");
    if ($text.length){
        $text.each(function() {
            text = $(this).closest('tr').find('td').text();
            if (text.toLowerCase().indexOf("email") >= 0 || text.toLowerCase().indexOf("e-mail") >= 0){
                $(this).val('garbage@thedump.com').trigger('change');
            }
            else if (text.toLowerCase().indexOf("phone") >= 0){
                $(this).val('5555555555').trigger('change');
            }
            else{
                $(this).val(93612).trigger('change');
            }
        });
        return true;
    }
    return false;
}

//Currently only works for selects
function fillOpenSpecify(){

    var $text = $("input:text");
    if ($text.length){
        $text.each(function() {
            select = $(this).closest('tr').find('td select');            
            if (select.length && select.val()!=-1){
                $(this).val(93612).trigger('change');
            }
        });
        return true;
    }
    return false;
}


function fillNumber(amount,range){
    if (amount){

        amountleft = amount;
        numbers = $(".number tr:has(input:text)");
        if (!numbers.length){
            return false;
        }
        count = numbers.length;
        newamount = Math.floor(amount/count);
        lastamount = newamount + (amount - (newamount*count));



        if (false && ! $(".groupingRows").length){

            newamount = Math.floor(amount/count);
            lastamount = newamount + (amount - (newamount*count));
            numbers.each(function(){
                for (var i=0;i<count;i++)
                {
                    $(this).find(".element input:text").eq(i).val(lastamount).trigger('change');
                    if (i==count-1){
                        $(this).find(".element input:text").eq(i).val(lastamount).trigger('change');
                    }
                    else{
                        $(this).find(".element input:text").eq(i).val(newamount).trigger('change');
                    }


                }
            });
        }
        else{
            count = numbers.length;
            newamount = Math.floor(amount/count);
            lastamount = newamount + (amount - (newamount*count));
            for (var i=0;i<count;i++)
            {
                numbers.eq(i).find(".row-legend input:text").val(lastamount).trigger('change');
                if (i==count-1){
                    numbers.eq(i).find(".element input:text").val(lastamount).trigger('change');
                }
                else{
                    numbers.eq(i).find(".element input:text").val(newamount).trigger('change');
                }

            }
        }

    }
    else{

        var $numbers = $(".number").find("input:text");
        if ($numbers.length){

            qtext = $('.survey-q-question-text, .question-text').text();            
            if ($numbers.length == 1 && (qtext.toLowerCase().indexOf("age") >= 0 || qtext.toLowerCase().indexOf("old are you") >= 0 )){
                $numbers.val('33').trigger('change');
            }
            else{
                $numbers.each(function() {
                    $(this).val(getRandomInt(range[0],range[1])).trigger('change');
                });
            }
            return true;
        }
    }

    return false;
}

function fillFloat(){

        
    numbers = $(".float tr:has(input:text)");              
    if (!numbers.length){
        return false;
    }
    
    //numbers.each(function(){
        $(numbers).find(".element input:text").val(10).trigger('change');
    //});
        
     
}



function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}




function fillOE(tr){
    var $text = tr.find("input:text ");
    if ($text.length){
        $text.each(function() {
            $(this).val(93612).trigger('change');
        });
        return true;
    }
    return false;
}



function fillTextArea(){
    if ($('textarea').length){
        $('textarea').val('Autofill');
        return true;
    }
    return false;
}

function setOE(inputField) {
	var text = " ";
	
	var charset = "abcdefghijklmnopqrstuvwxyz0123456789";

	for(var i=0;i<10;i++)
		text += charset.charAt(Math.floor(Math.random() * charset.length));

	 inputField.val(text);
}

function fillRadio(){
    
	$('.answers').each(function() {
		$currQuestion = $(this);
		$allHeaders = $currQuestion.find('.col-legend, .top-legend .legend');
		$allRows = $currQuestion.find(".even:has('input:radio'), .odd:has('input:radio')");

		$goodColInd = [];
		$goodCols = [];
		
		$goodRowInd = [];
		$goodRows = [];
		
		$allHeaders.each(function() {
			if (!$(this).find("span:contains('TERM')").length) {
				$goodColInd.push($allHeaders.index($(this)));
				$goodCols.push($ (this));
			}
		});
		
		$allRows.each(function() {
			if (!$(this).find("span:contains('TERM')").length) {
				$goodRowInd.push($allRows.index($(this)));
				$goodRows.push($ (this));
			}
		});
		
		if ($currQuestion.find('.groupingRows').length) {
			
			//console.log($goodRowInd);
			
			for (var currTRE in $goodRowInd) {
				var currTR = $allRows.eq($goodRowInd[currTRE]);
				
				//console.log(currTRE);

				if (!currTR.find(".row-legend span:contains('TERM')").length) {
					var item = $goodColInd[Math.floor(Math.random()*$goodColInd.length)];
					var clickableArea = currTR.find('.groupingRows:has(input:radio)').eq(item);

					var clickRadio = clickableArea.find('input:radio');
					if (!clickRadio.is(':checked')) {
						clickRadio.parent().click();
					}

					currTR.find('.oe-left, .text').each(function() {
						setOE($(this));
					});
				}
			}
		} else {
			if ($goodCols.length) {
				for (var currColI in $goodColInd) {
					
					var currCol = $allHeaders.eq($goodColInd[currColI]);
					
					var item = $goodRowInd[Math.floor(Math.random()*$goodRowInd.length)];
					var currInd = $allHeaders.index(currCol);
					var currRow = $allRows.eq(item);
					
					if ($.inArray(currInd, $goodColInd) != -1) {
					
						var clickableArea = $allRows.eq(item).find('.groupingCols:has(input:radio)').eq(currInd);
						var clickRadio = clickableArea.find('input:radio');
						
						if (!clickRadio.is(':checked')) {
							clickRadio.parent().click();
						}

						currCol.find('.oe-left, .text, input:text').each(function() {
							setOE($(this));
						});
					}
				}
			} else {
				var item = $goodRowInd[Math.floor(Math.random()*$goodRowInd.length)];
				
				var clickableArea = $allRows.eq(item);
				var clickRadio = clickableArea.find('input:radio');
				
				if (!clickRadio.is(':checked')) {
						if (clickRadio.closest('.even, .odd').find('.fir-icon').length) {
							clickRadio.closest('.even, .odd').find('.fir-icon').click();
						} else {
							clickRadio.click();
						}
					}

				clickableArea.find('.oe-left, .text, input:text').each(function() {
					setOE($(this));
				});
				
			}
		}
		
	});
}


function fillCheckBox(atmost,atleast,exactly){
    if (exactly){
        atleast = atmost = exactly;
    }
    if (!atleast){
        atleast=1;
    }
    if (!atmost){
        atmost=atleast;
    }

        var $tr = $(".answers .even, .answers .odd");
        $tr.find("input:checkbox").prop('checked', false).change();
        
        var allCheckbox = $tr.has("input:checkbox"); //not($tr.has("input:text"))

        var allterms = allCheckbox.has("span:contains('TERM')");
        var notTerms = allterms.has("span[title*='not']");
        var notTermsnotNoAnswers = notTerms.not(notTerms.find(".naRow, .no-answer"));
        var trs = allCheckbox.not(allCheckbox.has("span:contains('TERM')"));
        var notNoAnswers = trs.not(allCheckbox.has(".naRow, .no-answer"));


        if (notTermsnotNoAnswers.length){
            trs = notTermsnotNoAnswers;
        }else if (notTerms.length){
            trs = notTerms;
        }else{
            trs = notNoAnswers;
        }


        notexclusive = trs.has('input:checkbox:not(.exclusive)');

        if (notexclusive.length){
            trs = notexclusive;
        }


        $tableheaders = $('.survey-q-grid-collegend, .col-legend');
        if ($tableheaders.length){

            if (    $("h3.survey-q-error-text:contains('in this column')").length || 
                    (
                        ($('.col-legend.hasError').length != $('.col-legend').length) && 
                        $('.col-legend.hasError').length
                    ) 
                ){
                for (var i=0;i<atmost;i++){
                    trs.eq(i).each(function(){
                        fillOE($(this));
                        $(this).find("input:checkbox").click();
                    });
                }
            }else{
                trs.each(function(){
                    fillOE($(this));
                    for (var i=0;i<atmost;i++){
                        $(this).find("input:checkbox").eq(i).click();
                    }
                });
            }

        }
        else{
            for (var i=0;i<atmost;i++){
                trs.eq(i).each(function(){

                    fillOE($(this));
                    $(this).find("input:checkbox").click();
                });
            }
        }

}

function fillSelect(maxranks,unique){
    if (maxranks){
        for (var i=0;i<=maxranks;i++)
        {
            $('select').eq(i).val(i);
        }
    }
    else if (unique == 'cols'){
        for (var i=0;i<=$('select').length;i++)
        {
            $('select').eq(i).val(i);
        }
    }
    else{
        $('select').val($('select option').eq(1).val());
    }
}


function fillNext(){
    fillPage();
    //Doesn't actually do anything because the pause is too short and aren't checking status
    //setTimeout(function(){},0);
    nextPage();

}

function nextPage(){
    $('input:submit').removeAttr('disabled').click();

    //for apple study
    $('button:submit').removeAttr('disabled').click();

    //for quotas popups
    $('button.ui-button').click()
}

function straightLine(index){
   index -= 1;
    $('.even, .odd').each(function(){
           $('input:radio:eq(' + index + ')', $(this)).click();
   });
   //nextPage();
}

function toggleRandomization(){
    disableRandomization();
}

function disableRandomization(){
    javascript:jQuery.fn.sortElements=(function(){
        var sort=[].sort;
        return function(comparator,getSortable){
            getSortable=getSortable||function(){
                return this;
            };
            var placements=this.map(function(){
                var sortElement=getSortable.call(this),parentNode=sortElement.parentNode,nextSibling=parentNode.insertBefore(document.createTextNode(""),sortElement.nextSibling);
                return function(){
                if(parentNode===this){
                    throw new Error("Cannot disable random rows.");
                }
                parentNode.insertBefore(this,nextSibling);
                parentNode.removeChild(nextSibling);
                };
            });
            return sort.call(this,comparator).each(function(i){
                placements[i].call(getSortable.call(this));
            });
        };
    })();
    
    if (true){
        $(".even").add(".odd").sortElements(function(a,b){
            function isNum(x){
                return isNaN(x-0);
            }
            x=$(a).text().trim().replace("[r","").replace(new RegExp("].*|\n\r*.*","g"),"");
            y=$(b).text().trim().replace("[r","").replace(new RegExp("].*|\n\r*.*","g"),"");
            if(isNum(x)){
                return x>y?1:-1;
            }
            else{
                return parseInt(x)>parseInt(y)?1:-1;
            }
        });void(0);
    }
}





}
