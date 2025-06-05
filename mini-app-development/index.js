const express = require('express');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const { Ollama } = require('ollama');
const { getAIReply } = require('./ai/ai-logic');

const app = express();
app.use(cors());
app.use(express.json());


const USERS_FILE = path.join(__dirname, 'data', 'users.json');


const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES = process.env.JWT_EXPIRES;



function readUsers() {
        const data = fs.readFileSync(USERS_FILE, 'utf8');
        return JSON.parse(data).users;
}


function saveUsers(users) {
    fs.writeFileSync(USERS_FILE, JSON.stringify({ users }, null, 2));
}

const ollama = new Ollama();

app.use(express.static(path.join(__dirname, 'auth')));
app.use('/data', express.static(path.join(__dirname, 'data')));
app.use('/chat-ai', express.static(path.join(__dirname, 'my-react-app', 'dist')));


app.get('/chat-ai', (req, res) => {
    res.sendFile(path.join(__dirname, 'my-react-app', 'dist', 'index.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'auth', 'user-account.html'));
});


app.post('/api/register', (req, res) => {
    const { login, email, password } = req.body;
    const users = readUsers();

    if (users.some(user => user.login === login || user.email === email)) {
        return res.status(400).json({ message: 'Пользователь уже существует' });
    }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = {
            id: users.length + 1,
            login,
            email,
            password: hashedPassword
        };

        users.push(newUser);
        saveUsers(users);
        const token = jwt.sign(
            { userId: newUser.id }, 
            JWT_SECRET || 'default_secret_key',
            { expiresIn: JWT_EXPIRES || '24h' }
        );
    res.json({ token });
});

app.post('/api/login', (req, res) => {
        const { login, password } = req.body;
        const users = readUsers();
        const user = users.find(u => u.login === login);

        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ message: 'Неверный логин или пароль' });
        }

        const token = jwt.sign(
            { userId: user.id },
            JWT_SECRET || 'default_secret_key',
            { expiresIn: JWT_EXPIRES || '1h' }
        );
    res.json({ token });
});

app.post('/api/message', async (req, res) => {
    const { message, role } = req.body;
    let mode = 'default';
    if (role === 'evil') mode = 'zloy';
    else if (role === 'lazy') mode = 'lenb';
    else if (role === 'femboy') mode = 'femboy';
    else if (role === 'humor') mode = '0_0';
    const reply = await getAIReply(message, mode);
    res.json({ reply });
});

app.listen(3000, () => {
    console.log(`Сервер запущен на http://localhost:3000`);
});