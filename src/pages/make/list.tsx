import { Space, Button, Grid, List, useTable, IResourceComponentsProps, CreateButton, Table, getDefaultSortOrder, EditButton, ShowButton, DeleteButton, useTranslate } from "@pankod/refine";
import { IMake, IModel } from "interfaces";

export const MakeList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps, sorter } = useTable<IMake>({
        initialSorter: [
            {
                field: "id",
                order: "asc"
            }
        ],
        metaData: {
            fields: [
                "id",
                "name"
            ]
        }
    })
    const breakpoint = Grid.useBreakpoint();

    return (
        <List pageHeaderProps={{
            extra: (
                <Space>
                    <CreateButton />
                </Space>
            )
        }}>
            <Table {...tableProps}
                expandable={{
                    expandedRowRender: !breakpoint.xs
                        ? expandedRowRender
                        : undefined,
                }}
                rowKey="id">
                <Table.Column
                    key="id"
                    dataIndex="id"
                    title="id"
                    sorter={{ multiple: 2 }}
                    defaultSortOrder={getDefaultSortOrder("id", sorter)}
                />
                <Table.Column
                    key="name"
                    dataIndex="name"
                    title="name"
                    sorter={{ multiple: 1 }}
                />
                <Table.Column<IMake>
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record) => {
                        return (
                            <Space>
                                <EditButton hideText size="small" recordItemId={record.id} />
                                <ShowButton hideText size="small" recordItemId={record.id} />
                                <DeleteButton hideText size="small" recordItemId={record.id} />
                            </Space>
                        );
                    }}
                />
            </Table>
        </List>
    )
}
const MakeModelsTable: React.FC<{ record: IMake }> = ({ record }) => {
    const t = useTranslate();
    const { tableProps: postTableProps } = useTable<IModel>({
        resource: "model",
        permanentFilter: [
            {
                field: "make_id",
                operator: "eq",
                value: record.id,
            }
        ],
        metaData: {
            fields: [
                "id",
                "name"
            ]
        },
        // syncWithLocation: false,
    })

    return (
        <List title={"List"} pageHeaderProps={{
            extra: (
                <Space>
                    <Button href={`/make/${record.id}/model`} >Add Model</Button>
                </Space>
            )
        }} >
            <Table {...postTableProps} rowKey="id">
                <Table.Column
                    key="name"
                    dataIndex="name"
                    title="name"
                />
            </Table>
        </List >
    )
}
const expandedRowRender = (record: IModel) => {
    return <MakeModelsTable record={record} />;
};