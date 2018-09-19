const CreatePictures = () => {
    return new Promise((resolve) => {
        let server = 'https://api.unsplash.com/photos/random';
        let params = {
            client_id: '7675446baa2be5640af1b407b133c0f3926c482389743ea034a1f4e4ca6a9b46',
            orientation: 'landscape',
            count: 500,
            query: 'tech'
        }
        axios.get(server, { params: params }).then((result) => {
            let images = result.data.map((image) => {
                return image.urls.full;
            });
            resolve(images);
        });
    })
}

const GenerateUser = () => {
    return new Promise((resolve) => {
        axios.get('https://randomuser.me/api/').then((user) => {
            resolve(user.data.results[0]);
        });
    });
}

const CreateRandomComments = () => {
    return new Promise((resolve) => {
        axios.get('https://www.reddit.com/r/gadgets/comments/8k3w8l/.json?limit=5000').then((result) => {
            let comments = result.data[1].data.children;

            const createComments = (comments, layer = 3) => {
                let allComments = [];

                if (layer <= 0) {
                    return allComments;
                }

                comments.forEach((comment) => {
                    let newComment = {};
                    newComment.text = comment.data.body;
                    newComment.replies = [];
                    if (comment.data.replies) {
                        let replies = comment.data.replies.data.children;
                        newComment.replies = newComment.replies.concat(createComments(replies, layer-1));
                    }
                    if (newComment.text) {
                        allComments.push(newComment);
                    }
                });

                return allComments;
            };

            let globalComments = createComments(comments);
            resolve(globalComments);
        });
    });
}



const randomNumber = (max, min) => {
    return Math.floor(Math.random() * min) + max;
}

const passesOdds = (chance = 0.50) => {
    return Math.random() < chance;
}

class Campaign {
    constructor(product) {
        this.aboutSection = this.generateSection(product);
        this.otherSections = this.generateSection(null, randomNumber(2, 5));
    }

    generateSection(product = null, amount = 1) {
        let sections = [];
        for (var i = 0; i < amount; i++) {
            let section = {};
            section.sectionTitle = product || faker.company.catchPhrase();
            section.sectionImage = GlobalImages[imageCounter];
            if (imageCounter > GlobalImages.length) {
                imageCounter = 0;
            } else {
                imageCounter++;
            }
            section.sectionParagraph = faker.lorem.paragraphs();
            sections.push(section);
        }
        return sections;
    }
}

class FAQ {
    constructor() {
        this.questions = this.generateQuestions(randomNumber(0, 4));
    }

    generateQuestions(amount) {
        let questions = [];
        for (var i = 0; i < amount; i++) {
            let question = {};
            question.inquiry = faker.lorem.sentence().slice(0, -1) + '?';
            question.answer = faker.lorem.paragraph();
            question.lastUpdated = faker.date.recent();
            questions.push(question);
        }
        return questions;
    }
}

class Updates {
    constructor() {
        this.projectLaunchDate = faker.date.between('2015-01-01', '2016-12-31');
        this.posts = this.generatePosts(randomNumber(1, 3));
    }

    generatePosts(amount) {
        let posts = [];
        for (var i = 0; i < amount; i++) {
            let post = {};
            post.event = faker.company.bs();
            post.title = faker.company.bsBuzz();
            post.date = faker.date.between('2017-01-01', '2018-08-31');
            post.paragraph = faker.lorem.paragraphs();
            post.comments = randomNumber(10, 1000);
            post.likes = randomNumber(10, 1000);
            posts.push(post);
        }
        return posts;
    }
}

const GenerateComment = (odds, assignedComment) => {
    return new Promise((resolve) => {
        GenerateUser().then((user) => {
            let comment = {};
            let firstName = (user.name.first)[0].toUpperCase() + (user.name.first).substring(1);
            let lastName = (user.name.last)[0].toUpperCase() + (user.name.last).substring(1);
            comment.user = firstName + ' ' + lastName;
            comment.text = assignedComment.text;
            comment.icon = user.picture.thumbnail;
            comment.postTime = faker.date.recent();
            comment.childComments = [];
            if (assignedComment.replies.length) {
                let len = (assignedComment.replies.length > 3) ? 3 : assignedComment.replies.length;
                var childComments = [];
                for (var i = 0; i < len; i++) {
                    childComments.push(GenerateComment(1, assignedComment.replies[i]));
                }
                Promise.all(childComments).then((childs) => {
                    comment.childComments = childs;
                    resolve(comment) 
                });
            } else {
                resolve(comment);
            }
        });
    });
}

const GenerateComments = (odds = 0.75, max = 4) => {
    return new Promise((resolve) => {
        let comments = [];
        if (passesOdds(odds)) {
            let numberOfComments = randomNumber(1, max);
            for (var i = 0; i < numberOfComments; i++) {
                comments.push(GenerateComment(odds, GlobalComments[counter]));
                counter++;
                if (counter > GlobalComments.length) {
                    counter = 0;
                }
            }
        }
        Promise.all(comments).then((newComments) => {
            resolve(newComments);
        });
    });
}

const generateKickStarter = (id) => {
    return new Promise((resolve) => {
        GenerateComments().then((comments) => {
            let project = {}; 
            project.id = id;
            project.name = faker.commerce.productName();
            project.campaign = new Campaign(project.name);
            project.faq = new FAQ();
            project.backers = randomNumber(50, 1000);
            project.updates = new Updates();
            project.comments = comments;
            resolve(project);
        });
    })
}

const generateKickStarters = (amount = 1, id, callback) => {
    let kickStarters = [];
    for (var i = 0; i < amount; i++) {
        kickStarters.push(generateKickStarter(id+i));
    }
    Promise.all(kickStarters).then((projects) => {
        axios.post('http://127.0.0.1:1600/description', {KickStarters: projects}).then(() => {
            callback();
        });
    });
}

const fillDatabase = (total = 100, amountToCreate = 5) => {
    if (total > 0) {
        total -= amountToCreate;
        let id = '' + total + randomNumber(3, 9);
        generateKickStarters(amountToCreate, id, () => {
            addToResults();
            fillDatabase(total);
        });
    }
}

// COMMENTS

let GlobalComments = null;
let counter = 0;

CreateRandomComments().then((result) => {
    GlobalComments = result;
    if (GlobalImages) addToResults('READY FOR ACTION');
})

// PICTURES
let GlobalImages = null;
let imageCounter = 0;

CreatePictures().then((pictures) => {
    GlobalImages = pictures;
    if (GlobalComments) addToResults('READY FOR ACTION');
});

// USER INTERACTION
const input = document.getElementById('amountInput');
const submitButton = document.getElementById('submitButton');
const results = document.getElementById('results');

submitButton.addEventListener('click', () => {
    let amount = parseInt(input.value);
    if (amount && amount > 0 && amount <= 100) {
        fillDatabase(amount);
    }
});

const addToResultsMaker = () => {
    var amount = 0;
    return function(text) {
        let result = document.createElement('p');
        result.innerHTML = text || `${amount}: Added new items`;
        results.appendChild(result);
        amount++;
    }
};

const addToResults = addToResultsMaker();

addToResults('LOADING... NOT READY YET');