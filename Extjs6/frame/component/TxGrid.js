Ext.define('oa.component.TxGrid', {
    extend: 'Ext.grid.Panel',

    xtype: 'oa.txGrid',

    requires: ["Ext.toolbar.Paging"],

    listeners: {
        cellclick: 'onGridCellItemClick', //(this, td, cellIndex, record, tr, rowIndex, e, eOpts)
        rowclick: 'onGridRowClick'//(this, record, tr, rowIndex, e, eOpts)
    },   
    config: {
        columnUrl: undefined,
        storeUrl: undefined,
        queryParams: undefined,
        pageSize: 10,
        requestMode: 'get',
        columnFormat: function (cols) { },
        columnHidden:[]
    },
  

    //selModel: {
    //    injectCheckbox: 0,
    //    mode: "SINGLE",     //"SINGLE"/"SIMPLE"/"MULTI"
    //    checkOnly: true  
    //},
    //selType: "checkboxmodel",

    initComponent: function () {
        var me = this;

        Ext.Ajax.request({
            url: me.columnUrl,
            async:false,
            success: function (response, opts) {
                var obj = Ext.decode(response.responseText);
                me.columnFormat(obj);
                
                Ext.Array.forEach(obj, function (item, index, allItems) {                   
                    if (Ext.Array.contains(me.columnHidden, item.dataIndex))
                        item.hidden = true;
                });

                me.columns = obj;
            }
        });

        me.store = Ext.create('Ext.data.Store', {          
            proxy: {
                type: 'api',
                url: me.storeUrl,
                actionMethods: me.requestMode,
                extraParams: me.queryParams
            },
            autoLoad: true,
          
            pageSize: me.pageSize
        });

        me.bbar.store = me.store;
        me.callParent(arguments);
    },

    border: false,
    //rowLines: true,  

    bbar: {       
        xtype: 'pagingtoolbar',
        displayInfo: true,
        displayMsg: '显示第 {0} 条到 {1} 条记录，一共 {2} 条',
        emptyMsg: "没有记录",
        dock: 'bottom'
    }
});
