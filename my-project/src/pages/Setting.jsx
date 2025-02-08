import * as React from "react";
import AccountSetting from "../components/AccountSetting";
import PlanBilling from "../components/PlanBilling";
import MainLayout from "../Layout/MainLayout";

export default function Setting() {
  return (
    <MainLayout>
      <div className="bg-white">
        <div className="flex flex-col w-full">
          <div className="flex flex-col">
            {/* Page Header */}
            <h1 className="text-2xl font-bitter font-bold text-primary">Settings</h1>

            {/* Settings Content */}
            <div className="">
              <AccountSetting />
              <PlanBilling />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
