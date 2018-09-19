import Axios from 'axios';

class _ServerManager {
    constructor() {
        this.server = 'http://127.0.0.1:1600';
    }

    getProject(projectID) {
        let endpoint = `${this.server}/${projectID}/description`;
        return new Promise((resolve,)=> {
            Axios.get(endpoint).then((project) => {
                resolve(project.data);
            });
        });
    }

    getAllProjects() {
        let endpoint = `${this.server}/allProjects/description`;
        return new Promise((resolve)=> {
            Axios.get(endpoint).then((projects) => {
                resolve(projects);
            });
        });
    }

    getCampaign(projectID) {
        let endpoint = `${this.server}/${projectID}/description/campaign`;
        return new Promise((resolve)=> {
            Axios.get(endpoint).then((result)=> {
                resolve(result.data.campaign);
            });
        });
    }

    getFaq(projectID) {
        let endpoint = `${this.server}/${projectID}/description/faq`;
        return new Promise((resolve)=> {
            Axios.get(endpoint).then((result)=> {
                resolve(result.data.faq);
            });
        });
    }

    getUpdates(projectID) {
        let endpoint = `${this.server}/${projectID}/description/updates`;
        return new Promise((resolve)=> {
            Axios.get(endpoint).then((result) => {
                resolve(result.data.updates);
            });
        });
    }

    getComments(projectID) {
        let endpoint = `${this.server}/${projectID}/description/comments`;
        return new Promise((resolve)=> {
            Axios.get(endpoint).then((result) => {
                resolve(result.data.comments);
            });
        });
    }
};

const ServerManager = new _ServerManager();
export default ServerManager;