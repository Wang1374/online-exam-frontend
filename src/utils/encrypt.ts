import JsEncrypt from 'jsencrypt'

const encryption = (str: string) => {
    let instance = new JsEncrypt()
    // 公钥
    instance.setPublicKey(
    'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAoKqtNC8+tYWNAUHN9DENskzRiq4AY8geY8JrFXWw0A6lFCbLie/KcoD78ZJ8QFpQWlx5fHy5tuB+3GfdB829CYK8FljmElsqvIj5q4NQGnBrSU9UUZuzRA85YsQ5fBmwJZTi9lYg+chIFkXwKIgW22PyWu4sIjwKdLP+q0EJBQRYJ4R/YTrVyG8Hme1DEt/4iD+885mjgY2v7yYz5NmhCV4sZC0sZFMnBPidLs5wS49JZ4/YuKuMwtwRT2r9/o3sV6VNNUZtVYBz8fl5URQtJ4yxI3hv9uJAzulOnXMy8UYwBVG0b0sE4ExF+ylWXmuUwKbupZ9asjsHJPZTGUUwtQIDAQAB'
    )

    return instance.encrypt(str)
}

export default encryption
  