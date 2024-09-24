// GETTING STARTED

// Switch to the jaskis database (creates it if it doesn't exist)
use jaskis

// Create the bounties collection
db.createCollection('bounties')

// Verify the collection creation
show collections

// ADD THE ANIMAL BOUNTIES

// Insert a single bounty
db.bounties.insertOne({
    name: "Polarwind",
    species: "Polar Bear",
    location: "Arctic",
    wantedFor: "Eating too much salmon",
    client: "Sabertooth",
    reward: 10000,
    captured: false
})

// Verify the insertion
db.bounties.find()

// Insert multiple bounties
db.bounties.insertMany([
    {
        name: "Lokinkajou",
        species: "Kinkajou",
        location: "Tropical rainforest",
        wantedFor: "Vandalism",
        client: "Red wolf",
        reward: 8000,
        captured: false
    },
    {
        name: "Thanoceros",
        species: "Rhino",
        location: "Grasslands",
        wantedFor: "Eating all the grass",
        client: "Black Panther",
        reward: 15000,
        captured: false
    },
    {
        name: "Songbird",
        species: "Bird",
        location: "Mountain ranges",
        wantedFor: "Disturbing the peace",
        client: "Golden Eagle",
        reward: 6000,
        captured: false
    },
    {
        name: "Redsky",
        species: "Fox",
        location: "Desert",
        wantedFor: "Stealing eggs",
        client: "Golden Eagle",
        reward: 7000,
        captured: true
    }
])

// MANAGE THE DATABASE

// Query animals wanted in the Grasslands
db.bounties.find({ location: "Grasslands" })

// Query animals with a reward of $10000 or more
db.bounties.find({ reward: { $gte: 10000 } })

// Query all animals excluding the client field
db.bounties.find({}, { client: 0 })

// Query for a Groundhog located in the Woodlands using $and
db.bounties.find({
    $and: [
        { species: "Groundhog" },
        { location: "Woodlands" }
    ]
})

// UPDATE AND DELETE

// Update the reward for Polarwind to $10000
db.bounties.updateOne(
    { name: "Polarwind" },
    { $set: { reward: 10000 } }
)

// Remove Lokinkajou from the list
db.bounties.deleteOne({ name: "Lokinkajou" })

// Delete all bounties sent by Songbird
db.bounties.deleteMany({ client: "Songbird" })

// Update all captured statuses to true
db.bounties.updateMany(
    { captured: false },
    { $set: { captured: true } }
)

// BONUS: THE SCAVENGERS

// Create the scavengers collection
db.createCollection('scavengers')

// Insert scavenger data
db.scavengers.insertMany([
    {
        name: "Tony Bark",
        joined: new Date("2012-06-01"),
        power: "Super hearing",
        weapon: "Claws",
        captured: [{ name: "Thanoceros", reward: 15000 }]
    },
    {
        name: "Sabertooth",
        joined: new Date("2010-05-13"),
        power: "Invisibility",
        weapon: "Fangs",
        captured: [{ name: "Polarwind", reward: 10000 }]
    }
])

// SCAVENGER QUERIES

// Find all Scavengers who joined after December 31, 2011
db.scavengers.find({ joined: { $gte: new Date("2011-12-31") } })

// Find all Scavengers who helped catch Thanoceros
db.scavengers.find({ "captured.name": "Thanoceros" })

// Find all Scavengers who helped catch an animal with a reward greater than $11000
db.scavengers.find({ "captured.reward": { $gt: 11000 } })

// Find all Scavengers that don't have a weapon
db.scavengers.find({ weapon: null })
