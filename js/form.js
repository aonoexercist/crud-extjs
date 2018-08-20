Ext.define('userModel', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int',
        mapping: 'id'
    },{
        name: 'Name',
        type: 'string',
        mapping: 'Name'
    }]
});

// Ext.define('Ext.data.writer.SinglePost', {
//     extend: 'Ext.data.writer.Writer',
//     alternateClassName: 'Ext.data.SinglePostWriter',
//     alias: 'writer.singlepost',

//     writeRecords: function(request, data) {
//         request.params = data[0];
//         return request;
//     }
// });

var baseUrl=baseUrl;


Ext.onReady(function(){
    
    
    var myStore = Ext.create('Ext.data.Store', {
        model: 'userModel',
        autoload: true,
        autoSync: false,
        proxy:{
            type: 'rest',
            url: baseUrl,
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },  
            api:{
                create: baseUrl+'user/insert',
                read: baseUrl+'user/select',
                update: baseUrl+'user/update',
                destroy: baseUrl+'user/delete'
            },
            reader: {
                type: 'json',
                successProperty: 'success',
                root: 'data',
                messageProperty: 'message'
            },
            writer: {
                type: 'json',
                writeAllFields: true,
                root: '',
                nameProperty: 'mapping'
            }
            // listeners: {
            //     exception: function(proxy, response, operation){
            //         Ext.MessageBox.show({
            //             title: 'REMOTE EXCEPTION',
            //             msg: operation.getError(),
            //             icon: Ext.MessageBox.ERROR,
            //             buttons: Ext.Msg.OK
            //         });
            //     }
            // }
        },
        listeners: {
            // write: function(proxy, operation){
            //     if (operation.action == 'destroy') {
            //         main.child('#form').setActiveRecord(null);
            //     }
            //     Ext.example.msg(operation.action, operation.resultSet.message);
            // }
            // update: function(proxy, operation){
            //     var test = Ext.getCmp('grid').getSelectionModel().getSelection()[0];
            //     this.set(test);
            //     alert('your next');
            // }
            update: function(){
                myStore.sync();
            }
        }
        // sorters:[{
        //     property: 'id',
        //     direction: 'ASC'
        // }]
        
    });

    myStore.load();
    
    Ext.create('Ext.panel.Panel', {
        title: 'User Information',
        renderTo: Ext.getBody(),
        items: [{
            xtype: 'container',
            renderTo: Ext.getBody(),
            layout: 'hbox',
            padding: '5',
            items:[{
                xtype: 'container',
                width: '30%',
                items:[{
                    xtype: 'form',
                    title: 'Form',
                    id: 'form',
                    layout: 'vbox',
                    items:[{
                        xtype: 'fieldset',
                        title: 'Users info',
                        fieldDefaults:{
                            labelAlign: 'right',
                            labelWidth: 100,
                            msTarget: 'side'
                        },
                        defaults:{
                            anchor: '100%'
                        },
                        items:[{
                            xtype: 'textfield',
                            fieldLabel: 'Name',
                            name: 'Name',
                            allowBlank: false
                        }]
                    }],

                    buttons:[{
                        text: 'Save',
                        disabled: true,
                        formBind: true,
                        handler: function(){
                            var form = Ext.getCmp('form').getForm();
                            
                            if(form.isValid()){
                                var values = form.getValues();                   
                                var store = Ext.getCmp('grid').getStore();
                                var test = store.add(
                                    Ext.create('userModel', values)
                                    // Name: values.Name
                                );
                                
                                // myStore.insert(0, values);
                                // Ext.MessageBox.alert('submitted value', form.getValues());
                                
                                store.sync({
                                    success: function(){
                                        store.load();
                                    }
                                });
                            }
                            // Ext.getCmp('grid').getStore().load();
                            // store.reload();
                            
                            
                        }
                    }]
                }]
            },{
                xtype: 'container',
                padding: '0 0 0 50',
                defaults:{
                    flex: 1
                },
                items:[{
                    xtype: 'grid',
                    title: 'Users Data',
                    store: myStore,
                    id: 'grid',
                    width: 300,
                    height: 500,
                    selModel:{
                        selType: 'cellmodel'
                    },
                    plugins:[{
                        ptype: 'cellediting',
                        clickToEdit: 1
                    }],
                    columns:[{
                        xtype: 'rownumberer',
                        tooltip: 'Black rover'
                    },{
                        text: 'Name',
                        dataIndex: 'Name',
                        editor: 'textfield'
                    },{
                        xtype: 'actioncolumn',
                        sortable: false,
                        menuDisabled: true,
                        align: 'center',
                        items:[{
                            icon: baseUrl+'icon/icon-error.gif',
                            handler: function(grid, rowIndex, colIndex){
                                var rec = grid.getStore().getAt(rowIndex);
                                Ext.Msg.confirm('Confirm', 'Do you want to delete this?',
                                    function(btn){
                                        if(btn == 'yes'){
                                            myStore.removeAt(rowIndex);
                                            myStore.sync();
                                            console.log(rec.get('id'));
                                        }
                                    });
                                }
                        }]
                    }],
                    tbar:{
                        items:[{
                            xtype: 'tbtext',
                            text: 'Search'
                        },{
                            xtype: 'textfield',
                            emptyText: 'Names ..',
                            listeners:{
                                scope: this,
                                change: function(field, newValue){
                                    var grid = Ext.getCmp('grid');
                                    grid.store.clearFilter();
                                    if (newValue) {
                                        var matcher = new RegExp(Ext.String.escapeRegex(newValue), "i");
                                        grid.store.filter({
                                            filterFn: function(item) {
                                                return matcher.test(item.get('Name'));
                                            }
                                        });
                                    }
                                }
                            }
                        }]
                    },

                    



                }]
            }]
        }]
    });
});



// return {
//     initMethod:function(parameter){
//         baseUrl = parameter.baseUrl;
//         return this;
//     }
// }