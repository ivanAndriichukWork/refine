import { Create, Input, Form, IResourceComponentsProps, useForm } from "@pankod/refine";
import { IModel } from "interfaces";
import { useRouterContext } from "@pankod/refine";
export const ModelCreate: React.FC<IResourceComponentsProps> = ({ data }: any) => {
    const { formProps, saveButtonProps } = useForm<IModel>({ resource: "model" })
    const router = useRouterContext();
    const { id } = router.useParams<{ id?: string }>();
    console.log(id);
    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
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
                    initialValue={id}
                    label="Parent ID"
                    name="make_id"
                    hidden={true}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Create>
    )
}