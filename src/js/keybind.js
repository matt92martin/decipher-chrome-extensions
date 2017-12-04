
(function(window, $){
	
	function define_keybinds(){
		
		var Keybinds = {
			
			map: {},
			interv: undefined,

			mapKeys: function (e, callback) {
				clearTimeout(this.interv);

				this.map[e.keyCode] = e.type === 'keydown';
				this.interv = setTimeout(() => {
					this.map = {};
				}, 1000);
				callback(e);
			},
			
			foundMatch: function(callback, extra){
				
				const event = extra.ev;
				condition   = ( extra.cond === undefined ) ? true : extra.cond;

				if ( typeof(condition) === 'array' ){
					for (var cond of condition) {
						if ( cond === false ){
							condition = false;
							break;
						}
					}
				}
				
				if ( !!condition ){
					event.preventDefault();
					event.stopPropagation();
					callback();					
				}
			},
			
			// Map keycode to their readable counterparts
			mapToReadable: function(selkey) {
				var alias = {
					//Modifiers
					"shift": 16, "ctrl": 17, "alt": 18, 'esc': 27,
					//Digits
					"1" : 49, "2": 50, "3": 51, "4": 52, "5": 53, "6": 54, "7": 55, "8": 56, "9": 57, "0": 48,
					//Letters
					"a"    : 65, "b": 66, "c": 67, "d": 68, "e": 69,
					"f"    : 70, "g": 71, "h": 72, "i": 73, "j": 74,
					"k"    : 75, "l": 76, "m": 77, "n": 78, "o": 79,
					"p"    : 80, "q": 81, "r": 82, "s": 83, "t": 84,
					"u"    : 85, "v": 86, "w": 87, "x": 88, "y": 89, "z": 90,
					"left" : 37,
					"up"   : 38,
					"right": 39,
					"down" : 40
				};
				return this.map[selkey] || this.map[alias[selkey]];
			},
			
			// Test a list of keys to see which are held down according to `map`
			test_keys: function() {
				for ( let key of arguments ) {
					if ( !this.mapToReadable( key ) ) {
						return false;
					}
				}
				return true;
			}
			
			
		};
		return Keybinds;
	}
	
	if ( typeof( KeyBinds ) === 'undefined' ){
		window.KeyBinds = define_keybinds();
	}
})( window, jQuery );