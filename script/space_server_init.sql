-- 🏢 Workspace 데이터 삽입
INSERT INTO "Workspace" (workspace_id, name, created_at, updated_at, workspace_image)
VALUES
    ('24fa7058-fb3a-11ef-a453-6640c3b0a700', 'Smile Together', NOW(), NOW(), 'workspace1.png'),
    ('24fa79f4-fb3a-11ef-a453-6640c3b0a700', 'Dev Hub', NOW(), NOW(), 'workspace2.png'),
    ('24fa7022-fb3a-11ef-a453-6640c3b0a700', 'Smile Gate', NOW(), NOW(), 'workspace1.png'),
    ('24fa7914-fb3a-11ef-a453-6640c3b0a700', 'Online DevCamp', NOW(), NOW(), 'workspace2.png'),
    ('24fa8516-fb3a-11ef-a453-6640c3b0a700', 'Smile work', NOW(), NOW(), 'workspace2.png');

-- 👥 WorkspaceUser 데이터 삽입
INSERT INTO "WorkspaceUser" (profile_id, user_id, workspace_id, role, joined_at, profile_image, profile_name, position, status_message)
VALUES
    -- Smile Together (24fa7058-fb3a-11ef-a453-6640c3b0a700)
    ('24fa802a-fb3a-11ef-a453-6640c3b0a700', '24fa8a1c-fb3a-11ef-a453-6640c3b0a701', '24fa7058-fb3a-11ef-a453-6640c3b0a700', 'admin', NOW(), 'user1.png', 'John Doe', 'Backend Developer', 'Working on chat features'),
    ('24fa80de-fb3a-11ef-a453-6640c3b0a700', '24fa92aa-fb3a-11ef-a453-6640c3b0a702', '24fa7058-fb3a-11ef-a453-6640c3b0a700', 'member', NOW(), 'user2.png', 'Alice Kim', 'Frontend Developer', 'Focusing on UI/UX'),
    ('24fab0ee-fb3a-11ef-a453-6640c3b0a700', '24fab5d2-fb3a-11ef-a453-6640c3b0a700', '24fa7058-fb3a-11ef-a453-6640c3b0a700', 'member', NOW(), 'user5.png', 'Chris Lee', 'QA Engineer', 'Testing new features'),
    ('24fab8b4-fb3a-11ef-a453-6640c3b0a700', '24fabcfc-fb3a-11ef-a453-6640c3b0a700', '24fa7058-fb3a-11ef-a453-6640c3b0a700', 'member', NOW(), 'user6.png', 'David Cho', 'UX Designer', 'Improving UI/UX'),
    ('24fac21a-fb3a-11ef-a453-6640c3b0a700', '24fac632-fb3a-11ef-a453-6640c3b0a700', '24fa7058-fb3a-11ef-a453-6640c3b0a700', 'member', NOW(), 'user7.png', 'Evelyn Lee', 'Scrum Master', 'Facilitating agile workflows'),

    -- Dev Hub (24fa79f4-fb3a-11ef-a453-6640c3b0a700)
    ('24fa96e0-fb3a-11ef-a453-6640c3b0a703', '24fa9a1e-fb3a-11ef-a453-6640c3b0a703', '24fa79f4-fb3a-11ef-a453-6640c3b0a700', 'admin', NOW(), 'user3.png', 'Bob Lee', 'DevOps Engineer', 'Managing deployments'),
    ('24fa9f5e-fb3a-11ef-a453-6640c3b0a704', '24faa3a4-fb3a-11ef-a453-6640c3b0a704', '24fa79f4-fb3a-11ef-a453-6640c3b0a700', 'member', NOW(), 'user4.png', 'Emma Park', 'Product Manager', 'Coordinating tasks'),
    ('24faa842-fb3a-11ef-a453-6640c3b0a700', '24faac9c-fb3a-11ef-a453-6640c3b0a700', '24fa79f4-fb3a-11ef-a453-6640c3b0a700', 'member', NOW(), 'user8.png', 'Frank Kim', 'Security Engineer', 'Ensuring security compliance'),
    ('24fab0ee-fb3a-11ef-a453-6640c3b0a707', '24fab5d2-fb3a-11ef-a453-6640c3b0a700', '24fa79f4-fb3a-11ef-a453-6640c3b0a700', 'member', NOW(), 'user9.png', 'Grace Lee', 'Database Engineer', 'Optimizing DB performance'),
    ('24fab1b4-fb3a-11ef-a453-6640c3b0a700', '24fabcfc-fb3a-11ef-a453-6640c3b0a700', '24fa79f4-fb3a-11ef-a453-6640c3b0a700', 'member', NOW(), 'user10.png', 'Harry Kim', 'Software Engineer', 'Developing backend services'),

    -- Smile Gate (24fa7058-fb3a-11ef-a453-6640c3b0a700)
    ('24fac27a-fb3a-11ef-a453-6640c3b0a700', '24fac632-fb3a-11ef-a453-6640c3b0a700', '24fa7022-fb3a-11ef-a453-6640c3b0a700', 'admin', NOW(), 'user11.png', 'Irene Park', 'System Architect', 'Defining system structure'),
    ('24facad8-fb3a-11ef-a453-6640c3b0a700', '24face4a-fb3a-11ef-a453-6640c3b0a700', '24fa7022-fb3a-11ef-a453-6640c3b0a700', 'member', NOW(), 'user12.png', 'Jack Kim', 'Software Developer', 'Building microservices'),
    ('24fad056-fb3a-11ef-a453-6640c3b0a700', '24fad3c4-fb3a-11ef-a453-6640c3b0a700', '24fa7022-fb3a-11ef-a453-6640c3b0a700', 'member', NOW(), 'user13.png', 'Karen Choi', 'ML Engineer', 'Training ML models'),
    ('24fad5c2-fb3a-11ef-a453-6640c3b0a700', '24fad8ec-fb3a-11ef-a453-6640c3b0a700', '24fa7022-fb3a-11ef-a453-6640c3b0a700', 'member', NOW(), 'user14.png', 'Leo Lee', 'Software Engineer', 'Writing backend logic'),
    ('24fadd2a-fb3a-11ef-a453-6640c3b0a700', '24fae032-fb3a-11ef-a453-6640c3b0a700', '24fa7022-fb3a-11ef-a453-6640c3b0a700', 'member', NOW(), 'user15.png', 'Monica Jung', 'Product Designer', 'Sketching UI flows'),

    -- Online DevCamp (24fa79f4-fb3a-11ef-a453-6640c3b0a700)
    ('24fae21a-fb3a-11ef-a453-6640c3b0a700', '24fae49c-fb3a-11ef-a453-6640c3b0a700', '24fa7914-fb3a-11ef-a453-6640c3b0a700', 'admin', NOW(), 'user16.png', 'Nathan Kim', 'Backend Engineer', 'Handling API requests'),
    ('24fae68c-fb3a-11ef-a453-6640c3b0a700', '24faea02-fb3a-11ef-a453-6640c3b0a700', '24fa7914-fb3a-11ef-a453-6640c3b0a700', 'member', NOW(), 'user17.png', 'Olivia Park', 'QA Engineer', 'Running integration tests'),
    ('24faec7a-fb3a-11ef-a453-6640c3b0a700', '24faef9a-fb3a-11ef-a453-6640c3b0a700', '24fa7914-fb3a-11ef-a453-6640c3b0a700', 'member', NOW(), 'user18.png', 'Patrick Choi', 'Frontend Developer', 'Building React components'),
    ('24faf1a8-fb3a-11ef-a453-6640c3b0a700', '24faf47c-fb3a-11ef-a453-6640c3b0a700', '24fa7914-fb3a-11ef-a453-6640c3b0a700', 'member', NOW(), 'user19.png', 'Quincy Lee', 'UX Researcher', 'Conducting user research'),
    ('24faf6ec-fb3a-11ef-a453-6640c3b0a700', '24faf9a2-fb3a-11ef-a453-6640c3b0a700', '24fa7914-fb3a-11ef-a453-6640c3b0a700', 'member', NOW(), 'user20.png', 'Rachel Park', 'Security Engineer', 'Reviewing security audits'),

    -- Smile Work
    ('24fb012a-fb3a-11ef-a453-6640c3b0a700', '24fb05aa-fb3a-11ef-a453-6640c3b0a701', '24fa8516-fb3a-11ef-a453-6640c3b0a700', 'admin', NOW(), 'user21.png', 'Samuel Lee', 'Team Lead', 'Managing project timeline'),
    ('24fb072e-fb3a-11ef-a453-6640c3b0a700', '24fb0a6c-fb3a-11ef-a453-6640c3b0a702', '24fa8516-fb3a-11ef-a453-6640c3b0a700', 'member', NOW(), 'user22.png', 'Tina Park', 'Software Engineer', 'Developing microservices'),
    ('24fb0c9a-fb3a-11ef-a453-6640c3b0a700', '24fb0f2e-fb3a-11ef-a453-6640c3b0a703', '24fa8516-fb3a-11ef-a453-6640c3b0a700', 'member', NOW(), 'user23.png', 'Ursula Choi', 'Product Owner', 'Defining requirements'),
    ('24fb11c4-fb3a-11ef-a453-6640c3b0a700', '24fb14f2-fb3a-11ef-a453-6640c3b0a704', '24fa8516-fb3a-11ef-a453-6640c3b0a700', 'member', NOW(), 'user24.png', 'Victor Kim', 'Cloud Engineer', 'Managing AWS infrastructure'),
    ('24fb17a4-fb3a-11ef-a453-6640c3b0a700', '24fb1ac6-fb3a-11ef-a453-6640c3b0a705', '24fa8516-fb3a-11ef-a453-6640c3b0a700', 'member', NOW(), 'user25.png', 'Wendy Jung', 'Business Analyst', 'Tracking KPIs and metrics');

-- 🔗 Channel 데이터 삽입
INSERT INTO "Channel" (channel_id, workspace_id, name, description, is_private, created_at, updated_at)
VALUES
    -- Smile Together 워크스페이스
    ('24faa8dc-fb3a-11ef-a453-6640c3b0a705', '24fa7058-fb3a-11ef-a453-6640c3b0a700', 'general', 'General discussion', FALSE, NOW(), NOW()),
    ('24faad12-fb3a-11ef-a453-6640c3b0a706', '24fa7058-fb3a-11ef-a453-6640c3b0a700', 'backend', 'Backend development discussions', TRUE, NOW(), NOW()),
    ('24fab550-fb3a-11ef-a453-6640c3b0a707', '24fa7058-fb3a-11ef-a453-6640c3b0a700', 'frontend', 'Frontend team discussions', TRUE, NOW(), NOW()),

    -- Dev Hub 워크스페이스
    ('24fab150-fb3a-11ef-a453-6640c3b0a708', '24fa79f4-fb3a-11ef-a453-6640c3b0a700', 'design', 'Design team discussions', FALSE, NOW(), NOW()),
    ('24fab792-fb3a-11ef-a453-6640c3b0a709', '24fa79f4-fb3a-11ef-a453-6640c3b0a700', 'devops', 'DevOps and infrastructure', TRUE, NOW(), NOW()),
    ('24fabb10-fb3a-11ef-a453-6640c3b0a710', '24fa79f4-fb3a-11ef-a453-6640c3b0a700', 'product', 'Product management discussions', FALSE, NOW(), NOW()),

    -- Smile Gate 워크스페이스
    ('24fac210-fb3a-11ef-a453-6640c3b0a711', '24fa7058-fb3a-11ef-a453-6640c3b0a700', 'team-leads', 'Private discussions for team leads', TRUE, NOW(), NOW()),
    ('24fac690-fb3a-11ef-a453-6640c3b0a712', '24fa7058-fb3a-11ef-a453-6640c3b0a700', 'marketing', 'Marketing strategy and content', FALSE, NOW(), NOW()),
    ('24faca10-fb3a-11ef-a453-6640c3b0a713', '24fa7058-fb3a-11ef-a453-6640c3b0a700', 'qa', 'Quality assurance and bug reports', FALSE, NOW(), NOW()),

    -- Online DevCamp 워크스페이스
    ('24fad010-fb3a-11ef-a453-6640c3b0a714', '24fa79f4-fb3a-11ef-a453-6640c3b0a700', 'mentors', 'Discussion for mentors', TRUE, NOW(), NOW()),
    ('24fad430-fb3a-11ef-a453-6640c3b0a715', '24fa79f4-fb3a-11ef-a453-6640c3b0a700', 'students', 'Discussion for students', FALSE, NOW(), NOW()),
    ('24fad850-fb3a-11ef-a453-6640c3b0a716', '24fa79f4-fb3a-11ef-a453-6640c3b0a700', 'projects', 'Collaboration on projects', FALSE, NOW(), NOW()),
    ('24fadc70-fb3a-11ef-a453-6640c3b0a717', '24fa79f4-fb3a-11ef-a453-6640c3b0a700', 'events', 'Planning community events', FALSE, NOW(), NOW()),

    -- Smile Work 워크스페이스
    ('24fae410-fb3a-11ef-a453-6640c3b0a718', '24fa8516-fb3a-11ef-a453-6640c3b0a700', 'hr', 'HR discussions and policies', TRUE, NOW(), NOW()),
    ('24fae820-fb3a-11ef-a453-6640c3b0a719', '24fa8516-fb3a-11ef-a453-6640c3b0a700', 'development', 'Engineering team discussions', FALSE, NOW(), NOW()),
    ('24faec30-fb3a-11ef-a453-6640c3b0a720', '24fa8516-fb3a-11ef-a453-6640c3b0a700', 'announcements', 'Company-wide announcements', FALSE, NOW(), NOW());


-- 👤 ChannelUser 데이터 삽입
INSERT INTO "ChannelUser" (mapping_id, user_id, channel_id, joined_at, channel_role)
VALUES
    -- Smile Together 워크스페이스 (24fa7058-fb3a-11ef-a453-6640c3b0a700)
    ('24fb2000-fb3a-11ef-a453-6640c3b0a700', '24fa8a1c-fb3a-11ef-a453-6640c3b0a701', '24faa8dc-fb3a-11ef-a453-6640c3b0a705', NOW(), 'admin'),
    ('24fb2100-fb3a-11ef-a453-6640c3b0a700', '24fa92aa-fb3a-11ef-a453-6640c3b0a702', '24faa8dc-fb3a-11ef-a453-6640c3b0a705', NOW(), 'member'),
    ('24fb2200-fb3a-11ef-a453-6640c3b0a700', '24fab5d2-fb3a-11ef-a453-6640c3b0a700', '24faa8dc-fb3a-11ef-a453-6640c3b0a705', NOW(), 'member'),
    ('24fb2300-fb3a-11ef-a453-6640c3b0a700', '24fabcfc-fb3a-11ef-a453-6640c3b0a700', '24faa8dc-fb3a-11ef-a453-6640c3b0a705', NOW(), 'member'),
    ('24fb2400-fb3a-11ef-a453-6640c3b0a700', '24fac632-fb3a-11ef-a453-6640c3b0a700', '24faa8dc-fb3a-11ef-a453-6640c3b0a705', NOW(), 'member'),

    ('24fb2500-fb3a-11ef-a453-6640c3b0a700', '24fa8a1c-fb3a-11ef-a453-6640c3b0a701', '24faad12-fb3a-11ef-a453-6640c3b0a706', NOW(), 'admin'),
    ('24fb2600-fb3a-11ef-a453-6640c3b0a700', '24fa92aa-fb3a-11ef-a453-6640c3b0a702', '24faad12-fb3a-11ef-a453-6640c3b0a706', NOW(), 'member'),

    -- Dev Hub 워크스페이스 (24fa79f4-fb3a-11ef-a453-6640c3b0a700)
    ('24fb2700-fb3a-11ef-a453-6640c3b0a700', '24fa9a1e-fb3a-11ef-a453-6640c3b0a703', '24fab150-fb3a-11ef-a453-6640c3b0a708', NOW(), 'admin'),
    ('24fb2800-fb3a-11ef-a453-6640c3b0a700', '24faa3a4-fb3a-11ef-a453-6640c3b0a704', '24fab150-fb3a-11ef-a453-6640c3b0a708', NOW(), 'member'),
    ('24fb2900-fb3a-11ef-a453-6640c3b0a700', '24faac9c-fb3a-11ef-a453-6640c3b0a700', '24fab150-fb3a-11ef-a453-6640c3b0a708', NOW(), 'member'),
    ('24fb2a00-fb3a-11ef-a453-6640c3b0a700', '24fab5d2-fb3a-11ef-a453-6640c3b0a700', '24fab150-fb3a-11ef-a453-6640c3b0a708', NOW(), 'member'),
    ('24fb2b00-fb3a-11ef-a453-6640c3b0a700', '24fabcfc-fb3a-11ef-a453-6640c3b0a700', '24fab150-fb3a-11ef-a453-6640c3b0a708', NOW(), 'member'),

    ('24fb2c00-fb3a-11ef-a453-6640c3b0a700', '24fa9a1e-fb3a-11ef-a453-6640c3b0a703', '24fab792-fb3a-11ef-a453-6640c3b0a709', NOW(), 'admin'),
    ('24fb2d00-fb3a-11ef-a453-6640c3b0a700', '24faa3a4-fb3a-11ef-a453-6640c3b0a704', '24fab792-fb3a-11ef-a453-6640c3b0a709', NOW(), 'member'),

    -- Smile Gate 워크스페이스 (24fa7058-fb3a-11ef-a453-6640c3b0a700)
    ('24fb2e00-fb3a-11ef-a453-6640c3b0a700', '24fac632-fb3a-11ef-a453-6640c3b0a700', '24fac210-fb3a-11ef-a453-6640c3b0a711', NOW(), 'admin'),
    ('24fb2f00-fb3a-11ef-a453-6640c3b0a700', '24face4a-fb3a-11ef-a453-6640c3b0a700', '24fac210-fb3a-11ef-a453-6640c3b0a711', NOW(), 'member'),

    -- Online DevCamp 워크스페이스 (24fa79f4-fb3a-11ef-a453-6640c3b0a700)
    ('24fb3000-fb3a-11ef-a453-6640c3b0a700', '24fae49c-fb3a-11ef-a453-6640c3b0a700', '24fad010-fb3a-11ef-a453-6640c3b0a714', NOW(), 'admin'),
    ('24fb3100-fb3a-11ef-a453-6640c3b0a700', '24faea02-fb3a-11ef-a453-6640c3b0a700', '24fad010-fb3a-11ef-a453-6640c3b0a714', NOW(), 'member'),

    -- Smile Work 워크스페이스 (24fa8516-fb3a-11ef-a453-6640c3b0a700)
    ('24fb3200-fb3a-11ef-a453-6640c3b0a700', '24fb05aa-fb3a-11ef-a453-6640c3b0a701', '24fae410-fb3a-11ef-a453-6640c3b0a718', NOW(), 'admin'),
    ('24fb3300-fb3a-11ef-a453-6640c3b0a700', '24fb0a6c-fb3a-11ef-a453-6640c3b0a702', '24fae410-fb3a-11ef-a453-6640c3b0a718', NOW(), 'member'),
    ('24fb3400-fb3a-11ef-a453-6640c3b0a700', '24fb0f2e-fb3a-11ef-a453-6640c3b0a703', '24fae410-fb3a-11ef-a453-6640c3b0a718', NOW(), 'member'),
    ('24fb3500-fb3a-11ef-a453-6640c3b0a700', '24fb14f2-fb3a-11ef-a453-6640c3b0a704', '24fae410-fb3a-11ef-a453-6640c3b0a718', NOW(), 'member'),
    ('24fb3600-fb3a-11ef-a453-6640c3b0a700', '24fb1ac6-fb3a-11ef-a453-6640c3b0a705', '24fae410-fb3a-11ef-a453-6640c3b0a718', NOW(), 'member');