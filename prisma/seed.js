const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const categories = [
    { name: 'ABAP', slug: 'abap', description: 'Core ABAP, modern syntax, and performance patterns.' },
    { name: 'CDS', slug: 'cds', description: 'Data modeling and CDS view design.' },
    { name: 'RAP', slug: 'rap', description: 'Managed and unmanaged RAP implementations.' },
    { name: 'Fiori', slug: 'fiori', description: 'UX, OData, and responsive UI patterns.' },
    { name: 'BTP', slug: 'btp', description: 'BTP integration and destination architecture.' },
    { name: 'Integration', slug: 'integration', description: 'Interfaces, APIs, and event-driven flows.' },
    { name: 'Architecture', slug: 'architecture', description: 'Designing scalable SAP landscapes.' },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: category,
      create: category,
    });
  }

  const adminEmail = process.env.ADMIN_EMAIL || 'sayan@learnsapwithsayan.com';
  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: 'Sayan',
      passwordHash: process.env.ADMIN_PASSWORD || 'admin123',
      role: 'admin',
    },
  });

  await prisma.article.upsert({
    where: { slug: 'sap-rap-managed-scenario' },
    update: {},
    create: {
      title: 'SAP RAP Managed Scenario',
      slug: 'sap-rap-managed-scenario',
      excerpt: 'A practical guide to using managed RAP scenarios with authorization and behavior implementation.',
      content: '# SAP RAP Managed Scenario\n\nRAP is the modern ABAP approach for building business applications with semantics and service exposure in mind.',
      seoTitle: 'SAP RAP Managed Scenario – Complete Guide',
      seoDescription: 'Learn how to build and secure managed RAP scenarios in SAP with practical examples and architecture guidance.',
      status: 'published',
      difficulty: 'Intermediate',
      readTime: '10 min',
      featuredImage: '/og-default.svg',
      publishedAt: new Date(),
      category: { connect: { slug: 'rap' } },
    },
  });

  console.log('Seed complete');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
