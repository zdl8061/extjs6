Ext.define('oa.component.TxForm', {
    extend: 'Ext.form.Panel',
    xtype:'oa.txForm',
    width: 500,   
    header:false,
    title: "Form",
    collapsible: true,  //可折叠
    autoScroll: true,   //自动创建滚动条
    defaultType: 'textfield',
    defaults: {
        anchor: '100%',
    },
    fieldDefaults: {
        labelWidth: 80,
        labelAlign: "left",
        flex: 1,
        margin: 5
    }
});