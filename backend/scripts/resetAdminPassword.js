import bcrypt from 'bcryptjs';
import pool from '../config/db.js';

const reset = async () => {
  const plainPassword = 'admin123';
  const hash = await bcrypt.hash(plainPassword, 10);

  await pool.execute(
    'UPDATE userss SET password = ? WHERE email = ?',
    [hash, 'admin@gmail.com']
  );

  console.log('✅ Admin password reset successfully');
  console.log('Email: admin@gmail.com');
  console.log('Password:', plainPassword);
  process.exit(0);
};

reset();
