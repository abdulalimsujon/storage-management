import bcrypt from 'bcrypt';
export function checkPassword(plaintextPassword: string, hash: string) {
  console.log('fff', plaintextPassword, hash);
  return bcrypt.compare(plaintextPassword, hash);
}
