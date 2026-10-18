import {
  ResumeData,
  InterviewQuestion,
  QuizQuestion,
  PortfolioData,
  StudentProfile,
  AppSettings,
} from '../types';

export const initialStudentProfile: StudentProfile = {
  name: '',
  email: '',
  college: '',
  graduationYear: '2026',
  targetRole: '',
  dreamCompanies: ['Google', 'Microsoft', 'Atlassian', 'Uber', 'Razorpay'],
  streakDays: 5,
  lastActiveDate: new Date().toISOString().split('T')[0],
  targetPlacementDate: '2026-11-20',
};

export const initialSettings: AppSettings = {
  themeMode: 'system',
  accentColor: 'indigo',
  viewMode: 'responsive',
  soundEnabled: true,
  hapticFeedback: true,
};

export const sampleResumeData: ResumeData = {
  id: 'resume-default-01',
  title: 'Software Engineer - Campus Placement ATS Resume',
  lastModified: Date.now(),
  personalInfo: {
    fullName: '',
    email: 'student@campus.edu',
    phone: '+91 98765 43210',
    location: 'Bengaluru, India',
    linkedin: 'linkedin.com/in/student-tech',
    github: 'github.com/student-dev',
    portfolioUrl: 'student-dev.portfolio',
    summary:
      'Proactive Computer Science undergraduate with hands-on experience building scalable web and Android applications using Kotlin, Java, TypeScript, and modern frameworks. Strong foundations in Data Structures, Algorithms, DBMS, and distributed systems.',
  },
  education: [
    {
      id: 'edu-1',
      institution: 'National Institute of Technology',
      degree: 'Bachelor of Technology',
      fieldOfStudy: 'Computer Science & Engineering',
      startDate: '2022',
      endDate: '2026',
      grade: 'CGPA: 8.92 / 10.0',
      location: 'Bengaluru, India',
    },
    {
      id: 'edu-2',
      institution: 'Delhi Public School',
      degree: 'Higher Secondary Certificate (CBSE Class XII)',
      fieldOfStudy: 'Physics, Chemistry, Mathematics & CS',
      startDate: '2020',
      endDate: '2022',
      grade: '96.4%',
      location: 'New Delhi, India',
    },
  ],
  experience: [
    {
      id: 'exp-1',
      title: 'Android & Full-Stack Developer Intern',
      company: 'Veloce Mobility Labs',
      location: 'Bengaluru, India (Hybrid)',
      startDate: 'May 2025',
      endDate: 'Jul 2025',
      current: false,
      bulletPoints: [
        'Architected native Android telemetry module using Kotlin, Jetpack Compose, and Coroutines, reducing battery drain by 28%.',
        'Implemented offline-first caching layer using Room database and StateFlow, enabling zero-latency cached route queries.',
        'Collaborated in an agile team of 5 to integrate RESTful backend microservices, boosting payload synchronization reliability to 99.8%.',
      ],
    },
    {
      id: 'exp-2',
      title: 'Open Source Contributor & Campus Tech Lead',
      company: 'Developer Student Club (Google DSC)',
      location: 'Campus',
      startDate: 'Aug 2024',
      endDate: 'Present',
      current: true,
      bulletPoints: [
        'Organized 6 hands-on workshops on DSA in Java/C++ and Modern Android Compose, mentoring 250+ junior undergraduates.',
        'Spearheaded open-source student placement portal handling 1,200+ mock aptitude submissions with 99.9% uptime.',
      ],
    },
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'CampusRide - Peer Transit Booking App',
      description: 'Android ride-pooling app for university students with real-time location tracking.',
      techStack: ['Kotlin', 'Jetpack Compose', 'Room', 'Retrofit', 'Google Maps SDK'],
      githubUrl: 'https://github.com/aaravsharma/campus-ride',
      liveUrl: 'https://campusride.dev',
      bulletPoints: [
        'Built modern Material 3 UI with Jetpack Compose, adhering to clean MVVM architecture and single-source-of-truth state.',
        'Integrated WebSocket-based live driver location polling with exponential backoff retry mechanism.',
        'Secured 4.8/5 rating in university beta trial with over 450 active student riders.',
      ],
    },
    {
      id: 'proj-2',
      title: 'Distributed Distributed Cache & Rate Limiter',
      description: 'High-throughput in-memory caching daemon featuring sliding window log rate limiting.',
      techStack: ['Java', 'Spring Boot', 'Redis', 'Docker', 'JUnit 5'],
      githubUrl: 'https://github.com/aaravsharma/rate-limiter-redis',
      liveUrl: 'https://demo.ratelimiter.internal',
      bulletPoints: [
        'Constructed custom token-bucket and sliding-window rate limiters capable of processing 15,000 req/sec under 8ms latency.',
        'Wrote 40+ unit and integration tests using JUnit 5 and Testcontainers, reaching 94% test code coverage.',
      ],
    },
    {
      id: 'proj-3',
      title: 'DevCollab - Real-time Collaborative Code Workspace',
      description: 'Browser-based pair programming playground with synchronized syntax editor and compiler.',
      techStack: ['React', 'TypeScript', 'Node.js', 'WebSockets', 'Tailwind CSS'],
      githubUrl: 'https://github.com/aaravsharma/dev-collab',
      liveUrl: 'https://devcollab-demo.app',
      bulletPoints: [
        'Engineered operational transformation engine enabling conflict-free concurrent editing for up to 6 developers.',
        'Designed dark-mode Material UI dashboard reducing visual strain during nighttime programming marathons.',
      ],
    },
  ],
  skills: {
    languages: ['Kotlin', 'Java', 'Python', 'TypeScript', 'C++', 'SQL'],
    frameworks: ['Jetpack Compose', 'Android SDK', 'Spring Boot', 'React', 'Node.js', 'Tailwind CSS'],
    developerTools: ['Git & GitHub', 'Android Studio', 'Docker', 'Postman', 'Figma', 'Linux / Bash'],
    coreConcepts: ['Data Structures & Algorithms', 'Object-Oriented Design (SOLID)', 'Operating Systems & Concurrency', 'Database Management (DBMS)', 'Computer Networks'],
  },
  certifications: [
    {
      id: 'cert-1',
      name: 'Associate Android Developer Certification',
      issuer: 'Google Developers',
      issueDate: 'Jan 2025',
      credentialUrl: 'https://credential.google.com/verify-aad-1234',
    },
    {
      id: 'cert-2',
      name: 'AWS Certified Cloud Practitioner',
      issuer: 'Amazon Web Services',
      issueDate: 'Sep 2024',
      credentialUrl: 'https://aws.amazon.com/verification/ccp-8910',
    },
  ],
};

export const sampleInterviewQuestions: InterviewQuestion[] = [
  // Behavioral & HR (STAR)
  {
    id: 'int-1',
    category: 'behavioral',
    categoryLabel: 'Behavioral & HR',
    difficulty: 'Medium',
    subtopic: 'Conflict Resolution & Teamwork',
    question: 'Tell me about a time when you had a disagreement with a team member during a technical project. How did you resolve it?',
    modelAnswer:
      'During my 3rd year Capstone project, my teammate and I disagreed on whether to use a NoSQL database or a Relational PostgreSQL database for our campus placement tracking app. I preferred PostgreSQL because our data schema (students, placements, companies, interview rounds) was highly relational and demanded strict ACID guarantees to prevent duplicate application submissions. My colleague wanted MongoDB because they were familiar with JSON documents.\n\nRather than arguing, I proposed we map our core query access patterns and run a quick benchmark with foreign key constraints. I demonstrated that managing referential integrity in application code would add 40% more boilerplate and risk corrupted student statuses. My colleague agreed, and in exchange, I invited them to lead the API layer design. We delivered on time with zero schema anomalies.',
    keyPoints: [
      'Focus on objective data and benchmarks rather than personal opinions.',
      'Show empathy and collaborative compromise.',
      'Clearly describe the positive project outcome.',
    ],
    starBreakdown: {
      situation: 'Building a placement tracking system with a team of 4 where database selection caused a stalemate.',
      task: 'Resolve the architectural conflict without causing friction or delaying our project milestone.',
      action: 'Set up an objective query pattern matrix and simulated ACID requirements versus application-level joining complexity.',
      result: 'Adopted PostgreSQL unanimously, delivered the project 1 week ahead of deadline, and received an "A" grade.',
    },
  },
  {
    id: 'int-2',
    category: 'behavioral',
    categoryLabel: 'Behavioral & HR',
    difficulty: 'Easy',
    subtopic: 'Personal Pitch & Self-Introduction',
    question: 'Walk me through your resume and why you want to join our engineering team.',
    modelAnswer:
      'I am a pre-final year Computer Science student passionate about mobile and distributed systems engineering. Over the past three years, I have built production-grade Android apps with Jetpack Compose and contributed to open-source projects. During my internship at Veloce Mobility, I optimized telemetry pipelines reducing battery draw by 28% and learned how engineering choices directly impact user battery life and network latency.\n\nI want to join your team because your product solves large-scale performance challenges for millions of users daily. I am eager to apply my strong foundations in data structures and modern Kotlin/Java to help build reliable, accessible features while learning from experienced seniors.',
    keyPoints: [
      'Chronological anchor: Education -> Hands-on projects -> Real intern impact.',
      'Connect personal passion directly to company mission.',
      'End with forward-looking enthusiasm.',
    ],
    starBreakdown: {
      situation: 'Opening question in round 1 technical or HR interview.',
      task: 'Deliver a crisp, 90-second narrative highlighting technical curiosity and tangible results.',
      action: 'Synthesize academic foundations, internship telemetry milestone, and company alignment.',
      result: 'Sets a confident, metric-oriented tone for the rest of the interview.',
    },
  },
  {
    id: 'int-3',
    category: 'behavioral',
    categoryLabel: 'Behavioral & HR',
    difficulty: 'Hard',
    subtopic: 'Handling Failure & Adaptability',
    question: 'Tell me about a time you failed or missed a critical deadline. What did you learn?',
    modelAnswer:
      'In our first 48-hour national hackathon, our team planned an ambitious AI-based real-time interview proctoring app. We spent the first 30 hours obsessing over complex ML model training from scratch instead of validating an end-to-end working MVP. With 4 hours left, our frontend could not communicate with the unfinished Python model, and we failed to submit a working demo.\n\nThat failure taught me the invaluable lesson of the "Steel Thread" architecture: build an ultra-thin end-to-end working pipeline first, verify contracts, and only then iterate on complex layers. In our subsequent hackathon, we applied this rule, shipped our working MVP by hour 18, and won 1st prize.',
    keyPoints: [
      'Admit genuine failure without blaming external factors.',
      'Highlight self-reflection and the specific systemic takeaway.',
      'Demonstrate how you applied the lesson in a subsequent scenario.',
    ],
  },

  // DSA
  {
    id: 'int-4',
    category: 'dsa',
    categoryLabel: 'Data Structures & Algorithms',
    difficulty: 'Medium',
    subtopic: 'Two Pointers & Arrays',
    question: 'Given an array of integers and an integer target, how do you find two numbers such that they add up to target? What are the time and space trade-offs?',
    modelAnswer:
      'There are three primary approaches:\n1. Brute Force: Check every pair with nested loops: O(N²) time, O(1) space.\n2. Hash Map (Optimal for unsorted): Traverse once. For each element `x`, check if `target - x` exists in the map. If yes, return indices; otherwise insert `(x, index)`: O(N) time and O(N) auxiliary space.\n3. Two Pointers (Optimal if sorted): If the array is already sorted, initialize left pointer at 0 and right pointer at N-1. If sum < target, increment left. If sum > target, decrement right. Time is O(N) with O(1) auxiliary space (or O(N log N) if sorting is required).',
    keyPoints: [
      'Clarify input constraints: Is the array sorted? Are duplicates allowed? Can elements be negative?',
      'Hash map provides O(N) time with O(N) space.',
      'Two pointers provides O(1) auxiliary space if sorted.',
    ],
    codeSnippet: {
      language: 'kotlin',
      code: `fun twoSum(nums: IntArray, target: Int): IntArray {
    val map = HashMap<Int, Int>() // complement -> index
    for (i in nums.indices) {
        val complement = target - nums[i]
        if (map.containsKey(complement)) {
            return intArrayOf(map[complement]!!, i)
        }
        map[nums[i]] = i
    }
    throw IllegalArgumentException("No two sum solution found")
}`,
    },
  },
  {
    id: 'int-5',
    category: 'dsa',
    categoryLabel: 'Data Structures & Algorithms',
    difficulty: 'Medium',
    subtopic: 'Trees & Traversals',
    question: 'How do you check if a Binary Tree is a valid Binary Search Tree (BST)? Why is simple local child checking insufficient?',
    modelAnswer:
      'A common pitfall is checking only that `node.left.val < node.val < node.right.val` locally. This fails because every node in the entire left subtree must be strictly less than the root, and every node in the entire right subtree must be strictly greater than the root.\n\nThe correct approach passes down allowed bounds `(minVal, maxVal)`:\n1. Base case: If node is null, return true.\n2. If `node.val <= minVal` or `node.val >= maxVal`, return false.\n3. Recursively validate `validate(node.left, minVal, node.val)` and `validate(node.right, node.val, maxVal)`.\nAlternatively, an Inorder Traversal of a valid BST must yield a strictly monotonically increasing sequence.',
    keyPoints: [
      'Local checks fail global BST properties.',
      'Bounding range (Long.MIN_VALUE to Long.MAX_VALUE) prevents integer overflow.',
      'Time complexity is O(N), Space is O(H) where H is tree height for recursion stack.',
    ],
    codeSnippet: {
      language: 'kotlin',
      code: `fun isValidBST(root: TreeNode?): Boolean {
    return validate(root, null, null)
}

private fun validate(node: TreeNode?, min: Long?, max: Long?): Boolean {
    if (node == null) return true
    val value = node.value.toLong()
    if (min != null && value <= min) return false
    if (max != null && value >= max) return false
    return validate(node.left, min, value) && validate(node.right, value, max)
}`,
    },
  },
  {
    id: 'int-6',
    category: 'dsa',
    categoryLabel: 'Data Structures & Algorithms',
    difficulty: 'Hard',
    subtopic: 'Dynamic Programming',
    question: 'Explain the 0/1 Knapsack problem. What is the difference between 0/1 Knapsack and Fractional Knapsack?',
    modelAnswer:
      'In 0/1 Knapsack, items cannot be broken into fractions; you either take the entire item or leave it. This cannot be solved greedily because taking a high value-per-weight item might leave unused capacity that prevents fitting a pair of items with higher combined value. It requires Dynamic Programming:\n- DP State: `dp[i][w]` is the maximum value obtainable using a subset of the first `i` items with max weight capacity `w`.\n- Transition: `dp[i][w] = max(dp[i-1][w], dp[i-1][w - weight[i]] + value[i])`.\n- Space can be optimized to O(W) using a 1D array traversing backwards.\n\nIn Fractional Knapsack, items can be subdivided (e.g. grains, liquids). This exhibits the Greedy Choice Property and can be solved in O(N log N) by sorting by value-to-weight ratio.',
    keyPoints: [
      '0/1 requires DP due to overlapping subproblems and indivisibility: O(N * W).',
      'Fractional is solved greedily by ratio: O(N log N).',
      '1D space optimization requires iterating capacity backwards to avoid using the same item twice.',
    ],
  },

  // Core CS (OS, DBMS, Networks)
  {
    id: 'int-7',
    category: 'core_cs',
    categoryLabel: 'Core CS Foundations',
    difficulty: 'Medium',
    subtopic: 'Operating Systems & Concurrency',
    question: 'What is the difference between a Process and a Thread? What is a Deadlock and what are the 4 Coffman conditions?',
    modelAnswer:
      'A Process is an executing instance of a program with its own independent address space, file descriptors, and security context. A Thread is a lightweight unit of execution within a process that shares the process code, data, and heap, but maintains its own program counter, registers, and call stack.\n\nA Deadlock occurs when a set of processes are blocked because each is holding a resource and waiting for another resource held by another process in the set.\n\nThe 4 Necessary Coffman Conditions are:\n1. Mutual Exclusion: Resources cannot be shared simultaneously.\n2. Hold and Wait: A process holds at least one resource and requests additional resources.\n3. No Preemption: Resources cannot be forcibly confiscated from a process.\n4. Circular Wait: A closed chain of processes exists where each process waits for a resource held by the next.',
    keyPoints: [
      'Threads share memory (faster IPC, risk of race conditions); processes have isolated memory.',
      'Deadlock prevention requires breaking at least one of the 4 Coffman conditions (e.g. resource ordering breaks circular wait).',
    ],
  },
  {
    id: 'int-8',
    category: 'core_cs',
    categoryLabel: 'Core CS Foundations',
    difficulty: 'Medium',
    subtopic: 'DBMS & Indexing',
    question: 'Explain ACID properties in relational databases and how B+ Trees optimize database index lookups.',
    modelAnswer:
      'ACID stands for:\n- Atomicity: Transactions are "all or nothing" (managed via Write-Ahead Logging / WAL).\n- Consistency: Transactions transition the database from one valid state to another, satisfying all constraints.\n- Isolation: Concurrent transactions do not interfere with each other (achieved via locking or MVCC).\n- Durability: Once committed, updates persist even across system crashes.\n\nWhy B+ Trees for indices?\nUnlike standard Binary Search Trees, B+ Trees have a very high branching factor (fan-out), which drastically reduces tree height (usually 3–4 levels for millions of records). This minimizes slow disk/block I/O. Furthermore, all leaf nodes are linked in a contiguous doubly linked list, making range queries (e.g. `WHERE age BETWEEN 20 AND 30`) extraordinarily fast without re-traversing internal nodes.',
    keyPoints: [
      'ACID guarantees transaction integrity in financial and transactional systems.',
      'High fan-out in B+ Trees minimizes disk seeks.',
      'Doubly linked leaves enable linear scanning for range queries.',
    ],
  },
  {
    id: 'int-9',
    category: 'core_cs',
    categoryLabel: 'Core CS Foundations',
    difficulty: 'Easy',
    subtopic: 'Computer Networks',
    question: 'What happens in the TCP 3-Way Handshake? Why is it 3 steps instead of 2?',
    modelAnswer:
      'The TCP 3-Way Handshake establishes a reliable, bidirectional stream connection:\n1. SYN: Client sends SYN packet with an initial sequence number `ISN_c` to server.\n2. SYN-ACK: Server receives SYN, allocates buffers, and responds with SYN (with server `ISN_s`) and ACK (`ISN_c + 1`).\n3. ACK: Client sends ACK (`ISN_s + 1`) back to server. Connection is now ESTABLISHED.\n\nWhy 3 steps instead of 2?\nBoth parties need to guarantee that their respective sequence numbers have been received and acknowledged by the other. If it were only 2 steps, delayed duplicate SYN packets from old disconnected sessions could arrive at the server, causing the server to allocate resources and falsely believe a live connection exists without the client ever knowing.',
    keyPoints: [
      'SYN -> SYN-ACK -> ACK.',
      'Synchronizes sequence numbers in both directions.',
      'Prevents half-open connections caused by delayed duplicate packets.',
    ],
  },

  // System Design
  {
    id: 'int-10',
    category: 'system_design',
    categoryLabel: 'System Design for Freshers',
    difficulty: 'Medium',
    subtopic: 'URL Shortener (TinyURL)',
    question: 'How would you design a scalable URL shortener like TinyURL or bit.ly? Walk through the high-level components and collision handling.',
    modelAnswer:
      '1. Functional Requirements: Shorten long URL to unique 7-character alias; redirect alias to original URL within <50ms.\n2. Capacity Estimation: 100M URLs/month. 7 base62 characters (a-z, A-Z, 0-9) yields 62^7 ≈ 3.5 trillion unique URLs, sufficient for decades.\n3. Core Components:\n   - API Gateway / Reverse Proxy (Load balancing & rate limiting).\n   - URL Service: Receives POST `/shorten`, generates key using Base62 encoding of an auto-incrementing 64-bit ID (from distributed ID generator like Snowflake or ZooKeeper range allocation) to guarantee zero collisions without retry overhead.\n   - Database: Relational or Key-Value store (Cassandra or PostgreSQL) mapping `short_key -> original_url`.\n   - Caching Layer: Redis cluster caching top 20% most accessed URLs (Pareto 80/20 rule), reducing DB reads by ~80%.\n4. Redirection: Return HTTP 302 (Found) if we want analytics tracking, or HTTP 301 (Permanent Redirect) if we want browser-level caching to offload our servers.',
    keyPoints: [
      'Base62 encoding of unique distributed IDs avoids hashing collisions (unlike MD5/SHA truncated hashes).',
      'Redis cache handles heavy read-to-write ratios (typically 10:1 or 100:1).',
      'Explain trade-off between 301 (browser cached, zero telemetry) vs 302 (server hit, accurate analytics).',
    ],
  },
];

export const sampleQuizQuestions: QuizQuestion[] = [
  // Quantitative Aptitude
  {
    id: 'quiz-q-1',
    category: 'quantitative',
    categoryLabel: 'Quantitative Aptitude',
    question: 'A can complete a piece of work in 12 days, and B can complete the same work in 18 days. If they work together for 4 days, what fraction of the work remains unfinished?',
    options: [
      { id: 'opt-a', text: '5 / 9' },
      { id: 'opt-b', text: '4 / 9' },
      { id: 'opt-c', text: '1 / 3' },
      { id: 'opt-d', text: '2 / 9' },
    ],
    correctOptionId: 'opt-b',
    formulaOrRule: 'Total Work = LCM(12, 18) = 36 units. Rate = Work / Days.',
    explanation:
      'Let total work = LCM(12, 18) = 36 units.\n- A\'s 1-day rate = 36 / 12 = 3 units/day.\n- B\'s 1-day rate = 36 / 18 = 2 units/day.\nCombined rate of (A + B) = 3 + 2 = 5 units/day.\nIn 4 days, they complete: 4 × 5 = 20 units.\nRemaining work = 36 - 20 = 16 units.\nFraction of work remaining = 16 / 36 = 4 / 9.',
  },
  {
    id: 'quiz-q-2',
    category: 'quantitative',
    categoryLabel: 'Quantitative Aptitude',
    question: 'In how many different ways can the letters of the word "LEADING" be arranged such that the vowels always appear together?',
    options: [
      { id: 'opt-a', text: '360' },
      { id: 'opt-b', text: '720' },
      { id: 'opt-c', text: '1440' },
      { id: 'opt-d', text: '5040' },
    ],
    correctOptionId: 'opt-b',
    formulaOrRule: 'Permutation with grouping: Treat grouped elements as 1 single block.',
    explanation:
      'In the word "LEADING", there are 7 letters.\nVowels: E, A, I (3 vowels).\nConsonants: L, D, N, G (4 consonants).\nSince vowels must appear together, bundle (E, A, I) as 1 single entity.\nNow we have 4 consonants + 1 vowel bundle = 5 entities.\nThese 5 entities can be arranged in 5! ways = 120.\nThe 3 vowels inside the bundle can be arranged among themselves in 3! ways = 6.\nTotal arrangements = 5! × 3! = 120 × 6 = 720 ways.',
  },
  {
    id: 'quiz-q-3',
    category: 'quantitative',
    categoryLabel: 'Quantitative Aptitude',
    question: 'A train 180 meters long is traveling at a speed of 72 km/h. How many seconds will it take to pass an electric pole?',
    options: [
      { id: 'opt-a', text: '7.5 seconds' },
      { id: 'opt-b', text: '9 seconds' },
      { id: 'opt-c', text: '10 seconds' },
      { id: 'opt-d', text: '12 seconds' },
    ],
    correctOptionId: 'opt-b',
    formulaOrRule: 'Speed in m/s = Speed in km/h × (5 / 18). Time = Distance / Speed.',
    explanation:
      'First convert speed from km/h to m/s:\n72 × (5 / 18) = 4 × 5 = 20 m/s.\nWhen a train passes a pole (negligible width), distance covered equals the length of the train.\nDistance = 180 meters.\nTime = Distance / Speed = 180 / 20 = 9 seconds.',
  },
  {
    id: 'quiz-q-4',
    category: 'quantitative',
    categoryLabel: 'Quantitative Aptitude',
    question: 'If the price of sugar increases by 25%, by what percentage must a household reduce its consumption so that the total expenditure remains unchanged?',
    options: [
      { id: 'opt-a', text: '20%' },
      { id: 'opt-b', text: '25%' },
      { id: 'opt-c', text: '16.67%' },
      { id: 'opt-d', text: '30%' },
    ],
    correctOptionId: 'opt-a',
    formulaOrRule: 'Reduction % = [ R / (100 + R) ] × 100%',
    explanation:
      'Using standard formula for constant expenditure:\nReduction % = [ 25 / (100 + 25) ] × 100\n= [ 25 / 125 ] × 100\n= (1 / 5) × 100 = 20%.\n\nVerification: Let original price = ₹100, consumption = 100 units (Cost = ₹10,000). New price = ₹125. New consumption for ₹10,000 = 10,000 / 125 = 80 units. Reduction is 20 units out of 100 (20%).',
  },

  // Logical Reasoning
  {
    id: 'quiz-q-5',
    category: 'logical',
    categoryLabel: 'Logical Reasoning',
    question: 'Pointing to a photograph, Rohit said, "She is the daughter of the only son of my grandfather." How is the girl in the photograph related to Rohit?',
    options: [
      { id: 'opt-a', text: 'Sister' },
      { id: 'opt-b', text: 'Cousin' },
      { id: 'opt-c', text: 'Aunt' },
      { id: 'opt-d', text: 'Daughter' },
    ],
    correctOptionId: 'opt-a',
    formulaOrRule: 'Break relations step by step from possessive references.',
    explanation:
      'Step 1: "My grandfather" -> Rohit\'s grandfather.\nStep 2: "Only son of my grandfather" -> Rohit\'s father (since grandfather has only one son).\nStep 3: "Daughter of my father" -> Rohit\'s sister.\nTherefore, the girl in the photograph is Rohit\'s sister.',
  },
  {
    id: 'quiz-q-6',
    category: 'logical',
    categoryLabel: 'Logical Reasoning',
    question: 'Statements:\nI. All laptops are devices.\nII. Some devices are gadgets.\nConclusions:\n1. Some gadgets are laptops.\n2. All devices are laptops.\nWhich conclusion logically follows?',
    options: [
      { id: 'opt-a', text: 'Only conclusion 1 follows' },
      { id: 'opt-b', text: 'Only conclusion 2 follows' },
      { id: 'opt-c', text: 'Either 1 or 2 follows' },
      { id: 'opt-d', text: 'Neither 1 nor 2 follows' },
    ],
    correctOptionId: 'opt-d',
    formulaOrRule: 'Venn diagram test: A conclusion must hold in all possible overlapping sets.',
    explanation:
      '- Laptops (L) is a subset of Devices (D).\n- Gadgets (G) intersects with Devices (D), but does not necessarily touch Laptops (L).\nConclusion 1: Some gadgets are laptops -> Not necessarily true; G and L might be disjoint.\nConclusion 2: All devices are laptops -> False, because L is a subset of D, not equal to D.\nHence, neither conclusion follows.',
  },
  {
    id: 'quiz-q-7',
    category: 'logical',
    categoryLabel: 'Logical Reasoning',
    question: 'Find the missing number in the sequence: 4, 9, 25, 49, 121, ?',
    options: [
      { id: 'opt-a', text: '144' },
      { id: 'opt-b', text: '169' },
      { id: 'opt-c', text: '196' },
      { id: 'opt-d', text: '225' },
    ],
    correctOptionId: 'opt-b',
    formulaOrRule: 'Square of consecutive prime numbers: 2, 3, 5, 7, 11, 13...',
    explanation:
      'Observe the terms:\n- 4 = 2²\n- 9 = 3²\n- 25 = 5²\n- 49 = 7²\n- 121 = 11²\nThe bases are consecutive prime numbers: 2, 3, 5, 7, 11.\nThe next prime number is 13.\nTherefore, the missing number is 13² = 169.',
  },

  // Verbal Ability
  {
    id: 'quiz-q-8',
    category: 'verbal',
    categoryLabel: 'Verbal & Language Ability',
    question: 'Select the word that is most nearly OPPOSITE in meaning to the capitalized word: CANDID',
    options: [
      { id: 'opt-a', text: 'Blunt' },
      { id: 'opt-b', text: 'Deceitful' },
      { id: 'opt-c', text: 'Frank' },
      { id: 'opt-d', text: 'Sincere' },
    ],
    correctOptionId: 'opt-b',
    formulaOrRule: 'Antonym recognition: Candid = truthful, outspoken, straightforward.',
    explanation:
      'CANDID means truthful, frank, straightforward, and open. Words like Blunt, Frank, and Sincere are synonyms. The direct antonym is Deceitful (or secretive/guarded).',
  },
  {
    id: 'quiz-q-9',
    category: 'verbal',
    categoryLabel: 'Verbal & Language Ability',
    question: 'Identify the grammatically correct sentence:',
    options: [
      { id: 'opt-a', text: 'Neither the manager nor the engineers was present in the meeting.' },
      { id: 'opt-b', text: 'Neither the manager nor the engineers were present in the meeting.' },
      { id: 'opt-c', text: 'Neither the manager or the engineers was present in the meeting.' },
      { id: 'opt-d', text: 'Either the manager nor the engineers were present in the meeting.' },
    ],
    correctOptionId: 'opt-b',
    formulaOrRule: 'Proximity Rule for correlative conjunctions: "Neither... nor" matches verb with the closer subject.',
    explanation:
      'When two subjects are connected by "Neither... nor", the verb agrees with the subject closer to it. Here, "engineers" is plural and closest to the verb, so the plural verb "were" is grammatically required.',
  },

  // Data Interpretation
  {
    id: 'quiz-q-10',
    category: 'data_interpretation',
    categoryLabel: 'Data Interpretation',
    question: 'A tech startup hired 60 engineers in Year 1, 90 in Year 2, and 135 in Year 3. What is the compound annual growth rate (CAGR) of hiring from Year 1 to Year 3?',
    options: [
      { id: 'opt-a', text: '45%' },
      { id: 'opt-b', text: '50%' },
      { id: 'opt-c', text: '60%' },
      { id: 'opt-d', text: '75%' },
    ],
    correctOptionId: 'opt-b',
    formulaOrRule: 'CAGR = (End Value / Start Value)^(1 / periods) - 1',
    explanation:
      'Ratio Year 2 / Year 1 = 90 / 60 = 1.50 (+50%).\nRatio Year 3 / Year 2 = 135 / 90 = 1.50 (+50%).\nSince hiring grew by exactly 50% in both successive years, the annual growth rate is steady at 50% per year.',
  },
];

export const samplePortfolioData: PortfolioData = {
  fullName: '',
  headline: 'Pre-final Year CS Student & Android Compose Developer',
  bio: 'Passionate about engineering elegant, high-performance Android mobile apps and distributed backends. Active hackathon participant, Google DSC lead, and open-source contributor.',
  targetRole: 'Software Development Engineer (Mobile & Backend)',
  university: 'National Institute of Technology',
  graduationYear: 'Class of 2026',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  template: 'modern',
  socials: {
    github: 'https://github.com/aaravsharma',
    linkedin: 'https://linkedin.com/in/aarav-sharma-tech',
    leetcode: 'https://leetcode.com/aarav_codes',
    email: 'aarav.sharma@campus.edu',
    website: 'https://aaravsharma.dev',
    phone: '+91 98765 43210',
  },
  skills: [
    'Kotlin',
    'Jetpack Compose',
    'Android SDK',
    'Coroutines & Flow',
    'Room DB',
    'Java',
    'Spring Boot',
    'TypeScript',
    'React',
    'PostgreSQL',
    'Git & CI/CD',
    'System Design',
  ],
  educationList: [
    {
      id: 'p-edu-1',
      institution: 'National Institute of Technology',
      degree: 'B.Tech in Computer Science & Engineering',
      fieldOfStudy: 'Computer Science',
      year: '2022 - 2026',
      score: 'CGPA: 8.92 / 10.0',
    },
    {
      id: 'p-edu-2',
      institution: 'Delhi Public School',
      degree: 'Higher Secondary (CBSE Class XII)',
      fieldOfStudy: 'Physics, Chemistry, Mathematics & CS',
      year: '2020 - 2022',
      score: '96.4%',
    },
  ],
  experienceList: [
    {
      id: 'p-exp-1',
      role: 'Android & Full-Stack Developer Intern',
      company: 'Veloce Mobility Labs',
      period: 'May 2025 - Jul 2025',
      description:
        'Architected native Android telemetry module using Kotlin, Jetpack Compose, and Coroutines, reducing battery drain by 28%. Implemented offline caching layer with Room DB.',
    },
    {
      id: 'p-exp-2',
      role: 'Campus Lead & Open-Source Contributor',
      company: 'Google Developer Student Clubs (GDSC)',
      period: 'Aug 2024 - Present',
      description:
        'Mentored 250+ junior undergraduates across Kotlin, Compose, and DSA workshops. Organized annual campus hackathon with 400+ attendees.',
    },
  ],
  projects: [
    {
      id: 'p-1',
      title: 'CampusRide Android App',
      tagline: 'Material 3 Peer Carpooling & Shuttle Tracker for Universities',
      description:
        'A clean, reactive Android application built 100% with Jetpack Compose, Coroutines, and Room local persistence. Includes live transit location tracking and university domain verification.',
      tags: ['Kotlin', 'Compose', 'Coroutines', 'Room', 'Maps SDK'],
      imageUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80',
      github: 'https://github.com/aaravsharma/campus-ride',
      demo: 'https://campusride.dev',
    },
    {
      id: 'p-2',
      title: 'Sliding-Window Rate Limiter Daemon',
      tagline: 'High-throughput in-memory rate limiting engine in Java',
      description:
        'Distributed token bucket and sliding window rate-limiting middleware capable of handling 15k+ req/sec with <8ms p99 latency.',
      tags: ['Java', 'Spring Boot', 'Redis', 'Docker', 'JUnit 5'],
      imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
      github: 'https://github.com/aaravsharma/rate-limiter-redis',
      demo: 'https://demo.ratelimiter.internal',
    },
    {
      id: 'p-3',
      title: 'CareerMate Companion App',
      tagline: 'College Placement, ATS Resume & Aptitude Quiz Platform',
      description:
        'All-in-one preparation suite for undergraduate engineering students with real-time Harvard ATS resume export, timed aptitude tests, and interview bank.',
      tags: ['Jetpack Compose', 'TypeScript', 'Tailwind CSS', 'PWA'],
      imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
      github: 'https://github.com/aaravsharma/careermate',
      demo: 'https://careermate.app',
    },
  ],
  theme: 'modern_slate',
};
