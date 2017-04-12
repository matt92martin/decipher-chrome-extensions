(function(window, $){
	
	function define_shortcuts(){
		// var that = this;
		// that.opt = typeof( arguments[ 0 ] ) === "object" ? arguments[ 0 ] : {};
		
		var ShortCuts = {
			
			
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
			
			gotoquota: function(el) {
				var eel  = $(el);
				var eli  = eel.attr('class');
				var elid = $('#' + eli);
				var elgo = eel.data('goto');
				
				if (elid.is(':visible')) {
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
					if (_thisVal.indexOf(searchVal) > -1) {
						_this.show();
					} else {
						_this.hide();
					}
				});
			},
			
			//start quota stuff
			//quotaBuddy
			/*
			todo
			if (url1().indexOf('tab=quota') != -1) {
				
				var quotaBuddyHtml = `<div id="quotaBuddy">
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
				
				$('#hideAll').on('click', HideShowAll.bind(null, ':visible'));
				$('#showAll').on('click', HideShowAll.bind(null, ':hidden'));
				injectJs(gotoquota);
				
				var qBuddy     = $('div#quotaBuddy');
				var qBuddyTdiv = $('#qbTable');
				var qBuddyT    = qBuddyTdiv.find('table');
				var qTables    = $('table.nquota');
				var tabContent = document.getElementById("tab-content").getBoundingClientRect();
				var qWidth     = (tabContent.left - 10);
				
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
					var _this       = $(this);
					var _thisid     = _this.get(0).id;
					var _thisSheet  = _this.parent('div').prev().find('span').text();
					var _thisHidDiv = _this.parent('div').get(0).id;
					var _thisText   = _this.find('.nquotaDescription').text();
					
					var rowtext = `<tr>
					<td class="quotaTogglers">
					<a  href="javascript:void(0)"
					class="` + _thisHidDiv + `"
					data-goto="` + _thisid + `"
					onclick="gotoquota(this)"
					>` + _thisText + `</a>
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
				qbSearch.on('keyup', searchQuotas);
			}
			*/
			
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
			/*
			todo
			if (url1().indexOf('tab=quota') != -1) {
				
				var curindex  = 0;
				var previndex = 0;
				var editor    = $("#_editor");
				
				//when cell is clicked
				$("#editQuotas").click(
				function () {
					$('td.editable').click(
					function () {
						window.setTimeout(highlightText, 0);
						//var index = $("td.editable").index(this);
					}
					);
				}
				);
				
				
				//when tab is pressed move to next input
				editor.keydown(
				function (e) {
					if (e.keyCode == 9) {//tab
						$('#_save').click();
						
						var newindex = curindex + 1;
						$('[tabindex=' + newindex + ']').focus().click();
						
						window.setTimeout(highlightText, 0);
						
						if (e.preventDefault) {
							e.preventDefault();
						}
						return false;
					}
				}
				);
				*/
				
				//move editor and highlight input
				highlightText: function() {
					if (!editor.is(":focus")) {
						previndex = curindex;
						curindex  = document.activeElement.tabIndex;
						
						$('[tabindex=' + previndex + ']').css("border", "");
						$('[tabindex=' + curindex + ']').css("border", "5px black solid");
						
						$("#_editor").select();
						$("#editor").offset({top: 100, left: 800});
						
					}
				},
				
				/*
				editor.focusout(function () {
					//$('[tabindex=' + curindex + ']').focus();
				});
				*/
				
				//selects cell
				clickit: function (e, that) {
					if (e.keyCode == 13) {//enter
						$(that).click();
						window.setTimeout(this.highlightText, 0);
					}
				},
				
				//set up tab indexes
				// todo	
				// $("td.editable").each(
				// 	function (i) {
					// 		$(this).attr('tabindex', i + 1);
					// 		$(this).attr('onkeydown', "clickit(event,this)");
					// 	}
					// );
					
					
					baseURL: function(){
						return window.location.protocol + '//' + this.url_host() + '/';
					},
					
					goTO: function(front, back) {
						var projectAddress = this.getProject();
						
						if (projectAddress) {
							var url = this.baseURL() + front + projectAddress + back;
							window.location.href = url;
						}
					},
					
					startAtPage: function() {
						var value = prompt('Which question should I start at?', 'Q');
						if (value) {
							this.goTO('survey', '?&start-at=' + value);
						}
					},
					
					goToPage: function() {
						var value = prompt('Which question should I go to?', 'Q');
						if (value) {
							this.goTO('survey', '?&start-at=' + value + '&stop-at=' + value + '&debug=flow');
						}
					},
					
					getProject: function() {
						var url = window.location.href;
						
						if (url.match(/(takesurvey\/|survey\/|report\/|rep\/|filemanager\/)/)) {
							url     = window.location.protocol + '//' + window.location.host + window.location.pathname;
							urlback = url.split(/\/filemanager|\/report|\/rep|\/survey|\/takesurvey/)[1];
							urlback = urlback.split('?')[0];
							urlback = urlback.split(':')[0];

							return urlback;
							
						} else if (url.match(/(\/admin\/vc\/list|detail\/|admin\/sst\/list)/)) {
							var url = window.location.href;
							urlback = url.split(/file\=|survey\=|\/detail/)[1];
							
							if (url.match(/(\/admin\/vc\/list)/)) {
								var urlback = urlback.substring(0, urlback.lastIndexOf("/"));
							}
							
							//Ensuring that we only have 1 leading "/"
							return "/" + urlback.replace(/^[\/]+|[\/]+$/, '');
						}
						
						return "";
					}
					
					
				};
				
				return ShortCuts;
			}
			
			
			
			if ( typeof( ShortCuts ) === 'undefined' ){
				window.ShortCuts = define_shortcuts();
			}
		})( window, jQuery );