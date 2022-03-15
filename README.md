# albion_online_items_mongodb
MongoDB dump file containing item metadata from the video game Albion Online.

## Usage

Use mongorestore with the available dump file at ```dist/db.dump```.

For example. Using a localhost MongoDB instance with no required credentials.

```bash
mongorestore path/to/file
```

Alternatively, you can clone the repository and use the following commands (requires docker and docker-compose).

```bash
# To run script (run at root of repo)
docker-compose up -d mongodb
docker-compose up nodejs

# If you wish to get the dump file yourself
docker-compose exec -T mongodb sh -c 'mongodump --db=albion --collection=items --archive' > ./dist/db.dump

# Clean up
docker-compose down -v --rmi local
```

You can also edit ```docker-compose.yaml``` to bind port 27017. Then use your client of choice.

```yaml
version: "3.9"
services:
  mongodb:
    image: "mongo:4.4"
    restart: "always"
    volumes:
      - "mongodb_data:/data/db/"
    ports:
      - "27017:27017"
  nodejs:
    build: "."
volumes:
  mongodb_data:
```

## Learning opportunity

* Used JavaScript (NodeJS) as the preffered language for the project
* Populated a MongoDB database using Mongoose ODM
* Provided a re-usable mongoose schema
* Used CLI MongoDB management tools to create dump file / backup.
* Used Docker to create a standard environment for script file.
* Used Docker Compose file and CLI to standardize build steps.
* Automated data generation using a cron GitHub Actions job.

## What is it?

This module creates a binary MongoDB dump file with item metadata from the video game Albion Online. The raw metadata is available at [broderickhyman/ao-bin-dumps](https://github.com/broderickhyman/ao-bin-dumps). The repository automatically checks for updates at 00:00UTC using GitHub Actions.

## Why make this?

Although the metadata is already available, the current data structure makes it difficult to work with in NodeJS applications. MongoDB is used to properly provide a schema for the available data as well as a playground for potential users.

## Potential use cases

* Using MongoDB Atlas Full Text Search engine to search for items
* Using the unique name to interact with [Albion Data Project](https://www.albion-online-data.com)
* Knowing exactly what items ara available in the game and create a fan site!\
* Just have fun with it :)

## Notes

* Not all the data available is compiled, more will be added

## The schema

The mongoose item schema is located at ```./models/items.js```. Here is a preview.

```js
{
    uniqueName: {
        type: String,
        required: true,
    },
    shopCategory: {
        type: String,
        required: true,
    },
    shopSubCategory: {
        type: String,
        required: true,
    },
    tier: {
        type: Number,
        required: true,
    },
    enchantment: {
        type: Number,
        required: true,
    },
    quality: {
        type: Number,
        required: true,
    },
    availableEnchantments: {
        type: [Number],
        required: true,
    },
    maxQuality: {
        type: Number,
        required: true,
    },
    hash: {
        type: String,
        required: true,
    },
    en: {
        type: String,
        required: true,
    },
    de: {
        type: String,
        required: true,
    },
    fr: {
        type: String,
        required: true,
    },
    ru: {
        type: String,
        required: true,
    },
    pl: {
        type: String,
        required: true,
    },
    es: {
        type: String,
        required: true,
    },
    pt: {
        type: String,
        required: true,
    },
    zh: {
        type: String,
        required: true,
    },
    ko: {
        type: String,
        required: true,
    },
}
```
