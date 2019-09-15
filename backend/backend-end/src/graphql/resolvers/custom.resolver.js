import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import sendEmail from '../../services/sendEmail'

const Query = {

}

const Mutation = {
    authenticate: async (parent, { email, password }, context) => {
        const users = await context.prisma.users({ where: { email } })
        if (!users[0]) throw new Error('check your email and password!')
        if (!bcrypt.compareSync(password, users[0].password)) {
            throw new Error('check your email and password!')
        }
        delete users[0].password;
        const token = jwt.sign({ user: users[0] }, process.env.JWT_SECRET || 'pacoca',
            { expiresIn: 60 * 6000000 });
        return {
            token
        }
    },
    getUserByToken: async (parent, { token }, context) => {
        const user = jwt.verify(token, process.env.JWT_SECRET || 'pacoca').user
        return {...user, password: ''}
    },
    requestResetPassword: async (parent, { email }, context) => {
        const user = await context.prisma.user({ email: email })
        if (user) {
            const resetPassword = await context.prisma.createResetPassword({
                isExpired: false,
                user: {
                    connect: {
                        id: user.id
                    }
                }
            })
            sendEmail.sendEmail(user.email, 'Reset Password', `reset token ${resetPassword.id}`)
            return {
                isUserRegistered: true
            }
        }
        return {
            isUserRegistered: false
        }
    },
    changePassword: async (parent, { token, newPassword }, context) => {
        try {
            const resetPassword = await context.prisma.resetPassword({ id: token })
            if (!resetPassword.isExpired) {

                const user = await context.prisma.users({
                    where: {
                        resetsPassword_some: {
                            id: token
                        }
                    }
                })
                const salt = bcrypt.genSaltSync(10);
                newPassword = bcrypt.hashSync(newPassword, salt);
                await context.prisma.updateUser({
                    data: {
                        password: newPassword
                    },
                    where: { id: user[0].id }
                })
                await context.prisma.updateResetPassword({
                    data: {
                        isExpired: true,
                    }, where: { id: token }
                })
                return {
                    isChangedPassword: true
                }
            }
            throw new Error('Invalid token, request new reset password')
        } catch (error) {
            throw new Error('Invalid token, request new reset password')
        }
    }
}

export default {
    Query,
    Mutation
}