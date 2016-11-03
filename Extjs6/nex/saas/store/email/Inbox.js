Ext.define('saas.store.email.Inbox', {
    extend: 'Ext.data.Store',

    alias: 'store.saas.inbox',

    model: 'saas.model.email.Email',

    pageSize: 20,

    autoLoad: true,

    proxy: {
        type: 'api',
        url: '~saas/email/inbox'
    }
});
