/* 
created by pcosta @ 24/02/2014
 */

App.WelcomeRouter = Backbone.Router.extend({
    
    initialize: function(){
        
    },
    
    routes: {
        '':'home',
        'about': 'about',
        'login': 'login',
        'sign-up':'signUp',
        'info-people':'menuPeople',
        'info-business':'menuBusiness',
        'info-npo':'menuNpo',
        'info-developers':'menuDevelopers'
    },

    home: function(){
        console.log('at route home');

    },

    about: function(){
        console.log('at route about'); 
        App.vent.trigger('state:event', 'about');
    },

    login: function(){
        console.log('at route login');
        App.vent.trigger('state:event', 'login');
    },

    signUp: function(){
        App.vent.trigger('state:event', 'sign-up');
    },

    menuPeople: function(){
        console.log('at route menuPeople');
        App.vent.trigger('state:event', 'info-people');
    },

    menuBusiness: function(){
        console.log('at route menuBusiness');
        App.vent.trigger('state:event', 'info-business');
    },

    menuNpo: function(){
        console.log('at route Npo');
        App.vent.trigger('state:event', 'info-npo');
    },

    menuDevelopers: function(){
        App.vent.trigger('state:event', 'info-developers');
    }
});
