const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const app = {
    name: "AI Business Autopsy",
    slug: "ai-business-autopsy",
    description: "Analyze business failures and successes using AI to derive actionable insights.",
    url: "https://agent-6a9471e0dcfc9bd7981f9--ai-business-autopsy.netlify.app/",
    status: "published",
  };

  await prisma.genAiApp.upsert({
    where: { slug: app.slug },
    update: app,
    create: app,
  });

  console.log("Successfully added GenAI app:", app.name);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
