/* 
 created by pcosta @ 26/02/2014
 */
App.HtmlList = Backbone.Collection.extend({
    initialize: function (){
        
    },
    model : App.Html,
    url: '../js/welcome/json/html.json',
    parse: function(response) {
        return response.html;
    }
});


