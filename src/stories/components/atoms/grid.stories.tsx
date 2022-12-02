import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Col, Row } from "../../../library";

export default {
  component: Row,
} as ComponentMeta<typeof Row>;

const Template: ComponentStory<typeof Row> = (args) => {
  return (
    <div className="overflow-hidden">
      <p>Flex using col props. colGutter = 16, rowGutter = 16</p>
      <Row colGutter={16} rowGutter={16}>
        <Col span={24} className="h-16 rounded-md bg-brand-200">
          span 24
        </Col>
        <Col span={12} className="h-16 rounded-md bg-brand-200">
          span 12
        </Col>
        <Col span={12} className="h-16 rounded-md bg-brand-200">
          span 12
        </Col>
        <Col span={6} className="h-16 rounded-md bg-brand-200">
          span 6
        </Col>
        <Col span={6} className="h-16 rounded-md bg-brand-200">
          span 6
        </Col>
        <Col span={6} offset={6} className="h-16 rounded-md bg-brand-200">
          span 6 - offset 6
        </Col>
      </Row>

      <p className="mt-12">
        Flex using col flex prop as number (1-5). colGutter = 16, rowGutter =
        16:
      </p>
      <Row colGutter={16} rowGutter={16}>
        <Col flex={2} className="h-16 rounded-md bg-brand-200">
          flex 2
        </Col>
        <Col flex={3} className="h-16 rounded-md bg-brand-200">
          flex 3
        </Col>
      </Row>

      <p className="mt-12">
        Flex using col flex prop as css prop / auto. colGutter = 16, rowGutter =
        16:
      </p>
      <Row colGutter={16} rowGutter={16}>
        <Col flex="0 0 200px" className="h-16 rounded-md bg-brand-200">
          flex 0 0 200px
        </Col>
        <Col flex="auto" className="h-16 rounded-md bg-brand-200">
          flex auto
        </Col>
      </Row>

      <p className="mt-12">
        Responsonsive flex using col props. colGutter = 16, rowGutter = 16
      </p>
      <Row colGutter={16} rowGutter={16}>
        <Col span={12} lg={6} className="h-16 rounded-md bg-brand-200">
          span 12 lg 6
        </Col>
        <Col span={12} lg={6} className="h-16 rounded-md bg-brand-200">
          span 12 lg 6
        </Col>
        <Col span={12} lg={6} className="h-16 rounded-md bg-brand-200">
          span 12 lg 6
        </Col>
        <Col span={12} lg={6} className="h-16 rounded-md bg-brand-200">
          span 12 lg 6
        </Col>
        <Col
          span={12}
          lg={6}
          offset={6}
          className="h-16 rounded-md bg-brand-200"
        >
          span 12 lg 6 offset 6
        </Col>
      </Row>
    </div>
  );
};

export const Default = Template.bind({});

Default.args = {};
