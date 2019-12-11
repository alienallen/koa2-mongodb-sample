function getPort() {
    const env = process.env.NODE_ENV
    return env == 'development' ? '9000' : (env == 'staging' ? '9001' : (env == 'production' ? '80' : '9000'))
}

function getDbConnectionString() {
    const env = process.env.NODE_ENV
    const devString = 'mongodb://localhost:27017/testDB'
    const uatString = 'mongodb://localhost:27017/testDB'
    const prodString = 'mongodb://127.0.0.1:27017/testDB'
    return env == 'development' ? devString : (env == 'staging' ? uatString : (env == 'production' ? prodString : devString))
}

module.exports = {
    mode: process.env.NODE_ENV || 'development',
    port: getPort(),
    connectionString: getDbConnectionString()
}