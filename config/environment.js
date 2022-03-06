// export const dbURI = 'mongodb://localhost/sei-flex-movies'
export const dbURI = process.env.MONGODB_URI ?? 'mongodb://localhost/movies-db'
export const port = process.env.PORT ?? 9876
export const secret = 'this is a secret that only the developer knows'
