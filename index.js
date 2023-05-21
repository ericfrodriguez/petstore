import 'dotenv/config.js';
import app from'./src/app.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('Deployed on: http://localhost:' + PORT));
