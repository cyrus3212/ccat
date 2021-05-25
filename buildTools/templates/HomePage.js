import React from 'react';
import Grid from '@cx/ui/lib/Grid';
import Col from '@cx/ui/lib/Col';
import Panel from 'react-bootstrap/lib/Panel';

const HomePage = () => {
  return (
    <Grid fluid className="template-page-wrapper page-wrapper__content-only">
      <Col sm={12} md={12} lg={12}>
        <Panel>
          <div className="template-content-wrapper content-wrapper__content-only">
            <h1>Hello World!</h1>

            <h3>This is a content-only layout.</h3>
            <p>
              This is just a sample of a content-only page layout and is meant
              only as a starting point. Change as needed!
            </p>
          </div>
        </Panel>
      </Col>
    </Grid>
  );
};

export default HomePage;
