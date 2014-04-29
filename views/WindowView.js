/**
 * Created pcosta on 21/02/14.
 *
 */

App.WindowView = Backbone.View.extend({
	el: window,
	welcomeView: null,
	initialize: function() {
        
        var __this = this;
        
        this.welcomeRouter = new App.WelcomeRouter();
        Backbone.history.start();
        
        this.welcomeView = new App.WelcomeView();
        this.welcomeView.vegasIn(null);
        //menu events
        this.welcomeView.menuBinds();
        this.welcomeView.submenuBinds();

        //sign up events
        $('.sign-close').add('.sign-up').click(function(evt) {
            evt.preventDefault();
            __this.welcomeView.signAction();
        });

        this.$el.bind('resize', { view: __this.welcomeView }, __this.welcomeView.dragWindow);

        this.$el.resize(function() {
            __this.welcomeView.centerElements();
        }).trigger('resize');
	},
	events: {
        'resize': 'resizeHandler'
	},
	resizeHandler: function(event) {
        event.data = { view: this.welcomeView };
        this.welcomeView.dragWindow(event);
	}
});

