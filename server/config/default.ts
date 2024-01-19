export default {
    port: 1338,
    client_url: "http://localhost:3000",
    dbURI: "mongodb://localhost:27017/rest-api-tutorial",
    saltWorkFactor: 10,
    // Send out to public -> Validate jwt signature.
    publicKey: `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAt0YMb5HdT8uipo+zIjAk
rLY09wZG/RbjG+VWJV+1nSQBSbVQQVkqzo4m3BIdHTVry/Ooge2hnoPkZAECJItw
9WQ9Tru2tQ0OkY5xjmeKUhSjIyRHZf+qGgG2S+HaLtRIx2n9ZQT/n+2ouds3T+T6
B1pK2VKA3pZmwHD5ky3HLlYrfF9zLLZTMt2M1CHtu7I9eGm402Q56k2mYBef1aTz
g03UiQiuFVyl542ZYX/S0gY6jqNd8VGFJa+epxNKuxu/05/QoWQy09BVSUdzAAbC
5HKYE52WRju6vjW0cC+Yde93fhNkPqCl+VY9DrrCP47hvunZ9lT1eeiTxqaSx5w0
ZwIDAQAB
-----END PUBLIC KEY-----`,
    // Keep private -> Sign token with private key.
    privateKey: `-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAt0YMb5HdT8uipo+zIjAkrLY09wZG/RbjG+VWJV+1nSQBSbVQ
QVkqzo4m3BIdHTVry/Ooge2hnoPkZAECJItw9WQ9Tru2tQ0OkY5xjmeKUhSjIyRH
Zf+qGgG2S+HaLtRIx2n9ZQT/n+2ouds3T+T6B1pK2VKA3pZmwHD5ky3HLlYrfF9z
LLZTMt2M1CHtu7I9eGm402Q56k2mYBef1aTzg03UiQiuFVyl542ZYX/S0gY6jqNd
8VGFJa+epxNKuxu/05/QoWQy09BVSUdzAAbC5HKYE52WRju6vjW0cC+Yde93fhNk
PqCl+VY9DrrCP47hvunZ9lT1eeiTxqaSx5w0ZwIDAQABAoIBABm93/9HuJL9oiHM
6zcxFeWgTf4oRo5DybBgXOIw+DxTE088BUK4eHe8pZ6heK9iknp6BcACFYJDOjAF
qDxjzYDaDHZjjT0O0W4GWNLMnjP7LBLChLjB2S1/8g/kcBXFwVco/utScWkQI3O/
Y5x4J9oih4LQwMMC0vnSpGtUsbZDLJ6b16GNXcdnzkOtPwQT5Ejjn82QiC5HvFaX
k/y8E5AXkZ1h7Lxa7CACyh9PipQD6e2RzbUPpb5yfT0Jcwyh77GXD3ui9qChVVCE
QMYVZfit27o66rx0d6CIsJ2+t0fFX6GHKApihaVwbDxSLFaPypslX0wjJN+R/Ssw
dI8jvKkCgYEA+5TcXYqh7WFJa9sSkX3DNBeDeo0gK79a5OE2wWUCpkk4KzQQd3ZW
JtEArL+h9UM2V8wVLc501NsBww0XEZgxHTfL1i6ccTLmhRfa7HHN7v9r9uFkJAJ+
ScUqeWG8FKZIrQ74F7ihB+nGDhhlwAn2fe9IS7hmpBzHsH35rnTsoGsCgYEAun4R
W9hIiLpP+Sl29vkhyBWeHDNmk2pU8G5xxpjnCsgjr7O04TS2qmRBuELt6lz9KeMS
7A8F4dIHVZ8VVYd0H6HXkFuhEF9rafbPeA6CW7/DkOyfmNP9Z30/mDYLeSx+gmDm
sUubjXyNcG+3MNsRI/V0YNcZ+xMEHFjYD79HivUCgYEA+CFkDyZyeuwfPC9/6tt9
Md2XIcIbXsqG3YN7O9die5tvuLzLGOgwJGyzG66OEJbP/Fwe72TXOjEfVb+NZx8S
Id0sP/0M82Del5plpBrCn9xwIbk/yXxkDmJWeA17MWqn93fyHYNN374kRzas9HFf
GeptBbHEGk0AbwRwxC4yTC0CgYBJDK6yAkNPQ2OmHqbZ0PZ5kHYxZ7TrU4BX+XsZ
prUBlSndXhAhEuvmTIUtrxHQdoI4ERlNXAkazpFO6ZSKvxcueM+eXTX22tmRVTsp
NM29MJ1jPDy7uXYOPpJVhf3yhgo7+ccDdbFFt58Thr8EJRtOsYvXjwo/PdCjZe2k
JXHZrQKBgQC+pE7ggFS6fz2cTvYVOidCaW/J/vpTZ+3zJnjk4V64omAjm5NRmXhV
Cw+vE6ZlkiXyuYlyCrP4r9V3zfDuKpgpBb1hwb48mrNjGp1gp6PeE9okoaJfcbQv
90gGgL15JBG3RapJhqZBJ2RHXgXsWQfJVzlOdPJIs2KeIVCkyflpww==
-----END RSA PRIVATE KEY-----`,
    accessTokenTTL: '15m',
    // If request include refresh token -> generate new access token.
    refreshTokenTTL: '1y'
}