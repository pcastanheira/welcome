/* 
 created by pcosta @ 26/02/2014
 */
App.Html = Backbone.Model.extend({
    parse: function(response, options) {
        if (options.collection)
            return response;
        return response;
    },
    loadView: function(viewDataCollection,selectedData) {      
        var r = viewDataCollection.findWhere({valueId: selectedData});
        var htmlUrl = r.toJSON();
        
        return htmlUrl;
    }
});

