import * as zod from 'zod'


export const schema = zod.object({
  name: zod.string().nonempty('Name is required')
            .min(3, 'Name Must Be At Least 3 characters')
            .max(20, 'Name Must Be At Most 20 characters'),
  email: zod.string().nonempty('Email is required').email(),
  password: zod.string().nonempty('Password is required')
                .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Use at least 8 characters, including uppercase, lowercase, a number, and a special symbol.'),
  rePassword: zod.string().nonempty('Password is required')
                .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Use at least 8 characters, including uppercase, lowercase, a number, and a special symbol.'),
  dateOfBirth: zod.coerce.date('Date is required').refine((value)=> {
    const userAge = value.getFullYear();
    const now = new Date().getFullYear();

    const diff = now - userAge;

    return diff >= 18
  }, 'age must be greater than 18'),
  gender: zod.string().nonempty('gender is required')
}).refine((data)=> data.password === data.rePassword , {
  path:['rePassword'],
  message:'password and rePassword dont match'
})
