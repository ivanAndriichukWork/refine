import { Create, IResourceComponentsProps, useForm, Input, Form } from "@pankod/refine";
import {   IPost } from "interfaces";

export const PostCreate: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps } = useForm<IPost>();
    return (
        <Create saveButtonProps={saveButtonProps}>

            <Form layout="vertical" {...formProps}>
                <Form.Item
                    label="Name"
                    name="name"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Slug"
                    name="slug"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="description"
                >
                    <Input.TextArea rows={6} />
                </Form.Item>
            </Form>

        </Create>
    )
}