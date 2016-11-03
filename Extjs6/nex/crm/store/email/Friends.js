Ext.define('crm.store.email.Friends', {
    extend: 'Ext.data.Store',

    alias: 'store.crm.emailfriends',

    model: 'crm.model.email.Friend',


    autoLoad: true,

    proxy: {
        type: 'api',
        url: '~crm/email/friends'
    },

    sorters: {
        direction: 'DESC',
        property: 'online'
    }
});
