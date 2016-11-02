$(function(){
    var list = $('#list').html();
    var add = $('#add').html();

    var listTemplate = Handlebars.compile(list);
    var addTemplate = Handlebars.compile(add);

    var main = $('#main');

    function getListData(){
        return {title: "My New Post", body: "This is my first post!"};
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
