module.exports = (sequelize, DataType) => {
  const Users = sequelize.define('Users', {

    email: {
      type: DataType.STRING,
      allowNull: false
    },

    password: {
      type: DataType.STRING,
      allowNull: false
    },

    fullName: {
      type: DataType.STRING,
      allowNull: false
    },

    plan: {
      type: DataType.STRING,
      allowNull: false
    },

    callsLeft: {
      type: DataType.INTEGER,
      allowNull: false
    }

  })

  Users.associate = (models) => {
    Users.hasMany(models.Calls, {
      foreignKey: 'userId'
    })
  }

  return Users
}