import { Create, IResourceComponentsProps, useForm, Input, Form } from "@pankod/refine";
import { IMake } from "interfaces";

export const MakeCreate: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps } = useForm<IMake>();
    return (
        <Create saveButtonProps={saveButtonProps}>

            <Form {...formProps}>
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
            </Form>

        </Create>
    )
}