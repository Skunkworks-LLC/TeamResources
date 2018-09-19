// const jsf = require('json-schema-faker');
const faker = require('faker');
const mongoose = require('mongoose');
const moment = require('moment');


const model = require('./index.js');

// moment.locale = 'en_US';
faker.locale = 'en_US';
faker.seed(250);

// const projectDaysLeft = () => {
//   // const unformattedDate = faker.date.future();
//   const now = moment();
//   // console.log(now);
//   // console.log(unformattedDate);
//   // console.log(unformattedDate.fromNow());
//   const daysOut = Math.floor(Math.random() * 29);
//   console.log(now.fromNow());
//   const daysLeft = now.add(daysOut, 'days').fromNow().split(' ')[1];
//   return daysLeft;
// };

const deliveryMonth = () => {
  const now = moment();
  const monthsAway = Math.floor(Math.random() * 4);
  const estimatedShippingDate = now.add(monthsAway, 'months').format('MMMM YY');
  return estimatedShippingDate;
};

const fakePledge = (minPledgeSoFar, maxBackersSoFar) => (
  {
    available: faker.random.boolean(),
    minimumPledgeAmount: faker.random.number({ min: minPledgeSoFar, max: (minPledgeSoFar + 150) }),
    pledgeTitle: faker.commerce.product(),
    pledgeDescription: faker.lorem.paragraph(),
    pledgeRewards: [
      faker.commerce.product(),
      faker.commerce.product(),
      faker.commerce.product(),
    ],
    estimatedShipping: deliveryMonth(),
    pledgeBackers: faker.random.number({ min: 0, max: (maxBackersSoFar + 25) }),
  }
);

const fakePledgeList = (pledges, index) => (
  {
    projectId: index,
    projectName: faker.commerce.productName(),
    shipToAnywhere: faker.random.boolean(),
    validLocations: [
      faker.random.locale(),
      faker.random.locale(),
      faker.random.locale(),
      faker.random.locale(),
      faker.random.locale(),
      faker.random.locale(),
      faker.random.locale(),
      faker.random.locale(),
      faker.random.locale(),
      faker.random.locale(),
    ],
    pledges,
  }
);


const SaveAPledgeList = (index) => {
  let minPledgeSoFar = 0;
  let maxBackersSoFar = 2500;
  const pledgeListData = [];
  for (let i = 0; i < 5; i += 1) {
    const pledge = fakePledge(minPledgeSoFar, maxBackersSoFar);
    minPledgeSoFar = pledge.minimumPledgeAmount;
    maxBackersSoFar = pledge.pledgeBackers;
    pledgeListData.push(pledge);
  }
  const pledgeList = fakePledgeList(pledgeListData, index);
  return pledgeList;
};

const SaveAllPledgeLists = () => {
  const allProjects = [];
  for (let index = 0; index < 100; index += 1) {
    const temp = SaveAPledgeList(index);
    allProjects.push(temp);
  }

  // calls any validators in schema, add more validators
  model.create(allProjects, (err, projects) => {
    if (err) {
      return console.error(err);
    }
    console.log('Saved all the projects');
    mongoose.connection.close();
    return null;
  });
};

SaveAllPledgeLists();
// deliveryDate();
// deliveryMonth();

// module.exports = fakePledgeList;

// ****** For a More Advanced Schema ******* */
// var schema = {
//     type: 'object',
//     properties: {
//         projectId: {
//             type: 'number'
//         },
//         projectName: {
//             type: 'string'
//         },
//         pledges: {
//             type: 'object',
//             properties: {
//                 minimumPledgeAmount: {
//                     type: 'number'
//                 },
//                 pledgeTitle: {
//                     type: 'string'
//                 },
//                 pledgeDescription: {
//                     type: 'string'
//                 },
//                 pledgeBackers: {
//                     type: 'number'
//                 },
//                 estimatedShipping: {
//                     type: 'string'
//                 },
//                 validLocations: {
//                     type: 'array',
//                     minItems: '15'
//                 }

//             },
//             required: ['minimumPledgeAmount', 'pledgeTitle', 'pledgeDescription',
//                        'pledgeBackers', 'estimatedShipping', 'validLocations']
//         }
//     },
//     required: ['projectId', 'projectName', 'pledges']
// }

// const createMinPledges = (maxValue, numPledges) => {
  //   let pledges = [];
  //   for (let i = 0; i < numPledges; i += 1) {
    //     let rand = Math.floor(Math.random() * maxValue * i);
    //     pledges.push(rand);
    //   }
    //   return pledges;
    // };
