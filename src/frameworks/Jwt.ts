import 'dotenv/config'
import jwt from 'jsonwebtoken'

class Jwt {
  sign (userId: string): string {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET)
    return token
  }

  async decode (token: string): Promise<{ error: boolean, userId?: string }> {
    let userId: string | undefined
    let error: boolean | undefined

    await new Promise<void>((resolve) => {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded: { userId: string }) => {
        if (err) { error = true } else {
          userId = decoded.userId
        }
        resolve()
      })
    })

    return { error, userId }
  }
}

export default new Jwt()
