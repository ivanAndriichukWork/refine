import { Refine } from "@pankod/refine";
import { CarOutlined, FormatPainterOutlined, GlobalOutlined } from '@ant-design/icons';
import "@pankod/refine/dist/styles.min.css";
import { useTranslation } from "react-i18next";
//import dataProvider from "hasura";
import dataProvider from "@pankod/refine-hasura";
import routerProvider from "@pankod/refine-react-router";
import { GraphQLClient } from "graphql-request";
import { ColorCreate, ColorList } from "pages/colors";
import { MakeCreate, MakeList } from "pages/make";
import { ModelCreate } from "pages/model";
import { RegionCreate, RegionList } from "pages/regions";
import { PostCreate } from "pages/posts/create";
import { PostList } from "pages/posts";
const API_URL = "https://auto-hasura.herokuapp.com/v1/graphql";
const client = new GraphQLClient(API_URL, { headers: { 'x-hasura-admin-secret': "Flatron1873" } });
const gqlDataProvider = dataProvider(client);

function App() {
  const { t, i18n } = useTranslation();
  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };
  return <Refine routerProvider={{
    ...routerProvider, routes: [{
      exact: true,
      component: ModelCreate,
      path: "/make/:id/model"
    }]
  }} dataProvider={gqlDataProvider}
    i18nProvider={i18nProvider}
    resources={[
      {
        "name": "posts",
        options: { label: t("pages.posts") },
        create: PostCreate,
        list: PostList
      },
      {
        name: "colors",
        options: { label: t("pages.colors") },
        create: ColorCreate,
        list: ColorList,
        icon: <FormatPainterOutlined twoToneColor="#eb2f96" />
      },
      {
        name: "make",
        options: { label: t("pages.makes") },
        create: MakeCreate,
        list: MakeList,
        icon: <CarOutlined />
      },
      {
        name: "region",
        options: { label: t("pages.regions") },
        create: RegionCreate,
        list: RegionList,
        icon: <GlobalOutlined />
      }
    ]}
  >
  </Refine>;
}

export default App;
