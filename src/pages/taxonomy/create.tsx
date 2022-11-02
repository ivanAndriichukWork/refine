import React  from "react";
import {
    Create,
    Form,
    Input,
    IResourceComponentsProps,
    useForm,
} from "@pankod/refine";

import { ITax } from "interfaces";

export const TaxCreate: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps } = useForm<ITax>();

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Slug"
                    name="slug"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Create>
    );
};
