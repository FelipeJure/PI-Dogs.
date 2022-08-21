const { Dog, Temperament } = require("../../src/db.js");
const { Router } = require("express");
const router = Router();
const fetch = require("node-fetch");
const { text } = require("body-parser");
const { Op } = require("sequelize");

const callApiDogs = async () => {
  try {
    let dogs = await fetch("https://api.thedogapi.com/v1/breeds");
    dogs = await dogs.json();
    dogs = dogs.map((dog) => {
      return (dog = {
        image: dog.image.url,
        name: dog.name,
        temperament: dog.temperament,
        weight: dog.weight.metric,
        id: dog.id,
        height: dog.height.metric,
        life_span: dog.life_span,
        temperament: dog.temperament?.split(", "),
      });
    });
    return dogs;
  } catch (error) {
    console.log(error);
    return [];
  }
};
const findDbDogs = async () => {
  try {
    let dbDog = await Dog.findAll({
      include: {
        model: Temperament,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    if (dbDog) {
      dbDog = dbDog.map((dog) => {
        dog = dog.toJSON();
        dog.name = dog.name.split(" ");
        dog.name = dog.name.map((name) => {
          return (name =
            name[0].toUpperCase() + name.substring(1).toLowerCase());
        });
        dog.name = dog.name.join(" ");
        dog.temperament = dog.temperaments.map((t) => t.name);
        return dog;
      });
    }
    return dbDog;
    // return []
  } catch (error) {
    console.log(error);
    return [];
  }
};
const findAllDogs = async () => {
  try {
    const apiDogs = await callApiDogs();
    const dbDogs = await findDbDogs();
    const allDogs = [...apiDogs, ...dbDogs];
    allDogs.sort((a, b) => {
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
      else return 0;
    });
    return allDogs;
  } catch (error) {
    console.log(error);
  }
};

router.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    let dogs = await findAllDogs();
    if (name) {
      dogs = dogs.filter((dog) =>
        dog.name.toLowerCase().includes(name.toLowerCase())
      );
      if (dogs.length) {
        dogs = dogs.map((dog) => {
          return {
            name: dog.name,
            weight: dog.weight,
            temperament: dog.temperament,
            image: dog.image,
            id: dog.id,
            height:dog.height
          };
          
        });
        return res.json(dogs);
      }
      res.json({ message: "Dog not found" });
    }
    dogs = dogs.map((dog) => {
      return {
        name: dog.name,
        weight: dog.weight,
        temperament: dog.temperament,
        image: dog.image,
        id: dog.id,
        height:dog.height
      };
    });
    return res.json(dogs);
  } catch (error) {
    console.log(error);
  }
});

router.get("/filteredByOrigin/:origin", async (req, res) => {
  const { origin } = req.params;
  try {
    if (origin === "all") {
      const allDogs = await findAllDogs();
      return res.json(allDogs);
    }
    if (origin === "API") {
      const apiDogs = await callApiDogs();
      return res.json(apiDogs);
    }
    if (origin === "created") {
      const createdDogs = await findDbDogs();
      return res.json(createdDogs);
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/:idRaza", async (req, res) => {
  const { idRaza } = req.params;
  try {
    let dogs = await findAllDogs();
    let dog = dogs.find(
      (dog) => dog.id === (Number(idRaza) ? Number(idRaza) : idRaza)
    );
    if (dog) return res.json(dog);
    return res.status(404).json({ message: "Dog not found" });
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  const {
    name,
    minHeight,
    maxHeight,
    minWeight,
    maxWeight,
    minLife_span,
    maxLife_span,
    image,
    temperament,
  } = req.body;
  try {
    if (
      name &&
      minHeight &&
      maxHeight &&
      minWeight &&
      maxWeight &&
      minLife_span &&
      maxLife_span &&
      temperament
    ) {
      let dogs = await findAllDogs();
      let existName = dogs.find(
        (dog) => dog.name.toLowerCase() === name.toLowerCase()
      );
      if (!existName) {
        return Dog.create({
          name: name.toLowerCase(),
          height: `${minHeight} - ${maxHeight}`,
          weight: `${minWeight} - ${maxWeight}`,
          life_span: `${minLife_span} - ${maxLife_span} years`,
          image: image ? image : null,
        })
          .then((dog) => {
            return dog.setTemperaments(temperament);
          })
          .then(() =>
            res.status(201).json({ message: "Dog saccesfully created" })
          );
      } else {
        return res.status(404).json({ message: "This dog already exist" });
      }
    } else {
      res.status(404).json({ message: "Complete all information" });
    }
  } catch (err) {
    console.log(err.reason);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedDog = await Dog.findOne({
      where: {
        id,
      },
    });
    deletedDog.removeTemperaments();
    await Dog.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).json({ message: "Dog successfully deleted" });
  } catch (error) {
    console.log(error);
  }
});

router.put("/", async (req, res) => {
  let {
    minHeight,
    maxHeight,
    minWeight,
    maxWeight,
    minLife_span,
    maxLife_span,
    image,
    temperament,
    id,
  } = req.body;
  try {
    minHeight = Number(minHeight);
    maxHeight = Number(maxHeight);
    minWeight = Number(minWeight);
    maxWeight = Number(maxWeight);
    minLife_span = Number(minLife_span);
    maxLife_span = Number(maxLife_span);

    let dog = await Dog.findOne({
      where: {
        id: id,
      },
    });
    if (temperament.length) dog.setTemperaments(temperament);
    dog = dog.toJSON();
    let minValueHeight = Number(dog.height.split(" - ")[0]);
    let maxValueHeight = Number(dog.height.split(" - ")[1]);
    if (minHeight && maxHeight)
      Dog.update({ height: `${minHeight} - ${maxHeight}` }, { where: { id } });
    else {
      if (minHeight) {
        if (minHeight <= maxValueHeight)
          Dog.update(
            { height: `${minHeight} - ${maxValueHeight}` },
            { where: { id } }
          );
        else
          return res
            .status(404)
            .json({
              message: `In height ${minHeight} must be less than ${maxValueHeight}`,
            });
      }
      if (maxHeight) {
        if (maxHeight >= minValueHeight)
          Dog.update(
            { height: `${minValueHeight} - ${maxHeight}` },
            { where: { id } }
          );
        else
          return res
            .status(404)
            .json({
              message: `In height ${maxHeight} must be more than ${minValueHeight}`,
            });
      }
    }
    let minValueWeight = Number(dog.height.split(" - ")[0]);
    let maxValueWeight = Number(dog.height.split(" - ")[1]);
    if (minWeight && maxWeight)
      Dog.update({ weight: `${minWeight} - ${maxWeight}` }, { where: { id } });
    else {
      if (minWeight) {
        if (minWeight <= maxValueWeight)
          Dog.update(
            { weight: `${minWeight} - ${maxValueWeight}` },
            { where: { id } }
          );
        else
          return res
            .status(404)
            .json({
              message: `In weight ${minWeight} must be less than ${maxValueWeight}`,
            });
      }
      if (maxWeight) {
        if (maxWeight >= minValueWeight)
          Dog.update(
            { weight: `${minValueWeight} - ${maxWeight}` },
            { where: { id } }
          );
        else
          return res
            .status(404)
            .json({
              message: `In weight ${maxWeight} must be more than ${minValueWeight}`,
            });
      }
    }
    let minValueLifeSpan = Number(
      dog.life_span.split(" years")[0].split(" - ")[0]
    );
    let maxValueLifeSpan = Number(
      dog.life_span.split(" years")[0].split(" - ")[1]
    );
    if (minLife_span && maxLife_span)
      Dog.update(
        { life_span: `${minLife_span} - ${maxLife_span} years` },
        { where: { id } }
      );
    else {
      if (minLife_span) {
        if (minLife_span <= maxValueLifeSpan)
          Dog.update(
            { life_span: `${minLife_span} - ${maxValueLifeSpan} years` },
            { where: { id } }
          );
        else
          return res
            .status(404)
            .json({
              message: `In life_span ${minLife_span} must be less than ${maxValueLifeSpan}`,
            });
      }
      if (maxLife_span) {
        if (maxLife_span >= minValueLifeSpan)
          Dog.update(
            { life_span: `${minValueLifeSpan} - ${maxLife_span} years` },
            { where: { id } }
          );
        else
          return res
            .status(404)
            .json({
              message: `In life_span ${maxLife_span} must be more than ${minValueLifeSpan}`,
            });
      }
    }
    if (image) Dog.update({ image }, { where: { id } });
    res.json({ message: "Dog successfully edited" });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
