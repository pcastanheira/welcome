/**
 *
 * @type {*|void}
 */
App.SignUpView = Backbone.View.extend({
    el: "#signUpContainer",
    initialize: function() {
        if(!Backbone.emulateJSON) {
            Backbone.emulateJSON = true;
        }
    },
    events: {
        'click #signUpButton': 'formSubmitted'
    },
    /**
     * Submeter os dados
     *
     * @param event
     */
    formSubmitted: function(event) {
        event.preventDefault();

        var result   = new App.CallBackResultModel();
        var data     = Backbone.Syphon.serialize(this);
        var dialogue = $("#dialogueResultSignUp");
        __this       = this;

        var xhr      = this.model.save(data,
            {
                success: function(model, response) {
                    result.setResult(response);

                    dialogue.find('i').removeClass().addClass(result.iClass);
                    dialogue.find('.note').removeClass().addClass(result.divClass).addClass('note');
                    dialogue.find('.content').text(result.getMessage());
                },
                error: function(response) {
                    result.setResult(response);
                    result.setType('error').setClassesOnType();

                    dialogue.find('i').removeClass().addClass(result.iClass);
                    dialogue.find('.note').removeClass().addClass(result.divClass).addClass('note');
                    dialogue.find('.content').text(result.getMessage());

                    __this.onError(xhr);
                }
            }
        ); // fim save
    },
    onError: function(xhr) {
        $("#dialogueResultSignUp").find('.content').appendText(xhr);
    }

});