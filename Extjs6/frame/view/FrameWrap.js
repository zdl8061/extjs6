Ext.define('oa.view.FrameWrap', {
    extend: 'Ext.container.Container',
    xtype: 'maincontainerwrap',

    requires: [
        'Ext.layout.container.HBox'
    ],

    scrollable: 'y',

    layout: {
        type: 'hbox',
        align: 'stretchmax',
      
        animate: true,
        animatePolicy: {
            x: true,
            width: true
        }
    },

    beforeLayout: function () {

        var me = this;
        var height = Ext.Element.getViewportHeight() - 64;

        //var menuPanel = me.getComponent('menuPanel');
        var navTree = me.getComponent('navigationTreeList');

        //debugger;

        me.minHeight = height;

        navTree.setStyle({
            'min-height': height + 'px'
        });

        me.callParent(arguments);
    }
});
