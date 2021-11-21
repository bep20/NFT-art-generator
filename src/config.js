"use strict";

const { Option } = require("commander");
const path = require("path");
const isLocal = typeof process.pkg === "undefined";
const basePath = isLocal ? process.cwd() : path.dirname(process.execPath);
const { MODE } = require(path.join(basePath, "src/blendMode.js"));

const buildDir = path.join(basePath, "/build");
const layersDir = path.join(basePath, "/layers");

const description =
  "THE FREAKS";
const baseUri = "ipfs://NewUriToReplace";

const outputJPEG = false; // if false, the generator outputs png's

// if you use an empty/transparent file, set the name here.
const emptyLayerName = "NONE";

//IF you need a provenance hash, turn this on
const hashImages = true;

const layerConfigurations = [
  {
    growEditionSizeTo: 10000,
    // namePrefix: "Monkey", Use to add a name to Metadata `name:`
    layersOrder: [
      { name: "Background" },
      { name: "skin" },
      { name: "Freckles", blend: MODE.multiply },
      { name: "Un Shaven", blend: MODE.multiply },
      { name: "T Shirts" },
      { name: "Tattoos", blend: MODE.hardLight },
      { name: "Jackets" },
      { name: "Necklace" },
      { name: "Chops" },
      { name: "Octopus" },
      { name: "War Paint" },
      { name: "Mask" },
      { name: "Eyes" },
      { name: "Hair" },
      { name: "Hats" },
      { name: "Piercings" }, 
      { name: "Glasses", blend: MODE.hardLight },
      { name: "Frustration" },
      { name: "Helmet", blend: MODE.hardLight },
      { name: "Nil By Mouth" }, 
      { name: "Magic Eye" },
      { name: "Pie Face" },
      { name: "Sun Visor" },
      { name: "Cupids Arrow" },
      { name: "On Fire", blend: MODE.hardLight },
    ],
  },
  // {
  //   growEditionSizeTo: 100,
  //   namePrefix: "Lion",
  //   resetNameIndex: true, // this will start the Lion count at #1 instead of #6
  //   layersOrder: [
  //     { name: "Background" },
  //     { name: "Hats" },
  //     { name: "Male Hair" },
  //   ],
  // },
];

/**
 * Incompatible items can be added to this object by a files cleanName
 * This works in layer order, meaning, you need to define the layer that comes
 * first as the Key, and the incompatible items that _may_ come after.
 * The current version requires all layers to have unique names, or you may
 * accidentally set incompatibilities for the _wrong_ item.
 */

 const GLASSES = ["Cyborg Blue", "Cyborg Green", "Cyborg Pink", "Fucking Designer Pink", "Fucking Designer Yellow", "Shades", "Specktacles Blue", "Specktacles Pink"]
 const PIE = ["Cherry Pie", "Custard Pie",]
 const HATS = ["B Boy Blue", "B Boy Red", "Beanie Blue", "Beanie Brown", "Beanie Grey", "Bucket Banana", "Bucket Pinapple", "Frank Zappa", "Pot Head", "Trilby Grey", "Trilby Navy", "Pirate"]
 const MAGIC_EYE = ["Lasers Blue", "Lasers Green", "Lasers Red", "Hypno Beams Green Yellow", "Hypno Beams Purple Blue"]
 const PIERCINGS = ["Blue Sapphire", "Darth Vader", "Double Earring", "Earring 1", "Earring 2", "Gold Stud", "Iceberg Drip", "Red Ruby", "Skull", "Storm Trooper","Traffic Light"]
 const HELMET = ["Helmet Green", "Helmet Pink"]
 const ON_FIRE = ["On Fire Green", "On Fire Purple", "On Fire Red"]
 const MASK = ["Mask Blue", "Mask Grey", "Mask Pink"]
 const OCTOPUS = ["Octopus Green", "Octopus Red"]
 const SUN_VISOR = ["Watermelon"]
 const incompatible = {
  "Steaming": [...HELMET, ...SUN_VISOR, ...MAGIC_EYE],
  "Pirate": [...HELMET, ...SUN_VISOR, ...GLASSES],
  "B Boy Blue": [...HELMET, ...SUN_VISOR],
  "B Boy Red": [...HELMET, ...SUN_VISOR],
  "Beanie Blue": [...HELMET, ...SUN_VISOR],
  "Beanie Brown": [...HELMET, ...SUN_VISOR],
  "Beanie Grey": [...HELMET, ...SUN_VISOR],
  "Bucket Banana": [...HELMET, ...SUN_VISOR, ...PIERCINGS],
  "Bucket Pinapple": [...HELMET, ...SUN_VISOR, ...PIERCINGS],
  "Pirate": [...HELMET, ...SUN_VISOR, ...PIERCINGS],
  "Frank Zappa": [...HELMET, ...SUN_VISOR],
  "Pot Head": [...HELMET, ...SUN_VISOR],
  "Trilby Grey": [...HELMET, ...SUN_VISOR],
  "Trilby Navy": [...HELMET, ...SUN_VISOR],
  "Afro Brown": [...HELMET, ...SUN_VISOR, ...HATS],
  "Afro Green": [...HELMET, ...SUN_VISOR, ...HATS],
  "Afro Pink": [...HELMET, ...SUN_VISOR, ...HATS],
  "Sun Visor": [...HELMET, ...MAGIC_EYE],
  "Bla Bla Bla": [...MAGIC_EYE, ...SUN_VISOR],
  "Yap Yap Yap": [...MAGIC_EYE, ...SUN_VISOR],
  "Lasers Blue": [...PIE, ...SUN_VISOR],
  "Lasers Green": [...PIE, ...SUN_VISOR],
  "Lasers Red": [...PIE, ...SUN_VISOR],
  "Hypno Beams Green Yellow": [...PIE, ...SUN_VISOR],
  "Hypno Beams Purple Blue": [...PIE, ...SUN_VISOR],
  "Mask Blue": [...GLASSES, ...SUN_VISOR],
  "Mask Grey": [...GLASSES, ...SUN_VISOR],
  "Mask Pink": [...GLASSES, ...SUN_VISOR],
  "Helmet": SUN_VISOR,
  "Cyborg Blue": SUN_VISOR,
  "Cyborg Green": SUN_VISOR,
  "Cyborg Pink": SUN_VISOR,
  "Fucking Designer Pink": SUN_VISOR,
  "Fucking Designer Yellow": SUN_VISOR,
  "Shades": SUN_VISOR,
  "Specktacles Blue": SUN_VISOR,
  "Specktacles Pink": SUN_VISOR,
  "Cobra": OCTOPUS,
  "Heart and Dagger": OCTOPUS,
  "Panther": OCTOPUS,
  "QR Code": OCTOPUS,
  "Skull": OCTOPUS,
  "Swallow": OCTOPUS,
  "War Paint Green": MASK,
  "War Paint Red": MASK,
  "War Paint White": MASK,
  "Fire Torch Orange": ON_FIRE,
  "Fire Torch Purple": ON_FIRE,
  "Double Earring": HELMET,
  "Earring 1": HELMET,
  "Cursor": MAGIC_EYE,
  "Beauffont Orange": HATS,
  "Beauffont Pink": HATS,
  "Beauffont Silver": HATS,
  "Crop White": HATS,
  "Crop Yellow": HATS,
  "Mohawk Green": HATS,
  "Mohawk Purple": HATS,
  "Mohawk Red": HATS,
  "Quiff Blue": HATS,
  "Quiff Pink": HATS,
  "Quiff White": HATS,
  "Vincent Vega": HATS,
 };



/**
 * Require combinations of files when constructing DNA, this bypasses the
 * randomization and weights.
 *
 * The layer order matters here, the key (left side) is an item within
 * the layer that comes first in the stack.
 * the items in the array are "required" items that should be pulled from folders
 * further in the stack
 */
const forcedCombinations = {
  floral: ["MetallicShades", "Golden Sakura"],
};

const shuffleLayerConfigurations = false;

/**
 * In the event that a filename cannot be the trait value name, for example when
 * multiple items should have the same value, specify
 * clean-filename: trait-value override pairs. Wrap filenames with spaces in quotes.
 */
const traitValueOverrides = {
  Helmet: "Space Helmet",
  "gold chain": "GOLDEN NECKLACE",
};

const debugLogs = true;

const format = {
  width: 2222,
  height: 2222,
};

const background = {
  generate: true,
  brightness: "80%",
};

const extraMetadata = {
  collection: {
      name: "The Freaks on Solana",
      family: "The Freaks on Solana"
  }
};

const extraAttributes = () => [
  // Optionally, if you need to overwrite one of your layers attributes.
  // You can include the same name as the layer, here, and it will overwrite
  //
  // {
  // trait_type: "Bottom lid",
  //   value: ` Bottom lid # ${Math.random() * 100}`,
  // },
  // {
  //   display_type: "boost_number",
  //   trait_type: "Aqua Power",
  //   value: Math.random() * 100,
  // },
  // {
  //   display_type: "boost_number",
  //   trait_type: "Health",
  //   value: Math.random() * 100,
  // },
  // {
  //   display_type: "boost_number",
  //   trait_type: "Mana",
  //   value: Math.floor(Math.random() * 100),
  // },
];

const solanaMetadata = {
  symbol: "YC",
  seller_fee_basis_points: 600, // Define how much % you want from secondary market sales 1000 = 10%
  external_url: "https://www.youtube.com/c/hashlipsnft",
  creators: [
    {
      address: "Dwuu3j13kTpiPvn5inrW4cHLWR3dpru7KKCpF9wHTNi1",
      share: 100,
    },
  ],
};

const rarityDelimiter = "#";

const uniqueDnaTorrance = 10000;

const preview = {
  thumbPerRow: 5,
  thumbWidth: 50,
  imageRatio: format.width / format.height,
  imageName: "preview.png",
};

module.exports = {
  buildDir,
  layersDir,
  format,
  baseUri,
  description,
  background,
  uniqueDnaTorrance,
  layerConfigurations,
  rarityDelimiter,
  preview,
  shuffleLayerConfigurations,
  debugLogs,
  extraAttributes,
  extraMetadata,
  incompatible,
  forcedCombinations,
  traitValueOverrides,
  outputJPEG,
  emptyLayerName,
  hashImages,
  solanaMetadata,
};
