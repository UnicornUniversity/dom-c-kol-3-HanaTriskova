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

  const surnamesMale = [
    "Novák", "Svoboda", "Doležal", "Krejčí", "Konečný",
    "Hájek", "Urban", "Bláha", "Vlk", "Krupa",
    "Hruška", "Beran", "Ševčík", "Janda", "Mikuš",
    "Kolář", "Strnad", "Veverka", "Mazal", "Jílek"
  ];

  const surnamesFemale = [
    "Malá", "Veselá", "Krátká", "Suchá", "Štěpánová",
    "Bílá", "Jírova", "Tichá", "Vlková", "Hrubá",
    "Krásná", "Sládková", "Šafářová", "Adamcová", "Burešová",
    "Moravcová", "Hanáková", "Pokorná", "Fialová", "Bártová"
  ];

  const workloads = [10, 20, 30, 40];

  // Sequence: create empty result array
  const dtoOut = [];

  // Sequence: set to remember which birthdates we already used
  const usedBirthdates = new Set();

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

    // Sequence + iteration: generate unique birthdate in correct age interval
    let birthdate;
    do {
      birthdate = randomBirthdate(minAge, maxAge);
    } while (usedBirthdates.has(birthdate));
    usedBirthdates.add(birthdate);

    // Sequence: generate workload
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
 *
 * Age interval is respected more precisely:
 * we choose a random moment between
 * (now - ageMax years) and (now - ageMin years).
 */
function randomBirthdate(ageMin, ageMax) {
  const now = new Date();

  // Oldest allowed birthdate = now - ageMax years
  const minDate = new Date(now);
  minDate.setFullYear(minDate.getFullYear() - ageMax);

  // Youngest allowed birthdate = now - ageMin years
  const maxDate = new Date(now);
  maxDate.setFullYear(maxDate.getFullYear() - ageMin);

  // Get numeric timestamps
  const minTime = minDate.getTime();
  const maxTime = maxDate.getTime();

  // Pick random time between minTime and maxTime
  const randomTime = randomInt(minTime, maxTime);

  const date = new Date(randomTime);
  return date.toISOString();
}



