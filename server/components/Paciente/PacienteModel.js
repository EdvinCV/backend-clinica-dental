module.exports = (sequelize, Sequelize) => {
    const Paciente = sequelize.define('Paciente', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        apellido: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        edad: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        sexo: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        direccion: {
            type: Sequelize.STRING,
            allowNull: false
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
        ocupacion: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        encargado: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        telefonoEncargado: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        nota: {
            type: Sequelize.STRING,
            allowNull: false
        },
        status: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
    }, {
        timestamps: true
    });
    return Paciente;
}