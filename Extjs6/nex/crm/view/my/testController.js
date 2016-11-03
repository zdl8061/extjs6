Ext.define('crm.view.my.testController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.crm.mytest',

    init: function () {

        var me = this;
        this.refs = me.getReferences();

        this.refs.testgrid.store.on({
            load: this.onStoreLoad,
            scope: this
        });
    },

    onGridCellItemClick: function (o, td, cellIndex, record, tr, rowIndex, e, eOpts) {

    },
    onGridRowClick: function (o, record, tr, rowIndex, e, eOpts) {

    },
    onBarSearch: function () {

        toolBar = this.refs.toolBar,
        grid = this.refs.testgrid,
        fields = toolBar.items;

        for (var i = 0; i < fields.length; i++) {
            var name = fields.get(i).name;
            var value = fields.get(i).value;
            if (name) {
                grid.queryParams[name] = value;
            }
        }

        grid.store.proxy.extraParams = grid.queryParams;
        grid.store.loadPage(1);
    },

    onBarCreate: function () {
        var grid = this.refs.testgrid,
        win = Ext.create('Ext.window.Window', {
            modal: 'true',
            title: '资讯添加',
            items: [{
                xtype: 'form.news',
                onPostSuccess: function (form, action) {
                    win.close();
                    grid.store.loadPage(1);
                },
                onPostFail: function (form, action) {
                    //debugger;
                    form.owner.down("[name=submit]").setDisabled(false);
                    form.owner.down("[name=cancel]").setDisabled(false);
                    form.owner.down("[name=result_status]").setHtml(action.result.msg);
                }
            }]
        }).show();
    },
    onStoreLoad: function (r, options, success) {
       
        for (var i = 0; i < this.refs.testgrid.columns.length; i++) {
            this.refs.testgrid.columns[i].autoSize();
        }
    },
    onDelete: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        console.log("Content_Id: " + rec.get('Content_Id'));
    }
});
