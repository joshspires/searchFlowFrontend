import React from "react";
import MainLayout from "../../Layout/MainLayout";
import WebsiteSettingsGernal from "./WebsiteSettingsGernal";
import SearchWidgetConf from "./SearchWidgetConf";
import SearchPageConf from "./SearchPageConf";

const WebsiteSettingsPage = () => {
  return (
    <MainLayout>
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">{"{Websites name}"}</h2>
        </div>
        <WebsiteSettingsGernal />
        <SearchWidgetConf />
        <SearchPageConf />
      </div>
    </MainLayout>
  );
};

export default WebsiteSettingsPage;
