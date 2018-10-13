import React from 'react'
import { Card, Row, Col, CardBody } from 'reactstrap'
import ReactDOM from 'react-dom'

import CollapseExample from './CollapseExample.jsx'
import CarouselExample from './CarouselExample.jsx'
import TabsExample from './TabsExample.jsx'

const Example = (props) => {
  return (
    <div>
      <Row>
        <Col sm="6">
          <Card body>
            <CollapseExample/>
          </Card>
        </Col>
        <Col sm="6">
          <Card body>
            <CarouselExample/>
          </Card>
        </Col>
      </Row>

      <Card>
        <CardBody>
          <TabsExample/>
        </CardBody>
      </Card>
    </div>
  )
}

ReactDOM.render(<Example/>, document.getElementById('react-container'))
