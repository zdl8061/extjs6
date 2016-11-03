Ext.define('crm.view.email.EmailModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.crm.email',

    stores: {       
        emails: {
            type: 'crm.inbox'
        }
    }
});
