Ext.define('crm.view.email.FriendsListViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.crm.emailfriendslist',

    stores: {
        friends: {
            //Store reference
            type: 'crm.emailfriends',

            //Auto load
            autoLoad: true
        }
    }
});
