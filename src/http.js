/**
 * EasyHttp Library
 * Custom Javascript Library For Making HTTP Requests
 * 
 * @version 2.0.0
 * @author Abbas Salami
 * 
 */

class EasyHttp{

  // HTTP GET Requst
  async get(url){
    const response =  await fetch(url);
    
    const respData = await response.json();

    return respData;
  }

  // HTTP Post Request
  async post(url, data){
    
      const response = await fetch(url, { 
        method: 'POST',
        headers: {
          'Content-type':  'application/json'
        },
        body: JSON.stringify(data)
      });

      const respData = await response.json();

      return respData;

  }


  // HTTP Put Request
  async put(url, data){

      const response = await fetch(url, { 
        method: 'PUT',
        headers: {
          'Content-type':  'application/json'
        },
        body: JSON.stringify(data)
      })

      const respData = await response.json();

      return respData;
  }

  // HTTP Delete Reques
  async delete(url){

    const response = await fetch(url, { 
      method: 'DELETE',
      headers: {
        'Content-type':  'application/json'
      }
    })

    const respData = await response.json();

    return respData;
 
  }
  
}

 export const http = new EasyHttp();