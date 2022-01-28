/////////////////////////////////////////////////
//Code to add data to a specific items child
//////////////////////////////////////////////////

      console.log(this.adrow)
      const dataSource: object = extendArray((this.treegrid as TreeGridComponent).dataSource as object[]);
      if ((dataSource as record[])[this.adrow].hasOwnProperty('child')){
        (dataSource as record[])[this.adrow].child.push(args.data);
      }else{
        (dataSource as record[])[this.adrow]['child']=args.data  
      }
      console.log((dataSource as record[])[this.adrow]);
      (this.treegrid   as TreeGridComponent).dataSource = dataSource;

////////////////////////////////////////////////////////
//Code to add a specific item
////////////////////////////////////////////////////////
      const dataSource: object = extendArray((this.treegrid as TreeGridComponent).dataSource as object[]);
      (dataSource as object[]).splice (this.adrow + 1,1,args.data);
      (this.treegrid   as TreeGridComponent).dataSource = dataSource;


////////////////////////////////////////////////////////
//Code for Dialog operations
///////////////////////////////////////////////////////
    args.cancel = true;
    const dialog = args.dialog as Dialog;
    dialog.close();