Ext.define('saas.view.email.FriendsListViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.saas.emailfriendslist',

    stores: {
        friends: {
            //Store reference
            type: 'saas.emailfriends',

            //Auto load
            autoLoad: true
        }
    }
});
