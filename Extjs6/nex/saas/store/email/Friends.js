Ext.define('saas.store.email.Friends', {
    extend: 'Ext.data.Store',

    alias: 'store.saas.emailfriends',

    model: 'saas.model.email.Friend',

    autoLoad: true,

    proxy: {
        type: 'api',
        url: '~saas/email/friends'
    },

    sorters: {
        direction: 'DESC',
        property: 'online'
    }
});
