import * as React from "react";
import AccountSetting from "../components/AccountSetting";
import PlanBilling from "../components/PlanBilling";
import MainLayout from "../Layout/MainLayout";

export default function Setting() {
  return (
    <MainLayout>
      <div className="overflow-hidden pr-10 bg-white max-md:pr-5">
        <div className="flex flex-col ml-5 w-full max-md:ml-0 max-md:w-full">
          <div className="flex flex-col mt-5 max-md:mt-4 max-md:max-w-full">
            {/* Page Header */}
            <h1 className="self-start text-2xl font-bold text-black">Settings</h1>

            {/* Settings Content */}
            <div className="mt-3">
              <AccountSetting />
              <PlanBilling />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
