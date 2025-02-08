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
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../../common/Loader";
import toast from "react-hot-toast";

const WebsiteSettingsPage = () => {
  const [defaultValues, setDefaultValues] = useState({});
  const [siteData, setSiteData] = useState({});
  const [siteName, setSiteName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false); // Loading state for fetching preferences
  const { id } = useParams();
  console.log("siteData", siteData);

  const form = useForm({
    defaultValues,
  });

  const { userInfo } = useSelector((state) => state.auth);
  const userId = userInfo.data.userId;

  const { handleSubmit, reset } = form;

  useEffect(() => {
    const fetchPreferences = async () => {
      setIsFetching(true); // Start fetching
      try {
        const siteId = id; // Replace with dynamic site ID

        const searchPreferences = await getSearchPreference(userId, siteId);

        if (searchPreferences?.data) {
          setDefaultValues(searchPreferences?.data);
          setSiteName(searchPreferences?.data.siteName);
          reset(searchPreferences.data);
        }

        const siteAndUserData = await getDataOfSiteAndUser(userId, siteId);
        if (siteAndUserData?.data) {
          setSiteData(siteAndUserData.data);
        }
        console.log("searchPreferences", searchPreferences?.data?.siteName);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsFetching(false); // End fetching
      }
    };

    fetchPreferences();
  }, [reset, id, userId]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      console.log("Submitting Form Data:", data);
      const response = await postSearchPreference(data);
      console.log("Preferences Saved successfully:", response);
      toast.dismiss()
      toast.success(response?.message)
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
          <h2 className="text-2xl font-bitter font-bold text-primary mb-3">{!isFetching && siteName}</h2>
        </div>
        {isFetching ? (
          <Loader />
        ) : (
          <FormProvider {...form}>
            <DndProvider backend={HTML5Backend}>
              <WebsiteSettingsGernal siteData={siteData} siteId={id} />
              <SearchWidgetConf siteData={siteData} />
              <SearchPageConf siteData={siteData} />
            </DndProvider>
          </FormProvider>
        )}
      </div>
      <div className={`flex ${isFetching && "hidden"} justify-end mx-2`}>
        <button
          onClick={handleSubmit(onSubmit)}
          disabled={isLoading}
          className="px-4 py-2 text-white bg-primary hover:bg-secondary rounded font-semibold self-end"
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
