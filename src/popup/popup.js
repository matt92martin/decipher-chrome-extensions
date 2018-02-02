(function($){
    'use strict';

    $(function(){

        var browser = browser || chrome;
                
        let cached_bookmarks = [];
        const bookmark_search = $('.bookmark-search');
        const bookmark_list = $('.bookmark-list');


        function filter(obj, search){
            const book_title = obj.title.toLowerCase();
            const searchlow = search.toLowerCase();

            if ( book_title.indexOf(searchlow) !== -1 ){
                return true;
            }
            return false;
        }


        function filter_bookmarks(array){
            const search = bookmark_search.val();
            return array.filter((obj) => { return filter(obj, search); });
        }

        
        function list_bookmarks(){

            bookmark_list.find('.book-wrap').remove();
            let filtered_books = filter_bookmarks(cached_bookmarks);
            
            var div, abook;

            for (let book of filtered_books) {
                
                div = $('<div/>', { 
                    'class': "book-wrap",
                })
                .data(book)
                .text(book.title);

                bookmark_list.append(div);
            }
            move(1);
        }


        function flatten_bookmarks(bookmarks){

            let books = [];
            function flatten(bookmarks){

                for (let book of bookmarks){
                    if ( book.url && !/^(javascript:|place:|data:)/i.test(book.url) ){
                        books.push(book);

                    }

                    if (book.children){
                        flatten(book.children);
                    }
                }
            }

            flatten(bookmarks.folders);
            return books;

        }
        

        function get_all_bookmarks(){
            return new Promise((res, rej) => {
                browser.runtime.sendMessage({
                    type: 'bookmarks'
                },
                (response) => {
                    res(flatten_bookmarks(response));
                });
            })     

        }


        function update_bookmark_list() {
            get_all_bookmarks().then((response) => {
                
                cached_bookmarks = response;
                list_bookmarks();

            });
        }

        update_bookmark_list();

    
        function gotourl(){
            let that = $(this);
            browser.tabs.create({
                active: true,
                url: that.data('url')
            });
            window.close();
        }

        function move(direction){
            let books = bookmark_list.find('.book-wrap');
            let selected = $('.selected');
            let idx = books.index(selected);
            
            const newidx = idx + direction;
            const newselected = books.eq(newidx);
            
            if ( ( newidx >= 0 ) && newselected && ( newidx <= ( books.length - 1 ) ) ){
                selected.removeClass('selected');
                newselected.addClass('selected');
            }
            
        }

        function list_action(e){
            if ( 38 === e.keyCode ){
                e.preventDefault();
                return e.type === 'keydown' ? move(-1) : null;
            } else if ( 40 === e.keyCode ) {
                e.preventDefault();
                return e.type === 'keydown' ? move(1) : null;
            } else if ( 13 === e.keyCode ){
                gotourl.call( $('.book-wrap.selected') );
            }
            list_bookmarks();
        }

        function updateSingleBookmark(book){
            console.log(book);

            var formData = $('#update-bookmark-form').serializeArray().map((data) => {
                var obj = {};
                obj[data.name] = data.value;
                return obj;
            })
            .reduce((data, obj) => {
                return Object.assign(obj, data);
            }, {});

        }

        function updateBookmark() {
            
        }

        function mouse(e){
            switch (e.which) {
                case 3:
                    updateSingleBookmark($(this).data());
                    break;
                default:
                    // gotourl();
                    break;
            }
        }

        bookmark_search.on('keydown keyup', list_action);
        bookmark_list.on('mousedown', '.book-wrap', mouse);
        bookmark_list.contextmenu(() => { return false; });

        // Takes a bit for the popup to load even though the page says it loaded    
        setTimeout(() => {
            $(".bookmark-search").focus();
        }, 100);

    });

})(jQuery);