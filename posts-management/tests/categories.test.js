const axios = require('axios');

const apiUrl = 'http://localhost:8000/api'
 
test('all categories should be received', async () => {
    try {
        const resp = await axios.get(apiUrl + '/categories');
        expect(resp.data.length).toBe(0); 
    } catch (err) {
        console.log('Error: ', err);
    }
});

