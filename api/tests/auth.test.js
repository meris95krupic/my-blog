const axios = require('axios');

const apiUrl = 'http://localhost:5000/api'
 
test('login to the BE should return username', async () => {
    try {
        const resp = await axios.post(apiUrl + '/auth/login', {
            username: 'test',
            password: 'test'
        });
        expect(resp.data.username).toBe('test'); 
    } catch (err) {
        console.log('Error: ', err);
    }
});

test('login to the BE with wrong credentials should not return username', async () => {
    try {
        const resp = await axios.post(apiUrl + '/auth/login', {
            username: 'test',
            password: 'testXY'
        });
        expect(resp.data).toBe('Wrong credentials!'); 
    } catch (err) {
        expect(err.response.data).toBe('Wrong credentials!');
    }
});

test('register to the BE without an email should fail', async () => {
    try {
        const resp = await axios.post(apiUrl + '/auth/register', {
            username: 'testABC',
            password: 'testABC',
            email: ''
        });
        expect(resp.data.message).toBe('User validation failed: email: Path `email` is required.'); 
    } catch (err) {
        expect(err.response.status).toBe(500);
    }
});