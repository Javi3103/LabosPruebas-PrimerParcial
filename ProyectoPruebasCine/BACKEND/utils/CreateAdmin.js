const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Asegúrate de tener la ruta correcta

const createAdminUser = async () => {
  const existingAdmin = await User.findOne({ role: 'admin' });
  if (existingAdmin) {
    console.log('El usuario administrador ya existe');
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('admin123', salt);

  const adminUser = new User({
    username: 'mateo',
    email: 'mateoadmin@admin.com',
    password: hashedPassword,
    role: 'admin'
  });

  await adminUser.save();
  console.log('Usuario administrador creado');
};

module.exports = createAdminUser;
