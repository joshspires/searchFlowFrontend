import React from "react";
import MainLayout from "../../Layout/MainLayout";
import WebsiteSettingsGernal from "./components/WebsiteSettingsGernal";
import SearchWidgetConf from "./components/SearchWidgetConf";
import SearchPageConf from "./components/SearchPageConf";
import { FormProvider, useForm } from "react-hook-form";
import axios from "axios";
import api from "../../apiManager/api";
import { searchConfiguration } from "../../../demo";

const WebsiteSettingsPage = () => {
  const siteUrl = "";
  const form = useForm({
    values: {
      ...searchConfiguration,
    },
  });

  const getAndSetCollections = async () => {
    const collections = await axios.get("");
  };
  return (
    <MainLayout>
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">
            {"{Websites name}"}
            {/* {form.getValues("coll")} */}
          </h2>
        </div>
        <FormProvider {...form}>
          <WebsiteSettingsGernal />
          <SearchWidgetConf />
          <SearchPageConf />
        </FormProvider>
      </div>
    </MainLayout>
  );
};

export default WebsiteSettingsPage;
