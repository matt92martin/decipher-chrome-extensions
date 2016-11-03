$(function(){
    var list = $('#list').html();
    var add = $('#add').html();

    var listTemplate = Handlebars.compile(list);
    var addTemplate = Handlebars.compile(add);

    var main = $('#main');

    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    function getListData(){
        // return {title: "My New Post", body: "This is my first post!"};
        // chrome.storage.local.get({
        //     portal: data.portal,
        //     projectname: data.projectname,
        //     team: data.team,
        //     type: data.type,
        //     hours: data.hours,
        //     complexity: data.complexity,
        //     noq: data.noq,
        //     programmername: data.programmername,
        //     state: data.state,
        //     rdate: data.rdate,
        //     ddate: data.ddate,
        // }, null);
    }

    function renderList(){

        var context = getListData();
        main.html(listTemplate(context));

        $('#add-list-item').on('click', function(){
            renderAdd();
        });
    }

    function renderAdd(){

        var context = {test: 'Anything'};
        main.html(addTemplate(context));

        chrome.storage.sync.get({
            name: '',
            team: ''
        }, function(items){

            chrome.tabs.query({'active': true, 'lastFocusedWindow': true},
                function(tabs) {

                    var url = tabs[0].url;

                    if (url.indexOf('decipherinc') != -1){

                        var path = url.split('selfserve')[1];
                        var server = url.split('.decipherinc')[0].split(/http(?:s):\/\//)[1];

                        var portal = `https://${server}.decipherinc.com/apps/portal/#/projects/detail/selfserve${path}`;
                        document.getElementsByName('portal')[0].value = portal ? portal : '';
                    }
                });

            var today = new Date();

            document.getElementsByName('uniqueID')[0].value = guid();
            document.getElementsByName('rdate')[0].value = today.getMonth() + "-" + today.getDate() + "-" + today.getFullYear();
            document.getElementsByName('programmername')[0].value = items.name;
            document.getElementsByName('team')[0].value = items.team;
        });

        $('#form').on('submit', function(e){
            var form = $(this).serializeArray();
            var data = {};
            form.map(function(d){
                data[d.name] = d.value;
            });
            setNew(data);
            renderList();
            e.preventDefault()
        });
    }



    function setNew(data) {

        // chrome.storage.local.set({
        //     portal: data.portal,
        //     projectname: data.projectname,
        //     team: data.team,
        //     type: data.type,
        //     hours: data.hours,
        //     complexity: data.complexity,
        //     noq: data.noq,
        //     programmername: data.programmername,
        //     state: data.state,
        //     rdate: data.rdate,
        //     ddate: data.ddate,
        // }, null);
    }


    renderList();


});
