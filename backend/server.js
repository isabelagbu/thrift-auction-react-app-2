const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const url = require('url');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*
// Connect to the database
mongoose.connect('mongodb://localhost:27017/thriftDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connection success!');
  })
  .catch(err => {
    console.log('MongoDB connection failed: ' + err.message);
  });
*/


//connect to the cloud
mongoose.connect(MONG0DB_URI, { useNewUrlParser: true }) 
.then(data => { 
console.log('Mongo DB connection success!') 
}) 
.catch(err => { 
console.log('Mongo DB connection failed: ' + err.message) 
});


// Define schema and model
const ThriftItemSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String,  required: true },
  startingBid: { type: Number, required: true, default: 0 },
  currentBid: { type: Number, default: 0 },
  auctionEnd: { type: Date, required: true },
  imageUrl: { type: String, required:true },
});

const ThriftItem = mongoose.model('ThriftItem', ThriftItemSchema);


// Seed database with initial data
async function seedDatabase() {
  await ThriftItem.deleteMany({});
 
  /*
  const items = [
    {
      id: generateRandomId(),
      name: "Modern Sofa 1",
      description: "A stylish and comfortable modern sofa.",
      startingBid: 200.00,
      currentBid: 250.00,
      auctionEnd: new Date("2024-08-15T15:00:00Z"),
      imageUrl: "https://cdn.britannica.com/54/27054-050-8BB97D2A/armchair-Walnut-craftsman-Philadelphia-Art-Institute-of.jpg",
    },
    {
      id: generateRandomId(),
      name: "Modern Sofa 2",
      description: "A stylish and comfortable modern sofa.",
      startingBid: 200.00,
      currentBid: 250.00,
      auctionEnd: new Date("2024-08-15T15:00:00Z"),
      imageUrl: "https://cdn.britannica.com/54/27054-050-8BB97D2A/armchair-Walnut-craftsman-Philadelphia-Art-Institute-of.jpg",
    },
    {
      id: generateRandomId(),
      name: "Modern Sofa 3",
      description: "A stylish and comfortable modern sofa.",
      startingBid: 200.00,
      currentBid: 250.00,
      auctionEnd: new Date("2024-08-15T15:00:00Z"),
      imageUrl: "https://cdn.britannica.com/54/27054-050-8BB97D2A/armchair-Walnut-craftsman-Philadelphia-Art-Institute-of.jpg",
    },
    {
      id: generateRandomId(),
      name: "Modern Sofa 4",
      description: "A stylish and comfortable modern sofa.",
      startingBid: 200.00,
      currentBid: 250.00,
      auctionEnd: new Date("2024-08-15T15:00:00Z"),
      imageUrl: "https://cdn.britannica.com/54/27054-050-8BB97D2A/armchair-Walnut-craftsman-Philadelphia-Art-Institute-of.jpg",
    },
    {
      id: generateRandomId(),
      name: "Modern Sofa 5",
      description: "A stylish and comfortable modern sofa.",
      startingBid: 200.00,
      currentBid: 250.00,
      auctionEnd: new Date("2024-08-15T15:00:00Z"),
      imageUrl: "https://cdn.britannica.com/54/27054-050-8BB97D2A/armchair-Walnut-craftsman-Philadelphia-Art-Institute-of.jpg",
    },
    {
      id: generateRandomId(),
      name: "Modern Sofa 6",
      description: "A stylish and comfortable modern sofa.",
      startingBid: 200.00,
      currentBid: 250.00,
      auctionEnd: new Date("2024-08-15T15:00:00Z"),
      imageUrl: "https://cdn.britannica.com/54/27054-050-8BB97D2A/armchair-Walnut-craftsman-Philadelphia-Art-Institute-of.jpg",
    },
    {
      id: generateRandomId(),
      name: "Modern Sofa 7",
      description: "A stylish and comfortable modern sofa.",
      startingBid: 200.00,
      currentBid: 250.00,
      auctionEnd: new Date("2024-08-15T15:00:00Z"),
      imageUrl: "https://cdn.britannica.com/54/27054-050-8BB97D2A/armchair-Walnut-craftsman-Philadelphia-Art-Institute-of.jpg",
    },
    {
      id: generateRandomId(),
      name: "Modern Sofa 8",
      description: "A stylish and comfortable modern sofa.",
      startingBid: 200.00,
      currentBid: 250.00,
      auctionEnd: new Date("2024-08-15T15:00:00Z"),
      imageUrl: "https://cdn.britannica.com/54/27054-050-8BB97D2A/armchair-Walnut-craftsman-Philadelphia-Art-Institute-of.jpg",
    }
  ];
*/

  const items = [
    {
      id: generateRandomId(),
      name: "Laptop",
      description: "A stylish laptop.",
      startingBid: 200.00,
      currentBid: 250.00,
      auctionEnd: new Date("2025-09-15T15:00:00Z"),
      imageUrl: "https://fastly.picsum.photos/id/0/5000/3333.jpg?hmac=_j6ghY5fCfSD6tvtcV74zXivkJSPIfR9B8w34XeQmvU",
    },
    {
      id: generateRandomId(),
      name: "Classic Trike",
      description: "A stylish and comfortable 1900 trike.",
      startingBid: 200.00,
      currentBid: 250.00,
      auctionEnd: new Date("2025-08-06T15:00:00Z"),
      imageUrl: "https://fastly.picsum.photos/id/146/5000/3333.jpg?hmac=xdlFnzoavokA3U-bzo35Vk4jTBKx8C9fqH5IuCPXj2U",
    },
    {
      id: generateRandomId(),
      name: "Clock",
      description: "1970s clock.",
      startingBid: 200.00,
      currentBid: 250.00,
      auctionEnd: new Date("2025-08-27T15:00:00Z"),
      imageUrl: "https://fastly.picsum.photos/id/175/2896/1944.jpg?hmac=djMSfAvFgWLJ2J3cBulHUAb4yvsQk0d4m4xBJFKzZrs",
    },
    {
      id: generateRandomId(),
      name: "Camera",
      description: "A classic 1970 camera.",
      startingBid: 200.00,
      currentBid: 250.00,
      auctionEnd: new Date("2025-08-19T15:00:00Z"),
      imageUrl: "https://fastly.picsum.photos/id/250/4928/3264.jpg?hmac=4oIwzXlpK4KU3wySTnATICCa4H6xwbSGifrxv7GafWU",
    },
    {
      id: generateRandomId(),
      name: "Modern clock 2",
      description: "A stylish gold and white clock.",
      startingBid: 200.00,
      currentBid: 250.00,
      auctionEnd: new Date("2025-08-23T15:00:00Z"),
      imageUrl: "https://fastly.picsum.photos/id/357/3888/2592.jpg?hmac=322FsZ93_k9v7NNFeCTlqk_gobPP_1mYJIQwk7GxjMc",
    },
    {
      id: generateRandomId(),
      name: "2010 kindle",
      description: "digital book.",
      startingBid: 200.00,
      currentBid: 250.00,
      auctionEnd: new Date("2025-08-21T15:00:00Z"),
      imageUrl: "https://fastly.picsum.photos/id/367/4928/3264.jpg?hmac=H-2OwMlcYm0a--Jd2qaZkXgFZFRxYyGrkrYjupP8Sro",
    },
    {
      id: generateRandomId(),
      name: "Plugable Keyboard",
      description: "A light plug n play keyboard.",
      startingBid: 200.00,
      currentBid: 250.00,
      auctionEnd: new Date("2025-10-15T15:00:00Z"),
      imageUrl: "https://fastly.picsum.photos/id/366/4000/3000.jpg?hmac=zphhHOH9ofToN2jNHd8z-nc98NrBd8y2okWXEXetLDg",
    },
    {
      id: generateRandomId(),
      name: "Camera 2",
      description: "Fujifilm Camera 1930s.",
      startingBid: 200.00,
      currentBid: 250.00,
      auctionEnd: new Date("2025-08-28T15:00:00Z"),
      imageUrl: "https://fastly.picsum.photos/id/435/1200/800.jpg?hmac=NRHmYJ-8T18f_jUu_zGUaS4pmJJW2baw-isXTEPVt7U",
    },

    {
      id: generateRandomId(),
      name: "1900 kitten heel - Classic white shoe",
      description: "A stylish and comfortable shoe.",
      startingBid: 200.00,
      currentBid: 250.00,
      auctionEnd: new Date("2025-08-17T15:00:00Z"),
      imageUrl: "https://fastly.picsum.photos/id/21/3008/2008.jpg?hmac=T8DSVNvP-QldCew7WD4jj_S3mWwxZPqdF0CNPksSko4",
    },
    
  ];


  await ThriftItem.insertMany(items);
  console.log("Successfully seeded database");
}

// Seed database on server start
seedDatabase();


// API routes
const router = express.Router();

//GETTING THE LIST OF ITEMS
router.get('/thrift-items', async (req, res) => {
  try {
    const items = await ThriftItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


//CREATING A NEW THRIFT ITEM
router.post('/thrift-items', async (req, res) => {
  const { name, description, startingBid, auctionEnd, imageUrl } = req.body;

  const item = new ThriftItem({
    id: generateRandomId(),
    name: name,
    description: description,
    startingBid: startingBid,
    auctionEnd: auctionEnd,
    imageUrl: imageUrl
  });


  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//SEARCHING BY NAME
router.get('/thrift-items/:name', async (req, res) => {
  try {
    const item = await ThriftItem.findOne({ name: req.params.name });
    if (!item) return res.status(404).json({ message: 'Thrift Item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update the bid of a furniture item
router.put('/thrift-items/bid/:id', async (req, res) => {
  const { currentBid } = req.body;
  if (typeof currentBid !== 'number' || currentBid <= 0) {
    return res.status(400).json({ message: 'Invalid bid amount' });
  }

  try {
    const item = await ThriftItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    if (currentBid <= item.currentBid) {
      return res.status(400).json({ message: 'New bid must be higher than the current bid' });
    }

    item.currentBid = currentBid;
    const updatedItem = await item.save();
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// Update specific fields of a furniture item
router.put('/thrift-items/edit/:id', async (req, res) => {
  const { name, description, auctionEnd, imageUrl } = req.body;

  try {
    const item = await ThriftItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    item.name = name || item.name;
    item.description = description || item.description;
    item.auctionEnd = auctionEnd || item.auctionEnd;
    item.imageUrl = imageUrl || item.imageUrl;

    const updatedItem = await item.save();
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// Delete a furniture item
router.delete('/thrift-items/:id', async (req, res) => {
  try {
    const item = await ThriftItem.findOne({id: req.params.id});
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    await item.remove();
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.use('/api', router);

// Error handling middleware
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});

// Server listening
app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}! ^_^`);
});

function generateRandomId() {
  return Math.floor(Math.random() * 10000);
}
