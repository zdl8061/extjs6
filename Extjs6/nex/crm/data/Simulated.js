Ext.define('crm.data.Simulated', {
    requires: [
        'Ext.ux.ajax.JsonSimlet',
        'Ext.ux.ajax.SimManager'
    ],

    onClassExtended: function (cls, data) {
        //debugger;
        var url = data.$className.toLowerCase().replace(/\./g, '/').
                    replace(/^crm\/data/, '~crm'),
            simlet = {
                type: 'json',
                data: data.data
            },
            registration = {};        
        registration[url] = simlet;

        Ext.ux.ajax.SimManager.register(registration);
    }
},
function () {
    Ext.ux.ajax.SimManager.init({
        defaultSimlet: null
    });
});
