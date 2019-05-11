import React from 'react';
import {Layout, Table, Drawer,   Form, Input, Select, Button, AutoComplete, Row, Col, Card} from 'antd';

import './App.css';

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const residences = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
  }],
}];



const dataSource = [{
  key: '1',
  name: 'Mike',
  age: 32,
  address: '10 Downing Street'
}, {
  key: '2',
  name: 'John',
  age: 42,
  address: '10 Downing Street'
}];

class FormWrapper extends React.PureComponent {
  state = {
    confirmDirty: false,
  };

  submit = e => {
    e.preventDefault();

    this.props.form.validateFieldsAndScroll((err, values) => {
      if(err) return console.log(err);
      return this.props.save(values);
    });
  }

  render () {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <Form {...formItemLayout} onSubmit={this.submit}>
        <Form.Item
          label="Name"
        >
          {getFieldDecorator('name', {
            rules: [{
              message: 'The input is not valid Name!',
            }, {
              required: true, message: 'Please input your Name!',
            }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          label="Age"
        >
          {getFieldDecorator('age', {
            rules: [{
              required: true, message: 'Please input your age!',
            }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          label="Address"
        >
          {getFieldDecorator('address', {
            rules: [{
              required: true, message: 'Please inp-ut your addreess!',
            }],
          })(
            <Input/>
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button block type="primary" htmlType="submit">Create</Button>
        </Form.Item>
      </Form>
    );

  }
}


const FormWrapperProperty = Form.create({ name: 'register' })(FormWrapper);

class App extends React.PureComponent {
  state = {
    drawer: false,
    dataSource
  };

  save = (data) => {
    this.setState({dataSource: [...this.state.dataSource, data]}, this.toggle);
  }

  toggle = () => this.setState({drawer: !this.state.drawer});

  render(){

    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    }, {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    }];

    return (
      <Layout>
          <Drawer width="750px" title="Form send exemple" closable={false} onClose={this.toggle} visible={this.state.drawer}>
              <FormWrapperProperty save={this.save} />
          </Drawer>
          <Row>
            <Col span={4}>
              <Button onClick={this.toggle} type="primary" icon="plus"/>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <Table dataSource={this.state.dataSource} columns={columns} />
              </Card>
            </Col>
          </Row>
      </Layout>
    )
  }
}

export default App;
