import axios from 'axios';

async function testLogin() {
    try {
        const response = await axios.post('https://campusmart-production-efa9.up.railway.app/api/auth/login', {
            email: 'admin@campusmart.in',
            password: 'Admin@1234'
        });
        console.log('Login Success!');
        console.log('User:', response.data.user);
    } catch (error: any) {
        console.log('Login Failed!');
        if (error.response) {
            console.log('Status:', error.response.status);
            console.log('Data:', JSON.stringify(error.response.data));
        } else {
            console.log('Error:', error.message);
        }
    }
}

testLogin();
