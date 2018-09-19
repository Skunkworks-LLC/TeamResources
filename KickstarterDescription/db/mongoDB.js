// Connect Database
const mongoose = require('mongoose');
mongoose.connect('mongodb://database/fetcher');

// -------------------------------------
// Schemas and Models ------------------
// -------------------------------------

// -------------------------------------
// COMMENTS ----------------------------
// -------------------------------------
const CommentSchema = mongoose.Schema({
    username: String,
    text: String,
    icon: String,
    date: Date,
    childComments: []
});

const Comment = mongoose.model('Comment', CommentSchema);


// -------------------------------------
// CAMPAIGN ----------------------------
// -------------------------------------

// SECTIONS ----------------------------
const SectionSchema = mongoose.Schema({
    title: String,
    image: String,
    paragraph: String
});
const Section = mongoose.model('Section', SectionSchema);


// CAMPAIGN TAB -------------------------
const CampaignSchema = mongoose.Schema({
    aboutSection: SectionSchema,
    otherSections: [SectionSchema]
});
const CampaignTab = mongoose.model('Campaign', CampaignSchema);


// -------------------------------------
// FAQ ---------------------------------
// -------------------------------------

// QUESTIONS ----------------------------
const QuestionSchema = mongoose.Schema({
    inquiry: String,
    answer: String,
    lastUpdated: Date
});
const Question = mongoose.model('Question', QuestionSchema);

// -------------------------------------
// UPDATES -----------------------------
// -------------------------------------

// QUESTIONS ----------------------------
const UpdateSchema = mongoose.Schema({
    event: String,
    title: String,
    projectLaunchDate: Date,
    date: Date,
    paragraph: String,
    comments: Number,
    likes: Number
});
const Update = mongoose.model('Update', UpdateSchema);


// -------------------------------------
// DESCRIPTION -------------------------
// -------------------------------------
const DescriptionSchema = mongoose.Schema({
    id: Number,
    name: String,
    campaign: CampaignSchema,
    faq: [QuestionSchema],
    backers: Number,
    updates: [UpdateSchema],
    comments: [CommentSchema],
    launchDate: Date
});

const Description = mongoose.model('Description', DescriptionSchema);

// Request Handlers
module.exports.getAllDescriptions = () => {
    return new Promise((resolve, reject) => {
        Description.find((err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

module.exports.get = (parameter = {}, field) => {
    return new Promise((resolve, reject) => {
        Description.find(parameter, field, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data[0]);
            }
        });
    });
}

module.exports.postProject = (blueprint) => {
    return new Promise((resolve) => {
        console.log(blueprint);
        let project = {};
        project.id = blueprint.id;
        project.name = blueprint.name;

        // CAMPAIGN 
        let campaignAboutSection = new Section({
            title: blueprint.campaign.aboutSection[0].sectionTitle,
            image: blueprint.campaign.aboutSection[0].sectionImage,
            paragraph: blueprint.campaign.aboutSection[0].sectionParagraph
        });

        let otherSections = blueprint.campaign.otherSections.map((section) => {
            return new Section({
                title: section.sectionTitle,
                image: section.sectionImage,
                paragraph: section.sectionParagraph
            });
        });

        project.campaign = new CampaignTab({aboutSection: campaignAboutSection, otherSections: otherSections});

        // FAQS
        project.faq = blueprint.faq.questions.map((question) => {
            return new Question({
                inquiry: question.inquiry,
                answer: question.answer,
                lastUpdated: question.lastUpdated
            });
        });

        // UPDATES
        project.launchDate = blueprint.updates.projectLaunchDate;
        
        project.updates = blueprint.updates.posts.map((update) => {
            return new Update({
                event: update.event,
                title: update.title,
                date: update.date,
                paragraph: update.paragraph,
                comments: update.comments,
                likes: update.likes
            });
        });

        // COMMENTS
        const generateComments = (blueprintComments) => {
            return blueprintComments.map((comment) => {
                return new Comment({
                    username: comment.user,
                    text: comment.text,
                    icon: comment.icon,
                    date: comment.postTime,
                    childComments: generateComments(comment.childComments)
                })
            });
        }
        project.comments = generateComments(blueprint.comments);

        let newProject = new Description(project);
        newProject.save();
        resolve();
    });
}