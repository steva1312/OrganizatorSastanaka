module.exports = (sequelize, DataType) => {
  const Calls = sequelize.define('Calls', {

    datetime: {
      type: DataType.STRING,
      allowNull: false
    },

    zoomUrl: {
      type: DataType.STRING,
      allowNull: false
    }

  })

  return Calls
}