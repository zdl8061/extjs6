Ext.define('saas.view.email.Email', {
    extend: 'Ext.container.Container',

    //xtype: 'crm.email',
    alias :'widget.saas.email',

    controller: 'saas.email',   

    //itemId: 'emailMainContainer',
    title: "SAAS Emails",    

    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    margin: '20 0 0 20',

    items: [       
        {
            xtype: 'inbox',
            itemId: 'contentPanel',
            margin: '0 20 20 0',
            flex: 1          
        }
    ]
});
