import React, { useEffect, useState } from "react";
import MainLayout from "../../Layout/MainLayout";
import WebsiteSettingsGernal from "./components/WebsiteSettingsGernal";
import SearchWidgetConf from "./components/SearchWidgetConf";
import SearchPageConf from "./components/SearchPageConf";
import { FormProvider, useForm } from "react-hook-form";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  getDataOfSiteAndUser,
  getSearchPreference,
  postSearchPreference,
} from "../../apiManager/setting";

const WebsiteSettingsPage = () => {
  const [defaultValues, setDefaultValues] = useState({});
  const [siteData, setSiteData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    defaultValues,
  });

  const { handleSubmit, reset } = form;

  useEffect(() => {
    const fetchPreferences = async () => {
      try {

        // later we remove this after by login the userId set
        const userIdToSet = "6767d5c65ac4ffa5809355f3"; // Replace with dynamic user ID

        localStorage.setItem("userId", userIdToSet);

        // Get the userId
        const userId = localStorage.getItem("userId");

        const siteId = "6768b69f5fe75864249a7ce5"; // Replace with dynamic site ID

        const searchPreferences = await getSearchPreference(userId, siteId);
        console.log("searchPreferences", searchPreferences);

        if (searchPreferences?.data) {
          setDefaultValues(searchPreferences.data);
          reset(searchPreferences.data);
        }

        const siteAndUserData = await getDataOfSiteAndUser(userId, siteId);
        if (siteAndUserData?.data) {
          setSiteData(siteAndUserData.data);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchPreferences();
  }, [reset]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      console.log("Submitting Form Data:", data);
      const response = await postSearchPreference(data);
      console.log("Preferences Saved successfully:", response);
    } catch (error) {
      console.error("Failed to save preferences:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl mx-2 mb-2 font-semibold">{"Websites name"}</h2>
        </div>
        <FormProvider {...form}>
          <DndProvider backend={HTML5Backend}>
            <WebsiteSettingsGernal siteData={siteData} />
            <SearchWidgetConf siteData={siteData} />
            <SearchPageConf siteData={siteData} />
          </DndProvider>
        </FormProvider>
      </div>
      <div className="flex justify-end mx-2">
        <button
          onClick={handleSubmit(onSubmit)}
          disabled={isLoading}
          className="px-4 rounded-lg h-8 w-16 py-1 bg-black text-white flex items-center justify-center"
        >
          {isLoading ? (
            <svg
              className="animate-spin h-6 w-9 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
          ) : (
            "Save"
          )}
        </button>
      </div>
    </MainLayout>
  );
};

export default WebsiteSettingsPage;
