Ext.define('saas.view.email.FriendsList', {
    extend: 'Ext.menu.Menu',

    alias: 'widget.saas.friend',

    viewModel: {
        type: 'saas.emailfriendslist'
    },

    controller: 'saas.emailfriendslist',

    title: 'SAAS_Friends',

    cls: 'navigation-email',

    iconCls: 'x-fa fa-group',

    floating: false
});
