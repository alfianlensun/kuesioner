import { PUT, GET, DELETE, POST } from "./GeneralServices";
const base_url = 'http://192.168.43.168:4000'

export async function loginService(data){
    return await POST(base_url+'/auth/login', data)
}

export async function getMahasiswa(data){
    return await GET(base_url+'/master/mahasiswa', data)   
}

export async function getDosen(data){
    return await GET(base_url+'/master/dosen', data)   
}

export async function createMahasiswa(data){
    return await PUT(base_url+'/master/mahasiswa', data)   
}

export async function perbaruiMahasiswa(data){
    return await POST(base_url+'/master/mahasiswa', data)   
}

export async function deleteMahasiswa(data){
    return await DELETE(base_url+'/master/mahasiswa', data)   
}

export async function createDosen(data){
    return await PUT(base_url+'/master/dosen', data)   
}
export async function perbaruiDosen(data){
    return await POST(base_url+'/master/dosen', data)   
}

export async function deleteDosen(data){
    return await DELETE(base_url+'/master/dosen', data)   
}

export async function getKuesioner(){
    return await GET(base_url+'/master/kuesioner')   
}

export async function getKuesionerMahasiswa(idMhs){
    return await GET(base_url+'/master/kuesioner/'+idMhs)   
}

export async function createKuesioner(data){
    return await PUT(base_url+'/master/kuesioner', data)   
}

export async function perbaruiKuesioner(data){
    return await POST(base_url+'/master/kuesioner', data)   
}

export async function deleteKuesioner(data){
    return await DELETE(base_url+'/master/kuesioner', data)   
}

export async function getKuesionerDetail(id){
    return await GET(base_url+'/master/kuesioner/detail/'+id)   
}

export async function createKuesionerDetail(data){
    return await PUT(base_url+'/master/kuesioner/detail', data)   
}

export async function deleteKuesionerDetail(data){
    return await DELETE(base_url+'/master/kuesioner/detail', data)   
}

export async function perbaruiKuesionerDetail(data){
    return await POST(base_url+'/master/kuesioner/detail', data)   
}


export async function createJawabanKuesioner(data){
    return await PUT(base_url+'/kuesioner', data)   
}