import { DataTypes } from 'sequelize'
import { sequelize } from '../config/db.js'

export const User = sequelize.define('User', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING },
	username: { type: DataTypes.STRING },
	email: { type: DataTypes.STRING },
	password: { type: DataTypes.STRING },
	passwordHash: { type: DataTypes.STRING },
})
