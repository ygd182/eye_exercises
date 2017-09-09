

var modalView = (function ModalView() {

    'use strict';

    var _options = {
        title: 'Confirm',
        bodyTitle: 'Are you sure?',
        body: 'Are you sure?',
        confirm_color: 'primary',
        confirm_text: 'Yes',
        cancel_color: 'default',
        cancel_text: 'No'
    };

    var _confirmCb = null;

    /**
     * Handles the success of the _confirmCb
     *
     */
    function successHandler() {
        $('#js-modal-container').modal('toggle');
    }


    /**
     * Handles the error on the modal. If an action is needed after the error is thrown
     *
     * @param {Object} error jqXHR object
     */
    function errorHandler(error) {
        console.log('Error message: ' + error.status + ' ' + error.responseText);
        $('#js-modal-container').modal('toggle');
    }

    /**
     * Binds the buttons actions, the validation and the summit action
     *
     * @param {Object} $el
     */
    function bindButtonsActions($el) {
        var submitButton = $el.find('#js-support-confirm-button');

        $(submitButton).on('click', function(e) {
            e.preventDefault();
            _confirmCb(successHandler, errorHandler);
        });
    }

    /**
     * Bind all the interaction with the modal, validations and model as a listener.
     *
     * @param {Object} $el
     */
    function bind($el) {
        bindButtonsActions($el);
    }

    var modal = {
        $el: null,
        _template: null,

        /**
         * Initialize view variables
         *
         * @param {Object} el: container element
         * @param {Object} template: template element
         */
        init: function init(el, template) {
            this.$el = $(el);
            this._template = template;
        },

        /**
         * Set modal parameters
         *
         * @param {Object} opts.
         */
        options: function options(opts) {
            _options = opts || _options;
        },

        /**
         * Set modal title
         *
         * @param {Object} title.
         */
        setTitle: function setTitle(title) {
            _options.title = title;
        },

        /**
         * Set the body first message
         *
         * @param {String} bodyTitle
         */
        setBodyTitle: function setBodyTitle(bodyTitle) {
            _options.bodyTitle = bodyTitle;
        },

        /**
         * Set modal body
         *
         * @param {Object} body.
         */
        setBody: function setBody(body) {
            _options.body = body;
        },

        /**
         * Set Succes action if user clicks yes
         *
         * @param {Object} cb callback to execute if user confirms action.
         */
        bindConfirmAction: function bindConfirmAction(cb) {
            _confirmCb = cb;
        },

        /**
         * Render in the html the template
         * @memberof Support.ModalView
         */
        render: function render(externalTemplate) {
            var template = externalTemplate || this._template;

            this.$el.html(Mustache.render(template, _options));
            bind(this.$el);
        },

        /**
         * Render in the html the template as notification and no optional actions to perform
         * @param {String} externalTemplate
         */
        renderAsNotification: function (externalTemplate) {
            this.render(externalTemplate);
            this.$el.find('#js-support-cancel-button').remove();
            this.$el.find('#js-support-confirm-button').text('Ok');
        },

        /**
         * Manually opens a modal.
         */
        show: function show() {
            this.$el.modal('show');
        }
    };
})();