import { generateRandomString, isWithinExpiration } from 'lucia/utils';
import db from './database';

const EXPIRES_IN = 1000 * 60 * 60 * 2; // 2 hours

export const generateEmailVerificationToken = async (userId: string) => {
	const storedUserTokens = await db.email_Verification_Token.findMany({
		where: { user_id: userId }
	});
	if (storedUserTokens.length > 0) {
		const reusableStoredToken = storedUserTokens.find((token) => {
			// check if expiration is within 1 hour
			// and reuse the token if true
			return isWithinExpiration(Number(token.expires) - EXPIRES_IN / 2);
		});
		if (reusableStoredToken) return reusableStoredToken.id;
	}
	const token = generateRandomString(63);

	await db.email_Verification_Token.create({
		data: {
			id: token,
			expires: new Date().getTime() + EXPIRES_IN,
			user_id: userId
		}
	});

	return token;
};
export const validateEmailVerificationToken = async (token: string) => {
	const storedToken = await db.$transaction(async (trx) => {
		const storedToken = await trx.email_Verification_Token.findUnique({
			where: {
				id: token
			}
		});

		if (!storedToken) throw new Error('Invalid token');
		await trx.email_Verification_Token.deleteMany({
			where: {
				user_id: storedToken.user_id
			}
		});
		return storedToken;
	});
	const tokenExpires = Number(storedToken.expires); // bigint => number conversion
	if (!isWithinExpiration(tokenExpires)) {
		throw new Error('Expired token');
	}
	return storedToken.user_id;
};
export const generatePasswordResetToken = async (userId: string) => {
	const storedUserTokens = await db.password_Reset_Token.findMany({
		where: {
			user_id: userId
		}
	});
	if (storedUserTokens.length > 0) {
		const reusableStoredToken = storedUserTokens.find((token) => {
			// check if expiration is within 1 hour
			// and reuse the token if true
			return isWithinExpiration(Number(token.expires) - EXPIRES_IN / 2);
		});
		if (reusableStoredToken) return reusableStoredToken.id;
	}
	const token = generateRandomString(63);
	await db.password_Reset_Token.create({
		data: {
			id: token,
			expires: new Date().getTime() + EXPIRES_IN,
			user_id: userId
		}
	});
	return token;
};
export const validatePasswordResetToken = async (token: string) => {
	const storedToken = await db.$transaction(async (trx) => {
		const storedToken = await trx.password_Reset_Token.findUnique({
			where: {
				id: token
			}
		});
		if (!storedToken) throw new Error('Invalid token');
		await trx.password_Reset_Token.delete({ where: { id: storedToken.id } });
		return storedToken;
	});
	const tokenExpires = Number(storedToken.expires); // bigint => number conversion
	if (!isWithinExpiration(tokenExpires)) {
		throw new Error('Expired token');
	}
	return storedToken.user_id;
};
