import { useState } from 'react';
import { useRouter } from 'next/router';
import {useAtom} from 'jotai'  
import { authenticateUser } from '../lib/authenticate'; 
import { getFavourites, getHistory } from '../lib/userData'; 
import {tokenAtom, favouritesAtom, searchHistoryAtom } from '../store';
export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [, setFavouritesList] = useAtom(favouritesAtom);
    const [, setSearchHistory] = useAtom(searchHistoryAtom);
    const [, setToken] = useAtom(tokenAtom);

    async function updateAtoms() {
        setFavouritesList(await getFavourites());
        setSearchHistory(await getHistory());
        setToken(readToken());
    }
    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);

        try {
            await authenticateUser(email, password);
            await updateAtoms();

            router.push('/');
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div>
            <h1>Login</h1>
           
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
