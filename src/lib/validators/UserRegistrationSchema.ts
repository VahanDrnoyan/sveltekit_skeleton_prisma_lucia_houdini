import { ZodError, z } from 'zod';

const UserRegistrationSchema = z
	.object({
		username: z.string().max(10),
		email: z.string().email(),
		password: z
			.string()
			.max(120)
			.min(6),
			// .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
		password_repeat: z.string()
	})
	.refine((data) => {
		if (data.password !== data.password_repeat) {
			return new ZodError([
				{
				  code: "invalid_type",
				  expected: "string",
				  received: "void",
				  path: ["repeat_password"],
				  message: "The Repeat password field is invalid.",
				},
			  ]);
		}

		return true;
	});
export default UserRegistrationSchema;
