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
			url_no_host: function(){
				return window.location.pathname + window.location.search;				
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
			
			getState: function(){
				var state = $('input[name="state"]').val();
				prompt('', location.protocol + '//' + location.host + location.pathname + '?state=' + state);
				return true;
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
			
			
			//cancel editing cell
			escape: function() {
				if (this.url_no_host().indexOf('tab=quota') != -1) {
					$("#saveCancel").find('button.secondary').click();
				}
			},
			
			//edit quotas
			edit: function() {
				if (this.url_no_host().indexOf('tab=quota') != -1) {
					$("#editQuotas").click();
				}
			},
			
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
			
			
			//selects cell
			clickit: function (e, that) {
				if (e.keyCode == 13) {//enter
					$(that).click();
					window.setTimeout(this.highlightText, 0);
				}
			},
			
			baseURL: function(){
				return window.location.protocol + '//' + this.url_host() + '/';
			},
			
			goTO: function(front, back, leading) {
				leading = (leading === undefined || leading === true) ? '/' : '';
				var projectAddress = this.getProject();
				
				if (projectAddress) {
					var url = this.baseURL() + front + leading + projectAddress + back;
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
				var url = this.url_no_host();
				
				if ( url.match(/(takesurvey\/|survey\/|report\/|rep\/|filemanager\/)/) ) {
					url     = window.location.protocol + '//' + window.location.host + window.location.pathname;
					urlback = url.split(/\/filemanager|\/report|\/rep|\/survey|\/takesurvey/)[1];
					urlback = urlback.split('?')[0];
					urlback = urlback.split(':')[0];
					
					return urlback.replace(/^[\/]+|[\/]+$/, '');;
					
				} else if ( url.match(/(\/admin\/vc\/list|detail\/|admin\/sst\/list)/) ) {
					url = window.location.href;
					urlback = url.split(/file\=|survey\=|\/detail/)[1];
					
					if ( url.match(/(\/admin\/vc\/list)/) ) {
						urlback = urlback.substring( 0, urlback.lastIndexOf("/") );
					}
					
					return urlback.replace(/^[\/]+|[\/]+$/, '');

				} else if ( window.location.href.match( 'projects\/detail' ) ){
					url = window.location.hash;
					urlback = url.split(/projects\/detail/)[1];
					urlback = urlback.split('?')[0];
					urlback = urlback.split(':')[0];

					return urlback.replace(/^[\/]+|[\/]+$/, '');

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