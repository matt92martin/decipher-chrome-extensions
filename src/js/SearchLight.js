(function(window, $){

    function define_searchlight(){

        var SearchLight = {

            showInput: function(){
                var cancel = this.cancel.bind(this);
                var sl = $('#search-light');
                var slc = $('#sl-list-container')
                sl.removeClass('sl-hide');

                sl.find('input').val('').focus();

                this.sendFor('bookmarks').then(function(items){
                    var rows = [];
                    for (var i=0; i<items.length; i++){
                        var item = items[i];
                        rows.push(`<div data-url="${item.url}" title="${item.title}">${item.title}</div>`);
                    }
                    slc.append(rows);
                });

            },

            cancel: function(){
                $('#search-light').addClass('sl-hide');
            },

            flattenBookmarks: function(bookmarks){
                var that = this;
                var books = [];

                function flatten(bookmarks){
                    for (var i=0; i<bookmarks.length; i++){
                        var book = bookmarks[i];

                        if ( book.url && !book.url.startsWith('javascript:') ){
                            
                            books.push({
                                url: book.url,
                                title: book.title
                            });
                        }

                        if (book.children){
                            flatten(book.children);
                        }
                    }
                }
                flatten(bookmarks.folders);
                return books;

            },

            sendFor: function(type){
                var flattenBookmarks = this.flattenBookmarks.bind(this);
                var books = new Promise(function(res, rej){

                    chrome.runtime.sendMessage({
                        type: type
                    },
                    function(response){
                        var books = flattenBookmarks(response);
                        res(books);
                    });
                    
                });
                return books;
            },

            searchBooks: function(el){
                var sli = $('#sl-input');
                var slcd = $('#sl-list-container').find('div');
                
                var text = sli.val().toString().toLowerCase();
                if (text){
                    slcd.each(function(i, el){
                        var that = $(el);
                        
                        var title = that.text().toLowerCase();
                        var url = that.data('url').toLowerCase();

                        if ( title.indexOf(text) !== -1 || url.indexOf(text) !== -1 ){
                            that.removeClass('sl-hide');
                        }
                        else{
                            that.addClass('sl-hide');
                        }
                    });
                }
                else{ slcd.removeClass('sl-hide') }

            },

            throttle: function throttle(fn, threshhold, scope) {
                threshhold || (threshhold = 250);
                var last,
                    deferTimer;
                return function () {
                    var context = scope || this;

                    var now = +new Date,
                        args = arguments;
                    if (last && now < last + threshhold) {
                        // hold on to it
                        clearTimeout(deferTimer);
                        deferTimer = setTimeout(function () {
                            last = now;
                            fn.apply(context, args);
                        }, threshhold);
                    } else {
                        last = now;
                        fn.apply(context, args);
                    }
                };
            },
            selectBook: function(code, reset){
                reset || (reset = false);

                var move = (code === 40) ? 1 : -1;
                var slcd = $('#sl-list-container').find('div');
                var slcds = slcd.not('.sl-hide');
                var selected = slcd.filter('.selected');

                var current = slcds.index(selected);

                if (current === -1 || reset){
                    slcd.removeClass('selected');
                    slcds.eq(0).addClass('selected');
                } else {
                    selected.removeClass('selected');
                    slcds.eq(move + current).addClass('selected');
                }

            },

            insertDiv: function(){
                var mainDiv = `
                    <div id="search-light" class="sl-hide">
                        <div id="sl-container">
                            <div id="sl-input-container">
                                <input type="text" id="sl-input" />
                            </div>
                            <div id="sl-list-container"></div>
                        </div>
                    </div>`;
                $('body').append(mainDiv);

                var cancel = this.cancel.bind(this);
                var searchBooks = this.searchBooks.bind(this);
                var throttle = this.throttle.bind(this);
                var selectBook = this.selectBook.bind(this);

                var sl = $('#search-light');
                var sli = $('#sl-input');
                var slc = $('#sl-list-container')

                sl.on('click', function(){ if (event.target.id.toString() === "search-light"){ cancel() } });
                slc.on('click', 'div', function(){
                    var url = $(this).data('url');
                    window.open(url);
                    cancel();
                });
                sli.on('keydown', function(e){
                    var code = e.keyCode || e.which;

                    if ( code === 40 || code === 38){
                        selectBook(code);
                        return false;
                    } else if ( code === 13){
                        slc.find('.selected').click();
                    } else{
                        throttle(selectBook(40, true), 250);
                        throttle(searchBooks(e), 250);
                    }
                });
            },
            init: function(){
                this.insertDiv();

            }


        };
        return SearchLight;
    }

    if ( typeof( SearchLight ) === 'undefined' ){
        window.SearchLight = define_searchlight();
    }
})( window, jQuery );