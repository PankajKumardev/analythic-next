-- Seed data for Analythic

-- Create test user
INSERT INTO "User" (id, email, name, "createdAt")
VALUES ('test-user-001', 'test@example.com', 'Test User', NOW())
ON CONFLICT (email) DO NOTHING;

-- Create test organization
INSERT INTO "Organization" (id, name, slug, "secretKey", "planTier", "monthlyLimit", "currentUsage", "lastReset", "createdAt", "updatedAt")
VALUES ('test-org-001', 'Test Organization', 'test-org', 'org-secret-key-001', 'FREE', 5000, 0, NOW(), NOW(), NOW())
ON CONFLICT (slug) DO NOTHING;

-- Link user to organization
INSERT INTO "UserOrganization" (id, "userId", "orgId", role)
VALUES ('test-user-org-001', 'test-user-001', 'test-org-001', 'OWNER')
ON CONFLICT ("userId", "orgId") DO NOTHING;

-- Create test project
INSERT INTO "Project" (id, name, domain, "writeKey", "orgId", "createdAt")
VALUES ('test-project-001', 'My Test Site', 'localhost', 'test-write-key-12345', 'test-org-001', NOW())
ON CONFLICT ("writeKey") DO NOTHING;
