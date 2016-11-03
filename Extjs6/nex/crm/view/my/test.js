Ext.define('crm.view.my.test', {
    extend: 'Ext.container.Container',

    xtype: 'crm.mytest',
    requires: ["crm.view.my.testController", "crm.form.news", "crm.view.my.testViewModel"],

    viewModel:{type:'crm.mytest'},

    controller: 'crm.mytest',

    title: "资讯列表",

   
   
    margin: '0 1 0 1',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    items: [{
        xtype: 'panel',
        border: false,
        layout: 'absolute',       
        flex: 1,
        items: [{
            xtype: 'toolbar',
            border: false,

            reference: 'toolBar',
            items: [
            {
                xtype: 'textfield',
                name: 'contentid',
                emptyText: '请输入'
            },
            {
                xtype: 'textfield',
                name: 'title',
                emptyText: '请输入'
            },
            {
                text: '查询',
                handler: 'onBarSearch'
            },
            {
                text: '添加',
                handler: 'onBarCreate'
            }]
        }, {
            xtype: 'oa.txGrid',
            reference: 'testgrid',
            requestMode: 'get',
            pageSize: 20,
            columnUrl: '/Txooo/CRM/Customers/Ajax/CustomerAjax.ajax/GetColumn',
            queryParams: { type: 1 },
            storeUrl: '/Txooo/CRM/Customers/Ajax/CustomerAjax.ajax/GetList',
            columnHidden: [],
           
            columnFormat: function (cols) {

                Ext.Array.forEach(cols, function (item, index, allItems) {
                    if (item.dataIndex == "Content_Id") {
                        item.renderer = function (value, cellmeta, record, rowIndex, columnIndex, store) {
                            return "资讯ID：[" + value + "]";
                        }
                    }
                });
                var actioncols = [{
                    xtype: 'actioncolumn',
                    items: [{
                        icon: '/classic/resources/images/icons/cloud-icon.png',                      
                        tooltip: '删除',
                        handler: 'onDelete'                      
                    }]                 
                }, {
                    xtype: 'checkcolumn',
                    text: 'Active',
                    dataIndex: 'PostTime'
                },
                {
                    text: '模板',
                    xtype: 'templatecolumn',
                    tpl: '{Content_Id} ({Title})'
                }, {                  
                         text: '编辑',
                         xtype: 'templatecolumn',
                         tpl: '{Content_Id} ({Title})'
                    
                }];
                cols = Ext.Array.insert(cols, cols.length, actioncols);

            }
        }]
    }]
});