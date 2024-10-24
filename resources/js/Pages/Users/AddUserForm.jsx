import React from "react";
import { Modal, Form, Input, Select } from "antd";
import { router, usePage } from "@inertiajs/react";

const AddUserForm = ({ visible, onCancel, roles }) => {
    const [form] = Form.useForm();
    const { errors } = usePage().props;

    const handleSubmit = (values) => {
        router.post("/users", values);
        form.resetFields();
        onCancel();
    };

    console.log("Error", errors);

    return (
        <Modal
            title="Tambah Users"
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
                        <p className="text-red-500">{errors.username}</p>
                    )}
                </Form.Item>

                <Form.Item
                    name="role_id"
                    label="Role"
                    className="focus:border-none"
                >
                    <Select
                        placeholder="Pilih Role"
                        options={roles.map((role) => ({
                            label: role.keterangan,
                            value: role.id,
                        }))}
                    />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: "Username tidak boleh kosong.",
                        },
                    ]}
                >
                    <Input className="border border-slate-400 rounded-md" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddUserForm;
