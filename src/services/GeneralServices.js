export async function GET(url){
    return new Promise( async (resolve, reject) => {
        try {
            setTimeout(() => {
                reject('Request time out')
            }, 30000);
    
            const fetchData = await fetch(url, {
                method : 'GET',
                headers: {
                    Accept: 'application/json',
                    "Content-Type": 'application/json',
                },
            }) 
            let responseStatus = fetchData.status
            if (responseStatus === 200){
                resolve(await fetchData.json())
            } else {
                reject({
                    code: fetchData.status,
                    response: fetchData.statusText
                })
            }
        } catch (err){
            reject({
                code: 500,
                message: 'Tidak dapat terhubung'
            })
        }
        
    })
}

export async function PUT(url, data){
    return new Promise( async (resolve, reject) => {
        try {
            setTimeout(() => {
                reject('Request time out')
            }, 30000);
    
            const fetchData =  await fetch(url, {
                method : 'PUT',
                headers: {
                    Accept: 'application/json',
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify(data)
            }) 

            let responseStatus = fetchData.status
            if (responseStatus === 200){
                resolve(await fetchData.json())
            } else {
                reject({
                    code: fetchData.status,
                    response: fetchData.statusText
                })
            }
        } catch (err){
            console.log('err',err)
            reject({
                code: 500,
                message: 'Tidak dapat terhubung'
            })
        }
        
    })
}

export async function POST(url, data){
    console.log(data)
    return new Promise( async (resolve, reject) => {
        try {
            setTimeout(() => {
                reject('Request time out')
            }, 30000);
    
            const fetchData = await fetch(url, {
                method : 'POST',
                headers: {
                    Accept: 'application/json',
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify(data)
            }) 
            let responseStatus = fetchData.status
            if (responseStatus === 200){
                resolve(await fetchData.json())
            } else {
                reject({
                    code: fetchData.status,
                    response: fetchData.statusText
                })
            }
        } catch (err){
            console.log(err)
            reject({
                code: 500,
                message: 'Tidak dapat terhubung'
            })
        }
        
    })
}

export async function DELETE(url, data){
    return new Promise( async (resolve, reject) => {
        try {
            setTimeout(() => {
                reject('Request time out')
            }, 30000);
    
            const fetchData = await fetch(url, {
                method : 'DELETE',
                headers: {
                    Accept: 'application/json',
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify(data)
            }) 

            console.log(fetchData)
            let responseStatus = fetchData.status
            if (responseStatus === 200){
                resolve(await fetchData.json())
            } else {
                reject({
                    code: fetchData.status,
                    response: fetchData.statusText
                })
            }
        } catch (err){
            reject({
                code: 500,
                message: 'Tidak dapat terhubung'
            })
        }
        
    })
}