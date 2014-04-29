/* 
 Created by pcosta @ 24/02/14
 */
require(['../js/welcome/models/HtmlModel.js',
    '../js/welcome/collections/HtmlList.js']);

App.InfoView = Backbone.View.extend({
    el: $('.info-wrapper'),
    initialize: function() {
        var jsonData = null;
        var contentValue = null;
        var __this = this;
        var clickedItem = this.options.value;
        
        var resultModel = new App.Html();
        var resultFetch = new App.HtmlList();

        resultFetch.fetch({
            success: function(response) {
                contentValue = resultModel.loadView(response, clickedItem);
                __this.showContent(contentValue); 
            },
            error: function(response) {
                alert('error no response from server');
            }
        });
    },
    render: {
    },
    showContent: function(show) {
        $('.info-wrapper').load(show.url, function() {
            console.log(show);
        });
    }
});


