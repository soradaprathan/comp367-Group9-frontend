module.exports = {
    collectCoverage: true,
    coverageDirectory: "coverage",
    collectCoverageFrom: [
        "**/*.{js,jsx,ts,tsx}",
        "!**/node_modules/**",
        "!**/vendor/**",
        "!**/*.d.ts"
    ],
    coverageReporters: ["json", "lcov", "text", "clover"],
    projects: [
        '<rootDir>/apps/toyhubshop',
        '<rootDir>/apps/admin',
        '<rootDir>/libs/ui',
        '<rootDir>/libs/products',
        '<rootDir>/libs/users',
        '<rootDir>/libs/orders'
    ]
};
