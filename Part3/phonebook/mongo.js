const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Password is required, please supply as an argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://info:${password}@fullstackopenphonebook.lk3dsur.mongodb.net/?retryWrites=true&w=majority&appName=FullStackOpenPhonebook`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const contactSchema = new mongoose.Schema({
  name: String,
  number: Number,
})

const Contact = mongoose.model('Contact', contactSchema)

if (process.argv.length > 3) {
  const name = process.argv[3]
  const number = process.argv[4]
  const newContact = new Contact({ name: name, number: number })
  newContact.save().then((res) => {
    console.log(`Saved ${name} with number ${number} to the phonebook`, res)
    mongoose.connection.close()
  })
} else {
  Contact.find({}).then((res) => {
    res.forEach((contact) => console.log(contact))
    mongoose.connection.close()
  })
}
