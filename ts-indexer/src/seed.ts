// File: ts-indexer/src/seed.ts

import prisma from './prisma';

async function main() {
  // 1. Create Admin user
  const admin = await prisma.user.create({
    data: {
      address: '0xfc2ac7cfb1b87aa4851c5d62e854551bd1c78792048505a8a21f8ec2f473d1b0', // Replace with your admin's Aptos address
      role: 'ADMIN',
      name: 'Sahitya Da',
    },
  });

  // 2. Create Developer 1
  const dev1 = await prisma.user.create({
    data: {
      address: '0x094d79cedba6ae2f4b4f9a8313696a5d8a15c56e7d3bbb6048eb17cd3ae99391', // Replace with Dev 1 wallet address
      role: 'DEVELOPER',
      name: 'Deepan',
    },
  });

  // 3. Create Developer 2
  const dev2 = await prisma.user.create({
    data: {
      address: '0x691375d8832bd23dc38debaf8e9453f955d4abc4cc5f75c56683347a20f56514', // Replace with Dev 2 wallet address
      role: 'DEVELOPER',
      name: 'Shinjini',
    },
  });

  // 4. Create Bettor 1
  const bettor1 = await prisma.user.create({
    data: {
      address: '0xa690588645193037a011ec1fe2b7056bb685619290d706b66765a589725db93d', // Replace with Bettor 1 wallet address
      role: 'BETTOR',
      name: 'Aryan Da',
    },
  });

  // 5. Create Bettor 2
  const bettor2 = await prisma.user.create({
    data: {
      address: '0x17162e33182c646ebdbaca82376efd4ef7722cccf8919bc879604975dc5ac688', // Replace with Bettor 2 wallet address
      role: 'BETTOR',
      name: 'Harsh Da',
    },
  });

  // Print the created users for sanity check
  console.log('Seeded users:');
  console.table([admin, dev1, dev2, bettor1, bettor2]);
}

main()
  .then(() => {
    console.log('✅ Seeding completed!');
    process.exit(0);
  })
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  });
