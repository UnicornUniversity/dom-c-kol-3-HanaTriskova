//TODO add imports if needed
//TODO doc change as needed

/**
 * Main function.
 * Generates a list of employees based on input data.
 *
 * @param {object} dtoIn
 * @param {number} dtoIn.count - how many employees should be generated
 * @param {object} dtoIn.age - age range of employees
 * @param {number} dtoIn.age.min - minimum age (inclusive)
 * @param {number} dtoIn.age.max - maximum age (inclusive)
 * @returns {Array} dtoOut - list of generated employees
 */
export function main(dtoIn) {
  // Sequence: read values from input object
  const count = dtoIn.count;
  const minAge = dtoIn.age.min;
  const maxAge = dtoIn.age.max;

  // Sequence: define constant lists for random values
  const maleNames = [
    "Jan", "Pavel", "Tomáš", "Jiří", "Vratislav",
    "Karel", "Lukáš", "Martin", "Ondřej", "Petr",
    "Roman", "Radek", "Aleš", "Marek", "Michal",
    "Filip", "Jaroslav", "Václav", "Josef", "Daniel"
  ];

  const femaleNames = [
    "Jana", "Petra", "Lucie", "Eva", "Jiřina",
    "Martina", "Veronika", "Monika", "Alena", "Tereza",
    "Hana", "Barbora", "Karolína", "Helena", "Adéla",
    "Nikola", "Kateřina", "Lenka", "Zuzana", "Anna"
  ];

  // List of male surnames
  const surnamesMale = [
    "Novák", "Svoboda", "Doležal", "Krejčí", "Konečný",
    "Hájek", "Urban", "Bláha", "Vlk", "Krupa",
    "Hruška", "Beran", "Ševčík", "Janda", "Mikuš",
    "Kolář", "Strnad", "Veverka", "Mazal", "Jílek"
  ];

  // List of female surnames
  const surnamesFemale = [
    "Malá", "Veselá", "Krátká", "Suchá", "Štěpánová",
    "Bílá", "Jírova", "Tichá", "Vlková", "Hrubá",
    "Krásná", "Sládková", "Šafářová", "Adamcová", "Burešová",
    "Moravcová", "Hanáková", "Pokorná", "Fialová", "Bártová"
  ];

  const workloads = [10, 20, 30, 40];

  // Sequence: create empty result array
  const dtoOut = [];

  // Iteration: repeat for each employee we want to generate
  for (let employeeIndex = 0; employeeIndex < count; employeeIndex++) {

    // Branching: choose random gender (full if/else version)
    let gender;
    if (Math.random() < 0.5) {
      gender = "male";
    } else {
      gender = "female";
    }

    // Branching: choose name and surname based on gender
    let name;
    let surname;
    if (gender === "male") {
      name = randomItem(maleNames);
      surname = randomItem(surnamesMale);
    } else {
      name = randomItem(femaleNames);
      surname = randomItem(surnamesFemale);
    }

    // Sequence: generate birthdate and workload
    const birthdate = randomBirthdate(minAge, maxAge);
    const workload = randomItem(workloads);

    // Sequence: create one employee object
    const employee = {
      gender: gender,
      birthdate: birthdate,
      name: name,
      surname: surname,
      workload: workload
    };

    // Sequence: add employee to result array
    dtoOut.push(employee);
  }

  // Sequence: return final result
  return dtoOut;
}

/**
 * Helper function.
 * Returns random integer between min and max (both included).
 */
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Helper function.
 * Returns random item from given array.
 */
function randomItem(array) {
  const index = randomInt(0, array.length - 1);
  return array[index];
}

/**
 * Helper function.
 * Generates random birthdate so that age is between ageMin and ageMax.
 * Result is ISO Date-Time string.
 */
function randomBirthdate(ageMin, ageMax) {
  // Sequence: get current year
  const now = new Date();
  const currentYear = now.getFullYear();

  // Sequence: compute allowed year range for birthdate
  const minYear = currentYear - ageMax; // oldest allowed year
  const maxYear = currentYear - ageMin; // youngest allowed year

  // Sequence: choose random year, month and day
  const year = randomInt(minYear, maxYear);
  const month = randomInt(0, 11);
  const day = randomInt(1, 28);

  // Sequence: create Date object and convert to ISO string
  const date = new Date(Date.UTC(year, month, day, 0, 0, 0, 0));
  return date.toISOString();
}
