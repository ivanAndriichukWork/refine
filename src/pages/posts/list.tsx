import {
    List,
    Table,
    useTable,
    IResourceComponentsProps,
    Space,
    getDefaultSortOrder,
    CreateButton,
    ShowButton,
    DeleteButton,
    EditButton
  } from "@pankod/refine";
  import {  IPost } from "interfaces";
  export const PostList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps,sorter } = useTable<IPost>({
      initialSorter: [
        {
          field: "id",
          order: "asc"
        }
      ],
      metaData: {
        fields: [
          "id",
          "name",
        ]
      }
    });
    
  return (
    <List
      pageHeaderProps={{
        extra: (
          <Space>
 
            <CreateButton />
          </Space>
        )
      }}
    >
           <Table {...tableProps} rowKey="id">
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
                <Table.Column<IPost>
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
  );
}