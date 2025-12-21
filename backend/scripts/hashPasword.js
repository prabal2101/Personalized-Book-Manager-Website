import bcrypt from 'bcryptjs';

const password = 'admin123';
const hashedPassword = await bcrypt.hash(password, 10);

console.log('Password:', password);
console.log('Hashed Password:', hashedPassword);
console.log('\nUse this hash in your setup.sql file');
