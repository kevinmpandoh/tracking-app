import React from "react";
import { Modal, Form, Input } from "antd";
import { router } from "@inertiajs/react";

const AddRoleForm = ({ visible, onCancel }) => {
    const [form] = Form.useForm();

    const handleSubmit = (values) => {
        router.post("/role", values);
        form.resetFields();
        onCancel();
    };

    return (
        <Modal
            title="Tambah Jabatan"
            open={visible}
            onCancel={onCancel}
            onOk={() => form.submit()}
            width={600}
        >
            <Form
                form={form}
                name="control-hooks"
                onFinish={handleSubmit}
                style={{ maxWidth: 600 }}
                layout="vertical"
                wrapperCol={{ span: 24 }}
                autoComplete="off"
                size="large"
            >
                <Form.Item
                    name="keterangan"
                    label="Nama Role"
                    rules={[
                        {
                            required: true,
                            message: "Nama role tidak boleh kosong.",
                        },
                    ]}
                >
                    <Input className="border border-slate-400 rounded-md" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddRoleForm;
