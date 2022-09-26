class UserService{
    // list lesson
    getAllData = ()=>{
        let promise = axios({
            method: 'get',
            url:`https://631638655b85ba9b11f2ab97.mockapi.io/data`
        })
        return promise;
    }
    getData = (id)=>{
        let promise = axios({
            method: 'get',
            url:`https://631638655b85ba9b11f2ab97.mockapi.io/data/${id}`
        })
        return promise;
    }
    deleteDate = (id)=>{
        let promise = axios({
            method: 'delete',
            url:`https://631638655b85ba9b11f2ab97.mockapi.io/data/${id}`
        })
        return promise;
    }
    updateData = (id,data)=>{
        let promise = axios({
            method: 'put',
            url:`https://631638655b85ba9b11f2ab97.mockapi.io/data/${id}`,
            data:data,
        })
        return promise;
    }
    addDate = (data)=>{
        let promise = axios({
            method: 'post',
            url:`https://631638655b85ba9b11f2ab97.mockapi.io/data`,
            data:data,
        })
        return promise;
    }
    // list user api
    getListUser = ()=>{
        let promise = axios({
            method: 'get',
            url:`https://631638655b85ba9b11f2ab97.mockapi.io/userList`,
        })
        return promise;
    }
    addListUser = (data)=>{
        let promise = axios({
            method: 'post',
            url:`https://631638655b85ba9b11f2ab97.mockapi.io/userList`,
            data:data,
        })
        return promise;
    }
}