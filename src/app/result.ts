export interface Result {
    statusCode: string,
    message:string,
    data:{
        records:[
            {
                child:[object]
            }]
    }
    headers:[{
        name:string,
        type:string,
    }]
  }