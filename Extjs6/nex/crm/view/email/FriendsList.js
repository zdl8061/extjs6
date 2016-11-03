Ext.define('crm.view.email.FriendsList', {
    extend: 'Ext.menu.Menu',

    alias: 'widget.crm.friend',

    viewModel: {
        type: 'crm.emailfriendslist'
    },

    controller: 'crm.emailfriendslist',

    title: 'CRM_Friends',

    cls: 'navigation-email',

    iconCls: 'x-fa fa-group',

    floating: false
});
