import React from "react";
import { Form, Input, Upload, Icon } from 'antd';
const FormItem = Form.Item;

class CreatePostForm extends React.Component {
    beforeUpload = () => {
        console.log("before upload");
        return false;
    }

    normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }

    getWrappedForm = () => {
        return this.props.form;
    }

    render() {
        const { form } = this.props;
        const { getFieldDecorator } = form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        return (
            <Form layout="vertical">
                <FormItem
                    label="Message"
                    {...formItemLayout}
                >
                    {getFieldDecorator('message', {
                        rules: [{ required: true, message: 'Please input message.' }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Image"
                >
                    <div className="dropbox">
                        {getFieldDecorator('image', {
                            valuePropName: 'fileList',
                            getValueFromEvent: this.normFile,
                            rules: [{ required: true, message: 'Please select an image.' }],
                        })(
                            <Upload.Dragger
                                name="files"
                                beforeUpload={this.beforeUpload}
                            >
                                <p className="ant-upload-drag-icon">
                                    <Icon type="inbox" />
                                </p>
                                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                            </Upload.Dragger>
                        )}
                    </div>
                </FormItem>
            </Form>
        );
    }
}

export const WrappedCreatePostForm = Form.create()(CreatePostForm);