import { getToken } from './authenticate';

async function makeRequest(method, endpoint, body) {
    const token = await getToken(); 
    if (!token) return [];
    const headers = {
        'content-Type': 'application/json',
        'Authorization': `JWT ${token}`
       
    };

    const options = {
        method,
        headers : headers,
        body: JSON.stringify(body)
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, options);
    const data = await response.json();

    if (response.status === 200) {
        return data;
    } else {
        return [];
    }
}

export async function addToFavourites(id) {
    return makeRequest('PUT', `/favourites/${id}`);
}

export async function removeFromFavourites(id) {
    return makeRequest('DELETE', `/favourites/${id}`);
}

export async function getFavourites() {
    const token = await getToken(); 
    if (!token) return [];
    const headers = {
        'content-Type': 'application/json',
        'Authorization': `JWT ${token}`
       
    };


    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites`, headers);
    const data = await response.json();

    if (response.status === 200) {
        return data;
    } else {
        return [];
    }
}

export async function addToHistory(id) {
    return makeRequest('PUT', `/history/${id}`);
}

export async function removeFromHistory(id) {
    return makeRequest('DELETE', `/history/${id}`);
}

export async function getHistory() {
    const token = await getToken(); 
    if (!token) return [];
    const headers = {
        'content-Type': 'application/json',
        'Authorization': `JWT ${token}`
       
    };


    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history`, headers);
    const data = await response.json();

    if (response.status === 200) {
        return data;
    } else {
        return [];
    }
}
