const axios = require('axios');

const apiUrl = 'http://localhost:7000/api'

test('user-data should be updated', async () => {
    try {
        const resp = await axios.put(apiUrl + '/users/60fc871fab0f5d48f9ef3fe8', {
            userId: '60fc871fab0f5d48f9ef3fe8',
            username: 'test123',
            email: 'test123@test.com',
            password: 'test123',
            profilePic: '1629668997536fall-autumn-red-season.jpg'
        });
        expect(resp.data.username).toBe('test123'); 
    } catch (err) {
        console.log('Error: ', err);
    }
});

test('delete fake-user by ID should fail', async () => {
    try {
        const resp = await axios.delete(apiUrl + '/users/123123123');
    } catch (err) {
        expect(err.response.status).toBe(401);
    }
});
 
test('get user by ID should receive user `test`', async () => {
    try {
        const resp = await axios.get(apiUrl + '/users/6122bde1e0af9377ef519ed5');
        expect(resp.data.username).toBe('test'); 
    } catch (err) {
        console.log('Error: ', err);
    }
});

