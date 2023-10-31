import { z } from 'zod';

const PasswordsSchema = z.object({
	password: z.string().max(120).min(6)
	// .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
});
export default PasswordsSchema;
