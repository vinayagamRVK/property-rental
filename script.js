const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;


mongoose.connect('mongodb://localhost/rentalDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const formSchema = new mongoose.Schema({
  property: String,
  startDate: Date,
  endDate: Date,
  email: String,
  phone: String,
});


const FormData = mongoose.model('FormData', formSchema);


app.use(express.static('public'));


app.use(express.json());


app.post('/submit', (req, res) => {
  const { property, startDate, endDate, email, phone } = req.body;


  const formData = new FormData({
    property,
    startDate,
    endDate,
    email,
    phone,
  });


  formData.save((err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving form data');
    } else {
      res.send('Form data saved successfully');
    }
  });
});


app.get('/data', (req, res) => {
  FormData.find({}, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving form data');
    } else {
      res.json(data);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});