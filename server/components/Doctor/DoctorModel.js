module.exports = (sequelize, Sequelize) => {
    const Doctor = sequelize.define('Doctor', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        apellido: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        edad: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        celular: {
            type: Sequelize.STRING(20),
            allowNull: true
        },
        telefono: {
            type: Sequelize.STRING(20),
            allowNull: true
        },
        email: {
            type: Sequelize.STRING(100),
            allowNull: true
        },
        status: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
    }, {
        timestamps: true
    });
    return Doctor;
}