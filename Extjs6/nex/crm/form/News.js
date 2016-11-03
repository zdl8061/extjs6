Ext.define('crm.form.news', {
    extend: 'oa.component.TxForm',
    xtype: 'form.news',
    items: [{
        xtype: "container",
        layout: "hbox",
        items: [
            { xtype: "textfield", name: "Title", fieldLabel: "标题", allowBlank: false },
            { xtype: "datefield", name: "PostTime", fieldLabel: "发布时间" }
        ]
    }, {
        xtype: "textareafield",
        name: "Content",
        fieldLabel: "内容",
        height: 200
    }],
    onPostSuccess: function (form, action) { },

    onPostFail: function (form, action) { },

    buttons: [
        {
            xtype: "panel",
            name: 'result_status',
            border: false,
            itemId:'result_status'
        },
        {
            xtype: "button", text: "保存", name: "submit",itemId:"submit",handler: function () {            
                var me = this;
                var form = me.up("form").getForm();

                if (form.isValid()) {
                    me.setDisabled(true);
                    //debugger;
                    var btnCancel = me.up("form").down("[name=cancel]").setDisabled(true);
                    var status = me.up("form").down("[name=result_status]");
                    status.setHtml("正在保存信息,请稍后...");

                    form.submit({
                      
                        url: '/Txooo/CRM/Customers/Ajax/CustomerAjax.ajax/AddNews',
                        method: 'post',
                        success: me.up("form").onPostSuccess,
                        failure: me.up("form").onPostFail
                    });

                }
            }
        },
        {
            xtype: "button", text: "取消", name: "cancel", itemId: "cancel", handler: function () {
                this.up("window").close();
            }
        }
    ]
});