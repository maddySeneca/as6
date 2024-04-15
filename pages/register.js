import { useState } from 'react';
import { useRouter } from 'next/router';
import { registerUser } from '../lib/authenticate';

export default function Register() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState(null);
    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);
        console.log("working")
        try {
            await registerUser(email, password, password2);
            router.push('/login');
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div>
            <h1>Register</h1>
           
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password2">Confirm Password:</label>
                    <input type="password" id="password2" value={password2} onChange={(e) => setPassword2(e.target.value)} />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}
