import React, { useState } from 'react';
import { Button, Modal } from 'antd';

const ModalLayout = (props) => {
    const {feature, handleClick, color, content, title} = props
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        handleClick()
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Button style={{ backgroundColor: color, color: 'white' }} type="default" onClick={showModal}>
                {feature}
            </Button>
            <Modal title={title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>{content}</p>
            </Modal>
        </>
    );
};
export default ModalLayout;