import React, { useEffect } from "react";
import { Modal, Form, Input, Select } from "antd";
import { router, usePage } from "@inertiajs/react";

const EditUserForm = ({ visible, onCancel, user, roles }) => {
    const [form] = Form.useForm();

    const { errors } = usePage().props;

    useEffect(() => {
        if (user) {
            form.setFieldsValue(user);
        }
    }, [user, form]);

    const handleSubmit = (values) => {
        router.put(`/users/${user.id}`, values);
        onCancel();
        form.resetFields();
    };

    return (
        <Modal
            title="Edit User"
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
                    name="name"
                    label="Nama Lengkap"
                    rules={[
                        { required: true, message: "Nama tidak boleh kosong." },
                    ]}
                >
                    <Input className="border border-slate-400 rounded-md" />
                </Form.Item>
                <Form.Item
                    name="username"
                    label="Username"
                    rules={[
                        {
                            required: true,
                            message: "Username tidak boleh kosong.",
                        },
                    ]}
                >
                    <Input className="border border-slate-400 rounded-md" />

                    {errors.username && (
                        <div className="text-red-500">{errors.username}</div>
                    )}
                </Form.Item>

                <Form.Item
                    name="role"
                    label="Role"
                    className="focus:border-none"
                >
                    <Select
                        placeholder="Pilih Role"
                        options={
                            roles &&
                            roles.map((role) => ({
                                label: role.keterangan,
                                value: role.id,
                            }))
                        }
                    />
                </Form.Item>

                <Form.Item name="password" label="Password">
                    <Input className="border border-slate-400 rounded-md" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditUserForm;
