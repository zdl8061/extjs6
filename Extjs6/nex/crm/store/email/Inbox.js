Ext.define('crm.store.email.Inbox', {
    extend: 'Ext.data.Store',

    alias: 'store.crm.inbox',

    model: 'crm.model.email.Email',

    pageSize: 20,

    autoLoad: true,

    proxy: {
        type: 'api',
        url: '~crm/email/inbox'
    }
});
