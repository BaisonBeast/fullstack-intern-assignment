import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

const users = [
    {id: 1, name: 'Priyanshu', password: 'abc@123'},
    {id: 2, name: 'test', password: 'test@123'}
]

const SECRET_KEY = 'BESTSECRETKEY';

export async function POST(req: Request, res: NextApiResponse) {
    
    const {username, password} = await req.json();
    const user = users.find(user => user.name === username);

    if(user && user.password === password) {
        const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' })
        return new Response(
            JSON.stringify({ token, user: { username: user.name } }),
            { status: 200 }
          );
    } else {
        return new Response(
            JSON.stringify({ message: 'Invalid credentials' }),
            { status: 401 }
          );
    }
}