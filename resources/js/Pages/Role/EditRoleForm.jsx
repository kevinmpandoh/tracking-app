import React, { useEffect } from "react";
import { Modal, Form, Input } from "antd";
import { router } from "@inertiajs/react";

const EditRoleForm = ({ visible, onCancel, role }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (role) {
            form.setFieldsValue(role);
        }
    }, [role, form]);

    const handleSubmit = (values) => {
        router.put(`/role/${role.id}`, values);
        onCancel();
        form.resetFields();
    };

    return (
        <Modal
            title="Edit Role"
            open={visible}
            onCancel={onCancel}
            onOk={() => form.submit()}
            width={600}
        >
            <Form
                form={form}
                onFinish={handleSubmit}
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
                            message: "Nama Role tidak boleh kosong.",
                        },
                    ]}
                >
                    <Input className="border border-slate-400 rounded-md" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditRoleForm;
