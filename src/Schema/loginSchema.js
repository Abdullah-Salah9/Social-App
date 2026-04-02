import * as zod from 'zod'



export const schema = zod.object({
    email: zod.string().nonempty('Email is required').email(),
    password: zod.string().nonempty('Password is required')
                  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Use at least 8 characters, including uppercase, lowercase, a number, and a special symbol.'),
  })