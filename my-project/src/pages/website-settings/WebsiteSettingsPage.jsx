import React, { useEffect, useState } from "react";
import MainLayout from "../../Layout/MainLayout";
import WebsiteSettingsGernal from "./components/WebsiteSettingsGernal";
import SearchWidgetConf from "./components/SearchWidgetConf";
import SearchPageConf from "./components/SearchPageConf";
import { FormProvider, useForm } from "react-hook-form";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getSearchPreference, postSearchPreference } from "../../apiManager/setting";

const WebsiteSettingsPage = () => {
  const [defaultValues, setDefaultValues] = useState({});

  const form = useForm({
    defaultValues  // Initialize with an empty object
  });

  const { handleSubmit, reset } = form;

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const userId = "6767d5c65ac4ffa5809355f3"; // Replace with dynamic user ID
        const siteId = "6768b69f5fe75864249a7ce5"; // Replace with dynamic site ID
        const searchPreferences = await getSearchPreference(userId, siteId);
        setDefaultValues(searchPreferences?.data); // Update state

        // Update form values with fetched data
        if (searchPreferences?.data) {
          reset(searchPreferences.data);
        }
      } catch (error) {
        console.error("Failed to fetch search preferences:", error);
      }
    };

    fetchPreferences();
  }, [reset]);

  const onSubmit = async (data) => {
    try {
      const userId = "6767d5c65ac4ffa5809355f3"; // Replace with dynamic user ID
      console.log("Submitting Form Data:", data);

      // Send form data via postSearchPreference
      const response = await postSearchPreference(data);
      console.log("Preferences Saved successfully:", response);
    } catch (error) {
      console.error("Failed to save preferences:", error);
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
            <WebsiteSettingsGernal />
            <SearchWidgetConf />
            <SearchPageConf />
          </DndProvider>
        </FormProvider>
      </div>
      {/* Save Button */}
      <div className="flex justify-end mx-2">
        <button
          onClick={handleSubmit(onSubmit)}
          className="px-4 rounded-lg py-1 bg-black text-white"
        >
          Save
        </button>
      </div>
    </MainLayout>
  );
};

export default WebsiteSettingsPage;
