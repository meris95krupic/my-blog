const axios = require('axios');

const apiUrl = 'http://localhost:8000/api'

test('writing a post should fail', async () => {
    try {
        const resp = await axios.post(apiUrl + '/posts', {
            username: 'test123FAKE', 
            title: 't123', 
            desc: 't123'
        });
    } catch (err) {
        expect(err.response.status).toBe(500);
    }
});

test('updating a post should change the title', async () => {
    try {
        const resp = await axios.put(apiUrl + '/posts/6122d0ba0dddf20e65505a28', {
            username: 'test123', 
            title: 'Test-123', 
            desc: 't123...'
        });
        expect(resp.data.title).toBe('Test-123'); 
    } catch (err) {
        console.log('Error: ', err);
    }
});

test('deleting a post should fail', async () => {
    try {
        const resp = await axios.delete(apiUrl + '/posts/123123123');
    } catch (err) {
        expect(err.response.status).toBe(500);
    }
});

test('get post by ID should receve a post', async () => {
    try {
        const resp = await axios.get(apiUrl + '/posts/60fc87c9ab0f5d48f9ef3fef');
        expect(resp.data.title).toBe('Test_');
    } catch (err) {
        console.log('Error: ', err);
    }
});
 
test('get all posts', async () => {
    try {
        const resp = await axios.get(apiUrl + '/posts');
        expect(resp.data.length > 0).toBe(true); 
    } catch (err) {
        console.log('Error: ', err);
    }
});

