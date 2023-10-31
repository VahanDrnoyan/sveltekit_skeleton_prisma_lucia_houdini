import nodemailer from 'nodemailer';
import {
	EMAIL_SERVER_USER,
	EMAIL_SERVER_PASSWORD,
	EMAIL_SERVER_PORT,
	EMAIL_FROM,
	EMAIL_SERVER_HOST
} from '$env/static/private';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export const sendPasswordResetLink = async (email: string, token: string) => {
	// TODO send email
	const url = `http://localhost:5173/password-reset/${token}`;
	await transporter.sendMail({
		from: `TrueFans.space <${EMAIL_FROM}>`,
		to: email,
		subject: 'Password reset link for Truefans.space',
		text: `Please vists this url to reset your password ${url}`,
		html: `
		Please vists this url to reset your password <a href="${url}">Click here</a>`
	});
};
export const sendEmailVerificationLink = async (email: string, token: string) => {
	// TODO send email
	const url = `http://localhost:5173/email-verification/${token}`;
	await transporter.sendMail({
		from: `TrueFans.space <${EMAIL_FROM}>`,
		to: email,
		subject: 'Email confirmation for Truefans.space',
		text: `Please confirm your email by visiting ${url}`,
		html: `
		Please confirm your email by visiting this url <a href="${url}">Click here</a>`
	});
};

const transporter = nodemailer.createTransport(
	new SMTPTransport({
		host: EMAIL_SERVER_HOST,
		port: Number(EMAIL_SERVER_PORT),
		auth: {
			user: EMAIL_SERVER_USER,
			pass: EMAIL_SERVER_PASSWORD
		}
	})
);
