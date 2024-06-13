export const EnvConfiguration = () => ({
    environment: process.env.NODE_ENV || 'dev',
    mongodb: process.env.MONGODB,
    port: process.env.PORT || 3000,
    limit: +process.env.DEFAULT_LIMIT || 10,
    skip: +process.env.DEFAULT_SKIP || 0
});

