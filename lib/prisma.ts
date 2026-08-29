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
  genAiApp: makeModelMock(),
  adminUser: makeModelMock(),
  // no-op lifecycle methods
  $connect: async () => {},
  $disconnect: async () => {},
};

export function getPrisma() {
  return mockPrisma as any;
}
