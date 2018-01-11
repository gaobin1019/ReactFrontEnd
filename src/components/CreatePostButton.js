import $ from 'jquery';
import React from "react";
import PropTypes from 'prop-types';
import { Modal, Button, message } from 'antd';
import { WrappedCreatePostForm } from "./CreatePostForm"
import {API_ROOT, AUTH_PREFIX, POS_KEY, TOKEN_KEY} from "../constants"


export class CreatePostButton extends React.Component {
    static propTypes = {
        loadNearbyPosts: PropTypes.func.isRequired,
    };

    state = {
        visible: false,
        confirmLoading: false,
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = () => {
        const form = this.form.getWrappedForm();
        form.validateFields((err, values) => {
            if (!err) {
                console.log('form values: ' + JSON.stringify(values));

                const {lat, lon} = JSON.parse(localStorage.getItem(POS_KEY));
                const formData = new FormData();
                formData.set('lat', lat + Math.random() * 0.1 - 0.05); // for testing purpose
                formData.set('lon', lon + Math.random() * 0.1 - 0.05);
                formData.set('message', values.message);
                formData.set('image', values.image[0]);

                this.setState({ confirmLoading: true });
                $.ajax({
                    method: 'POST',
                    url: `${API_ROOT}/post`,
                    headers: {
                        Authorization: `${AUTH_PREFIX} ${localStorage.getItem(TOKEN_KEY)}`,
                    },
                    processData: false,
                    contentType: false,
                    dataType: 'text',
                    data: formData,
                }).then(() => {
                    message.success('created a post successfully.');
                    form.resetFields();
                }, (err) => {
                    message.error(err.responseText);
                    form.resetFields();
                }).then(() => {
                    this.props.loadNearbyPosts().then(() => {
                        this.setState({ visible: false, confirmLoading: false});
                    });
                }).catch((e) => {
                    message.error('create post failed.');
                    console.error(e);
                });
            }
        });
    };
    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    };

    saveFormRef = (form) => {
        this.form = form;
    };

    render() {
        const { visible, confirmLoading } = this.state;
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>New Post</Button>
                <Modal title="New Post"
                       okText="Create"
                       cancelText="Cancel"
                       visible={visible}
                       onOk={this.handleOk}
                       confirmLoading={confirmLoading}
                       onCancel={this.handleCancel}
                >
                    <WrappedCreatePostForm wrappedComponentRef={this.saveFormRef}/>
                </Modal>
            </div>
        );
    }
}