import axios from 'axios';
import React from 'react';
import path from 'path';
import Pledge from './Pledge';
import PledgeInput from './PledgeInput';
import './styles/pledgeList.css';
import './styles/fonts/MaisonNeue/fonts.css';

class PledgeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectId: undefined,
      projectName: '',
      pledges: [],
    };
  }

  componentWillMount(currentProjectId = 1) {
    const projectUrl = path.join('/projects/', currentProjectId.toString());

    axios({
      method: 'get',
      url: `http://127.0.0.1:3005/projects/${currentProjectId}`,
      contentType: 'application.json',
      data: JSON.stringify({ currentProjectId }),
    }).then(({ data }) => {
      this.importData(data);
    }).catch(err => console.error(err));
  }

  importData({ projectId, projectName, shipToAnywhere, validLocations, pledges }) {
    this.setState({ projectId, projectName, shipToAnywhere, validLocations, pledges });
  }

  render() {
    const { pledges, shipToAnywhere, validLocations } = this.state;
    const Pledges = (pledges && pledges.length !== 0)
      ? pledges.map(
        (pledge, index) => (
          <Pledge
            pledgeInfo={pledge}
            shipToAnywhere={shipToAnywhere}
            validLocations={validLocations}
            key={index}
          />
        )
      )
      : <div>Invalid Product Page</div>;
    return (
      <div>
        <PledgeInput />
        {Pledges}
      </div>
    );
  }
}

export default PledgeList;
