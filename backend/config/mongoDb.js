const mongoose = require('mongoose');

// mongo atlas server
mongoose.connect('mongodb+srv://666majharulislam_db_user:25250180@cluster0.nzekssh.mongodb.net/todo?appName=Cluster0')
    .then(() => console.log('Database Connected successfully'))
    .catch((error) => console.log('Database connection failed:', error));