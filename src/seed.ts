import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';
import { User } from './users/user.entity';

export async function seedUser(dataSource: DataSource) {
  const repo = dataSource.getRepository(User);

  const exists = await repo.findOne({ where: { email: 'test@example.com' } });
  if (exists) return;

  const hash = await bcrypt.hash('Test@123', 10);

  const user = repo.create({
    email: 'test@example.com',
    password_hash: hash,
  });

  await repo.save(user);
}
