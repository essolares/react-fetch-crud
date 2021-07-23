//THIS IS A HTTP REQUEST HELPER WORKED WITH JS
//CLOUSER HELPER WITH VANILLA JS

export const helpHttp = () => {
    const customFetch = (endpoint,options) =>{
        const defaultHeaders ={
            accept: "application/json"
        }
        const controller = new AbortController();

        //Evaluate options includen in request
        //SIGNAL-eval petitions response time
        options.signal = controller.signal;
        //METHOD - GET, POST, PUT, DELETE    
        options.method = options.method || "GET";
        //HEADER - HEADER FOR REQUEST
        options.headers = options.headers 
        ? {...defaultHeaders,...options.headers} 
        : defaultHeaders;
         //BODY - JSON BODY, IF NOT, DELETE BODY PROPERTY (GET NO NEED BODY)
        options.body = JSON.stringify(options.body) || false;
        if (!options.body) delete options.body;

        //SET TIMEOUT TO ABORT IF SERVER CAN'T RESPONSE
        setTimeout(() => {
            controller.abort();
        }, 5000);
        
        //FETCH REQUESTE WITH PROMISE RESPONSE FOR REJECTED STATUS
        return fetch(endpoint,options)
        .then((res)=> res.ok ? res.json() : Promise.reject({
            err: true,
            status: res.status || "00",
            statusText: res.statusText || 'Unknown Error',
        }))
        .catch((err) => err)
    }
    //GET REQUEST
    const get = (url, options = {}) => customFetch(url,options);
    //POST REQUEST
    const post = (url, options = {}) => {
        options.method="POST"
        return customFetch(url,options);
    }
    const put = (url,options = {}) => {
        options.method="PUT"
        return customFetch(url,options);
    }
    const del = (url,options = {}) => {
        options.method="DELETE"
        return customFetch(url,options);
    }
    return {
        get,
        post,
        put,
        del
    }
}