import React, { useState } from 'react';
import { ExclamationCircleFilled } from '@ant-design/icons';
import {
  Button,
  Modal,
  Space,
  Form,
  Input,
  Upload,
  Checkbox,
  message,
} from 'antd';
import axios from 'axios';

const { confirm } = Modal;

const App = () => {
  const [form] = Form.useForm();

  const showPromiseConfirm = () => {
    confirm({
      title: 'Apply for the Vacancy',
      icon: <ExclamationCircleFilled />,
      content: (
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item
            name="surname"
            label="Surname"
            rules={[{ required: true, message: 'Please input your surname!' }]}
          >
            <Input placeholder="Surname" />
          </Form.Item>
          <Form.Item name="middleName" label="Middle Name">
            <Input placeholder="Middle Name" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                type: 'email',
                message: 'Please input a valid email!',
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[
              { required: true, message: 'Please input your phone number!' },
            ]}
          >
            <Input placeholder="Phone" />
          </Form.Item>
          <Form.Item
            name="cv"
            label="Upload CV"
            rules={[{ required: true, message: 'Please upload your CV!' }]}
          >
            <Upload
              beforeUpload={() => false} // Disable automatic upload
              accept=".pdf,.doc,.docx"
              showUploadList={false}
            >
              <Button>Click to Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                required: true,
                message: 'You must agree to the data processing!',
              },
            ]}
          >
            <Checkbox>I agree to the processing of my data.</Checkbox>
          </Form.Item>
        </Form>
      ),
      onOk() {
        form.submit();
      },
      onCancel() {},
    });
  };

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        if (key === 'cv') {
          formData.append(key, values[key].file.originFileObj);
        } else {
          formData.append(key, values[key]);
        }
      });

      await axios.post('https://career-api.asakabank.uz/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      message.success('Your application has been submitted successfully!');
    } catch (error) {
      message.error('Failed to submit the application.');
      console.error('Submission error:', error);
    }
  };

  return (
    <Space wrap>
      <Button onClick={showPromiseConfirm}>Apply for Vacancy</Button>
    </Space>
  );
};

export default App;
