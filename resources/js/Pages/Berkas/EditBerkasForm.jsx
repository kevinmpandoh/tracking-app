import React, { useEffect } from "react";
import { Modal, Form, Input, Select } from "antd";
import { router, usePage } from "@inertiajs/react";

const EditBerkasForm = ({ visible, onCancel, document }) => {
    const [form] = Form.useForm();
    const { errors } = usePage().props;

    useEffect(() => {
        if (document) {
            form.setFieldsValue(document);
        }
    }, [document, form]);

    const handleSubmit = (values) => {
        router.patch(`/kelola-berkas/${document.id}`, values);
        onCancel();
        form.resetFields();
    };

    return (
        <Modal
            title="Edit Dokumen"
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
                    name="document_number"
                    label="Nomor Dokumen"
                    rules={[
                        {
                            required: true,
                            message: "Nomor Dokumen tidak boleh kosong.",
                        },
                    ]}
                >
                    <Input className="border border-slate-400 rounded-md" />
                    {errors.document_number && (
                        <div className="text-red-500">
                            {errors.document_number}
                        </div>
                    )}
                </Form.Item>
                <Form.Item
                    name="name"
                    label="Nama Dokumen"
                    rules={[
                        {
                            required: true,
                            message: "Nama Dokuemn tidak boleh kosong.",
                        },
                    ]}
                >
                    <Input className="border border-slate-400 rounded-md" />

                    {errors.name && (
                        <div className="text-red-500">{errors.name}</div>
                    )}
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditBerkasForm;
