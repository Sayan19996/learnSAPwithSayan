// Prisma has been disabled in this workspace per user request (using MDX content).
// This file provides a lightweight mock of the parts of Prisma the app expects
// so the rest of the codebase can run without a real database during deployment.

function makeModelMock() {
  return {
    findMany: async () => [],
    findUnique: async () => null,
    findFirst: async () => null,
    create: async (args: any) => ({ id: "mock-id", ...((args && args.data) || {}) }),
    update: async (args: any) => ({ id: (args && args.where && args.where.id) || "mock-id", ...((args && args.data) || {}) }),
    delete: async () => ({}),
    upsert: async (args: any) => ({ id: "mock-id", ...((args && args.create) || {}) }),
  };
}

const mockPrisma = {
  article: makeModelMock(),
  category: makeModelMock(),
  resource: makeModelMock(),
  roadmap: makeModelMock(),
  mediaAsset: makeModelMock(),
  genAiApp: (() => {
    const sample = {
      id: "genai-1",
      name: "SAP AI Solution Architect",
      slug: "sap-ai-solution-architect",
      url: "https://sap-ai-solution-architect.netlify.app/",
      description: "Collection of generative AI demos and tools for SAP architects.",
      longDescription: "Project examples and small demos showcasing AI usages in SAP contexts.",
      icon: null,
      status: "published",
      createdAt: new Date().toISOString(),
    };

    return {
      findMany: async () => [sample],
      findUnique: async ({ where }: any) => {
        if (!where) return null;
        if (where.slug === sample.slug || where.id === sample.id) return sample;
        return null;
      },
      create: async (args: any) => ({ id: "genai-new", ...((args && args.data) || {}) }),
      update: async (args: any) => ({ id: (args && args.where && args.where.id) || "genai-1", ...((args && args.data) || {}) }),
      delete: async () => ({}),
      upsert: async (args: any) => ({ id: "genai-1", ...((args && args.create) || {}) }),
    };
  })(),
  adminUser: makeModelMock(),
  // no-op lifecycle methods
  $connect: async () => {},
  $disconnect: async () => {},
};

export function getPrisma() {
  return mockPrisma as any;
}
