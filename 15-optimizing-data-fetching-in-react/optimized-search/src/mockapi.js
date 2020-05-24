import mockData from './mockdata.json';

var hits = 0;

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export async function searchAPI(query){
    await sleep(50);
    return {
        data: {
            results: mockData.filter(item => item.toLowerCase().includes(query)).slice(0, 5),
            hits: ++hits,
            query: query
        }
    }
}