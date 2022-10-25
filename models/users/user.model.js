const { DataTypes } = require("sequelize");


function model(sequelizy) {
    const attributes = {
        id: { type: DataTypes.INTEGER, primaryKey: true },
        role_id: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        email_verified_at: { type: DataTypes.DATE, allowNull: true },
        username: { type: DataTypes.STRING, allowNull: false, unique: true },
        password: { type: DataTypes.STRING, allowNull: false },
        status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'active' },
        balance: { type: DataTypes.DECIMAL, allowNull: false, defaultValue: 0 },
        created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
        updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    }
    
    const options = {
        defaultScope: {
            attributes: { exclude: ['password'] },
        },
        scope: {
            withPassword: { attributes: {} },
        }
    }

    return sequelizy.define('users', attributes, options)
}

module.exports = model