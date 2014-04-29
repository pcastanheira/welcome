if(typeof App === 'undefined') {
    var App = {};

    App.vent = _.extend({}, Backbone.Events);

    App.Main = {
        JST: {}
    };
}

/*DEV*/
/*

require(['/js/models/CallBackResultModel.js',
         '/js/welcome/router/WelcomeRouter.js',
         '/js/welcome/models/SignUpModel.js',
         '/js/welcome/views/SignUpView.js',
         '/js/welcome/views/WelcomeView.js',
         '/js/welcome/views/WindowView.js',
         '/js/welcome/views/InfoView.js'],

         function() {
             var r  = new App.WelcomeRouter();
             var m1 = new App.SignUpModel();

             var v1 = new App.SignUpView({model:m1});
             var v2 = new App.WindowView();
         }
);

//UI
*/

require(['../js/models/CallBackResultModel.js',
         '../js/welcome/router/WelcomeRouter.js',
         '../js/welcome/models/SignUpModel.js',
         '../js/welcome/views/SignUpView.js',
         '../js/welcome/views/WelcomeView.js',
         '../js/welcome/views/WindowView.js',
         '../js/welcome/views/InfoView.js'],

         function() {
             var r  = new App.WelcomeRouter();
             var m1 = new App.SignUpModel();

             var v1 = new App.SignUpView({model:m1});
             var v2 = new App.WindowView();
         }
);


Main = {
    waitForBootboxToStart: function(fn) {
        var refresh = setInterval(function() {
            var _bootbox = $('.bootbox');

            if (_bootbox && _bootbox.length > 0) {
                clearInterval(refresh);
                fn();
            }
        }, 100);
    },
    bootboxFooter: function() {
        return $('.bootbox').find('.modal-footer');
    },
    bootboxBody: function() {
        return $('.bootbox').find('.bootbox-body');
    },
    bootboxInput: function() {
        return $('.bootbox').find('.bootbox-input-text');
    },
    bootboxSetInput: function(text) {
        this.bootboxInput().val(text);
    }
}