Ext.define('saas.view.email.EmailModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.saas.email',

    stores: {       
        emails: {
            type: 'saas.inbox'
        }
    }
});
