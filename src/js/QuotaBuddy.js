(function(window, $){
	
	function define_quotabuddy(){
		// var that = this;
		// that.opt = typeof( arguments[ 0 ] ) === "object" ? arguments[ 0 ] : {};
		
		var QuotaBuddy = {
			
			
			url1: function(){
				return window.location.href;
			},
            
            
			url_host: function(){
				return window.location.host;
			},
			
            
			injectJs: function(srcFile) {
				var src = document.createElement('script');
				src.textContent = srcFile;
				document.body.appendChild(src);
			},
			
            
			gotoquota: function gotoquota(el) {
				var eel  = $(el);
				var eli  = eel.attr('class');
				var elid = $('#' + eli);
				var elgo = eel.data('goto');
				
				if ( elid.is(':visible') ) {
					window.location.hash = '#' + elgo;
				} else {
					var _thisclick = elid.prev('h2').find('a').get(0);
					_thisclick.click();
					window.location.hash = '#' + elgo;
				}
			},
            
			
			HideShowAll: function(type) {
				var allDivs = $('div[id^="div"]');
				allDivs.each(function () {
					var _thisDiv = $(this);
					if (_thisDiv.is(type)) {
						var thisclick = _thisDiv.prev('h2').find('a').get(0);
						thisclick.click();
					}
				});
			},
			
            
			searchQuotas: function() {
				var searchVal = $(this).val().toLowerCase();
				var searchTRs = $('#qbTable').find('table tr');
                
				searchTRs.each(function () {
					var _this    = $(this);
					var _thisVal = _this.find('a').text().toLowerCase();
                    
					if (_thisVal.indexOf(searchVal) > -1 || _this.hasClass('quotaTogglersHead') ) {
						_this.show();
					} 
                    else {
						_this.hide();
					}
				});
			},
			
			
			//cancel editing cell
			escape: function() {
				if (this.url1().indexOf('tab=quota') != -1) {
					$("#saveCancel").find('button.secondary').click();
				}
			},
			
			//edit quotas
			edit: function() {
				if (this.url1().indexOf('tab=quota') != -1) {
					$("#editQuotas").click();
				}
			},
            
            
            init: function(){
                
                var _this = this;
				
                var quotaBuddyHtml = `
                <div id="quotaBuddy">
                <div id="qbHead">
                <div id="qbSearch"><input type="text" name="quotaLU" placeholder="Quota Buddy" /></div>
                <div class="spQB">
                <button id="hideAll" class="spQBa qbred">-</button>
                <button id="showAll" class="spQBa qbgreen">+</button>
                </div>
                </div>
                <div class="clear"></div>
                <div id="qbTable">
                <table></table>
                </div>
                </div>
				<div id="toggleQuotabuddy" class="qbshow">&gt;</div>`;
                
				$(quotaBuddyHtml).insertAfter('#fwheader');
				
				$('#hideAll').on('click', _this.HideShowAll.bind(_this, ':visible'));
				$('#showAll').on('click', _this.HideShowAll.bind(_this, ':hidden'));
				this.injectJs(_this.gotoquota);
				
				var qBuddy     = $('div#quotaBuddy'),
                qBuddyTdiv = $('#qbTable'),
                qBuddyT    = qBuddyTdiv.find('table'),
                qTables    = $('table.nquota'),
                tabContent = document.getElementById("tab-content").getBoundingClientRect(),
                qWidth     = (tabContent.left - 10);
				
				qBuddy.css({
					'position': 'absolute',
					'height'  : ($(window).height() - 33) + "px",
					'width'   : qWidth + "px"
				});
				qBuddyTdiv.css({'height': ($(window).height() - 58) + "px"});
				
				
				$('#toggleQuotabuddy').on('click', function () {
					var togQB = $(this);
					
					if (togQB.hasClass('qbshow')) {
						qBuddy.hide();
						togQB.hide();
						togQB.text('>');
						togQB.css({
							'opacity': 0.5,
							'left'   : 0
						});
						togQB.show('slide');
						togQB.toggleClass('qbshow');
						
					} else {
						togQB.css({'left': qWidth});
						togQB.toggleClass('qbshow');
						togQB.text('<');
						qBuddy.show();
						
					}
				}).trigger('click');
				
				var quotaSheets = [];
				qTables.each(function () {
					var $this       = $(this);
					var _thisid     = $this.get(0).id;
					var _thisSheet  = $this.parent('div').prev().find('span').text();
					var _thisHidDiv = $this.parent('div').get(0).id;
					var _thisText   = $this.find('.nquotaDescription').text();
					
					var rowtext = `
                    <tr>
                    <td class="quotaTogglers">
                    <a  href="javascript:void(0)" class="`+ _thisHidDiv +`" data-goto="`+ _thisid +`" onclick="gotoquota(this)"
                    >`+ _thisText +`</a>
                    </td>
					</tr>`;
                    
					if (quotaSheets.indexOf(_thisSheet) == -1) {
						var sheetText = `<tr class="quotaTogglersHead"><td>` + _thisSheet.replace(/^sheet: /, '') + `</td></tr>`;
						quotaSheets.push(_thisSheet);
						rowtext = sheetText + rowtext;
					}
					qBuddyT.append(rowtext);
				});
				
				var qbSearch = $('#qbSearch').find('input');
				qbSearch.on('keyup', _this.searchQuotas);
                
                
                var editor = $("#_editor");
                //when tab is pressed move to next input
                editor.on('keydown', function (e) {
                    var that = $(this);
                    if (e.keyCode == 9) { //tab
                        $('#_save').click();
                        var curindex = parseInt(JSON.parse(localStorage.getItem('quotaIndex')));
                        var nextindex = e.shiftKey ? curindex - 1 : curindex + 1;

                        $('tbody td.editable').removeClass('highlightEdit');
                        $('[tabindex=' + nextindex + ']').addClass('highlightEdit').focus().click();
                        e.preventDefault();
                    }
                });
                
                
                // set up tab indexes
                $("tbody td.editable").each(function (i) {
                    $(this).attr('tabindex', i + 1);
                });
                
                $("tbody td.editable").on('click', function(){
                    $(this).addClass('highlightEdit');
                    localStorage.setItem( 'quotaIndex', JSON.stringify($(this).attr('tabindex')) );
                    
                    setTimeout( function(){ $('#_editor').focus() }, 50);
                });
            }
            
            
        };
        
        return QuotaBuddy;
    }
    
    
    
    if ( typeof( QuotaBuddy ) === 'undefined' ){
        window.QuotaBuddy = define_quotabuddy();
    }
})( window, jQuery );